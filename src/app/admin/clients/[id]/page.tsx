import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { LeadsTable } from '@/components/leads-table'
import { Card } from '@/components/ui/card'
import { Activity, ExternalLink, Settings } from 'lucide-react'

export default async function ClientPerspectivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch organization
  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('org_id', id)
    .single()

  if (!org) notFound()

  // Fetch leads for this specific organization
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .eq('org_id', id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{org.name}</h2>
            <p className="text-sm text-zinc-500 flex items-center gap-1">
                Client ID: <code className="text-zinc-400 text-[11px] bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{org.org_id}</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <a 
              href={process.env.N8N_BASE_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 px-4 py-2 rounded-md font-medium transition-all text-sm"
           >
              <ExternalLink className="h-4 w-4" />
              Open n8n Instance
           </a>
           <button className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-md transition-colors">
              <Settings className="h-4 w-4" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-zinc-950 border-zinc-800 p-4">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Webhook Status</div>
              <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-zinc-200">Listening for leads</span>
              </div>
          </Card>
          
          <Card className="bg-zinc-950 border-zinc-800 p-4">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Bot Connection</div>
              <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-zinc-200">Connected to workflow</span>
              </div>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800 p-4">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Live Leads</div>
              <div className="text-2xl font-bold text-indigo-400">{leads?.length || 0}</div>
          </Card>
      </div>

      <div className="mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Client Leads</h3>
          <Card className="border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden">
             <LeadsTable leads={leads || []} />
          </Card>
      </div>
    </div>
  )
}
