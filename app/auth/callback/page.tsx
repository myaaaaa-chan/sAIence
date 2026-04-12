'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/db/supabase-client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = getSupabase()

    // Middleware が PKCE コード交換を処理済みのため、
    // セッション確立イベントを待って遷移するだけでよい
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.replace('/')
      }
    })

    // すでにセッションがある場合は即座にリダイレクト
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <div className="text-3xl">🌱</div>
        <p className="text-sm text-gray-500">ログイン処理中...</p>
      </div>
    </div>
  )
}
