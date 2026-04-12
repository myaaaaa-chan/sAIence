'use client'

import { format, isToday, isTomorrow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Card, EventTypeBadge } from '@/components/ui'
import type { CultivationEvent } from '@/types'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const

const EVENT_TYPE_COLORS: Record<string, string> = {
  fertilizing: '#4CAF50',
  pinching: '#FF9800',
  harvesting: '#F44336',
  watering: '#2196F3',
  other: '#9E9E9E',
}

interface DayEventsProps {
  date: Date
  events: CultivationEvent[]
  onEventClick?: (event: CultivationEvent) => void
}

function getDateLabel(date: Date): string {
  if (isToday(date)) return '今日'
  if (isTomorrow(date)) return '明日'
  return ''
}

export function DayEvents({ date, events, onEventClick }: DayEventsProps) {
  const dayOfWeek = WEEKDAYS[date.getDay()]
  const dateTitle = format(date, 'M月d日', { locale: ja })
  const dateLabel = getDateLabel(date)

  return (
    <Card>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-lg font-bold text-gray-800">
            {dateTitle}
            <span className="text-gray-500 font-normal">({dayOfWeek})</span>
          </div>
          {dateLabel && (
            <div className="text-xs text-gray-500">{dateLabel}</div>
          )}
        </div>
        {events.length > 0 && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {events.length}件
          </span>
        )}
      </div>

      {/* イベントリスト */}
      {events.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          この日はイベントがありません
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {events.map(event => (
            <button
              key={event.id}
              type="button"
              onClick={() => onEventClick?.(event)}
              className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                event.isCompleted ? 'opacity-50' : ''
              }`}
            >
              {/* カラーバー */}
              <div
                className="w-1 h-10 rounded-full shrink-0"
                style={{ backgroundColor: EVENT_TYPE_COLORS[event.type] ?? '#9E9E9E' }}
              />

              {/* イベント情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <EventTypeBadge type={event.type} />
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {event.title}
                  </span>
                </div>
                {event.description && (
                  <p className="text-xs text-gray-500 truncate">{event.description}</p>
                )}
              </div>

              {/* 完了チェック */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs ${
                  event.isCompleted
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300'
                }`}
              >
                {event.isCompleted && '✓'}
              </div>
            </button>
          ))}
        </div>
      )}
    </Card>
  )
}
