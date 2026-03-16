import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { TopNav } from '@/components/top-nav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!adminUser || adminUser.role !== 'client_admin') {
      if(adminUser?.role === 'super_admin') {
          redirect('/admin')
      }
      
      console.warn('Unauthorized access attempt to /dashboard. User:', user.email, 'Role:', adminUser?.role)
      return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-500">Unauthorized</h1>
            <p className="text-zinc-400">Your account does not have access to this dashboard.</p>
            <form action="/login" method="GET">
               <button type="submit" className="text-indigo-400 hover:text-indigo-300 underline">Return to Login</button>
            </form>
          </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans pb-16 sm:pb-0">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
