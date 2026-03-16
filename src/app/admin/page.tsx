import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Users, LayoutDashboard, PlusCircle, Activity } from 'lucide-react'
import Link from 'next/link'

import { AdminDashboardClient } from './admin-dashboard-client'

export default async function AdminPage() {
  const supabase = await createClient()

  // Fetch all organizations
  const { data: orgs } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch lead counts per org (Simplified aggregation)
  const { data: leadCounts } = await supabase
    .from('leads')
    .select('org_id')

  // Grouping logic for summary
  const stats = orgs?.map(org => {
     const count = leadCounts?.filter(l => l.org_id === org.org_id).length || 0
     return { ...org, leadCount: count }
  })

  return (
    <AdminDashboardClient>
      <div className="space-y-6">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-800 bg-zinc-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgs?.length || 0}</div>
            <p className="text-xs text-emerald-500">+1 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Leads</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadCounts?.length || 0}</div>
            <p className="text-xs text-zinc-500">Across all dealerships</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden">
        <CardHeader className="border-b border-zinc-800">
            <CardTitle>Dealership Clients</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader className="bg-zinc-950/50">
            <TableRow>
              <TableHead>Dealership Name</TableHead>
              <TableHead>Slug (org_id)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Lead Count</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats?.map((org) => (
              <TableRow key={org.id} className="group">
                <TableCell className="font-medium text-zinc-100">
                  {org.name}
                </TableCell>
                <TableCell className="text-zinc-500 font-mono text-xs">
                  {org.org_id}
                </TableCell>
                <TableCell>
                  {org.is_active ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="danger">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium text-indigo-400">
                  {org.leadCount}
                </TableCell>
                <TableCell className="text-right">
                    <Link 
                        href={`/admin/clients/${org.org_id}`}
                        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                    >
                        Configure
                    </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      </div>
    </AdminDashboardClient>
  )
}
