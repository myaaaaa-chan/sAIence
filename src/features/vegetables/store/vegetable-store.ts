import { create } from 'zustand'
import { generateId } from '@/lib/uuid'
import type { Vegetable, VegetableStatus } from '@/types'
import type { VegetableRepository } from '@/db/repositories'

interface VegetableState {
  vegetables: Vegetable[]
  isLoading: boolean
  error: string | null
  loadVegetables(): Promise<void>
  addVegetable(data: Omit<Vegetable, 'id' | 'createdAt'>): Promise<Vegetable>
  updateVegetable(id: string, data: Partial<Vegetable>): Promise<void>
  completeVegetable(id: string): Promise<void>
  removeVegetable(id: string): Promise<void>
}

export function createVegetableStore(repo: VegetableRepository) {
  return create<VegetableState>((set, get) => ({
    vegetables: [],
    isLoading: false,
    error: null,

    loadVegetables: async () => {
      set({ isLoading: true, error: null })
      try {
        const vegetables = await repo.findAll()
        set({ vegetables, isLoading: false })
      } catch (e) {
        set({
          error: e instanceof Error ? e.message : '野菜の読み込みに失敗しました',
          isLoading: false,
        })
      }
    },

    addVegetable: async (data) => {
      const newVegetable: Vegetable = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      }
      await repo.create(newVegetable)
      set({ vegetables: [...get().vegetables, newVegetable] })
      return newVegetable
    },

    updateVegetable: async (id, data) => {
      await repo.update(id, data)
      set({
        vegetables: get().vegetables.map((v) =>
          v.id === id ? { ...v, ...data } : v,
        ),
      })
    },

    completeVegetable: async (id) => {
      const status: VegetableStatus = 'completed'
      await repo.update(id, { status })
      set({
        vegetables: get().vegetables.map((v) =>
          v.id === id ? { ...v, status } : v,
        ),
      })
    },

    removeVegetable: async (id) => {
      await repo.remove(id)
      set({
        vegetables: get().vegetables.filter((v) => v.id !== id),
      })
    },
  }))
}
