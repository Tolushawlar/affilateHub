'use client'
import Link from 'next/link'
import LoginForm from '../../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <LoginForm />

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/signup" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
          <Link 
            href="/forgot-password" 
            className="font-medium text-blue-600 hover:text-blue-500 block mt-2"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}
