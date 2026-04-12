'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useVegetableStore, useEventStore } from '@/lib/stores'
import { VegetableCard } from '@/features/vegetables/components/VegetableCard'
import type { Vegetable } from '@/types'

type Tab = 'active' | 'completed'

export default function GardenPage() {
  const [activeTab, setActiveTab] = useState<Tab>('active')
  const router = useRouter()

  const vegetables = useVegetableStore((s) => s.vegetables)
  const isLoading = useVegetableStore((s) => s.isLoading)
  const loadVegetables = useVegetableStore((s) => s.loadVegetables)
  const events = useEventStore((s) => s.events)
  const getEventsByVegetableId = useEventStore((s) => s.getEventsByVegetableId)
  const loadEvents = useEventStore((s) => s.loadEvents)

  useEffect(() => {
    loadVegetables()
    loadEvents()
  }, [loadVegetables, loadEvents])

  const filtered = vegetables.filter((v) =>
    activeTab === 'active' ? v.status === 'active' : v.status === 'completed',
  )

  const activeCount = vegetables.filter((v) => v.status === 'active').length
  const completedCount = vegetables.filter((v) => v.status === 'completed').length

  const getNextEvent = (vegetableId: string) => {
    const vegEvents = getEventsByVegetableId(vegetableId)
    const today = format(new Date(), 'yyyy-MM-dd')
    return vegEvents
      .filter((e) => !e.isCompleted && e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))[0]
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 className="text-[22px] font-extrabold mb-5">マイ菜園</h1>

      {/* タブ切り替え */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          栽培中
          <span
            className={`ml-1.5 text-[11px] px-1.5 py-px rounded-full ${
              activeTab === 'active'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {activeCount}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          終了済み
          <span
            className={`ml-1.5 text-[11px] px-1.5 py-px rounded-full ${
              activeTab === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {completedCount}
          </span>
        </button>
      </div>

      {/* ローディング */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 rounded-lg h-28"
            />
          ))}
        </div>
      )}

      {/* 野菜グリッド */}
      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <VegetableCard
              key={v.id}
              vegetable={v}
              nextEvent={getNextEvent(v.id)}
              onClick={() => router.push(`/vegetable/${v.id}`)}
            />
          ))}
        </div>
      )}

      {/* 0件 */}
      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">まだ野菜が登録されていません</p>
          <Link
            href="/add-vegetable"
            className="inline-flex items-center gap-1.5 bg-green-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            野菜を追加
          </Link>
        </div>
      )}
    </div>
  )
}
