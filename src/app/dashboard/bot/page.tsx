import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, CheckCircle2, XCircle } from 'lucide-react'

// Mocking n8n fetching logic since we need Server Component async fetch
// In a real scenario, this fetches from N8N_BASE_URL/api/v1/executions or workflows
async function getBotStatus() {
  const apiKey = process.env.N8N_API_KEY
  const baseUrl = process.env.N8N_BASE_URL
  
  if (!apiKey || !baseUrl) {
    return { status: 'error', message: 'Bot connection not configured' }
  }

  try {
    // This is a placeholder for the actual n8n API call
    // GET /api/v1/workflows to check connectivity
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/v1/workflows`, {
      headers: { 'X-N8N-API-KEY': apiKey },
      next: { revalidate: 60 } // Check every minute
    })

    if (res.ok) {
      return { status: 'healthy', message: 'Bot is running ✓' }
    } else {
      return { status: 'error', message: 'Bot stopped — check logs for details' }
    }
  } catch (error) {
    return { status: 'error', message: 'Bot unreachable' }
  }
}

export default async function BotStatusPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const botHealth = await getBotStatus()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Bot Status</h1>
        <p className="text-zinc-400">Monitor the health and activity of your automated AI agent.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-900 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Current Status</CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {botHealth.status === 'healthy' ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              ) : (
                <XCircle className="h-8 w-8 text-red-500" />
              )}
              <div>
                <div className="text-2xl font-bold text-zinc-100">
                  {botHealth.status === 'healthy' ? 'Active' : 'Offline'}
                </div>
                <p className="text-sm text-zinc-500">{botHealth.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden mt-6">
          <CardHeader>
              <CardTitle>Recent Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-sm text-zinc-500 h-32 flex items-center justify-center border border-dashed border-zinc-800 rounded-md">
                  Detailed execution logs proxy view not yet implemented
              </div>
          </CardContent>
      </Card>
    </div>
  )
}
