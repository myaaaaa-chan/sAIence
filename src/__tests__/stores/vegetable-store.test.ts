import { describe, it, expect, beforeEach } from 'vitest'
import { createVegetableStore } from '@/features/vegetables/store/vegetable-store'
import type { Vegetable } from '@/types'
import type { VegetableRepository } from '@/db/repositories'

class InMemoryVegetableRepository implements VegetableRepository {
  private items: Vegetable[] = []

  async findAll() { return [...this.items] }
  async findById(id: string) { return this.items.find((v) => v.id === id) }
  async create(v: Vegetable) { this.items.push({ ...v }) }
  async update(id: string, data: Partial<Vegetable>) {
    this.items = this.items.map((v) => v.id === id ? { ...v, ...data } : v)
  }
  async remove(id: string) { this.items = this.items.filter((v) => v.id !== id) }
}

function makeVegetable(overrides: Partial<Vegetable> = {}): Omit<Vegetable, 'id' | 'createdAt'> {
  return {
    name: 'トマト',
    category: 'fruit',
    plantedDate: '2024-04-01',
    status: 'active',
    ...overrides,
  }
}

describe('vegetable-store', () => {
  let repo: InMemoryVegetableRepository
  let store: ReturnType<typeof createVegetableStore>

  beforeEach(() => {
    repo = new InMemoryVegetableRepository()
    store = createVegetableStore(repo)
  })

  describe('loadVegetables', () => {
    it('リポジトリのデータをストアに読み込む', async () => {
      await repo.create({ id: 'v1', createdAt: new Date().toISOString(), ...makeVegetable() })

      await store.getState().loadVegetables()

      expect(store.getState().vegetables).toHaveLength(1)
      expect(store.getState().vegetables[0].id).toBe('v1')
      expect(store.getState().isLoading).toBe(false)
    })

    it('エラー時に error を設定し isLoading を false にする', async () => {
      const errorRepo: VegetableRepository = {
        findAll: async () => { throw new Error('接続エラー') },
        findById: async () => undefined,
        create: async () => {},
        update: async () => {},
        remove: async () => {},
      }
      const s = createVegetableStore(errorRepo)

      await s.getState().loadVegetables()

      expect(s.getState().error).toBe('接続エラー')
      expect(s.getState().isLoading).toBe(false)
    })
  })

  describe('addVegetable', () => {
    it('id と createdAt が自動生成される', async () => {
      const added = await store.getState().addVegetable(makeVegetable())

      expect(added.id).toBeTruthy()
      expect(added.createdAt).toBeTruthy()
    })

    it('ストアに追加される', async () => {
      await store.getState().addVegetable(makeVegetable({ name: 'キュウリ' }))

      expect(store.getState().vegetables).toHaveLength(1)
      expect(store.getState().vegetables[0].name).toBe('キュウリ')
    })

    it('複数追加できる', async () => {
      await store.getState().addVegetable(makeVegetable({ name: 'トマト' }))
      await store.getState().addVegetable(makeVegetable({ name: 'ナス' }))

      expect(store.getState().vegetables).toHaveLength(2)
    })
  })

  describe('completeVegetable', () => {
    it('status を completed に更新する', async () => {
      const veg = await store.getState().addVegetable(makeVegetable())

      await store.getState().completeVegetable(veg.id)

      const updated = store.getState().vegetables.find((v) => v.id === veg.id)
      expect(updated?.status).toBe('completed')
    })

    it('他の野菜に影響しない', async () => {
      const v1 = await store.getState().addVegetable(makeVegetable({ name: 'トマト' }))
      const v2 = await store.getState().addVegetable(makeVegetable({ name: 'ナス' }))

      await store.getState().completeVegetable(v1.id)

      const other = store.getState().vegetables.find((v) => v.id === v2.id)
      expect(other?.status).toBe('active')
    })
  })

  describe('removeVegetable', () => {
    it('ストアから削除される', async () => {
      const veg = await store.getState().addVegetable(makeVegetable())

      await store.getState().removeVegetable(veg.id)

      expect(store.getState().vegetables).toHaveLength(0)
    })

    it('対象以外は残る', async () => {
      const v1 = await store.getState().addVegetable(makeVegetable({ name: 'トマト' }))
      await store.getState().addVegetable(makeVegetable({ name: 'ナス' }))

      await store.getState().removeVegetable(v1.id)

      expect(store.getState().vegetables).toHaveLength(1)
      expect(store.getState().vegetables[0].name).toBe('ナス')
    })
  })
})
