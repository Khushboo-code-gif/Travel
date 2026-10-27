import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { MOCK_DESTINATIONS } from '@/data/mockDestinations';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Filters
        const state = searchParams.get('state');
        const tier = searchParams.get('tier');
        const mood = searchParams.get('mood');
        const category = searchParams.get('category');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        let query = supabase
            .from('destinations')
            .select('*', { count: 'exact' });

        if (state) query = query.eq('state', state);
        if (tier) query = query.eq('tier', tier);
        if (category) query = query.eq('category', category);
        if (mood) query = query.contains('vibe', [mood]);

        // Sorting & Pagination
        query = query
            .order('popularity_score', { ascending: false })
            .range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error || !data || data.length === 0) {
            console.log('Using local destinations list (Demo Mode)');
            return NextResponse.json({
                data: MOCK_DESTINATIONS,
                pagination: { total: MOCK_DESTINATIONS.length, limit, offset, has_more: false }
            });
        }

        const safeData = data.map((d: any) => ({
            ...d,
            primary_image: { image_url: '/images/fallback-dest.jpg' } // Simplified for live reliability
        }));

        return NextResponse.json({
            data: safeData,
            pagination: {
                total: count || safeData.length,
                limit,
                offset,
                has_more: count ? offset + safeData.length < count : false
            }
        });
    } catch (err: any) {
        console.error('Destinations API Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
