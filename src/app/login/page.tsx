'use client'

import { getSupabase } from '@/db/supabase-client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Sprout, CalendarDays, Camera, Sparkles, CheckCircle2, Leaf } from 'lucide-react'

// ── Feature mockups ─────────────────────────────────────────────────────────

function PhotoDiagnosisMockup() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm select-none">
      {/* Photo area with scan overlay */}
      <div className="relative bg-gradient-to-br from-green-100 to-emerald-200 h-28 flex items-center justify-center overflow-hidden">
        <span className="text-6xl">🍅</span>
        {/* Corner markers */}
        <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-green-500/70 rounded-tl" />
        <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-green-500/70 rounded-tr" />
        <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-green-500/70 rounded-bl" />
        <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-green-500/70 rounded-br" />
        {/* Scan line */}
        <div className="absolute inset-x-0 top-1/3 h-0.5 bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />
        {/* Label */}
        <div className="absolute bottom-0 inset-x-0 bg-black/35 px-2.5 py-1 flex items-center justify-between">
          <p className="text-white text-[10px] font-medium">トマト · 解析完了</p>
          <div className="flex items-center gap-1 bg-amber-400/90 rounded-full px-1.5 py-0.5">
            <span className="text-[9px] font-bold text-amber-900">要注意</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="p-3 space-y-2.5">
        <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-2">
          <p className="text-[10px] font-semibold text-amber-800 mb-0.5">診断結果</p>
          <p className="text-[10px] text-gray-600 leading-relaxed">
            葉の<span className="font-semibold text-amber-700">黄変</span>を検出。窒素不足の可能性があります。
          </p>
        </div>
        <div className="space-y-1.5">
          {['追肥（窒素系）を10日以内に実施', '水やりを朝に変更する'].map((a) => (
            <div key={a} className="flex items-center gap-1.5">
              <CheckCircle2 size={10} className="text-green-500 shrink-0" />
              <p className="text-[10px] text-gray-500">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScheduleMockup() {
  const dayLabels = ['月', '火', '水', '木', '金', '土', '日']
  // 5月1日 = 木曜 → 空白3つ
  const blanks = 3
  const totalDays = 31
  const events: Record<number, string> = {
    3: 'bg-blue-400',
    7: 'bg-green-400',
    10: 'bg-blue-400',
    15: 'bg-red-400',
    18: 'bg-blue-400',
    24: 'bg-green-400',
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm select-none p-3 space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-gray-700">2026年 5月</p>
        <div className="flex items-center gap-2 text-[9px] text-gray-400">
          <span className="flex items-center gap-0.5"><span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />水やり</span>
          <span className="flex items-center gap-0.5"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />施肥</span>
          <span className="flex items-center gap-0.5"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />収穫</span>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7">
        {dayLabels.map((d) => (
          <div key={d} className="text-center text-[9px] text-gray-400 font-medium py-0.5">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array.from({ length: blanks }).map((_, i) => <div key={`b${i}`} />)}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1
          const dot = events[day]
          const isToday = day === 3
          return (
            <div key={day} className="flex flex-col items-center py-0.5">
              <span className={`text-[9px] w-4 h-4 flex items-center justify-center rounded-full ${isToday ? 'bg-green-500 text-white font-bold' : 'text-gray-500'}`}>
                {day}
              </span>
              {dot ? <div className={`w-1 h-1 rounded-full ${dot} mt-0.5`} /> : <div className="w-1 h-1 mt-0.5" />}
            </div>
          )
        })}
      </div>

      {/* Next event chip */}
      <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-2.5 py-1.5 border border-blue-100">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
        <p className="text-[10px] text-blue-700 font-medium">次のイベント：水やり — 今日</p>
      </div>
    </div>
  )
}

function GardenMockup() {
  const vegs = [
    { emoji: '🍅', name: 'トマト', date: '5/20', statusCls: 'bg-green-100 text-green-700', label: '栽培中' },
    { emoji: '🥕', name: 'ニンジン', date: '6/5', statusCls: 'bg-amber-100 text-amber-700', label: '要注意' },
    { emoji: '🫑', name: 'ピーマン', date: '7/1', statusCls: 'bg-green-100 text-green-700', label: '栽培中' },
    { emoji: '🥬', name: 'レタス', date: '5/10', statusCls: 'bg-blue-100 text-blue-700', label: '収穫可' },
  ]

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm select-none p-3 space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-gray-700">マイ菜園</p>
        <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">4品目</span>
      </div>

      {/* Grid */}
      <div className="space-y-1.5">
        {vegs.map((v) => (
          <div key={v.name} className="bg-gray-50 rounded-lg px-2.5 py-2 border border-gray-100 flex items-center gap-2.5">
            <span className="text-xl leading-none shrink-0">{v.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-gray-700 truncate">{v.name}</p>
              <p className="text-[9px] text-gray-400">収穫 {v.date}</p>
            </div>
            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${v.statusCls}`}>
              {v.label}
            </span>
          </div>
        ))}
      </div>

      {/* Sort bar */}
      <div className="flex items-center gap-1.5">
        <p className="text-[9px] text-gray-400">並び替え：</p>
        <span className="text-[9px] bg-green-500 text-white px-2 py-0.5 rounded-full font-medium">収穫予定日</span>
        <span className="text-[9px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">追加日</span>
      </div>
    </div>
  )
}

// ── Hero mockup ──────────────────────────────────────────────────────────────

function AIAdviceMockup() {
  return (
    <div className="relative py-6 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-72 mx-auto border border-gray-100 overflow-hidden">
        {/* App bar */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-3 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">AI アドバイス</p>
            <p className="text-[10px] text-white/70">解析完了</p>
          </div>
          <div className="ml-auto bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
            要注意
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Photo */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 h-28 flex items-center justify-center">
            <span className="text-6xl">🥕</span>
            <div className="absolute bottom-2 left-2 right-2 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
              <p className="text-white text-[10px] font-medium">ニンジン · 撮影 5分前</p>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-amber-800 mb-1">診断結果</p>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              葉の<span className="font-semibold text-amber-700">黄変</span>が確認されました。窒素不足の可能性があります。速効性の追肥をおすすめします。
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">推奨アクション</p>
            {[
              '10日以内に追肥（窒素系肥料）を実施',
              '水やりを朝に変更する',
              '1週間後に再度確認する',
            ].map((action) => (
              <div key={action} className="flex items-start gap-2">
                <CheckCircle2 size={12} className="text-green-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-600 leading-tight">{action}</p>
              </div>
            ))}
          </div>

          {/* Schedule strip */}
          <div className="bg-gray-50 rounded-xl p-2.5">
            <p className="text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">栽培スケジュール</p>
            <div className="space-y-1.5">
              {[
                { color: 'bg-blue-400', label: '水やり', date: '今日' },
                { color: 'bg-green-400', label: '施肥', date: '4/30' },
                { color: 'bg-red-400', label: '収穫予定', date: '5/15' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                  <span className="text-[11px] text-gray-600 flex-1">{item.label}</span>
                  <span className="text-[11px] text-gray-400 font-medium">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute top-2 right-0 bg-white rounded-2xl shadow-lg px-3 py-2 border border-green-100">
        <p className="text-xs font-semibold text-green-600">🌱 87品目対応</p>
      </div>
      <div className="absolute bottom-2 left-0 bg-white rounded-2xl shadow-lg px-3 py-2 border border-blue-100">
        <p className="text-xs font-semibold text-blue-600">📅 AI自動スケジュール</p>
      </div>
    </div>
  )
}

// ── Misc ─────────────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const hasError = searchParams.get('error') === 'auth_failed'

  const signIn = async (provider: 'google') => {
    setLoading(true)
    setError(null)
    const { error } = await getSupabase().auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setError('ログインに失敗しました。もう一度お試しください。')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a2818] text-white overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <img src="/app-icon.svg" alt="sAIence" className="h-8 w-8" />
          <span className="font-bold text-lg tracking-tight">sAIence</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20">

        {/* ── Hero ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-green-500/15 text-green-300 text-sm font-medium px-4 py-1.5 rounded-full border border-green-500/25">
              <Sparkles size={13} />
              AI × 家庭菜園
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight">
              写真を撮るだけで<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300">
                プロ級のアドバイス
              </span>
            </h1>

            <p className="text-base text-white/55 leading-relaxed max-w-md">
              野菜の写真をAIが解析して、病気の早期発見や最適な施肥タイミングを提案。
              収穫スケジュールの自動生成で、あなたの菜園を丸ごとサポートします。
            </p>

            {/* Feature pills */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: Camera, text: '写真でAI診断' },
                { icon: CalendarDays, text: 'スケジュール自動生成' },
                { icon: Sprout, text: '87品目の野菜に対応' },
                { icon: Leaf, text: '病気・害虫の早期発見' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 bg-white/5 rounded-xl px-3 py-2.5 border border-white/8">
                  <Icon size={14} className="text-green-400 shrink-0" />
                  <span className="text-sm text-white/70">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-1 flex flex-col items-center">
              <button
                onClick={() => signIn('google')}
                disabled={loading}
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-green-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <GoogleIcon />
                ログイン
              </button>
              {(error || hasError) && (
                <p className="text-sm text-red-300">
                  {error ?? 'ログインに失敗しました。もう一度お試しください。'}
                </p>
              )}
            </div>
          </div>

          {/* Right: hero mockup */}
          <div className="hidden lg:flex items-center justify-center">
            <AIAdviceMockup />
          </div>
        </div>

        {/* ── Features ── */}
        <div className="mt-28 space-y-10">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest text-green-400/70 uppercase mb-3">Features</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              菜園管理をもっとスマートに
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {/* Card 1: AI写真診断 */}
            <div className="rounded-2xl bg-gradient-to-b from-green-500/15 to-green-500/5 border border-green-500/20 overflow-hidden flex flex-col">
              <div className="px-4 pt-4 pb-3">
                <PhotoDiagnosisMockup />
              </div>
              <div className="px-4 pb-5 pt-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Camera size={15} className="text-green-400" />
                  <h3 className="font-semibold text-white">AI写真診断</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  野菜を撮影するだけでAIが状態を解析。病気・栄養不足・害虫の早期発見から、摘芯すべき芽の選別や施肥のタイミングまで、今すべきメンテナンスを具体的にアドバイスします。
                </p>
              </div>
            </div>

            {/* Card 2: スケジュール自動生成 */}
            <div className="rounded-2xl bg-gradient-to-b from-blue-500/15 to-blue-500/5 border border-blue-500/20 overflow-hidden flex flex-col">
              <div className="px-4 pt-4 pb-3">
                <ScheduleMockup />
              </div>
              <div className="px-4 pb-5 pt-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-blue-400" />
                  <h3 className="font-semibold text-white">スケジュール自動生成</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  植え付け日を入力するだけで、収穫・施肥・水やりの予定をAIが自動で組みます。
                </p>
              </div>
            </div>

            {/* Card 3: マイ菜園管理 */}
            <div className="rounded-2xl bg-gradient-to-b from-emerald-500/15 to-emerald-500/5 border border-emerald-500/20 overflow-hidden flex flex-col">
              <div className="px-4 pt-4 pb-3">
                <GardenMockup />
              </div>
              <div className="px-4 pb-5 pt-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Sprout size={15} className="text-emerald-400" />
                  <h3 className="font-semibold text-white">マイ菜園管理</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  育てている野菜を一元管理。収穫予定日や作業履歴をいつでも確認できます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-20 text-center space-y-5">
          <button
            onClick={() => signIn('google')}
            disabled={loading}
            className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-green-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            ログイン
          </button>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-6 text-center">
        <p className="text-xs text-white/25">© 2026 sAIence. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
