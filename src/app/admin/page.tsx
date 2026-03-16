import { createClient } from '@/utils/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Users, LayoutDashboard, PlusCircle, Activity, Building2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { OnboardingModal } from '@/components/onboarding-modal'
import { cn } from '@/lib/utils'

export default async function AdminPage() {
  const supabase = await createClient()

  // Fetch all organizations
  const { data: orgs } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch lead counts per org
  const { data: leadCounts } = await supabase
    .from('leads')
    .select('org_id')

  const stats = orgs?.map(org => {
     const count = leadCounts?.filter(l => l.org_id === org.org_id).length || 0
     return { ...org, leadCount: count }
  })

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <p className="text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase mb-1">Agency Management</p>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase">Client Manager</h1>
        </div>
        <div className="w-full sm:w-auto">
            <OnboardingModal />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border border-zinc-800 bg-zinc-900 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 ring-1 ring-indigo-500/20">
                    <Building2 className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Clients</p>
                    <h3 className="text-3xl font-black text-white">{orgs?.length || 0}</h3>
                </div>
            </div>
            <p className="text-xs text-emerald-400 font-bold px-1">+1 growth this month</p>
        </Card>

        <Card className="border border-zinc-800 bg-zinc-900 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 ring-1 ring-emerald-500/20">
                    <Activity className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Leads</p>
                    <h3 className="text-3xl font-black text-white">{leadCounts?.length || 0}</h3>
                </div>
            </div>
            <p className="text-xs text-zinc-500 font-bold px-1">Across all dealership nodes</p>
        </Card>
      </div>

      {/* Client Table */}
      <Card className="border border-zinc-800 bg-zinc-900 overflow-hidden rounded-2xl shadow-2xl">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/30">
            <h3 className="text-sm font-black text-zinc-100 uppercase tracking-widest">Dealership Network</h3>
            <div className="flex gap-2">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider">All Systems Live</span>
            </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-950/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500 py-5">Company Name</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Slug</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Lead Volume</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.map((org) => (
                <TableRow key={org.id} className="border-zinc-800 hover:bg-zinc-800/40 transition-colors group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-100 font-bold text-sm">
                            {org.name[0]}
                        </div>
                        <span className="font-bold text-zinc-100 text-sm tracking-tight">{org.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500 font-mono text-xs font-bold uppercase tracking-tighter">
                    {org.org_id}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border-0",
                        org.is_active ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30" : "bg-red-500/10 text-red-400 ring-1 ring-red-500/30"
                    )}>
                        {org.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-black text-indigo-400 text-sm">
                    {org.leadCount}
                  </TableCell>
                  <TableCell className="text-right">
                      <Link 
                          href={`/admin/clients/${org.org_id}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-all opacity-0 group-hover:opacity-100"
                      >
                          Configure <ExternalLink className="w-3 h-3" />
                      </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
