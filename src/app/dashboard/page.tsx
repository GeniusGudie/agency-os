import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Flame, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

import { LeadsTable } from '@/components/leads-table'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Note: RLS handles filtering by org_id for client_admin users
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('is_hot', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching leads:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1 text-3xl">Leads Dashboard</h1>
          <p className="text-zinc-400">Manage your WhatsApp inquiries and prioritize hot leads.</p>
        </div>
        <div className="w-full sm:w-auto flex items-center gap-2">
           <div className="relative w-full sm:w-64">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
             <Input type="search" placeholder="Search leads..." className="pl-9 bg-zinc-900 border-zinc-800 focus:ring-1 focus:ring-indigo-500" />
           </div>
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden">
        <LeadsTable leads={leads || []} />
      </Card>
    </div>
  )
}
