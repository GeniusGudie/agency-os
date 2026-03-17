"use client";

import { Workflow, Cpu, Zap, Settings2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const automations = [
  {
    name: "Lead Qualification Engine",
    status: "Active",
    trigger: "New Lead Inbound",
    action: "GPT-4o Analysis",
    uptime: "99.9%",
    color: "text-indigo-400"
  },
  {
    name: "Real-time CRM Sync",
    status: "Active",
    trigger: "Status Update",
    action: "REST API Push",
    uptime: "100%",
    color: "text-emerald-400"
  },
  {
    name: "Hot Lead SMS Alert",
    status: "Paused",
    trigger: "Score > 85",
    action: "Twilio Notify",
    uptime: "N/A",
    color: "text-amber-500"
  }
];

export default function WorkflowsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-accent text-[10px] font-black tracking-[0.3em] uppercase mb-2">Automations</p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Neural Workflows</h1>
        </div>
        <button className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-accent/10">
          <Zap size={14} />
          <span>Deploy New Node</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {automations.map((automation) => (
          <div key={automation.name} className="glass-card p-8 group hover:border-accent/30 transition-all duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="flex items-center gap-6">
                <div className={cn("p-4 rounded-2xl bg-zinc-900 border border-zinc-800 transition-transform group-hover:scale-110 duration-500", automation.color)}>
                  <Workflow size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{automation.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ring-1",
                      automation.status === "Active" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" : "bg-zinc-800 text-zinc-500 ring-zinc-700"
                    )}>
                      {automation.status}
                    </span>
                    <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                      Uptime: {automation.uptime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl w-full">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Trigger</p>
                  <p className="text-sm font-bold text-zinc-300">{automation.trigger}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Action</p>
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-accent" />
                    <p className="text-sm font-bold text-zinc-300">{automation.action}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-3 hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500">
                  <Settings2 size={18} />
                </button>
                <button className="p-3 bg-zinc-900 hover:bg-accent hover:text-white rounded-xl transition-all text-accent border border-zinc-800">
                  <Play size={18} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-12 border-dashed border-zinc-800 bg-transparent flex flex-col items-center justify-center text-center space-y-4 group cursor-pointer hover:border-accent/40 transition-all duration-500">
        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:text-accent transition-colors">
          <Zap size={24} />
        </div>
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-tight">Expand Automation Mesh</h2>
          <p className="text-zinc-500 text-xs mt-1">Add custom n8n webhooks or LLM-driven decision nodes.</p>
        </div>
      </div>
    </div>
  );
}
