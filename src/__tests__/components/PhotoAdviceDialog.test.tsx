import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PhotoAdviceDialog } from '@/features/photo-advice/components/PhotoAdviceDialog'

// jsdom に URL.createObjectURL が存在しないためモック
globalThis.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url')

// 外部依存をモック
vi.mock('@/lib/photo', () => ({
  resizeAndEncodeBase64: vi.fn().mockResolvedValue('base64encodedimage'),
  uploadAdvicePhoto: vi.fn().mockResolvedValue('https://example.com/photo.jpg'),
}))

vi.mock('@/features/photo-advice/api/advice-api', () => ({
  requestPhotoAdvice: vi.fn().mockResolvedValue({
    advice: '葉の色が健康的です。このまま管理を続けてください。',
    urgency: 'normal',
    actions: ['水やりを継続する', '日当たりを確認する'],
  }),
}))

// Supabaseクライアントをモック（uploadAdvicePhoto内で使用）
vi.mock('@/db/supabase-client', () => ({
  getSupabase: vi.fn(() => ({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-1' } } }) },
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({ error: null }),
        getPublicUrl: vi.fn(() => ({ data: { publicUrl: 'https://example.com/photo.jpg' } })),
      })),
    },
  })),
}))

function makeFile(name = 'photo.jpg') {
  return new File(['dummy'], name, { type: 'image/jpeg' })
}

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  vegetableId: 'veg-1',
  vegetableName: 'トマト',
  onSave: vi.fn(),
}

describe('PhotoAdviceDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('open=false', () => {
    it('何も表示されない', () => {
      render(<PhotoAdviceDialog {...defaultProps} open={false} />)
      expect(screen.queryByText('写真AIアドバイス')).not.toBeInTheDocument()
    })
  })

  describe('idle フェーズ', () => {
    it('タイトルと「写真を選択」ボタンが表示される', () => {
      render(<PhotoAdviceDialog {...defaultProps} />)
      expect(screen.getByText('写真AIアドバイス')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /写真を選択/ })).toBeInTheDocument()
    })

    it('× ボタンクリックで onClose が呼ばれる', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<PhotoAdviceDialog {...defaultProps} onClose={onClose} />)

      // Dialog の × ボタン
      const closeButtons = screen.getAllByRole('button')
      await user.click(closeButtons[0])

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('preview フェーズ', () => {
    async function goToPreview() {
      const user = userEvent.setup()
      render(<PhotoAdviceDialog {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      await userEvent.upload(fileInput, makeFile())

      return user
    }

    it('ファイル選択後にプレビューと「解析する」ボタンが表示される', async () => {
      await goToPreview()

      await waitFor(() => {
        expect(screen.getByRole('button', { name: '解析する' })).toBeInTheDocument()
      })
      expect(screen.getByRole('button', { name: '撮り直す' })).toBeInTheDocument()
    })

    it('コメント入力欄が表示される', async () => {
      await goToPreview()

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/葉の色が薄くなってきた/)).toBeInTheDocument()
      })
    })

    it('「撮り直す」クリックで idle フェーズに戻る', async () => {
      const user = await goToPreview()

      await waitFor(() => screen.getByRole('button', { name: '撮り直す' }))
      await user.click(screen.getByRole('button', { name: '撮り直す' }))

      expect(screen.getByRole('button', { name: /写真を選択/ })).toBeInTheDocument()
    })
  })

  describe('result フェーズ', () => {
    async function goToResult() {
      const user = userEvent.setup()
      render(<PhotoAdviceDialog {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      await userEvent.upload(fileInput, makeFile())

      await waitFor(() => screen.getByRole('button', { name: '解析する' }))
      await user.click(screen.getByRole('button', { name: '解析する' }))

      await waitFor(() => screen.getByRole('button', { name: '保存する' }))

      return user
    }

    it('AIアドバイスが表示される', async () => {
      await goToResult()

      expect(screen.getByText('葉の色が健康的です。このまま管理を続けてください。')).toBeInTheDocument()
    })

    it('推奨アクションが表示される', async () => {
      await goToResult()

      expect(screen.getByText('水やりを継続する')).toBeInTheDocument()
      expect(screen.getByText('日当たりを確認する')).toBeInTheDocument()
    })

    it('「破棄」クリックで onClose が呼ばれる', async () => {
      const onClose = vi.fn()
      vi.spyOn(defaultProps, 'onClose').mockImplementation(onClose)
      const user = await goToResult()

      await user.click(screen.getByRole('button', { name: '破棄' }))

      expect(defaultProps.onClose).toHaveBeenCalled()
    })

    it('「保存する」クリックで onSave が photoPath 付きで呼ばれる', async () => {
      const onSave = vi.fn()
      const user = userEvent.setup()
      render(<PhotoAdviceDialog {...defaultProps} onSave={onSave} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      await userEvent.upload(fileInput, makeFile())

      await waitFor(() => screen.getByRole('button', { name: '解析する' }))
      await user.click(screen.getByRole('button', { name: '解析する' }))

      await waitFor(() => screen.getByRole('button', { name: '保存する' }))
      await user.click(screen.getByRole('button', { name: '保存する' }))

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            vegetableId: 'veg-1',
            adviceText: '葉の色が健康的です。このまま管理を続けてください。',
            urgency: 'normal',
            photoPath: 'https://example.com/photo.jpg',
          })
        )
      })
    })
  })
})
