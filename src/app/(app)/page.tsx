'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { MonthCalendar, DayEvents } from '@/features/calendar'
import { useEventStore } from '@/lib/stores'

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const router = useRouter()

  const allEvents = useEventStore(s => s.events)

  const eventDates = useMemo(() => {
    const set = new Set<string>()
    for (const event of allEvents) {
      set.add(event.date)
    }
    return [...set]
  }, [allEvents])

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
  const dayEvents = useEventStore(s => s.getEventsByDate(selectedDateStr))

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-5">家庭菜園カレンダー</h1>

      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-5">
        <MonthCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          eventDates={eventDates}
        />
        <DayEvents
          date={selectedDate}
          events={dayEvents}
          onEventClick={(event) => router.push(`/vegetable/${event.vegetableId}`)}
        />
      </div>
    </div>
  )
}
