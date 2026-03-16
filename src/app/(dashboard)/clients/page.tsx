"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Building2, 
  Search, 
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchClients() {
      const { data } = await supabase
        .from('organizations')
        .select('*')
        .order('name');
      
      setClients(data || []);
      setLoading(false);
    }
    fetchClients();
  }, [supabase]);

  const setContext = (orgId: string) => {
    document.cookie = `org_id=${orgId}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.href = "/";
  };

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
          <p className="text-accent text-[10px] font-black tracking-[0.3em] uppercase mb-2">Network Topology</p>
          <h1 className="text-4xl font-black tracking-tighter text-white">Active Dealerships</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
          <input 
            type="text" 
            placeholder="Search network..." 
            className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all w-64 uppercase font-black tracking-widest placeholder:text-zinc-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <button 
            key={client.id}
            onClick={() => setContext(client.id)}
            className="glass-card p-6 group hover:border-accent/40 transition-all text-left relative overflow-hidden"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors border border-zinc-700 group-hover:border-accent/20">
                <Building2 size={24} />
              </div>
              <ChevronRight size={20} className="text-zinc-700 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>

            <div className="mt-6 relative z-10">
              <h3 className="text-lg font-black text-white tracking-tight uppercase group-hover:text-accent transition-colors">{client.name}</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Infrastructure Node #{client.id.slice(0, 8)}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-800 relative z-10">
              <div>
                <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                  <MessageSquare size={10} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Chats</span>
                </div>
                <div className="text-sm font-black text-white">1.2k</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                  <Users size={10} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Leads</span>
                </div>
                <div className="text-sm font-black text-white">482</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                  <TrendingUp size={10} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Conv.</span>
                </div>
                <div className="text-sm font-black text-emerald-400">12%</div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
