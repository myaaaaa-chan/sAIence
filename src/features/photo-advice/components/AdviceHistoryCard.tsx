'use client'

import { format, parseISO } from 'date-fns'
import { UrgencyBadge } from '@/components/ui/Badge'
import type { Advice, Urgency } from '@/types'

interface AdviceHistoryCardProps {
  advice: Advice
}

const urgencyBorderColors: Record<Urgency, string> = {
  normal: 'border-green-400',
  attention: 'border-orange-400',
  urgent: 'border-red-400',
}

export function AdviceHistoryCard({ advice }: AdviceHistoryCardProps) {
  return (
    <div
      className={`border-l-4 ${urgencyBorderColors[advice.urgency]} bg-white rounded-lg p-4 shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500">
          {format(parseISO(advice.createdAt), 'yyyy年M月d日 HH:mm')}
        </span>
        <UrgencyBadge urgency={advice.urgency} />
      </div>

      {advice.photoPath && (
        <img
          src={advice.photoPath}
          alt="アドバイス写真"
          className="w-full max-h-[200px] object-cover rounded-lg mb-3"
        />
      )}

      <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-800">
        {advice.adviceText}
      </p>

      {advice.userComment && (
        <div className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-md p-2">
          💬 {advice.userComment}
        </div>
      )}
    </div>
  )
}
