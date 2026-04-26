import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { StoreProvider } from '@/components/providers/StoreProvider'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <StoreProvider>
        <main className="max-w-6xl mx-auto px-4 pt-4 pb-8">
          {children}
        </main>
      </StoreProvider>
    </>
  )
}
