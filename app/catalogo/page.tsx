'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import GradientOrbs from '@/app/components/GradientOrbs'

const productos = [
  { id:1, brand:'Apple', category:'Celulares', name:'iPhone 15 Pro Max', price:1350000, slug:'iphone-15-pro-max', badge:'Nuevo', bgColor:'linear-gradient(135deg,#EEF1FD,#DDE3FA)', image:'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80' },
  { id:2, brand:'Samsung', category:'Celulares', name:'Samsung Galaxy S24 Ultra', price:980000, slug:'samsung-galaxy-s24-ultra', badge:'Popular', bgColor:'linear-gradient(135deg,#EEF1FD,#DDE3FA)', image:'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&q=80' },
  { id:3, brand:'Xiaomi', category:'Celulares', name:'Xiaomi Redmi Note 13 Pro', price:480000, slug:'xiaomi-redmi-note-13-pro', badge:null, bgColor:'linear-gradient(135deg,#EEF1FD,#DDE3FA)', image:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80' },
  { id:4, brand:'Apple', category:'Notebooks', name:'MacBook Pro 14" M3', price:1750000, slug:'macbook-pro-14-m3', badge:'Nuevo', bgColor:'linear-gradient(135deg,#EDF7F2,#D1F0E0)', image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80' },
  { id:5, brand:'Apple', category:'Notebooks', name:'MacBook Air 13" M2', price:1100000, slug:'macbook-air-13-m2', badge:'Popular', bgColor:'linear-gradient(135deg,#EDF7F2,#D1F0E0)', image:'https://images.unsplash.com/photo-1611186871525-7b786b5bbada?w=300&q=80' },
  { id:6, brand:'Lenovo', category:'Notebooks', name:'ThinkPad E16 i7', price:890000, slug:'thinkpad-e16-i7', badge:null, bgColor:'linear-gradient(135deg,#EDF7F2,#D1F0E0)', image:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80' },
  { id:7, brand:'Apple', category:'Auriculares', name:'AirPods Pro (2da gen)', price:250000, slug:'airpods-pro-2da-gen', badge:'Popular', bgColor:'linear-gradient(135deg,#FDF5EE,#FAE5D0)', image:'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&q=80' },
  { id:8, brand:'Sony', category:'Auriculares', name:'WH-1000XM5', price:360000, slug:'sony-wh-1000xm5', badge:null, bgColor:'linear-gradient(135deg,#FDF5EE,#FAE5D0)', image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80' },
  { id:9, brand:'JBL', category:'Auriculares', name:'JBL Tune 770NC', price:115000, slug:'jbl-tune-770nc', badge:null, bgColor:'linear-gradient(135deg,#FDF5EE,#FAE5D0)', image:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80' },
  { id:10, brand:'Apple', category:'Accesorios', name:'Apple Watch Series 9', price:780000, slug:'apple-watch-series-9', badge:'Nuevo', bgColor:'linear-gradient(135deg,#F5EEFB,#EDE0F8)', image:'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80' },
  { id:11, brand:'Apple', category:'Accesorios', name:'iPad Pro 11" M2', price:850000, slug:'ipad-pro-11-m2', badge:null, bgColor:'linear-gradient(135deg,#F5EEFB,#EDE0F8)', image:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80' },
  { id:12, brand:'Samsung', category:'Accesorios', name:'Galaxy Watch 6 Classic', price:420000, slug:'galaxy-watch-6-classic', badge:null, bgColor:'linear-gradient(135deg,#F5EEFB,#EDE0F8)', image:'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=80' },
]

const filtros = [
  { label: 'Todos',       emoji: '🛍️' },
  { label: 'Celulares',   emoji: '📱' },
  { label: 'Notebooks',   emoji: '💻' },
  { label: 'Auriculares', emoji: '🎧' },
  { label: 'Accesorios',  emoji: '⌚' },
]

function AnimatedCard({ producto, index }: { producto: typeof productos[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 4) * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/catalogo/${producto.slug}`}
        className="group bg-white border border-blue-subtle rounded-[18px] overflow-hidden transition-all duration-300 cursor-pointer block hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(90,114,237,0.15)] hover:border-blue-border"
      >
        <div className="h-[170px] w-full flex items-center justify-center relative overflow-hidden" style={{ background: producto.bgColor }}>
          {producto.badge && (
            <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-accent-mid to-accent text-white text-[10px] font-bold font-body rounded-full px-2.5 py-1 z-10 shadow-sm">
              {producto.badge}
            </span>
          )}
          <Image
            src={producto.image}
            alt={producto.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-x-3 bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div className="bg-accent text-white text-[11px] font-bold font-body rounded-full px-3 py-1.5 text-center shadow">
              Ver producto →
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="font-body text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
            {producto.brand} · {producto.category}
          </p>
          <h3 className="font-display font-black text-[13px] text-navy leading-snug line-clamp-2 mb-3 min-h-[34px]">
            {producto.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-display font-black text-base text-navy">
              <span className="text-[11px] font-body font-normal text-[#6B7280]">ARS </span>
              ${producto.price.toLocaleString('es-AR')}
            </p>
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-sm group-hover:bg-accent transition-colors duration-200">→</div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CatalogoPage() {
  const [filtroActivo, setFiltroActivo] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const productosFiltrados = productos.filter(p => {
    const matchCategoria = filtroActivo === 'Todos' || p.category === filtroActivo
    const matchBusqueda = busqueda === '' ||
      p.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.brand.toLowerCase().includes(busqueda.toLowerCase())
    return matchCategoria && matchBusqueda
  })

  return (
    <div className="min-h-screen bg-blue-base overflow-x-hidden">
      <Navbar />

      {/* Dark header */}
      <header className="relative overflow-hidden px-6 py-12 md:px-16 md:pt-16 md:pb-14" style={{ background: 'linear-gradient(135deg, #050916 0%, #1A2580 100%)' }}>
        <GradientOrbs />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Tecnología importada · Mar del Plata
          </p>
          <h1 className="font-display font-black text-[40px] md:text-[60px] text-white leading-tight tracking-tight mb-3">
            Catálogo
          </h1>
          <p className="font-body font-light text-white/60 text-lg max-w-[480px]">
            Todos nuestros productos con garantía real.
          </p>
        </div>
      </header>

      {/* Sticky filter bar */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-blue-subtle shadow-sm px-6 py-4 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Filter pills */}
          <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
            <div className="flex items-center gap-2 min-w-max relative">
              {filtros.map(f => (
                <button
                  key={f.label}
                  onClick={() => setFiltroActivo(f.label)}
                  className={`relative font-body font-medium text-sm rounded-full px-5 py-2.5 transition-all duration-200 flex items-center gap-1.5 ${
                    filtroActivo === f.label
                      ? 'text-white'
                      : 'bg-blue-base border border-blue-border text-[#4A5568] hover:bg-blue-subtle hover:border-accent/40'
                  }`}
                >
                  {filtroActivo === f.label && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 bg-navy rounded-full"
                      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{f.emoji}</span>
                  <span className="relative z-10">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-[320px] sm:ml-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full h-[42px] bg-blue-base border border-blue-border rounded-full pl-10 pr-4 font-body text-sm text-navy focus:border-accent focus:outline-none focus:bg-white transition-all placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="px-6 py-10 md:px-16 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-xl text-navy">
              {filtroActivo === 'Todos' ? 'Todo el catálogo' : filtroActivo}
            </h2>
            <span className="font-body text-sm text-[#6B7280]">{productosFiltrados.length} productos</span>
          </div>

          <AnimatePresence mode="wait">
            {productosFiltrados.length > 0 ? (
              <motion.div
                key={filtroActivo + busqueda}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
              >
                {productosFiltrados.map((producto, i) => (
                  <AnimatedCard key={producto.id} producto={producto} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <span className="text-7xl opacity-25">🔍</span>
                <h3 className="font-display font-bold text-xl text-navy">Sin resultados</h3>
                <p className="font-body text-[#6B7280] text-sm text-center max-w-[280px]">
                  No encontramos productos para &ldquo;{busqueda}&rdquo;. Probá con otra búsqueda.
                </p>
                <button
                  onClick={() => { setFiltroActivo('Todos'); setBusqueda('') }}
                  className="mt-2 bg-accent text-white rounded-full px-6 py-2.5 text-sm font-bold font-body hover:bg-accent-mid transition-colors"
                >
                  Ver todos
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  )
}
