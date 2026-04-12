'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns'
import { ja } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const

interface MonthCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  eventDates: string[] // 'yyyy-MM-dd' 形式
}

export function MonthCalendar({ selectedDate, onDateSelect, eventDates }: MonthCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(selectedDate))

  const eventDateSet = useMemo(() => new Set(eventDates), [eventDates])

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
    return eachDayOfInterval({ start: calStart, end: calEnd })
  }, [currentMonth])

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prev => subMonths(prev, 1))
  }, [])

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, 1))
  }, [])

  return (
    <Card>
      {/* ナビゲーション */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          aria-label="前月"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-[15px] font-bold text-gray-800">
          {format(currentMonth, 'yyyy年M月', { locale: ja })}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          aria-label="翌月"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-[11px] font-semibold pb-2 ${
              i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7">
        {calendarDays.map(day => {
          const dateKey = format(day, 'yyyy-MM-dd')
          const inCurrentMonth = isSameMonth(day, currentMonth)
          const selected = isSameDay(day, selectedDate)
          const today = isToday(day)
          const dayOfWeek = getDay(day)
          const hasEvent = eventDateSet.has(dateKey)

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onDateSelect(day)}
              className="flex flex-col items-center justify-center py-1"
            >
              <span
                className={`w-9 h-9 flex items-center justify-center rounded-full text-[13px] font-medium transition-colors ${
                  selected
                    ? 'bg-green-600 text-white'
                    : today
                      ? 'border-2 border-green-600 text-green-700'
                      : !inCurrentMonth
                        ? 'text-gray-300'
                        : dayOfWeek === 0
                          ? 'text-red-500 hover:bg-red-50'
                          : dayOfWeek === 6
                            ? 'text-blue-500 hover:bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {format(day, 'd')}
              </span>
              {/* イベントドット */}
              <div className="h-2 mt-0.5 flex items-center">
                {inCurrentMonth && hasEvent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
