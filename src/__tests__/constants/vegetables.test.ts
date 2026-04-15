import { describe, it, expect } from 'vitest'
import { VEGETABLES, CATEGORIES, type VegetableCategory } from '@/constants/vegetables'

const VALID_CATEGORIES: VegetableCategory[] = ['fruit', 'leaf', 'root', 'bean', 'herb', 'berry']

describe('VEGETABLES マスタ', () => {
  it('79品目が定義されている', () => {
    expect(VEGETABLES).toHaveLength(79)
  })

  it('全品目に id が存在する', () => {
    VEGETABLES.forEach((v) => {
      expect(v.id, `${v.name} の id が空`).toBeTruthy()
    })
  })

  it('全品目に name が存在する', () => {
    VEGETABLES.forEach((v) => {
      expect(v.name, `id=${v.id} の name が空`).toBeTruthy()
    })
  })

  it('id に重複がない', () => {
    const ids = VEGETABLES.map((v) => v.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('name に重複がない', () => {
    const names = VEGETABLES.map((v) => v.name)
    const unique = new Set(names)
    expect(unique.size).toBe(names.length)
  })

  it('全品目の category が有効な値', () => {
    VEGETABLES.forEach((v) => {
      expect(VALID_CATEGORIES, `${v.name} の category "${v.category}" が不正`).toContain(v.category)
    })
  })

  it('aliases が配列として存在する', () => {
    VEGETABLES.forEach((v) => {
      expect(Array.isArray(v.aliases), `${v.name} の aliases が配列でない`).toBe(true)
    })
  })
})

describe('CATEGORIES', () => {
  it('6カテゴリが定義されている', () => {
    expect(CATEGORIES).toHaveLength(6)
  })

  it('全カテゴリに id・name・icon が存在する', () => {
    CATEGORIES.forEach((c) => {
      expect(c.id).toBeTruthy()
      expect(c.name).toBeTruthy()
      expect(c.icon).toBeTruthy()
    })
  })

  it('各カテゴリに少なくとも1品目が存在する', () => {
    CATEGORIES.forEach((cat) => {
      const count = VEGETABLES.filter((v) => v.category === cat.id).length
      expect(count, `カテゴリ "${cat.name}" に品目がない`).toBeGreaterThan(0)
    })
  })
})
