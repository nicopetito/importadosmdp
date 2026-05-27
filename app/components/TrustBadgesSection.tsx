'use client'

import { motion } from 'framer-motion'

const trustBadges = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 11 2 2 4-4" />
      </svg>
    ),
    title: 'Garantía Oficial',
    desc: 'Soporte local directo de fábrica.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Envío Express',
    desc: 'Showroom en MDP y envíos en el día.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Mejor Precio',
    desc: 'Cotización transparente sin intermediarios.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Asesoría VIP',
    desc: 'Atención personalizada uno a uno.'
  }
]

export default function TrustBadgesSection() {
  return (
    <section className="bg-[#F8F8F6] py-12 px-6 md:px-12 border-t border-outline-variant/10 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2.5rem] border border-outline-variant/10 p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.01)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/10">
            {trustBadges.map((badge, i) => (
              <div
                key={badge.title}
                className="flex items-center gap-4 px-2 md:px-8 first:pl-0 last:pr-0 pt-6 sm:pt-0 first:pt-0 sm:pb-6 lg:pb-0 sm:even:border-l-0 lg:even:border-l"
              >
                {/* Icon Container */}
                <div className="bg-[#F5F5F7] p-3 rounded-full flex items-center justify-center flex-shrink-0">
                  {badge.icon}
                </div>

                {/* Text Block */}
                <div>
                  <h3 className="font-display font-bold text-sm text-on-surface mb-0.5 tracking-tight">
                    {badge.title}
                  </h3>
                  <p className="font-sans text-[11px] text-secondary leading-relaxed font-light">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
