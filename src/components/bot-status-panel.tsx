'use client'

import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, Clock, Activity, History } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BotStatusProps {
  status: 'running' | 'stopped' | 'error'
  lastActive: string
  successRate: string
}

export function BotStatusPanel({ status = 'running', lastActive = '2 minutes ago', successRate = '98.4%' }: BotStatusProps) {
  const isRunning = status === 'running'

  return (
    <Card className="border border-zinc-800 bg-zinc-900 overflow-hidden rounded-2xl shadow-2xl">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={cn(
                "p-2 rounded-xl border",
                isRunning ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
            )}>
                <Activity className="w-5 h-5" />
            </div>
            <div>
                <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Automation Health</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Live System Monitor</p>
            </div>
        </div>
        <div className={cn(
            "px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 shadow-inner",
            isRunning ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        )}>
            {isRunning ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
            {isRunning ? 'Bot is running ✓' : 'Bot stopped ✕'}
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/50">
                <div className="flex items-center gap-2 mb-2 text-zinc-500">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-wider">Last Sync</span>
                </div>
                <p className="text-zinc-100 font-bold text-sm">{lastActive}</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/50">
                <div className="flex items-center gap-2 mb-2 text-zinc-500">
                    <History className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-wider">Success Rate</span>
                </div>
                <p className="text-zinc-100 font-bold text-sm tracking-tight">{successRate}</p>
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Recent Activity</span>
                <span className="text-[10px] text-indigo-400 font-bold hover:underline cursor-pointer">Logs</span>
            </div>
            
            <div className="space-y-3">
                {[
                    { type: 'success', time: '1m ago', msg: 'Lead "Adewale" captured' },
                    { type: 'success', time: '14m ago', msg: 'Bot replied to "Chukwudi"' },
                    { type: 'error', time: '1h ago', msg: 'API Timeout (Retried)' },
                ].map((log, i) => (
                    <div key={i} className="flex items-center gap-3 py-1">
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            log.type === 'success' ? "bg-emerald-500" : "bg-red-500"
                        )}></div>
                        <span className="text-xs text-zinc-300 flex-1 truncate">{log.msg}</span>
                        <span className="text-[10px] text-zinc-600 font-bold">{log.time}</span>
                    </div>
                ))}
            </div>
        </div>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-[11px] font-black uppercase tracking-widest py-3 rounded-xl transition-all active:scale-[0.98]">
            Test Connection
        </button>
      </CardContent>
    </Card>
  )
}
