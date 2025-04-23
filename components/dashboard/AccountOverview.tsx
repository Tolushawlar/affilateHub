'use client'
import { User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type AccountOverviewProps = {
  user: User
}

export default function AccountOverview({ user }: AccountOverviewProps) {
  const [accountDetails, setAccountDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadAccountDetails() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setAccountDetails(data)
      } catch (error) {
        console.error('Error loading account details:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAccountDetails()
  }, [user.id, supabase])

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Sign In</h3>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(user.last_sign_in_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
            <p className="mt-1 text-sm text-gray-900">
              {user.confirmed_at ? 'Verified' : 'Pending Verification'}
            </p>
          </div>

          {accountDetails && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {accountDetails.full_name || 'Not set'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {accountDetails.phone || 'Not set'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
