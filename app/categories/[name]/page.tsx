"use client";
import React from 'react';
import { usePathname } from 'next/navigation';


interface CategoryItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface CategoryListProps {
    categoryItems?: CategoryItem[]; // Made optional with ?
    currentCategory?: string; // Made optional with ?
}

// Dummy data for testing
const dummyItems: CategoryItem[] = [
    {
        id: '1',
        name: 'Product 1',
        description: 'This is a description for product 1',
        price: 99.99,
        image: 'https://picsum.photos/400/300'
    },
    {
        id: '2',
        name: 'Product 2',
        description: 'This is a description for product 2',
        price: 149.99,
        image: 'https://picsum.photos/400/300'
    },
    {
        id: '3',
        name: 'Product 3',
        description: 'This is a description for product 3',
        price: 199.99,
        image: 'https://picsum.photos/400/300'
    },
    {
        id: '4',
        name: 'Product 4',
        description: 'This is a description for product 4',
        price: 299.99,
        image: 'https://picsum.photos/400/300'
    }
];

const CategoryList = async ({ categoryItems = dummyItems }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    // Get current category from URL path
    const getCurrentCategory = (pathname: string): string => {
        const pathParts = pathname.split('/');
        return decodeURIComponent(pathParts[pathParts.length - 1]);
    }

    const pathname = usePathname();
    const currentCategory = getCurrentCategory(pathname);

    const filteredItems = categoryItems?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="max-w-7xl mx-auto p-5">
            {/* Breadcrumb */}
            <nav className="flex mb-8 mt-20 text-gray-600" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="hover:text-teal-600">Home</a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <span className="mx-2">/</span>
                            <a href="/categories" className="hover:text-teal-600">Categories</a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <span className="mx-2">/</span>
                            <span className="text-gray-400">{currentCategory}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Category information section */}
            <div className="text-center mt-20 my-10">
                <h1 className="text-3xl font-bold">Best {currentCategory} AI Tools</h1>
                <p className="mt-2">Explore the top {currentCategory} list and compare them for use cases, features and pricing. You will find Platforms that provide personalized assistance through voice or text interaction using artificial intelligence algorithms. Discover {currentCategory} tools offering features like natural language processing, sentiment analysis, or task automation.</p>
            </div>
            {/* Search input */}
            <div className="flex justify-center mb-10">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-4/5 max-w-2xl px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Items grid section */}
            <div className="flex flex-col md:flex-row gap-8">
                <section className="md:w-2/3">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="flex border border-gray-200 rounded-lg p-4 mb-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-48 h-48 object-cover rounded"
                            />
                            <div className="ml-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">{item.name}</h3>
                                    <p className="text-gray-600 mt-2">{item.description}</p>
                                </div>
                                <span className="text-xl font-bold text-blue-800">${item.price}</span>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="md:w-1/3">
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                        <h2 className="text-xl font-bold mb-4">Featured Categories</h2>
                        <ul className="space-y-3">
                            <li className="flex items-center p-2 hover:bg-gray-50 rounded">
                                <span className="text-gray-700">AI Chatbots</span>
                                <span className="ml-auto text-gray-500">(24)</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-gray-50 rounded">
                                <span className="text-gray-700">Image Generation</span>
                                <span className="ml-auto text-gray-500">(18)</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-gray-50 rounded">
                                <span className="text-gray-700">Text Analysis</span>
                                <span className="ml-auto text-gray-500">(12)</span>
                            </li>
                        </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-4">Popular Tools</h2>
                        <ul className="space-y-3">
                            <li className="flex items-center p-2 hover:bg-gray-50 rounded">
                                <span className="text-gray-700">ChatGPT</span>
                                <span className="ml-auto text-gray-500">⭐ 4.9</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-gray-50 rounded">
                                <span className="text-gray-700">DALL-E</span>
                                <span className="ml-auto text-gray-500">⭐ 4.8</span>
                            </li>
                            <li className="flex items-center p-2 hover:bg-gray-50 rounded">
                                <span className="text-gray-700">Midjourney</span>
                                <span className="ml-auto text-gray-500">⭐ 4.7</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>        </div>
    );
};

export default CategoryList;
