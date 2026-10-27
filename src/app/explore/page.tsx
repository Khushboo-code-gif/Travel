"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Destination } from "@/types";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Users, Gem, SlidersHorizontal, Search } from "lucide-react";
import MapView from "@/components/map/MapView";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExplorePage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [filter, setFilter] = useState<'all' | 'hidden'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSemanticSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('/api/search/semantic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: searchQuery })
            });
            const json = await res.json();
            setDestinations(json.data || []);
        } catch (err) {
            console.error("Search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function fetchDestinations() {
            setLoading(true);
            try {
                const url = filter === 'hidden'
                    ? '/api/destinations/hidden-gems'
                    : '/api/destinations';
                const res = await fetch(url);
                const json = await res.json();
                setDestinations(json.data || []);
            } catch (err) {
                console.error("Failed to fetch:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchDestinations();
    }, [filter]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Split View */}
            <main className="flex-1 flex flex-col md:flex-row pt-20 h-screen overflow-hidden">

                {/* Left: Sidebar / List */}
                <div className="w-full md:w-[400px] lg:w-[450px] bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0 z-10 shadow-xl flex flex-col">
                    <div className="p-6 pb-4 border-b border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-2xl font-bold text-slate-900">Explore</h1>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <SlidersHorizontal className="w-5 h-5 text-slate-500" />
                            </Button>
                        </div>
                        <p className="text-slate-500 text-sm mb-6">Discover your next escape with AI insights.</p>

                        {/* Semantic Search */}
                        <form onSubmit={handleSemanticSearch} className="mb-6 relative">
                            <input
                                type="text"
                                placeholder="Describe your dream vibe..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </form>

                        {/* Filters */}
                        <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
                            <Button
                                variant={filter === 'all' ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilter('all')}
                                className={`rounded-full whitespace-nowrap px-4 ${filter === 'all' ? 'bg-primary shadow-lg shadow-blue-500/20' : ''}`}
                            >
                                All Places
                            </Button>
                            <Button
                                variant={filter === 'hidden' ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilter('hidden')}
                                className={`rounded-full whitespace-nowrap px-4 ${filter === 'hidden' ? 'bg-amber-500 border-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20' : ''}`}
                            >
                                <Gem className="w-3.5 h-3.5 mr-1.5" /> Hidden Gems
                            </Button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex gap-4 p-3 animate-pulse">
                                    <div className="w-24 h-24 rounded-xl bg-slate-100 flex-shrink-0" />
                                    <div className="flex-1 space-y-2 py-1">
                                        <div className="h-4 bg-slate-100 rounded w-3/4" />
                                        <div className="h-3 bg-slate-100 rounded w-1/2" />
                                        <div className="h-3 bg-slate-100 rounded w-full mt-4" />
                                    </div>
                                </div>
                            ))
                        ) : destinations.length > 0 ? (
                            <AnimatePresence>
                                {destinations.map((place, idx) => (
                                    <motion.div
                                        key={place.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link
                                            href={`/destination/${place.slug}`}
                                            className="group flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100 hover:shadow-sm"
                                        >
                                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm">
                                                <img
                                                    src={place.primary_image?.image_url || '/images/placeholder.jpg'}
                                                    alt={place.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-slate-900 truncate pr-2">{place.name}</h3>
                                                    {place.is_hidden_gem && (
                                                        <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold border border-amber-200/50 flex flex-shrink-0 items-center">
                                                            <Gem className="w-2.5 h-2.5 mr-1" /> GEM
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 text-xs font-medium mt-1">
                                                    <span className={`flex items-center gap-1 ${place.crowd_level < 3 ? 'text-green-600' : 'text-orange-600'}`}>
                                                        <Users className="w-3 h-3" /> Lv.{place.crowd_level} Density
                                                    </span>
                                                    <span className="flex items-center gap-1 text-blue-600">
                                                        <TrendingUp className="w-3 h-3" /> {place.popularity_score}% Popular
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 mt-2 text-slate-400 text-xs">
                                                    <MapPin className="w-3 h-3" /> {place.city}, {place.state}
                                                </div>
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {place.vibe?.slice(0, 2).map(v => (
                                                        <span key={v} className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded tracking-wide font-semibold uppercase">
                                                            {v}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="py-20 flex flex-col items-center text-center px-6">
                                <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-6 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-20 grayscale" alt="Empty" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No vibe matches found</h3>
                                <p className="text-slate-500 text-sm max-w-xs">We couldn't find any destinations matching your current filters. Try adjusting your mood or budget!</p>
                                <Button
                                    variant="outline"
                                    className="mt-6 rounded-full"
                                    onClick={() => { setFilter('all'); setSearchQuery(''); }}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Map */}
                <div className="flex-1 relative bg-slate-100">
                    <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-inner border border-white/50">
                        <MapView destinations={destinations
                            .filter(d => d.latitude !== undefined && d.longitude !== undefined)
                            .map(d => ({
                                id: d.id,
                                name: d.name,
                                latitude: d.latitude!,
                                longitude: d.longitude!,
                                crowd_percentage: (d.crowd_level || 1) * 20,
                                is_hidden_gem: d.is_hidden_gem,
                                image_url: d.primary_image?.image_url
                            }))}
                        />
                    </div>
                </div>

            </main>
        </div>
    );
}
