"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BlogPost {
    id: number;
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

const dummyBlogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        date: "2024-01-15",
        author: {
            name: "John Doe", 
            image: "https://picsum.photos/id/1/200/200",
            bio: "Senior Frontend Developer"
        },
        content: "Lorem ipsum dolor sit amet...",
        categories: ["React", "JavaScript"],
        tags: ["hooks", "frontend", "web development"],
        readingTime: "5 min read",
        excerpt: "Learn how to use React Hooks effectively in your applications...", 
        featuredImage: "https://picsum.photos/id/2/800/400",
        affiliateLinks: [
            {
                url: "https://example.com/react-course",
                title: "Complete React Developer Course", 
                description: "Master React with this comprehensive course including Hooks, Redux and more",
                price: "$89.99",
                image: "https://picsum.photos/id/3/400/300"
            },
            {
                url: "https://example.com/javascript-book",
                title: "JavaScript: The Definitive Guide",
                description: "The ultimate resource for JavaScript developers",
                price: "$45.99",
                image: "https://picsum.photos/id/4/400/300"
            }
        ]
    },
    {
        id: 2,
        title: "Best Development Tools for 2024",
        date: "2024-01-20", 
        author: {
            name: "Jane Smith",
            image: "https://picsum.photos/id/5/200/200",
            bio: "DevOps Engineer"
        },
        content: "Discover the most essential development tools...",
        categories: ["Tools", "Development"],
        tags: ["productivity", "coding", "software"],
        readingTime: "8 min read",
        excerpt: "A curated list of must-have development tools to boost your productivity...",
        featuredImage: "https://picsum.photos/id/6/800/400",
        affiliateLinks: [
            {
                url: "https://example.com/vscode",
                title: "VS Code Premium Extensions Pack",
                description: "Collection of essential VS Code extensions for developers", 
                price: "$29.99",
                image: "https://picsum.photos/id/7/400/300"
            },
            {
                url: "https://example.com/github-pro",
                title: "GitHub Pro Subscription",
                description: "Advanced features for professional developers",
                price: "$7.99/month",
                image: "https://picsum.photos/id/8/400/300"
            },
            {
                url: "https://example.com/terminal",
                title: "Advanced Terminal Setup",
                description: "Professional terminal configuration package",
                price: "$19.99",
                image: "https://picsum.photos/id/9/400/300"
            }
        ]
    },
    {
        id: 3,
        title: "TypeScript Best Practices in 2024",
        date: "2024-01-25",
        author: {
            name: "Sarah Johnson",
            image: "https://picsum.photos/id/10/200/200",
            bio: "TypeScript Expert"
        },
        content: "Essential TypeScript patterns and practices...",
        categories: ["TypeScript", "JavaScript"],
        tags: ["types", "patterns", "best practices"],
        readingTime: "10 min read",
        excerpt: "Learn the most effective TypeScript patterns and practices for clean, maintainable code...",
        featuredImage: "https://picsum.photos/id/11/800/400",
        affiliateLinks: [
            {
                url: "https://example.com/typescript-course",
                title: "Advanced TypeScript Masterclass",
                description: "Deep dive into TypeScript's advanced features",
                price: "$79.99",
                image: "https://picsum.photos/id/12/400/300"
            }
        ]
    },
    {
        id: 4,
        title: "Building Microservices with Node.js",
        date: "2024-02-01",
        author: {
            name: "Mike Wilson",
            image: "https://picsum.photos/id/13/200/200",
            bio: "Backend Architect"
        },
        content: "Guide to building scalable microservices...",
        categories: ["Backend", "Architecture"],
        tags: ["microservices", "node.js", "scaling"],
        readingTime: "12 min read",
        excerpt: "Learn how to design and implement robust microservices architecture with Node.js...",
        featuredImage: "https://picsum.photos/id/14/800/400",
        affiliateLinks: [
            {
                url: "https://example.com/microservices-course",
                title: "Microservices Architecture Course",
                description: "Complete guide to building microservices",
                price: "$129.99",
                image: "https://picsum.photos/id/15/400/300"
            }
        ]
    },
    {
        id: 5,
        title: "CSS Grid Mastery",
        date: "2024-02-05",
        author: {
            name: "Emma Davis",
            image: "https://picsum.photos/id/16/200/200",
            bio: "UI/UX Designer"
        },
        content: "Advanced CSS Grid techniques...",
        categories: ["CSS", "Frontend"],
        tags: ["grid", "layout", "responsive"],
        readingTime: "6 min read",
        excerpt: "Master CSS Grid to create complex and responsive layouts with ease...",
        featuredImage: "https://picsum.photos/id/17/800/400",
        affiliateLinks: [
            {
                url: "https://example.com/css-course",
                title: "Advanced CSS Layouts",
                description: "Master modern CSS layout techniques",
                price: "$49.99",
                image: "https://picsum.photos/id/18/400/300"
            }
        ]
    },
    {
        id: 6,
        title: "Docker for Developers",
        date: "2024-02-10",
        author: {
            name: "Alex Chen",
            image: "https://picsum.photos/id/19/200/200",
            bio: "DevOps Specialist"
        },
        content: "Getting started with Docker...",
        categories: ["DevOps", "Tools"],
        tags: ["docker", "containers", "deployment"],
        readingTime: "9 min read",
        excerpt: "Learn how to use Docker effectively in your development workflow...",
        featuredImage: "https://picsum.photos/id/20/800/400",
        affiliateLinks: [
            {
                url: "https://example.com/docker-course",
                title: "Docker From Zero to Hero",
                description: "Complete Docker training for developers",
                price: "$69.99",
                image: "https://picsum.photos/id/21/400/300"
            }
        ]
    },
    {
        id: 7,
        title: "AI in Web Development",
        date: "2024-02-15",
        author: {
            name: "Rachel Kim",
            image: "https://picsum.photos/id/22/200/200",
            bio: "AI Engineer"
        },
        content: "Integrating AI in web applications...",
        categories: ["AI", "Web Development"],
        tags: ["artificial intelligence", "machine learning", "web"],
        readingTime: "15 min read",
        excerpt: "Discover how to leverage AI capabilities in modern web applications...",
        featuredImage: "https://picsum.photos/id/23/800/400",
        affiliateLinks: [
            {
                url: "https://example.com/ai-web-course",
                title: "AI for Web Developers",
                description: "Learn to integrate AI in your web apps",
                price: "$149.99",
                image: "https://picsum.photos/id/24/400/300"
            }
        ]
    }    
];

function BlogPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dummyBlogPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(dummyBlogPosts.length / postsPerPage);

    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-28">
                {currentPosts.map((post, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48">
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={post.author.image}
                                        alt={post.author.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="ml-4">
                                    <p className="text-teal-600 font-medium">{post.author.name}</p>
                                    <p className="text-gray-500 text-sm">{post.date}</p>
                                </div>
                            </div>
                            <h2 
                                onClick={() => router.push(`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}-${post.id}`)}                                className="text-xl font-bold text-gray-800 mb-2 hover:text-teal-600 transition-colors cursor-pointer"
                            >
                                {post.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-teal-500 text-sm">{post.readingTime}</span>
                                <div className="flex gap-2">
                                    {post.categories.map((category, idx) => (
                                        <span key={idx} className="bg-teal-50 text-teal-600 text-xs px-2 py-1 rounded">
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded ${
                            currentPage === i + 1
                                ? 'bg-teal-600 text-white'
                                : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default BlogPage
