import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Flame } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  phone_number: string
  status: string
  budget_ngn: number
  purchase_intent: string
  created_at: string
  is_hot: boolean
}

interface LeadsTableProps {
  leads: Lead[]
  basePath?: string
}

export function LeadsTable({ leads, basePath = '/dashboard/leads' }: LeadsTableProps) {
  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A'
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return <Badge variant="neutral">New</Badge>
      case 'qualifying': return <Badge variant="warning">Qualifying</Badge>
      case 'qualified': return <Badge variant="success">Qualified</Badge>
      case 'lost': return <Badge variant="danger">Lost</Badge>
      default: return <Badge variant="default">{status}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader className="bg-zinc-950/50">
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Budget (₦)</TableHead>
          <TableHead className="hidden md:table-cell">Intent</TableHead>
          <TableHead className="hidden sm:table-cell text-right text-zinc-500 uppercase text-[10px] font-bold">Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(!leads || leads.length === 0) && (
          <TableRow>
            <TableCell colSpan={5} className="h-48 text-center text-zinc-500">
              <div className="flex flex-col items-center justify-center space-y-3">
                <p>No leads found yet.</p>
              </div>
            </TableCell>
          </TableRow>
        )}
        {leads?.map((lead) => (
          <TableRow 
            key={lead.id} 
            className={`group cursor-pointer hover:bg-zinc-800/50 transition-colors ${lead.is_hot ? 'border-l-2 border-l-amber-500 bg-amber-500/5' : ''}`}
          >
            <TableCell className="font-medium">
              <Link href={`${basePath}/${lead.id}`} className="block w-full h-full">
              <div className="flex items-center gap-2">
                {lead.is_hot && <Flame className="h-4 w-4 text-amber-500 flex-shrink-0" />}
                <div>
                  <div className="text-zinc-100">{lead.name || 'Unknown User'}</div>
                  <div className="text-xs text-zinc-500 font-mono tracking-tighter">{lead.phone_number}</div>
                </div>
              </div>
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`${basePath}/${lead.id}`} className="block w-full h-full">
                {getStatusBadge(lead.status)}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`${basePath}/${lead.id}`} className="block w-full h-full">
                <span className={lead.is_hot ? 'text-amber-400 font-medium' : 'text-zinc-300'}>
                    {formatCurrency(lead.budget_ngn)}
                </span>
              </Link>
            </TableCell>
            <TableCell className="hidden md:table-cell">
               <Link href={`${basePath}/${lead.id}`} className="block w-full h-full text-zinc-400 capitalize text-xs">
                  {lead.purchase_intent?.replace('_', ' ') || '-'}
               </Link>
            </TableCell>
            <TableCell className="hidden sm:table-cell text-right">
               <Link href={`${basePath}/${lead.id}`} className="block w-full h-full text-zinc-500 text-[11px]">
                  {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
               </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
