const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function uuidv4() {
    return crypto.randomUUID();
}

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const destMap = {};
const destinations = [
    {
        name: "Goa", state: "Goa", city: "Panaji", iata: "GOI", category: "Beach",
        vibe: ["Party", "Relaxing", "Adventure"], budget: 5000,
        short_desc: "Sun, sand and seafood.",
        full_desc: "Goa is India's pocket-sized paradise, known for its endless beaches, stellar nightlife, and Portuguese-influenced architecture.",
        best_time: "November to February", ideal_days: 5, pop_score: 100, conn_score: 5, safe_score: 4, crowd: 5,
        ideal: ["Friends", "Couples"], hidden: false, tier: "Tier 1",
        images: ["https://images.unsplash.com/photo-1512757776214-26d36777b513", "https://images.unsplash.com/photo-1510798831971-661eb04b3739"]
    },
    {
        name: "Munnar", state: "Kerala", city: "Munnar", iata: "COK", category: "Hill Station",
        vibe: ["Peaceful", "Romantic", "Nature"], budget: 4000,
        short_desc: "Green hills and tea plantations.",
        full_desc: "Munnar is a town and hill station located in the Idukki district of Kerala, famous for its lush tea estates and misty mountains.",
        best_time: "September to May", ideal_days: 4, pop_score: 92, conn_score: 4, safe_score: 5, crowd: 2,
        ideal: ["Couples", "Family"], hidden: false, tier: "Tier 2",
        images: ["https://images.unsplash.com/photo-1523712999610-f77fbcfc3843", "https://images.unsplash.com/photo-1593693397690-362ad9666ec2"]
    },
    {
        name: "Varanasi", state: "Uttar Pradesh", city: "Varanasi", iata: "VNS", category: "Spiritual",
        vibe: ["Spiritual", "Healing", "History"], budget: 3000,
        short_desc: "The oldest living city.",
        full_desc: "Varanasi, the spiritual capital of India, is one of the world's oldest continually inhabited cities, sacred to Hindus and Buddhists.",
        best_time: "October to March", ideal_days: 3, pop_score: 95, conn_score: 4, safe_score: 4, crowd: 5,
        ideal: ["Solo", "Family"], hidden: false, tier: "Tier 2",
        images: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc", "https://images.unsplash.com/photo-1590050752117-23a9d7cdee52"]
    },
    {
        name: "Hanle", state: "Ladakh", city: "Hanle", iata: "LEH", category: "Nature",
        vibe: ["Peaceful", "Adventure", "Nature"], budget: 6000,
        short_desc: "India's first Dark Sky Reserve.",
        full_desc: "Hanle is a remote village in Ladakh, home to the Indian Astronomical Observatory and offering the clearest night skies in India.",
        best_time: "May to September", ideal_days: 2, pop_score: 30, conn_score: 2, safe_score: 5, crowd: 1,
        ideal: ["Solo", "Friends"], hidden: true, tier: "Offbeat",
        images: ["https://images.unsplash.com/photo-1544216717-3bbf52512659"]
    },
    {
        name: "Rishikesh", state: "Uttarakhand", city: "Rishikesh", iata: "DED", category: "Adventure",
        vibe: ["Spiritual", "Healing", "Adventure"], budget: 3500,
        short_desc: "Yoga Capital and Adventure Hub.",
        full_desc: "Rishikesh is where spiritual seekers come for yoga and adrenaline junkies come for white-water rafting on the holy Ganges.",
        best_time: "March to May, Sept to Nov", ideal_days: 4, pop_score: 94, conn_score: 4, safe_score: 5, crowd: 4,
        ideal: ["Solo", "Friends"], hidden: false, tier: "Tier 2",
        images: ["https://images.unsplash.com/photo-1596021688661-d3c528640df1", "https://images.unsplash.com/photo-1614092777214-997f748039c3"]
    },
    {
        name: "Udaipur", state: "Rajasthan", city: "Udaipur", iata: "UDR", category: "Heritage",
        vibe: ["Romantic", "Luxury", "History"], budget: 8000,
        short_desc: "The City of Lakes.",
        full_desc: "Udaipur, formerly the capital of the Mewar Kingdom, is a city in Rajasthan known for its lavish royal residences and artificial lake system.",
        best_time: "October to March", ideal_days: 3, pop_score: 96, conn_score: 4, safe_score: 5, crowd: 3,
        ideal: ["Couples", "Family"], hidden: false, tier: "Tier 1",
        images: ["https://images.unsplash.com/photo-1547984815-f5383546738c", "https://images.unsplash.com/photo-1589302168068-964664d93dc0"]
    },
    {
        name: "Hampi", state: "Karnataka", city: "Hampi", iata: "HBX", category: "Heritage",
        vibe: ["History", "Peaceful", "Adventure"], budget: 4000,
        short_desc: "Ruins of the Vijayanagara Empire.",
        full_desc: "Hampi is a UNESCO World Heritage site dotted with ruins of temples, monolithic sculptures, and forts from the 14th-century empire.",
        best_time: "October to February", ideal_days: 3, pop_score: 88, conn_score: 3, safe_score: 5, crowd: 2,
        ideal: ["Solo", "Friends"], hidden: false, tier: "Offbeat",
        images: ["https://images.unsplash.com/photo-1590494412210-94d7cad07147", "https://images.unsplash.com/photo-1589201990426-ed16738b975e"]
    },
    {
        name: "Alleppey", state: "Kerala", city: "Alappuzha", iata: "COK", category: "Nature",
        vibe: ["Peaceful", "Romantic", "Nature"], budget: 5500,
        short_desc: "Venice of the East.",
        full_desc: "Alleppey is famous for its backwater houseboats, lagoons, and palm-fringed canals where life moves at a serene pace.",
        best_time: "September to March", ideal_days: 2, pop_score: 90, conn_score: 4, safe_score: 5, crowd: 3,
        ideal: ["Couples", "Family"], hidden: false, tier: "Tier 2",
        images: ["https://images.unsplash.com/photo-1593693397690-362ad9666ec2", "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944"]
    },
    {
        name: "Leh", state: "Ladakh", city: "Leh", iata: "LEH", category: "Adventure",
        vibe: ["Adventure", "Peaceful", "Nature"], budget: 9000,
        short_desc: "Land of High Passes.",
        full_desc: "Leh is a high-altitude desert city in Ladakh, offering dramatic landscapes, Buddhist monasteries, and world-class trekking.",
        best_time: "May to September", ideal_days: 6, pop_score: 93, conn_score: 3, safe_score: 5, crowd: 3,
        ideal: ["Solo", "Friends"], hidden: false, tier: "Tier 1",
        images: ["https://images.unsplash.com/photo-1544216717-3bbf52512659", "https://images.unsplash.com/photo-1614092777214-997f748039c3"]
    }
];

const destCsvRows = [
    "id,name,slug,state,city,iata_code,tier,category,short_description,full_description,best_time_to_visit,ideal_duration_days,avg_budget_per_day,is_hidden_gem,popularity_score,crowd_level,safety_score,travel_connectivity_score,vibe,ideal_for"
];
const mediaCsvRows = ["id,entity_type,entity_id,image_url,thumbnail_url,alt_text,is_primary,source_credit"];

destinations.forEach(d => {
    const id = uuidv4();
    const slug = d.name.toLowerCase().replace(/ /g, '-');
    destMap[d.name] = id;
    destCsvRows.push(`${id},"${d.name}","${slug}","${d.state}","${d.city}","${d.iata}","${d.tier}","${d.category}","${d.short_desc}","${d.full_desc}","${d.best_time}",${d.ideal_days},${d.budget},${d.hidden},${d.pop_score},${d.crowd},${d.safe_score},${d.conn_score},"{${d.vibe.join(',')}}","{${d.ideal.join(',')}}"`);

    // Media for destinations
    d.images.forEach((img, idx) => {
        mediaCsvRows.push(`${uuidv4()},"destination",${id},"${img}","${img}?w=200","${d.name} view",${idx === 0},"Unsplash"`);
    });
});

const hotels = [
    { name: "Taj Exotica Resort & Spa", dest_name: "Goa", type: "Luxury", price: 25000, rating: 4.8, amenities: ["Spa", "Private Beach", "Pool", "WiFi"], images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"] },
    { name: "W Goa", dest_name: "Goa", type: "Resort", price: 18000, rating: 4.7, amenities: ["Nightclub", "Pool", "Gym"], images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"] },
    { name: "Amber Dale Luxury Hotel", dest_name: "Munnar", type: "Resort", price: 7500, rating: 4.5, amenities: ["Spa", "Mountain View", "Restaurant", "WiFi"], images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"] },
    { name: "Fragrant Nature Munnar", dest_name: "Munnar", type: "Luxury", price: 12000, rating: 4.6, amenities: ["Yoga", "Ayurvedic Spa", "Nature Trails"], images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"] },
    { name: "Oberoi Udaivilas", dest_name: "Udaipur", type: "Luxury", price: 65000, rating: 4.9, amenities: ["Private Pool", "Royal Service", "Boat Arrival"], images: ["https://images.unsplash.com/photo-1547984815-f5383546738c"] },
    { name: "Brij Rama Palace", dest_name: "Varanasi", type: "Boutique", price: 20000, rating: 4.8, amenities: ["Ghat View", "Yoga", "Ancient Vibes"], images: ["https://images.unsplash.com/photo-1512757776214-26d36777b513"] },
    { name: "The Grand Dragon Ladakh", dest_name: "Leh", type: "Hotel", price: 15000, rating: 4.7, amenities: ["Oxygen Cylinders", "Heated Rooms", "Monastery view"], images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"] },
    { name: "Aloha On The Ganges", dest_name: "Rishikesh", type: "Resort", price: 9000, rating: 4.5, amenities: ["River View", "Infinity Pool", "Yoga Centre"], images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"] }
];

const restaurants = [
    { name: "Fisherman's Wharf", dest_name: "Goa", cuisine: ["Seafood", "Goan"], price: "Medium", cost: 1500, rating: 4.6, veg: false, images: ["https://images.unsplash.com/photo-1552566626-52f8b828add9"] },
    { name: "Saravana Bhavan", dest_name: "Varanasi", cuisine: ["South Indian"], price: "Low", cost: 500, rating: 4.4, veg: true, images: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd"] },
    { name: "Chokhi Dhani", dest_name: "Udaipur", cuisine: ["Rajasthani"], price: "Medium", cost: 1200, rating: 4.7, veg: true, images: ["https://images.unsplash.com/photo-1589302168068-964664d93dc0"] },
    { name: "The Beatles Cafe", dest_name: "Rishikesh", cuisine: ["Continental", "Vegan"], price: "Medium", cost: 800, rating: 4.5, veg: true, images: ["https://images.unsplash.com/photo-1552566626-52f8b828add9"] },
    { name: "Mango Tree Restaurant", dest_name: "Hampi", cuisine: ["Indian", "Global"], price: "Low", cost: 600, rating: 4.6, veg: true, images: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd"] }
];

const hotelCsvRows = ["id,name,destination_id,type,price_per_night_avg,rating,amenities"];
hotels.forEach(h => {
    const destId = destMap[h.dest_name];
    if (destId) {
        const id = uuidv4();
        hotelCsvRows.push(`${id},"${h.name}",${destId},"${h.type}",${h.price},${h.rating},"{${h.amenities.join(',')}}"`);
        h.images.forEach((img, idx) => {
            mediaCsvRows.push(`${uuidv4()},"hotel",${id},"${img}","${img}?w=200","${h.name} photo",${idx === 0},"Unsplash"`);
        });
    }
});

const restCsvRows = ["id,name,destination_id,cuisine_type,price_range,avg_cost_for_two,rating,veg_only"];
restaurants.forEach(r => {
    const destId = destMap[r.dest_name];
    if (destId) {
        const id = uuidv4();
        restCsvRows.push(`${id},"${r.name}",${destId},"{${r.cuisine.join(',')}}","${r.price}",${r.cost},${r.rating},${r.veg}`);
        r.images.forEach((img, idx) => {
            mediaCsvRows.push(`${uuidv4()},"restaurant",${id},"${img}","${img}?w=200","${r.name} photo",${idx === 0},"Unsplash"`);
        });
    }
});

const tripCsvRows = ["id,destination_id,mood,budget,duration_days,travel_type,itinerary,is_public,public_slug,share_count"];
const sampleTrips = [
    { dest_name: "Goa", mood: "Party", budget: 15000, days: 5, type: "friends", public: true, slug: "goa-party-vibes" },
    { dest_name: "Munnar", mood: "Peaceful", budget: 8000, days: 3, type: "couple", public: true, slug: "dreamy-munnar" },
    { dest_name: "Rishikesh", mood: "Spiritual", budget: 5000, days: 4, type: "solo", public: true, slug: "spiritual-quest" }
];
sampleTrips.forEach(t => {
    const destId = destMap[t.dest_name];
    if (destId) {
        tripCsvRows.push(`${uuidv4()},${destId},"${t.mood}",${t.budget},${t.days},"${t.type}","[]",${t.public},"${t.slug}",${Math.floor(Math.random() * 100)}`);
    }
});

fs.writeFileSync(path.join(dataDir, 'destinations.csv'), destCsvRows.join('\n'));
fs.writeFileSync(path.join(dataDir, 'hotels.csv'), hotelCsvRows.join('\n'));
fs.writeFileSync(path.join(dataDir, 'restaurants.csv'), restCsvRows.join('\n'));
fs.writeFileSync(path.join(dataDir, 'trips.csv'), tripCsvRows.join('\n'));
fs.writeFileSync(path.join(dataDir, 'media.csv'), mediaCsvRows.join('\n'));

console.log('Final complete sample data (9 Destinations, Multi-entity) generated successfully.');
