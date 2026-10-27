"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useTrips } from "@/context/TripsContext"; // Import useTrips
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CreateTripPage() {
    const { user } = useAuth();
    const router = useRouter();
    const { addTrip } = useTrips(); // Use context
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            // Optional: Redirect if not logged in
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("You must be signed in to post a trip.");
            return;
        }

        setIsLoading(true);

        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Extract form data
        const form = e.target as HTMLFormElement;
        const destination = (form.elements.namedItem('destination') as HTMLInputElement).value;
        const startDate = (form.elements.namedItem('startDate') as HTMLInputElement).value;
        const endDate = (form.elements.namedItem('endDate') as HTMLInputElement).value;
        const budget = (form.elements.namedItem('budget') as HTMLInputElement).value;
        const gender = (form.elements.namedItem('gender') as HTMLSelectElement).value;
        const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

        // Create new trip object
        const newTrip = {
            id: Date.now().toString(),
            user: {
                name: user.name,
                avatar: user.avatar,
                verified: user.verified,
                rating: 5.0
            },
            destination: destination,
            dates: `${startDate} - ${endDate}`,
            budget: budget,
            gender_preference: gender as any,
            description: description,
            tags: ['New', 'Travel']
        };

        // Add to global state
        addTrip(newTrip);

        setIsLoading(false);
        router.push('/trips');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                    <p className="text-gray-500 mb-6">You need to be logged in to create a trip request.</p>
                    <Button onClick={() => router.push('/')}>Go Home</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            <main className="max-w-2xl mx-auto px-6 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Trip Request</h1>
                    <p className="text-gray-500 mb-8">Tell us where you want to go and find your tribe.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                            <Input name="destination" placeholder="e.g. Manali, Bali, Paris" required className="w-full" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                <Input name="startDate" type="date" required className="w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                <Input name="endDate" type="date" required className="w-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                                <Input name="budget" placeholder="e.g. ₹10k - ₹15k" required className="w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender Preference</label>
                                <select name="gender" className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <option value="Any">Any</option>
                                    <option value="Female">Female Only</option>
                                    <option value="Male">Male Only</option>
                                    <option value="Couples">Couples</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Trip Description</label>
                            <Textarea
                                name="description"
                                placeholder="Describe your plan... e.g. Looking for someone to share a cab and go trekking."
                                required
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full rounded-xl h-12 text-lg" disabled={isLoading}>
                            {isLoading ? "Posting..." : "Post Trip Request"}
                        </Button>
                    </form>
                </motion.div>
            </main>
        </div>
    );
}
