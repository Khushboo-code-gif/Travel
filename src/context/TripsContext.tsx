"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MOCK_TRIP_POSTS, TravelBuddyPost } from '@/data/mockTrips';

interface TripsContextType {
    trips: TravelBuddyPost[];
    addTrip: (trip: TravelBuddyPost) => void;
    deleteTrip: (id: string) => void;
    updateTrip: (id: string, updates: Partial<TravelBuddyPost>) => void;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export function TripsProvider({ children }: { children: ReactNode }) {
    const [trips, setTrips] = useState<TravelBuddyPost[]>(MOCK_TRIP_POSTS);

    const addTrip = (newTrip: TravelBuddyPost) => {
        setTrips((prev) => [newTrip, ...prev]);
    };

    const updateTrip = (id: string, updates: Partial<TravelBuddyPost>) => {
        setTrips((prev) => prev.map(trip => trip.id === id ? { ...trip, ...updates } : trip));
    };

    const deleteTrip = (id: string) => {
        setTrips((prev) => prev.filter(trip => trip.id !== id));
    };

    return (
        <TripsContext.Provider value={{ trips, addTrip, deleteTrip, updateTrip }}>
            {children}
        </TripsContext.Provider>
    );
}

export function useTrips() {
    const context = useContext(TripsContext);
    if (context === undefined) {
        throw new Error('useTrips must be used within a TripsProvider');
    }
    return context;
}
