'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type ProductCategory = 'iPhone' | 'Samsung' | 'MacBook' | 'AirPods' | 'Other'
type FilterKey = 'Todas' | ProductCategory

interface Review {
  id: number
  author: string
  location: string
  date: string
  quote: string
  rating: number
  avatarColor: string
  product: ProductCategory | null
  productLabel: string | null
  tags: string[]
}

const MICRO_BADGES = ['Ventas verificadas', 'Entrega coordinada', 'Atención por WhatsApp', 'Productos revisados']

const FILTERS: FilterKey[] = ['Todas', 'iPhone', 'Samsung', 'MacBook', 'AirPods', 'Other']

const FILTER_DISPLAY: Record<FilterKey, string> = {
  Todas: 'Todas',
  iPhone: 'iPhone',
  Samsung: 'Samsung',
  MacBook: 'MacBook',
  AirPods: 'AirPods',
  Other: 'Otros',
}

const reviews: Review[] = [
  {
    id: 1,
    author: 'Luciana M.',
    location: 'Mar del Plata',
    date: 'Enero 2026',
    quote: 'Pasé por la tienda a buscar un iPhone 15. La atención fue increíble, muy profesionales y me sacaron todas las dudas antes de comprar.',
    rating: 5,
    avatarColor: '#5A72ED',
    product: 'iPhone',
    productLabel: 'iPhone 15',
    tags: ['Buen asesoramiento', 'Atención presencial'],
  },
  {
    id: 2,
    author: 'Martín R.',
    location: 'Mar del Plata',
    date: 'Diciembre 2025',
    quote: 'Excelente relación precio-calidad. Me acerqué al local por una MacBook, estaba todo impecable y el precio fue el mejor de la ciudad.',
    rating: 5,
    avatarColor: '#7C3AED',
    product: 'MacBook',
    productLabel: 'MacBook',
    tags: ['Producto sellado', 'Mejor precio'],
  },
  {
    id: 3,
    author: 'Valentina S.',
    location: 'Mar del Plata',
    date: 'Diciembre 2025',
    quote: 'Muy buena atención por WhatsApp. Me asesoraron para elegir los AirPods y cuando fui al local ya los tenían separados. Recomiendo 100%.',
    rating: 5,
    avatarColor: '#0EA5E9',
    product: 'AirPods',
    productLabel: 'AirPods',
    tags: ['Atención por WhatsApp', 'Buen asesoramiento'],
  },
  {
    id: 4,
    author: 'Diego P.',
    location: 'Miramar',
    date: 'Noviembre 2025',
    quote: 'Fui desde Miramar a buscar mi Galaxy S24. Todo súper transparente, abrís la caja original sellada en el mostrador. Volveré a comprar seguro.',
    rating: 5,
    avatarColor: '#10B981',
    product: 'Samsung',
    productLabel: 'Galaxy S24',
    tags: ['Producto sellado', 'Caja original'],
  },
  {
    id: 5,
    author: 'Camila F.',
    location: 'Mar del Plata',
    date: 'Noviembre 2025',
    quote: 'Fui al local por un JBL Flip 6 y quedé muy contenta. El lugar es súper lindo y los precios son los más competitivos de la zona. Recomendable.',
    rating: 5,
    avatarColor: '#F59E0B',
    product: 'Other',
    productLabel: 'JBL Flip 6',
    tags: ['Mejor precio', 'Buena experiencia'],
  },
  {
    id: 6,
    author: 'Ramiro V.',
    location: 'Mar del Plata',
    date: 'Octubre 2025',
    quote: 'Fui a la tienda sin saber bien qué quería y me asesoraron perfectamente. Me fui con un Samsung S24 y no podría estar más contento.',
    rating: 5,
    avatarColor: '#10B981',
    product: 'Samsung',
    productLabel: 'Samsung S24',
    tags: ['Buen asesoramiento'],
  },
  {
    id: 7,
    author: 'Florencia T.',
    location: 'Mar del Plata',
    date: 'Septiembre 2025',
    quote: 'El local está genial, la atención presencial marca la diferencia. Te asesoran con paciencia y los productos son 100% originales con garantía.',
    rating: 5,
    avatarColor: '#F59E0B',
    product: 'Other',
    productLabel: null,
    tags: ['Producto original', 'Garantía incluida'],
  },
  {
    id: 8,
    author: 'Nicolás B.',
    location: 'Mar del Plata',
    date: 'Agosto 2025',
    quote: 'Tercera vez que paso por el local. Siempre te atienden bárbaro, los equipos son originales sellados y tienen el mejor precio de MDP.',
    rating: 5,
    avatarColor: '#EF4444',
    product: 'Other',
    productLabel: null,
    tags: ['Cliente frecuente', 'Producto sellado'],
  },
  {
    id: 9,
    author: 'Agustina R.',
    location: 'Mar del Plata',
    date: 'Julio 2025',
    quote: 'Compré unos AirPods y me los llevé con la caja sellada en mano. Ir al local te da esa tranquilidad extra. La compra fue un 10.',
    rating: 5,
    avatarColor: '#8B5CF6',
    product: 'AirPods',
    productLabel: 'AirPods',
    tags: ['Producto sellado', 'Entrega en mano'],
  },
]

function SectionHeader() {
  return (
    <div className="mb-12">
      <span className="inline-flex items-center gap-2 mb-3">
        <span className="w-5 h-px bg-primary/60 inline-block" />
        <span className="font-sans text-[9px] text-primary/70 uppercase tracking-[0.2em] font-semibold">
          Reseñas
        </span>
      </span>
      <h2 className="font-display text-[32px] md:text-[44px] text-on-surface font-bold tracking-tight leading-none mb-3">
        Lo que dicen quienes ya compraron
      </h2>
      <p className="font-sans text-sm text-secondary/80 max-w-xl leading-relaxed">
        Más de 500 clientes eligieron ImportadosMDP para comprar tecnología con asesoramiento, entrega coordinada y respaldo real.
      </p>
    </div>
  )
}

function RatingBlock() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 p-6 bg-white rounded-2xl border border-outline-variant/20 shadow-sm">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-0.5 mb-1">
          {[1, 2, 3, 4, 5].map(i => (
            <span key={i} className="text-yellow-500 text-base">★</span>
          ))}
        </div>
        <p className="font-display font-black text-primary text-5xl leading-none">
          4.9 <span className="font-bold text-on-surface/40 text-2xl">/ 5.0</span>
        </p>
        <p className="font-sans text-[10px] text-secondary mt-1 uppercase tracking-wider font-semibold">
          500+ opiniones verificadas
        </p>
      </div>

      <div className="hidden sm:block w-px h-12 bg-outline-variant/30 flex-shrink-0" />
      <div className="sm:hidden h-px w-full bg-outline-variant/20" />

      <div className="flex flex-wrap gap-2">
        {MICRO_BADGES.map(badge => (
          <span
            key={badge}
            className="font-sans text-[10px] font-semibold text-secondary border border-outline-variant/40 rounded-full px-3 py-1 bg-[#f7f8fa]"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  )
}

function CtaDarkCard() {
  return (
    <div className="mb-10 rounded-2xl bg-inverse-surface px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div>
        <p className="font-display font-bold text-white text-lg leading-snug mb-1">
          Tu experiencia también construye confianza.
        </p>
        <p className="font-sans text-white/55 text-sm leading-relaxed">
          Si ya compraste con nosotros, contale a otros cómo fue el proceso.
        </p>
      </div>
      <a
        href="https://wa.me/5492235000000"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-on-surface font-sans font-bold text-sm px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors duration-200 whitespace-nowrap"
      >
        Escribir reseña
      </a>
    </div>
  )
}

interface FilterBarProps {
  activeFilter: FilterKey
  onFilterChange: (f: FilterKey) => void
}

function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {FILTERS.map(key => {
        const isActive = activeFilter === key
        return (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={[
              'font-sans text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-150',
              isActive
                ? 'bg-on-surface text-white'
                : 'bg-white text-secondary border border-outline-variant/30 hover:border-on-surface/30 hover:text-on-surface',
            ].join(' ')}
          >
            {FILTER_DISPLAY[key]}
          </button>
        )
      })}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const { author, date, quote, rating, avatarColor, productLabel, tags } = review
  const initials = author.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index < 6 ? index * 0.06 : 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-outline-variant/20 p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-outline-variant/40 transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-sans font-bold text-[11px] flex-shrink-0"
            style={{ backgroundColor: avatarColor }}
          >
            {initials}
          </div>
          <div>
            <p className="font-sans font-bold text-sm text-on-surface leading-tight">{author}</p>
            <p className="font-sans text-[10px] text-secondary leading-tight mt-0.5">
              Compra verificada
              {productLabel && (
                <> · <span className="text-on-surface/70">{productLabel}</span></>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-0.5 flex-shrink-0 pt-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="text-yellow-500 text-xs">★</span>
          ))}
        </div>
      </div>

      <p className="font-sans text-[10px] text-secondary/70 -mt-1">{date}</p>

      <p className="font-sans text-base text-on-surface/80 leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map(tag => (
            <span
              key={tag}
              className="font-sans text-[9px] font-semibold text-secondary bg-[#f7f8fa] border border-outline-variant/30 rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function EmptyState() {
  return (
    <div className="mt-8 py-16 flex flex-col items-center justify-center text-center">
      <p className="font-sans font-semibold text-sm text-on-surface/50">
        No hay reseñas para esta categoría todavía.
      </p>
      <p className="font-sans text-xs text-secondary/50 mt-1">
        Probá con otra categoría o mirá todas las opiniones.
      </p>
    </div>
  )
}

export default function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Todas')

  const filtered = activeFilter === 'Todas'
    ? reviews
    : reviews.filter(r => r.product === activeFilter)

  return (
    <section className="py-24 bg-[#f7f8fa]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionHeader />
        <RatingBlock />
        <CtaDarkCard />
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        {filtered.length === 0
          ? <EmptyState />
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
            </div>
          )
        }
      </div>
    </section>
  )
}
