import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1A2580, #5A72ED)',
          borderRadius: '8px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1,
          }}
        >
          i
        </span>
      </div>
    ),
    { ...size }
  );
}
