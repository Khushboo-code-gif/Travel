"use client";

import { useAuth } from "@/context/AuthContext";
import { useTrips } from "@/context/TripsContext";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Settings, Edit, LogOut, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const { user, signOut } = useAuth();
    const { trips, deleteTrip } = useTrips();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-slate-900">Please Sign In</h1>
                    <p className="text-slate-600">You need to be logged in to view your profile.</p>
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Filter trips created by this user
    // In a real app, this would check trip.user_id === user.id
    // For now, we'll match by name since we used that for the "My Trip" badge
    const myTrips = trips.filter(t => t.user.name === user.name);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">

                {/* ... (Header and Stats) ... */}

                {/* Content Sections */}
                <div className="grid lg:grid-cols-3 gap-8 mt-12">

                    {/* Left Column: My Trips */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">My Upcoming Trips</h2>
                            <Link href="/trips/create" className="text-sm text-indigo-600 font-semibold hover:underline">
                                + Plan New
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {myTrips.length === 0 ? (
                                <p className="text-slate-500 text-sm">You haven't posted any trips yet.</p>
                            ) : (
                                myTrips.map((trip, idx) => (
                                    <motion.div
                                        key={trip.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                                <img src={`https://source.unsplash.com/random/200x200/?${trip.destination}`} alt={trip.destination} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900">{trip.destination}</h3>
                                                <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {trip.dates}</span>
                                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {trip.budget}</span>
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                Confirmed
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                                            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1">
                                                <Edit className="w-3 h-3" /> Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 h-8 text-xs gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this trip request?')) {
                                                        deleteTrip(trip.id);
                                                    }
                                                }}
                                            >
                                                <LogOut className="w-3 h-3 rotate-180" /> Delete
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))
                            )}

                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center space-y-3">
                                <h3 className="text-indigo-900 font-semibold">Dreaming of somewhere?</h3>
                                <p className="text-indigo-600 text-sm">Start an AI-powered plan for your next adventure.</p>
                                <Link href="/mood">
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">Create New Trip</Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Savings & preferences */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900">Travel Wallet</h2>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <div className="relative z-10">
                                <p className="text-slate-400 text-sm font-medium mb-1">Total Savings</p>
                                <h3 className="text-3xl font-bold">₹12,450</h3>
                                <div className="mt-6 flex items-center gap-2 text-xs text-slate-300">
                                    <span className="bg-white/20 px-2 py-1 rounded">Coins: 450</span>
                                    <span className="bg-white/20 px-2 py-1 rounded">Level: Explorer</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
                            <h3 className="font-bold text-slate-900">Settings</h3>
                            <div className="space-y-2">
                                <SettingRow icon={<Users className="w-4 h-4" />} label="Travel Interface" />
                                <SettingRow icon={<MapPin className="w-4 h-4" />} label="Saved Locations" />
                                <SettingRow icon={<Settings className="w-4 h-4" />} label="App Settings" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, delay }: { label: string, value: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center"
        >
            <h3 className="text-2xl font-bold text-indigo-600">{value}</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">{label}</p>
        </motion.div>
    );
}

function SettingRow({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-slate-600 hover:text-indigo-600">
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}
