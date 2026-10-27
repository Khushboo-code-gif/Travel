"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Mood } from "@/data/moods";

interface MoodCardProps {
    mood: Mood;
    selected: boolean;
    onClick: () => void;
}

export function MoodCard({ mood, selected, onClick }: MoodCardProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 w-full aspect-square text-center group",
                selected
                    ? "border-primary bg-blue-50 shadow-md ring-2 ring-primary/20"
                    : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg"
            )}
        >
            <div className="text-4xl mb-4 filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                {mood.emoji}
            </div>

            <h3 className={cn(
                "text-lg font-semibold transition-colors",
                selected ? "text-primary" : "text-gray-800 group-hover:text-primary"
            )}>
                {mood.label}
            </h3>

            {selected && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 right-3 bg-primary text-white rounded-full p-1 shadow-sm"
                >
                    <Check className="w-4 h-4" />
                </motion.div>
            )}

            {/* Ripple Effect / Subtext Animation */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: selected ? 1 : 0, height: selected ? 'auto' : 0 }}
                className="overflow-hidden"
            >
                <p className="text-sm text-blue-600 mt-2 font-medium">
                    {mood.subtext}
                </p>
            </motion.div>
        </motion.button>
    );
}
