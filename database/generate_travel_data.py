import csv
import uuid
import random
from datetime import datetime

# Helper to generate UUIDs
def get_uuid():
    return str(uuid.uuid4())

# 1. Destinations Data
destinations = [
    {
        "name": "Varanasi",
        "state": "Uttar Pradesh",
        "city": "Varanasi",
        "category": "Spiritual",
        "short_description": "The spiritual capital of India, known for its ancient ghats and Ganga Aarti.",
        "full_description": "Varanasi is one of the oldest continuously inhabited cities in the world. It is a major religious hub in India, it is the holiest of the seven sacred cities in Hinduism and Jainism, and played a critical role in the development of Buddhism.",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 3,
        "avg_budget_per_day": 2000,
        "latitude": 25.3176,
        "longitude": 82.9739,
        "is_hidden_gem": False,
        "popularity_score": 95,
        "crowd_level": 5,
        "vibe": ["Spiritual", "Healing"],
        "ideal_for": ["Solo", "Family"]
    },
    {
        "name": "Jaipur",
        "state": "Rajasthan",
        "city": "Jaipur",
        "category": "Heritage",
        "short_description": "The Pink City, famous for its royal forts, palaces, and vibrant culture.",
        "full_description": "Jaipur is the capital of India’s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or “Pink City” for its trademark building color.",
        "best_time_to_visit": "November to February",
        "ideal_duration_days": 3,
        "avg_budget_per_day": 3500,
        "latitude": 26.9124,
        "longitude": 75.7873,
        "is_hidden_gem": False,
        "popularity_score": 98,
        "crowd_level": 4,
        "vibe": ["Luxury", "Romantic"],
        "ideal_for": ["Couples", "Family", "Friends"]
    },
    {
        "name": "Munnar",
        "state": "Kerala",
        "city": "Munnar",
        "category": "Hill Station",
        "short_description": "A haven of tea plantations, rolling hills, and misty valleys.",
        "full_description": "Munnar is a town in the Western Ghats mountain range in India’s Kerala state. A hill station and former resort for the British Raj elite, it's surrounded by rolling hills dotted with tea plantations established in the late 19th century.",
        "best_time_to_visit": "September to May",
        "ideal_duration_days": 4,
        "avg_budget_per_day": 4000,
        "latitude": 10.0889,
        "longitude": 77.0595,
        "is_hidden_gem": False,
        "popularity_score": 92,
        "crowd_level": 3,
        "vibe": ["Peaceful", "Romantic", "Nature"],
        "ideal_for": ["Couples", "Family"]
    },
    {
        "name": "Goa",
        "state": "Goa",
        "city": "Panaji",
        "category": "Beach",
        "short_description": "India's favorite beach destination with a vibrant nightlife and Portuguese heritage.",
        "full_description": "Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area’s tropical spice plantations.",
        "best_time_to_visit": "November to February",
        "ideal_duration_days": 5,
        "avg_budget_per_day": 5000,
        "latitude": 15.2993,
        "longitude": 74.1240,
        "is_hidden_gem": False,
        "popularity_score": 100,
        "crowd_level": 5,
        "vibe": ["Party", "Backpacking", "Adventure"],
        "ideal_for": ["Friends", "Solo", "Couples"]
    },
    {
        "name": "Hanle",
        "state": "Ladakh",
        "city": "Hanle",
        "category": "Nature",
        "short_description": "The site of India's first Dark Sky Reserve, offering unparalleled stargazing.",
        "full_description": "Hanle is a village in Ladakh, India. It is the site of the 17th-century Hanle Monastery and the Indian Astronomical Observatory. The Hanle Dark Sky Reserve is a 1,073 sq km area offering some of the darkest skies in the world.",
        "best_time_to_visit": "May to September",
        "ideal_duration_days": 2,
        "avg_budget_per_day": 6000,
        "latitude": 32.77,
        "longitude": 78.98,
        "is_hidden_gem": True,
        "popularity_score": 30,
        "crowd_level": 1,
        "vibe": ["Peaceful", "Adventure"],
        "ideal_for": ["Solo", "Friends"]
    },
    {
        "name": "Gokarna",
        "state": "Karnataka",
        "city": "Gokarna",
        "category": "Beach",
        "short_description": "A tranquil alternative to Goa with pristine beaches and ancient temples.",
        "full_description": "Gokarna is a small temple town on the western coast of India in the Kumta taluk of Uttara Kannada district of the state of Karnataka. Known for its beaches and as a pilgrimage site.",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 3,
        "avg_budget_per_day": 2500,
        "latitude": 14.54,
        "longitude": 74.31,
        "is_hidden_gem": True,
        "popularity_score": 60,
        "crowd_level": 2,
        "vibe": ["Peaceful", "Backpacking", "Spiritual"],
        "ideal_for": ["Solo", "Friends", "Couples"]
    }
]

# Generate UUIDs for destinations and map them
dest_map = {}
for dest in destinations:
    dest_id = get_uuid()
    dest["id"] = dest_id
    dest["slug"] = dest["name"].lower().replace(" ", "-")
    dest_map[dest["name"]] = dest_id

# 2. Hotels Data
hotels = [
    {
        "name": "Taj Exotica Resort & Spa",
        "dest_name": "Goa",
        "type": "Luxury",
        "price": 25000,
        "rating": 4.8,
        "amenities": ["Spa", "Private Beach", "Pool", "WiFi"]
    },
    {
        "name": "Amber Dale Luxury Hotel",
        "dest_name": "Munnar",
        "type": "Resort",
        "price": 7500,
        "rating": 4.5,
        "amenities": ["Spa", "Mountain View", "Restaurant", "WiFi"]
    },
    {
        "name": "Rambagh Palace",
        "dest_name": "Jaipur",
        "type": "Luxury",
        "price": 45000,
        "rating": 4.9,
        "amenities": ["Palace Experience", "Spa", "Royal Dining", "Pool"]
    }
]

# 3. Restaurants Data
restaurants = [
    {
        "name": "Gunpowder",
        "dest_name": "Goa",
        "cuisine": ["South Indian", "Goan"],
        "price_range": "Medium",
        "cost_for_two": 1200,
        "rating": 4.6,
        "veg_only": False,
        "must_try": ["Goan Prawn Curry", "Appam"]
    },
    {
        "name": "Little Buddha Cafe",
        "dest_name": "Rishikesh",
        "cuisine": ["Continental", "Vegan"],
        "price_range": "Medium",
        "cost_for_two": 800,
        "rating": 4.4,
        "veg_only": True,
        "must_try": ["Wood-fired Pizza", "Avocado Toast"]
    }
]

# Write to CSV
def write_csv(filename, data):
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        if not data: return
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)

# Process and Save
write_csv("/Users/khushboogangarde/Documents/Travel Website/database/data/destinations.csv", destinations)

# Map hotels and restaurants to IDs
formatted_hotels = []
for h in hotels:
    if h["dest_name"] in dest_map:
        formatted_hotels.append({
            "id": get_uuid(),
            "name": h["name"],
            "destination_id": dest_map[h["dest_name"]],
            "type": h["type"],
            "price_per_night_avg": h["price"],
            "rating": h["rating"],
            "amenities": "{" + ",".join(h["amenities"]) + "}"
        })

write_csv("/Users/khushboogangarde/Documents/Travel Website/database/data/hotels.csv", formatted_hotels)

print("Sample data generated successfully in /database/data/")
