import { getSupabase } from './supabase-client'
import type { VegetableRepository, EventRepository, AdviceRepository } from './repositories'
import type { Vegetable, CultivationEvent, Advice, EventType, Urgency, VegetableStatus } from '@/types'
import type { Database } from '@/types/database'

type VegetableUpdate = Database['public']['Tables']['vegetables']['Update']
type EventUpdate = Database['public']['Tables']['events']['Update']
type AdviceUpdate = Database['public']['Tables']['advices']['Update']

// --- マッピングヘルパー ---

function toVegetable(row: {
  id: string
  name: string
  category: string
  planted_date: string
  region: string | null
  cultivation_method: string | null
  brand: string | null
  memo: string | null
  status: string
  created_at: string
}): Vegetable {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    plantedDate: row.planted_date,
    region: row.region ?? undefined,
    cultivationMethod: row.cultivation_method ?? undefined,
    brand: row.brand ?? undefined,
    memo: row.memo ?? undefined,
    status: row.status as VegetableStatus,
    createdAt: row.created_at,
  }
}

function toEvent(row: {
  id: string
  vegetable_id: string
  title: string
  date: string
  type: string
  description: string | null
  is_completed: boolean
}): CultivationEvent {
  return {
    id: row.id,
    vegetableId: row.vegetable_id,
    title: row.title,
    date: row.date,
    type: row.type as EventType,
    description: row.description ?? undefined,
    isCompleted: row.is_completed,
  }
}

function toAdvice(row: {
  id: string
  vegetable_id: string
  photo_path: string | null
  user_comment: string | null
  advice_text: string
  urgency: string
  created_at: string
  is_discarded: boolean
}): Advice {
  return {
    id: row.id,
    vegetableId: row.vegetable_id,
    photoPath: row.photo_path ?? undefined,
    userComment: row.user_comment ?? undefined,
    adviceText: row.advice_text,
    urgency: row.urgency as Urgency,
    createdAt: row.created_at,
    isDiscarded: row.is_discarded,
  }
}

// --- リポジトリ実装 ---

export class SupabaseVegetableRepository implements VegetableRepository {
  async findAll(): Promise<Vegetable[]> {
    const { data, error } = await getSupabase().from('vegetables').select('*')
    if (error) throw new Error(`野菜の取得に失敗しました: ${error.message}`)
    return (data ?? []).map(toVegetable)
  }

  async findById(id: string): Promise<Vegetable | undefined> {
    const { data, error } = await getSupabase()
      .from('vegetables')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw new Error(`野菜の取得に失敗しました: ${error.message}`)
    return data ? toVegetable(data) : undefined
  }

  async create(vegetable: Vegetable): Promise<void> {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('認証が必要です')
    const { error } = await supabase.from('vegetables').insert({
      id: vegetable.id,
      name: vegetable.name,
      category: vegetable.category,
      planted_date: vegetable.plantedDate,
      region: vegetable.region ?? null,
      cultivation_method: vegetable.cultivationMethod ?? null,
      brand: vegetable.brand ?? null,
      memo: vegetable.memo ?? null,
      status: vegetable.status,
      created_at: vegetable.createdAt,
      user_id: user.id,
    })
    if (error) throw new Error(`野菜の追加に失敗しました: ${error.message}`)
  }

  async update(id: string, data: Partial<Vegetable>): Promise<void> {
    const updateData: VegetableUpdate = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.category !== undefined) updateData.category = data.category
    if (data.plantedDate !== undefined) updateData.planted_date = data.plantedDate
    if (data.region !== undefined) updateData.region = data.region
    if (data.cultivationMethod !== undefined) updateData.cultivation_method = data.cultivationMethod
    if (data.brand !== undefined) updateData.brand = data.brand
    if (data.memo !== undefined) updateData.memo = data.memo
    if (data.status !== undefined) updateData.status = data.status

    const { error } = await getSupabase().from('vegetables').update(updateData).eq('id', id)
    if (error) throw new Error(`野菜の更新に失敗しました: ${error.message}`)
  }

  async remove(id: string): Promise<void> {
    const { error } = await getSupabase().from('vegetables').delete().eq('id', id)
    if (error) throw new Error(`野菜の削除に失敗しました: ${error.message}`)
  }
}

export class SupabaseEventRepository implements EventRepository {
  async findAll(): Promise<CultivationEvent[]> {
    const { data, error } = await getSupabase().from('events').select('*')
    if (error) throw new Error(`イベントの取得に失敗しました: ${error.message}`)
    return (data ?? []).map(toEvent)
  }

  async findByVegetableId(vegetableId: string): Promise<CultivationEvent[]> {
    const { data, error } = await getSupabase()
      .from('events')
      .select('*')
      .eq('vegetable_id', vegetableId)
    if (error) throw new Error(`イベントの取得に失敗しました: ${error.message}`)
    return (data ?? []).map(toEvent)
  }

  async findByDate(date: string): Promise<CultivationEvent[]> {
    const { data, error } = await getSupabase()
      .from('events')
      .select('*')
      .eq('date', date)
    if (error) throw new Error(`イベントの取得に失敗しました: ${error.message}`)
    return (data ?? []).map(toEvent)
  }

  async create(event: CultivationEvent): Promise<void> {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('認証が必要です')
    const { error } = await supabase.from('events').insert({
      id: event.id,
      vegetable_id: event.vegetableId,
      title: event.title,
      date: event.date,
      type: event.type,
      description: event.description ?? null,
      is_completed: event.isCompleted,
      user_id: user.id,
    })
    if (error) throw new Error(`イベントの追加に失敗しました: ${error.message}`)
  }

  async update(id: string, data: Partial<CultivationEvent>): Promise<void> {
    const updateData: EventUpdate = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.date !== undefined) updateData.date = data.date
    if (data.type !== undefined) updateData.type = data.type
    if (data.description !== undefined) updateData.description = data.description
    if (data.isCompleted !== undefined) updateData.is_completed = data.isCompleted

    const { error } = await getSupabase().from('events').update(updateData).eq('id', id)
    if (error) throw new Error(`イベントの更新に失敗しました: ${error.message}`)
  }

  async remove(id: string): Promise<void> {
    const { error } = await getSupabase().from('events').delete().eq('id', id)
    if (error) throw new Error(`イベントの削除に失敗しました: ${error.message}`)
  }

  async bulkCreate(events: CultivationEvent[]): Promise<void> {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('認証が必要です')
    const rows = events.map((event) => ({
      id: event.id,
      vegetable_id: event.vegetableId,
      title: event.title,
      date: event.date,
      type: event.type,
      description: event.description ?? null,
      is_completed: event.isCompleted,
      user_id: user.id,
    }))
    const { error } = await supabase.from('events').insert(rows)
    if (error) throw new Error(`イベントの一括追加に失敗しました: ${error.message}`)
  }
}

export class SupabaseAdviceRepository implements AdviceRepository {
  async findByVegetableId(vegetableId: string): Promise<Advice[]> {
    const { data, error } = await getSupabase()
      .from('advices')
      .select('*')
      .eq('vegetable_id', vegetableId)
      .order('created_at', { ascending: false })
    if (error) throw new Error(`アドバイスの取得に失敗しました: ${error.message}`)
    return (data ?? []).map(toAdvice)
  }

  async create(advice: Advice): Promise<void> {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('認証が必要です')
    const { error } = await supabase.from('advices').insert({
      id: advice.id,
      vegetable_id: advice.vegetableId,
      photo_path: advice.photoPath ?? null,
      user_comment: advice.userComment ?? null,
      advice_text: advice.adviceText,
      urgency: advice.urgency,
      created_at: advice.createdAt,
      is_discarded: advice.isDiscarded,
      user_id: user.id,
    })
    if (error) throw new Error(`アドバイスの追加に失敗しました: ${error.message}`)
  }

  async update(id: string, data: Partial<Advice>): Promise<void> {
    const updateData: AdviceUpdate = {}
    if (data.photoPath !== undefined) updateData.photo_path = data.photoPath
    if (data.userComment !== undefined) updateData.user_comment = data.userComment
    if (data.adviceText !== undefined) updateData.advice_text = data.adviceText
    if (data.urgency !== undefined) updateData.urgency = data.urgency
    if (data.isDiscarded !== undefined) updateData.is_discarded = data.isDiscarded

    const { error } = await getSupabase().from('advices').update(updateData).eq('id', id)
    if (error) throw new Error(`アドバイスの更新に失敗しました: ${error.message}`)
  }

  async remove(id: string): Promise<void> {
    const { error } = await getSupabase().from('advices').delete().eq('id', id)
    if (error) throw new Error(`アドバイスの削除に失敗しました: ${error.message}`)
  }

  async countTodayByVegetableId(vegetableId: string): Promise<number> {
    const today = new Date().toISOString().slice(0, 10)
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
    const { count, error } = await getSupabase()
      .from('advices')
      .select('*', { count: 'exact', head: true })
      .eq('vegetable_id', vegetableId)
      .gte('created_at', today)
      .lt('created_at', tomorrow)
    if (error) throw new Error(`アドバイス回数の取得に失敗しました: ${error.message}`)
    return count ?? 0
  }
}
