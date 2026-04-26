'use client'

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react'
import { ChevronDown } from 'lucide-react'

interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  allowCustomValue?: boolean
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = '選択してください',
  searchPlaceholder = '検索...',
  allowCustomValue = false,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  const trimmedSearch = search.trim()
  const showCustomOption =
    allowCustomValue &&
    trimmedSearch.length > 0 &&
    !options.some((o) => o.label === trimmedSearch)
  const totalItems = filtered.length + (showCustomOption ? 1 : 0)

  const open = useCallback(() => {
    setIsOpen(true)
    setSearch('')
    setHighlightIndex(-1)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setSearch('')
    setHighlightIndex(-1)
  }, [])

  const select = useCallback(
    (val: string) => {
      onChange(val)
      close()
    },
    [onChange, close]
  )

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, close])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return
    const items = listRef.current.querySelectorAll('[data-combobox-item]')
    items[highlightIndex]?.scrollIntoView({ block: 'nearest' })
  }, [highlightIndex])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          select(filtered[highlightIndex].value)
        } else if (highlightIndex === filtered.length && showCustomOption) {
          select(trimmedSearch)
        } else if (showCustomOption && highlightIndex < 0) {
          select(trimmedSearch)
        }
        break
      case 'Escape':
        e.preventDefault()
        close()
        break
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => (isOpen ? close() : open())}
        className="w-full border-[1.5px] border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm text-left bg-white dark:bg-gray-900 cursor-pointer flex items-center justify-between focus:outline-none focus:border-emerald-900 focus:ring-[3px] focus:ring-emerald-900/8"
      >
        <span className={value ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}>
          {value ? selectedLabel : placeholder}
        </span>
        <ChevronDown size={16} className="text-gray-700 dark:text-gray-300 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-gray-900 border-[1.5px] border-gray-300 dark:border-gray-600 rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] z-50 max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-gray-300 dark:border-gray-600">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setHighlightIndex(-1)
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-emerald-900"
            />
          </div>
          <div ref={listRef}>
            {filtered.length === 0 && !showCustomOption && (
              <div className="px-3.5 py-2.5 text-sm text-gray-600 dark:text-gray-400">
                該当する項目がありません
              </div>
            )}
            {filtered.map((option, i) => (
              <div
                key={option.value}
                data-combobox-item
                onClick={() => select(option.value)}
                className={`px-3.5 py-2.5 cursor-pointer text-sm border-b border-gray-50 dark:border-gray-700 last:border-b-0 transition-colors ${
                  i === highlightIndex
                    ? 'bg-green-50 dark:bg-green-900/30 text-emerald-900 dark:text-emerald-300'
                    : option.value === value
                      ? 'bg-green-50/50 dark:bg-green-900/20 text-emerald-900 dark:text-emerald-300'
                      : 'hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-emerald-900 dark:hover:text-emerald-300'
                }`}
              >
                {option.label}
              </div>
            ))}
            {showCustomOption && (
              <div
                data-combobox-item
                onClick={() => select(trimmedSearch)}
                className={`px-3.5 py-2.5 cursor-pointer text-sm border-t border-gray-200 dark:border-gray-600 transition-colors flex items-center gap-2 ${
                  highlightIndex === filtered.length
                    ? 'bg-green-50 dark:bg-green-900/30 text-emerald-900 dark:text-emerald-300'
                    : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                }`}
              >
                <span className="text-base leading-none">+</span>
                <span>「{trimmedSearch}」を追加</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
