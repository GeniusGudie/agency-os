"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Building2, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OrganizationSwitcher() {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [currentOrg, setCurrentOrg] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchOrgs() {
      const { data } = await supabase.from('organizations').select('*');
      if (data) {
        setOrgs(data);
        // Default to first org for now or some state
        setCurrentOrg(data[0]);
      }
    }
    fetchOrgs();
  }, [supabase]);

  if (!currentOrg) return null;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800/80 transition-all group"
      >
        <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent ring-1 ring-accent/20 group-hover:scale-110 transition-transform">
          <Building2 size={16} />
        </div>
        <div className="text-left">
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">Context Node</p>
          <p className="text-sm font-black text-white tracking-tight leading-none uppercase">{currentOrg.name}</p>
        </div>
        <ChevronDown size={16} className={cn("text-zinc-600 ml-2 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-3 right-0 w-64 glass-card p-2 z-[60] animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 border-b border-zinc-800/50 mb-2">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Select Infrastructure</p>
          </div>
          <div className="space-y-1">
            {orgs.map((org) => (
              <button 
                key={org.id}
                onClick={() => {
                  setCurrentOrg(org);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                  currentOrg.id === org.id ? "bg-accent text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                )}
              >
                <span className="text-xs font-black uppercase tracking-widest">{org.name}</span>
                {currentOrg.id === org.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
