"use client";

import { useEffect, useState } from "react";
import { Plane, Hotel, Loader2, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LivePricingProps {
    cityCode: string;
    cityName: string;
}

export function LivePricingWidget({ cityCode, cityName }: LivePricingProps) {
    const [flights, setFlights] = useState<any[]>([]);
    const [hotels, setHotels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!cityCode) return;

        async function fetchLiveData() {
            setLoading(true);
            try {
                const [fRes, hRes] = await Promise.all([
                    fetch(`/api/live/flights?destination=${cityCode}`),
                    fetch(`/api/live/hotels?cityCode=${cityCode}`)
                ]);
                const [fData, hData] = await Promise.all([fRes.json(), hRes.json()]);
                setFlights(fData.data || []);
                setHotels(hData.data || []);
            } catch (err) {
                console.error("Failed to fetch live data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchLiveData();
    }, [cityCode]);

    if (!cityCode) return null;

    return (
        <div className="bg-slate-900 rounded-[32px] p-6 lg:p-8 text-white shadow-2xl shadow-indigo-900/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live Pricing & Availability
                        </h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time data for {cityName}</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                        <p className="text-sm text-slate-500 font-medium">Connecting to Global Travel GDS...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Flights Column */}
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                <Plane className="w-4 h-4 text-indigo-400" /> Best Flight Deals
                            </h4>
                            <div className="space-y-3">
                                {flights.slice(0, 3).map((f: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors"
                                    >
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">{f.airline || 'Carrier'}</p>
                                            <p className="font-black text-sm">₹{f.price.total}</p>
                                        </div>
                                        <Button size="sm" variant="ghost" className="h-8 rounded-full text-[10px] font-bold uppercase tracking-tight text-white hover:bg-white/20">
                                            Book <ArrowRight className="w-3 h-3 ml-1" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Hotels Column */}
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                <Hotel className="w-4 h-4 text-emerald-400" /> Live Hotel Rates
                            </h4>
                            <div className="space-y-3">
                                {hotels.slice(0, 2).map((h: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-white/5 border border-white/10 p-3 rounded-2xl space-y-2 group hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex justify-between items-start">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase truncate max-w-[120px]">{h.hotel?.name}</p>
                                            <span className="text-[10px] font-black text-emerald-400">₹{h.offers?.[0]?.price?.total || 'N/A'}/nt</span>
                                        </div>
                                        <Button size="sm" className="w-full h-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold">
                                            View Property
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-4 border-t border-white/10 text-center">
                    <p className="text-[9px] text-slate-500 font-medium uppercase tracking-[0.2em]">
                        Pricing powered by Amadeus Travel GDS • Updated 2 mins ago
                    </p>
                </div>
            </div>
        </div>
    );
}
