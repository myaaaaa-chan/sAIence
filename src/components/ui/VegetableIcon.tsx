'use client'

import type { ReactNode } from 'react'

type I = { s: number }

// ── 果菜類 ───────────────────────────────────────────────────────────────────

function TomatoIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="14" r="8" fill="#E53935"/>
      <ellipse cx="10" cy="12" rx="2.5" ry="1.5" fill="#EF5350" opacity="0.3"/>
      <path d="M12 6V3.5M9.5 5C8.5 3 6.5 2.5 6 3M14.5 5C15.5 3 17.5 2.5 18 3" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function MiniTomatoIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="8.5" cy="15" r="5.5" fill="#E53935"/>
      <circle cx="16.5" cy="14" r="4.5" fill="#EF5350"/>
      <path d="M8.5 9.5V7.5M7 8.5C6 7 4.5 6.5 4 7M10 8.5C11 7 12.5 6.5 13 7" stroke="#388E3C" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M16.5 9.5V8M15.5 9C14.5 7.5 13 7 12.5 7.5M17.5 9C18.5 7.5 20 7 20.5 7.5" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function EggplantIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12.5" cy="15" rx="5.5" ry="7.5" fill="#7B1FA2" transform="rotate(-15 12.5 15)"/>
      <ellipse cx="11" cy="14" rx="2" ry="4" fill="#9C27B0" transform="rotate(-15 11 14)" opacity="0.4"/>
      <path d="M12 7.5C11 5.5 11.5 3.5 13 3C14 4 13.5 6 12 7.5Z" fill="#388E3C"/>
      <path d="M12 7.5C13.5 6 15 5.5 16 6.5C15.5 8 14 8.5 12 7.5Z" fill="#4CAF50"/>
    </svg>
  )
}

function GreenPepperIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M8 9C7 11 6.5 14 7.5 17C8.5 20 10.5 21.5 12 21.5C13.5 21.5 15.5 20 16.5 17C17.5 14 17 11 16 9C15 7 13.5 5.5 12 5.5C10.5 5.5 9 7 8 9Z" fill="#4CAF50"/>
      <ellipse cx="10.5" cy="13" rx="1.5" ry="3" fill="#66BB6A" opacity="0.4"/>
      <path d="M12 5.5V3.5" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 3.5C11.5 2.5 9.5 2 9 3" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function PaprikaIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M7 10C6 12 5.5 15 6.5 18C7.5 20.5 9.5 22 12 22C14.5 22 16.5 20.5 17.5 18C18.5 15 18 12 17 10C16 8 14 6 12 6C10 6 8 8 7 10Z" fill="#FF7043"/>
      <ellipse cx="10" cy="14" rx="2" ry="3.5" fill="#FF8A65" opacity="0.4"/>
      <path d="M12 6V3.5" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 3.5C11.5 2 9.5 1.5 9 2.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function CucumberIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="13" rx="4" ry="9" fill="#66BB6A" transform="rotate(-15 12 13)"/>
      <ellipse cx="10.5" cy="12" rx="1.8" ry="5" fill="#81C784" transform="rotate(-15 10.5 12)" opacity="0.5"/>
      <line x1="9" y1="9" x2="11" y2="10" stroke="#2E7D32" strokeWidth="0.7" opacity="0.5"/>
      <line x1="10" y1="13" x2="12" y2="14" stroke="#2E7D32" strokeWidth="0.7" opacity="0.5"/>
      <line x1="11" y1="17" x2="13" y2="18" stroke="#2E7D32" strokeWidth="0.7" opacity="0.5"/>
      <path d="M15 4.5C16.5 3.5 18 4 18 4" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function ZucchiniIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="13" rx="3.5" ry="9.5" fill="#558B2F" transform="rotate(-8 12 13)"/>
      <ellipse cx="11" cy="12" rx="1.5" ry="5.5" fill="#7CB342" transform="rotate(-8 11 12)" opacity="0.5"/>
      <path d="M14 3.5C15.5 2.5 17 3 17 3" stroke="#33691E" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 3.5C8.5 2.5 7 3 7 3" stroke="#33691E" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function PumpkinIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="15" rx="9" ry="7" fill="#E65100"/>
      <ellipse cx="12" cy="15" rx="9" ry="7" fill="none" stroke="#BF360C" strokeWidth="0.4"/>
      <line x1="9" y1="9" x2="9" y2="21" stroke="#BF360C" strokeWidth="0.8" opacity="0.35"/>
      <line x1="12" y1="8" x2="12" y2="22" stroke="#BF360C" strokeWidth="0.8" opacity="0.35"/>
      <line x1="15" y1="9" x2="15" y2="21" stroke="#BF360C" strokeWidth="0.8" opacity="0.35"/>
      <path d="M12 8V5M10 6.5C9 5 7.5 4.5 7 5M14 6.5C15 5 16.5 4.5 17 5" stroke="#388E3C" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M12 5C11.5 3.5 12 2.5 12 2.5C12 2.5 12.5 3.5 12 5Z" fill="#388E3C"/>
    </svg>
  )
}

function WatermelonIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12Z" fill="#E53935"/>
      <path d="M4.4 12C4.4 7.8 7.8 4.4 12 4.4C16.2 4.4 19.6 7.8 19.6 12Z" fill="#EF5350" opacity="0.3"/>
      <path d="M4 12C4 7.6 7.6 4 12 4" stroke="#4CAF50" strokeWidth="2.5" fill="none"/>
      <path d="M12 4C16.4 4 20 7.6 20 12" stroke="#66BB6A" strokeWidth="1.5" fill="none"/>
      <line x1="4" y1="12" x2="20" y2="12" stroke="#388E3C" strokeWidth="1.3"/>
      <circle cx="9" cy="9" r="0.9" fill="#1B5E20"/>
      <circle cx="13" cy="8" r="0.9" fill="#1B5E20"/>
      <circle cx="16" cy="10" r="0.9" fill="#1B5E20"/>
      <line x1="8" y1="6.5" x2="8" y2="12" stroke="#4CAF50" strokeWidth="0.7" opacity="0.5"/>
      <line x1="12" y1="4.5" x2="12" y2="12" stroke="#4CAF50" strokeWidth="0.7" opacity="0.5"/>
      <line x1="16" y1="6.5" x2="16" y2="12" stroke="#4CAF50" strokeWidth="0.7" opacity="0.5"/>
    </svg>
  )
}

function MelonIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="9" fill="#C8E6C9"/>
      <path d="M5 9C8 7.5 16 7.5 19 9" stroke="#A5D6A7" strokeWidth="0.7" fill="none"/>
      <path d="M3.5 13C7 11 17 11 20.5 13" stroke="#A5D6A7" strokeWidth="0.7" fill="none"/>
      <path d="M4.5 17C7.5 19 16.5 19 19.5 17" stroke="#A5D6A7" strokeWidth="0.7" fill="none"/>
      <path d="M8 5C9 4 12 3.5 16 5" stroke="#A5D6A7" strokeWidth="0.7" fill="none"/>
      <path d="M12 4.5V2.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 2.5C12.5 1.5 14.5 1.5 14.5 2.5" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function CornIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 6C8.5 8 8 10 8 13C8 16 9 19 12 21C15 19 16 16 16 13C16 10 15.5 8 15 6C14 4.5 13 4 12 4C11 4 10 4.5 9 6Z" fill="#FDD835"/>
      <path d="M8 13C6.5 12 5.5 10 6 8C7 7.5 8 9 8 11" fill="#66BB6A"/>
      <path d="M16 13C17.5 12 18.5 10 18 8C17 7.5 16 9 16 11" fill="#66BB6A"/>
      <path d="M9 6C8.5 4 9 2 10 1.5" stroke="#66BB6A" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M12 4V2" stroke="#66BB6A" strokeWidth="1.1" strokeLinecap="round"/>
      <circle cx="10.5" cy="9" r="0.65" fill="#F9A825"/>
      <circle cx="12" cy="9" r="0.65" fill="#F9A825"/>
      <circle cx="13.5" cy="9" r="0.65" fill="#F9A825"/>
      <circle cx="10.5" cy="11.5" r="0.65" fill="#F9A825"/>
      <circle cx="12" cy="11.5" r="0.65" fill="#F9A825"/>
      <circle cx="13.5" cy="11.5" r="0.65" fill="#F9A825"/>
      <circle cx="10.5" cy="14" r="0.65" fill="#F9A825"/>
      <circle cx="12" cy="14" r="0.65" fill="#F9A825"/>
      <circle cx="13.5" cy="14" r="0.65" fill="#F9A825"/>
      <circle cx="11.2" cy="16.5" r="0.65" fill="#F9A825"/>
      <circle cx="12.8" cy="16.5" r="0.65" fill="#F9A825"/>
    </svg>
  )
}

function OkraIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L14 8L19.5 9L15.5 13L17 18.5L12 16L7 18.5L8.5 13L4.5 9L10 8Z" fill="#66BB6A" stroke="#388E3C" strokeWidth="0.5"/>
      <circle cx="12" cy="11.5" r="2.5" fill="#4CAF50"/>
      <circle cx="12" cy="11.5" r="1" fill="#2E7D32"/>
      <line x1="12" y1="16" x2="12" y2="21.5" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function EdamameIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 14C5 10 8 7.5 12 7.5C16 7.5 19 10 19 14C19 16.5 17.5 18.5 15 19.5C14 18 13 17.5 12 17.5C11 17.5 10 18 9 19.5C6.5 18.5 5 16.5 5 14Z" fill="#66BB6A"/>
      <circle cx="9.5" cy="14" r="2.5" fill="#81C784"/>
      <circle cx="14.5" cy="14" r="2.5" fill="#81C784"/>
      <path d="M12 7.5V5.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 5.5C11.5 4 13.5 2.5 14.5 3.5" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function GreenBeanIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 6C4 6 3 8 4 11.5C5 15 7.5 18 10 19.5C11 20 12.5 20 13 19.5C13.5 19 14.5 17.5 16 15.5C17.5 13.5 19.5 10.5 20 8.5C20.5 6.5 19.5 5.5 19 5.5C18.5 5.5 17 6.5 15.5 8C14 9.5 12 12 10.5 12.5C9 13 7 12 6 10C5 8.5 4 6 4 6Z" fill="#66BB6A"/>
      <circle cx="9.5" cy="12.5" r="1.3" fill="#4CAF50"/>
      <circle cx="12.5" cy="14.5" r="1.3" fill="#4CAF50"/>
      <circle cx="15.5" cy="11.5" r="1.3" fill="#4CAF50"/>
    </svg>
  )
}

function BitterMelonIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="14" rx="4.5" ry="8.5" fill="#66BB6A" transform="rotate(-8 12 14)"/>
      <path d="M8 9C8.5 8 9 8 9.5 10C10 12 9.5 15 9 16" stroke="#388E3C" strokeWidth="0.6" fill="none"/>
      <path d="M10 7C10.5 6 11 6.5 11.5 8.5C12 10.5 11.5 14 11 16" stroke="#388E3C" strokeWidth="0.6" fill="none"/>
      <path d="M13 7C13.5 6 14 6.5 14.5 8.5C15 10.5 14.5 14 14 16" stroke="#388E3C" strokeWidth="0.6" fill="none"/>
      <path d="M15 9C15.5 8 16 8 16.5 10C17 12 16.5 15 16 16" stroke="#388E3C" strokeWidth="0.6" fill="none"/>
      <path d="M12 5.5V3.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 5C8.5 3.5 7 4 7 4.5" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function ShishitoIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M13 5.5C15 6.5 16.5 8.5 17 11C17.5 14 16.5 17.5 15 19.5C14 21 12.5 21.5 12 21.5C11.5 21.5 10 21 9 19.5C7.5 17.5 6.5 14 7 11C7.5 8.5 9 6.5 11 5.5C11.5 5 12.5 5 13 5.5Z" fill="#4CAF50"/>
      <path d="M13 5.5V3.5" stroke="#388E3C" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M13 3.5C13.5 2 15.5 1.5 16 2.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function ChiliIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 6C16.5 7.5 18 10 18 13C18 17 16 20.5 13.5 22C12.5 22.5 11 22.5 10.5 22C9 20.5 7.5 17 7.5 13C7.5 9 9.5 6.5 12 5.5L15 6Z" fill="#E53935"/>
      <ellipse cx="12.5" cy="13" rx="1.5" ry="4" fill="#EF5350" opacity="0.3"/>
      <path d="M15 6V3.5" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 3.5C16 2 17.5 1.5 18.5 2.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function WinterMelonIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="13" rx="9" ry="8" fill="#546E7A"/>
      <path d="M5 9C8 8 16 8 19 9" stroke="#78909C" strokeWidth="0.6" fill="none"/>
      <path d="M3.5 13C7 12 17 12 20.5 13" stroke="#78909C" strokeWidth="0.6" fill="none"/>
      <path d="M5 17C8 18 16 18 19 17" stroke="#78909C" strokeWidth="0.6" fill="none"/>
      <path d="M12 5V3" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 4.5C8.5 3 7 3.5 7 4" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

// ── 葉菜類 ───────────────────────────────────────────────────────────────────

function LettuceIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 20C8 20 5 17 5 14C5 10 7.5 7.5 12 7.5C16.5 7.5 19 10 19 14C19 17 16 20 12 20Z" fill="#81C784"/>
      <path d="M5.5 11C8 9 10.5 8.5 12 8.5C13.5 8.5 16 9 18.5 11" stroke="#4CAF50" strokeWidth="0.8" fill="none"/>
      <path d="M5 14C7.5 12.5 9.5 12 12 12C14.5 12 16.5 12.5 19 14" stroke="#4CAF50" strokeWidth="0.8" fill="none"/>
      <path d="M12 7.5C11 5.5 11 4 12 3.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function SunnyLettuceIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 20C8 20 5 17 5 14C5 10 7.5 7.5 12 7.5C16.5 7.5 19 10 19 14C19 17 16 20 12 20Z" fill="#C62828" opacity="0.8"/>
      <path d="M5.5 11C8 9 10.5 8.5 12 8.5C13.5 8.5 16 9 18.5 11" stroke="#B71C1C" strokeWidth="0.8" fill="none"/>
      <path d="M5 14C7.5 12.5 9.5 12 12 12C14.5 12 16.5 12.5 19 14" stroke="#B71C1C" strokeWidth="0.8" fill="none"/>
      <path d="M12 7.5C11 5.5 11 4 12 3.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function CabbageIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13.5" r="8" fill="#81C784"/>
      <circle cx="12" cy="13.5" r="5.5" fill="#A5D6A7"/>
      <circle cx="12" cy="13.5" r="3" fill="#C8E6C9"/>
      <path d="M5.5 10C8 8 10.5 7.5 12 7.5C13.5 7.5 16 8 18.5 10" stroke="#4CAF50" strokeWidth="0.7" fill="none"/>
      <path d="M4.5 14C7 12.5 9.5 12 12 12C14.5 12 17 12.5 19.5 14" stroke="#4CAF50" strokeWidth="0.7" fill="none"/>
    </svg>
  )
}

function ChineseCabbageIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M8 7C7.5 9 7 11 7 14C7 17 8 20 9.5 21C10.5 21.5 12 21.5 12 21.5C12 21.5 13.5 21.5 14.5 21C16 20 17 17 17 14C17 11 16.5 9 16 7" fill="#A5D6A7"/>
      <path d="M10 5C10 5 9.5 7 9.5 10C9.5 14 10.5 18 12 21.5" stroke="#E8F5E9" strokeWidth="1.8" fill="none"/>
      <path d="M14 5C14 5 14.5 7 14.5 10C14.5 14 13.5 18 12 21.5" stroke="#E8F5E9" strokeWidth="1.8" fill="none"/>
      <path d="M8 9C9 8 10.5 7.5 12 7.5C13.5 7.5 15 8 16 9" stroke="#66BB6A" strokeWidth="0.7" fill="none"/>
      <path d="M12 7.5V5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function SpinachIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="20" x2="12" y2="6" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 9C12 9 9.5 8 8 6C9 5 11 5.5 12 9Z" fill="#4CAF50"/>
      <path d="M12 12C12 12 14.5 11 16 9C15 8 13 8.5 12 12Z" fill="#4CAF50"/>
      <path d="M12 15C12 15 9.5 14 8 12C9 11 11 11.5 12 15Z" fill="#4CAF50"/>
      <path d="M12 18C12 18 14.5 17 16 15C15 14 13 14.5 12 18Z" fill="#4CAF50"/>
    </svg>
  )
}

function LeafyGreenIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 18C6 18 5 14 6 10C7 6 9 4 12 4C13 6 13 8 12 10C14 8 16.5 7 18.5 8C18.5 11 16.5 14 14 16C12 18 9 19 6 18Z" fill="#4CAF50"/>
      <line x1="12" y1="4" x2="6" y2="18" stroke="#2E7D32" strokeWidth="1" strokeLinecap="round"/>
      <path d="M12 10C11 12 9.5 14 8.5 15.5" stroke="#2E7D32" strokeWidth="0.7" fill="none"/>
      <path d="M12 10C13 12 14 13.5 14.5 16" stroke="#2E7D32" strokeWidth="0.7" fill="none"/>
    </svg>
  )
}

function BroccoliIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="3.5" fill="#388E3C"/>
      <circle cx="15" cy="9" r="3.5" fill="#388E3C"/>
      <circle cx="12" cy="7" r="3.5" fill="#4CAF50"/>
      <circle cx="9" cy="9" r="2" fill="#4CAF50"/>
      <circle cx="15" cy="9" r="2" fill="#4CAF50"/>
      <rect x="10.5" y="12" width="3" height="9" rx="1.5" fill="#66BB6A"/>
      <path d="M10.5 14.5C9 14.5 8 13.5 8 13.5V15.5C8 15.5 9 16.5 10.5 16.5" fill="#A5D6A7" opacity="0.4"/>
    </svg>
  )
}

function CauliflowerIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9.5" r="3" fill="#EEEEEE"/>
      <circle cx="15" cy="9.5" r="3" fill="#EEEEEE"/>
      <circle cx="12" cy="7.5" r="3" fill="#F5F5F5"/>
      <circle cx="9" cy="9.5" r="1.5" fill="#E0E0E0"/>
      <circle cx="15" cy="9.5" r="1.5" fill="#E0E0E0"/>
      <circle cx="12" cy="7.5" r="1.5" fill="#E0E0E0"/>
      <path d="M7 13C7 13 8 15 12 15C16 15 17 13 17 13C17 14.5 16 16.5 12 16.5C8 16.5 7 14.5 7 13Z" fill="#81C784"/>
      <rect x="10.5" y="16" width="3" height="6" rx="1.5" fill="#81C784"/>
    </svg>
  )
}

function AsparagusIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M10 4C10 3 11 2 11.5 2C12 2 12.5 3 12 4" fill="#388E3C"/>
      <line x1="11" y1="4" x2="11" y2="22" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M14 6C14 5 15 4 15.5 4C16 4 16.5 5 16 6" fill="#388E3C"/>
      <line x1="15" y1="6" x2="15" y2="22" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M11 7C10 7 9 6 9 5C10 4.5 11 5.5 11 7Z" fill="#66BB6A"/>
      <path d="M15 9C14 9 13 8 13 7C14 6.5 15 7.5 15 9Z" fill="#66BB6A"/>
      <path d="M11 11C12 11 13 10 13 9C12 8.5 11 9.5 11 11Z" fill="#66BB6A"/>
    </svg>
  )
}

function CeleryIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="9" y1="21" x2="9" y2="9" stroke="#A5D6A7" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="12" y1="21" x2="12" y2="7" stroke="#81C784" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="15" y1="21" x2="15" y2="9" stroke="#A5D6A7" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M9 9C7.5 7.5 6.5 6 7 4.5C8.5 4 9.5 5.5 9 8.5" fill="#4CAF50"/>
      <path d="M12 7C12 5 13 3.5 14.5 3.5C14.5 5.5 13.5 6.5 12 7Z" fill="#4CAF50"/>
      <path d="M15 9C16.5 7.5 17.5 6 17 4.5C15.5 4 14.5 5.5 15 8.5" fill="#4CAF50"/>
    </svg>
  )
}

function LeekIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 8C7.5 6.5 7 4 9.5 2" stroke="#2E7D32" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 8V1.5" stroke="#388E3C" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M15 8C16.5 6.5 17 4 14.5 2" stroke="#2E7D32" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M9.5 8.5 C9.5 8.5 9 8.8 9 9.5 L9 13.5 C9 13.5 10.5 14 12 14 C13.5 14 15 13.5 15 13.5 L15 9.5 C15 8.8 14.5 8.5 14.5 8.5 Q12 7.8 9.5 8.5 Z" fill="#66BB6A"/>
      <path d="M9 13.5 L9 20 Q12 20.8 15 20 L15 13.5 C15 13.5 13.5 14 12 14 C10.5 14 9 13.5 9 13.5 Z" fill="#F9FBE7" stroke="#C8E6C9" strokeWidth="0.4"/>
      <line x1="10.5" y1="20" x2="9" y2="22.5" stroke="#A5D6A7" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="12" y1="20.5" x2="12" y2="23" stroke="#A5D6A7" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="13.5" y1="20" x2="15" y2="22.5" stroke="#A5D6A7" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  )
}

function NiraIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="8" y1="22" x2="8" y2="7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="22" x2="12" y2="5" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="22" x2="16" y2="7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 7C7 5 6 3.5 7 2.5C8.5 2 9 3.5 8 7Z" fill="#388E3C"/>
      <path d="M12 5C12 3 13 1.5 14 1.5C15 2 14.5 3.5 12 5Z" fill="#388E3C"/>
      <path d="M16 7C17 5 18 3.5 17 2.5C15.5 2 15 3.5 16 7Z" fill="#388E3C"/>
    </svg>
  )
}

function WatercressIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="21" x2="12" y2="9" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="10.5" r="2.5" fill="#66BB6A"/>
      <circle cx="15" cy="10.5" r="2.5" fill="#66BB6A"/>
      <circle cx="9" cy="15" r="2.5" fill="#66BB6A"/>
      <circle cx="15" cy="15" r="2.5" fill="#66BB6A"/>
      <circle cx="12" cy="9" r="2.5" fill="#81C784"/>
      <circle cx="12" cy="17" r="2.5" fill="#81C784"/>
    </svg>
  )
}

function PetitVertIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="10" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="7" r="4" fill="#388E3C"/>
      <circle cx="9" cy="13" r="2.3" fill="#4CAF50"/>
      <circle cx="15" cy="13" r="2.3" fill="#4CAF50"/>
      <circle cx="9.5" cy="18" r="2" fill="#66BB6A"/>
      <circle cx="14.5" cy="18" r="2" fill="#66BB6A"/>
    </svg>
  )
}

function MolokhiaIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="21" x2="12" y2="9" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 11C12 11 9.5 10 7.5 8C7.5 6 9.5 5.5 11.5 7C11 5.5 12 3.5 12 3.5C12 3.5 13 5.5 12.5 7C14.5 5.5 16.5 6 16.5 8C14.5 10 12 11 12 11Z" fill="#4CAF50"/>
      <path d="M12 16C12 16 9.5 15 7.5 13C7.5 11 9.5 10.5 11.5 12C11 10.5 12 8.5 12 8.5C12 8.5 13 10.5 12.5 12C14.5 10.5 16.5 11 16.5 13C14.5 15 12 16 12 16Z" fill="#4CAF50" opacity="0.75"/>
    </svg>
  )
}

function SpringChrysanthemumIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="21" x2="12" y2="9" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 13C7 10.5 9 8.5 12 8.5C15 8.5 17 10.5 17 13" fill="#66BB6A" opacity="0.25"/>
      <path d="M9.5 14C9.5 11.5 10.5 9.5 12 8.5" stroke="#4CAF50" strokeWidth="1" fill="none"/>
      <path d="M14.5 14C14.5 11.5 13.5 9.5 12 8.5" stroke="#4CAF50" strokeWidth="1" fill="none"/>
      <path d="M8.5 11C9.5 9.5 11 9 12 9" stroke="#388E3C" strokeWidth="0.6" fill="none"/>
      <path d="M15.5 11C14.5 9.5 13 9 12 9" stroke="#388E3C" strokeWidth="0.6" fill="none"/>
      <path d="M7 8.5C8 6.5 10 5.5 12 5.5C14 5.5 16 6.5 17 8.5" stroke="#66BB6A" strokeWidth="1" fill="none"/>
    </svg>
  )
}

function MizunaIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="11" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 14C12 14 9.5 12.5 7.5 10.5C7.5 8.5 9.5 8 11 9.5C10.5 7.5 11 5.5 12 4.5C13 5.5 13.5 7.5 13 9.5C14.5 8 16.5 8.5 16.5 10.5C14.5 12.5 12 14 12 14Z" fill="#66BB6A"/>
      <path d="M12 18C12 18 10.5 17 8.5 15" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round"/>
      <path d="M12 18C12 18 13.5 17 15.5 15" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function ArugulaIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="11" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7.5 14C7.5 11.5 9 9.5 11 8.5C12 8 13 8 12 11.5C14 9.5 16.5 9.5 17 11C17.5 12.5 16 14 14 14.5C12.5 15 12 14 12 14" fill="#4CAF50"/>
      <path d="M9.5 17C9.5 15.5 10.5 14.5 12 14.5" stroke="#66BB6A" strokeWidth="0.8" fill="none"/>
    </svg>
  )
}

function KaleIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="11" stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 11C10 10 7 9 6 7C6 5 8 4 10 6C9 4 9 2 10.5 1.5C12 1.5 12 3.5 12 7C12 3.5 12 1.5 13.5 1.5C15 2 15 4 14 6C16 4 18 5 18 7C17 9 14 10 12 11Z" fill="#2E7D32"/>
      <path d="M10 7C9 8 8 9 8 10.5" stroke="#4CAF50" strokeWidth="0.6" fill="none"/>
      <path d="M14 7C15 8 16 9 16 10.5" stroke="#4CAF50" strokeWidth="0.6" fill="none"/>
    </svg>
  )
}

function RedCabbageIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13.5" r="8" fill="#7B1FA2" opacity="0.85"/>
      <circle cx="12" cy="13.5" r="5.5" fill="#9C27B0" opacity="0.7"/>
      <circle cx="12" cy="13.5" r="3" fill="#CE93D8"/>
      <path d="M5.5 10C8 8 10.5 7.5 12 7.5C13.5 7.5 16 8 18.5 10" stroke="#6A1B9A" strokeWidth="0.7" fill="none"/>
      <path d="M4.5 14C7 12.5 9.5 12 12 12C14.5 12 17 12.5 19.5 14" stroke="#6A1B9A" strokeWidth="0.7" fill="none"/>
    </svg>
  )
}

// ── 根菜類 ───────────────────────────────────────────────────────────────────

function DaikonIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 9C8.5 11 8 14 8.5 17C9.5 20 10.5 22 12 22C13.5 22 14.5 20 15.5 17C16 14 15.5 11 15 9" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.5"/>
      <path d="M9 9C8.5 7 8.5 5 12 3.5C15.5 5 15.5 7 15 9" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.5"/>
      <path d="M9 4.5C8 3.5 6.5 3 6 4" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 3.5V2" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M15 4.5C16 3.5 17.5 3 18 4" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function TurnipIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="15.5" r="7" fill="#F3E5F5"/>
      <path d="M5 14C5 11 7 9.5 12 9.5C17 9.5 19 11 19 14" fill="#CE93D8" opacity="0.4"/>
      <path d="M12 8.5V5.5" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.5 6.5C8 5.5 7 4 7.5 3C8.5 2.5 9.5 4 9.5 6Z" fill="#4CAF50"/>
      <path d="M14.5 6.5C16 5.5 17 4 16.5 3C15.5 2.5 14.5 4 14.5 6Z" fill="#4CAF50"/>
    </svg>
  )
}

function CarrotIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9.5 6C9 8 8.5 10 8.5 13C8.5 17 10 20.5 12 22C14 20.5 15.5 17 15.5 13C15.5 10 15 8 14.5 6" fill="#FF7043"/>
      <path d="M9.5 6C9 4 9.5 2.5 12 2C14.5 2.5 15 4 14.5 6" fill="#FF8A65"/>
      <path d="M10.5 4.5C10 3 8.5 2 7.5 3" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 4V2" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M13.5 4.5C14 3 15.5 2 16.5 3" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10.5" y1="9.5" x2="13.5" y2="9.5" stroke="#FF5722" strokeWidth="0.6"/>
      <line x1="10" y1="12.5" x2="14" y2="12.5" stroke="#FF5722" strokeWidth="0.6"/>
    </svg>
  )
}

function BeetIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="15.5" r="7" fill="#880E4F"/>
      <ellipse cx="12" cy="15.5" rx="4.5" ry="5" fill="#AD1457" opacity="0.5"/>
      <path d="M12 8.5V6" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.5 7C8 6 7.5 4.5 8 3.5C9 3 10 4 9.5 6.5Z" fill="#4CAF50"/>
      <path d="M14.5 7C16 6 16.5 4.5 16 3.5C15 3 14 4 14.5 6.5Z" fill="#4CAF50"/>
    </svg>
  )
}

function BurdockIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M11.5 3C11 5 10.5 8 10.5 12C10.5 16 11 20 11.5 22" stroke="#795548" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M13 4C13.5 6 14 9 14 13C14 17 13.5 20 13 22" stroke="#6D4C41" strokeWidth="2.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M11.5 3C10 2 8.5 2.5 8.5 3" stroke="#795548" strokeWidth="1" strokeLinecap="round"/>
      <path d="M11.5 3V1.5" stroke="#388E3C" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M11.5 1.5C12.5 0.5 14 1 14 2" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function SweetPotatoIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="14.5" rx="8" ry="5.5" fill="#E64A19" transform="rotate(-10 12 14.5)"/>
      <ellipse cx="11" cy="14" rx="3.5" ry="3" fill="#FF7043" transform="rotate(-10 11 14)" opacity="0.45"/>
      <path d="M8 9C7 7 7.5 5 9 4.5C9.5 6 9 8 8 9Z" fill="#388E3C"/>
      <path d="M12 8C12 6 13 4.5 14.5 4.5C14.5 6 13.5 7.5 12 8Z" fill="#4CAF50"/>
      <path d="M16 9.5C17 7.5 17.5 5.5 16 4.5C15 6 15.5 8 16 9.5Z" fill="#388E3C"/>
    </svg>
  )
}

function PotatoIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="14" rx="8.5" ry="7" fill="#A1887F" transform="rotate(-5 12 14)"/>
      <ellipse cx="10" cy="13" rx="4" ry="3" fill="#BCAAA4" transform="rotate(-5 10 13)" opacity="0.4"/>
      <circle cx="9" cy="11.5" r="0.9" fill="#795548"/>
      <circle cx="14.5" cy="13" r="0.9" fill="#795548"/>
      <circle cx="11" cy="16.5" r="0.9" fill="#795548"/>
    </svg>
  )
}

function TaroIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="15.5" rx="7" ry="7" fill="#8D6E63"/>
      <line x1="5.5" y1="13" x2="18.5" y2="13" stroke="#5D4037" strokeWidth="0.8" opacity="0.5"/>
      <line x1="5.5" y1="16" x2="18.5" y2="16" stroke="#5D4037" strokeWidth="0.8" opacity="0.5"/>
      <line x1="5.5" y1="19" x2="18.5" y2="19" stroke="#5D4037" strokeWidth="0.8" opacity="0.5"/>
      <path d="M12 8.5V5" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 5C10 4 8 5 8 7" stroke="#388E3C" strokeWidth="1" fill="none"/>
      <path d="M12 5C14 4 16 5 16 7" stroke="#388E3C" strokeWidth="1" fill="none"/>
    </svg>
  )
}

function OnionIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="15.5" rx="8" ry="7" fill="#EF6C00"/>
      <path d="M5 12C7.5 10 9.5 9.5 12 9.5C14.5 9.5 16.5 10 19 12" stroke="#E65100" strokeWidth="0.7" fill="none"/>
      <path d="M4.5 15.5C7 14 9.5 13.5 12 13.5C14.5 13.5 17 14 19.5 15.5" stroke="#E65100" strokeWidth="0.7" fill="none"/>
      <path d="M5 19C7.5 20.5 9.5 21 12 21C14.5 21 16.5 20.5 19 19" stroke="#E65100" strokeWidth="0.7" fill="none"/>
      <path d="M12 8.5V6" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 6C11 4 9.5 3.5 9 4.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function GarlicIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M8.5 16.5C8.5 13.5 10 11.5 12 11.5C14 11.5 15.5 13.5 15.5 16.5C15.5 19 14 21 12 21C10 21 8.5 19 8.5 16.5Z" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="0.5"/>
      <path d="M9.5 16.5C9.5 14 10.5 12.5 12 12.5" stroke="#BDBDBD" strokeWidth="0.7" fill="none"/>
      <path d="M14 14.5C15 13.5 16 13 16 11.5" stroke="#E0E0E0" strokeWidth="0.8" fill="none"/>
      <path d="M10.5 12C9.5 10 9.5 8.5 10.5 7.5" stroke="#E0E0E0" strokeWidth="0.8" fill="none"/>
      <path d="M12 11.5V8.5" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8.5C11 6.5 11 5 12 4.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10.5 7.5C8.5 6.5 7.5 4.5 8.5 3.5" stroke="#388E3C" strokeWidth="1" strokeLinecap="round"/>
      <path d="M13.5 7.5C15.5 6.5 16.5 4.5 15.5 3.5" stroke="#388E3C" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function GingerIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 14.5C6 11.5 7.5 9.5 9.5 9.5C11.5 9.5 13 11.5 13 14.5C13 17 11.5 19 9.5 19C7.5 19 6 17 6 14.5Z" fill="#FFCC02"/>
      <path d="M11 14.5C11 11.5 12.5 9.5 14.5 9.5C16.5 9.5 18 11.5 18 14.5C18 17 16.5 19 14.5 19C12.5 19 11 17 11 14.5Z" fill="#FFCC02"/>
      <path d="M9 9.5C9 7.5 10 6 11.5 6C13 6 14 7.5 14 9.5" fill="#FFE082"/>
      <path d="M11.5 6V3.5" stroke="#388E3C" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M11.5 3.5C10.5 2 10.5 1 11.5 1" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function YamIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M10.5 4C10 6 9.5 9 9.5 12C9.5 17 10 20 10.5 22" stroke="#8D6E63" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M14 5C14.5 7 15 10 15 13C15 18 14.5 20 14 22" stroke="#795548" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
      <path d="M10.5 4V2.5" stroke="#388E3C" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M10.5 2.5C9.5 1 7.5 1 7.5 2.5" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M10.5 2.5C11.5 1 13.5 1 13.5 2.5" stroke="#388E3C" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function LotusRootIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="13" rx="9.5" ry="8" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="0.5"/>
      <circle cx="12" cy="13" r="2" fill="none" stroke="#BDBDBD" strokeWidth="0.8"/>
      <circle cx="7.5" cy="10" r="1.5" fill="none" stroke="#BDBDBD" strokeWidth="0.8"/>
      <circle cx="16.5" cy="10" r="1.5" fill="none" stroke="#BDBDBD" strokeWidth="0.8"/>
      <circle cx="7.5" cy="16" r="1.5" fill="none" stroke="#BDBDBD" strokeWidth="0.8"/>
      <circle cx="16.5" cy="16" r="1.5" fill="none" stroke="#BDBDBD" strokeWidth="0.8"/>
      <circle cx="12" cy="7.5" r="1.3" fill="none" stroke="#BDBDBD" strokeWidth="0.8"/>
      <circle cx="12" cy="18.5" r="1.3" fill="none" stroke="#BDBDBD" strokeWidth="0.8"/>
    </svg>
  )
}

function PurpleSweetPotatoIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="14.5" rx="8" ry="5.5" fill="#6A1B9A" transform="rotate(-10 12 14.5)"/>
      <ellipse cx="11" cy="14" rx="3.5" ry="3" fill="#8E24AA" transform="rotate(-10 11 14)" opacity="0.45"/>
      <path d="M8 9C7 7 7.5 5 9 4.5C9.5 6 9 8 8 9Z" fill="#388E3C"/>
      <path d="M12 8C12 6 13 4.5 14.5 4.5C14.5 6 13.5 7.5 12 8Z" fill="#4CAF50"/>
      <path d="M16 9.5C17 7.5 17.5 5.5 16 4.5C15 6 15.5 8 16 9.5Z" fill="#388E3C"/>
    </svg>
  )
}

// ── 豆類 ─────────────────────────────────────────────────────────────────────

function PeaIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12C5 9 7.5 7.5 12 7.5C16.5 7.5 19 9 19 12C19 15 16.5 16.5 12 16.5C7.5 16.5 5 15 5 12Z" fill="#66BB6A"/>
      <circle cx="9" cy="12" r="2" fill="#C8E6C9"/>
      <circle cx="12" cy="12" r="2" fill="#C8E6C9"/>
      <circle cx="15" cy="12" r="2" fill="#C8E6C9"/>
      <path d="M12 7.5V5.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function SnapPeaIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 12.5C4 9.5 7 8 12 8C17 8 20 9.5 20 12.5C20 15.5 17 17 12 17C7 17 4 15.5 4 12.5Z" fill="#4CAF50"/>
      <circle cx="9" cy="12.5" r="2.3" fill="#81C784"/>
      <circle cx="12" cy="12.5" r="2.3" fill="#81C784"/>
      <circle cx="15" cy="12.5" r="2.3" fill="#81C784"/>
      <path d="M12 8V5.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 5.5C11 4 9.5 4 9 5" stroke="#388E3C" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function BroadBeanIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M7.5 8C7 10 6.5 12 6.5 14.5C6.5 17.5 7.5 20 9.5 21C10.5 21.5 12 21.5 12 21.5C12 21.5 13.5 21.5 14.5 21C16.5 20 17.5 17.5 17.5 14.5C17.5 12 17 10 16.5 8C15.5 6 14 5 12 5C10 5 8.5 6 7.5 8Z" fill="#4CAF50"/>
      <ellipse cx="12" cy="14" rx="3" ry="4.5" fill="#81C784"/>
      <path d="M12 5V3" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function SoybeanIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13.5" r="7" fill="#FDD835"/>
      <circle cx="12" cy="13.5" r="4.5" fill="#FFEE58"/>
      <path d="M8.5 10.5C9.5 9.5 11 9 12 9" stroke="#F9A825" strokeWidth="0.7" fill="none"/>
      <path d="M12 9V5.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 6C8.5 5 7.5 3.5 8.5 2.5C9.5 2.5 10.5 4 10 6Z" fill="#4CAF50"/>
      <path d="M14 6C15.5 5 16.5 3.5 15.5 2.5C14.5 2.5 13.5 4 14 6Z" fill="#4CAF50"/>
    </svg>
  )
}

function BlackBeanIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13.5" r="7" fill="#212121"/>
      <circle cx="12" cy="13.5" r="4.5" fill="#424242"/>
      <path d="M8.5 10.5C9.5 9.5 11 9 12 9" stroke="#616161" strokeWidth="0.7" fill="none"/>
      <path d="M12 9V5.5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 6C8.5 5 7.5 3.5 8.5 2.5C9.5 2.5 10.5 4 10 6Z" fill="#4CAF50"/>
      <path d="M14 6C15.5 5 16.5 3.5 15.5 2.5C14.5 2.5 13.5 4 14 6Z" fill="#4CAF50"/>
    </svg>
  )
}

function PeanutIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M7.5 11.5C7.5 9 9 7 12 7C15 7 16.5 9 16.5 11.5" fill="#D7CCC8"/>
      <circle cx="9.5" cy="15.5" r="3.5" fill="#BCAAA4"/>
      <circle cx="14.5" cy="15.5" r="3.5" fill="#BCAAA4"/>
      <path d="M9.5 12C10 10.5 11 9.5 12 9.5" stroke="#8D6E63" strokeWidth="0.6" fill="none"/>
      <path d="M12 12C12.5 10.5 13.5 9.5 14 10" stroke="#8D6E63" strokeWidth="0.6" fill="none"/>
      <line x1="12" y1="12" x2="12" y2="19" stroke="#A1887F" strokeWidth="0.8"/>
    </svg>
  )
}

function BeanSproutIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="18.5" r="3" fill="#FFF9C4"/>
      <circle cx="15.5" cy="19" r="2.5" fill="#FFF9C4"/>
      <line x1="9" y1="15.5" x2="9" y2="9" stroke="#A5D6A7" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="15.5" y1="16.5" x2="15.5" y2="11.5" stroke="#A5D6A7" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M9 11C9 9 11 8 12 9" stroke="#81C784" strokeWidth="1" fill="none"/>
      <path d="M9 9C8 7 7 6.5 6 7" stroke="#81C784" strokeWidth="1" fill="none"/>
      <path d="M15.5 13.5C15.5 11.5 17 10.5 18 11.5" stroke="#81C784" strokeWidth="1" fill="none"/>
    </svg>
  )
}

// ── ハーブ類 ─────────────────────────────────────────────────────────────────

function BasilIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="21" x2="12" y2="12" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 15C12 15 9.5 13.5 8 12C7 10.5 8 9 9.5 9.5C10.5 10 11 11.5 12 13.5" fill="#4CAF50"/>
      <path d="M12 15C12 15 14.5 13.5 16 12C17 10.5 16 9 14.5 9.5C13.5 10 13 11.5 12 13.5" fill="#4CAF50"/>
      <path d="M12 11C12 11 9.5 9.5 8.5 8C7.5 6.5 8.5 5.5 10 6C11 6.5 11.5 8 12 10" fill="#66BB6A"/>
      <path d="M12 11C12 11 14.5 9.5 15.5 8C16.5 6.5 15.5 5.5 14 6C13 6.5 12.5 8 12 10" fill="#66BB6A"/>
    </svg>
  )
}

function ParsleyIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="12" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 14C11 13 9.5 11.5 8.5 10C8 8.5 9 7.5 10.5 8C11.5 8.5 12 10 12 12.5" fill="#4CAF50"/>
      <path d="M12 14C13 13 14.5 11.5 15.5 10C16 8.5 15 7.5 13.5 8C12.5 8.5 12 10 12 12.5" fill="#4CAF50"/>
      <path d="M12 11C11.5 9.5 10 8 9 7C8.5 6 9 5 10.5 5.5C11 6 11.5 7.5 12 9.5" fill="#66BB6A"/>
      <path d="M12 11C12.5 9.5 14 8 15 7C15.5 6 15 5 13.5 5.5C13 6 12.5 7.5 12 9.5" fill="#66BB6A"/>
    </svg>
  )
}

function ShisoIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="21" x2="12" y2="12" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C12 12 8 10.5 6 8C6 6 8 5 10.5 6.5C10 5 11 3 12 3C13 3 14 5 13.5 6.5C16 5 18 6 18 8C16 10.5 12 12 12 12Z" fill="#66BB6A"/>
      <path d="M9 9C10.5 8 12 8 12 8" stroke="#2E7D32" strokeWidth="0.5" fill="none"/>
      <path d="M15 9C13.5 8 12 8 12 8" stroke="#2E7D32" strokeWidth="0.5" fill="none"/>
    </svg>
  )
}

function MintIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="12" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 14C10.5 13.5 9 12 8.5 10.5C8 9 8.5 7.5 10 7.5C11 7.5 11.5 9 12 11.5" fill="#4CAF50"/>
      <path d="M12 14C13.5 13.5 15 12 15.5 10.5C16 9 15.5 7.5 14 7.5C13 7.5 12.5 9 12 11.5" fill="#4CAF50"/>
      <path d="M12 11C10.5 10.5 9.5 9 9 7.5C8.5 6 9 5 10.5 5.5C11 6 11.5 7.5 12 9.5" fill="#66BB6A"/>
      <path d="M12 11C13.5 10.5 14.5 9 15 7.5C15.5 6 15 5 13.5 5.5C13 6 12.5 7.5 12 9.5" fill="#66BB6A"/>
    </svg>
  )
}

function RosemaryIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="5" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="7" x2="9" y2="5.5" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="7" x2="15" y2="5.5" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="10.5" x2="8.5" y2="9" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="10.5" x2="15.5" y2="9" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="14" x2="8.5" y2="12.5" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="14" x2="15.5" y2="12.5" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="17.5" x2="9" y2="16" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="17.5" x2="15" y2="16" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function ThymeIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="8" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 11C12 11 10 10 9 9C9 8 10 7.5 11 8.5C11 8 11 7 12 7C13 7 13 8 13 8.5C14 7.5 15 8 15 9C14 10 12 11 12 11Z" fill="#7CB342"/>
      <path d="M12 15.5C12 15.5 10 14.5 9 13.5C9 12.5 10 12 11 13C11 12.5 11 11.5 12 11.5C13 11.5 13 12.5 13 13C14 12 15 12.5 15 13.5C14 14.5 12 15.5 12 15.5Z" fill="#7CB342"/>
      <path d="M12 20C12 20 10 19 9 18C9 17 10 16.5 11 17.5C11 17 11 16 12 16C13 16 13 17 13 17.5C14 16.5 15 17 15 18C14 19 12 20 12 20Z" fill="#7CB342"/>
    </svg>
  )
}

function OreganoIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="10" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 13C10.5 13 9 12 8.5 10.5C9.5 9.5 11 10 12 11.5" fill="#8BC34A"/>
      <path d="M12 13C13.5 13 15 12 15.5 10.5C14.5 9.5 13 10 12 11.5" fill="#8BC34A"/>
      <path d="M12 10C10.5 10 9 9 8.5 7.5C9.5 6.5 11 7 12 8.5" fill="#8BC34A"/>
      <path d="M12 10C13.5 10 15 9 15.5 7.5C14.5 6.5 13 7 12 8.5" fill="#8BC34A"/>
      <path d="M12 7C11 7 9.5 6.5 9 5C10 4 11.5 5 12 6.5" fill="#8BC34A"/>
      <path d="M12 7C13 7 14.5 6.5 15 5C14 4 12.5 5 12 6.5" fill="#8BC34A"/>
    </svg>
  )
}

function SageIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="12" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C12 12 9 11 7.5 8.5C7 7 8 5.5 9.5 6C10.5 6.5 11 8.5 12 10.5" fill="#AED581"/>
      <path d="M12 12C12 12 15 11 16.5 8.5C17 7 16 5.5 14.5 6C13.5 6.5 13 8.5 12 10.5" fill="#AED581"/>
      <path d="M10 9C11 8 12 7.5 12 7.5" stroke="#689F38" strokeWidth="0.5" fill="none"/>
    </svg>
  )
}

function CorianderIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="12" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 15C11 14 9.5 12.5 8.5 11C8 9.5 9 8.5 10.5 9C11.5 9.5 12 11 12 13.5" fill="#66BB6A"/>
      <path d="M12 15C13 14 14.5 12.5 15.5 11C16 9.5 15 8.5 13.5 9C12.5 9.5 12 11 12 13.5" fill="#66BB6A"/>
      <path d="M12 12C11 10.5 9.5 9.5 9 8C8.5 6.5 9.5 5.5 11 6C11.5 6.5 12 8 12 10" fill="#81C784"/>
      <path d="M12 12C13 10.5 14.5 9.5 15 8C15.5 6.5 14.5 5.5 13 6C12.5 6.5 12 8 12 10" fill="#81C784"/>
    </svg>
  )
}

function MyogaIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M8 20.5C8 20.5 7 17 7 14C7 11 8 8.5 10 8C12 7.5 14 8 15 10C16 12 16 15 16 17.5C16 19.5 15.5 21.5 15.5 21.5" fill="#F48FB1"/>
      <path d="M9.5 20.5C9 17.5 9.5 14 11 12C12 10.5 13 12 13.5 14.5C14 17 13 19.5 12 21" fill="#EC407A" opacity="0.7"/>
      <path d="M8 8C7 6 7 4.5 8.5 4" stroke="#388E3C" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M10.5 8C10 6 11 4.5 12 4" stroke="#388E3C" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function DillIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="6" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8.5C12 8.5 10 7.5 8.5 6C9 4.5 10.5 4.5 11.5 6L12 8.5Z" fill="#AED581"/>
      <path d="M12 8.5C12 8.5 14 7.5 15.5 6C15 4.5 13.5 4.5 12.5 6L12 8.5Z" fill="#AED581"/>
      <path d="M12 12.5C12 12.5 9.5 11 7.5 9C8 7.5 10 7.5 11.5 9.5L12 12.5Z" fill="#8BC34A"/>
      <path d="M12 12.5C12 12.5 14.5 11 16.5 9C16 7.5 14 7.5 12.5 9.5L12 12.5Z" fill="#8BC34A"/>
      <path d="M12 16.5C12 16.5 9 15 7 12.5C7.5 11 9.5 11 11 13.5L12 16.5Z" fill="#7CB342"/>
      <path d="M12 16.5C12 16.5 15 15 17 12.5C16.5 11 14.5 11 13 13.5L12 16.5Z" fill="#7CB342"/>
    </svg>
  )
}

function ChervilIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="12" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 14C11 13 9 12 8 10.5C7.5 9 8.5 8 10 8.5C11 9 11.5 11 12 13" fill="#A5D6A7"/>
      <path d="M12 14C13 13 15 12 16 10.5C16.5 9 15.5 8 14 8.5C13 9 12.5 11 12 13" fill="#A5D6A7"/>
      <path d="M12 11C11 10 9.5 9 9 7.5C8.5 6 9.5 5 11 5.5C11.5 6 12 7.5 12 9.5" fill="#C8E6C9"/>
      <path d="M12 11C13 10 14.5 9 15 7.5C15.5 6 14.5 5 13 5.5C12.5 6 12 7.5 12 9.5" fill="#C8E6C9"/>
    </svg>
  )
}

function LemonBalmIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="21" x2="12" y2="12" stroke="#388E3C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.5 14.5C7.5 13.5 6.5 11.5 7.5 9.5C9 9 10.5 10 10 12.5L9.5 14.5Z" fill="#C5E1A5"/>
      <path d="M14.5 14.5C16.5 13.5 17.5 11.5 16.5 9.5C15 9 13.5 10 14 12.5L14.5 14.5Z" fill="#C5E1A5"/>
      <path d="M9.5 11C8 10 7 8 8 6C9.5 5.5 11 6.5 10.5 9L9.5 11Z" fill="#AED581"/>
      <path d="M14.5 11C16 10 17 8 16 6C14.5 5.5 13 6.5 13.5 9L14.5 11Z" fill="#AED581"/>
    </svg>
  )
}

function LavenderIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="11" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="12" cy="7.5" rx="1.5" ry="3" fill="#9C27B0"/>
      <ellipse cx="9" cy="9" rx="1.2" ry="2.5" fill="#AB47BC" transform="rotate(-12 9 9)"/>
      <ellipse cx="15" cy="9" rx="1.2" ry="2.5" fill="#AB47BC" transform="rotate(12 15 9)"/>
      <ellipse cx="7" cy="11" rx="1" ry="2" fill="#BA68C8" transform="rotate(-18 7 11)"/>
      <ellipse cx="17" cy="11" rx="1" ry="2" fill="#BA68C8" transform="rotate(18 17 11)"/>
    </svg>
  )
}

function FennelIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="8" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 10.5C12 10.5 10 9 8.5 7C9 5.5 10.5 5.5 11.5 7L12 10.5Z" fill="#DCEDC8"/>
      <path d="M12 10.5C12 10.5 14 9 15.5 7C15 5.5 13.5 5.5 12.5 7L12 10.5Z" fill="#DCEDC8"/>
      <path d="M12 14.5C12 14.5 9 13 7 10.5C7.5 8.5 9.5 8.5 11 11L12 14.5Z" fill="#C5E1A5"/>
      <path d="M12 14.5C12 14.5 15 13 17 10.5C16.5 8.5 14.5 8.5 13 11L12 14.5Z" fill="#C5E1A5"/>
      <path d="M12 18.5C12 18.5 8.5 17 6.5 13.5C7 11.5 9.5 11.5 11 14L12 18.5Z" fill="#AED581"/>
      <path d="M12 18.5C12 18.5 15.5 17 17.5 13.5C17 11.5 14.5 11.5 13 14L12 18.5Z" fill="#AED581"/>
    </svg>
  )
}

function ChiveIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <line x1="9" y1="22" x2="9" y2="9" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="22" x2="12" y2="7" stroke="#81C784" strokeWidth="2" strokeLinecap="round"/>
      <line x1="15" y1="22" x2="15" y2="9" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="6.5" r="2.5" fill="#7B1FA2"/>
      <circle cx="12" cy="4.5" r="2.5" fill="#9C27B0"/>
      <circle cx="15" cy="6.5" r="2.5" fill="#7B1FA2"/>
    </svg>
  )
}

// ── ベリー類 ─────────────────────────────────────────────────────────────────

function StrawberryIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 5.5C9 5.5 6 8.5 6 12.5C6 17 8.5 20.5 12 22C15.5 20.5 18 17 18 12.5C18 8.5 15 5.5 12 5.5Z" fill="#E53935"/>
      <path d="M10 5.5C9 4 9 2.5 10.5 2C11.5 2 12 3 12 5.5" fill="#4CAF50"/>
      <path d="M14 5.5C15 4 15 2.5 13.5 2C12.5 2 12 3 12 5.5" fill="#4CAF50"/>
      <line x1="12" y1="2" x2="12" y2="5.5" stroke="#388E3C" strokeWidth="1.2"/>
      <circle cx="10" cy="10" r="0.7" fill="#FFCDD2"/>
      <circle cx="14" cy="10" r="0.7" fill="#FFCDD2"/>
      <circle cx="9" cy="13" r="0.7" fill="#FFCDD2"/>
      <circle cx="12" cy="13" r="0.7" fill="#FFCDD2"/>
      <circle cx="15" cy="13" r="0.7" fill="#FFCDD2"/>
      <circle cx="11" cy="16" r="0.7" fill="#FFCDD2"/>
      <circle cx="13" cy="16" r="0.7" fill="#FFCDD2"/>
    </svg>
  )
}

function BlueberryIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="14.5" r="4.5" fill="#3F51B5"/>
      <circle cx="15" cy="14.5" r="4.5" fill="#3949AB"/>
      <circle cx="12" cy="10.5" r="4" fill="#5C6BC0"/>
      <circle cx="9" cy="14.5" r="2" fill="#7986CB" opacity="0.35"/>
      <circle cx="15" cy="14.5" r="2" fill="#7986CB" opacity="0.35"/>
      <circle cx="12" cy="10.5" r="1.8" fill="#7986CB" opacity="0.35"/>
      <line x1="9" y1="10" x2="9" y2="8.5" stroke="#388E3C" strokeWidth="1" strokeLinecap="round"/>
      <line x1="12" y1="6.5" x2="12" y2="5" stroke="#388E3C" strokeWidth="1" strokeLinecap="round"/>
      <line x1="15" y1="10" x2="15" y2="8.5" stroke="#388E3C" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function RaspberryIcon({ s }: I) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="12.5" r="3.5" fill="#E91E63"/>
      <circle cx="14" cy="12.5" r="3.5" fill="#C2185B"/>
      <circle cx="12" cy="9" r="3" fill="#E91E63"/>
      <circle cx="12" cy="16" r="3" fill="#C2185B"/>
      <circle cx="10" cy="12.5" r="1.5" fill="#F48FB1" opacity="0.35"/>
      <circle cx="14" cy="12.5" r="1.5" fill="#F48FB1" opacity="0.35"/>
      <circle cx="12" cy="9" r="1.3" fill="#F48FB1" opacity="0.35"/>
      <circle cx="12" cy="16" r="1.3" fill="#F48FB1" opacity="0.35"/>
      <path d="M12 6V4.5" stroke="#388E3C" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M12 4.5C11 3 9.5 3 9 3.5" stroke="#388E3C" strokeWidth="1" strokeLinecap="round"/>
      <path d="M12 4.5C13 3 14.5 3 15 3.5" stroke="#388E3C" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

// ── カテゴリフォールバック ───────────────────────────────────────────────────

function FruitFallbackIcon({ s }: I) {
  return <TomatoIcon s={s} />
}
function LeafFallbackIcon({ s }: I) {
  return <LettuceIcon s={s} />
}
function RootFallbackIcon({ s }: I) {
  return <CarrotIcon s={s} />
}
function BeanFallbackIcon({ s }: I) {
  return <PeaIcon s={s} />
}
function HerbFallbackIcon({ s }: I) {
  return <BasilIcon s={s} />
}
function BerryFallbackIcon({ s }: I) {
  return <StrawberryIcon s={s} />
}

// ── アイコンマップ ────────────────────────────────────────────────────────────

const ICONS: Record<string, (s: number) => ReactNode> = {
  // 果菜類
  'トマト':       (s) => <TomatoIcon s={s} />,
  'ミニトマト':   (s) => <MiniTomatoIcon s={s} />,
  'ナス':         (s) => <EggplantIcon s={s} />,
  'ピーマン':     (s) => <GreenPepperIcon s={s} />,
  'パプリカ':     (s) => <PaprikaIcon s={s} />,
  'キュウリ':     (s) => <CucumberIcon s={s} />,
  'ズッキーニ':   (s) => <ZucchiniIcon s={s} />,
  'カボチャ':     (s) => <PumpkinIcon s={s} />,
  'スイカ':       (s) => <WatermelonIcon s={s} />,
  'メロン':       (s) => <MelonIcon s={s} />,
  'トウモロコシ': (s) => <CornIcon s={s} />,
  'オクラ':       (s) => <OkraIcon s={s} />,
  'エダマメ':     (s) => <EdamameIcon s={s} />,
  'インゲン':     (s) => <GreenBeanIcon s={s} />,
  'ゴーヤ':       (s) => <BitterMelonIcon s={s} />,
  'ししとう':     (s) => <ShishitoIcon s={s} />,
  'とうがらし':   (s) => <ChiliIcon s={s} />,
  '冬瓜':         (s) => <WinterMelonIcon s={s} />,
  // 葉菜類
  'レタス':       (s) => <LettuceIcon s={s} />,
  'サニーレタス': (s) => <SunnyLettuceIcon s={s} />,
  'キャベツ':     (s) => <CabbageIcon s={s} />,
  '白菜':         (s) => <ChineseCabbageIcon s={s} />,
  'ほうれん草':   (s) => <SpinachIcon s={s} />,
  '小松菜':       (s) => <LeafyGreenIcon s={s} />,
  'チンゲン菜':   (s) => <LeafyGreenIcon s={s} />,
  '春菊':         (s) => <SpringChrysanthemumIcon s={s} />,
  '水菜':         (s) => <MizunaIcon s={s} />,
  'ルッコラ':     (s) => <ArugulaIcon s={s} />,
  'ケール':       (s) => <KaleIcon s={s} />,
  'ブロッコリー': (s) => <BroccoliIcon s={s} />,
  'カリフラワー': (s) => <CauliflowerIcon s={s} />,
  'アスパラガス': (s) => <AsparagusIcon s={s} />,
  'セロリ':       (s) => <CeleryIcon s={s} />,
  'ネギ':         (s) => <LeekIcon s={s} />,
  'ニラ':         (s) => <NiraIcon s={s} />,
  'クレソン':     (s) => <WatercressIcon s={s} />,
  'プチヴェール': (s) => <PetitVertIcon s={s} />,
  'モロヘイヤ':   (s) => <MolokhiaIcon s={s} />,
  '紫キャベツ':   (s) => <RedCabbageIcon s={s} />,
  // 根菜類
  '大根':         (s) => <DaikonIcon s={s} />,
  'カブ':         (s) => <TurnipIcon s={s} />,
  'ニンジン':     (s) => <CarrotIcon s={s} />,
  'ビーツ':       (s) => <BeetIcon s={s} />,
  'ゴボウ':       (s) => <BurdockIcon s={s} />,
  'サツマイモ':   (s) => <SweetPotatoIcon s={s} />,
  'ジャガイモ':   (s) => <PotatoIcon s={s} />,
  'サトイモ':     (s) => <TaroIcon s={s} />,
  'タマネギ':     (s) => <OnionIcon s={s} />,
  'ニンニク':     (s) => <GarlicIcon s={s} />,
  'ショウガ':     (s) => <GingerIcon s={s} />,
  '山芋':         (s) => <YamIcon s={s} />,
  'れんこん':     (s) => <LotusRootIcon s={s} />,
  '紫いも':       (s) => <PurpleSweetPotatoIcon s={s} />,
  // 豆類
  'エンドウ豆':       (s) => <PeaIcon s={s} />,
  'スナップエンドウ': (s) => <SnapPeaIcon s={s} />,
  'ソラマメ':         (s) => <BroadBeanIcon s={s} />,
  '大豆':             (s) => <SoybeanIcon s={s} />,
  '黒豆':             (s) => <BlackBeanIcon s={s} />,
  'ラッカセイ':       (s) => <PeanutIcon s={s} />,
  'もやし':           (s) => <BeanSproutIcon s={s} />,
  // ハーブ類
  'バジル':       (s) => <BasilIcon s={s} />,
  'パセリ':       (s) => <ParsleyIcon s={s} />,
  'シソ':         (s) => <ShisoIcon s={s} />,
  'ミント':       (s) => <MintIcon s={s} />,
  'ローズマリー': (s) => <RosemaryIcon s={s} />,
  'タイム':       (s) => <ThymeIcon s={s} />,
  'オレガノ':     (s) => <OreganoIcon s={s} />,
  'セージ':       (s) => <SageIcon s={s} />,
  'コリアンダー': (s) => <CorianderIcon s={s} />,
  'みょうが':     (s) => <MyogaIcon s={s} />,
  'ディル':       (s) => <DillIcon s={s} />,
  'チャービル':   (s) => <ChervilIcon s={s} />,
  'レモンバーム': (s) => <LemonBalmIcon s={s} />,
  'ラベンダー':   (s) => <LavenderIcon s={s} />,
  'フェンネル':   (s) => <FennelIcon s={s} />,
  'チャイブ':     (s) => <ChiveIcon s={s} />,
  // ベリー類
  'イチゴ':       (s) => <StrawberryIcon s={s} />,
  'ブルーベリー': (s) => <BlueberryIcon s={s} />,
  'ラズベリー':   (s) => <RaspberryIcon s={s} />,
}

const CATEGORY_FALLBACK: Record<string, (s: number) => ReactNode> = {
  fruit: (s) => <FruitFallbackIcon s={s} />,
  leaf:  (s) => <LeafFallbackIcon s={s} />,
  root:  (s) => <RootFallbackIcon s={s} />,
  bean:  (s) => <BeanFallbackIcon s={s} />,
  herb:  (s) => <HerbFallbackIcon s={s} />,
  berry: (s) => <BerryFallbackIcon s={s} />,
}

// ── 公開API ──────────────────────────────────────────────────────────────────

export function getVegetableIconNode(
  name: string,
  category: string,
  size = 28,
): ReactNode {
  const icon = ICONS[name] ?? CATEGORY_FALLBACK[category]
  if (icon) return icon(size)
  return <CarrotIcon s={size} />
}
