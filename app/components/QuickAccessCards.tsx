import Link from 'next/link'

function IconGrid() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
      <rect x="3" y="3" width="9" height="9" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="12" y="12" width="9" height="9" rx="2" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
      <path d="M20 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7zm0 4h7v2H7z" />
    </svg>
  )
}

function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className="text-accent">
      <path d="M10 1l2.47 5.01L18 6.76l-4 3.9.94 5.49L10 13.77 5.06 16.15 6 10.66 2 6.76l5.53-.75L10 1z" />
    </svg>
  )
}

const cards = [
  {
    href: '/catalogo',
    stat: '+60',
    statLabel: 'productos disponibles',
    icon: <IconGrid />,
    title: 'Catálogo completo',
    description: 'Celulares, notebooks, auriculares y accesorios.',
    linkLabel: 'Ver productos →',
  },
  {
    href: '/resenas',
    stat: '4.9★',
    statLabel: 'calificación promedio',
    icon: (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
      </div>
    ),
    title: 'Lo que dicen nuestros clientes',
    description: 'Más de 500 ventas en Mar del Plata.',
    linkLabel: 'Leer reseñas →',
  },
  {
    href: '/contacto',
    stat: '<3hs',
    statLabel: 'tiempo de respuesta',
    icon: <IconChat />,
    title: 'Hablemos',
    description: 'WhatsApp e Instagram. Atención personalizada.',
    linkLabel: 'Contactanos →',
  },
]

export default function QuickAccessCards() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex flex-col bg-gradient-to-br from-white to-[#F8FAFF] border border-gray-100 rounded-[20px] p-8
                       shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-[400ms] ease-out cursor-pointer
                       hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-accent/40 hover:-translate-y-2"
          >
            {/* Stat grande */}
            <span className="font-display font-extrabold text-5xl text-accent leading-none">
              {card.stat}
            </span>
            <span className="font-body font-light text-[12px] text-[#6B7280] mt-1">
              {card.statLabel}
            </span>

            {/* Ícono */}
            <div className="mt-4">
              {card.icon}
            </div>

            {/* Texto */}
            <h3 className="font-display font-bold text-lg text-navy mt-4">{card.title}</h3>
            <p className="font-body text-[14px] text-[#4A5568] mt-2 leading-relaxed flex-1">
              {card.description}
            </p>

            {/* Link */}
            <span className="font-body font-medium text-[13px] text-accent mt-4 group-hover:underline">
              {card.linkLabel}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
