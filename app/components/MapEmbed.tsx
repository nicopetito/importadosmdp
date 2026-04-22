'use client';

interface MapEmbedProps {
  height?: string | number;
}

export default function MapEmbed({ height = "360" }: MapEmbedProps) {
  return (
    <iframe
      src="https://maps.google.com/maps?q=Jujuy+1811,Mar+del+Plata,Buenos+Aires,Argentina&output=embed"
      width="100%"
      height={height}
      style={{
        border: 'none',
        borderRadius: '16px',
        display: 'block',
        outline: '2px solid rgba(90,114,237,0.4)',
      }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Ubicación ImportadosMDP"
    />
  );
}
