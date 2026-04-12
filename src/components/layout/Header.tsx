'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Leaf, Settings, Plus, LogOut } from 'lucide-react'
import { getSupabase } from '@/db/supabase-client'

const navLinks = [
  { href: '/', label: 'ホーム', icon: Home },
  { href: '/garden', label: 'マイ菜園', icon: Leaf },
  { href: '/settings', label: '設定', icon: Settings },
] as const

export function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await getSupabase().auth.signOut()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-full">
        <Link
          href="/"
          className="flex items-center gap-2 whitespace-nowrap no-underline"
        >
          <img src="/app-icon.svg" alt="sAIence" className="h-8 w-8" />
          <span className="text-lg font-bold text-green-700 hidden sm:inline">sAIence</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-colors no-underline ${
                  isActive
                    ? 'border-b-2 border-green-600 font-semibold text-green-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/add-vegetable"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 no-underline whitespace-nowrap transition-colors"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden md:inline">野菜を追加</span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="ログアウト"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
