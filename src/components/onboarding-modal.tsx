'use client'

import { useState } from 'react'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  Globe, 
  Link as LinkIcon, 
  ArrowRight, 
  CheckCircle2, 
  Terminal,
  Copy
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function OnboardingModal() {
  const [step, setStep] = useState(1)
  const [dealershipName, setDealershipName] = useState('')
  const [slug, setSlug] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setDealershipName(val)
    setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="indigo" size="xl" className="w-full uppercase tracking-widest font-black">
          Add New Client 🏎️
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 sm:max-w-[480px] p-0 overflow-hidden rounded-3xl">
        <div className="bg-indigo-600 h-1.5 w-full"></div>
        <div className="p-8">
            <DialogHeader className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Building2 className="w-4 h-4" />
                </div>
                <DialogTitle className="text-2xl font-black uppercase tracking-tight">Onboard Dealership</DialogTitle>
              </div>
              <DialogDescription className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                Step {step} of 2 • Client Initialization
              </DialogDescription>
            </DialogHeader>

            {step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Dealership Identity</label>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <Input 
                            value={dealershipName}
                            onChange={handleNameChange}
                            placeholder="e.g. Lagos Premium Motors" 
                            className="bg-zinc-900 border-zinc-800 h-14 pl-12 rounded-2xl text-sm placeholder:text-zinc-700 focus:ring-indigo-500/20"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Dashboard URL Slug</label>
                    <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <Input 
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="lagos-premium-motors" 
                            className="bg-zinc-900 border-zinc-800 h-14 pl-12 rounded-2xl text-sm text-indigo-400 font-bold placeholder:text-zinc-700 focus:ring-indigo-500/20"
                        />
                    </div>
                    <p className="text-[9px] text-zinc-600 font-bold px-1 italic">Shared Link: agency-os.io/portal/{slug || '...'}</p>
                </div>

                <Button 
                    onClick={() => setStep(2)}
                    disabled={!dealershipName}
                    className="w-full h-14 bg-zinc-100 hover:bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all disabled:opacity-50"
                >
                    Provision Workspace <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                 <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-zinc-100 mb-1">Database Shard Ready</h4>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-relaxed">
                            New organization ID generated. Multi-tenancy isolation policies applied.
                        </p>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">n8n Webhook Connection</label>
                        <span className="text-[9px] text-indigo-400 font-black cursor-pointer hover:underline">Documentation</span>
                    </div>
                    <div className="relative group">
                         <div className="absolute inset-0 bg-indigo-500/5 blur-xl group-hover:bg-indigo-500/10 transition-all"></div>
                         <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <Terminal className="w-4 h-4 text-zinc-600 shrink-0" />
                                <code className="text-xs font-mono text-zinc-400 truncate">https://n8n.agency.io/v1/hooks/{slug}</code>
                            </div>
                            <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                         </div>
                    </div>
                    <p className="text-[9px] text-zinc-600 font-bold px-1">
                        Paste this into your WhatsApp Bot workflow to start syncing leads.
                    </p>
                 </div>

                 <Button 
                    onClick={() => window.location.reload()}
                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all"
                >
                    Go to {dealershipName} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
