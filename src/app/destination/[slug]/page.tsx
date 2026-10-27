"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Destination, Hotel, Restaurant } from "@/types";
import {
    MapPin, Users, TrendingUp, Calendar, Bed, Utensils,
    ArrowLeft, Share2, Heart, Star, Sparkles, Navigation, Zap, Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { LivePricingWidget } from "@/components/travel/LivePricingWidget";

function DestinationDetailContent() {
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const mood = searchParams.get('mood');
    const budget = searchParams.get('budget');
    const duration = searchParams.get('duration') || '3';
    const people = searchParams.get('people') || '1';

    useEffect(() => {
        async function fetchDetail() {
            setLoading(true);
            try {
                const res = await fetch(`/api/destination/${slug}?mood=${mood || ''}&duration=${duration}&budget=${budget || ''}&type=${searchParams.get('type') || ''}&people=${people}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Failed to fetch destination:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchDetail();
    }, [slug, people, mood, budget, duration]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                    <p className="text-slate-400 font-medium">Brewing your perfect guide...</p>
                </div>
            </div>
        );
    }

    if (!data || data.error) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
                <Link href="/explore">
                    <Button>Back to Explore</Button>
                </Link>
            </div>
        );
    }

    const handleSaveTrip = async () => {
        try {
            const res = await fetch('/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    destination_id: data.id,
                    mood: mood,
                    budget: parseInt(budget || '5000'),
                    duration_days: parseInt(duration),
                    people_count: parseInt(people),
                    travel_type: searchParams.get('type') || 'solo',
                    itinerary: data.itinerary?.days || []
                })
            });
            if (res.ok) {
                alert("Trip saved to your escapes!");
            }
        } catch (err) {
            console.error("Save failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                <img
                    src={data.primary_image?.image_url || '/images/placeholder-hero.jpg'}
                    alt={data.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md text-blue-200 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                                    {data.category}
                                </span>
                                {data.is_hidden_gem && (
                                    <span className="px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md text-amber-200 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                                        Hidden Gem
                                    </span>
                                )}
                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                                    {people} {parseInt(people) === 1 ? 'Person' : 'People'}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white">{data.name}</h1>
                            <div className="flex items-center gap-4 text-white/80 font-medium">
                                <div className="flex items-center gap-1.5 underline decoration-primary underline-offset-4">
                                    <MapPin className="w-4 h-4" /> {data.city}, {data.state}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <TrendingUp className="w-4 h-4 text-green-400" /> {data.popularity_score}% Popularity
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="secondary" className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20">
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </Button>
                            <Button
                                onClick={handleSaveTrip}
                                className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20"
                            >
                                <Heart className="w-4 h-4 mr-2" /> Save Trip
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 mt-8">
                {/* Glassmorphism Quick Info Bar */}
                <div className="lg:col-span-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 rounded-[32px] p-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-4"
                    >
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Budget</span>
                            <div className="flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-emerald-500" />
                                <p className="text-xl font-black text-slate-900 leading-none">₹{budget?.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-500" />
                                <p className="text-xl font-black text-slate-900 leading-none">{duration} Days</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Travelers</span>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-500" />
                                <p className="text-xl font-black text-slate-900 leading-none">{people}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trip Vibe</span>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                <p className="text-xl font-black text-slate-900 leading-none truncate max-w-[120px]">{mood || 'Custom'}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Left Section: Content */}
                <div className="lg:col-span-8 space-y-12">
                    {/* About */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-primary" /> About {data.name}
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {data.full_description || data.short_description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Best Time</p>
                                <p className="font-bold text-slate-800">{data.best_time_to_visit || 'Anytime'}</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Duration</p>
                                <p className="font-bold text-slate-800">{data.ideal_duration_days || duration} Days</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Budget</p>
                                <p className="font-bold text-slate-800">₹{data.avg_budget_per_day || 3000}/day</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Crowd</p>
                                <p className="font-bold text-slate-800">Level {data.crowd_level}/5</p>
                            </div>
                        </div>
                    </section>

                    {/* Itinerary */}
                    {data.itinerary && data.itinerary.days && (
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-primary" /> {data.itinerary.trip_title || 'Your Daily Escape Plan'}
                                </h2>
                                <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">
                                    AI Generated Itinerary
                                </span>
                            </div>

                            {data.itinerary.summary && (
                                <p className="text-slate-500 italic border-l-4 border-primary/20 pl-4 py-2 bg-primary/5 rounded-r-xl">
                                    {data.itinerary.summary}
                                </p>
                            )}

                            <div className="space-y-12">
                                {data.itinerary.days.map((day: any, dayIdx: number) => (
                                    <motion.div
                                        key={day.day}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: dayIdx * 0.1 }}
                                        className="relative pl-8 md:pl-12 border-l-2 border-slate-100 last:border-0 pb-8"
                                    >
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />

                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-slate-900">Day {day.day}</h3>
                                        </div>

                                        <div className="grid gap-6">
                                            {/* Morning */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
                                                <div className="md:w-32 flex-shrink-0 flex items-center md:flex-col md:items-start gap-2">
                                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Morning</span>
                                                    <span className="text-xs font-bold text-slate-400">09:00 AM</span>
                                                </div>
                                                <div className="space-y-2 flex-grow">
                                                    <h4 className="font-bold text-slate-800 flex items-center gap-2 group-hover:text-primary transition-colors">
                                                        <Sparkles className="w-4 h-4 text-blue-400" /> Kickstart the Day
                                                    </h4>
                                                    <p className="text-sm text-slate-500 leading-relaxed">{day.morning}</p>
                                                </div>
                                            </div>

                                            {/* Afternoon */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
                                                <div className="md:w-32 flex-shrink-0 flex items-center md:flex-col md:items-start gap-2">
                                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-2 py-1 rounded">Afternoon</span>
                                                    <span className="text-xs font-bold text-slate-400">01:30 PM</span>
                                                </div>
                                                <div className="space-y-2 flex-grow">
                                                    <h4 className="font-bold text-slate-800 flex items-center gap-2 group-hover:text-primary transition-colors">
                                                        <Navigation className="w-4 h-4 text-orange-400" /> Mid-day Exploration
                                                    </h4>
                                                    <p className="text-sm text-slate-500 leading-relaxed">{day.afternoon}</p>
                                                </div>
                                            </div>

                                            {/* Evening */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
                                                <div className="md:w-32 flex-shrink-0 flex items-center md:flex-col md:items-start gap-2">
                                                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest bg-purple-50 px-2 py-1 rounded">Evening</span>
                                                    <span className="text-xs font-bold text-slate-400">06:00 PM</span>
                                                </div>
                                                <div className="space-y-2 flex-grow">
                                                    <h4 className="font-bold text-slate-800 flex items-center gap-2 group-hover:text-primary transition-colors">
                                                        <Star className="w-4 h-4 text-purple-400" /> Evening Vibes
                                                    </h4>
                                                    <p className="text-sm text-slate-500 leading-relaxed">{day.evening}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Gallery (Small) */}
                    {data.gallery_images && data.gallery_images.length > 0 && (
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900">Vibe Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {data.gallery_images.slice(0, 3).map((img: any, idx: number) => (
                                    <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-200">
                                        <img src={img.image_url} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Stays */}
                    <section className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Bed className="w-6 h-6 text-blue-500" /> Recommended Stays
                            </h2>
                            <Button variant="link" className="text-primary font-bold">View all</Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {data.hotels?.map((hotel: Hotel) => (
                                <div key={hotel.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group hover:shadow-md transition-shadow">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={hotel.primary_image?.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                                            <Star className="w-3 h-3 fill-primary" /> {hotel.rating}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs text-slate-400 font-bold uppercase mb-1 tracking-tighter">{hotel.type}</p>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{hotel.name}</h3>
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {hotel.amenities?.slice(0, 3).map(a => (
                                                <span key={a} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-100 font-medium">
                                                    {a}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                            <p className="font-black text-slate-900">₹{hotel.price_per_night_avg.toLocaleString()}<span className="text-xs text-slate-400 font-normal"> /night</span></p>
                                            <Button size="sm" className="rounded-full shadow-none">Book</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Food */}
                    <section className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Utensils className="w-6 h-6 text-orange-500" /> Must-visit Eateries
                            </h2>
                            <Button variant="link" className="text-primary font-bold">View all</Button>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.restaurants?.map((rest: Restaurant) => (
                                <div key={rest.id} className="group cursor-pointer">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-slate-100 border border-slate-200">
                                        <img src={rest.primary_image?.image_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24'} alt={rest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-900 text-sm">{rest.name}</h3>
                                        <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-bold">★ {rest.rating}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate mb-2">{rest.cuisine_type?.join(', ')}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-slate-400">{rest.price_range} Cost</span>
                                        {rest.veg_only && <span className="text-[9px] text-green-600 font-black border border-green-600 px-1 rounded uppercase">Veg</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Community Reviews */}
                    <ReviewSection destinationId={data.id} entityType="destination" />
                </div>

                {/* Right Section: Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
                        <div className="p-0 bg-primary/5 rounded-[32px] border border-primary/10 mb-6 overflow-hidden relative group">
                            <div className="h-32 w-full relative">
                                <img src={data.primary_image?.image_url} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Vibe" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                            </div>
                            <div className="p-6 pt-0 -mt-8 relative z-10">
                                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-primary" /> Why {data.name}?
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {mood ? `Based on your mood '${mood}', this destination offers the perfect vibes.` : 'This destination is currently trending for its unique experiences.'}
                                    It has a safety score of {data.safety_score}/5 and excellent connectivity.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Connectivity</span>
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className={`h-1 w-6 rounded-full ${i < data.travel_connectivity_score ? 'bg-blue-500' : 'bg-slate-100'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Safety Score</span>
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className={`h-1 w-6 rounded-full ${i < data.safety_score ? 'bg-green-500' : 'bg-slate-100'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest text-center">Perfect For</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {data.ideal_for?.map((type: string) => (
                                    <span key={type} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Button className="w-full mt-8 rounded-full h-12 text-lg font-black shadow-lg shadow-primary/20">
                            Book This Trip
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function DestinationDetailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DestinationDetailContent />
        </Suspense>
    );
}
