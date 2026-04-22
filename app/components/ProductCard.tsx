'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

interface ProductCardProps {
  id: string | number
  name: string
  brand: string
  category: string
  price: number
  discountPrice?: number
  imageUrl: string
  badge?: string | null
  index?: number
}

const categoryGradients: Record<string, string> = {
  Celulares:   'linear-gradient(135deg, #EEF1FD 0%, #DDE3FA 100%)',
  Notebooks:   'linear-gradient(135deg, #EDF7F2 0%, #D1F0E0 100%)',
  Audio:       'linear-gradient(135deg, #FDF5EE 0%, #FAE5D0 100%)',
  Auriculares: 'linear-gradient(135deg, #FDF5EE 0%, #FAE5D0 100%)',
  Accesorios:  'linear-gradient(135deg, #F5EEFB 0%, #EDE0F8 100%)',
}

function getCategoryGradient(category: string): string {
  return categoryGradients[category] ?? '#F0F4FF'
}

export default function ProductCard({
  id, name, brand, category, price, discountPrice, imageUrl, badge, index = 0,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-6deg', '6deg'])
  const springRotateX = useSpring(rotateX, { stiffness: 280, damping: 28 })
  const springRotateY = useSpring(rotateY, { stiffness: 280, damping: 28 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const displayPrice = discountPrice ?? price

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-[20px] border border-blue-subtle overflow-hidden cursor-pointer
                 hover:shadow-[0_20px_48px_rgba(90,114,237,0.18)] hover:border-blue-border
                 transition-shadow duration-300 flex flex-col"
    >
      {/* Image area */}
      <div
        className="relative w-full h-[160px] md:h-[180px] flex items-center justify-center overflow-hidden"
        style={{ background: getCategoryGradient(category) }}
      >
        {/* Badge */}
        {badge && (
          <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-accent-mid to-accent text-white text-[10px] font-bold font-body rounded-full px-2.5 py-1 shadow-sm">
            {badge}
          </span>
        )}

        {/* Discount badge */}
        {discountPrice && (
          <span className="absolute top-3 right-3 z-10 bg-[#FDF3E3] text-[#92400E] text-[10px] font-bold font-body rounded-full px-2.5 py-1">
            Oferta
          </span>
        )}

        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 20vw"
        />

        {/* Hover "Consultar" overlay */}
        <div className="absolute inset-x-3 bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="bg-accent text-white text-[11px] font-bold font-body rounded-full px-3 py-1.5 text-center shadow">
            Consultar →
          </div>
        </div>
      </div>

      {/* Info area */}
      <div className="p-4 flex flex-col flex-1">
        <span className="font-body text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
          {brand} · {category}
        </span>
        <h3 className="font-display font-black text-[13px] md:text-sm text-navy leading-snug line-clamp-2 mb-auto">
          {name}
        </h3>

        <div className="mt-3 pt-3 border-t border-blue-subtle flex items-center justify-between gap-2">
          <div>
            {discountPrice && (
              <p className="font-body text-[11px] text-[#9CA3AF] line-through leading-none mb-0.5">
                ${price.toLocaleString('es-AR')}
              </p>
            )}
            <p className="font-display font-black text-base text-navy flex items-baseline gap-1">
              <span className="text-[11px] font-body font-normal text-[#6B7280]">ARS</span>
              ${displayPrice.toLocaleString('es-AR')}
            </p>
          </div>
          <Link
            href={`/catalogo/${id}`}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-navy flex items-center justify-center hover:bg-accent transition-colors duration-200 shadow-sm"
            aria-label={`Ver ${name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
