type DashboardSidebarProps = {
  currentView: string
  setCurrentView: (view: string) => void
}

export default function DashboardSidebar({ 
  currentView, 
  setCurrentView 
}: DashboardSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Account Overview', icon: '📊' },
    { id: 'activity', label: 'Activity Log', icon: '📝' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside className="w-64 bg-white shadow-sm h-[calc(100vh-64px)]">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md mb-1
              ${currentView === item.id
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
