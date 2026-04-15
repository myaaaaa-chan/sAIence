import { getSupabase } from '@/db/supabase-client'

export async function uploadAdvicePhoto(vegetableId: string, base64: string): Promise<string> {
  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('認証が必要です')

  const path = `${user.id}/${vegetableId}/${Date.now()}.jpg`

  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  const { error } = await supabase.storage
    .from('photos')
    .upload(path, bytes, { contentType: 'image/jpeg' })
  if (error) throw new Error(`写真のアップロードに失敗しました: ${error.message}`)

  const { data } = supabase.storage.from('photos').getPublicUrl(path)
  return data.publicUrl
}

export async function resizeAndEncodeBase64(file: File): Promise<string> {
  const MAX_SIZE = 1280
  const QUALITY = 0.8
  const img = await createImageBitmap(file)
  const { width, height } = img
  const scale = Math.min(MAX_SIZE / Math.max(width, height), 1)
  const canvas = new OffscreenCanvas(Math.round(width * scale), Math.round(height * scale))
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: QUALITY })
  const buffer = await blob.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let binary = ''
  bytes.forEach(b => (binary += String.fromCharCode(b)))
  return btoa(binary)
}
