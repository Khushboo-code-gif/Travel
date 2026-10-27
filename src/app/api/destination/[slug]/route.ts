import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { generateItinerary } from '@/lib/ai';
import { MOCK_DESTINATIONS } from '@/data/mockDestinations';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const searchParams = request.nextUrl.searchParams;

        const mood = searchParams.get('mood') || 'Peaceful';
        const duration = parseInt(searchParams.get('duration') || '0');
        const budget = parseInt(searchParams.get('budget') || '5000');
        const type = searchParams.get('type') || 'Solo';

        // Fetch destination
        const { data, error } = await supabase
            .from('destinations')
            .select(`
                *,
                hotels (*),
                restaurants (*),
                villas (*)
            `)
            .eq('slug', slug)
            .single();

        let destinationData = data;

        if (error || !data) {
            console.log('Falling back to local high-fidelity data matching...');
            const mock = MOCK_DESTINATIONS.find(d => d.slug === slug);

            if (mock) {
                // Generate Dynamic Hotels based on budget
                // Usually budget for stay is ~40% of daily budget
                const stayBudget = (budget / duration) * 0.4;

                let hotels = [];
                if (stayBudget > 15000) {
                    hotels = [
                        { id: 'h1', name: `The Imperial ${mock.name} Palace`, type: 'Ultra Luxury', rating: 4.9, price_per_night_avg: 22000, amenities: ['Infinity Pool', 'Butler Service', 'Spa', 'Fine Dining'], primary_image: { image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb' } },
                        { id: 'h2', name: `${mock.name} Heritage Resort & Spa`, type: 'Luxury Resort', rating: 4.8, price_per_night_avg: 18000, amenities: ['Private Beach', 'Yoga Pavilion', 'Organic Garden'], primary_image: { image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' } }
                    ];
                } else if (stayBudget > 5000) {
                    hotels = [
                        { id: 'h3', name: `${mock.name} Grand Heights`, type: 'Premium Hotel', rating: 4.5, price_per_night_avg: 7500, amenities: ['Rooftop Bar', 'Pool', 'Gym'], primary_image: { image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b' } },
                        { id: 'h4', name: 'Pine View Residency', type: 'Boutique Stay', rating: 4.4, price_per_night_avg: 5500, amenities: ['Valley View', 'Cafeteria', 'Wi-Fi'], primary_image: { image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4' } }
                    ];
                } else {
                    hotels = [
                        { id: 'h5', name: 'Zostel ' + mock.name, type: 'Premium Hostel', rating: 4.6, price_per_night_avg: 1200, amenities: ['Communal Kitchen', 'Game Room', 'Wi-Fi', 'Bunk Beds'], primary_image: { image_url: 'https://images.unsplash.com/photo-1555854817-5b2260d1502b' } },
                        { id: 'h6', name: 'Cloud 9 Guesthouse', type: 'Homestay', rating: 4.2, price_per_night_avg: 2500, amenities: ['Home Cooked Food', 'Garden', 'Laundry'], primary_image: { image_url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6' } }
                    ];
                }

                destinationData = {
                    ...mock,
                    hotels,
                    restaurants: [
                        { id: 'r1', name: 'The Local Kitchen', cuisine_type: ['Indian', 'Local'], rating: 4.6, price_range: 'Medium', primary_image: { image_url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' } },
                        { id: 'r2', name: 'Spice Route', cuisine_type: ['Asian', 'Fusion'], rating: 4.5, price_range: 'High', primary_image: { image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4' } }
                    ]
                };
            } else {
                return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
            }
        }

        const response: any = {
            ...destinationData,
            primary_image: destinationData.primary_image || { image_url: '/images/fallback-dest.jpg' },
            gallery_images: destinationData.gallery_images || [],
            hotels: (destinationData.hotels || []).map((h: any) => ({
                ...h,
                primary_image: h.primary_image || { image_url: '/images/fallback-hotel.jpg' }
            })).sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)).slice(0, 5),
            restaurants: (destinationData.restaurants || []).map((r: any) => ({
                ...r,
                primary_image: r.primary_image || { image_url: '/images/fallback-rest.jpg' }
            })).sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)).slice(0, 5)
        };

        // Generate itinerary if duration is provided
        if (duration > 0) {
            const budgetTier = budget < 4000 ? 'Low' : budget < 10000 ? 'Medium' : 'High';
            response.itinerary = await generateItinerary({
                destination: destinationData as any,
                mood,
                duration,
                travelType: type,
                budget: budgetTier
            });
        }

        return NextResponse.json(response);
    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

