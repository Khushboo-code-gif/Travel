import OpenAI from 'openai';
import { Destination, Attraction } from '@/types';

const apiKey = process.env.OPENAI_API_KEY;

let openai: OpenAI | null = null;
if (apiKey) {
    openai = new OpenAI({ apiKey });
} else {
    console.warn("Missing OpenAI API Key. Using Mock AI Response.");
}

interface GenerateParams {
    destination: Destination;
    mood: string;
    duration: number;
    travelType: string;
    budget: string;
}

export async function generateItinerary(params: GenerateParams) {
    if (!openai) {
        return getMockItinerary(params);
    }

    try {
        const attractions = params.destination.attractions || [];
        const attractionsText = attractions.length > 0
            ? attractions.map(a => `- ${a.attraction_name} (${a.category}): ${a.description || ''}`).join('\n')
            : "No specific attractions provided. Use your knowledge of this location but stay realistic.";

        const prompt = `
            Build an AI-powered itinerary generator for a travel recommendation application.
            The application recommends travel destinations based on user mood.
            
            USER CONTEXT:
            - Destination: ${params.destination.name}, ${params.destination.city}, ${params.destination.country}
            - Mood: ${params.mood}
            - Duration: ${params.duration} days
            - Travel Style: ${params.travelType}
            - Budget Level: ${params.budget}
            
            AVAILABLE ATTRACTIONS FROM DATABASE:
            ${attractionsText}
            
            The AI must NOT invent prominent destinations outside of the selected one. It must primarily use the provided attractions if available.
            
            Rules for itinerary generation:
            - Distribute attractions logically across days.
            - Group nearby locations within the same day.
            - Avoid long travel distances within a single day.
            - Balance sightseeing, activities, and relaxation.
            - Prioritize high-rated attractions.
            - Include morning, afternoon, and evening plans.
            - Ensure the itinerary fits within exactly ${params.duration} days.
            
            Output format must be structured JSON:
            {
                "trip_title": "Trip Title",
                "summary": "Short trip summary",
                "days": [
                    {
                        "day": 1,
                        "morning": "Detailed activity for morning",
                        "afternoon": "Detailed activity for afternoon",
                        "evening": "Detailed activity for evening"
                    }
                ]
            }
        `;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a specialized travel itinerary AI that uses provided database context to create realistic plans." },
                { role: "user", content: prompt }
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;
        return JSON.parse(content || "{}");

    } catch (error) {
        console.error("OpenAI API Failed:", error);
        return getMockItinerary(params);
    }
}

function getMockItinerary(params: GenerateParams) {
    const activitiesPool: Record<string, string[]> = {
        'Hill Station': [
            'Visit the local viewpoints for a breathtaking sunrise.',
            'Explore the lush tea gardens and local plantations.',
            'A scenic trek to the hidden waterfalls nearby.',
            'Visit the historic monasteries and local temples.',
            'Stroll through the local markets and handicrafts centers.',
            'Enjoy a cozy cafe hop in the old town area.',
            'Experience a traditional cultural performance in the evening.',
            'Visit the high-altitude lake for a peaceful picnic.'
        ],
        'Beach': [
            'Morning yoga session on the serene shore.',
            'Thrilling water sports like surfing or jet skiing.',
            'Visit the ancient lighthouse and coastal forts.',
            'Relaxing beach shack lunch with local seafood.',
            'Evening sunset cruise along the coastline.',
            'Explore the vibrant local night market.',
            'Guided heritage walk through the coastal village.',
            'Beachside bonfire and stargazing experience.'
        ],
        'Heritage': [
            'Guided tour of the grand royal palace.',
            'Visit the UNESCO heritage sites and ancient ruins.',
            'Explore the local museum and art galleries.',
            'Traditional craft workshop with local artisans.',
            'Evening light and sound show at the historic fort.',
            'Visit the sacred temples and architectural marvels.',
            'Traditional sit-down dinner with royal cuisine.',
            'Morning walk through the historic narrow lanes.'
        ],
        'Urban': [
            'Visit the iconic city landmarks and skyscrapers.',
            'High-end shopping at the luxury malls.',
            'Explore the trendy art districts and street art.',
            'Fine dining experience at a Michelin-rated restaurant.',
            'Late night lounge visit with rooftop city views.',
            'Visit the modern science and tech museums.',
            'Morning jog through the central city park.',
            'Attend a live music performance or theater show.'
        ]
    };

    const moodModifiers: Record<string, string> = {
        'Peaceful': 'focusing on quiet spots and meditation.',
        'Adventure': 'with an added focus on high-energy thrills.',
        'Romantic': 'featuring intimate settings and scenic backdrops.',
        'Party': 'highlighting the most vibrant social hubs.',
        'Nature': 'immersing deeply into the local flora and fauna.',
        'Burnt-out': 'with a slow pace and maximum relaxation.'
    };

    const baseActivities = activitiesPool[params.destination.category] || activitiesPool['Hill Station'];
    const moodNote = moodModifiers[params.mood] || 'designed for a perfect balance.';

    const days = [];
    for (let i = 1; i <= params.duration; i++) {
        // Deterministically pick different activities for each day to avoid repetition
        const mIdx = (i * 3) % baseActivities.length;
        const aIdx = (i * 3 + 1) % baseActivities.length;
        const eIdx = (i * 3 + 2) % baseActivities.length;

        days.push({
            day: i,
            morning: `${baseActivities[mIdx]} ${moodNote}`,
            afternoon: `${baseActivities[aIdx]} This is a highlight of ${params.destination.city}.`,
            evening: `${baseActivities[eIdx]} Perfect way to end Day ${i} in ${params.destination.name}.`
        });
    }

    return {
        trip_title: `${params.duration} Day ${params.mood} Getaway to ${params.destination.name}`,
        summary: `A carefully curated ${params.duration}-day journey through ${params.destination.name}, ${moodNote}`,
        days
    };
}
