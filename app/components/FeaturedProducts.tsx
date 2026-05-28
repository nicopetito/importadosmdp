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
    badgeType: 'white',
    financing: 'Hasta 12 cuotas sin interés'
  },
  {
    id: 'macbook-air-13-m2',
    name: 'MacBook Air M2',
    price: 1150,
    imageUrl: '/imagenes/macbook-air-13-m2.jpg',
    badge: 'TOP SELLER',
    badgeType: 'blue',
    financing: 'Envío gratis a todo el país'
  },
  {
    id: 'airpods-pro-2da-gen',
    name: 'AirPods Pro 2',
    price: 299,
    imageUrl: '/imagenes/airpods-pro-2da-gen.jpg',
    badge: 'NUEVO STOCK',
    badgeType: 'glass',
    financing: 'Garantía oficial de 1 año'
  }
]

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-24 px-6 md:px-12 relative overflow-hidden z-10">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center md:text-left mb-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group bg-white border border-black/[0.06] overflow-hidden hover:shadow-[0_20px_48px_rgba(0,113,227,0.10)] hover:border-primary/30 transition-all duration-300 flex flex-col h-full text-on-surface rounded-2xl"
            >
              <Link href={`/catalogo/${product.id}`} className="block h-full flex flex-col">
                {/* Image Container with spotlight shadow */}
                <div 
                  className="relative aspect-square overflow-hidden flex items-center justify-center transition-colors duration-500 bg-white border-b border-gray-100"
                >
                  {/* Spotlight Radial Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.04)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top Badge Overlay */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-accent-mid to-accent text-white text-[10px] font-bold font-sans rounded-full px-2.5 py-1 shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Image with subtle shadows beneath product */}
                  <div className="relative w-full h-full p-8 flex items-center justify-center">
                    {/* Shadow layer under product */}
                    <div className="absolute bottom-10 w-2/3 h-6 bg-black/10 blur-sm rounded-full transform scale-x-75 group-hover:scale-x-90 transition-transform duration-700" />
                    
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain p-8 transition-all duration-1000 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-8 pt-6 flex flex-col flex-grow bg-white">
                  {/* Category or tag placeholder to add branding detail */}
                  <span className="font-sans text-[10px] font-bold text-primary/70 uppercase tracking-wider mb-2 block">
                    Premium Hardware
                  </span>

                  <h3 className="font-display font-black text-base md:text-lg text-on-surface mb-5 leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[50px]">
                    {product.name}
                  </h3>

                  {/* Pricing, Financing & CTA */}
                  <div className="mt-auto pt-5 border-t border-black/[0.05] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-sans text-[9px] text-secondary font-bold tracking-widest uppercase mb-1 block">
                        Desde
                      </span>
                      <span className="font-display font-black text-2xl text-on-surface tracking-tight leading-none">
                        ${product.price.toLocaleString('es-AR')} <span className="text-[11px] font-sans font-normal text-secondary uppercase">u$s</span>
                      </span>
                      <span className="font-sans text-xs text-primary/80 mt-1.5 flex items-center gap-1">
                        {product.financing}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="w-10 h-10 rounded-full bg-on-surface text-white flex items-center justify-center group-hover:bg-primary transition-all duration-300 shadow-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
