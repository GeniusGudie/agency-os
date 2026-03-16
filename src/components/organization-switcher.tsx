import { useState, useEffect } from 'react'
import { 
  Check, 
  ChevronsUpDown, 
  Building2, 
  PlusCircle,
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { createClient } from '@/utils/supabase/client'

export function OrganizationSwitcher() {
  const [open, setOpen] = useState(false)
  const [organizations, setOrganizations] = useState<any[]>([])
  const [selectedOrg, setSelectedOrg] = useState<any>({ id: 'all', name: 'Global Network' })
  const supabase = createClient()

  useEffect(() => {
    async function fetchOrgs() {
      const { data } = await supabase
        .from('organizations')
        .select('*')
        .eq('is_active', true)
      
      if (data) {
        setOrganizations([{ id: 'all', name: 'Global Network' }, ...data])
      }
    }
    fetchOrgs()
  }, [supabase])

  const displayOrgs = organizations.length > 0 ? organizations : [
    { id: 'all', name: 'Global Network' },
    { id: 'dealership_1', name: 'Lagos Premium Motors' },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="w-full flex items-center justify-between px-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all text-left shadow-xl group"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-0.5">Active Client</p>
              <p className="text-sm font-bold text-zinc-100 truncate tracking-tight">{selectedOrg.name}</p>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-zinc-600 flex-shrink-0 ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-2 bg-zinc-950 border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="px-2 pb-2 mb-2 border-b border-zinc-800 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-600" />
            <input 
                type="text" 
                placeholder="Search clients..." 
                className="bg-transparent border-none text-[10px] font-bold text-zinc-400 placeholder:text-zinc-600 focus:ring-0 w-full"
            />
        </div>
        
        <div className="space-y-1">
          {displayOrgs.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                setSelectedOrg(org)
                setOpen(false)
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all",
                selectedOrg.id === org.id 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
              )}
            >
              <span className="truncate">{org.name}</span>
              {selectedOrg.id === org.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-zinc-800">
            <button className="w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-100 transition-colors">
                <PlusCircle className="w-3.5 h-3.5" />
                Add New Dealership
            </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
