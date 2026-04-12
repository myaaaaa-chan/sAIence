import { apiClient, ApiError } from '@/lib/api-client'
import type { CultivationQuery, AiScheduleResponse } from '@/types/api'

export type ScheduleApiResult =
  | { ok: true; data: AiScheduleResponse }
  | { ok: false; error: string }

export async function fetchSchedule(query: CultivationQuery): Promise<ScheduleApiResult> {
  try {
    const data = await apiClient.getSchedule(query)
    return { ok: true, data }
  } catch (e) {
    if (e instanceof ApiError) {
      if (e.statusCode === 429) {
        return { ok: false, error: 'リクエストが多すぎます。しばらく待ってから再試行してください。' }
      }
      return { ok: false, error: e.errorResponse.message }
    }
    return { ok: false, error: 'ネットワークエラーが発生しました。接続を確認してください。' }
  }
}
