"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Compass, MapPin, User, LogOut, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const { user, signIn, signOut } = useAuth();
    const isHome = pathname === "/";

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome ? 'bg-transparent pt-6' : 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className={`p-2 rounded-xl transition-colors ${isHome ? 'bg-white/40 border border-white/60 group-hover:bg-white/60' : 'bg-blue-50 text-blue-600'}`}>
                        <Compass className={`w-6 h-6 ${isHome ? 'text-indigo-600' : 'text-blue-600'}`} />
                    </div>
                    <span className={`text-xl font-bold tracking-tight ${isHome ? 'text-slate-900' : 'text-gray-900'}`}>MoodTrip.ai</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink href="/explore" active={pathname === '/explore'} isHome={isHome}>Explore</NavLink>
                    <NavLink href="/explore-map" active={pathname === '/explore-map'} isHome={isHome}>Map</NavLink>
                    <NavLink href="/dashboard" active={pathname === '/dashboard'} isHome={isHome}>Dashboard</NavLink>
                    <NavLink href="/about" active={pathname === '/about'} isHome={isHome}>About</NavLink>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/messages" className="relative group">
                                <div className={`p-2 rounded-full transition-colors ${isHome ? 'text-slate-600 hover:bg-white/20 hover:text-indigo-600' : 'text-gray-600 hover:bg-slate-100'}`}>
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                </div>
                            </Link>

                            <span className={`text-sm font-medium ${isHome ? 'text-slate-700' : 'text-gray-700'}`}>
                                Hi, {user.name.split(' ')[0]}
                            </span>
                            <Button
                                onClick={signOut}
                                variant="ghost"
                                size="sm"
                                className={isHome ? "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600" : "text-gray-600"}
                            >
                                <LogOut className="w-4 h-4" />
                            </Button>
                            <div className="relative group/profile w-10 h-10">
                                <Link href="/profile" className="block w-full h-full">
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-indigo-50 cursor-pointer hover:ring-indigo-200 transition-all text-slate-900">
                                        <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                </Link>

                                {/* Dropdown Menu - Wrapped to fix hover gap */}
                                <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover/profile:block z-50">
                                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        <div className="p-3 border-b border-slate-50">
                                            <p className="font-bold text-slate-800 text-sm truncate">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">Traveler</p>
                                        </div>
                                        <div className="p-1">
                                            <Link href={`/profile/${user.name.toLowerCase().replace(' ', '_')}`} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                                <User className="w-4 h-4" /> View Profile
                                            </Link>
                                            <Link href="/profile/edit" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                                <div className="w-4 h-4 flex items-center justify-center text-xs">✏️</div> Edit Profile
                                            </Link>
                                            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                                <Compass className="w-4 h-4" /> My Trips
                                            </Link>
                                        </div>
                                        <div className="p-1 border-t border-slate-50">
                                            <button
                                                onClick={signOut}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={signIn}
                                className={`text-sm font-medium transition-colors ${isHome ? 'text-slate-600 hover:text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                Sign In
                            </button>
                            <Link href="/complete-profile">
                                <Button className={`rounded-full px-6 shadow-md ${isHome ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, active, children, isHome }: { href: string, active: boolean, children: React.ReactNode, isHome: boolean }) {
    return (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors relative py-1
                ${active
                    ? (isHome ? 'text-indigo-600 font-bold' : 'text-blue-600')
                    : (isHome ? 'text-slate-500 hover:text-indigo-600' : 'text-gray-500 hover:text-gray-900')
                }
            `}
        >
            {children}
            {active && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${isHome ? 'bg-indigo-600' : 'bg-blue-600'}`} />
            )}
        </Link>
    )
}
