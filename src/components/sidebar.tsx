'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Gem,
  Zap
} from 'lucide-react'

import { OrganizationSwitcher } from './organization-switcher'
import { OnboardingModal } from './onboarding-modal'

export function Sidebar() {
  const pathname = usePathname()

  const mainNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/dashboard/leads', icon: MessageSquare },
    { name: 'Inventory', href: '/dashboard/inventory', icon: FolderKanban },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ]

  const adminNav = [
    { name: 'Client Manager', href: '/admin', icon: Users },
    { name: 'Bot Workflows', href: '/admin/workflows', icon: Zap },
  ]

  const supportNav = [
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
  ]

  return (
    <aside className="w-[260px] flex-shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col h-screen sticky top-0 font-sans">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 h-20">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/20">
          <div className="w-5 h-5 flex items-center justify-center font-bold text-sm">A</div>
        </div>
        <div>
          <div className="font-bold text-zinc-100 leading-tight tracking-tight text-lg">Agency-OS</div>
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Dealership AI</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-8">
        {/* Organization Switcher */}
        <div className="px-2">
            <OrganizationSwitcher />
        </div>

        {/* Main Navigation */}
        <div>
          <div className="text-[10px] font-bold text-zinc-600 mb-4 px-3 tracking-[0.2em] uppercase">Control Center</div>
          <nav className="flex flex-col gap-1.5">
            {mainNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    isActive 
                      ? 'bg-indigo-600/10 text-indigo-400 ring-1 ring-indigo-500/20 shadow-sm shadow-indigo-500/10' 
                      : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-indigo-400" : "text-zinc-600 group-hover:text-zinc-400"
                  )} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Admin Navigation */}
        <div>
          <div className="text-[10px] font-bold text-indigo-500/50 mb-4 px-3 tracking-[0.2em] uppercase">Agency Admin</div>
          <nav className="flex flex-col gap-1.5">
            {adminNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group border border-transparent',
                    isActive 
                      ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20 shadow-sm shadow-indigo-500/10' 
                      : 'text-zinc-600 hover:text-indigo-400 hover:bg-zinc-900 hover:border-zinc-800'
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-indigo-400" : "text-zinc-700 group-hover:text-indigo-400"
                  )} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Support Navigation */}
        <div>
          <div className="text-[10px] font-bold text-zinc-600 mb-4 px-3 tracking-[0.2em] uppercase">Preferences</div>
          <nav className="flex flex-col gap-1.5">
            {supportNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    isActive 
                      ? 'bg-indigo-600/10 text-indigo-400 ring-1 ring-indigo-500/20' 
                      : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-indigo-400" : "text-zinc-600 group-hover:text-zinc-400"
                  )} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Onboarding Trigger */}
        <div className="mt-auto pb-4">
            <OnboardingModal />
        </div>
      </div>
    </aside>
  )
}
