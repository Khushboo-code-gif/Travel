import { NextRequest, NextResponse } from 'next/server';
import { searchHotels } from '@/lib/external/amadeus';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const cityCode = searchParams.get('cityCode');

    if (!cityCode) {
        return NextResponse.json({ error: 'City IATA code required' }, { status: 400 });
    }

    try {
        const hotels = await searchHotels(cityCode);
        return NextResponse.json({ data: hotels });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
