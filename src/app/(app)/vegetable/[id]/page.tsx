'use client'

import { use, useState, useEffect, useCallback, useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Camera, Clock, Trash2 } from 'lucide-react'
import { useVegetableStore, useEventStore, useAdviceStore } from '@/lib/stores'
import { EventTimeline } from '@/features/vegetables/components/EventTimeline'
import { PhotoAdviceDialog } from '@/features/photo-advice/components/PhotoAdviceDialog'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { Advice } from '@/types'

export default function VegetablePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const [photoAdviceOpen, setPhotoAdviceOpen] = useState(false)

  const vegetables = useVegetableStore((s) => s.vegetables)
  const loadVegetables = useVegetableStore((s) => s.loadVegetables)
  const completeVegetable = useVegetableStore((s) => s.completeVegetable)
  const removeVegetable = useVegetableStore((s) => s.removeVegetable)

  const events = useEventStore((s) => s.events)
  const loadEvents = useEventStore((s) => s.loadEvents)
  const getEventsByVegetableId = useEventStore((s) => s.getEventsByVegetableId)
  const toggleEventCompletion = useEventStore((s) => s.toggleEventCompletion)
  const removeEvent = useEventStore((s) => s.removeEvent)

  const loadAdvicesByVegetableId = useAdviceStore((s) => s.loadAdvicesByVegetableId)
  const addAdvice = useAdviceStore((s) => s.addAdvice)
  const canAdviceToday = useAdviceStore((s) => s.canAdviceToday)

  const handleSaveAdvice = useCallback(
    (advice: Omit<Advice, 'id' | 'createdAt' | 'isDiscarded'>) => {
      addAdvice({ ...advice, isDiscarded: false })
    },
    [addAdvice],
  )

  useEffect(() => {
    loadVegetables()
    loadEvents()
    loadAdvicesByVegetableId(id)
  }, [loadVegetables, loadEvents, loadAdvicesByVegetableId, id])

  const vegetable = vegetables.find((v) => v.id === id)
  const vegEvents = getEventsByVegetableId(id)

  const handleComplete = useCallback(async () => {
    if (!window.confirm('栽培を終了しますか？')) return
    await completeVegetable(id)
  }, [completeVegetable, id])

  const handleDelete = useCallback(async () => {
    if (!window.confirm('この野菜を削除しますか？この操作は元に戻せません。')) return
    await removeVegetable(id)
    router.push('/garden')
  }, [removeVegetable, id, router])

  const handleDeleteEvent = useCallback(
    async (eventId: string) => {
      if (!window.confirm('このイベントを削除しますか？')) return
      await removeEvent(eventId)
    },
    [removeEvent],
  )

  if (!vegetable) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">野菜が見つかりません</p>
        <Link
          href="/garden"
          className="text-green-600 hover:underline text-sm"
        >
          マイ菜園に戻る
        </Link>
      </div>
    )
  }

  const isActive = vegetable.status === 'active'

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* パンくず */}
      <div className="text-[13px] text-gray-500 mb-4">
        <Link href="/garden" className="text-green-600 hover:underline">
          マイ菜園
        </Link>
        <span className="mx-1.5">›</span>
        <span>{vegetable.name}</span>
      </div>

      {/* ヘッダーカード */}
      <Card className="mb-5">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-xl font-bold">{vegetable.name}</h1>
          <div className="flex gap-2">
            {isActive ? (
              <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                栽培中
              </span>
            ) : (
              <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                終了済み
              </span>
            )}
            {vegetable.cultivationMethod && (
              <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {vegetable.cultivationMethod}
              </span>
            )}
          </div>
        </div>

        <div className="text-[13px] text-gray-500 mt-2">
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            <span>カテゴリ: {vegetable.category}</span>
            <span>植付: {format(parseISO(vegetable.plantedDate), 'M月d日')}</span>
            {vegetable.brand && <span>品種: {vegetable.brand}</span>}
            {vegetable.region && <span>地域: {vegetable.region}</span>}
          </div>
          {vegetable.memo && <p className="mt-1">{vegetable.memo}</p>}
        </div>
      </Card>

      {/* アクションボタン */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex flex-col gap-1">
          <Button
            variant="primary"
            onClick={() => setPhotoAdviceOpen(true)}
            disabled={!canAdviceToday(id)}
          >
            <Camera size={16} />
            写真AIアドバイス
          </Button>
          {!canAdviceToday(id) && (
            <p className="text-xs text-gray-500">本日のアドバイス上限に達しました</p>
          )}
        </div>
        <Link
          href={`/vegetable/${id}/advice-history`}
          className="inline-flex items-center gap-1.5 bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
        >
          <Clock size={16} />
          アドバイス履歴
        </Link>
      </div>

      {/* タイムライン */}
      <Card className="mb-5">
        <h2 className="text-base font-bold mb-4">栽培スケジュール</h2>
        <EventTimeline
          events={vegEvents}
          onToggleComplete={toggleEventCompletion}
          onDelete={handleDeleteEvent}
        />
      </Card>

      {/* 栽培終了・削除 */}
      <div className="space-y-3 mt-5">
        {isActive && (
          <Button
            variant="danger"
            className="w-full"
            onClick={handleComplete}
          >
            栽培を終了する
          </Button>
        )}
        <Button
          variant="ghost"
          className="w-full text-red-500 hover:bg-red-50"
          onClick={handleDelete}
        >
          <Trash2 size={16} />
          削除
        </Button>
      </div>

      {/* 写真アドバイスDialog */}
      <PhotoAdviceDialog
        open={photoAdviceOpen}
        onClose={() => setPhotoAdviceOpen(false)}
        vegetableId={id}
        vegetableName={vegetable.name}
        onSave={handleSaveAdvice}
      />
    </div>
  )
}
