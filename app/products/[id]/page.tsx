// app/products/[id]/page.tsx
import { notFound } from 'next/navigation'
import { Product } from "../../../types/product"
import RatingForm from '../../../components/products/RatingForm'

interface SingleProductPageProps {
    params: {
        id: string
    }
}

async function getProduct(id: string): Promise<Product | null> {
    // Dummy product data for development
    const product: Product = {
        id: id,
        name: "Sample Product",
        description: "This is a sample product description. It includes detailed information about the product features and benefits. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://picsum.photos/800/600",
        category: "Software",
        rating: 4.5,
        plan: "Premium",
        affiliateLink: "https://example.com",
        price: 2000,
        commission: 10,
        isLatest: false,
        isFeatured: false
    }
    return product
}

export default async function SingleProductPage({ params }: SingleProductPageProps) {
    const product = await getProduct(params.id)

    if (!product) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="flex my-20 text-gray-600" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="hover:text-teal-600">Home</a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <span className="mx-2">/</span>
                            <a href={`/categories/${product.category}`} className="hover:text-teal-600">{product.category}</a>                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <span className="mx-2">/</span>
                            <span className="text-gray-400">{product.name}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex md:space-x-8 justify-between">
                    {/* Product Image */}
                    <div className="md:flex-shrink-0 md:w-1/2 order-2">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="p-8 md:w-1/2 order-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-teal-600">
                                {product.name}
                            </h1>
                            <a
                                href={product.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
                            >
                                Visit Site
                                <svg
                                    className="w-4 h-4 ml-2"
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

                        <div className="flex items-center space-x-4 mb-6">
                            <span className="bg-black text-white text-sm px-4 py-1 rounded-full">
                                {product.category}
                            </span>
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1">{product.rating}</span>
                            </div>
                            <span className="bg-white/90 px-3 py-1 rounded-full text-sm">
                                {product.plan}
                            </span>
                        </div>

                        <div className="prose max-w-none">
                            <p className="text-gray-600">
                                {product.description}
                            </p>
                        </div>
                        <RatingForm productId={product.id} />
                    </div>
                </div>
            </div>


            <div className="mt-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Key Features Section */}
                        <details className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <summary className="px-8 py-4 cursor-pointer flex items-center text-xl font-semibold hover:bg-gray-50">
                                <span>⚙️ Key Features</span>
                            </summary>
                            <div className="px-8 py-6 border-t">
                                <ul className="list-disc list-inside space-y-3 text-gray-600">
                                    <li>Advanced AI-powered automation capabilities</li>
                                    <li>Seamless integration with existing workflows</li>
                                    <li>Real-time analytics and reporting dashboard</li>
                                    <li>Enterprise-grade security and compliance</li>
                                    <li>Customizable templates and workflows</li>
                                </ul>
                            </div>
                        </details>

                        {/* Use Cases Section */}
                        <details className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <summary className="px-8 py-4 cursor-pointer flex items-center text-xl font-semibold hover:bg-gray-50">
                                <span>💡 Use Cases & Applications</span>
                            </summary>
                            <div className="px-8 py-6 border-t">
                                <ul className="list-disc list-inside space-y-3 text-gray-600">
                                    <li>Business process automation</li>
                                    <li>Data analysis and visualization</li>
                                    <li>Project management and collaboration</li>
                                    <li>Customer relationship management</li>
                                    <li>Resource planning and optimization</li>
                                </ul>
                            </div>
                        </details>

                        {/* Target Audience Section */}
                        <details className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <summary className="px-8 py-4 cursor-pointer flex items-center text-xl font-semibold hover:bg-gray-50">
                                <span>🙋‍♂️ Who is it for?</span>
                            </summary>
                            <div className="px-8 py-6 border-t">
                                <ul className="list-disc list-inside space-y-3 text-gray-600">
                                    <li>Enterprise organizations</li>
                                    <li>Small and medium-sized businesses</li>
                                    <li>IT professionals and developers</li>
                                    <li>Project managers and team leaders</li>
                                    <li>Business analysts and consultants</li>
                                </ul>
                            </div>
                        </details>

                        {/* Support Section */}
                        <details className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <summary className="px-8 py-4 cursor-pointer flex items-center text-xl font-semibold hover:bg-gray-50">
                                <span>ℹ️ Find More & Support</span>
                            </summary>
                            <div className="px-8 py-6 border-t">
                                <div className="space-y-4 text-gray-600">
                                    <p>For additional information and support, you can:</p>
                                    <ul className="list-disc list-inside space-y-3">
                                        <li>Visit our comprehensive documentation portal</li>
                                        <li>Join our active community forum</li>
                                        <li>Contact our 24/7 technical support team</li>
                                        <li>Schedule a demo with our product specialists</li>
                                        <li>Subscribe to our newsletter for updates</li>
                                    </ul>
                                </div>
                            </div>
                        </details>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Featured Products */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <h3 className="px-6 py-4 text-xl font-semibold border-b bg-gray-50">Featured Program</h3>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition">
                                    <img src="https://picsum.photos/100/100" alt="Product" className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex items-center justify-between flex-1">
                                        <div>
                                            <h4 className="font-medium text-teal-600">Enterprise Suite</h4>
                                            <p className="text-sm text-gray-600">Complete business solution</p>
                                        </div>
                                        <a href="#" className="text-teal-600 hover:text-teal-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition">
                                    <img src="https://picsum.photos/100/100" alt="Product" className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex items-center justify-between flex-1">
                                        <div>
                                            <h4 className="font-medium text-teal-600">Analytics Pro</h4>
                                            <p className="text-sm text-gray-600">Advanced data insights</p>
                                        </div>
                                        <a href="#" className="text-teal-600 hover:text-teal-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Similar Products */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <h3 className="px-6 py-4 text-xl font-semibold border-b bg-gray-50">Similar Programs</h3>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition">
                                    <img src="https://picsum.photos/100/100" alt="Product" className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex items-center justify-between flex-1">
                                        <div>
                                            <h4 className="font-medium text-teal-600">Cloud Manager</h4>
                                            <p className="text-sm text-gray-600">Cloud infrastructure tool</p>
                                        </div>
                                        <a href="#" className="text-teal-600 hover:text-teal-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition">
                                    <img src="https://picsum.photos/100/100" alt="Product" className="w-16 h-16 rounded-lg object-cover" />
                                    <div className="flex items-center justify-between flex-1">
                                        <div>
                                            <h4 className="font-medium text-teal-600">DevOps Suite</h4>
                                            <p className="text-sm text-gray-600">Development workflow</p>
                                        </div>
                                        <a href="#" className="text-teal-600 hover:text-teal-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Categories */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <h3 className="px-6 py-4 text-xl font-semibold border-b bg-gray-50">Top Categories</h3>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer">Development</span>
                                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer">Analytics</span>
                                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer">Security</span>
                                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer">Cloud</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        </div>
    )
}

// For static rendering with dynamic params
export async function generateStaticParams() {
    // Dummy product IDs for development
    const products = [
        { id: '1' },
        { id: '2' },
        { id: '3' }
    ]

    return products.map((product) => ({
        id: product.id.toString(),
    }))
}
