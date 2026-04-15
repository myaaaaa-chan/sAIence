import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EventTypeBadge, UrgencyBadge } from '@/components/ui/Badge'

describe('EventTypeBadge', () => {
  it.each([
    ['fertilizing', '施肥'],
    ['pinching', '摘心'],
    ['harvesting', '収穫'],
    ['watering', '水やり'],
    ['other', 'その他'],
  ] as const)('type=%s のとき "%s" を表示する', (type, label) => {
    render(<EventTypeBadge type={type} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})

describe('UrgencyBadge', () => {
  it.each([
    ['normal', '正常'],
    ['attention', '注意'],
    ['urgent', '緊急'],
  ] as const)('urgency=%s のとき "%s" を表示する', (urgency, label) => {
    render(<UrgencyBadge urgency={urgency} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('normal は緑クラスを持つ', () => {
    render(<UrgencyBadge urgency="normal" />)
    expect(screen.getByText('正常')).toHaveClass('bg-green-100')
  })

  it('attention はオレンジクラスを持つ', () => {
    render(<UrgencyBadge urgency="attention" />)
    expect(screen.getByText('注意')).toHaveClass('bg-orange-100')
  })

  it('urgent は赤クラスを持つ', () => {
    render(<UrgencyBadge urgency="urgent" />)
    expect(screen.getByText('緊急')).toHaveClass('bg-red-100')
  })
})
