'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ColeccionesSection() {
  return (
    <section className="bg-[#f7f8fa] py-24 px-6 md:px-12 relative z-10">

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-primary/60 inline-block" />
              <span className="font-mono text-[9px] text-primary/70 uppercase tracking-[0.2em]">Categorías</span>
            </span>
            <h2 className="font-display text-[32px] md:text-[40px] text-on-surface font-bold tracking-tight mb-2">
              Colecciones
            </h2>
            <p className="font-sans text-xs text-secondary/70">
              Curación exclusiva por categoría.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="font-mono font-bold text-[10px] uppercase tracking-widest text-primary hover:text-primary-container transition-colors duration-200 border-b border-primary/20 pb-1"
          >
            Ver catálogo completo
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: iPhone & Samsung (Large left card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 relative aspect-[16/10] md:h-[420px] rounded-3xl overflow-hidden group border border-white/5 hover:border-primary/20 bg-gradient-to-br from-[#121316] via-[#1a1b20] to-[#0a0b0d] shadow-xl cursor-pointer transition-all duration-500"
          >
            <Link href="/catalogo?categoria=Celulares" className="block w-full h-full">
              <Image
                src="/imagenes/stitch-brand-vision.png"
                alt="iPhone & Samsung"
                fill
                className="object-cover opacity-80 md:opacity-90 transition-all duration-1000 group-hover:scale-102 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              {/* Subtle Blue Glow Aura */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.12)_0%,transparent_60%)] pointer-events-none mix-blend-screen" />
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              
              {/* Content overlay */}
              <div className="absolute bottom-8 left-8 z-10">
                <span className="font-mono text-[9px] text-primary font-bold tracking-[0.25em] uppercase mb-2 block">
                  Lo último en movilidad
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-none tracking-tight">
                  iPhone & Samsung
                </h3>
              </div>
            </Link>
          </motion.div>

          {/* Right Column Stack (MacBook & Audio/Accs) */}
          <div className="flex flex-col gap-6 md:h-[420px]">
            
            {/* Card 2: MacBook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1 relative min-h-[198px] rounded-3xl overflow-hidden group border border-white/5 hover:border-white/15 bg-gradient-to-tr from-[#16171a] via-[#25272e] to-[#0f1012] shadow-md cursor-pointer transition-all duration-500"
            >
              <Link href="/catalogo?categoria=Notebooks" className="block w-full h-full">
                <Image
                  src="/imagenes/macbook-pro-14-m3.jpg"
                  alt="MacBook"
                  fill
                  className="object-cover opacity-80 md:opacity-90 transition-all duration-1000 group-hover:scale-102 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Brushed Aluminum Lighting Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-white/[0.02] to-black/30 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Content overlay */}
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="font-mono text-[8px] text-white/50 font-bold tracking-[0.25em] uppercase mb-1.5 block">
                    Potencia sin límites
                  </span>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight">
                    MacBook
                  </h3>
                </div>
              </Link>
            </motion.div>

            {/* Card 3: Audio & Accs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 relative min-h-[198px] rounded-3xl overflow-hidden group border border-white/5 hover:border-white/10 bg-gradient-to-b from-[#0a0a0c] to-[#020203] shadow-md cursor-pointer transition-all duration-500"
            >
              <Link href="/catalogo?categoria=Auriculares" className="block w-full h-full">
                <Image
                  src="/imagenes/airpods-pro-2da-gen.jpg"
                  alt="Audio & Accesorios"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-102 opacity-75 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Focused Spotlight Ambient Shadowing */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_55%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                
                {/* Content overlay */}
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="font-mono text-[8px] text-primary font-bold tracking-[0.25em] uppercase mb-1.5 block">
                    Sonido inmersivo
                  </span>
                  <h3 className="font-display text-xl font-bold text-white tracking-tight">
                    Audio & Accs
                  </h3>
                </div>
              </Link>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  )
}
