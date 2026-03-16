'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { OnboardingModal } from './onboarding-modal'

export function AdminDashboardClient({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Agency Overview</h1>
          <p className="text-zinc-400">Manage all dealership clients and system-wide performance.</p>
        </div>
        <button 
          onClick={() => setShowOnboarding(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md font-semibold transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Add Dealership
        </button>
      </div>

      {children}

      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
    </>
  )
}
