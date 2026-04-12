import type { Vegetable, CultivationEvent, Advice } from '@/types'

export interface VegetableRepository {
  findAll(): Promise<Vegetable[]>
  findById(id: string): Promise<Vegetable | undefined>
  create(vegetable: Vegetable): Promise<void>
  update(id: string, data: Partial<Vegetable>): Promise<void>
  remove(id: string): Promise<void>
}

export interface EventRepository {
  findAll(): Promise<CultivationEvent[]>
  findByVegetableId(vegetableId: string): Promise<CultivationEvent[]>
  findByDate(date: string): Promise<CultivationEvent[]>
  create(event: CultivationEvent): Promise<void>
  update(id: string, data: Partial<CultivationEvent>): Promise<void>
  remove(id: string): Promise<void>
  bulkCreate(events: CultivationEvent[]): Promise<void>
}

export interface AdviceRepository {
  findByVegetableId(vegetableId: string): Promise<Advice[]>
  create(advice: Advice): Promise<void>
  update(id: string, data: Partial<Advice>): Promise<void>
  remove(id: string): Promise<void>
  countTodayByVegetableId(vegetableId: string): Promise<number>
}
