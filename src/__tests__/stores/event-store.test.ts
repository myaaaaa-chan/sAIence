import { describe, it, expect, beforeEach } from 'vitest'
import { createEventStore } from '@/features/vegetables/store/event-store'
import type { CultivationEvent } from '@/types'
import type { EventRepository } from '@/db/repositories'

class InMemoryEventRepository implements EventRepository {
  private items: CultivationEvent[] = []

  async findAll() { return [...this.items] }
  async findByVegetableId(vegetableId: string) {
    return this.items.filter((e) => e.vegetableId === vegetableId)
  }
  async findByDate(date: string) {
    return this.items.filter((e) => e.date === date)
  }
  async create(event: CultivationEvent) { this.items.push({ ...event }) }
  async update(id: string, data: Partial<CultivationEvent>) {
    this.items = this.items.map((e) => e.id === id ? { ...e, ...data } : e)
  }
  async remove(id: string) { this.items = this.items.filter((e) => e.id !== id) }
  async bulkCreate(events: CultivationEvent[]) {
    this.items.push(...events.map((e) => ({ ...e })))
  }
}

function makeEvent(overrides: Partial<Omit<CultivationEvent, 'id'>> = {}): Omit<CultivationEvent, 'id'> {
  return {
    vegetableId: 'veg-1',
    title: '水やり',
    date: '2024-04-10',
    type: 'watering',
    isCompleted: false,
    ...overrides,
  }
}

describe('event-store', () => {
  let repo: InMemoryEventRepository
  let store: ReturnType<typeof createEventStore>

  beforeEach(() => {
    repo = new InMemoryEventRepository()
    store = createEventStore(repo)
  })

  describe('addEvent', () => {
    it('id が自動生成されてストアに追加される', async () => {
      await store.getState().addEvent(makeEvent())

      expect(store.getState().events).toHaveLength(1)
      expect(store.getState().events[0].id).toBeTruthy()
    })
  })

  describe('bulkAddEvents', () => {
    it('複数イベントを一括追加できる', async () => {
      await store.getState().bulkAddEvents([
        makeEvent({ title: '水やり' }),
        makeEvent({ title: '施肥', type: 'fertilizing' }),
        makeEvent({ title: '収穫', type: 'harvesting' }),
      ])

      expect(store.getState().events).toHaveLength(3)
    })

    it('各イベントに個別の id が付与される', async () => {
      await store.getState().bulkAddEvents([makeEvent(), makeEvent()])

      const ids = store.getState().events.map((e) => e.id)
      expect(new Set(ids).size).toBe(2)
    })
  })

  describe('toggleEventCompletion', () => {
    it('false → true に切り替わる', async () => {
      await store.getState().addEvent(makeEvent({ isCompleted: false }))
      const id = store.getState().events[0].id

      await store.getState().toggleEventCompletion(id)

      expect(store.getState().events[0].isCompleted).toBe(true)
    })

    it('true → false に切り替わる', async () => {
      await store.getState().addEvent(makeEvent({ isCompleted: true }))
      const id = store.getState().events[0].id

      await store.getState().toggleEventCompletion(id)

      expect(store.getState().events[0].isCompleted).toBe(false)
    })

    it('存在しない id は何もしない', async () => {
      await store.getState().addEvent(makeEvent())

      await store.getState().toggleEventCompletion('non-existent')

      expect(store.getState().events[0].isCompleted).toBe(false)
    })
  })

  describe('removeEvent', () => {
    it('対象イベントが削除される', async () => {
      await store.getState().addEvent(makeEvent({ title: '水やり' }))
      await store.getState().addEvent(makeEvent({ title: '施肥' }))
      const id = store.getState().events[0].id

      await store.getState().removeEvent(id)

      expect(store.getState().events).toHaveLength(1)
      expect(store.getState().events[0].title).toBe('施肥')
    })
  })

  describe('getEventsByDate', () => {
    it('指定日のイベントのみ返す', async () => {
      await store.getState().bulkAddEvents([
        makeEvent({ date: '2024-04-10' }),
        makeEvent({ date: '2024-04-10' }),
        makeEvent({ date: '2024-04-11' }),
      ])

      const result = store.getState().getEventsByDate('2024-04-10')

      expect(result).toHaveLength(2)
    })

    it('該当なしの場合は空配列', async () => {
      await store.getState().addEvent(makeEvent({ date: '2024-04-10' }))

      const result = store.getState().getEventsByDate('2024-12-31')

      expect(result).toHaveLength(0)
    })
  })

  describe('getEventsByVegetableId', () => {
    it('指定野菜のイベントのみ返す', async () => {
      await store.getState().bulkAddEvents([
        makeEvent({ vegetableId: 'veg-1' }),
        makeEvent({ vegetableId: 'veg-1' }),
        makeEvent({ vegetableId: 'veg-2' }),
      ])

      const result = store.getState().getEventsByVegetableId('veg-1')

      expect(result).toHaveLength(2)
    })
  })
})
