'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'

function IconGrid() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <rect x="3" y="3" width="9" height="9" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="12" y="12" width="9" height="9" rx="2" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <path d="M20 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7zm0 4h7v2H7z" />
    </svg>
  )
}

function StarIconWhite() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" className="text-white">
      <path d="M10 1l2.47 5.01L18 6.76l-4 3.9.94 5.49L10 13.77 5.06 16.15 6 10.66 2 6.76l5.53-.75L10 1z" />
    </svg>
  )
}

const cards = [
  {
    href: '/catalogo',
    counterValue: 60,
    counterPrefix: '+',
    counterSuffix: '',
    statLabel: 'productos disponibles',
    icon: <IconGrid />,
    title: 'Catálogo completo',
    description: 'Celulares, notebooks, auriculares y accesorios de las mejores marcas.',
    linkLabel: 'Ver productos →',
  },
  {
    href: '/resenas',
    counterValue: 4.9,
    counterPrefix: '',
    counterSuffix: '★',
    statLabel: 'calificación promedio',
    icon: <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <StarIconWhite key={i} />)}</div>,
    title: 'Lo que dicen nuestros clientes',
    description: 'Más de 500 ventas verificadas en Mar del Plata y todo el país.',
    linkLabel: 'Leer reseñas →',
  },
  {
    href: '/contacto',
    counterValue: 3,
    counterPrefix: '<',
    counterSuffix: 'hs',
    statLabel: 'tiempo de respuesta',
    icon: <IconChat />,
    title: 'Hablemos',
    description: 'Atención personalizada por WhatsApp e Instagram. Sin esperas.',
    linkLabel: 'Contactanos →',
  },
]

export default function QuickAccessCards() {
  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #050916 0%, #0D1445 50%, #1A2580 100%)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Por qué elegirnos
          </p>
          <h2 className="font-display font-black text-[32px] md:text-[40px] text-white leading-tight tracking-tight">
            Todo lo que necesitás,<br className="hidden sm:block" /> en un solo lugar.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div key={card.href} whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.25 }}>
              <Link
                href={card.href}
                className="group flex flex-col h-full glass rounded-[22px] p-8 border border-white/10
                           hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer
                           hover:shadow-[0_0_40px_rgba(90,114,237,0.15)]"
              >
                {/* Stat + counter */}
                <div>
                  <AnimatedCounter
                    value={card.counterValue}
                    prefix={card.counterPrefix}
                    suffix={card.counterSuffix}
                    className="font-display font-extrabold text-5xl text-white leading-none"
                  />
                  <span className="font-body font-light text-[12px] text-white/50 mt-1 block">
                    {card.statLabel}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="mt-5 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #3D52C4, #5A72ED)' }}
                >
                  {card.icon}
                </div>

                {/* Text */}
                <h3 className="font-display font-bold text-[17px] text-white mt-4">{card.title}</h3>
                <p className="font-body text-[13px] text-white/60 mt-2 leading-relaxed flex-1">
                  {card.description}
                </p>

                {/* Link */}
                <span className="font-body font-medium text-[13px] text-blue-soft mt-5 group-hover:underline">
                  {card.linkLabel}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
