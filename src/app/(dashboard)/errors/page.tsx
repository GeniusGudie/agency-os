"use client";

import { AlertCircle, Clock, Workflow, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const mockErrors = [
  {
    id: 1,
    workflow: "AI Lead Qualifier",
    error: "Supabase Error: Could not find lead with ID '45y2...'",
    timestamp: new Date().toISOString(),
    severity: "high"
  },
  {
    id: 2,
    workflow: "WhatsApp Webhook Handler",
    error: "Connection Timeout: WhatsApp API responded with 504",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    severity: "medium"
  },
  {
    id: 3,
    workflow: "N8N Data Sync",
    error: "Invalid JSON format in payload",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    severity: "low"
  }
];

export default function ErrorLogPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-red-500 text-[10px] font-black tracking-[0.3em] uppercase mb-2">System Diagnostics</p>
          <h1 className="text-4xl font-black tracking-tighter text-white">Execution Error Log</h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Monitoring n8n workflow failures from the past 24 hours.</p>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
          <AlertCircle size={14} className="text-red-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-red-500">3 Errors Detected</span>
        </div>
      </div>

      <div className="space-y-4">
        {mockErrors.map((err) => (
          <div 
            key={err.id} 
            className="glass-card bg-red-500/[0.03] border-red-500/20 hover:bg-red-500/5 transition-all p-6"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                  <Workflow size={18} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">{err.workflow}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] border",
                      err.severity === 'high' ? "bg-red-500/20 border-red-500/30 text-red-500" :
                      err.severity === 'medium' ? "bg-amber-500/20 border-amber-500/30 text-amber-500" :
                      "bg-zinc-800 border-zinc-700 text-zinc-500"
                    )}>
                      {err.severity} Priority
                    </span>
                  </div>
                  <p className="text-sm font-medium text-zinc-300 bg-black/40 p-3 rounded-lg border border-red-500/10 font-mono">
                    {err.error}
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-4">
                <div className="flex items-center gap-2 text-zinc-600">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold uppercase">
                    {new Date(err.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors group">
                  View Source <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center p-12 border border-dashed border-zinc-800 rounded-2xl">
        <p className="text-zinc-700 font-bold uppercase tracking-[0.2em] text-xs">End of 24-hour log period.</p>
      </div>
    </div>
  );
}
