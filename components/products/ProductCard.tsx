import Link from "next/link"
import { Product } from "../../types/product"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
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

                <div className=" mt-6 flex items-center justify-between">
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
            </div>
        </div>
    )
}

