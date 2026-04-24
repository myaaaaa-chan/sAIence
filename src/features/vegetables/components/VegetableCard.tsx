'use client'

import { format, parseISO } from 'date-fns'
import { Card } from '@/components/ui'
import { EventTypeBadge } from '@/components/ui'
import type { Vegetable, CultivationEvent } from '@/types'

interface VegetableCardProps {
  vegetable: Vegetable
  nextEvent?: CultivationEvent
  harvestDate?: string
  onClick: () => void
}

export function VegetableCard({ vegetable, nextEvent, harvestDate, onClick }: VegetableCardProps) {
  const isCompleted = vegetable.status === 'completed'

  return (
    <Card
      className={`cursor-pointer transition-shadow hover:shadow-md ${isCompleted ? 'opacity-60' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold">{vegetable.name}</h3>
          <p className="text-sm text-gray-500">{vegetable.category}</p>
        </div>
        {isCompleted && (
          <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
            収穫完了
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
        <span>植付日: {format(parseISO(vegetable.plantedDate), 'yyyy年M月d日')}</span>
        {harvestDate && !isCompleted && (
          <span>収穫予定: {format(parseISO(harvestDate), 'yyyy年M月d日')}</span>
        )}
      </div>

      {nextEvent && !isCompleted && (
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          <span>次のイベント:</span>
          <EventTypeBadge type={nextEvent.type} />
          <span>{format(parseISO(nextEvent.date), 'M月d日')}</span>
        </div>
      )}
    </Card>
  )
}
