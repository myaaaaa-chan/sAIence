import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '@/components/ui/Dialog'

describe('Dialog', () => {
  describe('open=false', () => {
    it('何も描画しない', () => {
      render(<Dialog open={false} onClose={vi.fn()}>内容</Dialog>)
      expect(screen.queryByText('内容')).not.toBeInTheDocument()
    })
  })

  describe('open=true', () => {
    it('children が表示される', () => {
      render(<Dialog open onClose={vi.fn()}>ダイアログの中身</Dialog>)
      expect(screen.getByText('ダイアログの中身')).toBeInTheDocument()
    })

    it('title が表示される', () => {
      render(<Dialog open onClose={vi.fn()} title="設定">内容</Dialog>)
      expect(screen.getByText('設定')).toBeInTheDocument()
    })

    it('title がない場合はタイトル要素を表示しない', () => {
      render(<Dialog open onClose={vi.fn()}>内容</Dialog>)
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('× ボタンクリックで onClose が呼ばれる', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<Dialog open onClose={onClose} title="確認">内容</Dialog>)

      await user.click(screen.getByRole('button'))

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('Escape キーで onClose が呼ばれる', async () => {
      const onClose = vi.fn()
      const user = userEvent.setup()
      render(<Dialog open onClose={onClose}>内容</Dialog>)

      await user.keyboard('{Escape}')

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
