import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Combobox } from '@/components/ui/Combobox'

const OPTIONS = [
  { value: 'tomato', label: 'トマト' },
  { value: 'eggplant', label: 'ナス' },
  { value: 'cucumber', label: 'キュウリ' },
]

describe('Combobox', () => {
  describe('初期表示', () => {
    it('value が空のとき placeholder を表示する', () => {
      render(<Combobox options={OPTIONS} value="" onChange={vi.fn()} placeholder="野菜を選択" />)
      expect(screen.getByText('野菜を選択')).toBeInTheDocument()
    })

    it('value が選択済みのとき対応するラベルを表示する', () => {
      render(<Combobox options={OPTIONS} value="tomato" onChange={vi.fn()} />)
      expect(screen.getByText('トマト')).toBeInTheDocument()
    })

    it('初期状態でドロップダウンは閉じている', () => {
      render(<Combobox options={OPTIONS} value="" onChange={vi.fn()} />)
      expect(screen.queryByPlaceholderText('検索...')).not.toBeInTheDocument()
    })
  })

  describe('ドロップダウン開閉', () => {
    it('ボタンクリックでドロップダウンが開く', async () => {
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={vi.fn()} />)

      await user.click(screen.getByRole('button'))

      expect(screen.getByPlaceholderText('検索...')).toBeInTheDocument()
      expect(screen.getByText('トマト')).toBeInTheDocument()
    })

    it('Escape キーでドロップダウンが閉じる', async () => {
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={vi.fn()} />)

      await user.click(screen.getByRole('button'))
      // 検索欄にフォーカスを当ててから Escape
      await user.click(screen.getByPlaceholderText('検索...'))
      await user.keyboard('{Escape}')

      expect(screen.queryByPlaceholderText('検索...')).not.toBeInTheDocument()
    })

    it('ボタンを再クリックするとドロップダウンが閉じる', async () => {
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={vi.fn()} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByRole('button'))

      expect(screen.queryByPlaceholderText('検索...')).not.toBeInTheDocument()
    })
  })

  describe('検索', () => {
    it('入力テキストで絞り込まれる', async () => {
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={vi.fn()} />)

      await user.click(screen.getByRole('button'))
      await user.type(screen.getByPlaceholderText('検索...'), 'トマト')

      expect(screen.getByText('トマト')).toBeInTheDocument()
      expect(screen.queryByText('ナス')).not.toBeInTheDocument()
    })

    it('該当なしのとき「該当する項目がありません」を表示する', async () => {
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={vi.fn()} />)

      await user.click(screen.getByRole('button'))
      await user.type(screen.getByPlaceholderText('検索...'), 'xxxxxxx')

      expect(screen.getByText('該当する項目がありません')).toBeInTheDocument()
    })
  })

  describe('選択', () => {
    it('オプションクリックで onChange が呼ばれる', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={onChange} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByText('ナス'))

      expect(onChange).toHaveBeenCalledWith('eggplant')
    })

    it('選択後にドロップダウンが閉じる', async () => {
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={vi.fn()} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByText('トマト'))

      expect(screen.queryByPlaceholderText('検索...')).not.toBeInTheDocument()
    })
  })

  describe('キーボード操作', () => {
    it('ArrowDown → Enter で最初の項目を選択できる', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={onChange} />)

      await user.click(screen.getByRole('button'))
      // 検索欄にフォーカスしてからキーボード操作
      await user.click(screen.getByPlaceholderText('検索...'))
      await user.keyboard('{ArrowDown}{Enter}')

      expect(onChange).toHaveBeenCalledWith('tomato')
    })

    it('ArrowDown x3 → Enter で3番目の項目を選択できる', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()
      render(<Combobox options={OPTIONS} value="" onChange={onChange} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByPlaceholderText('検索...'))
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{Enter}')

      expect(onChange).toHaveBeenCalledWith('cucumber')
    })
  })
})
