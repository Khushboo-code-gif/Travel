import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

    if (profileError || !profile) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    if (!profile.is_public) {
        return NextResponse.json({ error: 'This profile is private' }, { status: 403 });
    }

    // Fetch user's public trips
    const { data: trips } = await supabase
        .from('trips')
        .select(`
            *,
            destinations (name, city, state, slug)
        `)
        .eq('user_id', profile.id)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

    // Fetch user's recent reviews
    const { data: reviews } = await supabase
        .from('reviews')
        .select(`
            *,
            destinations (name),
            hotels (name),
            restaurants (name)
        `)
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(5);

    return NextResponse.json({
        profile,
        trips: trips || [],
        reviews: reviews || []
    });
}
