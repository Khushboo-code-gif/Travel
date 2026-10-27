"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AvatarSelector } from "@/components/profile/AvatarSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, MapPin, AtSign } from "lucide-react";

export default function CompleteProfilePage() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        full_name: user?.name || "",
        username: "",
        gender: "other",
        avatar_url: user?.avatar || "",
        bio: "",
        location: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarSelect = (url: string) => {
        setFormData({ ...formData, avatar_url: url });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.full_name || !formData.username || !formData.avatar_url) {
            toast.error("Please fill in all required fields and select an avatar.");
            return;
        }

        setIsLoading(true);

        // Simulate API call to Supabase
        // await supabase.from("profiles").insert({...})
        setTimeout(() => {
            updateProfile({
                name: formData.full_name,
                avatar: formData.avatar_url,
                // In a real app, we'd store the rest of the data too
            });

            toast.success("Profile completed successfully!");
            router.push('/dashboard'); // As per brief
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-10">
            <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Profile</h1>
                    <p className="text-slate-500">Tell us a bit about yourself to get started.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Avatar Selection */}
                    <div className="space-y-3">
                        <Label className="text-lg font-semibold text-slate-800">Choose your Avatar</Label>
                        <AvatarSelector
                            selectedAvatar={formData.avatar_url}
                            onSelect={handleAvatarSelect}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* 2. Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name *</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        {/* 3. Username */}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username *</Label>
                            <div className="relative">
                                <AtSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <Input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="johndoe123"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* 4. Gender */}
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* 6. Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <Input
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="New York, USA"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 5. Bio */}
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio (Optional)</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="I love traveling because..."
                            className="h-24 resize-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200"
                    >
                        {isLoading ? "Saving Profile..." : "Complete Profile"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
