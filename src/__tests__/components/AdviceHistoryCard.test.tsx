import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AdviceHistoryCard } from '@/features/photo-advice/components/AdviceHistoryCard'
import type { Advice } from '@/types'

function makeAdvice(overrides: Partial<Advice> = {}): Advice {
  return {
    id: 'a1',
    vegetableId: 'veg-1',
    adviceText: '葉の色が健康的です。このまま管理を続けてください。',
    urgency: 'normal',
    createdAt: '2024-04-15T10:00:00.000Z',
    isDiscarded: false,
    ...overrides,
  }
}

describe('AdviceHistoryCard', () => {
  it('アドバイステキストが表示される', () => {
    render(<AdviceHistoryCard advice={makeAdvice()} />)
    expect(screen.getByText('葉の色が健康的です。このまま管理を続けてください。')).toBeInTheDocument()
  })

  it('作成日時が日本語形式で表示される', () => {
    render(<AdviceHistoryCard advice={makeAdvice()} />)
    expect(screen.getByText(/2024年4月15日/)).toBeInTheDocument()
  })

  it('緊急度バッジが表示される', () => {
    render(<AdviceHistoryCard advice={makeAdvice({ urgency: 'urgent' })} />)
    expect(screen.getByText('緊急')).toBeInTheDocument()
  })

  it('userComment がある場合は表示される', () => {
    render(<AdviceHistoryCard advice={makeAdvice({ userComment: '葉が黄色くなっています' })} />)
    expect(screen.getByText(/葉が黄色くなっています/)).toBeInTheDocument()
  })

  it('userComment がない場合は表示されない', () => {
    render(<AdviceHistoryCard advice={makeAdvice({ userComment: undefined })} />)
    expect(screen.queryByText(/💬/)).not.toBeInTheDocument()
  })

  it('photoPath がある場合は画像が表示される', () => {
    render(<AdviceHistoryCard advice={makeAdvice({ photoPath: 'https://example.com/photo.jpg' })} />)
    const img = screen.getByRole('img', { name: 'アドバイス写真' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('photoPath がない場合は画像が表示されない', () => {
    render(<AdviceHistoryCard advice={makeAdvice({ photoPath: undefined })} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it.each([
    ['normal', 'border-green-400'],
    ['attention', 'border-orange-400'],
    ['urgent', 'border-red-400'],
  ] as const)('urgency=%s のとき左ボーダーに %s クラスが付く', (urgency, cls) => {
    const { container } = render(<AdviceHistoryCard advice={makeAdvice({ urgency })} />)
    expect(container.firstChild).toHaveClass(cls)
  })
})
