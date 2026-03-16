"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Building2, ChevronDown, Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function OrganizationSwitcher() {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [currentOrg, setCurrentOrg] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchOrgs() {
      const { data } = await supabase.from('organizations').select('*');
      if (data) {
         setOrgs(data);
         // Get org_id from cookie
         const match = document.cookie.match(new RegExp('(^| )org_id=([^;]+)'));
         const cookieOrgId = match ? match[2] : null;

         if (cookieOrgId) {
            const org = data.find((o: any) => o.id === cookieOrgId);
            if (org) setCurrentOrg(org);
         }
      }
    }
    fetchOrgs();
  }, [supabase]);

  const handleOrgSelect = (org: any | null) => {
    setCurrentOrg(org);
    setIsOpen(false);
    if (org) {
      document.cookie = `org_id=${org.id}; path=/; max-age=31536000; SameSite=Lax`;
    } else {
      document.cookie = `org_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
    }
    router.refresh();
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800/80 transition-all group"
      >
        <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent ring-1 ring-accent/20 group-hover:scale-110 transition-transform">
          {currentOrg ? <Building2 size={16} /> : <Globe size={16} />}
        </div>
        <div className="text-left">
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">Context Node</p>
          <p className="text-sm font-black text-white tracking-tight leading-none uppercase">
            {currentOrg ? currentOrg.name : "Global Overview"}
          </p>
        </div>
        <ChevronDown size={16} className={cn("text-zinc-600 ml-2 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-3 right-0 w-64 glass-card p-2 z-[60] animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 border-b border-zinc-800/50 mb-2">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Select Infrastructure</p>
          </div>
          <div className="space-y-1">
            <button 
              onClick={() => handleOrgSelect(null)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                !currentOrg ? "bg-accent text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <span className="text-xs font-black uppercase tracking-widest">Global Overview</span>
              {!currentOrg && <Check size={14} />}
            </button>
            <div className="h-px bg-zinc-800/50 my-1 mx-2" />
            {orgs.map((org) => (
              <button 
                key={org.id}
                onClick={() => handleOrgSelect(org)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                  currentOrg?.id === org.id ? "bg-accent text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                )}
              >
                <span className="text-xs font-black uppercase tracking-widest">{org.name}</span>
                {currentOrg?.id === org.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
