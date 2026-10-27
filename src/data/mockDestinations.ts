import { Destination } from "@/types";

export const MOCK_DESTINATIONS: Destination[] = [
    // --- NORTH INDIA ---
    {
        id: 'n1', country: 'India', name: 'Manali', slug: 'manali', state: 'Himachal Pradesh', city: 'Manali', tier: 'Tier 1', category: 'Hill Station',
        short_description: 'Adventure sports, snowfall trips, and stunning mountain views.',
        full_description: 'A high-altitude Himalayan resort town famous for its cool climate and snow-capped mountains. Explore Solang Valley, Rohtang Pass, Old Manali, and Hidimba Temple.',
        best_time_to_visit: 'October to June', ideal_duration_days: 4, avg_budget_per_day: 4500,
        popularity_score: 95, trending_score: 80, crowd_level: 5, safety_score: 4, travel_connectivity_score: 4,
        vibe: ['Adventure', 'Nature'], ideal_for: ['Friends', 'Solo'],
        is_hidden_gem: false, is_international: false,
        latitude: 32.2432, longitude: 77.1892,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n2', country: 'India', name: 'Shimla', slug: 'shimla', state: 'Himachal Pradesh', city: 'Shimla', tier: 'Tier 1', category: 'Hill Station',
        short_description: 'Colonial hill station famous for its Mall Road and Toy Train.',
        full_description: 'The "Summer Capital" of British India, Shimla is famous for its colonial architecture, the Jakhoo Temple, and the scenic Kufri.',
        best_time_to_visit: 'March to June', ideal_duration_days: 3, avg_budget_per_day: 5000,
        popularity_score: 90, trending_score: 75, crowd_level: 5, safety_score: 5, travel_connectivity_score: 5,
        vibe: ['Nature', 'Heritage'], ideal_for: ['Family', 'Couples'],
        is_hidden_gem: false, is_international: false,
        latitude: 31.1048, longitude: 77.1734,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n3', name: 'Dharamshala', slug: 'dharamshala', state: 'Himachal Pradesh', country: 'India', city: 'McLeodganj', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'Tibetan culture and trekking hub.',
        full_description: 'Home to the Dalai Lama, this spiritual and adventure hub features the Triund Trek and the serene Dalai Lama Temple.',
        best_time_to_visit: 'March to June', ideal_duration_days: 4, avg_budget_per_day: 3500,
        popularity_score: 85, trending_score: 88, crowd_level: 3, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Spiritual', 'Adventure'], ideal_for: ['Solo', 'Friends'],
        is_hidden_gem: true, is_international: false,
        latitude: 32.2190, longitude: 76.3234,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n4', name: 'Leh-Ladakh', slug: 'leh-ladakh', state: 'Ladakh', country: 'India', city: 'Leh', tier: 'Offbeat', category: 'Adventure',
        short_description: 'Biker trips and high-altitude desert landscapes.',
        full_description: 'A land of high passes, crystal-clear lakes like Pangong, and the stunning Nubra Valley. Perfect for adventure seekers.',
        best_time_to_visit: 'May to September', ideal_duration_days: 7, avg_budget_per_day: 7000,
        popularity_score: 88, trending_score: 95, crowd_level: 2, safety_score: 5, travel_connectivity_score: 2,
        vibe: ['Adventure', 'Nature'], ideal_for: ['Friends', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1581793745862-99fde73c3d2d?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n5', name: 'Kashmir', slug: 'kashmir', state: 'J&K', country: 'India', city: 'Srinagar', tier: 'Tier 1', category: 'Nature',
        short_description: 'Houseboats, snow landscapes, and "Paradise on Earth".',
        full_description: 'Known for Dal Lake houseboats, the ski slopes of Gulmarg, and the breathtaking valleys of Pahalgam.',
        best_time_to_visit: 'March to October', ideal_duration_days: 6, avg_budget_per_day: 8000,
        popularity_score: 92, trending_score: 80, crowd_level: 4, safety_score: 4, travel_connectivity_score: 4,
        vibe: ['Romantic', 'Nature'], ideal_for: ['Couples', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n6', name: 'Rishikesh', slug: 'rishikesh', state: 'Uttarakhand', country: 'India', city: 'Rishikesh', tier: 'Tier 2', category: 'Spiritual',
        short_description: 'Yoga capital and river rafting destination.',
        full_description: 'Situated on the banks of the Ganges, famous for its Laxman Jhula, Ganga Aarti, and adrenaline-pumping river rafting.',
        best_time_to_visit: 'September to November', ideal_duration_days: 3, avg_budget_per_day: 3000,
        popularity_score: 90, trending_score: 85, crowd_level: 4, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Spiritual', 'Adventure'], ideal_for: ['Solo', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1596021688661-d3c528640df1?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n7', name: 'Auli', slug: 'auli', state: 'Uttarakhand', country: 'India', city: 'Auli', tier: 'Offbeat', category: 'Adventure',
        short_description: 'Top skiing destination with panoramic ropeway views.',
        full_description: 'Perfect for skiing enthusiasts, Auli offers snow-covered slopes and majestic Himalayan views.',
        best_time_to_visit: 'December to March', ideal_duration_days: 3, avg_budget_per_day: 6000,
        popularity_score: 75, trending_score: 90, crowd_level: 2, safety_score: 5, travel_connectivity_score: 2,
        vibe: ['Adventure', 'Nature'], ideal_for: ['Friends', 'Couples'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1549232358-7578cc1a932c?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n8', name: 'Nainital', slug: 'nainital', state: 'Uttarakhand', country: 'India', city: 'Nainital', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'Beautiful lake town in the Kumaon region.',
        full_description: 'Famous for the Naini Lake, the Snow View Point, and its vibrant Mall Road.',
        best_time_to_visit: 'March to June', ideal_duration_days: 3, avg_budget_per_day: 4500,
        popularity_score: 88, trending_score: 70, crowd_level: 4, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Nature', 'Peaceful'], ideal_for: ['Family', 'Couples'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1610715936287-60f952f20387?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n9', name: 'Mussoorie', slug: 'mussoorie', state: 'Uttarakhand', country: 'India', city: 'Mussoorie', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'The "Queen of Hills" with stunning cliff views.',
        full_description: 'Known for Kempty Falls, Gun Hill, and its charming British-era architecture.',
        best_time_to_visit: 'April to June', ideal_duration_days: 3, avg_budget_per_day: 5000,
        popularity_score: 89, trending_score: 72, crowd_level: 5, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Nature', 'Heritage'], ideal_for: ['Friends', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1610413340084-e3498802d08f?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'n10', name: 'Amritsar', slug: 'amritsar', state: 'Punjab', country: 'India', city: 'Amritsar', tier: 'Tier 1', category: 'Spiritual',
        short_description: 'Spiritual tourism and rich culinary heritage.',
        full_description: 'Home to the magnificent Golden Temple and the patriotic Wagah Border ceremony.',
        best_time_to_visit: 'October to March', ideal_duration_days: 2, avg_budget_per_day: 3500,
        popularity_score: 96, trending_score: 80, crowd_level: 5, safety_score: 5, travel_connectivity_score: 5,
        vibe: ['Spiritual', 'Urban'], ideal_for: ['Family', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1589139281201-df939f06bc9a?q=80&w=800&auto=format&fit=crop' }
    },

    // --- WEST INDIA ---
    {
        id: 'w1', name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', country: 'India', city: 'Jaipur', tier: 'Tier 1', category: 'Heritage',
        short_description: 'The "Pink City" famous for royal palaces.',
        full_description: 'Explore the Hawa Mahal, Amer Fort, and the rich Rajasthani culture.',
        best_time_to_visit: 'October to March', ideal_duration_days: 3, avg_budget_per_day: 5500,
        popularity_score: 98, trending_score: 85, crowd_level: 5, safety_score: 5, travel_connectivity_score: 5,
        vibe: ['Heritage', 'Luxury'], ideal_for: ['Family', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1477587458883-471a5ed08be4?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'w2', name: 'Udaipur', slug: 'udaipur', state: 'Rajasthan', country: 'India', city: 'Udaipur', tier: 'Tier 1', category: 'Heritage',
        short_description: 'Romantic "City of Lakes".',
        full_description: 'Famous for its City Palace, Lake Pichola, and scenic romantic boat rides.',
        best_time_to_visit: 'September to March', ideal_duration_days: 3, avg_budget_per_day: 6500,
        popularity_score: 94, trending_score: 90, crowd_level: 4, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Romantic', 'Luxury'], ideal_for: ['Couples', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'w3', name: 'Jaisalmer', slug: 'jaisalmer', state: 'Rajasthan', country: 'India', city: 'Jaisalmer', tier: 'Tier 2', category: 'Desert',
        short_description: 'Desert safaris and golden architecture.',
        full_description: 'Experience the Sam Sand Dunes, Jaisalmer Fort, and the magic of the Thar Desert.',
        best_time_to_visit: 'November to February', ideal_duration_days: 3, avg_budget_per_day: 4000,
        popularity_score: 86, trending_score: 82, crowd_level: 3, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Adventure', 'Heritage'], ideal_for: ['Friends', 'Couples'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1504128150490-375740488177?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'w4', name: 'Mount Abu', slug: 'mount-abu', state: 'Rajasthan', country: 'India', city: 'Mount Abu', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'Rajasthan\'s only hill station.',
        full_description: 'Explore Nakki Lake, the stunning Dilwara Temples, and enjoy cool breezes.',
        best_time_to_visit: 'November to June', ideal_duration_days: 2, avg_budget_per_day: 4000,
        popularity_score: 82, trending_score: 70, crowd_level: 4, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Nature', 'Peaceful'], ideal_for: ['Family', 'Couples'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'w5', name: 'Goa', slug: 'goa', state: 'Goa', country: 'India', city: 'Panaji', tier: 'Tier 1', category: 'Beach',
        short_description: 'Premier beach destination and nightlife hub.',
        full_description: 'Known for Baga Beach, Anjuna, Old Goa churches, and its vibrant nightlife.',
        best_time_to_visit: 'November to February', ideal_duration_days: 5, avg_budget_per_day: 5500,
        popularity_score: 100, trending_score: 95, crowd_level: 5, safety_score: 4, travel_connectivity_score: 5,
        vibe: ['Party', 'Backpacking'], ideal_for: ['Friends', 'Couples'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1512757776214-26d36777b513?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'w6', name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', country: 'India', city: 'Mumbai', tier: 'Tier 1', category: 'Urban',
        short_description: 'The city of dreams and Bollywood.',
        full_description: 'Explore Marine Drive, Gateway of India, and the fast-paced life of India\'s financial capital.',
        best_time_to_visit: 'November to February', ideal_duration_days: 3, avg_budget_per_day: 6000,
        popularity_score: 97, trending_score: 85, crowd_level: 5, safety_score: 4, travel_connectivity_score: 5,
        vibe: ['Urban', 'Party'], ideal_for: ['Friends', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'w7', name: 'Lonavala', slug: 'lonavala', state: 'Maharashtra', country: 'India', city: 'Lonavala', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'Monsoon favorite and weekend getaway.',
        full_description: 'Famous for Tiger Point, Bhushi Dam, and its lush green landscapes during the rains.',
        best_time_to_visit: 'June to September', ideal_duration_days: 2, avg_budget_per_day: 4000,
        popularity_score: 85, trending_score: 92, crowd_level: 5, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Nature', 'Peaceful'], ideal_for: ['Family', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1626075678385-26510363bb8c?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'w8', name: 'Alibaug', slug: 'alibaug', state: 'Maharashtra', country: 'India', city: 'Alibaug', tier: 'Tier 2', category: 'Beach',
        short_description: 'Peaceful coastal town near Mumbai.',
        full_description: 'Perfect for weekend beach trips, exploring historic forts, and enjoying the Arabian Sea.',
        best_time_to_visit: 'November to March', ideal_duration_days: 2, avg_budget_per_day: 4500,
        popularity_score: 80, trending_score: 75, crowd_level: 3, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Peaceful', 'Nature'], ideal_for: ['Friends', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop' }
    },

    // --- SOUTH INDIA ---
    {
        id: 's1', name: 'Ooty', slug: 'ooty', state: 'Tamil Nadu', country: 'India', city: 'Ooty', tier: 'Tier 1', category: 'Hill Station',
        short_description: 'Scenic hill station with vast tea gardens.',
        full_description: 'Known for its beautiful tea estates, Ooty Lake, and the pleasant botanical gardens.',
        best_time_to_visit: 'March to June', ideal_duration_days: 3, avg_budget_per_day: 4500,
        popularity_score: 91, trending_score: 78, crowd_level: 5, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Nature', 'Peaceful'], ideal_for: ['Family', 'Couples'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's2', name: 'Kodaikanal', slug: 'kodaikanal', state: 'Tamil Nadu', country: 'India', city: 'Kodaikanal', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'Misty hills and forest trails.',
        full_description: 'Featuring the Coaker’s Walk and a serene lake, it\'s the perfect "Princess of Hill Stations".',
        best_time_to_visit: 'April to June', ideal_duration_days: 3, avg_budget_per_day: 4000,
        popularity_score: 87, trending_score: 82, crowd_level: 4, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Nature', 'Peaceful'], ideal_for: ['Couples', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1590050810495-24e526a63529?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's3', name: 'Munnar', slug: 'munnar', state: 'Kerala', country: 'India', city: 'Munnar', tier: 'Tier 1', category: 'Hill Station',
        short_description: 'Lush green tea plantations.',
        full_description: 'Walk through endless tea estates, Eravikulam National Park, and enjoy the misty weather.',
        best_time_to_visit: 'September to March', ideal_duration_days: 3, avg_budget_per_day: 4500,
        popularity_score: 94, trending_score: 88, crowd_level: 4, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Nature', 'Peaceful'], ideal_for: ['Couples', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's4', name: 'Alleppey', slug: 'alleppey', state: 'Kerala', country: 'India', city: 'Alappuzha', tier: 'Tier 1', category: 'Nature',
        short_description: 'Backwaters and houseboat stays.',
        full_description: 'Experience the unique backwaters of Kerala with a stay in traditional houseboats.',
        best_time_to_visit: 'November to February', ideal_duration_days: 2, avg_budget_per_day: 6000,
        popularity_score: 93, trending_score: 85, crowd_level: 3, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Romantic', 'Peaceful'], ideal_for: ['Couples', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's5', name: 'Wayanad', slug: 'wayanad', state: 'Kerala', country: 'India', city: 'Kalpetta', tier: 'Tier 2', category: 'Wildlife',
        short_description: 'Nature, caves, and wildlife.',
        full_description: 'Explore Edakkal Caves, stunning waterfalls, and rich wildlife sanctuaries.',
        best_time_to_visit: 'October to May', ideal_duration_days: 4, avg_budget_per_day: 4000,
        popularity_score: 84, trending_score: 86, crowd_level: 2, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Nature', 'Adventure'], ideal_for: ['Friends', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's6', name: 'Coorg', slug: 'coorg', state: 'Karnataka', country: 'India', city: 'Madikeri', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'Coffee estates and waterfalls.',
        full_description: 'The "Scotland of India", famous for its coffee plantations, Abbey Falls, and Raja\'s Seat.',
        best_time_to_visit: 'October to March', ideal_duration_days: 3, avg_budget_per_day: 4500,
        popularity_score: 89, trending_score: 80, crowd_level: 3, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Nature', 'Peaceful'], ideal_for: ['Couples', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1626075678385-26510363bb8c?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's7', name: 'Hampi', slug: 'hampi', state: 'Karnataka', country: 'India', city: 'Hampi', tier: 'Tier 2', category: 'Heritage',
        short_description: 'UNESCO heritage ruins.',
        full_description: 'Explore the mesmerizing ruins and temples of the Vijayanagara Empire.',
        best_time_to_visit: 'October to March', ideal_duration_days: 3, avg_budget_per_day: 3500,
        popularity_score: 83, trending_score: 92, crowd_level: 2, safety_score: 4, travel_connectivity_score: 3,
        vibe: ['Spiritual', 'Backpacking'], ideal_for: ['Solo', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1589139281201-df939f06bc9a?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's8', name: 'Gokarna', slug: 'gokarna', state: 'Karnataka', country: 'India', city: 'Gokarna', tier: 'Tier 2', category: 'Beach',
        short_description: 'Peaceful alternative to Goa.',
        full_description: 'Relax at Om Beach and Kudle Beach, known for their spiritual and serene atmosphere.',
        best_time_to_visit: 'October to March', ideal_duration_days: 3, avg_budget_per_day: 3000,
        popularity_score: 81, trending_score: 88, crowd_level: 2, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Peaceful', 'Backpacking'], ideal_for: ['Solo', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's9', name: 'Pondicherry', slug: 'pondicherry', state: 'Puducherry', country: 'India', city: 'Pondicherry', tier: 'Tier 2', category: 'Beach',
        short_description: 'French architecture and spiritual vibe.',
        full_description: 'Known for its French Quarter, Auroville, and tranquil beaches.',
        best_time_to_visit: 'October to March', ideal_duration_days: 2, avg_budget_per_day: 4500,
        popularity_score: 88, trending_score: 82, crowd_level: 4, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Peaceful', 'Heritage'], ideal_for: ['Couples', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 's10', name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', country: 'India', city: 'Hyderabad', tier: 'Tier 1', category: 'Urban',
        short_description: 'Ric heritage and famous food.',
        full_description: 'Famous for the Charminar, Ramoji Film City, and its unparalleled Biryani.',
        best_time_to_visit: 'November to February', ideal_duration_days: 3, avg_budget_per_day: 5000,
        popularity_score: 95, trending_score: 80, crowd_level: 5, safety_score: 4, travel_connectivity_score: 5,
        vibe: ['Urban', 'Heritage'], ideal_for: ['Family', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?q=80&w=800&auto=format&fit=crop' }
    },
    // ... rest of the file ...


    // --- CENTRAL & EAST INDIA ---
    {
        id: 'e1', name: 'Khajuraho', slug: 'khajuraho', state: 'Madhya Pradesh', country: 'India', city: 'Khajuraho', tier: 'Tier 2', category: 'Heritage',
        short_description: 'UNESCO world heritage temples.',
        full_description: 'Famous for its exquisite erotic carvings and stunning temple architecture.',
        best_time_to_visit: 'October to March', ideal_duration_days: 2, avg_budget_per_day: 4000,
        popularity_score: 80, trending_score: 75, crowd_level: 3, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Heritage', 'Spiritual'], ideal_for: ['Solo', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1544450173-8c879e9352e2?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e2', name: 'Ujjain', slug: 'ujjain', state: 'Madhya Pradesh', country: 'India', city: 'Ujjain', tier: 'Tier 2', category: 'Spiritual',
        short_description: 'Spiritual tourism hub.',
        full_description: 'Home to the Mahakaleshwar Temple, one of the 12 Jyotirlingas.',
        best_time_to_visit: 'October to March', ideal_duration_days: 2, avg_budget_per_day: 3000,
        popularity_score: 91, trending_score: 85, crowd_level: 5, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Spiritual', 'Healing'], ideal_for: ['Family', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1589139281201-df939f06bc9a?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e3', name: 'Orchha', slug: 'orchha', state: 'Madhya Pradesh', country: 'India', city: 'Orchha', tier: 'Offbeat', category: 'Heritage',
        short_description: 'Charming heritage town.',
        full_description: 'Explore the historic Orchha Fort and its stunning riverside structures.',
        best_time_to_visit: 'September to March', ideal_duration_days: 2, avg_budget_per_day: 3500,
        popularity_score: 74, trending_score: 82, crowd_level: 2, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Heritage', 'Peaceful'], ideal_for: ['Solo', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1514039031201-df939f06bc9a?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e4', name: 'Varanasi', slug: 'varanasi', state: 'Uttar Pradesh', country: 'India', city: 'Varanasi', tier: 'Tier 1', category: 'Spiritual',
        short_description: 'The oldest living city in the world.',
        full_description: 'Experience the mystical Ganga Ghats and the Kashi Vishwanath Temple.',
        best_time_to_visit: 'October to March', ideal_duration_days: 3, avg_budget_per_day: 3500,
        popularity_score: 96, trending_score: 90, crowd_level: 5, safety_score: 3, travel_connectivity_score: 5,
        vibe: ['Spiritual', 'Healing'], ideal_for: ['Solo', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e5', name: 'Agra', slug: 'agra', state: 'Uttar Pradesh', country: 'India', city: 'Agra', tier: 'Tier 1', category: 'Heritage',
        short_description: 'Home of the Taj Mahal.',
        full_description: 'Explore Mughal architecture in its finest form including the Agra Fort.',
        best_time_to_visit: 'October to March', ideal_duration_days: 2, avg_budget_per_day: 5000,
        popularity_score: 100, trending_score: 80, crowd_level: 5, safety_score: 4, travel_connectivity_score: 5,
        vibe: ['Heritage', 'Romantic'], ideal_for: ['Family', 'Couples'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1564507592333-c60657451dd0?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e6', name: 'Ayodhya', slug: 'ayodhya', state: 'Uttar Pradesh', country: 'India', city: 'Ayodhya', tier: 'Tier 2', category: 'Spiritual',
        short_description: 'Major religious tourism destination.',
        full_description: 'The birthplace of Lord Rama, featuring the newly built Ram Mandir.',
        best_time_to_visit: 'October to March', ideal_duration_days: 2, avg_budget_per_day: 3500,
        popularity_score: 95, trending_score: 98, crowd_level: 5, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Spiritual', 'Healing'], ideal_for: ['Family', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1589139281201-df939f06bc9a?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e7', name: 'Kolkata', slug: 'kolkata', state: 'West Bengal', country: 'India', city: 'Kolkata', tier: 'Tier 1', category: 'Urban',
        short_description: 'Cultural and culinary capital.',
        full_description: 'Explore the Howrah Bridge, Victoria Memorial, and rich Bengali culture.',
        best_time_to_visit: 'October to March', ideal_duration_days: 3, avg_budget_per_day: 4000,
        popularity_score: 91, trending_score: 82, crowd_level: 5, safety_score: 5, travel_connectivity_score: 5,
        vibe: ['Urban', 'Heritage'], ideal_for: ['Family', 'Friends'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1558434088-9366cf8e5c8a?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e8', name: 'Darjeeling', slug: 'darjeeling', state: 'West Bengal', country: 'India', city: 'Darjeeling', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'Stunning Himalayan views and tea gardens.',
        full_description: 'Famous for Tiger Hill sunrise and its lush tea plantations.',
        best_time_to_visit: 'March to June', ideal_duration_days: 3, avg_budget_per_day: 4500,
        popularity_score: 88, trending_score: 75, crowd_level: 4, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Nature', 'Heritage'], ideal_for: ['Couples', 'Family'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1544450173-8c879e9352e2?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e9', name: 'Gangtok', slug: 'gangtok', state: 'Sikkim', country: 'India', city: 'Gangtok', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'Clean hill city with Tibetan cultural influence.',
        full_description: 'Explore Nathula Pass and Tsomgo Lake in this beautifully maintained city.',
        best_time_to_visit: 'March to June', ideal_duration_days: 4, avg_budget_per_day: 4500,
        popularity_score: 84, trending_score: 90, crowd_level: 3, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Spiritual', 'Adventure'], ideal_for: ['Friends', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e10', name: 'Shillong', slug: 'shillong', state: 'Meghalaya', country: 'India', city: 'Shillong', tier: 'Tier 2', category: 'Hill Station',
        short_description: 'The "Scotland of the East".',
        full_description: 'Famous for Umiam Lake and stunning waterfalls in the Khasi hills.',
        best_time_to_visit: 'March to June', ideal_duration_days: 4, avg_budget_per_day: 4000,
        popularity_score: 79, trending_score: 88, crowd_level: 2, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Nature', 'Adventure'], ideal_for: ['Friends', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1620857313645-31a89c9320e8?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e11', name: 'Kaziranga', slug: 'kaziranga', state: 'Assam', country: 'India', city: 'Kaziranga', tier: 'Offbeat', category: 'Wildlife',
        short_description: 'Home of the one-horned rhino.',
        full_description: 'Experience immersive national park safaris in a UNESCO world heritage site.',
        best_time_to_visit: 'November to April', ideal_duration_days: 3, avg_budget_per_day: 5000,
        popularity_score: 77, trending_score: 85, crowd_level: 2, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Nature', 'Adventure'], ideal_for: ['Family', 'Solo'],
        is_hidden_gem: false, is_international: false,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'e12', name: 'Andaman', slug: 'andaman', state: 'Andaman & Nicobar', country: 'India', city: 'Port Blair', tier: 'Tier 1', category: 'Beach',
        short_description: 'Clear blue beaches and scuba diving.',
        full_description: 'Explore Havelock Island, Radhanagar Beach, and some of the world\'s best diving spots.',
        best_time_to_visit: 'November to May', ideal_duration_days: 6, avg_budget_per_day: 8500,
        popularity_score: 95, trending_score: 98, crowd_level: 3, safety_score: 5, travel_connectivity_score: 2,
        vibe: ['Adventure', 'Romantic'], ideal_for: ['Friends', 'Couples'],
        is_hidden_gem: false, is_international: false,

        primary_image: { image_url: 'https://images.unsplash.com/photo-1589988581720-6d0d29227570?q=80&w=800&auto=format&fit=crop' }
    },

    // --- INTERNATIONAL ---
    {
        id: 'i1', name: 'Bali', slug: 'bali', state: 'Indonesia', country: 'Indonesia', city: 'Ubud', tier: 'Tier 1', category: 'Beach',
        short_description: 'Tropical paradise with lush jungles and beaches.',
        full_description: 'Known for its volcanic mountains, iconic rice paddies, coral reefs and religious sites.',
        best_time_to_visit: 'April to October', ideal_duration_days: 6, avg_budget_per_day: 8000,
        popularity_score: 98, trending_score: 95, crowd_level: 4, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Nature', 'Peaceful', 'Romantic'], ideal_for: ['Couples', 'Solo'],
        is_hidden_gem: false, is_international: true,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'i2', name: 'Paris', slug: 'paris', state: 'France', country: 'France', city: 'Paris', tier: 'Tier 1', category: 'Urban',
        short_description: 'The city of lights and love.',
        full_description: 'Global center for art, fashion, gastronomy and culture. Iconic Eiffel Tower and Louvre Museum.',
        best_time_to_visit: 'June to August', ideal_duration_days: 5, avg_budget_per_day: 15000,
        popularity_score: 100, trending_score: 85, crowd_level: 5, safety_score: 4, travel_connectivity_score: 5,
        vibe: ['Romantic', 'Luxury', 'Urban'], ideal_for: ['Couples', 'Friends'],
        is_hidden_gem: false, is_international: true,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'i3', name: 'Dubai', slug: 'dubai', state: 'UAE', country: 'UAE', city: 'Dubai', tier: 'Tier 1', category: 'Desert',
        short_description: 'Ultramodern architecture and luxury shopping.',
        full_description: 'Famous for Burj Khalifa, luxury shopping, and a lively nightscene.',
        best_time_to_visit: 'November to March', ideal_duration_days: 4, avg_budget_per_day: 12000,
        popularity_score: 99, trending_score: 90, crowd_level: 5, safety_score: 5, travel_connectivity_score: 5,
        vibe: ['Luxury', 'Urban', 'Adventure'], ideal_for: ['Family', 'Friends'],
        is_hidden_gem: false, is_international: true,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1512453979798-5ea4a73a88d4?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'i4', name: 'Santorini', slug: 'santorini', state: 'Greece', country: 'Greece', city: 'Oia', tier: 'Tier 1', category: 'Island',
        short_description: 'Stunning sunsets and whitewashed houses.',
        full_description: 'One of the Cyclades islands in the Aegean Sea. Known for its white buildings with blue roofs.',
        best_time_to_visit: 'April to October', ideal_duration_days: 4, avg_budget_per_day: 18000,
        popularity_score: 97, trending_score: 92, crowd_level: 4, safety_score: 5, travel_connectivity_score: 3,
        vibe: ['Romantic', 'Luxury', 'Nature'], ideal_for: ['Couples'],
        is_hidden_gem: false, is_international: true,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop' }
    },
    {
        id: 'i5', name: 'Swiss Alps', slug: 'swiss-alps', state: 'Switzerland', country: 'Switzerland', city: 'Zermatt', tier: 'Tier 1', category: 'Hill Station',
        short_description: 'Majestic mountains and snow sports.',
        full_description: 'Breathtaking mountain scenery, world-class skiing, and charming alpine villages.',
        best_time_to_visit: 'December to March', ideal_duration_days: 5, avg_budget_per_day: 20000,
        popularity_score: 96, trending_score: 88, crowd_level: 3, safety_score: 5, travel_connectivity_score: 4,
        vibe: ['Nature', 'Peaceful', 'Adventure'], ideal_for: ['Family', 'Couples'],
        is_hidden_gem: false, is_international: true,
        primary_image: { image_url: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=800&auto=format&fit=crop' }
    }
];
