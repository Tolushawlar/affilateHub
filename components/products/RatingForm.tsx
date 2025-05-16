// app/products/[id]/components/RatingForm.tsx (Client Component)
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

interface RatingFormProps {
    productId: string;
}

export default function RatingForm({ productId }: RatingFormProps) {
    const { user } = useUser();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [showRatingForm, setShowRatingForm] = useState(false);

    const handleRatingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Your rating submission logic
        try {
            const response = await fetch('/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: productId,
                    userId: user?.id,
                    rating,
                    comment
                }),
            });

            if (response.ok) {
                setShowRatingForm(false);
                setRating(0);
                setComment("");
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    return (
        <div className="mt-4">
            {!showRatingForm ? (
                <button
                    onClick={() => setShowRatingForm(true)}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
                >
                    Write a Review
                </button>
            ) : (
                <form onSubmit={handleRatingSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                        <div className="flex gap-2 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`text-2xl ${
                                        star <= rating ? 'text-teal-400' : 'text-gray-300'
                                    }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            rows={4}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-blue-teal-700"
                        >
                            Submit Review
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowRatingForm(false)}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
