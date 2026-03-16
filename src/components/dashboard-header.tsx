'use client'

import { Search, Bell, Menu } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-slate-200 sticky top-0 z-40 lg:bg-[#f3f4fd] lg:border-none lg:px-0 lg:mb-6">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects, clients, or tasks..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#6b4cff]/20 focus:border-[#6b4cff] transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#6b4cff] to-[#ff6b6b] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:opacity-90 transition-opacity">
          <span>+</span> New Project
        </button>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff6b6b] rounded-full ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 sm:border-l sm:border-slate-200">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#6b4cff] to-[#a855f7] flex items-center justify-center text-white font-medium text-sm shadow-sm">
            JD
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-semibold text-slate-800 leading-tight">John Doe</div>
            <div className="text-xs text-slate-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}
