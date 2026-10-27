"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Filter, MapPin, Calendar, Users, Star, MessageCircle, Heart, Share2, ShieldCheck, CheckCircle, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTrips } from "@/context/TripsContext";
import { useRouter } from "next/navigation";

export default function TripsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [managingTripId, setManagingTripId] = useState<string | null>(null);

    const { trips, deleteTrip, updateTrip } = useTrips();
    const [joinedTrips, setJoinedTrips] = useState<Set<string>>(new Set());
    const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
    const [joinMessage, setJoinMessage] = useState("");

    const handleOpenJoinModal = (tripId: string) => {
        if (!user) {
            alert("Please Sign In to join a trip!");
            return;
        }
        setSelectedTripId(tripId);
    };

    const handleSendRequest = () => {
        if (!selectedTripId) return;

        // Mock API call
        setJoinedTrips(prev => {
            const newSet = new Set(prev);
            newSet.add(selectedTripId);
            return newSet;
        });

        // Reset and Close
        setSelectedTripId(null);
        setJoinMessage("");
        toast.success("Request sent successfully! Check your inbox.");
    };

    const handleManageAction = (action: 'delete' | 'close') => {
        if (!managingTripId) return;

        if (action === 'delete') {
            if (confirm("Are you sure you want to delete this trip permanently?")) {
                deleteTrip(managingTripId);
                toast.success("Trip deleted successfully.");
                setManagingTripId(null);
            }
        } else if (action === 'close') {
            // updateTrip(managingTripId, { status: 'closed' }); // Mock update if we had status
            toast.success("Trip marked as Partner Found! No new requests will be accepted.");
            setManagingTripId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 relative">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 pt-24">
                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-12 shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Travel Tribe</h1>
                        <p className="text-blue-100 text-lg max-w-xl mb-8">
                            Connect with verified travelers, split costs, and make memories. Safe, curated, and vibe-matched.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button onClick={() => router.push('/trips/create')} size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-0 rounded-full font-bold">
                                Create Trip Request
                            </Button>
                            <Button onClick={() => router.push('/how-it-works')} variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full">
                                How it Works
                            </Button>
                        </div>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="absolute bottom-0 right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h2 className="text-xl font-bold text-gray-900">Latest Trip Requests</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full border-gray-200 text-gray-600">
                            <Filter className="w-4 h-4 mr-2" /> Filters
                        </Button>
                        <select className="bg-white border border-gray-200 text-sm rounded-full px-4 py-2 text-gray-600 outline-none focus:ring-2 focus:ring-primary/20">
                            <option>Sort by Date</option>
                            <option>Budget: Low to High</option>
                        </select>
                    </div>
                </div>

                {/* Feed Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {trips.map((post, i) => {
                        const isMyTrip = user && post.user.name === user.name;
                        const isJoined = joinedTrips.has(post.id);

                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all relative overflow-hidden ${isMyTrip ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10' : (isJoined ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-100')}`}
                            >
                                {isMyTrip && (
                                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
                                        Your Trip
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                                            {post.user.verified && (
                                                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full ring-2 ring-white" title="Verified Traveler">
                                                    <ShieldCheck className="w-3 h-3" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm">{post.user.name} {isMyTrip && <span className="text-gray-400 font-normal">(You)</span>}</h3>
                                            <div className="flex items-center text-xs text-amber-500 font-medium">
                                                <Star className="w-3 h-3 fill-current mr-1" /> {post.user.rating} Rating
                                            </div>
                                        </div>
                                    </div>
                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                        {post.budget}
                                    </span>
                                </div>

                                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" /> {post.destination}
                                </h4>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {post.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                        <Calendar className="w-3.5 h-3.5" /> {post.dates}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                        <Users className="w-3.5 h-3.5" /> {post.gender_preference}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">#{tag}</span>
                                        ))}
                                    </div>

                                    {!isMyTrip ? (
                                        <Button
                                            size="sm"
                                            onClick={() => isJoined ? null : handleOpenJoinModal(post.id)}
                                            disabled={isJoined}
                                            className={`rounded-full px-6 transition-all duration-300 ${isJoined ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}`}
                                        >
                                            {isJoined ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 mr-2" /> Request Sent
                                                </>
                                            ) : "Join Trip"}
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="rounded-full px-6 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                                            onClick={() => setManagingTripId(post.id)}
                                        >
                                            Manage Request
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center p-8 bg-green-50 rounded-2xl border border-green-100">
                    <ShieldCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-bold text-green-900 mb-2">Safety First Policy</h3>
                    <p className="text-green-800/80 text-sm max-w-lg mx-auto">
                        All travelers are ID verified via Supabase Auth. We recommend chatting within the app before sharing personal contact details.
                    </p>
                </div>

            </main>

            {/* Join Request Modal */}
            {selectedTripId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Send Join Request</h2>
                                <button onClick={() => setSelectedTripId(null)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                Introduce yourself! Let them know why you'd be a great travel buddy.
                            </p>

                            <textarea
                                value={joinMessage}
                                onChange={(e) => setJoinMessage(e.target.value)}
                                placeholder="Hey! I'm also planning to visit... I love hiking and..."
                                className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none mb-6"
                            />

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => setSelectedTripId(null)}>
                                    Cancel
                                </Button>
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSendRequest}>
                                    Send Request
                                </Button>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 text-xs text-center text-gray-500">
                            By sending a request, you agree to our Community Guidelines.
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Manage Trip Modal */}
            {managingTripId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-slate-900">Manage Trip</h2>
                                <button onClick={() => setManagingTripId(null)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    className="w-full justify-start text-left bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                                    onClick={() => handleManageAction('close')}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" /> Mark as Partner Found
                                </Button>
                                <p className="text-[10px] text-slate-400 px-1">This will stop new requests but keep the trip visible.</p>

                                <Button
                                    className="w-full justify-start text-left" variant="outline"
                                    onClick={() => alert("Edit functionality coming in next update!")}
                                >
                                    <Edit className="w-4 h-4 mr-2" /> Edit Trip Details
                                </Button>

                                <Button
                                    className="w-full justify-start text-left text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100" variant="outline"
                                    onClick={() => handleManageAction('delete')}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete Trip
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
