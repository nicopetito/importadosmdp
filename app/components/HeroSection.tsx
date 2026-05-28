'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#050505] text-white pt-16">
      {/* Background Cinematic Image & Gradients */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          alt="Cinematic luxury tech"
          className="w-full h-full object-cover opacity-70 md:opacity-90 object-center scale-105"
          src="/imagenes/stitch-hero.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-[#050505]/30" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full py-24">
        <div className="flex flex-col items-center text-center">
          
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="px-4 py-1.5 bg-primary/20 backdrop-blur-md text-primary text-[9px] font-bold font-mono uppercase tracking-[0.2em] rounded-full border border-primary/30">
              Disponible hoy
            </span>
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-[9px] font-bold font-mono uppercase tracking-[0.2em] rounded-full border border-white/10 text-white/90">
              Retiro inmediato
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[44px] sm:text-[80px] md:text-[100px] leading-[0.85] tracking-tighter mb-8 font-black italic uppercase select-none text-white"
          >
            TECH <br />CURADA.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-white/70 text-base sm:text-lg md:text-xl mb-12 max-w-xl leading-relaxed text-balance font-light"
          >
            Apple y Samsung originales. Garantía real y entrega inmediata.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/catalogo"
              className="px-10 py-4 bg-white text-black font-mono font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-white/90 transition-all active:scale-[0.98] shadow-2xl shadow-white/5"
            >
              Ver Catálogo
            </Link>
            <a
              href="https://wa.me/5492235000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-white/5 backdrop-blur-md text-white border border-white/20 font-mono font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-white/10 transition-all active:scale-[0.98]"
            >
              Consultar Stock
            </a>
          </motion.div>

        </div>
      </div>

      {/* Smooth Atmospheric Bottom Transition to light background */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>


  )
}
