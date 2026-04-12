import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

let _client: SupabaseClient<Database> | null = null

export function getSupabase(): SupabaseClient<Database> {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY を .env.local に設定してください')
    }
    // createBrowserClient はクッキーに PKCE verifier を保存するため
    // Next.js SSR 環境でもサーバー・クライアント間で verifier が失われない
    _client = createBrowserClient<Database>(url, key)
  }
  return _client
}
