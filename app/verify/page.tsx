'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function VerifyPage() {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token')
      
      if (!token) {
        setVerificationStatus('error')
        setMessage('No verification token provided')
        return
      }

      try {
        // Call the verification function
        const { data, error } = await supabase
          .rpc('verify_signup', { verification_token: token })

        if (error) throw error

        if (data.success) {
          setVerificationStatus('success')
          setMessage(data.message)
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        } else {
          setVerificationStatus('error')
          setMessage(data.message)
        }

      } catch (error: any) {
        setVerificationStatus('error')
        setMessage(error.message)
      }
    }

    verifyToken()
  }, [searchParams, router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Email Verification</h1>
          
          {verificationStatus === 'pending' && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="mt-4">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <p className="text-green-600">{message}</p>
              <p className="mt-2 text-gray-600">Redirecting to login...</p>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="mt-4">
              <div className="text-red-500 text-6xl mb-4">✗</div>
              <p className="text-red-600">{message}</p>
              <button
                onClick={() => router.push('/signup')}
                className="mt-4 text-blue-600 hover:text-blue-500"
              >
                Back to Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
