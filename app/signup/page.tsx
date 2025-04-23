import SignUpForm from '../../components/SignUpForm'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-gray-600">
            Join us today and start your journey
          </p>
        </div>

        <SignUpForm />

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
