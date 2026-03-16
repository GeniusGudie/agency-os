'use server'

import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Determine user role and redirect
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user.id)
        .single()
        
      if (adminUser?.role === 'super_admin') {
          return redirect('/admin')
      }
      return redirect('/dashboard')
  }

  return redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}
