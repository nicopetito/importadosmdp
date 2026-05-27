'use client';

interface MapEmbedProps {
  height?: string | number;
}

export default function MapEmbed({ height = "360" }: MapEmbedProps) {
  return (
    <iframe
      src="https://maps.google.com/maps?q=Jujuy+1611,Mar+del+Plata,Buenos+Aires,Argentina&output=embed"
      width="100%"
      height={height}
      style={{
        border: 'none',
        display: 'block',
        filter: 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.95)'
      }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Ubicación ImportadosMDP"
    />
  );
}
