'use client'
import { User } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type SettingsPanelProps = {
  user: User
}

export default function SettingsPanel({ user }: SettingsPanelProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClientComponentClient()

  const handlePasswordReset = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        user.email!,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      )
      if (error) throw error
      setMessage('Password reset email sent!')
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Security</h3>
          <div className="mt-4">
            <button
              onClick={handlePasswordReset}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-4 p-4 rounded-md bg-blue-50 text-blue-700">
            {message}
          </div>
        )}

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
          <p className="mt-1 text-sm text-gray-500">
            Once you delete your account, it cannot be recovered.
          </p>
          <button
            className="mt-4 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
            onClick={() => {
              // Implement account deletion logic
              if (window.confirm('Are you sure you want to delete your account?')) {
                // Handle account deletion
              }
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
