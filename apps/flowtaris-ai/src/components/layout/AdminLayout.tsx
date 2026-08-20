import { NavLink } from 'next/dist/client/components/link'
import Link from 'next/link'
import { Menu, Users, Layout, Settings, Activity, BarChart2, FileText, Award, ClipboardList, Folder, Calendar, Shield, MessageCircle } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Flowtaris Admin
          </h1>
          <nav className="space-y-1">
            <NavLink
              href="/admin/"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <Layout className="mr-3 h-4 w-4" />
              Dashboard
            </NavLink>
            
            <NavLink
              href="/admin/site-config"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <Settings className="mr-3 h-4 w-4" />
              Site Configuration
            </NavLink>
            
            <NavLink
              href="/admin/platforms"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <Calendar className="mr-3 h-4 w-4" />
              Platforms
            </NavLink>
            
            <NavLink
              href="/admin/capabilities"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <Award className="mr-3 h-4 w-4" />
              AI Capabilities
            </NavLink>
            
            <NavLink
              href="/admin/case-studies"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <Folder className="mr-3 h-4 w-4" />
              Case Studies
            </NavLink>
            
            <NavLink
              href="/admin/insights"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <MessageCircle className="mr-3 h-4 w-4" />
              Insights & Blog
            </NavLink>
            
            <NavLink
              href="/admin/assessment-config"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <ClipboardList className="mr-3 h-4 w-4" />
              Assessment Config
            </NavLink>
            
            <NavLink
              href="/admin/roi-config"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <BarChart2 className="mr-3 h-4 w-4" />
              ROI Calculator Config
            </NavLink>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
