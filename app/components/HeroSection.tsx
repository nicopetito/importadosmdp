'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import GradientOrbs from './GradientOrbs'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const phoneY = useTransform(scrollYProgress, [0, 1], ['0px', '-70px'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-pure-black overflow-hidden"
    >
      {/* Background layers */}
      <GradientOrbs />
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-0 grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">

        {/* ── Left Column: Text ── */}
        <div className="flex flex-col items-start">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body font-bold text-[11px] uppercase tracking-[0.22em] text-accent mb-5 flex items-center gap-2"
          >
            <span className="block w-6 h-[2px] rounded-full bg-gradient-to-r from-accent to-blue-soft" />
            Mar del Plata · Tecnología importada
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-[52px] md:text-[72px] lg:text-[82px] text-white leading-[1.0] tracking-tight mb-6"
          >
            Tecnología<br />
            importada,{' '}
            <span className="text-gradient-accent">
              al precio
            </span>
            <br />
            <span className="text-gradient-accent">
              justo.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body font-light text-white/65 text-lg max-w-[440px] mb-10 leading-relaxed"
          >
            Celulares, notebooks, auriculares y accesorios con garantía real.
            Enviamos a todo el país.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <Link
              href="/catalogo"
              className="font-body font-bold text-sm text-white bg-gradient-to-r from-accent-mid to-accent rounded-full px-7 py-3.5 shadow-[0_0_28px_rgba(90,114,237,0.45)] hover:shadow-[0_0_48px_rgba(90,114,237,0.7)] transition-all duration-300 hover:scale-105"
            >
              Ver catálogo →
            </Link>
            <Link
              href="/contacto"
              className="font-body font-bold text-sm text-white/90 glass rounded-full px-7 py-3.5 hover:bg-white/20 transition-all duration-300"
            >
              Consultar ahora
            </Link>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="glass rounded-full px-5 py-2.5 inline-flex items-center gap-5"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="font-body text-xs font-medium text-white/80">En línea ahora</span>
            </div>
            <span className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400 flex-shrink-0">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-body text-xs font-medium text-white/80">4.9 · +500 reseñas</span>
            </div>
            <span className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-body text-xs font-medium text-white/80">&lt;3hs respuesta</span>
            </div>
          </motion.div>
        </div>

        {/* ── Right Column: Phone Mockup ── */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {/* Glow halo */}
          <div
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(90,114,237,0.38) 0%, transparent 65%)',
              filter: 'blur(32px)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: phoneY }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/mockup-triple.png"
                alt="ImportadosMDP — Catálogo en tu teléfono"
                width={560}
                height={380}
                className="relative z-10 drop-shadow-2xl max-w-full"
                priority
              />
            </motion.div>

            {/* Badge: En línea */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4, ease: 'backOut' }}
              className="absolute top-[12%] -right-2 lg:-right-8 glass rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
              <div>
                <p className="font-body font-semibold text-white text-[12px] leading-none">En línea ahora</p>
                <p className="font-body text-white/60 text-[10px] mt-0.5">Respondemos rápido</p>
              </div>
            </motion.div>

            {/* Badge: Rating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.4, ease: 'backOut' }}
              className="absolute bottom-[15%] -left-2 lg:-left-8 glass rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
              </div>
              <p className="font-body font-bold text-white text-[13px] leading-none">4.9 / 5.0</p>
              <p className="font-body text-white/60 text-[10px] mt-0.5">+500 reseñas</p>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#050916]/80 to-transparent pointer-events-none" />
    </section>
  )
}
