import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Get reviews for an entity
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const destination_id = searchParams.get('destination_id');
        const hotel_id = searchParams.get('hotel_id');
        const restaurant_id = searchParams.get('restaurant_id');
        const limit = parseInt(searchParams.get('limit') || '10');

        let query = supabase
            .from('reviews')
            .select(`
                *,
                profiles (username, avatar_url, full_name)
            `)
            .order('created_at', { ascending: false });

        if (destination_id) query = query.eq('destination_id', destination_id);
        if (hotel_id) query = query.eq('hotel_id', hotel_id);
        if (restaurant_id) query = query.eq('restaurant_id', restaurant_id);

        const { data, error } = await query.limit(limit);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ data: data || [] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// Post a new review
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            user_id, destination_id, hotel_id, restaurant_id,
            rating, review_text, is_verified_trip
        } = body;

        // In a real app, user_id would come from auth session
        const { data, error } = await supabase
            .from('reviews')
            .insert([{
                user_id,
                destination_id,
                hotel_id,
                restaurant_id,
                rating,
                review_text,
                is_verified_trip: is_verified_trip || false
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
