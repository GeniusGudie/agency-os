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
      redirect('/login')
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
