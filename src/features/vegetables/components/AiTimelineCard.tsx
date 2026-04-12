'use client'

import { format, parseISO } from 'date-fns'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { EventTypeBadge } from '@/components/ui'
import type { EventType } from '@/types'

interface AiTimelineEvent {
  date: string
  title: string
  type: EventType
  description?: string
}

interface AiTimelineCardProps {
  events: AiTimelineEvent[]
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function AiTimelineCard({ events, onConfirm, onCancel, isLoading }: AiTimelineCardProps) {
  return (
    <Card>
      <h3 className="text-base font-semibold mb-3">AIスケジュール提案</h3>

      <div className="max-h-80 overflow-y-auto space-y-3 mb-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-3 py-2 px-3 rounded-lg bg-gray-50">
            <EventTypeBadge type={event.type} className="mt-0.5 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">
                  {format(parseISO(event.date), 'M月d日')}
                </span>
                <span className="font-medium text-gray-900">{event.title}</span>
              </div>
              {event.description && (
                <p className="text-xs text-gray-500 mt-1">{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
          キャンセル
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isLoading} className="flex-1">
          {isLoading ? '登録中...' : 'スケジュールを登録'}
        </Button>
      </div>
    </Card>
  )
}
