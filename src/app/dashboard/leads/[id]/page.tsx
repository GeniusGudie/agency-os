import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { ConversationViewer } from '@/components/conversation-viewer'
import { LeadDetails } from '@/components/lead-details'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LeadPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch lead details
  const { data: lead } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (!lead) {
    notFound()
  }

  // Fetch initial chat history
  const { data: messages } = await supabase
    .from('agency_chat_history')
    .select('*')
    .eq('session_id', lead.session_id)
    .order('created_at', { ascending: true })

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Link 
        href="/dashboard" 
        className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-sm font-medium mb-2 group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
        <div className="overflow-y-auto pr-2 scrollbar-hide">
            {/* Lead info section */}
            <LeadDetails lead={lead} />
        </div>
        
        <div className="h-full">
            {/* Real-time chat section */}
            <ConversationViewer 
                sessionId={lead.session_id} 
                orgId={lead.org_id} 
                initialMessages={messages || []}
                customerName={lead.name || lead.phone_number}
            />
        </div>
      </div>
    </div>
  )
}
