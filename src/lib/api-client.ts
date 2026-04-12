import { getSupabase } from '@/db/supabase-client'
import type {
  CultivationQuery,
  AiScheduleResponse,
  PhotoAdviceRequest,
  PhotoAdviceResponse,
  ErrorResponse,
} from '@/types/api'

const getBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL
  if (process.env.NODE_ENV === 'production' && !url) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required in production')
  }
  return url ?? 'http://localhost:8787'
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public errorResponse: ErrorResponse,
  ) {
    super(errorResponse.message)
    this.name = 'ApiError'
  }
}

const getAuthToken = async (): Promise<string> => {
  const { data: { session } } = await getSupabase().auth.getSession()
  if (!session?.access_token) throw new Error('認証が必要です')
  return session.access_token
}

const request = async <T>(path: string, options: RequestInit): Promise<T> => {
  const token = await getAuthToken()
  const url = `${getBaseUrl()}${path}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorBody = (await response.json()) as ErrorResponse
    throw new ApiError(response.status, errorBody)
  }

  return response.json() as Promise<T>
}

export const apiClient = {
  getSchedule: (query: CultivationQuery) =>
    request<AiScheduleResponse>('/api/schedule', {
      method: 'POST',
      body: JSON.stringify(query),
    }),

  getAdvice: (adviceRequest: PhotoAdviceRequest) =>
    request<PhotoAdviceResponse>('/api/advice', {
      method: 'POST',
      body: JSON.stringify(adviceRequest),
    }),

  healthCheck: () =>
    request<{ status: string }>('/api/health', { method: 'GET' }),
}
