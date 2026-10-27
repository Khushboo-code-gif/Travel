import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { MOCK_DESTINATIONS } from '@/data/mockDestinations';
import { Destination } from '@/types';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

        const { data, error } = await supabase
            .from('destinations')
            .select('*')
            .eq('is_hidden_gem', true)
            .order('trending_score', { ascending: false })
            .limit(limit);

        if (error || !data || data.length === 0) {
            console.log('Using local hidden gems (Demo Mode)');
            const hiddenGems = MOCK_DESTINATIONS.filter(d => d.is_hidden_gem);
            return NextResponse.json({ data: hiddenGems.slice(0, limit) });
        }

        return NextResponse.json({ data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
