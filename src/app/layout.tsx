import type { Metadata } from 'next'
import { ProgressBarProvider } from '@/components/providers/ProgressBarProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'sAIence | AIが支える家庭菜園アシスタント',
    template: '%s | sAIence',
  },
  description: 'AI写真診断で植物の状態を即チェック、栽培スケジュールを自動生成。家庭菜園をもっと簡単・楽しく。',
  icons: {
    icon: '/app-icon.svg',
  },
  robots: {
    index: false,
    follow: false,
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
