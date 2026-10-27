"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { MOODS } from "@/data/moods";
import { Zap, Users, Heart, User, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function PreferencesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const moodId = searchParams.get("mood");
    const selectedMood = MOODS.find((m) => m.id === moodId) || MOODS[0];

    const [budget, setBudget] = useState([5000]); // Max limit
    const [duration, setDuration] = useState(3);
    const [avoidCrowds, setAvoidCrowds] = useState(false);
    const [isInternational, setIsInternational] = useState(false);
    const [travelType, setTravelType] = useState("solo");
    const [peopleCount, setPeopleCount] = useState(1);

    const handlePlan = () => {
        // Navigate to loading/processing screen
        router.push(`/planning?mood=${moodId}&budget=${budget[0]}&duration=${duration}&crowd=${avoidCrowds}&type=${travelType}&people=${peopleCount}&intl=${isInternational}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-12 gap-12">
                {/* LEFT COLUMN - FORM */}
                <div className="lg:col-span-7 space-y-12">
                    <div>
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gray-50 text-gray-500 text-sm font-medium border border-gray-100">
                            Step 2 of 3
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Customize your <span className="text-primary">{selectedMood?.label}</span> escape.
                        </h1>
                        <p className="text-gray-500">
                            Tell us your constraints, we'll find the magic.
                        </p>
                    </div>

                    {/* Geography Selection */}
                    <div className="space-y-4">
                        <label className="text-lg font-semibold text-gray-800">Where do you want to go?</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setIsInternational(false)}
                                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${!isInternational
                                    ? 'bg-primary/5 border-primary text-primary ring-1 ring-primary/20'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <MapPin className="w-5 h-5" />
                                <span className="font-bold">India</span>
                            </button>
                            <button
                                onClick={() => setIsInternational(true)}
                                className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${isInternational
                                    ? 'bg-primary/5 border-primary text-primary ring-1 ring-primary/20'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <span className="text-xl">🌍</span>
                                <span className="font-bold">Outside India</span>
                            </button>
                        </div>
                    </div>

                    {/* People Selection */}
                    <div className="space-y-4">
                        <label className="text-lg font-semibold text-gray-800">How many people?</label>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPeopleCount(num)}
                                    className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold transition-all ${peopleCount === num
                                        ? 'bg-primary text-white border-primary shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Budget Section */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="text-lg font-semibold text-gray-800">Budget per person</label>
                            <span className="text-primary font-bold text-xl">₹{budget[0].toLocaleString()}</span>
                        </div>
                        <Slider
                            defaultValue={[5000]}
                            max={20000}
                            min={2000}
                            step={100}
                            value={budget}
                            onValueChange={setBudget}
                            className="py-4"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                            <span>₹2,000</span>
                            <span>₹20,000+</span>
                        </div>
                        <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-800">Estimated Total Trip Cost</span>
                            <span className="text-lg font-black text-blue-900">₹{(budget[0] * peopleCount).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Duration Section */}
                    <div className="space-y-4">
                        <label className="text-lg font-semibold text-gray-800">Duration</label>
                        <div className="flex flex-wrap gap-3">
                            {[2, 3, 5, 7].map((days) => (
                                <button
                                    key={days}
                                    onClick={() => setDuration(days)}
                                    className={`px-6 py-3 rounded-full border transition-all ${duration === days
                                        ? 'bg-primary text-white border-primary shadow-md'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                        }`}
                                >
                                    {days} Days
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Crowd Preference */}
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="space-y-1">
                            <div className="font-semibold text-gray-900 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" fill="currentColor" />
                                Hide Crowded Places
                            </div>
                            <p className="text-sm text-gray-500">Only show off-beat & hidden gems</p>
                        </div>
                        <Switch checked={avoidCrowds} onCheckedChange={setAvoidCrowds} />
                    </div>

                    {/* Travel Type */}
                    <div className="space-y-4">
                        <label className="text-lg font-semibold text-gray-800">Travel Type</label>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'solo', label: 'Solo', icon: <User className="w-5 h-5" /> },
                                { id: 'couple', label: 'Couple', icon: <Heart className="w-5 h-5" /> },
                                { id: 'friends', label: 'Friends', icon: <Users className="w-5 h-5" /> },
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setTravelType(type.id)}
                                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${travelType === type.id
                                        ? 'bg-blue-50 border-primary text-primary ring-1 ring-primary/20'
                                        : 'bg-white border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {type.icon}
                                    <span className="font-medium text-sm">{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button onClick={handlePlan} size="lg" className="w-full h-14 text-lg rounded-xl shadow-lg shadow-blue-500/20">
                        Generate My Plan
                    </Button>
                </div>

                {/* RIGHT COLUMN - LIVE PREVIEW */}
                <div className="hidden lg:block lg:col-span-5">
                    <div className="sticky top-32">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xl shadow-blue-100/50 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className={`absolute top-0 left-0 right-0 h-32 ${selectedMood.color} opacity-30`}></div>

                            <div className="relative pt-8 text-center space-y-2 mb-8">
                                <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm">
                                    {selectedMood.emoji}
                                </div>
                                <h3 className="font-bold text-xl text-gray-900">{selectedMood.label} Trip</h3>
                                <p className="text-gray-500 text-sm">Estimated Vibe Check</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between text-sm py-3 border-b border-dashed border-gray-200">
                                    <span className="text-gray-500">Crowd Level</span>
                                    <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${avoidCrowds ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {avoidCrowds ? 'Low (Hidden Gems)' : 'Standard'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-3 border-b border-dashed border-gray-200">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="font-semibold text-gray-900">{duration} Days</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-3 border-b border-dashed border-gray-200">
                                    <span className="text-gray-500">Est. Cost</span>
                                    <span className="font-semibold text-gray-900">~ ₹{budget[0].toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-start gap-3">
                                <div className="mt-1 bg-white p-1.5 rounded-full shadow-sm">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-900">AI Prediction</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed mt-1">
                                        Based on your budget of ₹{budget[0]}, we might look at {budget[0] > 10000 ? 'premium stays in ' : 'cozy hostels in '} {isInternational ? 'international hubs like Bali or Dubai' : 'domestic escapes like Munnar or Jaisalmer'}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function PreferencesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PreferencesContent />
        </Suspense>
    )
}
