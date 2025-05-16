import Link from "next/link"
import { Product } from "../../types/product"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { isSignedIn, user } = useUser()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [showRatingForm, setShowRatingForm] = useState(false)

    const handleRatingSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Add API call to save rating and comment
        try {
            const response = await fetch('/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    userId: user?.id,
                    rating,
                    comment
                }),
            })
            
            if (response.ok) {
                setShowRatingForm(false)
                setRating(0)
                setComment("")
            }
        } catch (error) {
            console.error('Error submitting rating:', error)
        }
    }

    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link href={`/products/${product.id}`}>
                <div className="aspect-w-3 aspect-h-2 relative cursor-pointer">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-teal-600">
                        {product.name}
                    </h3>
                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                        <svg
                            className="w-5 h-5 text-gray-600 hover:text-teal-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </a>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center justify-between space-x-2">
                        <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                            {product.category}
                        </span>
                        <>
                            <svg
                                className="w-4 h-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {product.rating}
                        </>
                    </div>
                    <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">

                        <span className="ml-1 text-xs font-medium">
                            {product.plan}
                        </span>
                    </div>
                </div>

                {isSignedIn && (
                    <div className="mt-4">
                        <button 
                            onClick={() => setShowRatingForm(!showRatingForm)}
                            className="text-sm text-teal-600 hover:text-teal-800"
                        >
                            {showRatingForm ? 'Cancel Rating' : 'Rate This Tool'}
                        </button>

                        {showRatingForm && (
                            <form onSubmit={handleRatingSubmit} className="mt-2 space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-600">Rating</label>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`${
                                                    rating >= star ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                            >
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Comment</label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                        rows={3}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                    Submit Review
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

