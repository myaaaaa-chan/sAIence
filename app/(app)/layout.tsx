import { Header } from '@/components/layout/Header'
import { StoreProvider } from '@/components/providers/StoreProvider'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <StoreProvider>
        <main className="max-w-6xl mx-auto px-4 pt-6 pb-12">
          {children}
        </main>
      </StoreProvider>
    </>
  )
}
