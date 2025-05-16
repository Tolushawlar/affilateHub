
"use client"
import React from 'react'
import Image from 'next/image'

interface BlogPost {
    title: string;
    date: string;
    author: {
        name: string;
        image: string;
        bio: string;
    };
    content: string;
    categories: string[];
    tags: string[];
    readingTime: string;
    excerpt: string;
    featuredImage: string;
    affiliateLinks: {
        url: string;
        title: string;
        description: string;
        price: string;
        image: string;
    }[];
}

const dummyPost: BlogPost = {
    title: "Getting Started with Web Development in 2024",
    date: "January 15, 2024",
    author: {
        name: "Sarah Johnson",
        image: "https://picsum.photos/200/200",
        bio: "Senior Frontend Developer with 8 years of experience in React and TypeScript"
    },
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    categories: ["Web Development", "Programming", "Frontend"],
    tags: ["react", "typescript", "webdev", "coding", "frontend"],
    readingTime: "8 min read",
    excerpt: "A comprehensive guide to starting your journey in web development with modern tools and frameworks.",
    featuredImage: "https://picsum.photos/1200/800",
    affiliateLinks: [
        {
            url: "https://example.com/course1",
            title: "Complete Web Development Bootcamp",
            description: "Learn web development from scratch with this comprehensive course",
            price: "$99.99",
            image: "https://picsum.photos/400/300"
        },
        {
            url: "https://example.com/book1",
            title: "React & TypeScript Handbook",
            description: "Master React and TypeScript with practical examples",
            price: "$45.00",
            image: "https://picsum.photos/400/300?random=2"
        },
        {
            url: "https://example.com/tool1",
            title: "VS Code Pro Edition",
            description: "Professional code editor for web developers",
            price: "$79.99",
            image: "https://picsum.photos/400/300?random=3"
        }
    ]
}

function BlogContentPage({ post = dummyPost }: { post?: BlogPost }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <article className="max-w-4xl mx-auto mt-28 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-96">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300"
                    />
                </div>

                <div className="p-8">
                    <div className="flex items-center mb-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <Image
                                src={post.author.image}
                                alt={post.author.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="ml-4">
                            <p className="text-teal-600 font-medium text-lg">{post.author.name}</p>
                            <p className="text-gray-500">{post.date}</p>
                            <p className="text-gray-600 text-sm">{post.author.bio}</p>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-teal-500">{post.readingTime}</span>
                        <div className="flex gap-2">
                            {post.categories.map((category, idx) => (
                                <span key={idx} className="bg-teal-50 text-teal-600 px-3 py-1 rounded-full">
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none mb-12">
                        {post.content}
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Resources</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {post.affiliateLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    className="block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={link.image}
                                            alt={link.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 mb-2">{link.title}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{link.description}</p>
                                        <p className="text-teal-600 font-medium">{link.price}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-8 pt-6">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default BlogContentPage
