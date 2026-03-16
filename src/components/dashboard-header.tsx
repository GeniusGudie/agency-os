'use client'

import { Search, Bell, Menu, Plus } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 sticky top-0 z-40 lg:mb-6 lg:px-0 lg:bg-transparent lg:border-none">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 text-zinc-400 hover:bg-zinc-900 rounded-lg transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search deals, clients, or conversations..." 
            className="w-full pl-11 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
          <Plus className="w-4 h-4" /> New Deal
        </button>

        <button className="relative p-2.5 text-zinc-400 hover:text-zinc-100 bg-zinc-900/50 border border-zinc-800 rounded-xl transition-all hover:bg-zinc-900">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-zinc-950"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 sm:border-l sm:border-zinc-800">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-600/20">
            JD
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-bold text-zinc-100 leading-tight">John Doe</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}
