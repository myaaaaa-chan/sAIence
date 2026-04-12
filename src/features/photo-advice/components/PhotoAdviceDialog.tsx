'use client'

import { useState, useRef, useCallback } from 'react'
import { Camera, LoaderCircle } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { UrgencyBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { resizeAndEncodeBase64 } from '@/lib/photo'
import { requestPhotoAdvice } from '@/features/photo-advice/api/advice-api'
import type { Advice, Urgency } from '@/types'
import type { PhotoAdviceResponse } from '@/types/api'

type Phase = 'idle' | 'preview' | 'analyzing' | 'result'

interface PhotoAdviceDialogProps {
  open: boolean
  onClose: () => void
  vegetableId: string
  vegetableName: string
  onSave: (advice: Omit<Advice, 'id' | 'createdAt' | 'isDiscarded'>) => void
}

const urgencyBgColors: Record<Urgency, string> = {
  normal: 'bg-green-50',
  attention: 'bg-orange-50',
  urgent: 'bg-red-50',
}

export function PhotoAdviceDialog({
  open,
  onClose,
  vegetableId,
  vegetableName,
  onSave,
}: PhotoAdviceDialogProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [imageBase64, setImageBase64] = useState<string>('')
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PhotoAdviceResponse | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const reset = useCallback(() => {
    setPhase('idle')
    setImageBase64('')
    setPreviewUrl('')
    setComment('')
    setError(null)
    setResult(null)
  }, [])

  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [reset, onClose])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    try {
      const base64 = await resizeAndEncodeBase64(file)
      setImageBase64(base64)
      setPreviewUrl(URL.createObjectURL(file))
      setPhase('preview')
    } catch {
      setError('画像の読み込みに失敗しました')
    }
    // inputをリセットして同じファイルを再選択可能にする
    e.target.value = ''
  }, [])

  const handleAnalyze = useCallback(async () => {
    setPhase('analyzing')
    setError(null)
    try {
      const response = await requestPhotoAdvice(
        vegetableName,
        imageBase64,
        'image/jpeg',
        comment || undefined,
      )
      setResult(response)
      setPhase('result')
    } catch {
      setError('AI解析に失敗しました。もう一度お試しください。')
      setPhase('preview')
    }
  }, [vegetableName, imageBase64, comment])

  const handleSave = useCallback(() => {
    if (!result) return
    onSave({
      vegetableId,
      adviceText: result.advice,
      urgency: result.urgency,
      userComment: comment || undefined,
    })
    handleClose()
  }, [result, vegetableId, comment, onSave, handleClose])

  return (
    <Dialog open={open} onClose={handleClose} title="写真AIアドバイス">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      {/* idle: ファイル選択 */}
      {phase === 'idle' && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
            <Camera size={48} strokeWidth={1.5} />
            <span className="text-sm">写真を撮影して、AIにアドバイスをもらいましょう</span>
          </div>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera size={16} />
            写真を選択
          </Button>
        </div>
      )}

      {/* preview: プレビュー + コメント */}
      {phase === 'preview' && (
        <div className="flex flex-col gap-4">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="プレビュー"
              className="w-full rounded-xl object-cover max-h-[300px]"
            />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AIへの質問（任意）
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="例: 葉の色が薄くなってきた気がします…"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[60px] resize-y focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={reset}>
              撮り直す
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleAnalyze}>
              解析する
            </Button>
          </div>
        </div>
      )}

      {/* analyzing: スピナー */}
      {phase === 'analyzing' && (
        <div className="flex flex-col items-center gap-3 py-8">
          <LoaderCircle size={40} className="animate-spin text-green-600" />
          <div className="text-[15px] font-semibold">写真を解析中…</div>
          <div className="text-[13px] text-gray-500">
            AIが{vegetableName}の状態を確認しています
          </div>
        </div>
      )}

      {/* result: 結果表示 */}
      {phase === 'result' && result && (
        <div className="flex flex-col gap-4">
          <div className={`rounded-xl p-4 ${urgencyBgColors[result.urgency]}`}>
            <div className="mb-2">
              <UrgencyBadge urgency={result.urgency} />
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {result.advice}
            </p>
          </div>

          {result.actions.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-[13px] font-bold text-amber-800 mb-2">
                推奨アクション
              </div>
              <ul className="text-[13px] text-amber-900 pl-4 list-disc leading-loose">
                {result.actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="ghost" className="flex-1" onClick={handleClose}>
              破棄
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleSave}>
              保存する
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
