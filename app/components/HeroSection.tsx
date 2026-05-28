'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#08090c] text-white">
      {/* Background — imagen premium de productos, sin circuit board */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          alt="Tech premium"
          className="w-full h-full object-cover opacity-80 md:opacity-90 object-center scale-105"
          src="/images/hero.png"
        />
        {/* Un solo overlay limpio — no acumulación de gradientes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/55 to-[#08090c]/25" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full pt-[100px] md:pt-[120px] pb-24">
        <div className="flex flex-col items-center text-center">

          {/* Badges — sobrios, sin gamer */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="px-3.5 py-1 bg-primary/15 backdrop-blur-md text-primary text-[8px] font-bold uppercase tracking-[0.02em] rounded-full border border-primary/20">
              Disponible hoy
            </span>
            <span className="px-3.5 py-1 bg-white/8 backdrop-blur-sm text-[8px] font-bold uppercase tracking-[0.02em] rounded-full border border-white/15 text-white/85">
              Retiro inmediato
            </span>
          </motion.div>

          {/* Headline — premium, sin italic, controlado */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display text-[42px] sm:text-[72px] md:text-[88px] leading-[0.92] tracking-tighter mb-7 font-black uppercase select-none text-white"
          >
            TECH <br />CURADA.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="font-sans text-white/80 text-base sm:text-lg md:text-xl mb-12 max-w-lg leading-relaxed text-balance font-light"
          >
            Apple, Samsung y accesorios originales seleccionados. Stock real, garantía y entrega inmediata en Mar del Plata.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/catalogo"
              className="px-9 py-3.5 bg-white text-black font-sans font-bold text-sm rounded-full hover:bg-white/92 transition-all active:scale-[0.98] shadow-[0_4px_24px_rgba(255,255,255,0.12)] hover:shadow-[0_6px_28px_rgba(255,255,255,0.18)]"
            >
              Ver catálogo
            </Link>
            <a
              href="https://wa.me/5492235000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-3.5 bg-white/6 backdrop-blur-md text-white border border-white/35 font-sans font-semibold text-sm rounded-full hover:bg-white/12 hover:border-white/50 transition-all active:scale-[0.98]"
            >
              Consultar stock
            </a>
          </motion.div>

        </div>
      </div>

      {/* Transición suave hacia el fondo de página */}
      <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-[#f7f8fa] to-transparent pointer-events-none z-10" />
    </section>
  )
}
