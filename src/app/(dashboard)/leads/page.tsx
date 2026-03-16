"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Users, 
  Flame, 
  Search, 
  Filter, 
  ChevronRight,
  MoreHorizontal,
  ArrowUpDown
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchLeads() {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('is_hot', { ascending: false })
        .order('created_at', { ascending: false });
      
      setLeads(data || []);
      setLoading(false);
    }
    fetchLeads();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-accent text-[10px] font-black tracking-[0.3em] uppercase mb-2">Acquisition Pipeline</p>
          <h1 className="text-4xl font-black tracking-tighter text-white">Live Lead Stream</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            <Filter size={14} />
            Filter
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-800/50 bg-zinc-950/30">
              <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  Customer
                  <ArrowUpDown size={12} className="text-zinc-700" />
                </div>
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Budget (₦)</th>
              <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Interest</th>
              <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Last Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                className={cn(
                  "group hover:bg-white/[0.02] transition-colors cursor-pointer",
                  lead.is_hot && "hot-lead-row"
                )}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-transform duration-300 group-hover:scale-110",
                      lead.is_hot ? "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20" : "bg-zinc-800 text-zinc-500"
                    )}>
                      {lead.name?.[0] || <Users size={16} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-bold text-white text-sm">
                        {lead.name || "Unknown Lead"}
                        {lead.is_hot && <Flame size={14} className="text-amber-500 fill-amber-500 animate-pulse" />}
                      </div>
                      <div className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase">
                        {lead.phone_number}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border",
                    lead.status === 'qualified' ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" :
                    lead.status === 'new' ? "bg-indigo-500/5 text-indigo-400 border-indigo-500/20" :
                    "bg-zinc-800 text-zinc-500 border-zinc-700"
                  )}>
                    {lead.status}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="font-black text-white text-sm tracking-tight">
                    {formatCurrency(lead.budget_ngn || 0)}
                  </div>
                  <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">
                    Est. Potential
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1.5">
                    {lead.requested_models?.map((model: string) => (
                      <span key={model} className="text-[9px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                        {model}
                      </span>
                    )) || <span className="text-[9px] text-zinc-700 font-black italic">No request</span>}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <div className="text-[11px] font-bold text-zinc-400">
                        {new Date(lead.updated_at || lead.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-[9px] text-zinc-600 font-bold uppercase">
                        {new Date(lead.updated_at || lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 hover:text-white">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {leads.length === 0 && (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
             <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-700 border border-zinc-800">
                <Users size={32} />
             </div>
             <p className="text-zinc-600 font-black uppercase tracking-[0.2em] text-xs">No active leads detected.</p>
          </div>
        )}
      </div>
    </div>
  );
}
