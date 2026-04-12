import type { EventType, Urgency } from './index'

// ─── 栽培クエリ（POST /api/schedule リクエスト） ─────────────────────────────────
export type CultivationQuery = {
  vegetableName: string
  plantedAt: string        // ISO 8601 date string (e.g. "2025-04-01")
  seedingType?: 'seedling' | 'seed' // 苗か種か
  region?: string          // 地域（例: "関東"）
  brand?: string           // 品種・ブランド名（例: "サントリー本気野菜"）
  memo?: string            // 栽培メモ
}

// ─── AI スケジュールイベント ───────────────────────────────────────────────────
export type AiScheduleEvent = {
  type: EventType
  title: string         // 作業名（例: "追肥"）
  description: string   // 詳細説明
  scheduledDate: string // ISO 8601 date string
}

// ─── AI スケジュールレスポンス（POST /api/schedule レスポンス） ─────────────────
export type AiScheduleResponse = {
  vegetableName: string
  events: AiScheduleEvent[]
  notes?: string // 補足情報
}

// ─── 写真アドバイスリクエスト（POST /api/advice リクエスト） ─────────────────────
export type PhotoAdviceRequest = {
  vegetableName: string
  imageBase64: string   // Base64エンコード画像
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp'
  userComment?: string  // ユーザーからのコメント
}

// ─── 写真アドバイスレスポンス（POST /api/advice レスポンス） ────────────────────
export type PhotoAdviceResponse = {
  advice: string      // AIアドバイス本文
  urgency: Urgency
  actions: string[]   // 推奨アクション一覧
}

// ─── エラーレスポンス ──────────────────────────────────────────────────────────
export type ErrorResponse = {
  error: string
  message: string
  statusCode: number
}
