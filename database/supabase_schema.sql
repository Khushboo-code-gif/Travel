-- MoodTrip AI - Production-Ready Supabase Schema
-- Updated for Phase 2: Backend Intelligence and Optimization

-- 0. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector"; -- For AI Embeddings (pgvector)

-- 1. Enums for Categorization
DO $$ BEGIN
    CREATE TYPE destination_category AS ENUM (
        'Beach', 'Hill Station', 'Spiritual', 'Heritage', 
        'Adventure', 'Wildlife', 'Desert', 'Island', 'Urban', 'Nature'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE mood_vibe AS ENUM (
        'Peaceful', 'Romantic', 'Party', 'Healing', 
        'Spiritual', 'Luxury', 'Backpacking', 'Adventure'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE traveler_type AS ENUM (
        'Solo', 'Couples', 'Friends', 'Family'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE price_range AS ENUM (
        'Low', 'Medium', 'High'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE accommodation_type AS ENUM (
        'Hotel', 'Resort', 'Hostel', 'Boutique', 'Luxury'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE destination_tier AS ENUM (
        'Tier 1', 'Tier 2', 'Tier 3', 'Offbeat'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    iata_code CHAR(3), -- For Live Flight/Hotel APIs (e.g., 'DEL', 'BOM')
    tier destination_tier DEFAULT 'Tier 2',
    category destination_category NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    best_time_to_visit TEXT,
    ideal_duration_days INTEGER,
    avg_budget_per_day INTEGER, -- In INR
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    altitude_meters INTEGER,
    is_hidden_gem BOOLEAN DEFAULT false,
    popularity_score INTEGER DEFAULT 0 CHECK (popularity_score BETWEEN 0 AND 100),
    trending_score DECIMAL(5,2) DEFAULT 0.0,
    crowd_level INTEGER CHECK (crowd_level BETWEEN 1 AND 5),
    safety_score INTEGER CHECK (safety_score BETWEEN 1 AND 5),
    travel_connectivity_score INTEGER CHECK (travel_connectivity_score BETWEEN 1 AND 5),
    vibe mood_vibe[] DEFAULT '{}',
    ideal_for traveler_type[] DEFAULT '{}',
    embedding vector(1536), -- For OpenAI text-embedding-3-small or similar
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.1 Media Table (Relational Image Handling)
CREATE TYPE entity_type AS ENUM ('destination', 'hotel', 'restaurant', 'villa');

CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type entity_type NOT NULL,
    entity_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    alt_text TEXT,
    is_primary BOOLEAN DEFAULT false,
    source_credit TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_entity ON media(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_media_primary ON media(entity_id) WHERE is_primary = true;

-- 3. Hotels Table
CREATE TABLE IF NOT EXISTS hotels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    type accommodation_type NOT NULL,
    price_per_night_avg INTEGER NOT NULL, -- In INR
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    amenities TEXT[] DEFAULT '{}',
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    contact_info JSONB,
    property_score INTEGER CHECK (property_score BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Villas Table
CREATE TABLE IF NOT EXISTS villas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    max_guests INTEGER,
    bedrooms INTEGER,
    private_pool BOOLEAN DEFAULT false,
    price_per_night INTEGER NOT NULL, -- In INR
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    luxury_score INTEGER CHECK (luxury_score BETWEEN 1 AND 5),
    amenities TEXT[] DEFAULT '{}',
    host_type TEXT CHECK (host_type IN ('Individual', 'Company')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    cuisine_type TEXT[] DEFAULT '{}',
    price_range price_range NOT NULL,
    avg_cost_for_two INTEGER, -- In INR
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    veg_only BOOLEAN DEFAULT false,
    must_try_dishes TEXT[] DEFAULT '{}',
    opening_hours TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Indexes for Performance (PHASE 2 Optimization)
-- B-Tree for common filtering
CREATE INDEX IF NOT EXISTS idx_dest_state ON destinations(state);
CREATE INDEX IF NOT EXISTS idx_dest_city ON destinations(city);
CREATE INDEX IF NOT EXISTS idx_dest_tier ON destinations(tier);
CREATE INDEX IF NOT EXISTS idx_dest_hidden ON destinations(is_hidden_gem);
CREATE INDEX IF NOT EXISTS idx_dest_popularity ON destinations(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_dest_trending ON destinations(trending_score DESC);
CREATE INDEX IF NOT EXISTS idx_dest_slug ON destinations(slug);

-- GIN for array based fast filtering
CREATE INDEX IF NOT EXISTS idx_dest_vibe_gin ON destinations USING GIN (vibe);
CREATE INDEX IF NOT EXISTS idx_dest_ideal_for_gin ON destinations USING GIN (ideal_for);

-- Foreign Key Indexes for fast joins
CREATE INDEX IF NOT EXISTS idx_hotel_dest_id ON hotels(destination_id);
CREATE INDEX IF NOT EXISTS idx_villa_dest_id ON villas(destination_id);
CREATE INDEX IF NOT EXISTS idx_rest_dest_id ON restaurants(destination_id);

-- 7. Functions & Triggers for Automation
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_dest_updated_at ON destinations;
CREATE TRIGGER tr_dest_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS tr_hotel_updated_at ON hotels;
CREATE TRIGGER tr_hotel_updated_at BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Trending Score Calculation Logic (Mock implementation)
-- In production, this would be updated via a cron job or background worker
CREATE OR REPLACE FUNCTION calculate_trending_score(dest_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE destinations d
    SET trending_score = (
        (popularity_score * 0.5) + 
        (random() * 10) -- Representing recent search/activity volume
    )
    WHERE id = dest_id;
END;
$$ language 'plpgsql';

-- Semantic Search Function
CREATE OR REPLACE FUNCTION match_destinations (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  state TEXT,
  city TEXT,
  short_description TEXT,
  category destination_category,
  similarity float
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.name,
    d.slug,
    d.state,
    d.city,
    d.short_description,
    d.category,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM destinations d
  WHERE 1 - (d.embedding <=> query_embedding) > match_threshold
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- 8. Trips Table (For User Saved Plans)
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID DEFAULT NULL,
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    mood TEXT,
    budget INTEGER,
    duration_days INTEGER,
    travel_type TEXT,
    itinerary JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trips_user ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_trips_dest ON trips(destination_id);

CREATE TRIGGER tr_trips_updated_at BEFORE UPDATE ON trips FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Phase 4: Social & Community Layer Extensions

-- 9. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    is_public BOOLEAN DEFAULT true,
    explorer_level INTEGER DEFAULT 1,
    saved_trips_count INTEGER DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    review_text TEXT,
    helpful_count INTEGER DEFAULT 0,
    is_verified_trip BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Constraint: Must be linked to at least one entity
    CONSTRAINT review_target_check CHECK (
        (destination_id IS NOT NULL) OR 
        (hotel_id IS NOT NULL) OR 
        (restaurant_id IS NOT NULL)
    ),
    -- One review per user per entity
    CONSTRAINT unique_user_dest_review UNIQUE (user_id, destination_id),
    CONSTRAINT unique_user_hotel_review UNIQUE (user_id, hotel_id),
    CONSTRAINT unique_user_rest_review UNIQUE (user_id, restaurant_id)
);

-- 11. Extensions for Trips
ALTER TABLE trips ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
ALTER TABLE trips ADD COLUMN IF NOT EXISTS public_slug TEXT UNIQUE;
ALTER TABLE trips ADD COLUMN IF NOT EXISTS share_count INTEGER DEFAULT 0;
ALTER TABLE trips ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- 12. Automated Aggregations & Scoring
-- Function to update entity rating when a review is added
CREATE OR REPLACE FUNCTION update_entity_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update Destinations
    IF NEW.destination_id IS NOT NULL THEN
        UPDATE destinations 
        SET 
            popularity_score = (SELECT AVG(rating) * 20 FROM reviews WHERE destination_id = NEW.destination_id),
            updated_at = NOW()
        WHERE id = NEW.destination_id;
    END IF;
    
    -- Update Hotels
    IF NEW.hotel_id IS NOT NULL THEN
        UPDATE hotels 
        SET 
            rating = (SELECT AVG(rating) FROM reviews WHERE hotel_id = NEW.hotel_id),
            updated_at = NOW()
        WHERE id = NEW.hotel_id;
    END IF;

    -- Update Restaurants
    IF NEW.restaurant_id IS NOT NULL THEN
        UPDATE restaurants 
        SET 
            rating = (SELECT AVG(rating) FROM reviews WHERE restaurant_id = NEW.restaurant_id),
            updated_at = NOW()
        WHERE id = NEW.restaurant_id;
    END IF;

    -- Update Profile Review Count
    UPDATE profiles SET reviews_count = reviews_count + 1 WHERE id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_review_added
AFTER INSERT ON reviews
FOR EACH ROW EXECUTE PROCEDURE update_entity_rating();

-- Enhanced Trending Score 4.0
CREATE OR REPLACE FUNCTION refresh_trending_scores()
RETURNS VOID AS $$
BEGIN
    UPDATE destinations d
    SET trending_score = (
        (COALESCE((SELECT COUNT(*) FROM reviews r WHERE r.destination_id = d.id), 0) * 10) +
        (COALESCE((SELECT COUNT(*) FROM trips t WHERE t.destination_id = d.id), 0) * 5) +
        (COALESCE((SELECT SUM(share_count) FROM trips t WHERE t.destination_id = d.id), 0) * 2) +
        (popularity_score * 0.5)
    );
END;
$$ LANGUAGE plpgsql;

-- Indexes for Phase 4
CREATE INDEX IF NOT EXISTS idx_reviews_dest ON reviews(destination_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_trips_public_slug ON trips(public_slug);

-- Function to increment share count
CREATE OR REPLACE FUNCTION increment_share_count(trip_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE trips SET share_count = share_count + 1 WHERE id = trip_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment saved trips count on profile
CREATE OR REPLACE FUNCTION update_profile_saved_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE profiles SET saved_trips_count = saved_trips_count + 1 WHERE id = NEW.user_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE profiles SET saved_trips_count = GREATEST(0, saved_trips_count - 1) WHERE id = OLD.user_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_trip_count_change
AFTER INSERT OR DELETE ON trips
FOR EACH ROW EXECUTE PROCEDURE update_profile_saved_count();
