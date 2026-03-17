"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Zap,
  Flame,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { BotStatusPanel } from "@/components/bot-status-panel";

const data = [
  { name: "Mon", conversations: 120, qualified: 40 },
  { name: "Tue", conversations: 150, qualified: 65 },
  { name: "Wed", conversations: 180, qualified: 85 },
  { name: "Thu", conversations: 140, qualified: 55 },
  { name: "Fri", conversations: 210, qualified: 110 },
  { name: "Sat", conversations: 160, qualified: 90 },
  { name: "Sun", conversations: 130, qualified: 70 },
];

const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
  <div className="glass-card p-6 space-y-4 hover:border-zinc-700 transition-colors">
    <div className="flex justify-between items-start">
      <div className={cn("p-2 rounded-lg bg-zinc-800 text-zinc-400", color)}>
        <Icon size={20} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-black uppercase tracking-wider",
        trend === 'up' ? "text-emerald-500" : "text-amber-500"
      )}>
        {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {change}
      </div>
    </div>
    <div>
      <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</h3>
      <p className="text-3xl font-black text-white mt-1">{value}</p>
    </div>
  </div>
);

export default function OverviewContent() {
  const [stats, setStats] = useState({
    leads: 0,
    conversations: 0,
    hotLeads: 0,
    loading: true
  });
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const match = document.cookie.match(new RegExp('(^| )org_id=([^;]+)'));
      const orgId = match ? match[2] : null;

      let leadsQuery = supabase.from('leads').select('id, is_hot', { count: 'exact' });
      let chatsQuery = supabase.from('agency_chat_history').select('session_id', { count: 'exact' });

      if (orgId) {
        leadsQuery = leadsQuery.eq('org_id', orgId);
        chatsQuery = chatsQuery.eq('org_id', orgId);
      }

      const [leadsRes, chatsRes] = await Promise.all([
        leadsQuery,
        chatsQuery
      ]);

      const uniqueSessions = new Set(chatsRes.data?.map((c: any) => c.session_id) || []).size;

      setStats({
        leads: leadsRes.count || 0,
        conversations: uniqueSessions,
        hotLeads: leadsRes.data?.filter((l: any) => l.is_hot).length || 0,
        loading: false
      });
    }
    fetchStats();
  }, [supabase]);

  const isAgency = !stats.loading && !document.cookie.match(new RegExp('(^| )org_id=([^;]+)'));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-accent text-[10px] font-black tracking-[0.3em] uppercase mb-2">
            {isAgency ? "Master Control View" : "Dealership Operations"}
          </p>
          <h1 className="text-4xl font-black tracking-tighter text-white">
            {isAgency ? "Global Agency Stats" : "Localized Performance"}
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl shrink-0">
          <div className={cn("w-2 h-2 rounded-full animate-pulse", isAgency ? "bg-indigo-500" : "bg-emerald-500")} />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {isAgency ? "Agency Node: Active" : "Local Node: Streaming"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Daily Leads" 
          value={stats.loading ? "..." : stats.leads.toLocaleString()} 
          change="+12.5%" 
          trend="up" 
          icon={Users} 
          color="text-indigo-400"
        />
        <StatCard 
          title="Conversations" 
          value={stats.loading ? "..." : stats.conversations.toLocaleString()} 
          change="+8.2%" 
          trend="up" 
          icon={MessageSquare}
          color="text-purple-400"
        />
        <StatCard 
          title="Hot Leads" 
          value={stats.loading ? "..." : stats.hotLeads.toLocaleString()} 
          change="-2.4%" 
          trend="down" 
          icon={Flame}
          color="text-amber-500"
        />
        <StatCard 
          title="Bot Status" 
          value="99.9%" 
          change="Optimal" 
          trend="up" 
          icon={Zap}
          color="text-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black text-white uppercase tracking-tight">Conversation Velocity</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-[10px] font-bold uppercase text-zinc-500">Activity</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#52525b" 
                  fontSize={10} 
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={10} 
                  fontWeight="bold"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversations" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-lg font-black text-white uppercase tracking-tight px-2">Core Engine</h2>
           <BotStatusPanel />
           
           <div className="glass-card p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                 <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Network Load</h3>
                 <TrendingUp size={14} className="text-zinc-600" />
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-zinc-500">Latency</span>
                    <span className="text-emerald-400">0.4ms</span>
                 </div>
                 <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[15%]" />
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-zinc-500">Throughput</span>
                    <span className="text-indigo-400">1.2k/m</span>
                 </div>
                 <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[65%]" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="glass-card p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-black text-white uppercase tracking-tight">Lead Qualification</h2>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold uppercase text-zinc-500">Last 7 Days</span>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#52525b" 
                fontSize={10} 
                fontWeight="bold"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#52525b" 
                fontSize={10} 
                fontWeight="bold"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
              />
              <Bar 
                dataKey="qualified" 
                fill="#6366f1" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
