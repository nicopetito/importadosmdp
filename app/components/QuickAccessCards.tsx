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

function IconStar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
    accentColor: 'from-[#3D52C4] to-[#5A72ED]',
  },
  {
    href: '/resenas',
    counterValue: 4.9,
    counterPrefix: '',
    counterSuffix: '★',
    statLabel: 'calificación promedio',
    icon: <IconStar />,
    title: 'Lo que dicen nuestros clientes',
    description: 'Más de 500 ventas verificadas en Mar del Plata y todo el país.',
    linkLabel: 'Leer reseñas →',
    accentColor: 'from-[#7C3AED] to-[#A78BFA]',
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
    accentColor: 'from-[#0EA5E9] to-[#38BDF8]',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function QuickAccessCards() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050916 0%, #0D1445 50%, #1A2580 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-80px] left-[10%] w-[340px] h-[340px] rounded-full bg-[#3D52C4]/20 blur-[100px]" />
        <div className="absolute bottom-[-60px] right-[8%] w-[280px] h-[280px] rounded-full bg-[#5A72ED]/15 blur-[90px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Por qué elegirnos
          </p>
          <h2 className="font-display font-black text-[32px] md:text-[40px] text-white leading-tight tracking-tight">
            Todo lo que necesitás,<br className="hidden sm:block" /> en un solo lugar.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.href}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.25 } }}
            >
              <Link
                href={card.href}
                className="group relative flex flex-col h-full rounded-[22px] overflow-hidden border border-white/10
                           hover:border-white/25 transition-all duration-300 cursor-pointer
                           hover:shadow-[0_8px_40px_rgba(90,114,237,0.2)]"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
              >
                {/* Top accent gradient line */}
                <div className={`h-[3px] w-full bg-gradient-to-r ${card.accentColor} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="p-8 flex flex-col flex-1">
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
                    className={`mt-5 w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br ${card.accentColor} shadow-lg`}
                  >
                    {card.icon}
                  </div>

                  {/* Text */}
                  <h3 className="font-display font-bold text-[17px] text-white mt-4">{card.title}</h3>
                  <p className="font-body text-[13px] text-white/60 mt-2 leading-relaxed flex-1">
                    {card.description}
                  </p>

                  {/* Link */}
                  <span className={`font-body font-medium text-[13px] mt-5 bg-gradient-to-r ${card.accentColor} bg-clip-text text-transparent group-hover:underline decoration-[#5A72ED]`}>
                    {card.linkLabel}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
