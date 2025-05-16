
'use client'

import { useState } from 'react'
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

export default function VerifyEmail() {
    const [code, setCode] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { isLoaded, signUp } = useSignUp()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        if (!isLoaded) {
            return
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (completeSignUp.status === "complete") {
                // Redirect to login page after successful verification
                router.push('/login')
            } else {
                setError("Verification failed. Please try again.")
            }
        } catch (error: any) {
            console.error('Verification error:', error)
            setError(error.message || "An error occurred during verification")
        } finally {
            setLoading(false)
        }
    }

    // Add check to ensure the component only renders when signUp is loaded
    if (!isLoaded) {
        return null
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 relative top-20">
            <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Verification Code
                </label>
                <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Verification code"
                    placeholder="Enter verification code"
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm" role="alert">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading || !isLoaded}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Verifying...' : 'Verify Email'}
            </button>
        </form>
    )
}
