'use client'
import { User } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

type DashboardHeaderProps = {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {user.email}
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
