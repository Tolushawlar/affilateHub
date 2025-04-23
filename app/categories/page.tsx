"use client";
import React from 'react'

function Page() {
    const categories = [
        {
            name: '💰 Affiliate Marketing',
            description: 'Promote digital products and earn commissions on every sale',
            items: [
                { name: 'Amazon Associates', description: 'Earn commissions promoting Amazon products', image: "https://picsum.photos/800/600", },
                { name: 'ClickBank', description: 'Marketplace for digital product affiliates', image: "https://picsum.photos/800/600", },
                { name: 'ShareASale', description: 'Network with thousands of merchant programs', image: "https://picsum.photos/800/600", },
                { name: 'Commission Junction', description: 'Large affiliate network for online retailers', image: "https://picsum.photos/800/600", },
                { name: 'Impact', description: 'Partnership automation platform', image: "https://picsum.photos/800/600", },
                { name: 'Rakuten', description: 'Global affiliate marketing network', image: "https://picsum.photos/800/600", }
            ]
        },
        {
            name: '🎯 Digital Products',
            description: 'High-converting digital downloads, courses and memberships',
            items: [
                { name: 'Online Courses', description: 'Learn new skills through video courses', image: "https://picsum.photos/800/600", },
                { name: 'Ebooks', description: 'Digital books and guides', image: "https://picsum.photos/800/600", },
                { name: 'Software', description: 'Applications and digital tools', image: "https://picsum.photos/800/600", },
                { name: 'Digital Art', description: 'Artwork and digital designs', image: "https://picsum.photos/800/600", },
                { name: 'Templates', description: 'Ready-to-use design templates', image: "https://picsum.photos/800/600", },
                { name: 'Plugins', description: 'Software extensions and add-ons', image: "https://picsum.photos/800/600", }
            ]
        },
        {
            name: '🤝 Partner Programs',
            description: 'Recurring commissions from SaaS and subscription services',
            items: [
                { name: 'Web Hosting', description: 'Website hosting services', image: "https://picsum.photos/800/600", },
                { name: 'Email Marketing', description: 'Email automation platforms', image: "https://picsum.photos/800/600", },
                { name: 'SEO Tools', description: 'Search engine optimization software', image: "https://picsum.photos/800/600", },
                { name: 'Design Tools', description: 'Graphic and web design applications', image: "https://picsum.photos/800/600", },
                { name: 'Analytics', description: 'Data tracking and reporting tools', image: "https://picsum.photos/800/600", },
                { name: 'CRM Software', description: 'Customer relationship management systems', image: "https://picsum.photos/800/600", }
            ]
        }
    ]

    return (
        <div className="py-20 px-24">
            <div className="flex items-center gap-4 my-16">
                <img src="https://picsum.photos/100/100" alt="AI Categories" className="rounded-lg" />
                <h1 className="text-3xl font-bold">All AI tools categories<br/>
                    <span className="text-lg font-normal text-gray-600">Browse the list of a 121 AI categories within our AI tools directory. Find an AI tool for every workflow you need to perform.</span>
                </h1>
            </div>

            <div className="mb-6">
                <input
                    type="search"
                    placeholder="Search categories..."
                    className="w-full p-3 border rounded-lg"
                />
            </div>

            <div className="flex flex-col space-y-6">
                {categories.map((category) => (
                    <div key={category.name} className="border rounded-lg p-6">
                        <div className="flex items-center justify-left mb-2">
                            <h2 className="text-2xl font-semibold">{category.name}</h2>
                            <button
                                onClick={() => window.location.href = `/categories/${category.name}`}
                                className="p-2 rounded-full hover:bg-gray-100"
                                aria-label={`View all ${category.name.split(' ')[1]}`}
                            >
                                <svg
                                    className="w-8 h-8 text-teal-600 hover:text-teal-600 transition-colors"
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
                            </button>                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {category.items.map((item) => (
                                <div key={item.name} className=" rounded-lg p-4 flex gap-4 hover:shadow-lg transition-shadow">
                                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-lg text-teal-600">{item.name}</h3>
                                        <p className="text-gray-600 mt-1">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
