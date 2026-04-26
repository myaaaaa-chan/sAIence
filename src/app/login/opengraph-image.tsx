import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'sAIence - AIが支える家庭菜園アシスタント'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(135deg, #0a2818 0%, #0d3d20 50%, #0a2818 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
          }}
        />

        {/* Leaf icon (SVG) */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 24 24"
          style={{ marginBottom: 24 }}
        >
          <path
            d="M6 18C6 18 5 14 6 10C7 6 9 4 12 4C13 6 13 8 12 10C14 8 16.5 7 18.5 8C18.5 11 16.5 14 14 16C12 18 9 19 6 18Z"
            fill="#4ade80"
          />
          <line x1="12" y1="4" x2="6" y2="18" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        {/* App name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span style={{ color: '#4ade80' }}>s</span>
          <span>AI</span>
          <span style={{ color: '#4ade80' }}>ence</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#a7f3d0',
            letterSpacing: '0.02em',
            marginBottom: 48,
          }}
        >
          AIが支える、あなたの家庭菜園
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['📸 AI写真診断', '📅 スケジュール自動生成', '🌱 栽培管理'].map((text) => (
            <div
              key={text}
              style={{
                background: 'rgba(74,222,128,0.12)',
                border: '1px solid rgba(74,222,128,0.3)',
                borderRadius: 999,
                padding: '10px 22px',
                fontSize: 20,
                color: '#86efac',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
