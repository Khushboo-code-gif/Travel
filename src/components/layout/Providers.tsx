"use client";

import { AuthProvider } from "@/context/AuthContext";
import { TripsProvider } from "@/context/TripsContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <TripsProvider>
                {children}
            </TripsProvider>
        </AuthProvider>
    );
}
