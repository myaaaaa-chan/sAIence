import { create } from 'zustand'
import { generateId } from '@/lib/uuid'
import type { CultivationEvent } from '@/types'
import type { EventRepository } from '@/db/repositories'

interface SelectorCache<T> {
  itemsRef: CultivationEvent[]
  key: string
  result: T
}

function memoByItems<T>(
  cache: { current: SelectorCache<T> | null },
  items: CultivationEvent[],
  key: string,
  compute: () => T,
): T {
  if (cache.current && cache.current.itemsRef === items && cache.current.key === key) {
    return cache.current.result
  }
  const result = compute()
  cache.current = { itemsRef: items, key, result }
  return result
}

const byVegetableIdCache: { current: SelectorCache<CultivationEvent[]> | null } = { current: null }
const byDateCache: { current: SelectorCache<CultivationEvent[]> | null } = { current: null }

interface EventState {
  events: CultivationEvent[]
  isLoading: boolean
  loadEvents(): Promise<void>
  addEvent(data: Omit<CultivationEvent, 'id'>): Promise<void>
  bulkAddEvents(events: Omit<CultivationEvent, 'id'>[]): Promise<void>
  toggleEventCompletion(id: string): Promise<void>
  removeEvent(id: string): Promise<void>
  getEventsByDate(date: string): CultivationEvent[]
  getEventsByVegetableId(vegetableId: string): CultivationEvent[]
}

export function createEventStore(repo: EventRepository) {
  return create<EventState>((set, get) => ({
    events: [],
    isLoading: false,

    loadEvents: async () => {
      set({ isLoading: true })
      try {
        const events = await repo.findAll()
        set({ events, isLoading: false })
      } catch {
        set({ isLoading: false })
      }
    },

    addEvent: async (data) => {
      const newEvent: CultivationEvent = {
        ...data,
        id: generateId(),
      }
      await repo.create(newEvent)
      set({ events: [...get().events, newEvent] })
    },

    bulkAddEvents: async (inputs) => {
      const newEvents: CultivationEvent[] = inputs.map((input) => ({
        ...input,
        id: generateId(),
      }))
      await repo.bulkCreate(newEvents)
      set({ events: [...get().events, ...newEvents] })
    },

    toggleEventCompletion: async (id) => {
      const event = get().events.find((e) => e.id === id)
      if (!event) return
      const isCompleted = !event.isCompleted
      await repo.update(id, { isCompleted })
      set({
        events: get().events.map((e) =>
          e.id === id ? { ...e, isCompleted } : e,
        ),
      })
    },

    removeEvent: async (id) => {
      await repo.remove(id)
      set({ events: get().events.filter((e) => e.id !== id) })
    },

    getEventsByDate: (date) =>
      memoByItems(byDateCache, get().events, date, () =>
        get().events.filter((e) => e.date === date),
      ),

    getEventsByVegetableId: (vegetableId) =>
      memoByItems(byVegetableIdCache, get().events, vegetableId, () =>
        get().events.filter((e) => e.vegetableId === vegetableId),
      ),
  }))
}
