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
import { products as staticProducts } from '@/data/products'

const productos = staticProducts.map(p => ({
  id: p.id,
  brand: p.brand,
  category: p.category,
  name: p.name,
  price: p.price,
  slug: p.id,
  badge: p.isFeatured ? 'Destacado' : null,
  bgColor: '#F2F2F2',
  image: p.imageUrl,
  description: p.description,
  inStock: p.inStock,
  discountPrice: p.discountPrice,
}))

const categorias = ['Todos', 'Celulares', 'Notebooks', 'Auriculares', 'Accesorios']

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.trim()})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-primary/20 text-on-surface rounded-sm px-0.5 font-bold">
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
        className="group bg-white rounded-[20px] border border-black/[0.06] overflow-hidden cursor-pointer hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300 flex flex-col h-full text-on-surface"
      >
        <div className="relative aspect-[4/5] overflow-hidden flex items-center justify-center border-b border-gray-100 bg-white">
          {producto.badge && (
            <span className="absolute top-3 left-3 z-10 bg-gray-900 text-white text-[10px] font-bold font-sans rounded-full px-2.5 py-1 shadow-sm">
              {producto.badge}
            </span>
          )}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={producto.image}
              alt={producto.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-x-3 bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div className="bg-gray-900 text-white text-[11px] font-bold font-sans rounded-full px-3 py-1.5 text-center shadow">
              Ver detalle
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow bg-white">
          <p className="font-sans text-[10px] font-bold text-primary/70 uppercase tracking-wider mb-1">
            {highlight(producto.brand, busqueda)} · {producto.category}
          </p>
          <h3 className="font-display font-black text-[13px] md:text-sm text-on-surface leading-snug line-clamp-2 min-h-[40px] mb-auto">
            {highlight(producto.name, busqueda)}
          </h3>
          <div className="mt-3 pt-3 border-t border-black/[0.05] flex items-end justify-between gap-2">
            <div>
              {producto.discountPrice ? (
                <>
                  <span className="font-sans text-[11px] text-gray-400 line-through block">
                    ${producto.price.toLocaleString('es-AR')}
                  </span>
                  <p className="font-display font-black text-base text-on-surface flex items-baseline gap-1">
                    <span className="text-[11px] font-sans font-normal text-secondary">ARS</span>
                    ${producto.discountPrice.toLocaleString('es-AR')}
                  </p>
                </>
              ) : (
                <p className="font-display font-black text-base text-on-surface flex items-baseline gap-1">
                  <span className="text-[11px] font-sans font-normal text-secondary">ARS</span>
                  ${producto.price.toLocaleString('es-AR')}
                </p>
              )}
            </div>
            <div className={`flex items-center gap-1 flex-shrink-0 ${producto.inStock !== false ? 'text-emerald-600' : 'text-gray-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${producto.inStock !== false ? 'bg-emerald-500' : 'bg-gray-300'}`} />
              <span className="font-sans text-[10px] font-semibold whitespace-nowrap">
                {producto.inStock !== false ? 'En stock' : 'Sin stock'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function AnimatedListCard({ producto, busqueda }: { producto: any; busqueda: string }) {
  const description = (producto.description as string | undefined) ?? ''

  return (
    <motion.div
      whileHover={{ backgroundColor: '#FAFAFA' }}
      transition={{ duration: 0.15 }}
      className="border-b border-gray-100 last:border-b-0"
    >
      <Link
        href={`/catalogo/${producto.slug}`}
        className="flex items-start gap-4 md:gap-5 py-5 px-4 md:px-6 transition-colors duration-150"
      >
        {/* Image */}
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl border border-gray-100 bg-white flex-shrink-0 overflow-hidden">
          <Image
            src={producto.image}
            alt={producto.name}
            fill
            className="object-contain p-2"
          />
          {producto.badge && (
            <span className="absolute top-1.5 left-1.5 bg-gray-900 text-white text-[9px] font-bold font-sans rounded-full px-1.5 py-0.5 leading-none">
              {producto.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-2.5">
          <div>
            <p className="font-sans text-[10px] font-bold text-primary/70 uppercase tracking-wider mb-1">
              {highlight(producto.brand, busqueda)} · {producto.category}
            </p>
            <h3 className="font-display font-black text-sm md:text-base text-on-surface leading-snug mb-1.5">
              {highlight(producto.name, busqueda)}
            </h3>
            {description && (
              <p className="font-sans text-[13px] text-gray-500 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Price + CTAs row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              {producto.discountPrice ? (
                <div className="flex items-baseline gap-2">
                  <p className="font-display font-black text-base md:text-lg text-on-surface flex items-baseline gap-1">
                    <span className="text-[11px] font-sans font-normal text-secondary">ARS</span>
                    ${producto.discountPrice.toLocaleString('es-AR')}
                  </p>
                  <span className="font-sans text-xs text-gray-400 line-through">
                    ${producto.price.toLocaleString('es-AR')}
                  </span>
                </div>
              ) : (
                <p className="font-display font-black text-base md:text-lg text-on-surface flex items-baseline gap-1">
                  <span className="text-[11px] font-sans font-normal text-secondary">ARS</span>
                  ${producto.price.toLocaleString('es-AR')}
                </p>
              )}
              <div className={`flex items-center gap-1 mt-0.5 ${producto.inStock !== false ? 'text-emerald-600' : 'text-gray-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${producto.inStock !== false ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                <span className="font-sans text-[11px] font-semibold">
                  {producto.inStock !== false ? 'En stock' : 'Sin stock'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="bg-gray-900 text-white rounded-xl px-4 py-2 text-[11px] font-bold font-sans whitespace-nowrap hover:bg-gray-700 transition-colors">
                Ver detalle
              </span>
              <span className="border border-gray-200 text-gray-600 rounded-xl px-4 py-2 text-[11px] font-bold font-sans whitespace-nowrap hover:border-gray-400 hover:text-gray-800 transition-colors hidden sm:inline-flex">
                Consultar
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function ProductSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden">
      <div className="aspect-[4/5] w-full bg-gray-100 animate-pulse" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-1/3 bg-gray-100 animate-pulse rounded-full" />
        <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded-full" />
        <div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded-full" />
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
          <div className="h-5 w-2/5 bg-gray-100 animate-pulse rounded-full" />
          <div className="h-3 w-1/4 bg-gray-100 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  )
}

function ListSkeleton() {
  return (
    <div className="flex items-start gap-4 md:gap-5 py-5 px-4 md:px-6 border-b border-gray-100">
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-3">
        <div className="h-3 w-1/5 bg-gray-100 animate-pulse rounded-full" />
        <div className="h-5 w-1/2 bg-gray-100 animate-pulse rounded-full" />
        <div className="h-3 w-3/4 bg-gray-100 animate-pulse rounded-full" />
        <div className="h-3 w-2/3 bg-gray-100 animate-pulse rounded-full" />
        <div className="flex items-center justify-between mt-1">
          <div className="h-6 w-28 bg-gray-100 animate-pulse rounded-full" />
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-xl" />
            <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-xl hidden sm:block" />
          </div>
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
  const ordenarParam = searchParams.get('ordenar') || 'relevancia'

  const [busquedaLocal, setBusquedaLocal] = useState(q)
  const [vista, setVista] = useState<'grilla' | 'lista'>('grilla')
  const [isLoading, setIsLoading] = useState(true)

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
          image: p.image_url || '/imagenes/iphone-15-pro-max.jpg',
          description: p.description ?? '',
          inStock: p.in_stock ?? true,
          discountPrice: p.discount_price ? Number(p.discount_price) : undefined,
        }))
        setListaProductos(mapped)
      }
    }
    await new Promise(r => setTimeout(r, 800))
    setIsLoading(false)
  }

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
            image: p.image_url || '/imagenes/iphone-15-pro-max.jpg',
            description: p.description ?? '',
            inStock: p.in_stock ?? true,
            discountPrice: p.discount_price ? Number(p.discount_price) : undefined,
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

  const handleOrdenarChange = (valor: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (valor === 'relevancia') {
      params.delete('ordenar')
    } else {
      params.set('ordenar', valor)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const marcasDisponibles = ['Todas', ...Array.from(new Set(listaProductos.map(p => p.brand)))]

  const productosFiltrados = listaProductos
    .filter(p => {
      const matchCategoria = filtroActivo === 'Todos' || p.category === filtroActivo
      const matchMarca = marcaActiva === 'Todas' || p.brand === marcaActiva
      const matchBusqueda =
        q === '' ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.brand.toLowerCase().includes(q.toLowerCase())
      return matchCategoria && matchMarca && matchBusqueda
    })
    .sort((a, b) => {
      if (ordenarParam === 'precio-asc') return a.price - b.price
      if (ordenarParam === 'precio-desc') return b.price - a.price
      if (ordenarParam === 'nombre') return a.name.localeCompare(b.name, 'es')
      return 0
    })

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-white text-on-surface overflow-x-hidden">

        <Navbar />

        {/* Cinematic Header */}
        <header className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
          <div className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] p-6 sm:p-12 md:p-20 text-white min-h-[300px] md:min-h-[350px] flex flex-col justify-center">
            <Image
              src="/imagenes/catalogo-hero.jpg"
              alt="Catálogo Banner"
              fill
              priority
              className="object-cover pointer-events-none"
            />
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

        {/* Sticky Filter Bar */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-4 sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">

          {/* Row 1: Search + View Toggles */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative flex-1 group">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors pointer-events-none"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Buscar producto, marca..."
                value={busquedaLocal}
                onChange={e => setBusquedaLocal(e.target.value)}
                className="w-full h-11 bg-gray-100 border border-transparent rounded-xl pl-10 pr-4 font-sans text-sm text-on-surface focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-gray-900/[0.06] transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => setVista('grilla')}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  vista === 'grilla'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                }`}
                aria-label="Vista grilla"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setVista('lista')}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  vista === 'lista'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                }`}
                aria-label="Vista lista"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Row 2: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 mb-3 -mx-1 px-1">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoriaChange(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl font-sans text-[12px] font-semibold transition-all duration-200 whitespace-nowrap ${
                  filtroActivo === cat
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Row 3: Secondary Filters + Count */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={marcaActiva}
              onChange={e => handleMarcaChange(e.target.value)}
              className="h-9 bg-white border border-gray-200 rounded-xl px-3 pr-7 font-sans text-[12px] text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-900/[0.06] hover:border-gray-300 transition-colors appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 10px center' }}
            >
              {marcasDisponibles.map(m => (
                <option key={m} value={m}>{m === 'Todas' ? 'Todas las marcas' : m}</option>
              ))}
            </select>
            <select
              value={ordenarParam}
              onChange={e => handleOrdenarChange(e.target.value)}
              className="h-9 bg-white border border-gray-200 rounded-xl px-3 pr-7 font-sans text-[12px] text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-900/[0.06] hover:border-gray-300 transition-colors appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 10px center' }}
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A–Z</option>
            </select>
            <span className="ml-auto font-sans text-[12px] text-gray-400 font-medium">
              {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>
        </section>

        {/* Results Header */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-6 pb-3">
          <h2 className="font-sans font-bold text-base text-gray-800">
            {filtroActivo === 'Todos' ? 'Colección completa' : filtroActivo}
          </h2>
        </section>

        {/* Products */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  vista === 'grilla'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                    : 'flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden'
                }
              >
                {Array.from({ length: 8 }).map((_, i) =>
                  vista === 'grilla' ? <ProductSkeleton key={i} /> : <ListSkeleton key={i} />
                )}
              </motion.div>
            ) : productosFiltrados.length > 0 ? (
              <motion.div
                key={filtroActivo + q + vista + ordenarParam + marcaActiva}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  vista === 'grilla'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                    : 'flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden'
                }
              >
                {productosFiltrados.map((producto, i) =>
                  vista === 'grilla' ? (
                    <AnimatedCard key={producto.id} producto={producto} index={i} busqueda={q} />
                  ) : (
                    <AnimatedListCard key={producto.id} producto={producto} busqueda={q} />
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-2xl border border-gray-200 p-12 text-center"
              >
                <svg
                  width="48" height="48" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3 className="font-sans font-bold text-base text-gray-800">Sin resultados</h3>
                <p className="font-sans text-gray-500 text-sm max-w-[320px] leading-relaxed">
                  {q
                    ? `No encontramos productos para "${q}". Probá con otros términos o ajustá los filtros.`
                    : 'No hay productos disponibles con los filtros seleccionados.'}
                </p>
                <button
                  onClick={() => {
                    setBusquedaLocal('')
                    router.push(pathname, { scroll: false })
                  }}
                  className="mt-4 bg-gray-900 text-white rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-700 transition-colors shadow-sm cursor-pointer"
                >
                  Ver todos los productos
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      </div>
    }>
      <CatalogoContenido />
    </Suspense>
  )
}
