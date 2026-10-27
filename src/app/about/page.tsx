"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Globe, Shield, Sparkles } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white pb-20">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative py-32 bg-blue-50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -z-10" />
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">Our Mission</span>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                                Travel that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">understands you.</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                We believe travel shouldn't just be about "where" you go, but "how" you want to feel. MoodTrip AI plans your escape based on your emotional needs, not just tourist traps.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Values Grid */}
                <section className="py-24 max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <ValueCard
                            icon={<Heart className="w-8 h-8 text-red-500" />}
                            title="Emotion First"
                            description="We align every itinerary with your current mental state—whether you need healing, excitement, or connection."
                        />
                        <ValueCard
                            icon={<Shield className="w-8 h-8 text-blue-500" />}
                            title="Verified Safety"
                            description="Our community is vetted. We prioritize safe destinations and verified travel buddies for peace of mind."
                        />
                        <ValueCard
                            icon={<Sparkles className="w-8 h-8 text-amber-500" />}
                            title="Hidden Gems"
                            description="Our localized data finds you spots that influencers haven't ruined yet. Authentic experiences only."
                        />
                    </div>
                </section>

                {/* Team / Story */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built by Travelers, for Travelers.</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                MoodTrip AI started when we realized standard travel booking feels like a spreadsheet job. We wanted magic. We wanted spontaneity.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Using advanced AI and local insights, we've built a platform that acts like your smartest, most empathetic travel friend.
                            </p>
                            <Button size="lg" className="rounded-full px-8">Join Our Journey</Button>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative shadow-2xl skew-y-3">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Team working" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function ValueCard({ icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
