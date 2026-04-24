'use client'

import NextTopLoader from 'nextjs-toploader'

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader
        color="#4ade80"
        height={3}
        showSpinner={false}
      />
      {children}
    </>
  )
}
