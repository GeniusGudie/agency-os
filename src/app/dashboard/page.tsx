import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Search, MoreHorizontal, DollarSign, Briefcase, TrendingUp, Users, CheckCircle, Clock, Target } from 'lucide-react'
import { RevenueChart } from '@/components/revenue-chart'

export default async function DashboardPage() {
  // Using hardcoded data for the metrics view as per reference design.
  // Real data (leads, etc) would go in the specific sections or a separate table.
  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <p className="text-slate-500 font-medium mb-1 tracking-tight">Welcome back</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 mb-1">
            Good morning, Promise <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-slate-500 text-sm">Here's what's happening across your agency today.</p>
        </div>
        <div className="flex items-center">
            <div className="bg-[#eefcf5] text-[#22c55e] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full"></div>
                Last updated: Just now
            </div>
        </div>
      </div>

      {/* Top Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue - Purple highlighted card */}
        <Card className="border-0 shadow-sm overflow-hidden bg-gradient-to-br from-[#f8f5ff] to-[#f0edff] relative group">
           <div className="absolute top-0 right-0 p-4 opacity-50 text-[#6b4cff]">
              <div className="bg-[#e5dfff] p-2 rounded-xl">
                 <DollarSign className="w-5 h-5" />
              </div>
           </div>
          <CardContent className="p-6">
            <p className="text-slate-500 text-sm font-medium mb-2">Total Revenue</p>
            <h3 className="text-3xl font-bold text-slate-800 mb-3">$124,500</h3>
            <p className="text-xs font-medium text-[#22c55e] flex items-center gap-1">
              +12.5% <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="border border-slate-100 bg-white shadow-sm overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-4 opacity-50 text-[#6b4cff]">
              <div className="bg-[#e5dfff] p-2 rounded-xl">
                 <Briefcase className="w-5 h-5" />
              </div>
           </div>
          <CardContent className="p-6">
            <p className="text-slate-500 text-sm font-medium mb-2">Active Projects</p>
            <h3 className="text-3xl font-bold text-slate-800 mb-3">24</h3>
            <p className="text-xs font-medium text-[#22c55e] flex items-center gap-1">
              +4 <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </CardContent>
        </Card>

        {/* Growth Rate */}
        <Card className="border border-slate-100 bg-white shadow-sm overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-4 opacity-50 text-[#6b4cff]">
              <div className="bg-[#e5dfff] p-2 rounded-xl">
                 <TrendingUp className="w-5 h-5" />
              </div>
           </div>
          <CardContent className="p-6">
            <p className="text-slate-500 text-sm font-medium mb-2">Growth Rate</p>
            <h3 className="text-3xl font-bold text-slate-800 mb-3">23.8%</h3>
            <p className="text-xs font-medium text-[#22c55e] flex items-center gap-1">
              +5.2% <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="border border-slate-100 bg-white shadow-sm overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-4 shadow-sm opacity-50 text-[#f97316]">
              <div className="bg-[#fff3e0] p-2 rounded-xl">
                 <Users className="w-5 h-5" />
              </div>
           </div>
          <CardContent className="p-6">
            <p className="text-slate-500 text-sm font-medium mb-2">Team Members</p>
            <h3 className="text-3xl font-bold text-slate-800 mb-3">12</h3>
            <p className="text-xs font-medium text-[#22c55e] flex items-center gap-1">
              +2 <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {/* Conversion Rate */}
         <Card className="border border-slate-100 bg-white shadow-sm py-2">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-[#f0edff] text-[#6b4cff] p-2 rounded-lg">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Conversion Rate</p>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">12.5%</span>
                            <span className="text-[10px] text-[#22c55e] font-bold">+2.1%</span>
                        </div>
                    </div>
                </div>
            </CardContent>
         </Card>

         {/* Active Clients */}
         <Card className="border border-slate-100 bg-white shadow-sm py-2">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-[#f0edff] text-[#6b4cff] p-2 rounded-lg">
                        <Users className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Active Clients</p>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">48</span>
                            <span className="text-[10px] text-[#22c55e] font-bold">+5</span>
                        </div>
                    </div>
                </div>
            </CardContent>
         </Card>

         {/* Avg. Delivery */}
         <Card className="border border-slate-100 bg-white shadow-sm py-2">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-[#f0edff] text-[#6b4cff] p-2 rounded-lg">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Avg. Delivery</p>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">4.2 days</span>
                            <span className="text-[10px] text-[#22c55e] font-bold">-0.8</span>
                        </div>
                    </div>
                </div>
            </CardContent>
         </Card>

         {/* Goals Hit */}
         <Card className="border border-slate-100 bg-white shadow-sm py-2">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-[#f0edff] text-[#6b4cff] p-2 rounded-lg">
                        <Target className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Goals Hit</p>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">89%</span>
                            <span className="text-[10px] text-[#22c55e] font-bold">+12%</span>
                        </div>
                    </div>
                </div>
            </CardContent>
         </Card>
      </div>

      {/* Main Content Area (Chart + Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Revenue Chart */}
         <RevenueChart />

         {/* Recent Activity */}
         <Card className="border-0 bg-white shadow-sm col-span-1 flex flex-col pt-2">
             <CardHeader className="pb-4">
                 <CardTitle className="text-lg font-bold text-slate-800">
                     Recent Activity
                 </CardTitle>
                 <p className="text-sm text-slate-500">
                     What's happening across your team
                 </p>
             </CardHeader>
             <CardContent className="flex-1">
                 <div className="space-y-6">
                     {/* Activity Item 1 */}
                     <div className="flex gap-4">
                         <div className="flex-shrink-0 mt-1">
                             <div className="w-8 h-8 rounded-full bg-[#f0edff] text-[#6b4cff] flex items-center justify-center">
                                 <MessageSquare className="w-4 h-4" />
                             </div>
                         </div>
                         <div className="flex-1">
                             <p className="text-sm text-slate-800 leading-tight mb-1">
                                 <span className="font-bold">Sarah K.</span> commented on <span className="font-medium">E-commerce Redesign</span>
                             </p>
                             <p className="text-xs text-slate-400">5 min ago</p>
                         </div>
                         <div className="flex-shrink-0">
                             <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                                 SK
                             </div>
                         </div>
                     </div>

                     {/* Activity Item 2 */}
                     <div className="flex gap-4">
                         <div className="flex-shrink-0 mt-1">
                             <div className="w-8 h-8 rounded-full bg-[#fff4ed] text-[#fb923c] flex items-center justify-center">
                                 <Briefcase className="w-4 h-4" />
                             </div>
                         </div>
                         <div className="flex-1">
                             <p className="text-sm text-slate-800 leading-tight mb-1">
                                 <span className="font-bold">Mark L.</span> uploaded files to <span className="font-medium">Brand Identity</span>
                             </p>
                             <p className="text-xs text-slate-400">1 hour ago</p>
                         </div>
                         <div className="flex-shrink-0">
                             <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                                 ML
                             </div>
                         </div>
                     </div>

                     {/* Activity Item 3 */}
                     <div className="flex gap-4">
                         <div className="flex-shrink-0 mt-1">
                             <div className="w-8 h-8 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center">
                                 <CheckCircle className="w-4 h-4" />
                             </div>
                         </div>
                         <div className="flex-1">
                             <p className="text-sm text-slate-800 leading-tight mb-1">
                                 <span className="font-bold">Alex P.</span> completed task in <span className="font-medium">Mobile App MVP</span>
                             </p>
                             <p className="text-xs text-slate-400">2 hours ago</p>
                         </div>
                         <div className="flex-shrink-0">
                             <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                                 AP
                             </div>
                         </div>
                     </div>
                 </div>
             </CardContent>
         </Card>
      </div>
    </div>
  )
}
