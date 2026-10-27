"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Map, Wallet } from "lucide-react";

// Note: Lucide icons can sometimes have name mismatches in imports, using standard ones
import { Users, Compass, Loader2 } from "lucide-react";

function PlanningContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { text: "Analyzing your mood patterns...", icon: <Brain className="w-8 h-8 text-blue-400" />, bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
        { text: "Scanning crowd density...", icon: <Users className="w-8 h-8 text-green-400" />, bg: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" },
        { text: "Finding hidden gems...", icon: <Sparkles className="w-8 h-8 text-purple-400" />, bg: "https://images.unsplash.com/photo-1533130061792-64b345e4a833" },
        { text: "Optimizing your budget...", icon: <Wallet className="w-8 h-8 text-amber-400" />, bg: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
        { text: "Finalizing your escape...", icon: <Compass className="w-8 h-8 text-red-400" />, bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    ];

    useEffect(() => {
        // We handle the API call in the results page now
        // This page is just the "AI Thinking" immersion

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            router.push(`/recommendations?${params.toString()}`);
        }, 6500);

        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < steps.length - 1) return prev + 1;
                return prev;
            });
        }, 1300);

        return () => {
            clearTimeout(timer);
            clearInterval(stepInterval);
        };
    }, [router, searchParams]);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
            {/* Dynamic Full-Screen Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={steps[currentStep].bg}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={steps[currentStep].bg}
                        className="w-full h-full object-cover grayscale-[0.2]"
                        alt="Travel Scene"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Premium Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950 z-1" />
            <div className="absolute inset-0 backdrop-blur-[1px] z-1" />

            <div className="relative z-10 flex flex-col items-center max-w-2xl px-6">
                {/* AI Pulse Orb */}
                <div className="relative w-48 h-48 mb-16">
                    <motion.div
                        className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
                    />
                    <motion.div
                        className="absolute inset-0 border-[1px] border-white/10 rounded-full"
                    />
                    <motion.div
                        className="absolute inset-2 border-[1px] border-t-indigo-500/50 border-r-indigo-400/50 border-b-transparent border-l-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0.2, scale: 1.5, filter: 'blur(10px)' }}
                                transition={{ duration: 0.6 }}
                                className="bg-white/5 backdrop-blur-md w-24 h-24 rounded-[32px] border border-white/10 flex items-center justify-center shadow-2xl"
                            >
                                {steps[currentStep].icon}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Orbital Particles */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
                    </motion.div>
                </div>

                {/* Status Text */}
                <div className="h-28 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="space-y-3 text-center"
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                {steps[currentStep].text}
                            </h2>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">
                                Step {currentStep + 1} of 5
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full mt-12 overflow-hidden border border-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-400"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 1.3 }}
                    />
                </div>

                <div className="mt-8 flex items-center gap-3 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    AI Engine Processing
                </div>
            </div>
        </div>
    );
}

export default function PlanningPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
            <PlanningContent />
        </Suspense>
    );
}
