'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import MapEmbed from './MapEmbed'
import WhatsAppIcon from './icons/WhatsAppIcon'

function MapSkeleton() {
  return <div className="w-full h-full min-h-[400px] bg-[#F5F5F7] animate-pulse rounded-[2rem]" />
}

export default function MapSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden z-10">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="p-3 bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-[0_24px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_32px_70px_rgba(0,113,227,0.08)] transition-all duration-700 hover:border-primary/20 group">
              <div className="relative h-[380px] sm:h-[440px] rounded-[2rem] overflow-hidden border border-black/[0.02]">
                <Suspense fallback={<MapSkeleton />}>
                  <MapEmbed height="100%" />
                </Suspense>
                <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md border border-white/20 rounded-[1.5rem] p-4 flex items-center justify-between shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">
                  <div>
                    <p className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest mb-0.5">Ubicación Confirmada</p>
                    <p className="text-xs text-on-surface font-bold">Jujuy 1611, Mar del Plata</p>
                  </div>
                  <span className="font-mono text-[9px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">Abierto</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center"
          >
            <span className="text-primary font-mono text-[9px] font-bold uppercase tracking-[0.25em] mb-4 block">
              Encontranos
            </span>
            <h2 className="font-display text-[36px] sm:text-[44px] font-extrabold tracking-tight mb-4 text-on-surface leading-none">
              La Tienda Física<span className="text-primary">.</span>
            </h2>
            <p className="font-sans text-secondary/80 mb-8 leading-relaxed text-sm md:text-base font-light">
              Vení a ver los equipos en persona antes de comprar. Stock real, productos sellados de fábrica y asesoramiento sin apuro. Estamos en Jujuy 1611, Mar del Plata.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/60 backdrop-blur-md border border-outline-variant/10 rounded-[1.5rem] p-5 flex items-start gap-4 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:border-primary/10">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-on-surface mb-0.5">Ubicación</h4>
                  <p className="text-on-surface/80 text-xs font-medium">Jujuy 1611</p>
                  <p className="text-secondary/70 text-[10px] mt-0.5 font-light">Mar del Plata, Argentina</p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-outline-variant/10 rounded-[1.5rem] p-5 flex items-start gap-4 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:border-primary/10">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-on-surface mb-0.5">Horarios</h4>
                  <p className="text-on-surface/80 text-xs font-medium">Lunes a Sábado</p>
                  <p className="text-secondary/70 text-[10px] mt-0.5 font-light">10:00 hs — 19:00 hs</p>
                </div>
              </div>
            </div>

            <p className="font-sans text-xs text-secondary mb-4">
              Respondemos rápido — consultá antes de venir.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 self-start">
              <a
                href="https://wa.me/5492235000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-sans font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#20bc5a] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(37,211,102,0.30)]"
              >
                <WhatsAppIcon size={18} />
                Consultanos por WhatsApp
              </a>
              <a
                href="https://maps.google.com/?q=Jujuy+1611,Mar+del+Plata"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-on-surface border border-black/[0.08] font-sans font-semibold text-sm px-8 py-3.5 rounded-full hover:border-primary/30 transition-all duration-300 group"
              >
                Obtener direcciones
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
