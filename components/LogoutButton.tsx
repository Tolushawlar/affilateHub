'use client'
import { supabase } from '../utils/supabase'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-md bg-red-600 px-4 py-2 text-white"
      aria-label="Sign out"
    >
      Sign Out
    </button>
  )
}
