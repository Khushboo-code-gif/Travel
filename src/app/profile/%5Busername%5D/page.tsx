"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import {
    MapPin, Calendar, Award, Compass,
    MessageSquare, Heart, ShieldCheck, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

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
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!data || data.error) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <User className="w-12 h-12 text-slate-400" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">Profile not found</h1>
                <p className="text-slate-500 mb-8 max-w-md">{data?.error || "This user might have a private profile or it doesn't exist."}</p>
                <Link href="/explore">
                    <Button className="rounded-full px-8">Find Your Own Vibe</Button>
                </Link>
            </div>
        );
    }

    const { profile, trips, reviews } = data;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />

            {/* Profile Header Block */}
            <div className="bg-white border-b border-slate-100 pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                        {/* Avatar */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-[48px] overflow-hidden border-8 border-slate-50 shadow-2xl">
                                <img
                                    src={profile.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl shadow-indigo-600/30">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div className="space-y-1">
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                                    {profile.full_name || profile.username}
                                </h1>
                                <p className="text-lg text-slate-500 font-medium">@{profile.username}</p>
                            </div>

                            <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                                {profile.bio || "Exploring the world one mood at a time. Digital nomad and tea enthusiast."}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                                <div className="px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-indigo-500" />
                                    <span className="text-sm font-bold text-slate-700">Manali, India</span>
                                </div>
                                <div className="px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-amber-500" />
                                    <span className="text-sm font-bold text-slate-700">Elite Explorer</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <Button className="rounded-full h-14 px-10 shadow-xl shadow-indigo-600/20 bg-indigo-600 hover:bg-indigo-700">
                                Follow Explorer
                            </Button>
                            <Button variant="outline" className="rounded-full h-14 px-10 border-2">
                                <MessageSquare className="w-5 h-5 mr-3" /> Message
                            </Button>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="flex gap-12 mt-12 pt-8 border-t border-slate-100 justify-center md:justify-start">
                        <div className="text-center md:text-left">
                            <p className="text-2xl font-black text-slate-900">{trips?.length || 0}</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trips Shared</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-2xl font-black text-slate-900">{reviews?.length || 0}</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Reviews</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-2xl font-black text-slate-900">4.2k</p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Karma Points</p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Public Trips Grid */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <Compass className="w-8 h-8 text-indigo-600" /> Public Itineraries
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {trips.map((trip: any) => (
                                <Link key={trip.id} href={`/trip/${trip.public_slug}`}>
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50 cursor-pointer"
                                    >
                                        <div className="h-48 bg-slate-200 relative">
                                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase text-slate-900">
                                                    {trip.mood}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{trip.destinations.name}</h3>
                                            <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {trip.duration_days} Days
                                            </p>
                                            <div className="flex items-center justify-between mt-6">
                                                <span className="text-primary font-black">₹{trip.budget.toLocaleString()}</span>
                                                <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                                    <Heart className="w-3 h-3 fill-slate-400" /> 124
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-4 space-y-8">
                        <h2 className="text-2xl font-black text-slate-900">Recent Activity</h2>
                        <div className="space-y-6">
                            {reviews.map((rev: any) => (
                                <div key={rev.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md">
                                    <p className="text-xs font-black text-indigo-600 uppercase mb-2">Reviewed {rev.destinations?.name || 'Stay'}</p>
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`w-3 h-3 rounded-full ${i < rev.rating ? 'bg-amber-400' : 'bg-slate-100'}`} />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                                        {rev.review_text}
                                    </p>
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
