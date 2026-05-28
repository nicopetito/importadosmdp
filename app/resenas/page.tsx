'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

const resenas = [
  { id: 1, name: 'Javier Peralta', product: 'iPhone 15 Pro Max', text: 'Excelente atención. Me asesoraron por WhatsApp, coordinamos y me entregaron el celu nuevo sellado. Muy recomendables.', rating: 5, date: 'Hace 2 días', avatarColor: '#1b1b1d' },
  { id: 2, name: 'Ricardo Soler', product: 'AirPods Pro 2', text: 'Compré los AirPods Pro 2. Son una locura la cancelación de ruido. Gracias ImportadosMDP por la gestión impecable.', rating: 5, date: 'Hace 2 semanas', avatarColor: '#1b1b1d' },
  { id: 3, name: 'Juan Ignacio', product: 'iPhone 15 Pro Max', text: 'Excelente atención. Me asesoraron por WhatsApp, coordinamos y me entregaron el celu nuevo sellado. Muy recomendables.', rating: 5, date: 'Hace 2 semanas', avatarColor: '#1b1b1d' },
  { id: 4, name: 'Martina S.', product: 'MacBook Pro M3', text: 'La compu vuela. Conseguí mejor precio que en cualquier local de Buenos Aires y me la alcanzaron a casa el mismo día.', rating: 5, date: 'Hace 1 mes', avatarColor: '#1b1b1d' },
  { id: 5, name: 'Carlos', product: 'Samsung S24 Ultra', text: 'Todo de 10. Tuve una duda con la configuración de la cámara apenas lo compré y me ayudaron al instante. Grandes vendedores.', rating: 4, date: 'Hace 1 mes', avatarColor: '#1b1b1d' },
  { id: 6, name: 'Valentina G.', product: 'AirPods Pro', text: '100% originales, en caja sellada y con garantía de Apple. Volvería a comprar sin dudarlo.', rating: 5, date: 'Hace 2 meses', avatarColor: '#1b1b1d' },
]

function ReviewCard({ resena, index }: { resena: typeof resenas[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const initials = resena.name.split(' ').map(w => w[0]).join('').slice(0, 2)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 2) * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-outline-variant/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between editorial-shadow hover:shadow-2xl hover:border-outline-variant/30 transition-all duration-500 group"
    >
      <div>
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface text-lg border border-outline-variant/10">
              {initials}
            </div>
            <div>
              <p className="font-sans font-bold text-base text-on-surface">{resena.name}</p>
              <p className="font-sans text-[10px] text-secondary uppercase tracking-widest font-semibold mt-0.5">{resena.date}</p>
            </div>
          </div>
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-base">
                {i < resena.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        </div>
        <p className="font-sans text-on-surface/80 italic text-sm md:text-base leading-relaxed mb-8">
          &ldquo;{resena.text}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-2.5 text-secondary border-t border-outline-variant/10 pt-6">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#006a2d]">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="font-sans text-[10px] text-secondary uppercase tracking-wider font-semibold">
          Compra verificada: {resena.product}
        </span>
      </div>
    </motion.div>
  )
}

const ratingBars = [
  { stars: 5, pct: 92, label: 'Excelencia' },
  { stars: 4, pct: 6,  label: 'Muy Bueno' },
  { stars: 3, pct: 2,  label: 'Aceptable' },
]

export default function ResenasPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-[72px] md:pb-0">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Hero Header */}
        <header className="mb-20 text-center max-w-2xl mx-auto">
          <p className="font-sans text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">
            Comunidad MDP
          </p>
          <h1 className="font-sans font-bold text-[40px] md:text-[56px] text-on-surface leading-none tracking-tight mb-6">
            Opiniones.
          </h1>
          <p className="font-sans text-secondary text-sm md:text-base leading-relaxed">
            Nuestra reputación se construye con cada experiencia premium entregada en toda la Argentina.
          </p>
        </header>

        {/* Rating Summary Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          {/* Score Card */}
          <div className="md:col-span-4 bg-white border border-outline-variant/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-center items-center text-center editorial-shadow">
            <span className="font-sans font-bold text-[80px] text-on-surface leading-none tracking-tighter">4.9</span>
            <div className="flex gap-1 my-4 text-yellow-500">
              {[1,2,3,4,5].map(i => <span key={i} className="text-xl">★</span>)}
            </div>
            <p className="font-sans text-[10px] text-secondary uppercase tracking-widest font-semibold">500+ opiniones verificadas</p>
            <div className="mt-8 border border-[#006a2d]/25 text-[#006a2d] px-5 py-2.5 rounded-full font-sans text-[9px] font-bold flex items-center gap-1.5 uppercase tracking-widest bg-[#006a2d]/5">
              <span>✓</span> Ventas Exitosas
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="md:col-span-5 bg-white border border-outline-variant/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 editorial-shadow">
            <h3 className="font-sans text-[10px] text-secondary uppercase tracking-widest font-semibold mb-8">Desglose de Calificación</h3>
            <div className="space-y-6">
              {ratingBars.map((bar) => (
                <div key={bar.stars} className="flex items-center gap-4">
                  <span className="font-sans text-[10px] text-on-surface font-semibold w-16 uppercase tracking-wider shrink-0">{bar.label}</span>
                  <div className="flex-1 h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                    <div className="h-full bg-on-surface rounded-full" style={{ width: `${bar.pct}%` }} />
                  </div>
                  <span className="font-sans text-[10px] text-secondary w-8 text-right font-semibold shrink-0">{bar.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Card */}
          <div className="md:col-span-3 bg-inverse-surface text-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between editorial-shadow">
            <div>
              <h3 className="font-sans font-bold text-2xl mb-4 leading-snug">Tu experiencia es el sello de nuestra calidad.</h3>
              <p className="font-sans text-xs text-white/50 leading-relaxed uppercase tracking-wider font-semibold">Súmate a nuestra comunidad exclusiva.</p>
            </div>
            <a
              href="https://instagram.com/importadosmdp_"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 bg-white text-black text-center py-4 rounded-2xl font-sans font-bold text-xs uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all cursor-pointer border border-white/10"
            >
              Escribir Reseña
            </a>
          </div>
        </section>

        {/* Filter pills */}
        <div className="flex gap-3 mb-16 overflow-x-auto pb-4 border-b border-outline-variant/25 scrollbar-hide">
          <button className="px-8 py-3 rounded-full bg-inverse-surface text-white font-sans text-xs font-bold uppercase tracking-widest">Todas</button>
          <button className="px-8 py-3 rounded-full border border-outline-variant/30 text-secondary hover:text-on-surface hover:border-outline font-sans text-xs font-bold uppercase tracking-widest transition-colors">iPhone</button>
          <button className="px-8 py-3 rounded-full border border-outline-variant/30 text-secondary hover:text-on-surface hover:border-outline font-sans text-xs font-bold uppercase tracking-widest transition-colors">MacBook</button>
          <button className="px-8 py-3 rounded-full border border-outline-variant/30 text-secondary hover:text-on-surface hover:border-outline font-sans text-xs font-bold uppercase tracking-widest transition-colors">Watch</button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resenas.map((resena, i) => (
            <ReviewCard key={resena.id} resena={resena} index={i} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
