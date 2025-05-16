'use client'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'
import AccountOverview from './AccountOverview'
import ActivityLog from './ActivityLog'
import SettingsPanel from './SettingsPanel'
import SubmitTools from './SubmitTools'

type DashboardContentProps = {
  user: User
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const [currentView, setCurrentView] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <div className="flex">
        <div className="fixed">
          <DashboardSidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </div>

        <main className="flex-1 p-6 ml-64 overflow-y-auto">
          {currentView === 'overview' && <AccountOverview user={user} />}
          {currentView === 'activity' && <ActivityLog user={user} />}
          {currentView === 'tools' && (
            <SubmitTools
              onSubmit={(formData) => {
                // Handle form submission logic here
                console.log('Tool submitted:', formData);
                // You can also call an API or update state
              }}
            />
          )}
          {currentView === 'settings' && <SettingsPanel user={user} />}
        </main>
      </div>
    </div>
  )
}
