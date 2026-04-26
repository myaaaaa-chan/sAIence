import type { Metadata } from 'next'
import { ProgressBarProvider } from '@/components/providers/ProgressBarProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'sAIence',
  description: '家庭菜園AIアシスタント',
  icons: {
    icon: '/app-icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </body>
    </html>
  )
}
