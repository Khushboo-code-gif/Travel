"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    avatar: string;
    verified: boolean;
    bio?: string;
    location?: string;
    dreamDestination?: string;
    travelStyles?: string[];
}

interface AuthContextType {
    user: User | null;
    signIn: () => void;
    signOut: () => void;
    updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const signIn = () => {
        // Mock login
        setUser({
            name: "Khushboo G.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khushboo",
            verified: true,
            location: "Mumbai, India",
            bio: "Exploring the world, one city at a time.",
            dreamDestination: "Paris, France",
            travelStyles: ["Adventure Lover", "Foodie", "Nature"]
        });
        router.push('/mood'); // Redirect to mood selection after login
    };

    const updateProfile = (updates: Partial<User>) => {
        setUser(prev => {
            if (!prev) {
                // Create new user if none exists (Mock Registration)
                return {
                    name: updates.name || "Traveler",
                    avatar: updates.avatar || "",
                    verified: false, // New users verifying
                    ...updates
                } as User;
            }
            return { ...prev, ...updates };
        });
    };

    const signOut = () => {
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
