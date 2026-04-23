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
  Celulares:   'linear-gradient(135deg, #EEF1FD 0%, #DDE3FA 100%)',
  Notebooks:   'linear-gradient(135deg, #EDF7F2 0%, #D1F0E0 100%)',
  Audio:       'linear-gradient(135deg, #FDF5EE 0%, #FAE5D0 100%)',
  Auriculares: 'linear-gradient(135deg, #FDF5EE 0%, #FAE5D0 100%)',
  Accesorios:  'linear-gradient(135deg, #F5EEFB 0%, #EDE0F8 100%)',
}

const WA_SVG = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

/* ── Skeleton ── */
function Skeleton() {
  return (
    <div className="min-h-screen bg-blue-base overflow-x-hidden pb-[72px] md:pb-0">
      <Navbar />
      <div className="px-6 py-4 md:px-16 md:py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <div className="h-3 w-12 bg-blue-subtle rounded-full animate-pulse" />
          <div className="h-3 w-2 bg-blue-subtle rounded-full animate-pulse" />
          <div className="h-3 w-16 bg-blue-subtle rounded-full animate-pulse" />
          <div className="h-3 w-2 bg-blue-subtle rounded-full animate-pulse" />
          <div className="h-3 w-32 bg-blue-subtle rounded-full animate-pulse" />
        </div>
      </div>
      <section className="px-6 pb-12 md:px-16 md:pt-4 md:pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          <div className="aspect-square bg-blue-subtle rounded-[20px] animate-pulse" />
          <div className="flex flex-col gap-4 pt-2">
            <div className="h-3 w-28 bg-blue-subtle rounded-full animate-pulse" />
            <div className="h-8 w-3/4 bg-blue-subtle rounded-xl animate-pulse" />
            <div className="h-8 w-1/2 bg-blue-subtle rounded-xl animate-pulse" />
            <div className="h-14 w-40 bg-blue-subtle rounded-xl animate-pulse mt-2" />
            <div className="h-px bg-blue-subtle mt-2" />
            <div className="space-y-2 mt-2">
              {[1,2,3].map(i => <div key={i} className="h-4 bg-blue-subtle rounded-full animate-pulse" style={{ width: `${85 - i*10}%` }} />)}
            </div>
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {[1,2,3,4].map(i => <div key={i} className="h-16 bg-blue-subtle rounded-[12px] animate-pulse" />)}
            </div>
            <div className="h-14 bg-blue-subtle rounded-[14px] animate-pulse mt-4" />
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
          className="relative w-full max-w-2xl aspect-square bg-white rounded-[24px] overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <Image src={src} alt={alt} fill className="object-contain p-8" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
            aria-label="Cerrar zoom"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/20 text-white text-[11px] font-body rounded-full px-3 py-1">
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
      <div className="min-h-screen bg-blue-base overflow-x-hidden">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 gap-6">
          <span className="text-6xl">📦</span>
          <h1 className="font-display font-extrabold text-3xl text-navy">Producto no encontrado</h1>
          <button
            onClick={() => router.push('/catalogo')}
            className="border border-blue-border text-navy font-display font-semibold text-sm rounded-full px-6 py-3 hover:border-accent hover:text-accent transition-colors"
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
  const whatsappLink = `https://wa.me/5492231234567?text=${message}`
  const currentImageSrc = product.images?.[selectedImage] || product.imageUrl
  const categoryBg = categoryGradients[product.category] ?? '#F0F4FF'

  return (
    <div className="min-h-screen bg-blue-base overflow-x-hidden pb-[132px] md:pb-0">
      <Navbar />

      {/* Zoom modal */}
      {zoomed && !imgError && (
        <ZoomModal src={currentImageSrc} alt={product.name} onClose={() => setZoomed(false)} />
      )}

      {/* Breadcrumb */}
      <div className="bg-blue-base px-6 py-4 md:px-16 md:py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-2 font-body text-[13px]">
          <Link href="/" className="text-accent hover:underline">Inicio</Link>
          <span className="text-[#9CA3AF]">/</span>
          <Link href="/catalogo" className="text-accent hover:underline">Catálogo</Link>
          <span className="text-[#9CA3AF]">/</span>
          <span className="text-navy font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <section className="px-0 md:px-16 pb-12 md:pt-4 md:pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-14 items-start">

          {/* ── Galería ── */}
          <div>
            {/* Imagen principal — full-width en mobile */}
            <motion.div
              ref={imgContainerRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full overflow-hidden md:rounded-[24px] group cursor-zoom-in"
              style={{ background: categoryBg, aspectRatio: '1/1' }}
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
                    className="absolute inset-0"
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
                  className="absolute pointer-events-none rounded-full border-2 border-accent shadow-[0_8px_32px_rgba(0,0,0,0.25)] z-20 bg-white"
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

              {/* Zoom hint (Mobile only now since desktop has the crosshair and magnifier) */}
              {!imgError && !isDesktop && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/25 text-white text-[11px] font-body rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Zoom
                </div>
              )}

              {/* Stock badge overlay */}
              {product.inStock && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#059669] text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                    En Stock
                  </span>
                </div>
              )}

              {/* Out of stock overlay */}
              {!product.inStock && !imgError && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center pointer-events-none">
                  <span className="bg-red-500 text-white font-display font-bold text-sm md:text-base px-6 py-2.5 rounded-full shadow-lg">
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
                    className={`h-1.5 rounded-full ${i === selectedImage ? 'w-4 bg-accent' : 'w-1.5 bg-blue-subtle'}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                ))}
              </div>
            )}

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2.5 mt-3 px-6 md:px-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImage(idx); setImgError(false) }}
                    className="relative w-[70px] h-[70px] rounded-[14px] overflow-hidden transition-all duration-200 flex-shrink-0"
                    style={{
                      background: categoryBg,
                      border: `2px solid ${selectedImage === idx ? '#5A72ED' : '#E0E8FF'}`,
                      boxShadow: selectedImage === idx ? '0 0 0 2px rgba(90,114,237,0.2)' : 'none',
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

          {/* ── Info ── */}
          <div className="px-6 md:px-0 pt-6 md:pt-0">
            <p className="font-body text-[11px] font-bold text-accent uppercase tracking-wider mb-2">
              {product.brand} · {product.category}
            </p>

            <h1 className="font-display font-black text-[28px] md:text-[36px] text-navy leading-tight mb-5">
              {product.name}
            </h1>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'backOut' }}
              className="mb-5"
            >
              {product.hasDiscount && product.discountPrice ? (
                <div className="flex items-baseline gap-3">
                  <span className="font-body text-base text-[#9CA3AF] line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-display font-black text-[42px] text-navy leading-none">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="bg-[#FDF3E3] text-[#92400E] text-xs font-bold px-2.5 py-1 rounded-full self-center">
                    Oferta
                  </span>
                </div>
              ) : (
                <span className="font-display font-black text-[42px] text-navy leading-none">
                  {formatPrice(product.price)}
                </span>
              )}
            </motion.div>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {trustItems.map(item => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 bg-blue-base border border-blue-subtle text-navy text-[12px] font-body font-medium px-3 py-1.5 rounded-full"
                >
                  <span className="text-accent font-bold">{item.icon}</span>
                  {item.label}
                </span>
              ))}
              {product.hasDiscount && (
                <span className="inline-flex items-center gap-1.5 bg-[#FDF3E3] border border-[#FDF3E3] text-[#92400E] text-[12px] font-body font-medium px-3 py-1.5 rounded-full">
                  🔥 Oferta limitada
                </span>
              )}
            </motion.div>

            <hr className="border-t border-blue-subtle mb-6" />

            <p className="font-body text-[15px] text-[#4A5568] leading-relaxed mb-8">
              {product.detailedDescription}
            </p>

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-8">
                <h3 className="font-display font-bold text-base text-navy mb-4">Especificaciones</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                      className="bg-blue-base border border-blue-subtle rounded-[12px] p-3.5"
                    >
                      <span className="block font-body text-[10px] text-[#9CA3AF] uppercase tracking-wider">{key}</span>
                      <span className="block font-body font-semibold text-sm text-navy mt-1">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp CTA — desktop */}
            <div className="hidden md:block">
              {product.inStock ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 text-white font-display font-bold text-base rounded-[14px] py-4 transition-all duration-300 whatsapp-pulse hover:brightness-110"
                  style={{ background: '#25D366' }}
                >
                  {WA_SVG}
                  Consultar por WhatsApp
                </a>
              ) : (
                <div
                  className="w-full flex items-center justify-center gap-2.5 text-white font-display font-bold text-base rounded-[14px] py-4"
                  style={{ background: '#9CA3AF' }}
                >
                  Sin stock por el momento
                </div>
              )}
              <p className="font-body text-[12px] text-[#9CA3AF] text-center mt-2.5">
                Atención personalizada · Menos de 3 horas de respuesta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related products — usa ProductCard */}
      <section className="bg-white px-6 py-10 md:px-16 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-xl text-navy">También te puede interesar</h2>
            <Link href="/catalogo" className="font-body text-sm text-accent hover:text-accent-mid transition-colors flex items-center gap-1">
              Ver todo →
            </Link>
          </div>
          <div className="flex lg:grid lg:grid-cols-4 gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
            {relatedProducts.map((p, i) => (
              <div key={p.id} className="snap-start flex-shrink-0 w-[70vw] sm:w-[45vw] lg:w-auto">
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

      {/* Mobile sticky bar — siempre visible */}
      <div className="md:hidden fixed bottom-[60px] inset-x-0 z-40 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-blue-subtle shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3">
          {/* Price resumido */}
          <div className="flex-1 min-w-0">
            {product.hasDiscount && product.discountPrice ? (
              <>
                <p className="font-body text-[10px] text-[#9CA3AF] line-through leading-none">
                  {formatPrice(product.price)}
                </p>
                <p className="font-display font-black text-lg text-navy leading-tight">
                  {formatPrice(product.discountPrice)}
                </p>
              </>
            ) : (
              <p className="font-display font-black text-lg text-navy leading-tight">
                {formatPrice(product.price)}
              </p>
            )}
          </div>
          {/* WhatsApp button */}
          {product.inStock ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 text-white font-display font-bold text-[14px] rounded-xl px-5 py-3.5 whatsapp-pulse"
              style={{ background: '#25D366' }}
            >
              {WA_SVG}
              Consultar
            </a>
          ) : (
            <div
              className="flex-shrink-0 flex items-center justify-center gap-2 text-white font-display font-bold text-[13px] rounded-xl px-4 py-3.5"
              style={{ background: '#9CA3AF' }}
            >
              Sin stock por el momento
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
