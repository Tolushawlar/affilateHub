'use client'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'
import AccountOverview from './AccountOverview'
import ActivityLog from './ActivityLog'
import SettingsPanel from './SettingsPanel'

type DashboardContentProps = {
  user: User
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const [currentView, setCurrentView] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      
      <div className="flex">
        <DashboardSidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
        />
        
        <main className="flex-1 p-6">
          {currentView === 'overview' && <AccountOverview user={user} />}
          {currentView === 'activity' && <ActivityLog user={user} />}
          {currentView === 'settings' && <SettingsPanel user={user} />}
        </main>
      </div>
    </div>
  )
}
