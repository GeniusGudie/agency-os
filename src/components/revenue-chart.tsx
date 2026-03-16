'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export function RevenueChart({ initialData = [] }: { initialData?: any[] }) {
  const displayData = initialData.length > 0 ? initialData : [
    { name: 'Mon', leads: 0 },
    { name: 'Tue', leads: 0 },
    { name: 'Wed', leads: 0 },
    { name: 'Thu', leads: 0 },
    { name: 'Fri', leads: 0 },
    { name: 'Sat', leads: 0 },
    { name: 'Sun', leads: 0 },
  ]

  return (
    <Card className="border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50 overflow-hidden flex-1 flex flex-col pt-2 col-span-1 lg:col-span-2 rounded-2xl">
      <CardHeader className="pb-0 pl-6">
        <CardTitle className="text-lg font-bold text-zinc-100">
          Capture Rate
        </CardTitle>
        <p className="text-sm text-zinc-500">
          Daily WhatsApp lead generation volume
        </p>
      </CardHeader>
      <CardContent className="flex-1 p-0 pl-0 pr-6 mt-4 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#71717a', fontWeight: 600 }} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#71717a', fontWeight: 600 }}
                tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#18181b', 
                  border: '1px solid #27272a', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' 
                }}
                itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                labelStyle={{ color: '#fafafa', marginBottom: '4px' }}
                cursor={{ stroke: '#3f3f46', strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#6366f1', stroke: '#18181b', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
