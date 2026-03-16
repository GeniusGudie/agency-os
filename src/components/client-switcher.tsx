'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Organization {
  org_id: string
  name: string
}

interface ClientSwitcherProps {
  organizations: Organization[]
  currentOrgId?: string
}

export function ClientSwitcher({ organizations, currentOrgId }: ClientSwitcherProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const currentOrg = organizations.find((o) => o.org_id === currentOrgId)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-64 items-center justify-between rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2 truncate">
          <Building2 className="h-4 w-4 text-zinc-400" />
          <span className="truncate">{currentOrg?.name || 'Switch Dealership'}</span>
        </div>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
      </button>

      {open && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-11 z-20 w-64 rounded-md border border-zinc-800 bg-zinc-900 p-1 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 py-1.5 border-b border-zinc-800 mb-1">
              Select Client
            </div>
            <div className="max-h-60 overflow-y-auto scrollbar-hide">
              {organizations.map((org) => (
                <button
                  key={org.org_id}
                  onClick={() => {
                      // Logic to switch to client dashboard would go here
                      // In a real app we might update a session cookie or redirect to an org-prefixed route
                      router.push(`/admin/clients/${org.org_id}`)
                      setOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm text-zinc-300 hover:bg-indigo-600 hover:text-white transition-colors",
                    currentOrgId === org.org_id && "text-zinc-100 font-medium"
                  )}
                >
                  <span className="truncate">{org.name}</span>
                  {currentOrgId === org.org_id && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
