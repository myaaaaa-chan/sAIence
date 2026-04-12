import { SupabaseVegetableRepository, SupabaseEventRepository, SupabaseAdviceRepository } from '@/db/supabase-repositories'
import { createVegetableStore } from '@/features/vegetables/store/vegetable-store'
import { createEventStore } from '@/features/vegetables/store/event-store'
import { createAdviceStore } from '@/features/photo-advice/store/advice-store'

const vegetableRepo = new SupabaseVegetableRepository()
const eventRepo = new SupabaseEventRepository()
const adviceRepo = new SupabaseAdviceRepository()

export const useVegetableStore = createVegetableStore(vegetableRepo)
export const useEventStore = createEventStore(eventRepo)
export const useAdviceStore = createAdviceStore(adviceRepo)
