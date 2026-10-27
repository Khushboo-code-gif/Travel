"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Coffee, Utensils, Moon } from "lucide-react";

interface Activity {
    time: string;
    title: string;
    description: string;
    type: 'sightseeing' | 'food' | 'relax' | 'activity';
}

interface DayPlan {
    day: number;
    theme: string;
    activities: Activity[];
}

export function ItineraryTimeline({ days }: { days: DayPlan[] }) {
    return (
        <div className="space-y-8">
            {days.map((day, index) => (
                <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 border-l-2 border-blue-100"
                >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white" />

                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Day {day.day}</h3>
                        <p className="text-blue-600 font-medium">{day.theme}</p>
                    </div>

                    <div className="space-y-4">
                        {day.activities.map((activity, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                                <div className="flex flex-col items-center gap-1 min-w-[60px] pt-1">
                                    <span className="text-sm font-bold text-gray-500">{activity.time}</span>
                                    <div className="h-full w-0.5 bg-gray-50 my-1 rounded-full" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                        {activity.type === 'food' && <Utensils className="w-4 h-4 text-orange-500" />}
                                        {activity.type === 'sightseeing' && <MapPin className="w-4 h-4 text-blue-500" />}
                                        {activity.type === 'relax' && <Coffee className="w-4 h-4 text-brown-500" />}
                                        {activity.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
