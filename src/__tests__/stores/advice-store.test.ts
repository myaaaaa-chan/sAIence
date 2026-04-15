import { describe, it, expect, beforeEach } from 'vitest'
import { createAdviceStore } from '@/features/photo-advice/store/advice-store'
import type { Advice } from '@/types'
import type { AdviceRepository } from '@/db/repositories'

class InMemoryAdviceRepository implements AdviceRepository {
  private items: Advice[] = []

  async findByVegetableId(vegetableId: string) {
    return this.items.filter((a) => a.vegetableId === vegetableId)
  }
  async create(advice: Advice) { this.items.push({ ...advice }) }
  async update(id: string, data: Partial<Advice>) {
    this.items = this.items.map((a) => a.id === id ? { ...a, ...data } : a)
  }
  async remove(id: string) { this.items = this.items.filter((a) => a.id !== id) }
  async countTodayByVegetableId(vegetableId: string) {
    const today = new Date().toISOString().slice(0, 10)
    return this.items.filter(
      (a) => a.vegetableId === vegetableId && a.createdAt.startsWith(today),
    ).length
  }
}

function makeAdvice(overrides: Partial<Omit<Advice, 'id' | 'createdAt'>> = {}): Omit<Advice, 'id' | 'createdAt'> {
  return {
    vegetableId: 'veg-1',
    adviceText: '葉が元気そうです',
    urgency: 'normal',
    isDiscarded: false,
    ...overrides,
  }
}

describe('advice-store', () => {
  let repo: InMemoryAdviceRepository
  let store: ReturnType<typeof createAdviceStore>

  beforeEach(() => {
    repo = new InMemoryAdviceRepository()
    store = createAdviceStore(repo)
  })

  describe('loadAdvicesByVegetableId', () => {
    it('指定野菜のアドバイスを読み込む', async () => {
      await repo.create({
        id: 'a1', createdAt: new Date().toISOString(),
        ...makeAdvice({ vegetableId: 'veg-1' }),
      })
      await repo.create({
        id: 'a2', createdAt: new Date().toISOString(),
        ...makeAdvice({ vegetableId: 'veg-2' }),
      })

      await store.getState().loadAdvicesByVegetableId('veg-1')

      expect(store.getState().advices).toHaveLength(1)
      expect(store.getState().advices[0].vegetableId).toBe('veg-1')
    })
  })

  describe('addAdvice', () => {
    it('id と createdAt が自動生成される', async () => {
      await store.getState().addAdvice(makeAdvice())

      expect(store.getState().advices[0].id).toBeTruthy()
      expect(store.getState().advices[0].createdAt).toBeTruthy()
    })

    it('最新のアドバイスが先頭に追加される', async () => {
      await store.getState().addAdvice(makeAdvice({ adviceText: '1件目' }))
      await store.getState().addAdvice(makeAdvice({ adviceText: '2件目' }))

      expect(store.getState().advices[0].adviceText).toBe('2件目')
    })
  })

  describe('discardAdvice', () => {
    it('isDiscarded が true に更新される', async () => {
      await store.getState().addAdvice(makeAdvice())
      const id = store.getState().advices[0].id

      await store.getState().discardAdvice(id)

      expect(store.getState().advices[0].isDiscarded).toBe(true)
    })

    it('他のアドバイスに影響しない', async () => {
      await store.getState().addAdvice(makeAdvice({ adviceText: 'A' }))
      await store.getState().addAdvice(makeAdvice({ adviceText: 'B' }))
      const idA = store.getState().advices.find((a) => a.adviceText === 'A')!.id

      await store.getState().discardAdvice(idA)

      const b = store.getState().advices.find((a) => a.adviceText === 'B')
      expect(b?.isDiscarded).toBe(false)
    })
  })

  describe('removeAdvice', () => {
    it('ストアから削除される', async () => {
      await store.getState().addAdvice(makeAdvice())
      const id = store.getState().advices[0].id

      await store.getState().removeAdvice(id)

      expect(store.getState().advices).toHaveLength(0)
    })
  })

  describe('getTodayAdviceCount', () => {
    it('今日追加したアドバイス数を返す', async () => {
      await store.getState().addAdvice(makeAdvice({ vegetableId: 'veg-1' }))
      await store.getState().addAdvice(makeAdvice({ vegetableId: 'veg-1' }))
      await store.getState().addAdvice(makeAdvice({ vegetableId: 'veg-2' }))

      expect(store.getState().getTodayAdviceCount('veg-1')).toBe(2)
      expect(store.getState().getTodayAdviceCount('veg-2')).toBe(1)
    })

    it('昨日以前のアドバイスはカウントしない', async () => {
      // 昨日のタイムスタンプを直接ストアに挿入
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      await repo.create({
        id: 'old', createdAt: yesterday.toISOString(),
        ...makeAdvice({ vegetableId: 'veg-1' }),
      })
      await store.getState().loadAdvicesByVegetableId('veg-1')

      expect(store.getState().getTodayAdviceCount('veg-1')).toBe(0)
    })
  })

  describe('canAdviceToday', () => {
    it('上限未満なら true を返す', async () => {
      expect(store.getState().canAdviceToday('veg-1')).toBe(true)
    })

    it('上限（10回）に達したら false を返す', async () => {
      for (let i = 0; i < 10; i++) {
        await store.getState().addAdvice(makeAdvice({ vegetableId: 'veg-1' }))
      }

      expect(store.getState().canAdviceToday('veg-1')).toBe(false)
    })

    it('9回では true を返す', async () => {
      for (let i = 0; i < 9; i++) {
        await store.getState().addAdvice(makeAdvice({ vegetableId: 'veg-1' }))
      }

      expect(store.getState().canAdviceToday('veg-1')).toBe(true)
    })
  })
})
