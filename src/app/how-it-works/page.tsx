"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Compass, Users, Sparkles, Map, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-white pb-20">
            <Navbar />

            <main className="pt-24">
                {/* Hero */}
                <section className="relative py-20 bg-blue-50 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                        >
                            Your Journey, <span className="text-blue-600">Simplified.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
                        >
                            From a vague mood to a complete itinerary with the perfect travel buddies. Here is how MoodTrip AI makes it happen.
                        </motion.p>
                    </div>
                </section>

                {/* Steps Section */}
                <section className="py-24 max-w-5xl mx-auto px-6">
                    <div className="space-y-24">
                        <Step
                            number="01"
                            title="Set Your Mood"
                            description="Don't know where to go? Just tell us how you want to feel. Burnt out? Adventure-seeking? Romantic? Our AI curates destinations that match your vibe."
                            icon={<Sparkles className="w-10 h-10 text-white" />}
                            color="bg-purple-500"
                            image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                            reverse={false}
                        />

                        <Step
                            number="02"
                            title="Find Your Tribe"
                            description="Travel is better together. Browse verified trip requests or post your own. Filter by budget, dates, and gender preference to find your perfect travel buddies."
                            icon={<Users className="w-10 h-10 text-white" />}
                            color="bg-blue-500"
                            image="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format&fit=crop"
                            reverse={true}
                        />

                        <Step
                            number="03"
                            title="AI Itinerary Planning"
                            description="Once you have a destination, our AI builds a day-by-day plan including hidden gems, food spots, and stays that fit your budget. No more endless research."
                            icon={<Map className="w-10 h-10 text-white" />}
                            color="bg-teal-500"
                            image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop"
                            reverse={false}
                        />

                        <Step
                            number="04"
                            title="Connect & Go"
                            description="Chat with your group, finalize bookings, and head out. We prioritize safety with verified profiles so you can focus on making memories."
                            icon={<ShieldCheck className="w-10 h-10 text-white" />}
                            color="bg-orange-500"
                            image="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop"
                            reverse={true}
                        />
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gray-900 text-white text-center">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-6">Ready to start your adventure?</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/mood">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 rounded-full w-full sm:w-auto">
                                    Start Planning
                                </Button>
                            </Link>
                            <Link href="/trips">
                                <Button size="lg" variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 text-lg px-8 rounded-full w-full sm:w-auto">
                                    Join a Trip
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function Step({ number, title, description, icon, color, image, reverse }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
        >
            <div className="flex-1 w-full relative group">
                <div className={`absolute inset-0 ${color} rounded-3xl rotate-6 opacity-20 transition-transform group-hover:rotate-3`} />
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="flex-1 space-y-6">
                <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center shadow-lg rotate-3`}>
                    {icon}
                </div>
                <div>
                    <span className={`text-6xl font-black text-gray-100 absolute -z-10 -ml-4 -mt-10 opacity-50`}>{number}</span>
                    <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}
