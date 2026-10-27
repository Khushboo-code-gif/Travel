import { NextResponse } from 'next/server';
import { MOCK_DESTINATIONS } from '@/data/mockDestinations';
import { generateItinerary } from '@/lib/ai';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { mood, budget, duration, crowd, type } = body;

        // 1. Select Destination Logic (Mock/Simple)
        // In a real app, this would query Supabase based on tags/scores
        const targetDestinations = MOCK_DESTINATIONS.filter(d => {
            // Updated filtering logic for new schema
            if (budget > (d.avg_budget_per_day || 0) * (duration || 3)) return true;
            return true;
        });

        // Randomly pick one that matches mood somewhat (mock logic)
        // Just random for MVP
        const destination = targetDestinations[Math.floor(Math.random() * targetDestinations.length)];

        // 2. Generate AI Content
        const itinerary = await generateItinerary({
            destination: destination,
            mood,
            budget,
            duration,
            travelType: type
        });

        return NextResponse.json({
            destination,
            itinerary
        });

    } catch (error) {
        console.error('Error in generate-trip:', error);
        return NextResponse.json({ error: 'Failed to generate trip' }, { status: 500 });
    }
}
