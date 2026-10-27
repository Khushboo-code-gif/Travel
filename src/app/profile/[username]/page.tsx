"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    MapPin, Calendar, Heart, MessageSquare,
    Compass, Award, Globe, Share2, Star
} from "lucide-react";
import Link from "next/link";

function ProfileContent() {
    const { username } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            try {
                const res = await fetch(`/api/profile/${username}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Compass className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-slate-400 font-medium tracking-widest">Searching the explorer network...</p>
                </div>
            </div>
        );
    }

    if (!data || data.error) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <Globe className="w-12 h-12 text-red-200" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">{data?.error || 'Profile not found'}</h1>
                <p className="text-slate-500 mb-8 max-w-sm">This explorer might be off-grid or the link is incorrect.</p>
                <Link href="/explore">
                    <Button className="rounded-full px-8">Back to Discovery</Button>
                </Link>
            </div>
        );
    }

    const { profile, trips, reviews } = data;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />

            {/* Profile Header */}
            <div className="pt-32 pb-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-[48px] overflow-hidden border-4 border-slate-50 shadow-2xl">
                                <img
                                    src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                                    className="w-full h-full object-cover"
                                    alt={profile.username}
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2.5 rounded-2xl shadow-xl ring-4 ring-white">
                                <Award className="w-6 h-6" />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h1 className="text-4xl font-black text-slate-900">{profile.full_name || profile.username}</h1>
                                    <p className="text-slate-400 font-bold lowercase">@{profile.username}</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="rounded-full h-11 px-6 border-slate-200">
                                        <Share2 className="w-4 h-4 mr-2" /> Share Profile
                                    </Button>
                                    <Button className="rounded-full h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100">
                                        Follow Explorer
                                    </Button>
                                </div>
                            </div>

                            <p className="text-slate-600 max-w-2xl text-lg font-medium leading-relaxed">
                                {profile.bio || "Exploring the world's hidden gems and sharing the vibes."}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl font-black text-slate-900">{trips.length}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Shared<br />Trips</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl font-black text-slate-900">{profile.reviews_count || reviews.length}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Expert<br />Reviews</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl font-black text-slate-900">{profile.explorer_level}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Explorer<br />Tier</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 mt-16 grid lg:grid-cols-12 gap-12">
                {/* Left: Shared Trips */}
                <div className="lg:col-span-8 space-y-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Compass className="w-6 h-6 text-indigo-500" /> Public Itineraries
                        </h2>
                        {trips.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {trips.map((trip: any) => (
                                    <Link
                                        key={trip.id}
                                        href={`/trip/share/${trip.public_slug || trip.id}`}
                                        className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                    >
                                        <div className="h-48 relative overflow-hidden">
                                            <img src={`https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Destination" />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-6">
                                                <h3 className="text-white font-bold text-xl">{trip.destinations?.name}</h3>
                                                <p className="text-white/70 text-xs font-medium">{trip.destinations?.city}, {trip.destinations?.state}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration & Vibe</p>
                                                <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-indigo-500" /> {trip.duration_days} Days / {trip.mood}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Heart className="w-4 h-4 text-slate-200" />
                                                <Share2 className="w-4 h-4 text-slate-200" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[40px] p-12 text-center border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 font-medium">This explorer hasn't shared any trips yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Recent Activity */}
                <div className="lg:col-span-4 space-y-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-indigo-500" /> Latest Reviews
                        </h2>
                        <div className="space-y-4">
                            {reviews.map((rev: any) => (
                                <div key={rev.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-slate-800 text-sm leading-tight">
                                            {rev.destinations?.name || rev.hotels?.name || rev.restaurants?.name}
                                        </h4>
                                        <div className="flex text-amber-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-100'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 italic leading-relaxed">"{rev.review_text.substring(0, 80)}..."</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(rev.created_at).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent />
        </Suspense>
    );
}
