'use client'
import { useState } from 'react'
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()
    const { isLoaded, signUp } = useSignUp()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setMessage(null)
        setLoading(true)

        if (!isLoaded) {
            return
        }

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match")
            setLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters")
            setLoading(false)
            return
        }

        try {
            const result = await signUp.create({
                username: formData.fullName.split(' ')[0],
                emailAddress: formData.email,
                password: formData.password
            })

            if (result.status === "complete") {
                setMessage('Registration successful! Please check your email to verify your account.')

                
                // Optional: Redirect to login page after a delay
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
            } else {
                // Send email verification link
                await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
                setMessage('Please check your email for a verification code')
            }

        } catch (error: any) {
            console.error('Signup error:', error)
            setError(error.message || "An error occurred during signup")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSignUp} className="space-y-4 mt-8">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Full name"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Email address"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Password"
                    minLength={6}
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Confirm password"
                    minLength={6}
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm" role="alert">
                    {error}
                </div>
            )}

            {message && (
                <div className="text-green-500 text-sm" role="alert">
                    {message}
                </div>
            )}

            <button
                type="submit"
                disabled={loading || !isLoaded}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Creating account...' : 'Sign Up'}
            </button>
        </form>
    )
}
