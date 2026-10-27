"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MoodCard } from "@/components/mood/MoodCard";
import { Button } from "@/components/ui/button";
import { MOODS } from "@/data/moods";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MoodPage() {
    const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white pb-20">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 pt-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gray-50 text-gray-500 text-sm font-medium border border-gray-100">
                        Step 1 of 3
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        How are you feeling today?
                    </h1>
                    <p className="text-xl text-gray-500 mb-12">
                        Select your vibe to get personalized recommendations.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                >
                    {MOODS.map((mood) => (
                        <MoodCard
                            key={mood.id}
                            mood={mood}
                            selected={selectedMoodId === mood.id}
                            onClick={() => setSelectedMoodId(mood.id)}
                        />
                    ))}
                </motion.div>

                <div className="mt-12 flex justify-center sticky bottom-8 md:relative md:bottom-auto pointer-events-none md:pointer-events-auto">
                    <div className="relative pointer-events-auto">
                        {/* Floating Continue Button */}
                        <Link href={selectedMoodId ? `/preferences?mood=${selectedMoodId}` : '#'}>
                            <Button
                                size="lg"
                                className={cn(
                                    "rounded-full px-8 h-12 text-lg shadow-xl shadow-blue-500/20 transition-all duration-300",
                                    !selectedMoodId ? "opacity-50 cursor-not-allowed bg-gray-300 hover:bg-gray-300 hover:shadow-none" : "hover:-translate-y-1"
                                )}
                                disabled={!selectedMoodId}
                            >
                                Continue <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
