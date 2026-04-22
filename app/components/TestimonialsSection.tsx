'use client'

import MarqueeRow from './MarqueeRow'

const reviews = [
  {
    id: 1,
    author: 'Luciana M.',
    location: 'Mar del Plata',
    date: 'Enero 2026',
    quote: 'Compré un iPhone 15 y llegó en menos de 3 horas. La atención fue increíble, muy profesionales y respondieron todas mis dudas.',
    rating: 5,
  },
  {
    id: 2,
    author: 'Martín R.',
    location: 'Mar del Plata',
    date: 'Diciembre 2025',
    quote: 'Excelente relación precio-calidad. El MacBook que compré estaba impecable y el precio fue mucho mejor que en otras tiendas.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Valentina S.',
    location: 'Mar del Plata',
    date: 'Diciembre 2025',
    quote: 'Muy buena atención por WhatsApp. Me ayudaron a elegir los AirPods correctos y todo llegó perfecto. Recomiendo 100%.',
    rating: 5,
  },
  {
    id: 4,
    author: 'Diego P.',
    location: 'Buenos Aires',
    date: 'Noviembre 2025',
    quote: 'Enviaron el Galaxy S24 a CABA sin problemas. Todo muy bien embalado y rápido. Volveré a comprar seguro.',
    rating: 5,
  },
  {
    id: 5,
    author: 'Camila F.',
    location: 'Mar del Plata',
    date: 'Noviembre 2025',
    quote: 'Compré el JBL Flip 6 y quedé muy contenta. El precio era el más competitivo que encontré. Muy recomendable.',
    rating: 5,
  },
]

function ReviewCard({ author, location, date, quote, rating }: typeof reviews[0]) {
  return (
    <div className="w-[290px] md:w-[320px] flex-shrink-0 bg-white rounded-2xl border border-blue-subtle shadow-sm p-6 flex flex-col gap-3">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
      </div>

      {/* Quote */}
      <p className="font-body text-[13px] text-[#4A5568] italic leading-relaxed line-clamp-3">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="border-t border-[#F0F4FF] pt-3 mt-auto flex items-center justify-between">
        <div>
          <p className="font-body font-bold text-[13px] text-navy">{author}</p>
          <p className="font-body text-[11px] text-[#9CA3AF]">{location}</p>
        </div>
        <span className="font-body text-[11px] text-[#9CA3AF]">{date}</span>
      </div>
    </div>
  )
}

const row1 = reviews
const row2 = [...reviews].reverse()

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
            Reseñas verificadas
          </p>
          <h2 className="font-display font-black text-[36px] md:text-[52px] text-navy leading-tight tracking-tight uppercase">
            Reseñas
          </h2>
        </div>

        {/* Google rating card */}
        <div className="flex items-center gap-4 bg-blue-base rounded-2xl px-5 py-4 border border-blue-subtle self-start md:self-auto">
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="font-display font-black text-navy text-lg leading-none">4.9 / 5.0</p>
            <p className="font-body text-[11px] text-[#6B7280] mt-0.5">+500 ventas · Google</p>
          </div>
          <div className="w-px h-10 bg-blue-subtle" />
          <div className="font-body text-[11px] text-[#6B7280] max-w-[100px] leading-snug">
            Calificación promedio de clientes reales
          </div>
        </div>
      </div>

      {/* Desktop: 2 rows marquee */}
      <div className="hidden md:flex flex-col gap-4">
        <MarqueeRow gap={16} pauseOnHover>
          {row1.map(r => <ReviewCard key={r.id} {...r} />)}
        </MarqueeRow>
        <MarqueeRow gap={16} reverse pauseOnHover>
          {row2.map(r => <ReviewCard key={r.id} {...r} />)}
        </MarqueeRow>
      </div>

      {/* Mobile: 1 row */}
      <div className="md:hidden">
        <MarqueeRow gap={12} pauseOnHover>
          {row1.map(r => <ReviewCard key={r.id} {...r} />)}
        </MarqueeRow>
      </div>
    </section>
  )
}
