"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronLeft, Map, Coffee, Camera, Tent, Music, Utensils, Heart, Users, User } from "lucide-react";

// Steps
const STEPS = [
    { id: 'style', title: "What's your travel vibe?", description: "How do you usually like to explore?" },
    { id: 'interests', title: "What fuels your soul?", description: "Pick a few things that make you happy." },
    { id: 'partner', title: "Travel Buddy Preference", description: "If you travel with others, who do you look for?" },
    { id: 'bio', title: "Almost there!", description: "Add a quick bio to let others know you." }
];

const TRAVEL_STYLES = [
    { id: 'Solo', icon: User, label: "Solo Explorer", desc: "I love my own company and freedom." },
    { id: 'Couple', icon: Heart, label: "Romantic Getaway", desc: "Traveling with my better half." },
    { id: 'Squad', icon: Users, label: "Squad Goals", desc: "Fun times with my besties." },
    { id: 'Family', icon: Tent, label: "Family Vacation", desc: "Making memories with the fam." }
];

const INTERESTS = [
    { id: 'Food', icon: Utensils, label: "Foodie" },
    { id: 'Nature', icon: Tent, label: "Nature" },
    { id: 'Adventure', icon: Map, label: "Adventure" },
    { id: 'Culture', icon: Camera, label: "Culture" },
    { id: 'Relaxation', icon: Coffee, label: "Relaxation" },
    { id: 'Nightlife', icon: Music, label: "Nightlife" }
];

export default function OnboardingPage() {
    const router = useRouter();
    const { updateProfile } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);

    // Form State
    const [formData, setFormData] = useState({
        travelStyle: "",
        interests: [] as string[],
        partnerPref: "",
        bio: ""
    });

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            handleFinish();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
        }
    };

    const handleFinish = () => {
        // Save to profile
        updateProfile({
            bio: formData.bio,
            travelStyles: [formData.travelStyle, ...formData.interests], // Merging style and interests as tags for simplicity
            // In a real app, you might save these to separate fields
        });

        // Redirect to Mood Selection
        router.push('/mood');
    };

    const toggleInterest = (id: string) => {
        setFormData(prev => {
            const exists = prev.interests.includes(id);
            if (exists) {
                return { ...prev, interests: prev.interests.filter(i => i !== id) };
            } else {
                return { ...prev, interests: [...prev.interests, id] };
            }
        });
    };

    // Components for each step
    const renderStep = () => {
        switch (currentStep) {
            case 0: // Travel Style
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {TRAVEL_STYLES.map(style => (
                            <button
                                key={style.id}
                                onClick={() => setFormData({ ...formData, travelStyle: style.id })}
                                className={`p-6 rounded-2xl border-2 text-left transition-all flex items-start gap-4 hover:border-indigo-200 hover:bg-indigo-50 ${formData.travelStyle === style.id ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-100 bg-white'}`}
                            >
                                <div className={`p-3 rounded-full ${formData.travelStyle === style.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    <style.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className={`font-bold text-lg ${formData.travelStyle === style.id ? 'text-indigo-900' : 'text-gray-900'}`}>{style.label}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{style.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                );
            case 1: // Interests
                return (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {INTERESTS.map(item => {
                            const isSelected = formData.interests.includes(item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => toggleInterest(item.id)}
                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center h-32 ${isSelected ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'}`}
                                >
                                    <item.icon className={`w-8 h-8 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
                                    <span className="font-semibold text-sm">{item.label}</span>
                                    {isSelected && <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full"></div>}
                                </button>
                            );
                        })}
                    </div>
                );
            case 2: // Partner Preferences
                return (
                    <div className="space-y-4">
                        <textarea
                            value={formData.partnerPref}
                            onChange={(e) => setFormData({ ...formData, partnerPref: e.target.value })}
                            placeholder="I'm looking for someone who loves early morning hikes and trying local street food..."
                            className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none text-slate-700 bg-white"
                        />
                        <p className="text-sm text-gray-500 italic">
                            Tip: Be specific! It helps us match you with the right crowd.
                        </p>
                    </div>
                );
            case 3: // Bio
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
                            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                                🎒
                            </div>
                            <div>
                                <h3 className="font-bold text-blue-900">Your Traveler Profile</h3>
                                <p className="text-sm text-blue-700">This is how others will see you.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Short Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Just a traveler looking for the next adventure..."
                                className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none text-slate-700 bg-white"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const isStepValid = () => {
        if (currentStep === 0) return !!formData.travelStyle;
        if (currentStep === 1) return formData.interests.length > 0;
        return true; // Optional steps
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white max-w-2xl w-full rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[600px]"
            >
                {/* Progress Bar */}
                <div className="h-2 bg-gray-100 w-full">
                    <div
                        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                </div>

                {/* Header */}
                <div className="p-8 md:p-12 pb-6">
                    <button
                        onClick={currentStep === 0 ? () => router.back() : handleBack}
                        className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>

                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {STEPS[currentStep].title}
                        </h1>
                        <p className="text-gray-500 text-lg">
                            {STEPS[currentStep].description}
                        </p>
                    </motion.div>
                </div>

                {/* Content Area */}
                <div className="flex-1 px-8 md:px-12 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="p-8 md:p-12 pt-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                    <Button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        size="lg"
                        className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 text-lg h-12 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                        {currentStep === STEPS.length - 1 ? 'Complete Profile' : 'Continue'}
                        {currentStep !== STEPS.length - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
