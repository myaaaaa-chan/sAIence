'use client'

import { format, parseISO } from 'date-fns'
import { Card } from '@/components/ui'
import { EventTypeBadge } from '@/components/ui'
import { getVegetableIconNode } from '@/components/ui/VegetableIcon'
import type { Vegetable, CultivationEvent } from '@/types'

interface VegetableCardProps {
  vegetable: Vegetable
  nextEvent?: CultivationEvent
  harvestDate?: string
  onClick: () => void
}

export function VegetableCard({ vegetable, nextEvent, harvestDate, onClick }: VegetableCardProps) {
  const isCompleted = vegetable.status === 'completed'
  const icon = getVegetableIconNode(vegetable.name, vegetable.category)

  return (
    <Card
      className={`cursor-pointer transition-shadow hover:shadow-md ${isCompleted ? 'opacity-60' : ''}`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className="shrink-0 w-11 h-11 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-baseline gap-2 min-w-0">
              <h3 className="text-base font-semibold truncate">{vegetable.name}</h3>
              <span className="text-xs text-gray-600 dark:text-gray-400 shrink-0">{vegetable.category}</span>
            </div>
            {isCompleted && (
              <span className="ml-2 shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                収穫完了
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-700 dark:text-gray-300">
            <span>植付: {format(parseISO(vegetable.plantedDate), 'M月d日')}</span>
            {harvestDate && !isCompleted && (
              <span>収穫: {format(parseISO(harvestDate), 'M月d日')}</span>
            )}
          </div>

          {nextEvent && !isCompleted && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-700 dark:text-gray-300">
              <span>次:</span>
              <EventTypeBadge type={nextEvent.type} />
              <span>{format(parseISO(nextEvent.date), 'M月d日')}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
