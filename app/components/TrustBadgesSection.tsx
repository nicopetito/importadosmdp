'use client'

import { motion } from 'framer-motion'

const trustBadges = [
  {
    stat: '500+',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 11 2 2 4-4" />
      </svg>
    ),
    title: 'Stock real',
    desc: 'Todo lo que ves está disponible hoy.'
  },
  {
    stat: '100%',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Atención personalizada',
    desc: 'Te asesoramos hasta que tomás la mejor decisión.'
  },
  {
    stat: '~3h',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Entrega rápida',
    desc: 'Showroom en MDP y envíos en el día.'
  },
  {
    stat: '1 año',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: 'Selección curada',
    desc: 'Solo productos originales y verificados.'
  }
]

export default function TrustBadgesSection() {
  return (
    <section className="bg-[#f7f8fa] py-20 md:py-28 px-6 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-primary/60 inline-block" />
            <span className="font-mono text-[9px] text-primary/70 uppercase tracking-[0.2em]">Por qué elegirnos</span>
          </span>
          <h2 className="font-display text-[28px] md:text-[36px] text-on-surface font-bold tracking-tight">
            Compra simple, stock real.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-black/[0.04] flex flex-col gap-4"
            >
              <p className="font-display font-black text-4xl text-primary leading-none">
                {badge.stat}
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center flex-shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-on-surface mb-0.5 tracking-tight">
                    {badge.title}
                  </h3>
                  <p className="font-sans text-[11px] text-secondary leading-relaxed font-light">
                    {badge.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
