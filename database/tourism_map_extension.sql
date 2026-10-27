-- Extension to Supabase Schema for Global Interactive Map

CREATE TABLE IF NOT EXISTS tourism_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    category TEXT,
    mood_tags TEXT[] DEFAULT '{}',
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    description TEXT,
    image_url TEXT,
    is_hidden_gem BOOLEAN DEFAULT false,
    fun_fact TEXT,
    top_activities TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    embedding vector(1536)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tourism_lat_lng ON tourism_locations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_tourism_mood_tags_gin ON tourism_locations USING GIN (mood_tags);
CREATE INDEX IF NOT EXISTS idx_tourism_hidden_gem ON tourism_locations(is_hidden_gem);
CREATE INDEX IF NOT EXISTS idx_tourism_country ON tourism_locations(country);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS tr_tourism_locations_updated_at ON tourism_locations;
CREATE TRIGGER tr_tourism_locations_updated_at BEFORE UPDATE ON tourism_locations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Sample data for common global destinations
INSERT INTO tourism_locations (place_name, city, country, latitude, longitude, category, mood_tags, rating, description, image_url, is_hidden_gem, fun_fact, top_activities)
VALUES 
('Eiffel Tower', 'Paris', 'France', 48.8584, 2.2945, 'Heritage', '{"Romantic", "Urban Vibe"}', 4.9, 'The iron lady of Paris, a global icon of French culture.', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f', false, 'The Eiffel Tower grew 6 inches in 2022 due to the heatwave.', '{"Photo at Trocadéro", "Dinner at Jules Verne", "Sunset view"}'),
('Great Wall of China', 'Beijing', 'China', 40.4319, 116.5704, 'Heritage', '{"Heritage Walk", "Adventure"}', 4.8, 'Ancient wall stretching over 21,000 kilometers.', 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d', false, 'The Great Wall is nearly 3,000 years old.', '{"Mutianyu cable car", "Sunset hike", "History tour"}'),
('Machu Picchu', 'Cusco', 'Peru', -13.1631, -72.5450, 'Heritage', '{"Heritage Walk", "Adventure", "Nature Escape"}', 4.9, 'The lost city of the Incas, perched high in the Andes.', 'https://images.unsplash.com/photo-1526392060635-9d6019884377', false, 'Machu Picchu was built in the 15th century and abandoned a century later.', '{"Inca Trail trek", "Sun Gate view", "Llama watching"}'),
('Taj Mahal', 'Agra', 'India', 27.1751, 78.0421, 'Heritage', '{"Romantic", "Heritage Walk", "Solo Reflection"}', 5.0, 'An ivory-white marble mausoleum on the right bank of the river Yamuna.', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da', false, 'The Taj Mahal took 22 years and 20,000 workers to complete.', '{"Sunrise visit", "Mehtab Bagh views", "Local craft shops"}'),
('Santorini', 'Oia', 'Greece', 36.4618, 25.3753, 'Island', '{"Romantic", "Detox", "Nature Escape"}', 4.9, 'Famous for white-washed buildings and stunning sunsets.', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff', false, 'The island is actually a remnant of a huge volcanic explosion.', '{"Sunset watching", "Wine tasting", "Boat tours"}'),
('Kyoto Temples', 'Kyoto', 'Japan', 35.0116, 135.7681, 'Spiritual', '{"Spiritual", "Detox", "Solo Reflection"}', 4.8, 'Home to thousands of Buddhist temples and Shinto shrines.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e', false, 'Kyoto was the imperial capital of Japan for more than 1,000 years.', '{"Arashiyama Bamboo Grove", "Kinkaku-ji temple", "Tea ceremony"}'),
('Grand Canyon', 'Arizona', 'USA', 36.0544, -112.1401, 'Nature', '{"Nature Escape", "Adventure", "Solo Reflection"}', 4.9, 'One of the world''s most powerful and inspiring landscapes.', 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722', false, 'The Grand Canyon is 277 miles long and up to 18 miles wide.', '{"South Rim hike", "Helicopter tour", "Stargazing"}'),
('Bora Bora', 'Vaitape', 'French Polynesia', -16.5004, -151.7415, 'Island', '{"Luxury", "Romantic", "Detox"}', 5.0, 'Luxury destination known for its turquoise lagoons and overwater bungalows.', 'https://images.unsplash.com/photo-1505881502353-a1986adb472b', false, 'Bora Bora was used as a US military supply base during WWII.', '{"Snorkeling with rays", "Lagoon cruise", "Spa treatment"}'),
('Varanasi Ghats', 'Varanasi', 'India', 25.3176, 82.9739, 'Spiritual', '{"Spiritual", "Solo Reflection", "Heritage Walk"}', 4.7, 'The spiritual heart of India on the banks of the Ganges.', 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc', false, 'Varanasi is one of the oldest continuously inhabited cities in the world.', '{"Ganga Aarti", "Morning boat ride", "Silk weaving tour"}'),
('Hanle Dark Sky', 'Ladakh', 'India', 32.7667, 78.9667, 'Nature', '{"Solo Reflection", "Nature Escape", "Detox"}', 4.9, 'Remote village in Ladakh offering the clearest night skies.', 'https://images.unsplash.com/photo-1544498522-6b9449f807be', true, 'Hanle is home to India''s first Dark Sky Reserve.', '{"Stargazing", "Observatory visit", "Wildlife spotting"}');
