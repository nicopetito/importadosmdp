import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ImportadosMDP — Tecnología importada en Mar del Plata'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050916 0%, #1A2580 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '24px' }}>
          <span style={{ fontSize: '64px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-1px' }}>
            importados
          </span>
          <span style={{ fontSize: '64px', fontWeight: 800, color: '#5A72ED', letterSpacing: '-1px' }}>
            mdp
          </span>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.6)', fontWeight: 400, marginBottom: '40px', letterSpacing: '0.1em' }}>
          Tecnología importada · Mar del Plata
        </p>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '999px',
              padding: '12px 24px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#FBBF24' }}>★</span>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>4.9</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>calificación</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '999px',
              padding: '12px 24px',
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>+500</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>ventas</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
