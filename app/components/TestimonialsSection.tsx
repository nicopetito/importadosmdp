'use client'

import MarqueeRow from './MarqueeRow'

const reviews = [
  {
    id: 1,
    author: 'Luciana M.',
    location: 'Mar del Plata',
    date: 'Enero 2026',
    quote: 'Pasé por la tienda a buscar un iPhone 15. La atención fue increíble, muy profesionales y me sacaron todas las dudas antes de comprar.',
    rating: 5,
    avatarColor: '#5A72ED',
  },
  {
    id: 2,
    author: 'Martín R.',
    location: 'Mar del Plata',
    date: 'Diciembre 2025',
    quote: 'Excelente relación precio-calidad. Me acerqué al local por una MacBook, estaba todo impecable y el precio fue el mejor de la ciudad.',
    rating: 5,
    avatarColor: '#7C3AED',
  },
  {
    id: 3,
    author: 'Valentina S.',
    location: 'Mar del Plata',
    date: 'Diciembre 2025',
    quote: 'Muy buena atención por WhatsApp. Me asesoraron para elegir los AirPods y cuando fui al local ya los tenían separados. Recomiendo 100%.',
    rating: 5,
    avatarColor: '#0EA5E9',
  },
  {
    id: 4,
    author: 'Diego P.',
    location: 'Miramar',
    date: 'Noviembre 2025',
    quote: 'Fui desde Miramar a buscar mi Galaxy S24. Todo súper transparente, abrís la caja original sellada en el mostrador. Volveré a comprar seguro.',
    rating: 5,
    avatarColor: '#10B981',
  },
  {
    id: 5,
    author: 'Camila F.',
    location: 'Mar del Plata',
    date: 'Noviembre 2025',
    quote: 'Fui al local por un JBL Flip 6 y quedé muy contenta. El lugar es súper lindo y los precios son los más competitivos de la zona. Recomendable.',
    rating: 5,
    avatarColor: '#F59E0B',
  },
  {
    id: 6,
    author: 'Ramiro V.',
    location: 'Mar del Plata',
    date: 'Octubre 2025',
    quote: 'Fui a la tienda sin saber bien qué quería y me asesoraron perfectamente. Me fui con un Samsung S24 y no podría estar más contento.',
    rating: 5,
    avatarColor: '#10B981',
  },
  {
    id: 7,
    author: 'Florencia T.',
    location: 'Mar del Plata',
    date: 'Septiembre 2025',
    quote: 'El local está genial, la atención presencial marca la diferencia. Te asesoran con paciencia y los productos son 100% originales con garantía.',
    rating: 5,
    avatarColor: '#F59E0B',
  },
  {
    id: 8,
    author: 'Nicolás B.',
    location: 'Mar del Plata',
    date: 'Agosto 2025',
    quote: 'Tercera vez que paso por el local. Siempre te atienden bárbaro, los equipos son originales sellados y tienen el mejor precio de MDP.',
    rating: 5,
    avatarColor: '#EF4444',
  },
  {
    id: 9,
    author: 'Agustina R.',
    location: 'Mar del Plata',
    date: 'Julio 2025',
    quote: 'Compré unos AirPods y me los llevé con la caja sellada en mano. Ir al local te da esa tranquilidad extra. La compra fue un 10.',
    rating: 5,
    avatarColor: '#8B5CF6',
  },
]

function ReviewCard({ author, location, date, quote, rating, avatarColor }: typeof reviews[0]) {
  const initials = author.split(' ').map(w => w[0]).join('').slice(0, 2)

  return (
    <div className="w-[290px] md:w-[320px] flex-shrink-0 bg-white rounded-2xl border border-[#E8EEFF] shadow-[0_2px_12px_rgba(26,37,128,0.07)] p-6 flex flex-col gap-3 relative overflow-hidden hover:shadow-[0_4px_24px_rgba(90,114,237,0.14)] hover:border-[#C7D2FE] transition-all duration-300">
      {/* Decorative quote mark */}
      <span className="absolute top-3 right-4 font-display font-black text-[72px] leading-none text-[#1A2580]/5 select-none pointer-events-none">
        &ldquo;
      </span>

      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
      </div>

      {/* Quote */}
      <p className="font-body text-[13px] text-[#4A5568] leading-relaxed line-clamp-3">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="border-t border-[#F0F4FF] pt-3 mt-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-display font-bold text-[11px] flex-shrink-0"
            style={{ background: avatarColor }}
          >
            {initials}
          </div>
          <div>
            <p className="font-body font-bold text-[12px] text-navy leading-tight">{author}</p>
            <p className="font-body text-[11px] text-[#9CA3AF] leading-tight">{location}</p>
          </div>
        </div>
        <span className="font-body text-[11px] text-[#9CA3AF] flex-shrink-0">{date}</span>
      </div>
    </div>
  )
}

const row1 = reviews.slice(0, 5)
const row2 = reviews.slice(5)

export default function TestimonialsSection() {
  return (
    <section className="py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7F9FF 0%, #FFFFFF 100%)' }}>
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
        <div className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-[#E8EEFF] shadow-[0_2px_16px_rgba(26,37,128,0.08)] self-start md:self-auto">
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="font-display font-black text-navy text-lg leading-none">4.9 / 5.0</p>
            <p className="font-body text-[11px] text-[#6B7280] mt-0.5">+500 ventas · Google</p>
          </div>
          <div className="w-px h-10 bg-[#E8EEFF]" />
          <div className="font-body text-[11px] text-[#6B7280] max-w-[100px] leading-snug">
            Calificación promedio de clientes reales
          </div>
        </div>
      </div>

      {/* Marquee row */}
      <MarqueeRow gap={16} pauseOnHover speed="55s">
        {reviews.map(r => <ReviewCard key={r.id} {...r} />)}
      </MarqueeRow>
    </section>
  )
}

