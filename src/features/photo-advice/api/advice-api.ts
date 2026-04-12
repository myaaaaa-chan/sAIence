import { apiClient } from '@/lib/api-client'
import type { PhotoAdviceRequest, PhotoAdviceResponse } from '@/types/api'

export async function requestPhotoAdvice(
  vegetableName: string,
  base64: string,
  mimeType: PhotoAdviceRequest['mimeType'],
  userComment?: string,
): Promise<PhotoAdviceResponse> {
  return apiClient.getAdvice({
    vegetableName,
    imageBase64: base64,
    mimeType,
    userComment,
  })
}
