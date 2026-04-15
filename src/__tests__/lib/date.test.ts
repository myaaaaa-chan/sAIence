import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatDateJa,
  toISODateString,
  todayString,
  daysFromNow,
  getDaysInMonth,
} from '@/lib/date'

describe('formatDate', () => {
  it('デフォルトフォーマット yyyy-MM-dd で返す', () => {
    expect(formatDate('2024-04-01')).toBe('2024-04-01')
  })

  it('カスタムフォーマットで返す', () => {
    expect(formatDate('2024-04-01', 'yyyy年M月d日')).toBe('2024年4月1日')
  })

  it('月・日がゼロ埋めされる', () => {
    expect(formatDate('2024-01-09')).toBe('2024-01-09')
  })
})

describe('formatDateJa', () => {
  it('M月d日(E) 形式で返す', () => {
    const result = formatDateJa('2024-04-01')
    expect(result).toBe('4月1日(月)')
  })

  it('曜日が日本語で含まれる', () => {
    const result = formatDateJa('2024-04-07')
    expect(result).toBe('4月7日(日)')
  })
})

describe('toISODateString', () => {
  it('Date オブジェクトを yyyy-MM-dd 文字列に変換する', () => {
    expect(toISODateString(new Date(2024, 3, 1))).toBe('2024-04-01')
  })

  it('月末日を正しく変換する', () => {
    expect(toISODateString(new Date(2024, 1, 29))).toBe('2024-02-29')
  })
})

describe('todayString', () => {
  it('yyyy-MM-dd 形式の文字列を返す', () => {
    expect(todayString()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('実際の今日の日付と一致する', () => {
    const today = new Date()
    const expected = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    expect(todayString()).toBe(expected)
  })
})

describe('daysFromNow', () => {
  it('未来の日付は正の値を返す', () => {
    const future = new Date()
    future.setDate(future.getDate() + 10)
    expect(daysFromNow(toISODateString(future))).toBeGreaterThan(0)
  })

  it('過去の日付は負の値を返す', () => {
    const past = new Date()
    past.setDate(past.getDate() - 5)
    expect(daysFromNow(toISODateString(past))).toBeLessThan(0)
  })

  it('今日は 0 を返す', () => {
    expect(daysFromNow(todayString())).toBe(0)
  })
})

describe('getDaysInMonth', () => {
  it('1月は31日分返す', () => {
    expect(getDaysInMonth(2024, 1)).toHaveLength(31)
  })

  it('うるう年2月は29日分返す', () => {
    expect(getDaysInMonth(2024, 2)).toHaveLength(29)
  })

  it('平年2月は28日分返す', () => {
    expect(getDaysInMonth(2023, 2)).toHaveLength(28)
  })

  it('4月は30日分返す', () => {
    expect(getDaysInMonth(2024, 4)).toHaveLength(30)
  })

  it('最初の要素が月初、最後の要素が月末', () => {
    const days = getDaysInMonth(2024, 4)
    expect(days[0]).toBe('2024-04-01')
    expect(days[days.length - 1]).toBe('2024-04-30')
  })

  it('全要素が yyyy-MM-dd 形式', () => {
    const days = getDaysInMonth(2024, 3)
    days.forEach((d) => {
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })
})
