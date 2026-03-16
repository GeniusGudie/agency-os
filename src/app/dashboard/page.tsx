import { getDashboardStats, getBotStatus, getLeadHistory } from '@/app/actions'
import { Card, CardContent } from '@/components/ui/card'
import { Flame, Users, Zap, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { RevenueChart } from '@/components/revenue-chart'
import { LeadTable } from '@/components/lead-table'
import { BotStatusPanel } from '@/components/bot-status-panel'
import { cn } from '@/lib/utils'

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  const botHealth = await getBotStatus()
  const history = await getLeadHistory()

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Automotive Intelligence</p>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">
            Control Center <span className="inline-block animate-wave">🏎️</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium">Monitoring AI lead generation for your dealership network.</p>
        </div>
        <div className="flex items-center">
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2.5 shadow-lg shadow-emerald-500/5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Systems Operational
            </div>
        </div>
      </div>

      {/* Main Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Leads */}
        <Card className="border border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden relative group rounded-2xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-600/10 p-2.5 rounded-xl text-indigo-400 ring-1 ring-indigo-500/20 shadow-inner">
                    <Users className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-black text-indigo-500/50 uppercase tracking-widest pt-1">Total Leads</div>
            </div>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{stats.totalLeads}</h3>
            <div className="flex items-center gap-2">
                <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" /> 14%
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Growth vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Hot Leads */}
        <Card className="border border-amber-500/30 bg-amber-500/[0.03] shadow-xl overflow-hidden relative group rounded-2xl">
          <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
                <div className="bg-amber-500/10 p-2.5 rounded-xl text-amber-500 ring-1 ring-amber-500/30">
                    <Flame className="w-5 h-5 fill-amber-500/20" />
                </div>
                <div className="text-[10px] font-black text-amber-500/50 uppercase tracking-widest pt-1">Hot Leads</div>
            </div>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{stats.hotLeads}</h3>
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Immediate Intent</span>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></div>
            </div>
          </CardContent>
        </Card>

        {/* Bot Status Card */}
        <Card className="border border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden relative group rounded-2xl">
          <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "p-2.5 rounded-xl ring-1 shadow-inner",
                  botHealth.status === 'running' ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30" : "bg-red-500/10 text-red-400 ring-red-500/30"
                )}>
                    <Zap className={cn("w-5 h-5", botHealth.status === 'running' && "fill-emerald-500/20")} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest pt-1 opacity-50">Bot Status</div>
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight uppercase">
              {botHealth.status === 'running' ? 'Active' : 'Offline'}
            </h3>
            <div className="flex items-center gap-2">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  botHealth.status === 'running' ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                )}></div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  {botHealth.status === 'running' ? 'Live Monitoring' : 'Attention Required'}
                </span>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Success */}
        <Card className="border border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden relative group rounded-2xl">
          <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
                <div className="bg-purple-600/10 p-2.5 rounded-xl text-purple-400 ring-1 ring-purple-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-black text-purple-500/50 uppercase tracking-widest pt-1">Success Rate</div>
            </div>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{stats.successRate}</h3>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-indigo-500 h-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: stats.successRate }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <RevenueChart />
         <div className="lg:col-span-1">
             <BotStatusPanel 
               status={botHealth.status as any} 
               lastActive={botHealth.lastActive} 
               successRate={stats.successRate} 
             />
         </div>
      </div>

      {/* Leads Section */}
      <LeadTable initialLeads={stats.recentLeads as any} />
    </div>
  )
}
