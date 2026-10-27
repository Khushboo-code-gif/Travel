"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
            {/* Background Blobs - Softer & Larger */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col justify-center space-y-8 relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 text-indigo-600 text-sm font-bold shadow-sm w-fit">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                        </span>
                        AI-Powered Travel Planning
                    </div>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.05]">
                        Tell us how <br />
                        you <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">feel</span> today.
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
                        Don't just plan a trip, plan an experience. We build personalized itineraries based on your mood, vibes, and budget.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Link href="/mood">
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-14 px-8 text-lg shadow-lg shadow-indigo-200 transition-all hover:scale-105">
                                Start Planning Trip <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button variant="outline" size="lg" className="h-14 rounded-full px-8 border-2 border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600 text-lg font-semibold bg-transparent transition-all">
                                Explore Hidden Gems
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-[3px] border-white bg-slate-100 shadow-sm overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-amber-400 text-sm">
                                ★★★★★
                            </div>
                            <p className="text-sm font-bold text-slate-700">Trusted by 10,000+ travelers</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content - Ethereal Image Composition */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                    className="relative h-[700px] hidden lg:block perspective-1000"
                >
                    {/* Main Glass Container */}
                    <div className="absolute inset-x-0 top-10 bottom-10 bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-6 transform rotate-y-6 rotate-x-2 transition-transform hover:rotate-0 duration-500 overflow-hidden group">

                        {/* Browser Header */}
                        <div className="flex items-center gap-2 mb-6 ml-2 relative z-20">
                            <div className="w-3.5 h-3.5 rounded-full bg-rose-400/80 shadow-inner"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-amber-400/80 shadow-inner"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/80 shadow-inner"></div>
                            <div className="h-8 bg-white/50 rounded-full ml-4 w-64 flex items-center px-4 text-xs text-slate-500 font-semibold tracking-wide shadow-sm backdrop-blur-md">moodtrip.ai</div>
                        </div>

                        {/* Image Collage Grid */}
                        <div className="grid grid-cols-12 gap-4 h-[550px] relative z-10 p-2">

                            {/* Col 1: Nature & Serenity */}
                            <div className="col-span-5 flex flex-col gap-4 pt-8">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="h-48 rounded-3xl overflow-hidden shadow-lg border-4 border-white"
                                >
                                    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop" alt="Nature" className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="flex-1 rounded-3xl overflow-hidden shadow-lg border-4 border-white relative"
                                >
                                    <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop" alt="Hotel" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white font-bold">Luxury Stays</div>
                                </motion.div>
                            </div>

                            {/* Col 2: Adventure & Vibes */}
                            <div className="col-span-7 flex flex-col gap-4">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="flex-1 rounded-3xl overflow-hidden shadow-lg border-4 border-white relative"
                                >
                                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop" alt="Adventure" className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                        📸 Best Seller
                                    </div>
                                </motion.div>
                                <div className="h-40 grid grid-cols-2 gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="rounded-3xl overflow-hidden shadow-lg border-4 border-white"
                                    >
                                        <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop" alt="Pool" className="w-full h-full object-cover" />
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-indigo-100 flex items-center justify-center relative"
                                    >
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop')] bg-cover opacity-60"></div>
                                        <div className="relative z-10 text-center">
                                            <span className="text-2xl font-black text-indigo-900">+50</span>
                                            <div className="text-[10px] uppercase tracking-wider font-bold text-indigo-800">Destinations</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                        </div>

                        {/* Floating Element 1: Mood */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-24 right-8 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.2)] border border-white/50 w-48 z-30"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">🌿</div>
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Mood</div>
                                    <div className="font-bold text-slate-800 text-base">Peaceful</div>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[92%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            </div>
                        </motion.div>

                        {/* Floating Element 2: Crowd Index */}
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-32 -left-6 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.2)] border border-white/50 w-60 z-30"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Live Crowd Index</span>
                                <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-bold shadow-sm">Low Traffic</span>
                            </div>
                            <div className="flex items-end gap-1.5 h-12 justify-between">
                                <div className="w-1/6 bg-indigo-100 h-[40%] rounded-t-sm"></div>
                                <div className="w-1/6 bg-indigo-200 h-[60%] rounded-t-sm"></div>
                                <div className="w-1/6 bg-indigo-500 h-[85%] rounded-t-sm shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                                <div className="w-1/6 bg-indigo-200 h-[50%] rounded-t-sm"></div>
                                <div className="w-1/6 bg-indigo-100 h-[30%] rounded-t-sm"></div>
                            </div>
                        </motion.div>

                        {/* Decorative Blur */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/30 rounded-full blur-[80px] pointer-events-none z-0"></div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
