'use client'
import { User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type ActivityLogProps = {
  user: User
}

export default function ActivityLog({ user }: ActivityLogProps) {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadActivities() {
      try {
        const { data, error } = await supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10)

        if (error) throw error
        setActivities(data || [])
      } catch (error) {
        console.error('Error loading activities:', error)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [user.id, supabase])

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="border-b pb-4 last:border-b-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.type === 'success' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
