'use client'

import { format, parseISO, compareAsc } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { EventTypeBadge } from '@/components/ui'
import type { CultivationEvent, EventType } from '@/types'

interface EventTimelineProps {
  events: CultivationEvent[]
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}

const DOT_COLOR: Record<EventType, string> = {
  fertilizing: 'bg-[#4CAF50]',
  pinching:    'bg-[#FF9800]',
  harvesting:  'bg-[#F44336]',
  watering:    'bg-[#2196F3]',
  other:       'bg-[#9E9E9E]',
}

function groupEventsByDate(events: CultivationEvent[]): Map<string, CultivationEvent[]> {
  const sorted = [...events].sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
  const groups = new Map<string, CultivationEvent[]>()

  for (const event of sorted) {
    const dateKey = event.date.slice(0, 10)
    const existing = groups.get(dateKey)
    if (existing) {
      existing.push(event)
    } else {
      groups.set(dateKey, [event])
    }
  }

  return groups
}

export function EventTimeline({ events, onToggleComplete, onDelete }: EventTimelineProps) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-8">
        スケジュールがありません
      </p>
    )
  }

  const grouped = groupEventsByDate(events)

  return (
    <div className="space-y-5">
      {Array.from(grouped.entries()).map(([dateKey, dateEvents]) => (
        <div key={dateKey}>
          <h4 className="text-base font-semibold text-gray-600 mb-2">
            {format(parseISO(dateKey), 'M月d日')}
          </h4>

          {/* 縦線 + イベントリスト */}
          <div className="relative ml-2 border-l-2 border-gray-200 pl-5 space-y-2">
            {dateEvents.map((event) => (
              <div key={event.id} className="relative">
                {/* タイプカラーのドット */}
                <div
                  className={`absolute -left-[1.4375rem] top-[0.6rem] w-3 h-3 rounded-full ring-2 ring-white ${DOT_COLOR[event.type]}`}
                />

                <div className="flex items-start gap-3 py-1.5 px-2 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={event.isCompleted}
                    onChange={() => onToggleComplete(event.id)}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer mt-0.5 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <EventTypeBadge type={event.type} />
                      <span
                        className={`text-base ${
                          event.isCompleted ? 'line-through text-gray-400' : 'text-gray-900'
                        }`}
                      >
                        {event.title}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-500 mt-0.5 ml-0.5">{event.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer mt-0.5 shrink-0"
                    aria-label="削除"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
