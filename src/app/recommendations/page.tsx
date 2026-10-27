"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Wallet, CheckCircle2, ChevronRight, ChevronDown, Sparkles } from "lucide-react";
import { Destination } from "@/types";

function RecommendationsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [recommendations, setRecommendations] = useState<Destination[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await fetch('/api/recommend', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mood: searchParams.get('mood'),
                        budget: parseInt(searchParams.get('budget') || '5000') < 5000 ? 'Low' :
                            parseInt(searchParams.get('budget') || '5000') < 12000 ? 'Medium' : 'High',
                        ideal_for: searchParams.get('type'),
                        duration: searchParams.get('duration'),
                        is_international: searchParams.get('intl') === 'true'
                    })
                });
                const json = await res.json();
                if (json.data) {
                    setRecommendations(json.data);
                    if (json.data.length > 0) setExpandedId(json.data[0].id);
                }
            } catch (err) {
                console.error("Failed to fetch recommendations:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [searchParams]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Finalizing your personalized options...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 pt-32">
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Curated Escapes</h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Based on your mood and preferences, we found {recommendations.length} perfect matches.
                        Each comes with a custom day-wise itinerary.
                    </p>
                </div>

                <div className="space-y-8">
                    {recommendations.map((dest, index) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50"
                        >
                            <div className="grid md:grid-cols-12">
                                {/* Image Section */}
                                <div className="md:col-span-4 h-64 md:h-auto relative">
                                    <img
                                        src={dest.primary_image?.image_url}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        alt={dest.name}
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        {dest.recommendation_score ? `${Math.round(dest.recommendation_score)}% Match` : 'Top Match'}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="md:col-span-8 p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                                            <MapPin className="w-4 h-4" />
                                            {dest.city}, {dest.state}
                                        </div>
                                        <h2 className="text-3xl font-black text-gray-900 mb-3">{dest.name}</h2>
                                        <p className="text-gray-500 leading-relaxed mb-6">
                                            {dest.short_description}
                                        </p>

                                        <div className="flex flex-wrap gap-4 mb-8">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-semibold text-gray-700">
                                                <Calendar className="w-4 h-4 text-blue-500" />
                                                {searchParams.get('duration')} Days
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-semibold text-gray-700">
                                                <Wallet className="w-4 h-4 text-emerald-500" />
                                                ₹{dest.avg_budget_per_day?.toLocaleString()}/day
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-semibold text-gray-700">
                                                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                                                {dest.vibe?.[0]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Button
                                            variant="outline"
                                            className="rounded-full gap-2 font-bold"
                                            onClick={() => setExpandedId(expandedId === dest.id ? null : dest.id)}
                                        >
                                            {expandedId === dest.id ? 'Hide Itinerary' : 'View Full Plan'}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === dest.id ? 'rotate-180' : ''}`} />
                                        </Button>
                                        <Button
                                            className="rounded-full gap-2 px-8 font-black shadow-lg shadow-primary/20"
                                            onClick={() => {
                                                const params = new URLSearchParams(searchParams.toString());
                                                router.push(`/destination/${dest.slug}?${params.toString()}`);
                                            }}
                                        >
                                            Explore Details <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Itinerary Section */}
                            <AnimatePresence>
                                {expandedId === dest.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-gray-50 bg-slate-50/50"
                                    >
                                        <div className="p-8">
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-primary" />
                                                Custom Itinerary for {dest.name}
                                            </h3>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {dest.itinerary?.map((day) => (
                                                    <div key={day.day} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                                        <div className="text-xs font-black text-primary uppercase mb-2">Day {day.day}</div>
                                                        <h4 className="font-bold text-gray-900 mb-4">{day.title}</h4>
                                                        <ul className="space-y-3">
                                                            {day.activities.map((act, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                                    {act}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-400 text-sm mb-6">Didn&apos;t find what you were looking for?</p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" className="rounded-full" onClick={() => router.push('/mood')}>Change Mood</Button>
                        <Button variant="outline" className="rounded-full" onClick={() => router.push('/preferences')}>Adjust Preferences</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function RecommendationsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <RecommendationsContent />
        </Suspense>
    );
}
