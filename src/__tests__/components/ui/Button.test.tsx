import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  describe('表示', () => {
    it('children が表示される', () => {
      render(<Button>保存する</Button>)
      expect(screen.getByRole('button', { name: '保存する' })).toBeInTheDocument()
    })

    it('disabled 時に disabled 属性が付く', () => {
      render(<Button disabled>保存する</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('クリック操作', () => {
    it('クリックで onClick が呼ばれる', async () => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      render(<Button onClick={onClick}>送信</Button>)

      await user.click(screen.getByRole('button'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('disabled 時はクリックしても onClick が呼ばれない', async () => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      render(<Button disabled onClick={onClick}>送信</Button>)

      await user.click(screen.getByRole('button'))

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('variant', () => {
    it('primary（デフォルト）は緑背景クラスを持つ', () => {
      render(<Button variant="primary">ボタン</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-green-600')
    })

    it('danger は赤背景クラスを持つ', () => {
      render(<Button variant="danger">削除</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-red-50')
    })

    it('ghost は透明背景クラスを持つ', () => {
      render(<Button variant="ghost">キャンセル</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-transparent')
    })
  })
})
