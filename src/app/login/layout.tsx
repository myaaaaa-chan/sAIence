import type { Metadata } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://saience.app'

const title = 'sAIence | AIが支える家庭菜園アシスタント'
const description =
  'AI写真診断で植物の状態を即チェック、栽培スケジュールを自動生成。家庭菜園をもっと簡単・楽しく。'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['家庭菜園', 'AI', '栽培', '野菜', 'スケジュール', '写真診断', '植物'],
  alternates: {
    canonical: `${APP_URL}/login`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: `${APP_URL}/login`,
    siteName: 'sAIence',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
