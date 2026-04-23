import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1A2580, #5A72ED)',
          borderRadius: '6px',
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
          i
        </span>
      </div>
    ),
    { ...size }
  )
}
