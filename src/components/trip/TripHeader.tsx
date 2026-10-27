"use client";

import { Badge } from "lucide-react";
import { Destination } from "@/types";
import { motion } from "framer-motion";

interface TripHeaderProps {
    destination: Destination;
}

export function TripHeader({ destination }: TripHeaderProps) {
    return (
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-b-[40px] shadow-2xl">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.primary_image?.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                                {destination.state}, India
                            </span>
                            {destination.is_hidden_gem && (
                                <span className="bg-amber-400/90 text-amber-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                                    💎 Hidden Gem
                                </span>
                            )}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">{destination.name}</h1>
                        <p className="text-lg text-gray-200 max-w-xl line-clamp-2">{destination.short_description}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 min-w-[300px]"
                    >
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Live Indicators</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Crowd Level</span>
                                    <span className="font-bold">Lv.{destination.crowd_level || 1} / 5</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${(destination.crowd_level || 1) < 3 ? 'bg-green-400' : 'bg-orange-400'}`}
                                        style={{ width: `${(destination.crowd_level || 1) * 20}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Popularity</span>
                                    <span className="font-bold">{destination.popularity_score || 0}%</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-400 rounded-full"
                                        style={{ width: `${destination.popularity_score || 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
