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
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = '選択してください',
  searchPlaceholder = '検索...',
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((o) => o.value === value)?.label ?? ''

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

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
        setHighlightIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightIndex >= 0 && filtered[highlightIndex]) {
          select(filtered[highlightIndex].value)
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
        className="w-full border-[1.5px] border-gray-200 rounded-lg px-3 py-2.5 text-sm text-left bg-white cursor-pointer flex items-center justify-between focus:outline-none focus:border-emerald-900 focus:ring-[3px] focus:ring-emerald-900/8"
      >
        <span className={selectedLabel ? 'text-gray-900' : 'text-gray-400'}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown size={16} className="text-gray-500 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border-[1.5px] border-gray-200 rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50 max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-gray-100">
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
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-900"
            />
          </div>
          <div ref={listRef}>
            {filtered.length === 0 ? (
              <div className="px-3.5 py-2.5 text-sm text-gray-400">
                該当する項目がありません
              </div>
            ) : (
              filtered.map((option, i) => (
                <div
                  key={option.value}
                  data-combobox-item
                  onClick={() => select(option.value)}
                  className={`px-3.5 py-2.5 cursor-pointer text-sm border-b border-gray-50 last:border-b-0 transition-colors ${
                    i === highlightIndex
                      ? 'bg-green-50 text-emerald-900'
                      : option.value === value
                        ? 'bg-green-50/50 text-emerald-900'
                        : 'hover:bg-green-50 hover:text-emerald-900'
                  }`}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
