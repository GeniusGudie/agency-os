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

const data = [
  { name: 'Jan', revenue: 38000 },
  { name: 'Feb', revenue: 42000 },
  { name: 'Mar', revenue: 58000 },
  { name: 'Apr', revenue: 50000 },
  { name: 'May', revenue: 62000 },
  { name: 'Jun', revenue: 58000 },
  { name: 'Jul', revenue: 75000 },
]

export function RevenueChart() {
  return (
    <Card className="border-0 bg-white shadow-sm overflow-hidden flex-1 flex flex-col pt-2 col-span-1 lg:col-span-2">
      <CardHeader className="pb-0 pl-6">
        <CardTitle className="text-lg font-bold text-slate-800">
          Revenue Overview
        </CardTitle>
        <p className="text-sm text-slate-500">
          Monthly revenue and project trends
        </p>
      </CardHeader>
      <CardContent className="flex-1 p-0 pl-0 pr-6 mt-4 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
            {/* Adding gradient def */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6b4cff" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6b4cff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6b4cff"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#6b4cff', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
