'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { products as mockProducts, Product } from '../../../data/products'
import { supabase } from '../../../utils/supabase/client'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price)

const getEmojiFallback = (cat: string) => {
  if (cat === 'Celulares') return '📱'
  if (cat === 'Notebooks') return '💻'
  if (cat === 'Audio' || cat === 'Auriculares') return '🎧'
  return '⌚'
}

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [imgError, setImgError] = useState(false)

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

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-base flex items-center justify-center">
        <p className="font-display font-bold text-xl text-navy animate-pulse">Cargando producto...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-blue-base overflow-x-hidden">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6">
          <h1 className="font-display font-extrabold text-3xl text-navy mb-6">Producto no encontrado</h1>
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

  return (
    <div className="min-h-screen bg-blue-base overflow-x-hidden pb-[72px] md:pb-0">
      <Navbar />

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
      <section className="px-6 pb-12 md:px-16 md:pt-4 md:pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">

          {/* Image gallery */}
          <div>
            <div className="relative w-full bg-white border border-blue-subtle rounded-[20px] overflow-hidden group" style={{ aspectRatio: '1/1' }}>
              {!imgError ? (
                <Image
                  src={currentImageSrc}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30">
                  {getEmojiFallback(product.category)}
                </div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImage(idx); setImgError(false) }}
                    className="relative w-[72px] h-[72px] rounded-[12px] overflow-hidden bg-white transition-all duration-150"
                    style={{ border: `2px solid ${selectedImage === idx ? '#5A72ED' : '#E0E8FF'}` }}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <p className="font-body text-[11px] font-bold text-accent uppercase tracking-wider mb-2">
              {product.brand} · {product.category}
            </p>

            <h1 className="font-display font-black text-[28px] md:text-[34px] text-navy leading-tight mb-4">
              {product.name}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {product.inStock && (
                <span className="inline-flex items-center gap-1.5 bg-[#EDF7F2] text-[#059669] text-[11px] font-semibold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  En Stock
                </span>
              )}
              {product.hasDiscount && (
                <span className="bg-[#FDF3E3] text-[#92400E] text-[11px] font-semibold px-3 py-1 rounded-full">
                  Oferta
                </span>
              )}
            </div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.4, ease: 'backOut' }}
              className="mb-6"
            >
              {product.hasDiscount && product.discountPrice ? (
                <>
                  <span className="font-body text-base text-[#9CA3AF] line-through mr-3">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-display font-black text-4xl text-navy">
                    {formatPrice(product.discountPrice)}
                  </span>
                </>
              ) : (
                <span className="font-display font-black text-4xl text-navy">
                  {formatPrice(product.price)}
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
                      initial={{ opacity: 0, x: -10 }}
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

            {/* WhatsApp button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex w-full items-center justify-center gap-2.5 text-white font-display font-bold text-base rounded-[14px] py-4 transition-all duration-300 whatsapp-pulse hover:brightness-110"
              style={{ background: '#25D366' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
            <p className="hidden md:block font-body text-[12px] text-[#9CA3AF] text-center mt-2.5">
              Te redirigiremos a WhatsApp para atención personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="bg-white px-6 py-10 md:px-16 md:py-14">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-xl text-navy mb-7">También te puede interesar</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <Link
                key={p.id}
                href={`/catalogo/${p.id}`}
                className="group bg-white border border-blue-subtle rounded-[16px] overflow-hidden transition-all duration-300 hover:border-blue-border hover:shadow-[0_12px_32px_rgba(90,114,237,0.12)] hover:-translate-y-1 block"
              >
                <div className="relative h-[140px] w-full bg-blue-base flex items-center justify-center overflow-hidden">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <div className="p-3.5">
                  <p className="font-body text-[10px] font-bold text-accent uppercase tracking-wider mb-1 truncate">
                    {p.brand} · {p.category}
                  </p>
                  <h3 className="font-display font-bold text-[13px] text-navy leading-snug line-clamp-2 mb-3 min-h-[34px]">
                    {p.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-sm text-navy">
                      {formatPrice(p.hasDiscount && p.discountPrice ? p.discountPrice : p.price)}
                    </span>
                    <div className="w-7 h-7 bg-navy text-white rounded-full flex items-center justify-center text-xs group-hover:bg-accent transition-colors duration-200">→</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile sticky WhatsApp bar */}
      <div className="md:hidden fixed bottom-[60px] inset-x-0 z-40 px-4 py-3 bg-white/92 backdrop-blur-md border-t border-blue-subtle shadow-xl">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 text-white font-display font-bold text-base rounded-2xl py-4 whatsapp-pulse"
          style={{ background: '#25D366' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
