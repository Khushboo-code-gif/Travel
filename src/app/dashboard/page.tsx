"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Calendar, Trash2, ExternalLink, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrips() {
            setLoading(true);
            try {
                const res = await fetch('/api/trips');
                const json = await res.json();
                setTrips(json.data || []);
            } catch (err) {
                console.error("Failed to fetch trips:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTrips();
    }, []);

    const deleteTrip = async (id: string) => {
        if (!confirm("Are you sure you want to remove this trip?")) return;
        try {
            await fetch(`/api/trips?id=${id}`, { method: 'DELETE' });
            setTrips(trips.filter(t => t.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">My Escapes</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Your curated collection of AI-planned adventures.</p>
                    </div>
                    <Link href="/mood">
                        <Button className="rounded-full bg-primary hover:bg-primary/90 h-12 px-8 shadow-lg shadow-primary/20">
                            <Sparkles className="w-4 h-4 mr-2" /> Plan New Trip
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white rounded-3xl animate-pulse border border-slate-100" />
                        ))}
                    </div>
                ) : trips.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map((trip) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 transition-all"
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <img
                                        src={trip.destinations?.primary_image?.image_url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1'}
                                        alt={trip.destinations?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                                        {trip.mood || 'Travel'}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteTrip(trip.id)}
                                        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 backdrop-blur text-white hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <div className="absolute bottom-4 left-6">
                                        <h3 className="text-xl font-bold text-white leading-tight">{trip.destinations?.name}</h3>
                                        <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                                            <MapPin className="w-3 h-3" /> {trip.destinations?.state}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                                            <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5 leading-none">
                                                <Calendar className="w-3.5 h-3.5 text-blue-500" /> {trip.duration_days} Days
                                            </p>
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Est. Cost</p>
                                            <p className="text-sm font-bold text-slate-700 leading-none">₹{trip.budget?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <Link href={`/destination/${trip.destinations?.slug}`}>
                                        <Button className="w-full rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-900 shadow-none border border-slate-200 h-11 font-bold">
                                            View Details <ExternalLink className="w-3.5 h-3.5 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <Heart className="w-10 h-10 text-slate-200" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">No trips saved yet</h2>
                        <p className="text-slate-500 mb-8 max-w-xs text-center">Start your journey and save your favorite AI-planned escapes here.</p>
                        <Link href="/mood">
                            <Button className="rounded-full shadow-xl shadow-primary/20 font-bold px-8">Exploration Mode</Button>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
