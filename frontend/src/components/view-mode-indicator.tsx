"use client";

import { useEffect, useState } from "react";
import { Building2, Globe, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function ViewModeIndicator() {
  const [orgId, setOrgId] = useState<string | null>(null);
  const [isAgency, setIsAgency] = useState(true);

  useEffect(() => {
    const updateMode = () => {
      const match = document.cookie.match(new RegExp('(^| )org_id=([^;]+)'));
      const id = match ? match[2] : null;
      setOrgId(id);
      setIsAgency(!id);
    };

    updateMode();
    // Check for cookie changes occasionally or on focus
    const interval = setInterval(updateMode, 2000);
    window.addEventListener('focus', updateMode);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', updateMode);
    };
  }, []);

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all duration-500",
      isAgency 
        ? "bg-indigo-500/5 border-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.05)]" 
        : "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
    )}>
      <div className={cn(
        "p-1.5 rounded-lg",
        isAgency ? "bg-indigo-500/10" : "bg-emerald-500/10"
      )}>
        {isAgency ? <ShieldCheck size={14} /> : <Building2 size={14} />}
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] font-black uppercase tracking-[0.3em] leading-none mb-1 opacity-50">
          Operation Mode
        </span>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
             {isAgency ? "Agency Command (Global)" : "Dealership Node (Live)"}
           </span>
           <Activity size={10} className="animate-pulse" />
        </div>
      </div>
    </div>
  );
}
