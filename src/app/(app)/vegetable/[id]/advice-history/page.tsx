'use client'

import { use, useEffect } from 'react'
import Link from 'next/link'
import { useAdviceStore, useVegetableStore } from '@/lib/stores'
import { AdviceHistoryCard } from '@/features/photo-advice/components/AdviceHistoryCard'

export default function AdviceHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const vegetables = useVegetableStore((s) => s.vegetables)
  const loadVegetables = useVegetableStore((s) => s.loadVegetables)
  const advices = useAdviceStore((s) => s.advices)
  const isLoading = useAdviceStore((s) => s.isLoading)
  const loadAdvicesByVegetableId = useAdviceStore((s) => s.loadAdvicesByVegetableId)

  useEffect(() => {
    loadVegetables()
    loadAdvicesByVegetableId(id)
  }, [loadVegetables, loadAdvicesByVegetableId, id])

  const vegetable = vegetables.find((v) => v.id === id)
  const vegetableName = vegetable?.name ?? '野菜'

  const visibleAdvices = advices.filter((a) => !a.isDiscarded)

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* パンくず */}
      <div className="text-[13px] text-gray-700 dark:text-gray-300 mb-4">
        <Link href="/garden" className="text-green-600 hover:underline">
          マイ菜園
        </Link>
        <span className="mx-1.5">›</span>
        <Link href={`/vegetable/${id}`} className="text-green-600 hover:underline">
          {vegetableName}
        </Link>
        <span className="mx-1.5">›</span>
        <span>アドバイス履歴</span>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[22px] font-extrabold">アドバイス履歴</h1>
        <span className="text-[13px] text-gray-700 dark:text-gray-300">
          {vegetableName} | {visibleAdvices.length}件
        </span>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg h-24"
            />
          ))}
        </div>
      )}

      {!isLoading && visibleAdvices.length > 0 && (
        <div className="space-y-4">
          {visibleAdvices.map((advice) => (
            <AdviceHistoryCard key={advice.id} advice={advice} />
          ))}
        </div>
      )}

      {!isLoading && visibleAdvices.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-700 dark:text-gray-300 mb-4">まだアドバイスはありません</p>
          <Link
            href={`/vegetable/${id}`}
            className="text-green-600 hover:underline text-sm"
          >
            ← {vegetableName}に戻る
          </Link>
        </div>
      )}
    </div>
  )
}
