import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy or handle gracefully on client side
    return createBrowserClient('', '')
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
