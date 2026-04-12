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
