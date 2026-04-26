import type { EventType, Urgency } from '@/types'

const eventTypeConfig: Record<EventType, { label: string; className: string }> = {
  fertilizing: { label: '施肥', className: 'bg-green-100 text-green-800' },
  pinching: { label: '摘心', className: 'bg-orange-100 text-orange-800' },
  harvesting: { label: '収穫', className: 'bg-red-100 text-red-800' },
  watering: { label: '水やり', className: 'bg-blue-100 text-blue-800' },
  other: { label: 'その他', className: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' },
}

const urgencyConfig: Record<Urgency, { label: string; className: string }> = {
  normal: { label: '正常', className: 'bg-green-100 text-green-800' },
  attention: { label: '注意', className: 'bg-orange-100 text-orange-800' },
  urgent: { label: '緊急', className: 'bg-red-100 text-red-800' },
}

interface EventTypeBadgeProps {
  type: EventType
  className?: string
}

export function EventTypeBadge({ type, className = '' }: EventTypeBadgeProps) {
  const config = eventTypeConfig[type]
  return (
    <span
      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${config.className} ${className}`}
    >
      {config.label}
    </span>
  )
}

interface UrgencyBadgeProps {
  urgency: Urgency
  className?: string
}

export function UrgencyBadge({ urgency, className = '' }: UrgencyBadgeProps) {
  const config = urgencyConfig[urgency]
  return (
    <span
      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${config.className} ${className}`}
    >
      {config.label}
    </span>
  )
}
