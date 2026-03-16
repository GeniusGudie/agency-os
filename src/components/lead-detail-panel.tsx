'use client'

import { useState } from 'react'
import { 
  X, 
  Flame, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign, 
  MessageSquare,
  CheckCircle2,
  Clock,
  ChevronRight,
  User,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatHistory } from './chat-history'

interface Lead {
  id: string | number
  name: string
  phone: string
  status: string
  budget: string
  isHot: boolean
  time: string
  sessionId: string
}

interface LeadDetailPanelProps {
  lead: Lead | null
  onClose: () => void
}

export function LeadDetailPanel({ lead, onClose }: LeadDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'chat'>('chat')

  if (!lead) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity duration-500 ease-in-out" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pointer-events-auto">
        <div className="w-screen max-w-2xl transform transition duration-500 ease-in-out sm:duration-700 bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg",
                    lead.isHot ? "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20" : "bg-zinc-900 text-zinc-400 ring-1 ring-zinc-800"
                )}>
                    {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                   <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-zinc-100 tracking-tight">{lead.name}</h2>
                        {lead.isHot && <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />}
                   </div>
                   <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{lead.phone}</p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-zinc-100 bg-zinc-900 rounded-xl transition-all"
            >
                <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 py-2 border-b border-zinc-800 bg-zinc-900/10 flex gap-8">
             {[
                 { id: 'chat', label: 'Conversation', icon: MessageSquare },
                 { id: 'details', label: 'Lead Intelligence', icon: Zap }
             ].map((tab) => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                        "flex items-center gap-2 py-4 text-xs font-black uppercase tracking-widest transition-all relative",
                        activeTab === tab.id ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"
                    )}
                 >
                    <tab.icon className="w-3.5 h-3.5 mt-[-2px]" />
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    )}
                 </button>
             ))}
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
             {activeTab === 'chat' ? (
                <div className="flex-1 p-6 overflow-hidden">
                    <ChatHistory 
                        sessionId={lead.sessionId} 
                        orgId="demo" 
                        customerName={lead.name}
                        initialMessages={[]} 
                    />
                </div>
             ) : (
                <div className="flex-1 overflow-y-auto p-8 space-y-10">
                    {/* Status Update Section */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Current Status</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['New', 'Qualifying', 'Qualified', 'Lost'].map((status) => (
                                <button 
                                    key={status}
                                    className={cn(
                                        "px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border",
                                        lead.status === status 
                                            ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20" 
                                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                                    )}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-2 mb-3 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                                <DollarSign className="w-3 h-3" /> Potential Budget
                            </div>
                            <p className="text-xl font-black text-white">{lead.budget}</p>
                            <div className="mt-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Indicated in AI chat</div>
                        </div>
                        <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-2 mb-3 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                                <Calendar className="w-3 h-3" /> Purchase Timeline
                            </div>
                            <p className="text-xl font-black text-white">Immediate</p>
                            <div className="mt-2 text-[10px] text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1">
                                <Flame className="w-2.5 h-2.5" /> High Urgency
                            </div>
                        </div>
                    </div>

                    {/* Models Requested */}
                    <div className="space-y-4">
                         <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Interests</h4>
                         <div className="flex flex-wrap gap-2">
                            {['G-Wagon', 'GLK 350', '2022 GLE'].map((model) => (
                                <span key={model} className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-300">
                                    {model}
                                </span>
                            ))}
                         </div>
                    </div>

                    {/* Internal Notes */}
                    <div className="space-y-4">
                         <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Internal Sales Notes</h4>
                         <textarea 
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            rows={4}
                            placeholder="Add notes for your team here..."
                         ></textarea>
                         <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                             Save Notes
                         </button>
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
