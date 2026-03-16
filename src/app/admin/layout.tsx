import { createClient } from '@/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { ClientSwitcher } from '@/components/client-switcher'
import { Activity, LogOut } from 'lucide-react'
import Link from 'next/link'
import { logout } from '@/app/login/actions'

function SignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="p-2 text-zinc-400 hover:text-white transition-colors"
        title="Sign out"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </form>
  )
}

export default async function AdminLayout({
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

  if (!adminUser || adminUser.role !== 'super_admin') {
     notFound()
  }

  // Fetch organizations for the switcher
  const { data: orgs } = await supabase
    .from('organizations')
    .select('org_id, name')
    .order('name')

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex shrink-0 items-center gap-2">
                <div className="bg-indigo-600 p-1 rounded">
                    <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-zinc-100 tracking-tight">Agency-OS <span className="text-zinc-500 font-medium text-sm ml-1 px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800 uppercase tracking-tighter">Admin</span></span>
              </Link>
              
              <div className="hidden md:block">
                <ClientSwitcher organizations={orgs || []} />
              </div>
            </div>

            <div className="flex items-center gap-4">
               <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
