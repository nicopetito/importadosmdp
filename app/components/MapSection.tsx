import { Suspense } from 'react'
import MapEmbed from './MapEmbed'

function LocationPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-accent flex-shrink-0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-accent flex-shrink-0">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm.5 11H11V7h1.5v4.26l3.5 2.08-.75 1.27L12.5 13z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-accent flex-shrink-0">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.39 21 3 14.61 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.26.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-accent flex-shrink-0">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.627.074-3.065.334-4.205 1.474C1.708 2.686 1.448 4.124 1.374 5.751 1.316 7.031 1.302 7.439 1.302 12s.014 4.969.072 6.249c.074 1.627.334 3.065 1.474 4.205 1.14 1.14 2.578 1.4 4.205 1.474C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.627-.074 3.065-.334 4.205-1.474 1.14-1.14 1.4-2.578 1.474-4.205.058-1.28.072-1.688.072-6.249s-.014-4.969-.072-6.249c-.074-1.627-.334-3.065-1.474-4.205C19.012.334 17.574.074 15.947 0 14.667.014 14.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

const infoItems = [
  { icon: <LocationPin />, text: 'Jujuy 1811, Mar del Plata, Buenos Aires' },
  { icon: <ClockIcon />,   text: 'Lunes a Sábado, 10:00 a 20:00hs' },
  { icon: <PhoneIcon />,   text: 'WhatsApp: consultar por DM' },
  { icon: <InstagramIcon />, text: '@importadosmdp_ en Instagram' },
]

function MapSkeleton() {
  return <div className="h-[380px] rounded-2xl bg-[#2A3590] animate-pulse" />
}

export default function MapSection() {
  return (
    <section className="bg-blue-light py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-10 items-center">

        {/* ── Info (40%) ── */}
        <div>
          <p className="font-body text-[12px] text-accent font-bold uppercase tracking-[0.15em] mb-4">
            Encontranos
          </p>
          <h2 className="font-display font-black text-[32px] md:text-[40px] text-navy-deep mb-6 leading-[1.1] tracking-tight">
            Estamos en el corazón de MDP
          </h2>

          <ul className="space-y-4 mb-8">
            {infoItems.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
                  {item.icon}
                </span>
                <span className="font-body text-[15px] font-medium text-gray-600 leading-snug pt-2">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="https://maps.google.com/?q=Jujuy+1811,Mar+del+Plata"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-display font-semibold text-sm text-accent
                       border-[1.5px] border-accent rounded-full px-8 py-3.5
                       transition-colors duration-200 hover:bg-accent hover:text-white"
          >
            Cómo llegar →
          </a>
        </div>

        {/* ── Mapa (60%) ── */}
        <div>
          <Suspense fallback={<MapSkeleton />}>
            <MapEmbed />
          </Suspense>
        </div>

      </div>
    </section>
  )
}
