'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  )
}

function StoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  )
}

const steps = [
  {
    num: 1,
    title: 'Explorá el catálogo',
    desc: 'Navegá todos nuestros productos, filtrá por categoría y encontrá lo que estás buscando desde tu celular o computadora.',
    icon: <SearchIcon />
  },
  {
    num: 2,
    title: 'Consultanos',
    desc: '¿Tenés dudas sobre algún producto? Escribinos por WhatsApp o Instagram y te respondemos en menos de 3 horas.',
    icon: <ChatIcon />
  },
  {
    num: 3,
    title: 'Visitanos y llevate tu equipo',
    desc: 'Pasá por nuestra tienda en Jujuy 1811, Mar del Plata. Todos nuestros productos son originales y sellados de fábrica.',
    icon: <StoreIcon />
  }
]

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Simple y transparente
          </p>
          <h2 className="font-display font-black text-[36px] md:text-[44px] text-navy leading-tight">
            ¿Cómo funciona?
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Animated Dashed Line (Desktop only) */}
          <div className="hidden md:block absolute top-7 left-[16.66%] w-[66.66%] h-[2px] z-0">
            <motion.div
              className="h-full border-t-[2px] border-dashed border-[#C7D4FF]"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center px-4"
              >
                {/* Number Circle */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-mid to-accent flex items-center justify-center font-display font-black text-xl text-white shadow-md mb-6 relative">
                  {step.num}
                </div>

                {/* Icon */}
                <div className="text-accent mb-4 bg-blue-base p-3.5 rounded-full border border-blue-subtle shadow-sm">
                  {step.icon}
                </div>

                {/* Text */}
                <h3 className="font-display font-bold text-lg text-navy mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[#4A5568] leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
