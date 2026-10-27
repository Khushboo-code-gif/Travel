"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    MapPin, Calendar, Heart, Share2,
    Sparkles, Compass, AlertTriangle, Users, Wallet
} from "lucide-react";
import Link from "next/link";

function SharedTripContent() {
    const { slug } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrip() {
            setLoading(true);
            try {
                const res = await fetch(`/api/trip/share/${slug}`);
                const json = await res.json();
                setData(json.data);
            } catch (err) {
                console.error("Failed to fetch trip:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTrip();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Compass className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                <AlertTriangle className="w-16 h-16 text-amber-300 mb-6" />
                <h1 className="text-3xl font-black text-slate-900 mb-2">Trip is Private or Missing</h1>
                <p className="text-slate-500 mb-8">This itinerary is not available for public preview.</p>
                <Link href="/explore"><Button className="rounded-full px-8">Exploration Mode</Button></Link>
            </div>
        );
    }

    const { destinations, profiles, mood, duration_days, budget, travel_type } = data;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />

            {/* Shared Trip Hero */}
            <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
                <img
                    src={destinations?.media?.find((m: any) => m.is_primary)?.image_url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1'}
                    alt={destinations?.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <Link href={`/profile/${profiles?.username}`} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                                <img src={profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profiles?.username}`} className="w-6 h-6 rounded-full" alt="Avatar" />
                                <span className="text-white text-xs font-bold uppercase tracking-widest">{profiles?.username}'s Choice</span>
                            </Link>
                            <span className="px-3 py-1.5 bg-indigo-600 rounded-full text-white text-[10px] font-black uppercase tracking-tighter">Shared Itinerary</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <h1 className="text-4xl md:text-7xl font-black text-white leading-none mb-4">{destinations?.name} Escape</h1>
                                <p className="text-white/80 text-lg md:text-xl font-medium flex items-center gap-2">
                                    <MapPin className="w-6 h-6 text-indigo-400" /> {destinations?.city}, {destinations?.state}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[24px] min-w-[120px]">
                                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Duration</p>
                                    <p className="text-xl font-black text-white flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-indigo-400" /> {duration_days} Days
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-[24px] min-w-[120px]">
                                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Budget</p>
                                    <p className="text-xl font-black text-white flex items-center gap-2">
                                        <Wallet className="w-5 h-5 text-emerald-400" /> ₹{budget?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-12 gap-12">
                {/* Left: Content */}
                <div className="lg:col-span-8 space-y-12">
                    {/* The Vibe Section */}
                    <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100px] -z-1" />
                        <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Sparkles className="w-8 h-8 text-indigo-500" /> The Itinerary Vibe
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 text-slate-600 text-lg leading-relaxed">
                            <div className="space-y-4">
                                <p>This trip was specifically planned for a **{mood}** mood, prioritizing experiences that align with tranquility and high-quality aesthetics.</p>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 p-3 bg-slate-50 rounded-2xl w-fit">
                                    <Users className="w-4 h-4" /> Ideal For: {travel_type}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl space-y-3">
                                <h4 className="font-bold text-slate-800 text-sm italic">"One of the most serene trips I've ever taken. The AI really understood the budget to quality ratio."</h4>
                                <p className="text-xs text-slate-400 font-bold">— Explorer @{profiles?.username}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shared CTA */}
                    <div className="p-12 rounded-[48px] bg-gradient-to-br from-indigo-600 to-violet-700 text-center text-white shadow-2xl shadow-indigo-200">
                        <h2 className="text-3xl font-black mb-4">Love this plan?</h2>
                        <p className="text-white/80 mb-8 max-w-lg mx-auto">You can import this exact itinerary to your dashboard and customize it for your own dates.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="rounded-full bg-white text-indigo-600 hover:bg-slate-50 px-10 h-14 font-black shadow-xl shadow-black/10">
                                <Heart className="w-5 h-5 mr-2" /> Save to My Dashboard
                            </Button>
                            <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10 px-10 h-14 font-bold backdrop-blur-md">
                                <Share2 className="w-5 h-5 mr-2" /> Share with Friends
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right: Destination Quick Look */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
                        <h3 className="font-black text-slate-900 text-xl mb-6">Destination Profile</h3>
                        <div className="aspect-square rounded-3xl overflow-hidden mb-6">
                            <img src={destinations?.media?.[0]?.image_url} alt="Dest" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-bold">Category</span>
                                <span className="font-black text-slate-800">{destinations?.category}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-bold">Tier</span>
                                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-black text-[10px]">{destinations?.tier}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-bold">Safety</span>
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className={`h-1 w-6 rounded-full ${i < destinations?.safety_score ? 'bg-green-500' : 'bg-slate-100'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Link href={`/destination/${destinations?.slug}`}>
                            <Button className="w-full mt-8 rounded-full h-12 font-black">Explore Destination</Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function SharedTripPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SharedTripContent />
        </Suspense>
    );
}
