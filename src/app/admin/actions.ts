'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createOrganization(formData: FormData) {
  const name = formData.get('name') as string
  const supabase = await createClient()

  // Generate org_id slug from name
  const org_id = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 20)

  // Generate n8n webhook URL
  // We use n8n base url and the slug
  const baseUrl = process.env.N8N_BASE_URL?.replace(/\/$/, '')
  const webhookUrl = `${baseUrl}/webhook/agency-os/${org_id}`

  const { data, error } = await supabase
    .from('organizations')
    .insert({
      name,
      org_id,
      n8n_webhook_url: webhookUrl,
      is_active: true
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating organization:', error.message)
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true, organization: data }
}
