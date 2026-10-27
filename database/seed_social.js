const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars for seeding');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedSocial() {
    console.log('--- Seeding Social Layer ---');

    // 1. Create a Primary Profile
    const profileId = uuidv4();
    const { data: profile, error: pError } = await supabase
        .from('profiles')
        .upsert([{
            id: profileId,
            username: 'khushboo_explores',
            full_name: 'Khushboo Gangarde',
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khushboo',
            bio: 'Lead Explorer @ MoodTrip AI. Searching for the perfect sunsets and silent mountains.',
            explorer_level: 5,
            is_public: true
        }], { onConflict: 'username' })
        .select()
        .single();

    if (pError) {
        console.error('Profile Seed Error:', pError);
        return;
    }
    console.log('✅ Created/Updated Profile:', profile.username);

    // 2. Fetch some destinations
    const { data: destinations } = await supabase.from('destinations').select('id, name').limit(3);

    if (!destinations || destinations.length === 0) {
        console.log('❌ No destinations found. Seed destinations first.');
        return;
    }

    // 3. Seed Reviews
    const reviews = [
        {
            user_id: profile.id,
            destination_id: destinations[0].id,
            rating: 5,
            review_text: `Absolutely breath-taking! ${destinations[0].name} is a hidden gem that actually lives up to the hype. The vibe is exactly what I needed for a reset.`,
            is_verified_trip: true
        },
        {
            user_id: profile.id,
            destination_id: destinations[1].id,
            rating: 4.5,
            review_text: `Loved the food and the locals are so welcoming. Only downside was the crowd at the main viewpoint, but the AI suggested a backup spot that was empty!`,
            is_verified_trip: true
        }
    ];

    const { error: rError } = await supabase.from('reviews').upsert(reviews, { onConflict: 'user_id, destination_id' });
    if (rError) console.error('Review Seed Error:', rError);
    else console.log('✅ Seeded Sample Reviews');

    // 4. Update a trip to be public
    const { data: trips } = await supabase.from('trips').select('id').limit(1);
    if (trips && trips.length > 0) {
        await supabase
            .from('trips')
            .update({
                is_public: true,
                public_slug: 'perfect-goa-escape',
                user_id: profile.id
            })
            .eq('id', trips[0].id);
        console.log('✅ Made a sample trip public');
    }

    console.log('--- Social Seed Complete ---');
}

seedSocial();
