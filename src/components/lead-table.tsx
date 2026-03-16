'use client'

import { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Flame, MoreHorizontal, Search, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LeadDetailPanel } from './lead-detail-panel'

const mockLeads = [
  { 
    id: 1, 
    name: 'Adewale Johnson', 
    phone: '+234 812 345 6789', 
    status: 'New', 
    budget: '₦45,000,000', 
    isHot: true, 
    time: '2 mins ago',
    sessionId: 'session_1'
  },
  { 
    id: 2, 
    name: 'Chukwudi Obi', 
    phone: '+234 703 111 2222', 
    status: 'Qualifying', 
    budget: '₦12,500,000', 
    isHot: false, 
    time: '14 mins ago',
    sessionId: 'session_2'
  },
  { 
    id: 3, 
    name: 'Sarah Ahmed', 
    phone: '+234 809 999 8888', 
    status: 'Qualified', 
    budget: '₦62,000,000', 
    isHot: true, 
    time: '1 hour ago',
    sessionId: 'session_3'
  },
  { 
    id: 4, 
    name: 'Tunde Bakare', 
    phone: '+234 818 444 5555', 
    status: 'Lost', 
    budget: '₦8,000,000', 
    isHot: false, 
    time: '3 hours ago',
    sessionId: 'session_4'
  },
]

export function LeadTable() {
  const [selectedLead, setSelectedLead] = useState<any>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-black text-white tracking-tight uppercase">Recent WhatsApp Leads</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors group">
            <Filter className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <Card className="border border-zinc-800 bg-zinc-900 overflow-hidden rounded-2xl shadow-2xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-950/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500 py-5">Lead / Contact</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Budget (₦)</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Last Seen</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeads.map((lead) => (
                <TableRow 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead)}
                  className={cn(
                    "border-zinc-800 transition-all cursor-pointer group",
                    lead.isHot ? "hover:bg-amber-500/[0.03]" : "hover:bg-indigo-500/[0.03]"
                  )}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-105",
                        lead.isHot ? "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 shadow-lg shadow-amber-500/5" : "bg-zinc-950 text-zinc-500 ring-1 ring-zinc-800"
                      )}>
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-zinc-100 text-sm">
                          {lead.name}
                          {lead.isHot && <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-bold tracking-wider">{lead.phone}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm border-0 shadow-inner",
                      lead.status === 'New' && "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/30",
                      lead.status === 'Qualifying' && "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30",
                      lead.status === 'Qualified' && "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30",
                      lead.status === 'Lost' && "bg-red-500/10 text-red-400 ring-1 ring-red-500/30",
                    )}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-zinc-100 text-xs tracking-tight">{lead.budget}</TableCell>
                  <TableCell className="text-xs text-zinc-500 font-bold">{lead.time}</TableCell>
                  <TableCell className="text-right">
                    <button className="p-2 text-zinc-600 hover:text-zinc-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <LeadDetailPanel 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  )
}
