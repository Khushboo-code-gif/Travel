export type DestinationCategory = 'Beach' | 'Hill Station' | 'Spiritual' | 'Heritage' | 'Adventure' | 'Wildlife' | 'Desert' | 'Island' | 'Urban' | 'Nature';
export type MoodVibe = 'Peaceful' | 'Romantic' | 'Party' | 'Healing' | 'Spiritual' | 'Luxury' | 'Backpacking' | 'Adventure' | 'Nature' | 'Heritage' | 'Urban';
export type TravelerType = 'Solo' | 'Couples' | 'Friends' | 'Family';
export type DestinationTier = 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Offbeat';

export interface Attraction {
    id: string;
    destination_id: string;
    attraction_name: string;
    category: string;
    visit_time_hours: number;
    rating: number;
    description?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface Destination {
    id: string;
    name: string;
    slug: string;
    state: string;
    city: string;
    country: string;
    iata_code?: string;
    tier: DestinationTier;
    category: DestinationCategory;
    short_description: string;
    full_description?: string;
    best_time_to_visit?: string;
    ideal_duration_days?: number;
    avg_budget_per_day?: number;
    latitude?: number;
    longitude?: number;
    altitude_meters?: number;
    is_hidden_gem: boolean;
    is_international: boolean;
    recommendation_score?: number;
    popularity_score: number;
    trending_score: number;
    crowd_level: number;
    safety_score: number;
    travel_connectivity_score: number;
    vibe: MoodVibe[];
    ideal_for: TravelerType[];
    itinerary?: {
        day: number;
        title: string;
        activities: string[];
    }[];
    attractions?: Attraction[];
    primary_image?: {
        image_url: string;
        thumbnail_url?: string;
        alt_text?: string;
    };
    gallery_images?: any[];
}

export interface Hotel {
    id: string;
    name: string;
    type: string;
    price_per_night_avg: number;
    rating: number;
    amenities: string[];
    image_url?: string;
    primary_image?: any;
}

export interface Restaurant {
    id: string;
    name: string;
    cuisine_type: string[];
    price_range: 'Low' | 'Medium' | 'High';
    avg_cost_for_two: number;
    rating: number;
    veg_only: boolean;
    must_try_dishes: string[];
    primary_image?: any;
}
