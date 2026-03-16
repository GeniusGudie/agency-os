'use server'

import { createClient } from '@/utils/supabase/server'

export async function getDashboardStats(orgId: string = '99autos') {
  const supabase = await createClient()

  // Total Leads
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('org_id', orgId)

  // Hot Leads
  const { count: hotLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('org_id', orgId)
    .eq('is_hot', true)

  // Recent leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .eq('org_id', orgId)
    .order('updated_at', { ascending: false })
    .limit(10)

  // Success Rate (Placeholder logic: Qualified / Total)
  const { count: qualifiedLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('org_id', orgId)
    .eq('status', 'Qualified')

  const successRate = totalLeads ? (qualifiedLeads! / totalLeads!) * 100 : 0

  return {
    totalLeads: totalLeads || 0,
    hotLeads: hotLeads || 0,
    recentLeads: recentLeads || [],
    successRate: successRate.toFixed(1) + '%'
  }
}

export async function getBotStatus(orgId: string = '99autos') {
  const supabase = await createClient()

  // Deriving bot status from last message activity
  const { data: lastMessage } = await supabase
    .from('agency_chat_history')
    .select('created_at')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })
    .limit(1)

  if (!lastMessage || lastMessage.length === 0) {
    return { status: 'stopped', lastActive: 'Never' }
  }

  const lastTime = new Date(lastMessage[0].created_at).getTime()
  const now = new Date().getTime()
  const diffMinutes = (now - lastTime) / (1000 * 60)

  // If active in last 60 mins, consider running
  const status = diffMinutes < 60 ? 'running' : 'stopped'
  
  return {
    status,
    lastActive: diffMinutes < 1 ? 'Just now' : `${Math.floor(diffMinutes)} mins ago`
  }
}

export async function getLeadHistory(orgId: string = '99autos') {
  const supabase = await createClient()
  
  // Fetch leads grouped by day (simplified: last 7 days)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const history = []
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dayName = days[d.getDay()]
    const dateStr = d.toISOString().split('T')[0]
    
    const { count } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('org_id', orgId)
      .gte('created_at', `${dateStr}T00:00:00Z`)
      .lte('created_at', `${dateStr}T23:59:59Z`)
      
    history.push({ name: dayName, leads: count || 0 })
  }
  
  return history
}

export async function getOrganizations() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('organizations')
    .select('*')
    .eq('is_active', true)
    
  return data || []
}
