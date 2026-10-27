"use client";

import { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
    id: string;
    rating: number;
    review_text: string;
    helpful_count: number;
    is_verified_trip: boolean;
    created_at: string;
    profiles: {
        username: string;
        avatar_url: string;
        full_name: string;
    };
}

interface ReviewSectionProps {
    destinationId: string;
    entityType: 'destination' | 'hotel' | 'restaurant';
}

export function ReviewSection({ destinationId, entityType }: ReviewSectionProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, [destinationId]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/reviews?${entityType}_id=${destinationId}`);
            const json = await res.json();
            setReviews(json.data || []);
        } catch (err) {
            console.error("Failed to load reviews:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Mock user_id - In real app get from Auth
            const userId = '00000000-0000-0000-0000-000000000000';

            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    [`${entityType}_id`]: destinationId,
                    rating,
                    review_text: reviewText,
                    is_verified_trip: true
                })
            });

            if (res.ok) {
                setShowModal(false);
                setReviewText('');
                fetchReviews();
            }
        } catch (err) {
            console.error("Submit failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-indigo-500" /> Community Reviews
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">Hear what fellow explorers have to say.</p>
                </div>
                <Button
                    onClick={() => setShowModal(true)}
                    className="rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200"
                >
                    Write a Review
                </Button>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map(i => <div key={i} className="h-32 bg-white rounded-3xl animate-pulse border border-slate-100" />)}
                </div>
            ) : reviews.length > 0 ? (
                <div className="grid gap-6">
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm">
                                        <img src={review.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.profiles?.username}`} alt="Avatar" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-slate-900 truncate max-w-[150px]">{review.profiles?.full_name || review.profiles?.username}</p>
                                            {review.is_verified_trip && (
                                                <span className="flex items-center gap-0.5 text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-bold">
                                                    <CheckCircle className="w-2.5 h-2.5" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-0.5 text-amber-400 mt-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400' : 'text-slate-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                {review.review_text}
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful_count})
                                </button>
                                <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                    Report
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="py-12 bg-white rounded-[40px] border border-dashed border-slate-200 text-center">
                    <p className="text-slate-400 font-medium">No reviews yet. Be the first to share your experience!</p>
                </div>
            )}

            {/* Review Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-8"
                        >
                            <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Share Your Experience</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-center">Your Rating</label>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setRating(i)}
                                                className="p-1 hover:scale-110 transition-transform"
                                            >
                                                <Star className={`w-8 h-8 ${i <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Your Review</label>
                                    <textarea
                                        required
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Tell us about the vibes, the food, and your favorite moments..."
                                        className="w-full h-32 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 rounded-2xl h-12 font-bold"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 rounded-2xl h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                                    >
                                        {isSubmitting ? 'Posting...' : 'Post Review'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
