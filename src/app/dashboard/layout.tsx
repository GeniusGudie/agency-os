import { Sidebar } from '@/components/sidebar'
import { DashboardHeader } from '@/components/dashboard-header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f3f4fd] text-slate-800 font-sans sm:pb-0 flex">
      <div className="hidden lg:block">
         <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
      </div>
    </div>
  )
}
