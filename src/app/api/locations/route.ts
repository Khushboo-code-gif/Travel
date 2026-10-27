import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const mood = searchParams.get('mood');
        const isHiddenGem = searchParams.get('isHiddenGem') === 'true';
        const query = searchParams.get('query');
        const swLat = searchParams.get('swLat');
        const swLng = searchParams.get('swLng');
        const neLat = searchParams.get('neLat');
        const neLng = searchParams.get('neLng');
        const zoom = parseInt(searchParams.get('zoom') || '0');

        let targetMood = mood;

        // AI Search Integration
        if (query && !mood) {
            try {
                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: "system", content: "Convert the user's natural language travel query into one of these mood categories: Burnt Out, Romantic, Adventure, Detox, Party, Creative, Solo Reflection, Nature Escape, Heritage Walk, Urban Vibe. Return ONLY the category name." },
                        { role: "user", content: query }
                    ],
                    model: "gpt-3.5-turbo",
                    max_tokens: 10
                });
                targetMood = completion.choices[0].message.content?.trim() || null;
            } catch (aiError) {
                console.error("AI Search conversion failed:", aiError);
            }
        }

        let locationsQuery = supabase.from('tourism_locations').select('*');

        if (targetMood) {
            locationsQuery = locationsQuery.contains('mood_tags', [targetMood]);
        }

        if (isHiddenGem) {
            locationsQuery = locationsQuery.eq('is_hidden_gem', true);
        }

        // Zoom-based loading optimization
        // If zoomed out, we might want to limit or return high-rated/featured locations
        if (zoom < 5) {
            locationsQuery = locationsQuery.gt('rating', 4.5).limit(200);
        } else if (swLat && swLng && neLat && neLng) {
            locationsQuery = locationsQuery
                .gte('latitude', parseFloat(swLat))
                .lte('latitude', parseFloat(neLat))
                .gte('longitude', parseFloat(swLng))
                .lte('longitude', parseFloat(neLng))
                .limit(1000);
        } else {
            locationsQuery = locationsQuery.limit(500);
        }

        const { data, error } = await locationsQuery;

        if (error) throw error;

        // Convert to GeoJSON for Mapbox clustering
        const geojson = {
            type: 'FeatureCollection',
            features: data.map((loc: any) => ({
                type: 'Feature',
                properties: {
                    id: loc.id,
                    place_name: loc.place_name,
                    city: loc.city,
                    country: loc.country,
                    category: loc.category,
                    rating: loc.rating,
                    description: loc.description,
                    image_url: loc.image_url,
                    fun_fact: loc.fun_fact,
                    mood_tags: loc.mood_tags,
                    is_hidden_gem: loc.is_hidden_gem,
                    top_activities: loc.top_activities
                },
                geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(loc.longitude), parseFloat(loc.latitude)]
                }
            }))
        };

        return NextResponse.json(geojson);

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
