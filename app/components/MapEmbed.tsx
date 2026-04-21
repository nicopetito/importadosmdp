'use client'

export default function MapEmbed() {
  return (
    <iframe
      src="https://maps.google.com/maps?q=Jujuy+1811,Mar+del+Plata,Buenos+Aires,Argentina&output=embed"
      width="100%"
      height="380"
      style={{
        border: 0,
        borderRadius: '16px',
        display: 'block',
        outline: '2px solid #5A72ED',
      }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
