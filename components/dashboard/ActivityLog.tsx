'use client'
import { User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

type ActivityLogProps = {
  user: User
}

interface ToolActivity {
  id: string
  tool_id: string
  tool_name: string
  rating: number
  comment: string
  created_at: string
  user_id: string
}

// Dummy data with multiple entries per tool
const dummyActivities = {
  "Tool 1": [
    {
      id: "1",
      tool_id: "t1",
      tool_name: "Tool 1",
      rating: 4,
      comment: "Great tool! Really helped improve my workflow.",
      created_at: new Date().toISOString(),
      user_id: "dummy_user1"
    },
    {
      id: "1a",
      tool_id: "t1",
      tool_name: "Tool 1",
      rating: 5,
      comment: "Exceptional performance and easy to use interface.",
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      user_id: "dummy_user2"
    }
  ],
  "Tool 2": [
    {
      id: "2",
      tool_id: "t2",
      tool_name: "Tool 2",
      rating: 5,
      comment: "Excellent features and great documentation!",
      created_at: new Date().toISOString(),
      user_id: "dummy_user3"
    },
    {
      id: "2a",
      tool_id: "t2",
      tool_name: "Tool 2",
      rating: 4,
      comment: "Very useful for daily tasks, but could use some minor improvements.",
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      user_id: "dummy_user4"
    }
  ],
  "Tool 3": [
    {
      id: "3",
      tool_id: "t3",
      tool_name: "Tool 3",
      rating: 3,
      comment: "Good but could be better in terms of performance",
      created_at: new Date().toISOString(),
      user_id: "dummy_user5"
    },
    {
      id: "3a",
      tool_id: "t3",
      tool_name: "Tool 3",
      rating: 4,
      comment: "Recent updates have significantly improved functionality",
      created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      user_id: "dummy_user6"
    }
  ],
  "Tool 4": [
    {
      id: "4",
      tool_id: "t4",
      tool_name: "Tool 4",
      rating: 5,
      comment: "Amazing functionality and intuitive design",
      created_at: new Date().toISOString(),
      user_id: "dummy_user7"
    },
    {
      id: "4a",
      tool_id: "t4",
      tool_name: "Tool 4",
      rating: 5,
      comment: "Best in class tool, highly recommended!",
      created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      user_id: "dummy_user8"
    }
  ],
  "Tool 5": [
    {
      id: "5",
      tool_id: "t5",
      tool_name: "Tool 5",
      rating: 4,
      comment: "Very useful tool with great support",
      created_at: new Date().toISOString(),
      user_id: "dummy_user9"
    },
    {
      id: "5a",
      tool_id: "t5",
      tool_name: "Tool 5",
      rating: 3,
      comment: "Good features but needs better documentation",
      created_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      user_id: "dummy_user10"
    }
  ]
}

export default function ActivityLog({ user }: ActivityLogProps) {
  const [activities, setActivities] = useState<{ [key: string]: ToolActivity[] }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadActivities() {
      setActivities(dummyActivities)
      setLoading(false)
    }

    loadActivities()
  }, [])

  if (loading) {
    return <div className="p-4 flex justify-center">
      <div className="animate-pulse text-gray-500">Loading...</div>
    </div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Tool Ratings & Comments</h2>

        {Object.keys(activities).length === 0 ? (
          <p className="text-gray-500 text-center py-8">No rating activities yet</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(activities).map(([toolName, toolActivities]) => (
              <div key={toolName} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
                  {toolName}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({toolActivities.length} reviews)
                  </span>
                </h3>
                <div className="space-y-4">
                  {toolActivities.map((activity, index, array) => (
                    <div
                      key={activity.id}
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Rating: {activity.rating}/5
                            </span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < activity.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(activity.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {activity.comment && (
                          <p className="text-sm text-gray-700 italic">
                            "{activity.comment}"
                          </p>
                        )}
                      </div>
                      {/* Displaying other objects */}
                      {array
                        .filter((otherActivity) => otherActivity.id !== activity.id)
                        .map((otherActivity) => (
                          <div
                            key={otherActivity.id}
                            className="mt-2 p-2 bg-gray-100 rounded-md text-xs text-gray-600"
                          >
                            Other review: Rating - {otherActivity.rating}, Comment - "{otherActivity.comment}"
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}