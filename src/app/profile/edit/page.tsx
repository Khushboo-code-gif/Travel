"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AvatarSelector } from "@/components/profile/AvatarSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, MapPin, AtSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function EditProfilePage() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Initialize with user data
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        gender: "other",
        avatar_url: "",
        bio: "",
        location: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.name || "",
                username: user.name?.toLowerCase().replace(/\s/g, '') || "", // Mock username from name
                gender: "other", // Default as we don't track gender in simple mock auth yet
                avatar_url: user.avatar || "",
                bio: user.bio || "",
                location: user.location || ""
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarSelect = (url: string) => {
        setFormData({ ...formData, avatar_url: url });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to Supabase
        // await supabase.from("profiles").update({...}).eq('id', user.id)

        setTimeout(() => {
            updateProfile({
                name: formData.full_name,
                avatar: formData.avatar_url,
                bio: formData.bio,
                location: formData.location
            });

            toast.success("Profile updated successfully!");
            router.push('/profile');
            setIsLoading(false);
        }, 1000);
    };

    if (!user) return null; // Or loading spinner

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-12 px-4 max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/profile" className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-sm font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Profile
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
                    <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
                            <p className="text-slate-500 text-sm">Update your personal details and public profile.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Avatar Selection */}
                        <div className="space-y-4">
                            <Label className="text-base font-semibold text-slate-800">Change Avatar</Label>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <AvatarSelector
                                    selectedAvatar={formData.avatar_url}
                                    onSelect={handleAvatarSelect}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <AtSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="pl-10 bg-slate-50"
                                        disabled // Username often immutable or requires checks
                                        title="Username cannot be changed"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

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
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="h-24 resize-none"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                            >
                                {isLoading ? "Saving Changes..." : "Save Changes"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="h-11 px-8"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
