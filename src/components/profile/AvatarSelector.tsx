"use client";

import { useState } from "react";
import { AVATARS, Avatar } from "@/lib/avatars";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface AvatarSelectorProps {
    selectedAvatar: string | null;
    onSelect: (avatarUrl: string) => void;
}

export function AvatarSelector({ selectedAvatar, onSelect }: AvatarSelectorProps) {
    const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all');

    const filteredAvatars = AVATARS.filter(avatar => {
        if (filter === 'all') return true;
        return avatar.gender === filter;
    });

    return (
        <div className="space-y-4">
            {/* Filter Tabs */}
            <div className="flex justify-center gap-2 mb-6">
                {(['all', 'male', 'female'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize
                            ${filter === f
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}
                        `}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-4">
                {filteredAvatars.map((avatar) => (
                    <motion.button
                        key={avatar.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(avatar.url)}
                        className={`relative group rounded-2xl overflow-hidden border-2 transition-all p-1
                            ${selectedAvatar === avatar.url
                                ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200 ring-offset-2'
                                : 'border-transparent hover:border-slate-200 hover:bg-slate-50'}
                        `}
                    >
                        <div className="aspect-square rounded-xl overflow-hidden bg-white">
                            <img
                                src={avatar.url}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {selectedAvatar === avatar.url && (
                            <div className="absolute inset-0 bg-indigo-900/10 flex items-center justify-center">
                                <div className="bg-indigo-600 text-white p-1.5 rounded-full shadow-lg">
                                    <Check className="w-4 h-4" />
                                </div>
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
