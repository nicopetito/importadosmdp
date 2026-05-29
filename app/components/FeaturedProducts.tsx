'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const featuredProducts = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro',
    price: 1350,
    imageUrl: '/imagenes/iphone-15-pro-max.jpg',
    badge: '100% ORIGINAL',
    financing: 'Hasta 12 cuotas sin interés'
  },
  {
    id: 'macbook-air-13-m2',
    name: 'MacBook Air M2',
    price: 1150,
    imageUrl: '/imagenes/macbook-air-13-m2.jpg',
    badge: 'TOP SELLER',
    financing: 'Envío gratis a todo el país'
  },
  {
    id: 'airpods-pro-2da-gen',
    name: 'AirPods Pro 2',
    price: 299,
    imageUrl: '/imagenes/airpods-pro-2da-gen.jpg',
    badge: 'NUEVO STOCK',
    financing: 'Garantía oficial de 1 año'
  }
]

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function FeaturedProducts() {
  const [featured, ...rest] = featuredProducts

  return (
    <section className="bg-white py-24 px-6 md:px-12 relative overflow-hidden z-10">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center md:text-left mb-12 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-primary/60 inline-block" />
              <span className="font-mono text-[9px] text-primary/70 uppercase tracking-[0.2em]">Destacados</span>
            </span>
            <h2 className="font-display text-[36px] md:text-[44px] text-on-surface font-extrabold leading-none tracking-tight">
              Selección Curada<span className="text-primary">.</span>
            </h2>
            <p className="font-sans text-sm text-secondary/70 mt-3 max-w-xl font-light">
              iPhone, MacBook y AirPods originales, sellados de fábrica. Pasá por el local en Jujuy 1611, Mar del Plata, o consultanos por WhatsApp.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="font-mono font-bold text-[10px] uppercase tracking-widest text-primary hover:text-primary-container transition-colors duration-200 border-b border-primary/20 pb-1 group flex items-center gap-1 self-start md:self-end"
          >
            Explorar catálogo completo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transform group-hover:translate-x-0.5 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Product Grid — bento: featured wide card + 2 stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

          {/* Featured card — spans 2 columns */}
          <motion.div
            key={featured.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group md:col-span-2 bg-white border border-black/[0.06] overflow-hidden hover:shadow-[0_20px_48px_rgba(0,113,227,0.10)] hover:border-primary/30 transition-all duration-300 flex flex-col text-on-surface rounded-2xl"
          >
            <Link href={`/catalogo/${featured.id}`} className="flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center transition-colors duration-500 bg-white border-b border-gray-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.04)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                {featured.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-accent-mid to-accent text-white text-[10px] font-bold font-sans rounded-full px-2.5 py-1 shadow-sm">
                    {featured.badge}
                  </span>
                )}
                <div className="relative w-full h-full p-6 flex items-center justify-center">
                  <div className="absolute bottom-6 w-2/3 h-6 bg-black/10 blur-sm rounded-full transform scale-x-75 group-hover:scale-x-90 transition-transform duration-700" />
                  <Image
                    src={featured.imageUrl}
                    alt={featured.name}
                    fill
                    className="object-contain p-6 transition-all duration-1000 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
              </div>
              <div className="pt-6 px-8 pb-8 flex flex-col bg-white">
                <h3 className="font-display font-black text-xl md:text-2xl text-on-surface leading-tight group-hover:text-primary transition-colors mb-2">
                  {featured.name}
                </h3>
                <p className="font-sans text-sm text-secondary/70 font-light mb-6">
                  Titanio. Chip A17 Pro. Cámara 48 MP.
                </p>
                <div className="pt-5 border-t border-black/[0.05] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-sans text-[9px] text-secondary font-bold tracking-widest uppercase mb-1 block">
                      Desde
                    </span>
                    <span className="font-display font-black text-2xl text-on-surface tracking-tight leading-none">
                      ${featured.price.toLocaleString('es-AR')} <span className="text-[11px] font-sans font-normal text-secondary uppercase">u$s</span>
                    </span>
                    <span className="font-sans text-xs text-primary/80 mt-1.5">
                      {featured.financing}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 bg-on-surface group-hover:bg-primary text-white text-[11px] font-bold font-sans uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm">
                    Ver {featured.name}
                    <ArrowIcon size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right column: 2 stacked cards */}
          <div className="flex flex-col gap-6">
            {rest.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group bg-white border border-black/[0.06] overflow-hidden hover:shadow-[0_20px_48px_rgba(0,113,227,0.10)] hover:border-primary/30 transition-all duration-300 flex flex-col text-on-surface rounded-2xl"
              >
                <Link href={`/catalogo/${product.id}`} className="flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center transition-colors duration-500 bg-white border-b border-gray-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.04)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-accent-mid to-accent text-white text-[10px] font-bold font-sans rounded-full px-2.5 py-1 shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                      <div className="absolute bottom-4 w-2/3 h-4 bg-black/10 blur-sm rounded-full transform scale-x-75 group-hover:scale-x-90 transition-transform duration-700" />
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-all duration-1000 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="pt-4 px-5 pb-5 flex flex-col flex-grow bg-white">
                    <h3 className="font-display font-black text-base text-on-surface leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-0.5">
                      {product.name}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-black/[0.05] flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-sans text-[9px] text-secondary font-bold tracking-widest uppercase mb-1 block">
                          Desde
                        </span>
                        <span className="font-display font-black text-xl text-on-surface tracking-tight leading-none">
                          ${product.price.toLocaleString('es-AR')} <span className="text-[11px] font-sans font-normal text-secondary uppercase">u$s</span>
                        </span>
                        <span className="font-sans text-xs text-primary/80 mt-1">
                          {product.financing}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-on-surface text-white flex items-center justify-center group-hover:bg-primary transition-all duration-300 shadow-sm">
                        <ArrowIcon size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
