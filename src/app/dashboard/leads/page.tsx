'use client'

import { LeadTable } from '@/components/lead-table'
import { Card, CardContent } from '@/components/ui/card'
import { 
    Users, 
    Flame, 
    Search, 
    Filter, 
    ChevronDown, 
    Download, 
    PlusCircle,
    SortAsc
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LeadsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 uppercase">Lead Pipeline</h1>
          <p className="text-zinc-500 text-sm font-medium">Capture, classify, and close. Your AI is working overtime.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-black text-zinc-400 hover:text-white transition-all uppercase tracking-widest">
                <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/20 transition-all active:scale-95 uppercase tracking-widest">
                <PlusCircle className="w-3.5 h-3.5" /> Manual Entry
            </button>
        </div>
      </div>

      {/* Quick Filters / Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
             { label: 'All Leads', count: '1,284', active: true },
             { label: 'Hot Leads', count: '42', color: 'text-amber-500' },
             { label: 'Qualifying', count: '156' },
             { label: 'Closed / Won', count: '28' },
         ].map((stat, i) => (
             <button 
                key={i}
                className={cn(
                    "p-4 rounded-2xl border transition-all text-left group",
                    stat.active 
                        ? "bg-zinc-100 border-white text-zinc-950 shadow-xl" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800/50"
                )}
             >
                <p className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] mb-1.5",
                    stat.active ? "text-zinc-500" : "text-zinc-500"
                )}>
                    {stat.label}
                </p>
                <div className="flex items-center justify-between">
                    <span className={cn("text-2xl font-black tracking-tighter", stat.color)}>
                        {stat.count}
                    </span>
                    {stat.active && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>}
                </div>
             </button>
         ))}
      </div>

      {/* Main Grid View Controls */}
      <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 p-2 rounded-2xl">
         <div className="flex items-center gap-1">
            <button className="px-4 py-2 bg-zinc-800 text-white text-xs font-bold rounded-xl shadow-inner uppercase tracking-widest">List View</button>
            <button className="px-4 py-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold rounded-xl uppercase tracking-widest transition-colors">Grid View</button>
         </div>
         <div className="flex items-center gap-4 px-2">
             <div className="flex items-center gap-2 text-zinc-500">
                <SortAsc className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Sort by: Newest</span>
                <ChevronDown className="w-3 h-3" />
             </div>
         </div>
      </div>

      {/* The Table */}
      <LeadTable />
    </div>
  )
}
