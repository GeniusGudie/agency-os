'use client'

import { useState } from 'react'
import { createOrganization } from './actions'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Loader2, X } from 'lucide-react'

export function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newOrg, setNewOrg] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    const result = await createOrganization(formData)
    if (result.success) {
      setNewOrg(result.organization)
    }
    setIsSubmitting(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {!newOrg ? (
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Add New Dealership</h2>
              <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Dealership Display Name</label>
                <Input 
                   name="name" 
                   placeholder="e.g. Abuja Motors" 
                   required 
                   className="bg-zinc-950 border-zinc-800 h-12 text-lg"
                />
                <p className="text-[10px] text-zinc-500 italic">This will generate a URL-safe slug (org_id) automatically.</p>
              </div>
            </div>

            <div className="p-6 bg-zinc-950/50 rounded-b-2xl flex justify-end gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md font-semibold transition-colors flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Creating...' : 'Create Dealership'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 space-y-6 text-center">
            <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="h-8 w-8" />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-white mb-2">Setup Successful!</h2>
               <p className="text-zinc-400">Dealership <span className="text-zinc-100 font-semibold">{newOrg.name}</span> has been created.</p>
            </div>

            <Card className="bg-zinc-950 border-emerald-500/30 text-left">
              <CardContent className="p-4 space-y-3">
                 <div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase">Organization ID</div>
                    <div className="text-zinc-200 font-mono text-sm">{newOrg.org_id}</div>
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase">n8n Webhook URL</div>
                    <div className="flex items-center gap-2 mt-1">
                       <code className="text-[11px] bg-zinc-900 border border-zinc-800 p-2 rounded flex-1 truncate text-zinc-400">
                          {newOrg.n8n_webhook_url}
                       </code>
                       <button 
                          onClick={() => copyToClipboard(newOrg.n8n_webhook_url)}
                          className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                       >
                          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                       </button>
                    </div>
                 </div>
              </CardContent>
            </Card>

            <button 
                onClick={onClose}
                className="w-full bg-zinc-100 hover:bg-white text-zinc-950 px-6 py-3 rounded-md font-bold transition-colors"
            >
                Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
