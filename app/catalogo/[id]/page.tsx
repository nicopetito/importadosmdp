'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { products as mockProducts, Product } from '../../../data/products'
import { supabase } from '../../../utils/supabase/client'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import ProductCard from '@/app/components/ProductCard'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price)

const getEmojiFallback = (cat: string) => {
  if (cat === 'Celulares') return '📱'
  if (cat === 'Notebooks') return '💻'
  if (cat === 'Audio' || cat === 'Auriculares') return '🎧'
  return '⌚'
}

const categoryGradients: Record<string, string> = {
  Celulares:   '#F2F2F2',
  Notebooks:   '#F2F2F2',
  Audio:       '#F2F2F2',
  Auriculares: '#F2F2F2',
  Accesorios:  '#F2F2F2',
}

const WA_SVG = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

/* ── Skeleton ── */
function Skeleton() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-[72px] md:pb-0">
      <Navbar />
      <div className="px-6 py-5 md:px-16">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <div className="h-3 w-12 bg-surface-container-low rounded-full animate-pulse" />
          <div className="h-3 w-2 bg-surface-container-low rounded-full animate-pulse" />
          <div className="h-3 w-16 bg-surface-container-low rounded-full animate-pulse" />
          <div className="h-3 w-2 bg-surface-container-low rounded-full animate-pulse" />
          <div className="h-3 w-32 bg-surface-container-low rounded-full animate-pulse" />
        </div>
      </div>
      <section className="px-6 pb-12 md:px-16 md:pt-4 md:pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          <div className="aspect-square bg-surface-container-low rounded-[2rem] animate-pulse" />
          <div className="flex flex-col gap-4 pt-2">
            <div className="h-3 w-28 bg-surface-container-low rounded-full animate-pulse" />
            <div className="h-8 w-3/4 bg-surface-container-low rounded-xl animate-pulse" />
            <div className="h-8 w-1/2 bg-surface-container-low rounded-xl animate-pulse" />
            <div className="h-14 w-40 bg-surface-container-low rounded-xl animate-pulse mt-2" />
            <div className="h-px bg-outline-variant/20 mt-2" />
            <div className="space-y-2 mt-2">
              {[1,2,3].map(i => <div key={i} className="h-4 bg-surface-container-low rounded-full animate-pulse" style={{ width: `${85 - i*10}%` }} />)}
            </div>
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {[1,2,3,4].map(i => <div key={i} className="h-16 bg-surface-container-low rounded-[12px] animate-pulse" />)}
            </div>
            <div className="h-14 bg-surface-container-low rounded-[14px] animate-pulse mt-4" />
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── Zoom Modal ── */
function ZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl aspect-square bg-white rounded-[2rem] overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <Image src={src} alt={alt} fill className="object-contain p-8" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Cerrar zoom"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/20 text-white text-[11px] font-sans rounded-full px-3 py-1">
            Click para cerrar · Esc
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Trust chips ── */
const trustItems = [
  { icon: '✓', label: 'Original sellado' },
  { icon: '✓', label: 'Garantía real' },
  { icon: '⚡', label: 'Entrega en el día' },
]

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [imgError, setImgError] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(false)
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !imgContainerRef.current) return
    const rect = imgContainerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe()
  }

  const handleSwipe = () => {
    if (!product?.images || product.images.length <= 1) return
    const diff = touchStartX.current - touchEndX.current
    const length = product.images.length

    if (diff > 50) {
      setSelectedImage((prev) => (prev === length - 1 ? 0 : prev + 1))
    } else if (diff < -50) {
      setSelectedImage((prev) => (prev === 0 ? length - 1 : prev - 1))
    }
  }

  useEffect(() => {
    async function fetchProduct() {
      if (supabase) {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
        if (!error && data) { setProduct(data as Product); setLoading(false); return }
      }
      const found = mockProducts.find(p => p.id === id)
      setProduct(found || null)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  useEffect(() => { setSelectedImage(0); setImgError(false) }, [product])

  if (loading) return <Skeleton />

  if (!product) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 gap-6">
          <span className="text-6xl">📦</span>
          <h1 className="font-sans font-bold text-2xl text-on-surface">Producto no encontrado</h1>
          <button
            onClick={() => router.push('/catalogo')}
            className="border border-outline-variant/50 text-on-surface font-sans font-bold text-xs uppercase tracking-widest rounded-full px-8 py-3.5 hover:border-on-surface transition-all cursor-pointer"
          >
            ← Volver al catálogo
          </button>
        </div>
      </div>
    )
  }

  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const relatedProducts = related.length >= 2 ? related : mockProducts.filter(p => p.id !== product.id).slice(0, 4)

  const message = encodeURIComponent(`Hola ImportadosMDP! Estoy interesado en: ${product.name}. ¿Me podrían dar más información?`)
  const whatsappLink = `https://wa.me/5492235000000?text=${message}`
  const currentImageSrc = product.images?.[selectedImage] || product.imageUrl
  const categoryBg = categoryGradients[product.category] ?? '#F2F2F2'

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-[132px] md:pb-0">
      <Navbar />

      {/* Zoom modal */}
      {zoomed && !imgError && (
        <ZoomModal src={currentImageSrc} alt={product.name} onClose={() => setZoomed(false)} />
      )}

      {/* Breadcrumb */}
      <div className="bg-background px-6 py-5 md:px-12">
        <div className="max-w-6xl mx-auto flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-secondary">
          <Link href="/" className="hover:text-on-surface transition-colors">Inicio</Link>
          <span className="text-outline-variant/50">/</span>
          <Link href="/catalogo" className="hover:text-on-surface transition-colors">Catálogo</Link>
          <span className="text-outline-variant/50">/</span>
          <span className="text-on-surface font-bold truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-6 pb-12 md:px-12 md:pt-4 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Gallery ── */}
          <div className="flex flex-col gap-6">
            <motion.div
              ref={imgContainerRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-square bg-white rounded-[2.5rem] overflow-hidden cinematic-shadow group cursor-zoom-in border border-outline-variant/10 flex items-center justify-center p-8"
              onClick={() => {
                if (!imgError && !isDesktop) setZoomed(true)
              }}
              onMouseEnter={() => {
                if (isDesktop && !imgError) setIsHovering(true)
              }}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                {!imgError ? (
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center p-8"
                  >
                    <Image
                      src={currentImageSrc}
                      alt={product.name}
                      fill
                      className={`object-contain p-8 md:p-10 transition-transform duration-700 ${!isDesktop ? 'group-hover:scale-105' : ''}`}
                      priority
                      onError={() => setImgError(true)}
                    />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-25">
                    {getEmojiFallback(product.category)}
                  </div>
                )}
              </AnimatePresence>

              {/* Desktop Magnifying Glass */}
              {isDesktop && isHovering && !imgError && (
                <div
                  className="absolute pointer-events-none rounded-full border-2 border-primary shadow-[0_8px_32px_rgba(0,0,0,0.15)] z-20 bg-white"
                  style={{
                    width: 180,
                    height: 180,
                    left: mousePos.x - 90,
                    top: mousePos.y - 90,
                    backgroundImage: `url(${currentImageSrc})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '250%',
                    backgroundPosition: `${(mousePos.x / (imgContainerRef.current?.offsetWidth || 1)) * 100}% ${(mousePos.y / (imgContainerRef.current?.offsetHeight || 1)) * 100}%`
                  }}
                />
              )}

              {/* Stock badge overlay */}
              {product.inStock && (
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#006a2d] text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-sm border border-[#006a2d]/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3de273] animate-pulse" />
                    En Stock
                  </span>
                </div>
              )}

              {/* Out of stock overlay */}
              {!product.inStock && !imgError && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center pointer-events-none">
                  <span className="bg-red-500 text-white font-sans font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg">
                    Sin stock
                  </span>
                </div>
              )}
            </motion.div>

            {/* Dots indicators (Mobile only) */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-3 md:hidden">
                {product.images.map((_, i) => (
                  <motion.div
                    key={i}
                    layout
                    className={`h-1.5 rounded-full ${i === selectedImage ? 'w-4 bg-primary' : 'w-1.5 bg-outline-variant/30'}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                ))}
              </div>
            )}

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 px-6 md:px-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImage(idx); setImgError(false) }}
                    className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden transition-all duration-200 flex-shrink-0 bg-white p-2 border cursor-pointer"
                    style={{
                      borderColor: selectedImage === idx ? '#1b1b1d' : 'rgba(193, 198, 214, 0.3)',
                      borderWidth: selectedImage === idx ? '2px' : '1px',
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} vista ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-secondary font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
                {product.brand} · {product.category}
              </span>
              <h1 className="font-sans font-bold text-[32px] md:text-[42px] text-on-surface leading-tight tracking-tight mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-500">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <span className="text-secondary font-sans text-xs font-semibold uppercase tracking-wider">(48 Reseñas)</span>
              </div>
            </div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {product.hasDiscount && product.discountPrice ? (
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-lg text-secondary line-through opacity-70">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-sans font-bold text-[36px] md:text-[44px] text-on-surface tracking-tighter leading-none">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="bg-primary/10 text-primary text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Oferta
                  </span>
                </div>
              ) : (
                <span className="font-sans font-bold text-[36px] md:text-[44px] text-on-surface tracking-tighter leading-none">
                  {formatPrice(product.price)}
                </span>
              )}
            </motion.div>

            {/* Description */}
            <p className="font-sans text-secondary text-sm md:text-base leading-relaxed">
              {product.detailedDescription}
            </p>

            {/* Spec panels */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-on-surface">Especificaciones</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <div
                      key={key}
                      className="bg-white/60 border border-outline-variant/20 rounded-2xl p-4 hover:bg-white transition-colors shadow-sm"
                    >
                      <span className="block font-sans text-[9px] text-secondary font-bold uppercase tracking-wider">{key}</span>
                      <span className="block font-sans font-bold text-sm text-on-surface mt-1">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="pt-4 border-t border-outline-variant/10">
              {product.inStock ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1c1c1e] text-white flex items-center justify-center gap-3 py-4 rounded-2xl font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#2c2c2e] active:scale-[0.98] transition-all shadow-xl group border border-white/10"
                >
                  {WA_SVG}
                  <span>Consultar por WhatsApp</span>
                </a>
              ) : (
                <div className="w-full bg-outline-variant/30 text-secondary flex items-center justify-center py-4 rounded-2xl font-sans font-bold text-xs uppercase tracking-widest">
                  Sin Stock Temporalmente
                </div>
              )}
              
              <p className="font-sans text-[10px] text-secondary tracking-wider text-center mt-3 uppercase font-semibold">
                Atención personalizada · Respuesta inmediata
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/10 text-center">
              {trustItems.map(item => (
                <div key={item.label} className="flex flex-col items-center gap-1.5">
                  <span className="text-primary text-base">✓</span>
                  <span className="font-sans text-[9px] text-secondary uppercase tracking-wider font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-white px-6 py-20 md:px-12 border-t border-outline-variant/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-sans font-bold text-xl text-on-surface">Productos Relacionados</h2>
            <Link href="/catalogo" className="font-sans text-xs font-bold uppercase tracking-wider text-primary hover:opacity-85 transition-opacity flex items-center gap-1">
              Ver todo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          
          <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
            {relatedProducts.map((p, i) => (
              <div key={p.id} className="snap-start flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto">
                <ProductCard
                  id={p.id}
                  name={p.name}
                  brand={p.brand}
                  category={p.category}
                  price={p.price}
                  discountPrice={p.discountPrice}
                  imageUrl={p.imageUrl}
                  badge={p.isFeatured ? 'Destacado' : null}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Sticky CTA Bar */}
      <div className="md:hidden fixed bottom-[60px] inset-x-0 z-40 px-6 py-4 bg-white/95 backdrop-blur-md border-t border-outline-variant/20 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-6 justify-between">
          <div className="flex flex-col">
            {product.hasDiscount && product.discountPrice ? (
              <>
                <span className="font-sans text-xs text-secondary line-through opacity-70">
                  {formatPrice(product.price)}
                </span>
                <span className="font-sans font-bold text-lg text-on-surface">
                  {formatPrice(product.discountPrice)}
                </span>
              </>
            ) : (
              <span className="font-sans font-bold text-lg text-on-surface">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {product.inStock ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#1c1c1e] text-white flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-widest shadow-md"
            >
              {WA_SVG}
              <span>Consultar</span>
            </a>
          ) : (
            <div className="flex-shrink-0 bg-outline-variant/30 text-secondary px-5 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-widest">
              Sin Stock
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
