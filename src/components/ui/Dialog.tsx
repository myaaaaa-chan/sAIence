'use client'

import { useEffect, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[18px] w-full max-w-[460px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 pt-5 mb-5">
            <h2 className="text-[17px] font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className={title ? 'px-6 pb-6' : 'p-6'}>{children}</div>
      </div>
    </div>,
    document.body
  )
}
