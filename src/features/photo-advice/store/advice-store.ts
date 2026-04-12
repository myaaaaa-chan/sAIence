import { create } from 'zustand'
import { generateId } from '@/lib/uuid'
import { DAILY_ADVICE_LIMIT } from '@/constants/config'
import type { Advice } from '@/types'
import type { AdviceRepository } from '@/db/repositories'

interface AdviceState {
  advices: Advice[]
  isLoading: boolean
  loadAdvicesByVegetableId(vegetableId: string): Promise<void>
  addAdvice(data: Omit<Advice, 'id' | 'createdAt'>): Promise<void>
  discardAdvice(id: string): Promise<void>
  removeAdvice(id: string): Promise<void>
  getTodayAdviceCount(vegetableId: string): number
  canAdviceToday(vegetableId: string): boolean
}

export function createAdviceStore(repo: AdviceRepository) {
  return create<AdviceState>((set, get) => ({
    advices: [],
    isLoading: false,

    loadAdvicesByVegetableId: async (vegetableId) => {
      set({ isLoading: true })
      try {
        const advices = await repo.findByVegetableId(vegetableId)
        set({ advices, isLoading: false })
      } catch {
        set({ isLoading: false })
      }
    },

    addAdvice: async (data) => {
      const newAdvice: Advice = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      }
      await repo.create(newAdvice)
      set({ advices: [newAdvice, ...get().advices] })
    },

    discardAdvice: async (id) => {
      await repo.update(id, { isDiscarded: true })
      set({
        advices: get().advices.map((a) =>
          a.id === id ? { ...a, isDiscarded: true } : a,
        ),
      })
    },

    removeAdvice: async (id) => {
      await repo.remove(id)
      set({ advices: get().advices.filter((a) => a.id !== id) })
    },

    getTodayAdviceCount: (vegetableId) => {
      const today = new Date().toISOString().slice(0, 10)
      return get().advices.filter(
        (a) => a.vegetableId === vegetableId && a.createdAt.startsWith(today),
      ).length
    },

    canAdviceToday: (vegetableId) => {
      return get().getTodayAdviceCount(vegetableId) < DAILY_ADVICE_LIMIT
    },
  }))
}
