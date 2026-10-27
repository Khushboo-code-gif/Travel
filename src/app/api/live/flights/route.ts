import { NextRequest, NextResponse } from 'next/server';
import { searchFlights } from '@/lib/external/amadeus';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin') || 'DEL'; // Default Delhi
    const destination = searchParams.get('destination'); // IATA Code
    const date = searchParams.get('date') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (!destination) {
        return NextResponse.json({ error: 'Destination IATA code required' }, { status: 400 });
    }

    try {
        const flights = await searchFlights({
            origin,
            destination,
            date,
            adults: 1
        });
        return NextResponse.json({ data: flights });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
