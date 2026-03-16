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
  HelpCircle 
} from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const mainNav = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { name: 'Messages', href: '/dashboard/leads', icon: MessageSquare },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ]

  const supportNav = [
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
  ]

  return (
    <aside className="w-[260px] flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 h-20">
        <div className="bg-[#6b4cff] p-2 rounded-xl text-white">
          <div className="w-5 h-5 flex items-center justify-center font-bold text-sm">O</div>
        </div>
        <div>
          <div className="font-bold text-slate-800 leading-tight">Ougency</div>
          <div className="text-xs text-slate-500">Digital Agency</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-8">
        {/* Main Navigation */}
        <div>
          <div className="text-xs font-semibold text-slate-400 mb-3 px-2 tracking-wider">MAIN</div>
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-[#f0edff] text-[#6b4cff]' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Support Navigation */}
        <div>
          <div className="text-xs font-semibold text-slate-400 mb-3 px-2 tracking-wider">SUPPORT</div>
          <nav className="flex flex-col gap-1">
            {supportNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-[#f0edff] text-[#6b4cff]' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Pro Upgrade Card */}
        <div className="mt-auto">
          <div className="bg-gradient-to-br from-[#f8f5ff] to-[#f0edff] rounded-2xl p-4 border border-[#e5dfff]">
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Upgrade To Pro</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Unlock all features and get priority support.
            </p>
            <button className="w-full bg-gradient-to-r from-[#6b4cff] to-[#8f75ff] text-white text-xs font-semibold py-2.5 rounded-xl shadow-sm hover:opacity-90 transition-opacity">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
