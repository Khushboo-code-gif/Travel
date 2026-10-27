import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { MOCK_DESTINATIONS } from '@/data/mockDestinations';
import { Destination } from '@/types';
import { generateItinerary } from '@/lib/ai';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mood, budget, duration, is_international } = body;

        // Fetch candidates
        let query = supabase.from('destinations').select('*');
        if (is_international !== undefined) {
            query = query.eq('is_international', is_international);
        }

        const { data: destinationsResponse, error } = await query;
        let destinations = destinationsResponse;

        // If Supabase fails or returns nothing, use MOCK_DESTINATIONS
        if (error || !destinations || destinations.length === 0) {
            destinations = MOCK_DESTINATIONS;
            if (is_international !== undefined) {
                destinations = (destinations as Destination[]).filter((d) => d.is_international === is_international);
            }
        }

        // Scoring algorithm
        const moodMap: Record<string, string[]> = {
            'burnt-out': ['Peaceful', 'Nature'],
            'romantic': ['Romantic', 'Nature'],
            'adventure': ['Adventure', 'Nature'],
            'detox': ['Healing', 'Peaceful', 'Nature'],
            'party': ['Party', 'Urban'],
            'nature': ['Nature', 'Peaceful'],
            'heritage': ['Heritage', 'Spiritual'],
            'urban': ['Urban', 'Party'],
            'creative': ['Heritage', 'Nature'],
            'solo': ['Peaceful', 'Backpacking', 'Adventure']
        };

        const tripDuration = parseInt(duration || '3');

        // Score and Get AI Itineraries
        const scoredCandidates = (destinations as Destination[] || []).map((dest: Destination) => {
            let score = 0;
            const targetVibes = moodMap[mood as string] || [];
            if (dest.vibe && targetVibes.some((v) => (dest.vibe as string[]).includes(v))) {
                score += 40;
            }

            const destBudgetTier = (dest.avg_budget_per_day || 3000) < 4000 ? 'Low' : (dest.avg_budget_per_day || 3000) < 10000 ? 'Medium' : 'High';
            if (budget === destBudgetTier) score += 30;

            score += (dest.popularity_score || 0) * 0.2;

            return { dest, score };
        });

        // Sort and pick top 3
        const top3 = scoredCandidates
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        // Generate detailed itineraries for the top 3
        const results = await Promise.all(top3.map(async ({ dest, score }) => {
            const aiPlan = await generateItinerary({
                destination: dest,
                mood: mood as string,
                duration: tripDuration,
                travelType: (body.travelType as string) || 'Solo',
                budget: budget as string
            });

            return {
                ...dest,
                itinerary: aiPlan.days.map((d: any) => ({
                    day: d.day,
                    title: `Day ${d.day}`,
                    activities: [d.morning, d.afternoon, d.evening]
                })),
                recommendation_score: score,
                primary_image: dest.primary_image || { image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }
            };
        }));

        return NextResponse.json({ data: results });

    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
