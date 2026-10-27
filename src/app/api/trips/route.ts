import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Fetch all saved trips
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('trips')
            .select(`
                *,
                destinations (
                    *,
                    media (*)
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const safeData = (data || []).map((trip: any) => {
            if (trip.destinations) {
                const dest = trip.destinations;
                dest.primary_image = dest.media?.find((m: any) => m.is_primary) ||
                    dest.media?.[0] ||
                    { image_url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1' };
            }
            return trip;
        });

        return NextResponse.json({ data: safeData });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// Save a new trip
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { destination_id, mood, budget, duration_days, travel_type, itinerary } = body;

        const { data, error } = await supabase
            .from('trips')
            .insert([{
                destination_id,
                mood,
                budget,
                duration_days,
                travel_type,
                itinerary: itinerary || []
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// Delete a trip
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
}
