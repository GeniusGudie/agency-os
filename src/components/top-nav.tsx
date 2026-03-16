'use client'

import { logout } from '@/app/login/actions'
import { LogOut, LayoutDashboard, MessageSquare, Activity } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function TopNav() {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Bot Status', href: '/dashboard/bot', icon: Activity },
  ]

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex shrink-0 items-center">
              <span className="text-xl font-bold text-zinc-100">Agency-OS</span>
            </div>
            <div className="hidden sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors gap-2',
                      isActive
                        ? 'border-indigo-500 text-zinc-100'
                        : 'border-transparent text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-300 shadow-sm ring-1 ring-inset ring-zinc-800 hover:bg-zinc-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bottom bar handled via CSS queries or separate component if needed, 
          keeping topnav simple for now per PRD "sidebar collapses to a bottom navigation bar" 
          - actually PRD said sidebar collapses to bottom bar. 
          Let's make this topnav act as the main nav since it's cleaner, and sticky bottom for mobile. */}
      <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-xl sm:hidden">
        <div className="mx-auto grid h-full max-w-lg grid-cols-2 font-medium">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'inline-flex flex-col items-center justify-center gap-1 hover:bg-zinc-900 transition-colors',
                  isActive ? 'text-indigo-400' : 'text-zinc-400'
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
