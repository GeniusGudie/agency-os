'use client'

import { useActionState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(login, undefined)
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900 border border-zinc-800 p-10 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white mb-2">
            Agency-OS
          </h2>
          <p className="text-center text-sm text-zinc-400">
            Sign in to access your dealership dashboard
          </p>
        </div>
        
        {errorMessage && (
          <div className="rounded-md bg-red-500/10 p-4 border border-red-500/20">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-500">{errorMessage.error}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" action={dispatch}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 bg-zinc-950 py-3 text-zinc-100 ring-1 ring-inset ring-zinc-800 placeholder:text-zinc-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-md border-0 bg-zinc-950 py-3 text-zinc-100 ring-1 ring-inset ring-zinc-800 placeholder:text-zinc-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
