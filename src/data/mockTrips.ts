export interface TravelBuddyPost {
    id: string;
    user: {
        name: string;
        avatar: string;
        verified: boolean;
        rating: number;
    };
    destination: string;
    dates: string;
    budget: string;
    gender_preference: 'Any' | 'Female' | 'Male';
    description: string;
    tags: string[];
}

export const MOCK_TRIP_POSTS: TravelBuddyPost[] = [
    {
        id: '1',
        user: {
            name: 'Ananya S.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
            verified: true,
            rating: 4.8
        },
        destination: 'Spiti Valley Road Trip',
        dates: '15th June - 22nd June',
        budget: '₹25k - ₹30k',
        gender_preference: 'Female',
        description: 'Planning a road trip to Spiti. Looking for 2 chill girls to join. We have a car, just need to share fuel and stay.',
        tags: ['Adventure', 'Road Trip', 'Photography']
    },
    {
        id: '2',
        user: {
            name: 'Rohan K.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
            verified: true,
            rating: 4.5
        },
        destination: 'Gokarna Beach Trek',
        dates: 'Next Weekend',
        budget: '₹8k - ₹10k',
        gender_preference: 'Any',
        description: 'Doing the 5-beach trek in Gokarna. Staying at Zostel. Open to anyone who loves hiking and sunsets!',
        tags: ['Beach', 'Trekking', 'Chill']
    },
    {
        id: '3',
        user: {
            name: 'Priya & Rahul',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
            verified: true,
            rating: 5.0
        },
        destination: 'Udaipur Luxury Stay',
        dates: 'Dec 24 - Dec 27',
        budget: '₹40k+',
        gender_preference: 'Any',
        description: 'Couples trip! We are booking a villa and need one more couple to share the cost. Luxury vibes only.',
        tags: ['Luxury', 'Couple', 'Relax']
    }
];
