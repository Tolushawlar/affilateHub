"use client"
import Link from "next/link";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";


const Navbar = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isSignedIn } = useUser();
    const { signOut } = useClerk();

    // Handle logout using Clerk
    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white shadow-sm fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold text-teal-600">
                                AffiliateHub
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-800 hover:text-teal-600"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Desktop menu */}
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            <Link href="/blog" className="text-gray-800 hover:text-teal-600 px-3 py-2">
                                Blog
                            </Link>
                            {isSignedIn ? (
                                <>
                                    <Link href="/dashboard" className="text-gray-800 hover:text-teal-600 px-3 py-2">
                                        Dashboard
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="text-gray-800 hover:text-teal-600 px-3 py-2"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-800 hover:text-teal-600 px-3 py-2">
                                        Login
                                    </Link>
                                    <Link href="/signup" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/blog" className="block px-3 py-2 text-gray-800 hover:text-teal-600">
                                Blog
                            </Link>
                            {isSignedIn ? (
                                <>
                                    <Link href="/dashboard" className="block px-3 py-2 text-gray-800 hover:text-teal-600">
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2 text-gray-800 hover:text-teal-600"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="block px-3 py-2 text-gray-800 hover:text-teal-600">
                                        Login
                                    </Link>
                                    <Link href="/signup" className="block px-3 py-2 text-gray-800 hover:text-teal-600">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
};

export default Navbar;
