'use client'

import { useEffect } from 'react'
import { useVegetableStore, useEventStore } from '@/lib/stores'
import { getSupabase } from '@/db/supabase-client'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const loadVegetables = useVegetableStore((s) => s.loadVegetables)
  const loadEvents = useEventStore((s) => s.loadEvents)

  useEffect(() => {
    const supabase = getSupabase()

    // 初回ロード
    loadVegetables()
    loadEvents()

    // 認証状態変化を監視：ログイン時にリロード、ログアウト時はMiddlewareがリダイレクト
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        loadVegetables()
        loadEvents()
      }
    })

    return () => subscription.unsubscribe()
  }, [loadVegetables, loadEvents])

  return <>{children}</>
}
