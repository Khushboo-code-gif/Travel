"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreVertical, Phone, Video, Info, Send, Image as ImageIcon, Smile, ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data for Chats
const MOCK_CHATS = [
    {
        id: "1",
        user: { name: "Ananya S.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", online: true },
        lastMessage: "Hey! I saw your request for Spiti. We'd love to have you!",
        time: "10:30 AM",
        unread: 2,
        status: "active"
    },
    {
        id: "2",
        user: { name: "Rohan K.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop", online: false },
        lastMessage: "Sounds good, let's meet at the hostel.",
        time: "Yesterday",
        unread: 0,
        status: "active"
    }
];

const MOCK_REQUESTS = [
    {
        id: "r1",
        user: { name: "Kabir Singh", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop" },
        trip: "Manali Trip",
        message: "Hi! I'm planning to go via Volvo bus. Can I join your group?",
        time: "2h ago"
    },
    {
        id: "r2",
        user: { name: "Meera R.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" },
        trip: "Kerala Backpacking",
        message: "Hey, I've been to Kerala twice! I can help with itinerary.",
        time: "5h ago"
    }
];

export default function MessagesPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'chats' | 'requests'>('chats');
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    // Derived state
    const selectedChat = MOCK_CHATS.find(c => c.id === selectedChatId);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-slate-900">Please Sign In</h1>
                    <p className="text-slate-600">Login to view your messages.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            <Navbar />

            <main className="max-w-6xl mx-auto pt-24 pb-10 px-4 h-screen flex flex-col">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex-1 flex border border-slate-100 mt-4">

                    {/* Sidebar / Chat List */}
                    <div className={`w-full md:w-96 border-r border-slate-100 flex flex-col bg-slate-50/50 ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>

                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    {user.name} <span className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                                </h1>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <MoreVertical className="w-5 h-5 text-slate-400" />
                                </Button>
                            </div>

                            {/* Tabs */}
                            <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
                                <button
                                    onClick={() => setActiveTab('chats')}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'chats' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Chats
                                </button>
                                <button
                                    onClick={() => setActiveTab('requests')}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all relative ${activeTab === 'requests' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Requests
                                    {MOCK_REQUESTS.length > 0 && <span className="absolute top-2 right-8 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                                />
                            </div>
                        </div>

                        {/* List Content */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {activeTab === 'chats' ? (
                                MOCK_CHATS.map(chat => (
                                    <div
                                        key={chat.id}
                                        onClick={() => setSelectedChatId(chat.id)}
                                        className={`p-3 rounded-xl cursor-pointer transition-all flex gap-3 group ${selectedChatId === chat.id ? 'bg-indigo-50' : 'hover:bg-slate-100'}`}
                                    >
                                        <div className="relative">
                                            <img src={chat.user.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                                            {chat.user.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className={`font-semibold text-sm truncate ${selectedChatId === chat.id ? 'text-indigo-900' : 'text-slate-900'}`}>{chat.user.name}</h3>
                                                <span className="text-[10px] text-slate-400">{chat.time}</span>
                                            </div>
                                            <p className={`text-xs truncate ${chat.unread > 0 ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                                                {chat.lastMessage}
                                            </p>
                                        </div>
                                        {chat.unread > 0 && (
                                            <div className="flex flex-col justify-center">
                                                <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm shadow-indigo-200">
                                                    {chat.unread}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                MOCK_REQUESTS.map(req => (
                                    <div key={req.id} className="p-4 bg-white border border-slate-100 rounded-xl mb-3 shadow-sm">
                                        <div className="flex gap-3 mb-3">
                                            <img src={req.user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                            <div>
                                                <h3 className="font-semibold text-sm text-slate-900">{req.user.name}</h3>
                                                <p className="text-xs text-slate-500">Wants to join <span className="text-indigo-600 font-medium">{req.trip}</span></p>
                                            </div>
                                            <span className="ml-auto text-[10px] text-slate-400">{req.time}</span>
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded-lg mb-3">
                                            <p className="text-xs text-slate-600 italic">"{req.message}"</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 h-8 text-xs">
                                                <Check className="w-3 h-3 mr-1" /> Accept
                                            </Button>
                                            <Button size="sm" variant="outline" className="flex-1 h-8 text-xs text-red-600 border-red-100 hover:bg-red-50">
                                                <X className="w-3 h-3 mr-1" /> Decline
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}

                            {activeTab === 'requests' && MOCK_REQUESTS.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-slate-500 text-sm">No new requests</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className={`flex-1 flex-col bg-white ${selectedChatId ? 'flex' : 'hidden md:flex'}`}>
                        {selectedChatId ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" size="icon" className="md:hidden -ml-2" onClick={() => setSelectedChatId(null)}>
                                            <ArrowLeft className="w-5 h-5" />
                                        </Button>
                                        <div className="relative">
                                            <img src={selectedChat?.user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                            {selectedChat?.user.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-slate-900">{selectedChat?.user.name}</h2>
                                            <p className="text-xs text-slate-500">{selectedChat?.user.online ? 'Active now' : 'Offline'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 text-slate-400">
                                        <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
                                        <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
                                        <Button variant="ghost" size="icon"><Info className="w-5 h-5" /></Button>
                                    </div>
                                </div>

                                {/* Chat Messages (Mock) */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                                    <div className="text-center text-xs text-slate-400 my-4">Today 9:41 AM</div>

                                    {/* Received */}
                                    <div className="flex gap-3 max-w-[80%]">
                                        <img src={selectedChat?.user.avatar} className="w-8 h-8 rounded-full object-cover self-end mb-1" alt="" />
                                        <div className="space-y-1">
                                            <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-bl-none shadow-sm text-sm text-slate-800">
                                                {selectedChat?.lastMessage}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sent */}
                                    <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
                                        <div className="space-y-1">
                                            <div className="bg-indigo-600 p-3 rounded-2xl rounded-br-none shadow-md shadow-indigo-100 text-sm text-white">
                                                That sounds awesome! I've been wanting to go there for ages. 🏔️
                                            </div>
                                            <div className="text-[10px] text-slate-400 text-right pr-1">Read 10:45 AM</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                                    <div className="bg-slate-50 rounded-full flex items-center p-2 pr-2 gap-2 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
                                        <Button variant="ghost" size="icon" className="text-slate-400 rounded-full hover:bg-slate-200 h-9 w-9">
                                            <Smile className="w-5 h-5" />
                                        </Button>
                                        <input
                                            type="text"
                                            placeholder="Message..."
                                            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
                                        />
                                        <Button variant="ghost" size="icon" className="text-slate-400 rounded-full hover:bg-slate-200 h-9 w-9">
                                            <ImageIcon className="w-5 h-5" />
                                        </Button>
                                        <Button size="icon" className="rounded-full bg-indigo-600 hover:bg-indigo-700 h-9 w-9 shadow-md shadow-indigo-200">
                                            <Send className="w-4 h-4 text-white ml-0.5" />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
                                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-10 h-10 text-indigo-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">Your Messages</h3>
                                <p className="max-w-xs text-sm">Send photos and private messages to your travel buddies.</p>
                                <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 rounded-full">
                                    Send Message
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
