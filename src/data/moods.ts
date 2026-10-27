export interface Mood {
    id: string;
    label: string;
    emoji: string;
    subtext: string;
    color: string;
}

export const MOODS: Mood[] = [
    {
        id: 'burnt-out',
        label: 'Burnt Out',
        emoji: '😴',
        subtext: "Let's find you something peaceful.",
        color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
        id: 'romantic',
        label: 'Romantic',
        emoji: '💕',
        subtext: "Scenic spots for two.",
        color: 'bg-pink-50 hover:bg-pink-100'
    },
    {
        id: 'adventure',
        label: 'Adventure',
        emoji: '⚡',
        subtext: "Thrills and adrenaline.",
        color: 'bg-orange-50 hover:bg-orange-100'
    },
    {
        id: 'detox',
        label: 'Detox',
        emoji: '🌿',
        subtext: "Nature, yoga, and fresh air.",
        color: 'bg-green-50 hover:bg-green-100'
    },
    {
        id: 'party',
        label: 'Party',
        emoji: '🎉',
        subtext: "Nightlife and vibes.",
        color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
        id: 'creative',
        label: 'Creative',
        emoji: '✨',
        subtext: "Art, culture, and history.",
        color: 'bg-yellow-50 hover:bg-yellow-100'
    },
    {
        id: 'solo',
        label: 'Solo Reflection',
        emoji: '🌄',
        subtext: "Me-time and self-discovery.",
        color: 'bg-indigo-50 hover:bg-indigo-100'
    },
    {
        id: 'nature',
        label: 'Nature Escape',
        emoji: '🏞️',
        subtext: "Wilderness and scenic views.",
        color: 'bg-emerald-50 hover:bg-emerald-100'
    },
    {
        id: 'heritage',
        label: 'Heritage Walk',
        emoji: '🏰',
        subtext: "History, palaces, and ruins.",
        color: 'bg-amber-50 hover:bg-amber-100'
    },
    {
        id: 'urban',
        label: 'Urban Vibe',
        emoji: '🏙️',
        subtext: "City lights and modern life.",
        color: 'bg-slate-50 hover:bg-slate-100'
    },
];
