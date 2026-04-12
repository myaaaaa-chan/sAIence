// イベント種別
export type EventType = 'fertilizing' | 'pinching' | 'harvesting' | 'watering' | 'other'

// 緊急度
export type Urgency = 'normal' | 'attention' | 'urgent'

// 栽培状態
export type VegetableStatus = 'active' | 'completed'

// 野菜
export interface Vegetable {
  id: string
  name: string
  category: string
  plantedDate: string
  region?: string
  cultivationMethod?: string
  brand?: string
  memo?: string
  status: VegetableStatus
  createdAt: string
}

// 栽培イベント
export interface CultivationEvent {
  id: string
  vegetableId: string
  title: string
  date: string
  type: EventType
  description?: string
  isCompleted: boolean
}

// アドバイス
export interface Advice {
  id: string
  vegetableId: string
  photoPath?: string
  userComment?: string
  adviceText: string
  urgency: Urgency
  createdAt: string
  isDiscarded: boolean
}
