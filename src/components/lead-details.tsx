'use client'

import { useState } from 'react'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { createClient } from '@/utils/supabase/client'
import { 
  User, 
  Phone, 
  Banknote, 
  Target, 
  Car, 
  StickyNote, 
  Calendar,
  Save,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Lead {
  id: string
  name: string
  phone_number: string
  status: string
  budget_ngn: number
  purchase_intent: string
  requested_models: string[]
  notes: string
  created_at: string
  is_hot: boolean
}

interface LeadDetailsProps {
  lead: Lead
}

export function LeadDetails({ lead: initialLead }: LeadDetailsProps) {
  const [lead, setLead] = useState<Lead>(initialLead)
  const [isSaving, setIsSaving] = useState(false)
  const [notes, setNotes] = useState(lead.notes || '')
  const [status, setStatus] = useState(lead.status)
  const supabase = createClient()

  const handleUpdate = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
            notes: notes,
            status: status,
            updated_at: new Date().toISOString()
        })
        .eq('id', lead.id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating lead:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A'
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            Lead Details
            {lead.is_hot && <Badge variant="warning">🔥 HOT</Badge>}
        </h2>
        <button 
           onClick={handleUpdate}
           disabled={isSaving}
           className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-medium border border-zinc-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <User className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Full Name</div>
                    <div className="text-zinc-100">{lead.name || 'Not Provided'}</div>
                </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <Phone className="h-5 w-5 text-indigo-400 mt-0.5" />
                <div>
                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Phone Number</div>
                    <div className="text-zinc-100">{lead.phone_number}</div>
                </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <Banknote className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Budget</div>
                    <div className="text-zinc-100 font-semibold">{formatCurrency(lead.budget_ngn)}</div>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <Target className="h-5 w-5 text-emerald-400 mt-0.5" />
                <div className="flex-1">
                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-2">Status</div>
                    <select 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm text-zinc-100 focus:ring-1 focus:ring-indigo-500 outline-none"
                    >
                        <option value="new">New</option>
                        <option value="qualifying">Qualifying</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <Car className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Requested Models</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {lead.requested_models?.length > 0 ? lead.requested_models.map(m => (
                            <Badge key={m} variant="neutral" className="text-[10px]">{m}</Badge>
                        )) : '--'}
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <Calendar className="h-5 w-5 text-zinc-400 mt-0.5" />
                <div>
                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Acquired</div>
                    <div className="text-zinc-300 text-sm">
                        {new Date(lead.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase font-bold tracking-wider">
              <StickyNote className="h-3 w-3" />
              Internal Sales Notes
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add internal notes about the customer preference..."
            className="w-full min-h-[120px] rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-sm text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600"
          />
      </div>
    </div>
  )
}
