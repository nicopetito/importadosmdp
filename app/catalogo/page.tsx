'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import PullToRefresh from '@/app/components/PullToRefresh'
import { supabase } from '@/utils/supabase/client'

const productos = [
  { id:1, brand:'Apple', category:'Celulares', name:'iPhone 15 Pro Max', price:1350000, slug:'iphone-15-pro-max', badge:'Nuevo', bgColor:'#F2F2F2', image:'/imagenes/iphone-15-pro-max.jpg' },
  { id:2, brand:'Samsung', category:'Celulares', name:'Samsung Galaxy S24 Ultra', price:980000, slug:'samsung-galaxy-s24-ultra', badge:'Popular', bgColor:'#F2F2F2', image:'/imagenes/samsung-galaxy-s24-ultra.jpg' },
  { id:3, brand:'Xiaomi', category:'Celulares', name:'Xiaomi Redmi Note 13 Pro', price:480000, slug:'xiaomi-redmi-note-13-pro', badge:null, bgColor:'#F2F2F2', image:'/imagenes/xiaomi-redmi-note-13-pro.jpg' },
  { id:4, brand:'Apple', category:'Notebooks', name:'MacBook Pro 14" M3', price:1750000, slug:'macbook-pro-14-m3', badge:'Nuevo', bgColor:'#F2F2F2', image:'/imagenes/macbook-pro-14-m3.jpg' },
  { id:5, brand:'Apple', category:'Notebooks', name:'MacBook Air 13" M2', price:1100000, slug:'macbook-air-13-m2', badge:'Popular', bgColor:'#F2F2F2', image:'/imagenes/macbook-air-13-m2.jpg' },
  { id:6, brand:'Lenovo', category:'Notebooks', name:'ThinkPad E16 i7', price:890000, slug:'thinkpad-e16-i7', badge:null, bgColor:'#F2F2F2', image:'/imagenes/thinkpad-e16-i7.jpg' },
  { id:7, brand:'Apple', category:'Auriculares', name:'AirPods Pro (2da gen)', price:250000, slug:'airpods-pro-2da-gen', badge:'Popular', bgColor:'#F2F2F2', image:'/imagenes/airpods-pro-2da-gen.jpg' },
  { id:8, brand:'Sony', category:'Auriculares', name:'WH-1000XM5', price:360000, slug:'sony-wh-1000xm5', badge:null, bgColor:'#F2F2F2', image:'/imagenes/sony-wh-1000xm5.jpg' },
  { id:9, brand:'JBL', category:'Auriculares', name:'JBL Tune 770NC', price:115000, slug:'jbl-tune-770nc', badge:null, bgColor:'#F2F2F2', image:'/imagenes/jbl-tune-770nc.jpg' },
  { id:10, brand:'Apple', category:'Accesorios', name:'Apple Watch Series 9', price:780000, slug:'apple-watch-series-9', badge:'Nuevo', bgColor:'#F2F2F2', image:'/imagenes/apple-watch-series-9.jpg' },
  { id:11, brand:'Apple', category:'Accesorios', name:'iPad Pro 11" M2', price:850000, slug:'ipad-pro-11-m2', badge:null, bgColor:'#F2F2F2', image:'/imagenes/ipad-pro-11-m2.jpg' },
  { id:12, brand:'Samsung', category:'Accesorios', name:'Galaxy Watch 6 Classic', price:420000, slug:'galaxy-watch-6-classic', badge:null, bgColor:'#F2F2F2', image:'/imagenes/galaxy-watch-6-classic.jpg' },
]

const filtros = [
  { label: 'Todos',       emoji: '🛍️' },
  { label: 'Celulares',   emoji: '📱' },
  { label: 'Notebooks',   emoji: '💻' },
  { label: 'Auriculares', emoji: '🎧' },
  { label: 'Accesorios',  emoji: '⌚' },
]



function getCategoryGradient(): string {
  return '#FFFFFF'
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.trim()})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-primary/20 text-navy rounded-sm px-0.5 font-bold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function AnimatedCard({ producto, index, busqueda }: { producto: typeof productos[0]; index: number; busqueda: string }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 4) * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/catalogo/${producto.slug}`}
        className="group bg-white rounded-[20px] border border-gray-200 overflow-hidden cursor-pointer hover:shadow-[0_20px_48px_rgba(0,113,227,0.12)] hover:border-primary transition-all duration-300 flex flex-col h-full text-navy"
      >
        <div 
          className="relative aspect-[4/5] overflow-hidden flex items-center justify-center border-b border-gray-100"
          style={{ background: getCategoryGradient() }}
        >
          {/* Badge Overlay */}
          {producto.badge && (
            <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-accent-mid to-accent text-white text-[10px] font-bold font-body rounded-full px-2.5 py-1 shadow-sm">
              {producto.badge}
            </span>
          )}
          
          <div className="relative w-full h-full p-2 flex items-center justify-center">
            <Image
              src={producto.image}
              alt={producto.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-x-3 bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div className="bg-accent text-white text-[11px] font-bold font-body rounded-full px-3 py-1.5 text-center shadow">
              Consultar →
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow bg-white">
          <p className="font-body text-[10px] font-bold text-accent uppercase tracking-wider mb-1 block">
            {highlight(producto.brand, busqueda)} · {producto.category}
          </p>
          <h3 className="font-display font-black text-[13px] md:text-sm text-navy leading-snug line-clamp-2 min-h-[40px] mb-auto">
            {highlight(producto.name, busqueda)}
          </h3>
          <div className="mt-3 pt-3 border-t border-blue-subtle flex items-center justify-between gap-2">
            <p className="font-display font-black text-base text-navy flex items-baseline gap-1">
              <span className="text-[11px] font-body font-normal text-[#6B7280]">ARS</span>
              ${producto.price.toLocaleString('es-AR')}
            </p>
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center group-hover:bg-accent transition-colors duration-200 shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function AnimatedListCard({ producto, busqueda }: { producto: any; busqueda: string }) {
  return (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/catalogo/${producto.slug}`}
        className="flex items-center gap-3 md:gap-6 bg-white border-b border-gray-100 py-4 md:py-5 px-4 md:px-6 hover:bg-gray-50 transition-colors duration-200"
      >
        <div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-[1rem] flex items-center justify-center p-2 flex-shrink-0 relative overflow-hidden border border-gray-100 bg-white"
        >
          <Image
            src={producto.image}
            alt={producto.name}
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-[10px] font-bold text-accent uppercase tracking-wider mb-1 block">
            {highlight(producto.brand, busqueda)} · {producto.category}
          </p>
          <h3 className="font-display font-black text-sm md:text-base text-navy leading-snug mb-2 truncate">
            {highlight(producto.name, busqueda)}
          </h3>
          <p className="font-display font-black text-sm md:text-base text-navy flex items-baseline gap-1">
            <span className="text-[11px] font-body font-normal text-[#6B7280]">ARS</span>
            ${producto.price.toLocaleString('es-AR')}
          </p>
        </div>
        <div className="flex-shrink-0 text-navy/40 pl-2 md:pl-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

function ProductSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden">
      <div className="aspect-[4/5] w-full bg-gray-100 animate-pulse"></div>
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-1/3 bg-gray-100 animate-pulse rounded-full"></div>
        <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded-full"></div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="h-5 w-1/2 bg-gray-100 animate-pulse rounded-full"></div>
          <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

function CatalogoContenido() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const [listaProductos, setListaProductos] = useState<any[]>(productos)
  const q = searchParams.get('q') || ''
  const filtroActivo = searchParams.get('categoria') || 'Todos'
  const marcaActiva = searchParams.get('marca') || 'Todas'

  const [busquedaLocal, setBusquedaLocal] = useState(q)
  const [vista, setVista] = useState<'grilla' | 'lista'>('grilla')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)
  const [isBrandsOpen, setIsBrandsOpen] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*')
      if (!error && data && data.length > 0) {
        const mapped = data.map((p: any) => ({
          id: p.id,
          brand: p.brand,
          category: p.category,
          name: p.name,
          price: Number(p.price),
          slug: p.id,
          badge: p.is_featured ? 'Destacado' : null,
          bgColor: '#FFFFFF',
          image: p.image_url || '/imagenes/iphone-15-pro-max.png',
        }))
        setListaProductos(mapped)
      }
    }
    await new Promise(r => setTimeout(r, 800))
    setIsLoading(false)
    setRefreshCount(prev => prev + 1)
  }

  // Load from Supabase on mount
  useEffect(() => {
    async function loadProducts() {
      if (supabase) {
        const { data, error } = await supabase.from('products').select('*')
        if (!error && data && data.length > 0) {
          const mapped = data.map((p: any) => ({
            id: p.id,
            brand: p.brand,
            category: p.category,
            name: p.name,
            price: Number(p.price),
            slug: p.id,
            badge: p.is_featured ? 'Destacado' : null,
            bgColor: '#FFFFFF',
            image: p.image_url || '/imagenes/iphone-15-pro-max.png',
          }))
          setListaProductos(mapped)
          setIsLoading(false)
          return
        }
      }
      setListaProductos(productos)
      setIsLoading(false)
    }
    loadProducts()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (busquedaLocal === '') {
        params.delete('q')
      } else {
        params.set('q', busquedaLocal)
      }
      if (searchParams.get('q') !== (busquedaLocal || null)) {
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [busquedaLocal, searchParams, pathname, router])

  const handleCategoriaChange = (valor: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (valor === 'Todos') {
      params.delete('categoria')
    } else {
      params.set('categoria', valor)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleMarcaChange = (valor: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (valor === 'Todas') {
      params.delete('marca')
    } else {
      params.set('marca', valor)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Extract brands dynamically based on loaded products list
  const marcasDisponibles = ['Todas', ...Array.from(new Set(listaProductos.map(p => p.brand)))]

  const productosFiltrados = listaProductos.filter(p => {
    const matchCategoria = filtroActivo === 'Todos' || p.category === filtroActivo
    const matchMarca = marcaActiva === 'Todas' || p.brand === marcaActiva
    const matchBusqueda = q === '' ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.brand.toLowerCase().includes(q.toLowerCase())
    return matchCategoria && matchMarca && matchBusqueda
  })

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-white text-on-surface overflow-x-hidden">

        <Navbar />

        {/* Cinematic Header Section */}
        <header className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
          <div className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] p-6 sm:p-12 md:p-20 text-white min-h-[300px] md:min-h-[350px] flex flex-col justify-center">
            {/* Background image overlay */}
            <Image
              src="/imagenes/catalogo-hero.jpg"
              alt="Colección Curada Banner"
              fill
              priority
              className="object-cover pointer-events-none"
            />
            {/* Dark tint vignette for readability */}
            <div className="absolute inset-0 bg-black/55 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase mb-4 border border-white/10">
                Catálogo Oficial
              </span>
              <h1 className="font-sans text-3xl sm:text-[48px] md:text-[64px] font-bold tracking-tight mb-3 leading-none text-white">
                Colección curada.
              </h1>
              <p className="text-white/80 font-sans max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Tecnología seleccionada para durar. Explorá lo último en innovación original con garantía de fábrica y entrega inmediata.
              </p>
            </div>
          </div>
        </header>

        {/* Sticky Filter & Search Bar */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-6 sticky top-16 z-40 bg-white/90 backdrop-blur-md">
          <div className="glass-card rounded-[2rem] p-3 shadow-xl shadow-black/[0.02] flex flex-col border border-outline-variant/20 bg-white/80">
            {/* Top Row: Search, Categories Carousel & View Toggles */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
              {/* Search */}
              <div className="relative w-full md:w-64 lg:w-80 group flex-shrink-0">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/60 group-focus-within:text-on-surface transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar tecnología..."
                  value={busquedaLocal}
                  onChange={e => setBusquedaLocal(e.target.value)}
                  className="w-full h-[46px] bg-[#F2F2F2] border-none rounded-2xl pl-11 pr-4 font-sans text-sm text-on-surface focus:ring-1 focus:ring-inverse-surface/10 transition-all placeholder:text-secondary/60"
                />
              </div>

              {/* Filter Pills & Brand Button */}
              <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible md:flex-wrap w-full md:w-auto scrollbar-hide py-1 px-1 -mx-1">
                {filtros.map(f => (
                  <button
                    key={f.label}
                    onClick={() => handleCategoriaChange(f.label)}
                    className={`category-btn flex-shrink-0 px-4 py-2 rounded-2xl font-sans text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                      filtroActivo === f.label
                        ? 'bg-inverse-surface text-white border-inverse-surface shadow-md'
                        : 'bg-white text-secondary border-outline-variant/30 hover:text-on-surface hover:border-outline'
                    }`}
                  >
                    <span className="mr-1">{f.emoji}</span>
                    {f.label}
                  </button>
                ))}

                {/* Brands Toggle Button */}
                <button
                  onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                  className={`category-btn flex-shrink-0 px-4 py-2 rounded-2xl font-sans text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border flex items-center gap-1.5 ${
                    isBrandsOpen || marcaActiva !== 'Todas'
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-secondary border-outline-variant/30 hover:text-on-surface hover:border-outline'
                  }`}
                >
                  <span>🏷️</span>
                  <span>Marcas {marcaActiva !== 'Todas' ? `(${marcaActiva})` : ''}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isBrandsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              {/* View Toggles */}
              <div className="hidden md:flex items-center gap-2 border-l border-outline-variant/30 pl-4 pr-2 flex-shrink-0">
                <button
                  onClick={() => setVista('grilla')}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${vista === 'grilla' ? 'bg-inverse-surface text-white' : 'bg-white border border-outline-variant/30 text-secondary hover:text-on-surface'}`}
                  aria-label="Vista grilla"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  onClick={() => setVista('lista')}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${vista === 'lista' ? 'bg-inverse-surface text-white' : 'bg-white border border-outline-variant/30 text-secondary hover:text-on-surface'}`}
                  aria-label="Vista lista"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Sliding Brands Bar */}
            <AnimatePresence>
              {isBrandsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden w-full border-t border-outline-variant/10 mt-3 pt-3"
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-secondary flex-shrink-0">
                      Filtrar por Marca:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 flex-1 -mx-1 px-1">
                      {marcasDisponibles.map(m => (
                        <button
                          key={m}
                          onClick={() => handleMarcaChange(m)}
                          className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl font-sans text-[11px] font-bold uppercase tracking-wider transition-all border ${
                            marcaActiva === m
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-secondary border-outline-variant/30 hover:text-on-surface hover:border-outline'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-sans font-bold text-lg text-on-surface">
              {filtroActivo === 'Todos' ? 'Colección completa' : filtroActivo}
            </h2>
            <span className="font-sans text-xs uppercase tracking-wider text-secondary font-semibold">
              {productosFiltrados.length} Productos
            </span>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={vista === 'grilla' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"}
              >
                {Array.from({ length: productosFiltrados.length || 8 }).map((_, i) => (
                  vista === 'grilla' ? (
                    <ProductSkeleton key={i} />
                  ) : (
                    <div key={i} className="flex gap-6 p-5 border-b border-gray-100 bg-white">
                      <div className="w-20 h-20 bg-gray-100 rounded-[1rem] animate-pulse flex-shrink-0" />
                      <div className="flex-1 py-1">
                        <div className="w-1/4 h-3 bg-gray-100 rounded-full animate-pulse mb-3" />
                        <div className="w-1/2 h-4 bg-gray-100 rounded-full animate-pulse mb-3" />
                        <div className="w-1/5 h-5 bg-gray-100 rounded-full animate-pulse" />
                      </div>
                    </div>
                  )
                ))}
              </motion.div>
            ) : productosFiltrados.length > 0 ? (
              <motion.div
                key={filtroActivo + q + vista}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={vista === 'grilla' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col bg-white rounded-[2rem] border border-gray-200 overflow-hidden"}
              >
                {productosFiltrados.map((producto, i) => (
                  vista === 'grilla' ? (
                    <AnimatedCard key={producto.id} producto={producto} index={i} busqueda={q} />
                  ) : (
                    <AnimatedListCard key={producto.id} producto={producto} busqueda={q} />
                  )
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-[2.5rem] border border-gray-200 p-12 text-center"
              >
                <span className="text-6xl opacity-30 select-none">🔍</span>
                <h3 className="font-sans font-bold text-lg text-on-surface">Sin resultados</h3>
                <p className="font-sans text-secondary text-sm max-w-[320px] leading-relaxed">
                  No encontramos productos que coincidan con &ldquo;{q}&rdquo;. Intentá buscar con otros términos.
                </p>
                <button
                  onClick={() => {
                    setBusquedaLocal('')
                    const params = new URLSearchParams()
                    router.push(`${pathname}?${params.toString()}`, { scroll: false })
                  }}
                  className="mt-4 bg-inverse-surface text-white rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md cursor-pointer"
                >
                  Ver Todos los Productos
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <Footer />
      </div>
    </PullToRefresh>
  )
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary animate-ping" />
      </div>
    }>
      <CatalogoContenido />
    </Suspense>
  )
}
