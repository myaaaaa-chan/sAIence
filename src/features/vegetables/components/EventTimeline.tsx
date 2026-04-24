'use client'

import { format, parseISO, compareAsc } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { EventTypeBadge } from '@/components/ui'
import type { CultivationEvent } from '@/types'

interface EventTimelineProps {
  events: CultivationEvent[]
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
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
    <div className="space-y-6">
      {Array.from(grouped.entries()).map(([dateKey, dateEvents]) => (
        <div key={dateKey}>
          <h4 className="text-sm font-semibold text-gray-500 mb-2">
            {format(parseISO(dateKey), 'M月d日')}
          </h4>
          <div className="space-y-2">
            {dateEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={event.isCompleted}
                  onChange={() => onToggleComplete(event.id)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer mt-0.5"
                />
                <span className="w-14 flex-shrink-0 flex justify-center mt-0.5">
                  <EventTypeBadge type={event.type} />
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm ${
                      event.isCompleted ? 'line-through text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {event.title}
                  </span>
                  {event.description && (
                    <p className="text-xs text-gray-500 mt-0.5">{event.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onDelete(event.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer mt-0.5"
                  aria-label="削除"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
