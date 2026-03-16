"use client";

import { useEffect, useState } from "react";
import { Zap, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function BotStatusPanel() {
  const [status, setStatus] = useState<'Active' | 'Offline' | 'Checking'>('Checking');
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  useEffect(() => {
    // Simulate periodic status checks
    const checkStatus = () => {
      setStatus('Active');
      setLastSeen(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
        "rounded-3xl p-6 transition-all duration-500 relative overflow-hidden",
        status === 'Active' ? "bg-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.2)]" : "bg-zinc-800"
    )}>
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
           <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <Zap className={cn("w-6 h-6 text-white", status === 'Active' && "fill-white")} />
           </div>
           <div className={cn(
               "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border backdrop-blur-md",
               status === 'Active' ? "bg-white/20 text-white border-white/30" : "bg-black/20 text-zinc-400 border-zinc-700"
           )}>
              {status}
           </div>
        </div>

        <div>
            <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1">Bot Intelligence</h4>
            <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">Automotive Lead Filter</p>
        </div>

        <div className="space-y-4">
            <div className="flex justify-between items-center text-[9px] font-black text-white uppercase tracking-widest">
                <span className="flex items-center gap-1.5 opacity-60"><Clock className="w-3 h-3" /> Last Active</span>
                <span>{lastSeen || 'Unknown'}</span>
            </div>
            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                <div 
                    className={cn(
                        "h-full transition-all duration-1000 ease-out",
                        status === 'Active' ? "bg-white w-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-zinc-700 w-0"
                    )}
                />
            </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
            {status === 'Active' ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl border border-white/10 w-fit">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Security Nominal</span>
                </div>
            ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 rounded-xl border border-red-500/10 w-fit">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Action Required</span>
                </div>
            )}
        </div>
      </div>

      <Zap className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 opacity-40 rotate-12" />
    </div>
  );
}
