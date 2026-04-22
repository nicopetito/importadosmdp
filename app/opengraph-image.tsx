import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ImportadosMDP — Tecnología importada en Mar del Plata';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
          background: 'linear-gradient(135deg, #050916 0%, #0D1445 40%, #1A2580 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(90, 114, 237, 0.08)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-60px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(90, 114, 237, 0.06)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-2px',
            }}
          >
            importados
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#5A72ED',
              letterSpacing: '-2px',
            }}
          >
            mdp
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#C7D4FF',
              letterSpacing: '4px',
              textTransform: 'uppercase' as const,
            }}
          >
            Tecnología importada · Mar del Plata
          </span>
        </div>

        {/* Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Rating badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(199, 212, 255, 0.2)',
              borderRadius: '40px',
              padding: '12px 24px',
            }}
          >
            <span style={{ fontSize: '22px', color: '#FBBF24' }}>★</span>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              4.9
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 400,
                color: '#C7D4FF',
              }}
            >
              rating
            </span>
          </div>

          {/* Sales badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(199, 212, 255, 0.2)',
              borderRadius: '40px',
              padding: '12px 24px',
            }}
          >
            <span
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              +500
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 400,
                color: '#C7D4FF',
              }}
            >
              ventas
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #1A2580, #5A72ED, #1A2580)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
