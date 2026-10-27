import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const { data, error } = await supabase
        .from('trips')
        .select(`
            *,
            profiles (username, avatar_url, full_name),
            destinations (
                *,
                media (*)
            )
        `)
        .eq('public_slug', slug)
        .eq('is_public', true)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: 'Trip not found or is private' }, { status: 404 });
    }

    // Increment share count
    await supabase.rpc('increment_share_count', { trip_id: data.id });

    return NextResponse.json({ data });
}
