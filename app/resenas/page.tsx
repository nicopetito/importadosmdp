'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

const resenas = [
  { id: 1, name: 'Juan Ignacio', product: 'iPhone 15 Pro Max', text: 'Excelente atención. Me asesoraron por WhatsApp, coordinamos y me entregaron el celu nuevo sellado. Muy recomendables.', rating: 5, date: 'Hace 2 semanas' },
  { id: 2, name: 'Martina S.', product: 'MacBook Pro M3', text: 'La compu vuela. Conseguí mejor precio que en cualquier local de Buenos Aires y me la alcanzaron a casa el mismo día.', rating: 5, date: 'Hace 1 mes' },
  { id: 3, name: 'Carlos', product: 'Samsung S24 Ultra', text: 'Todo de 10. Tuve una duda con la configuración de la cámara apenas lo compré y me ayudaron al instante. Grandes vendedores.', rating: 4, date: 'Hace 1 mes' },
  { id: 4, name: 'Valentina G.', product: 'AirPods Pro', text: '100% originales, en caja sellada y con garantía de Apple. Volvería a comprar sin dudarlo.', rating: 5, date: 'Hace 2 meses' },
  { id: 5, name: 'Luciana M.', product: 'iPhone 15 Pro Max', text: 'Compré un iPhone 15 y llegó en menos de 3 horas. La atención fue increíble, muy profesionales.', rating: 5, date: 'Enero 2026' },
  { id: 6, name: 'Diego P.', product: 'Galaxy S24', text: 'Enviaron el Galaxy S24 a CABA sin problemas. Todo muy bien embalado y rápido. Volveré a comprar seguro.', rating: 5, date: 'Noviembre 2025' },
]

function ReviewCard({ resena, index }: { resena: typeof resenas[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 2) * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white p-8 rounded-[22px] border border-blue-subtle shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-border transition-all duration-300"
    >
      <div>
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill={i < resena.rating ? '#FBBF24' : 'none'} stroke={i < resena.rating ? '#FBBF24' : '#D1D5DB'} strokeWidth="1">
              <path d="M10 1l2.47 5.01L18 6.76l-4 3.9.94 5.49L10 13.77 5.06 16.15 6 10.66 2 6.76l5.53-.75L10 1z" />
            </svg>
          ))}
        </div>
        <p className="font-body text-[#4A5568] italic text-[15px] leading-relaxed mb-6">
          &ldquo;{resena.text}&rdquo;
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-[#F0F4FF] pt-4">
        <div>
          <span className="block font-display font-bold text-sm text-navy">{resena.name}</span>
          <span className="block font-body text-[11px] text-[#9CA3AF]">Compró un {resena.product}</span>
        </div>
        <span className="font-body text-[11px] text-[#9CA3AF]">{resena.date}</span>
      </div>
    </motion.div>
  )
}

export default function ResenasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20 pb-20 mb-[60px] md:mb-0">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-4">
              Reseñas verificadas
            </p>
            <h1 className="font-display font-black text-[36px] md:text-[52px] text-navy tracking-tight mb-5">
              Lo que dicen<br className="hidden sm:block" /> nuestros clientes
            </h1>
            <p className="font-body text-[#6B7280] max-w-xl mx-auto text-[15px] leading-relaxed">
              Más de 500 ventas avalan nuestro compromiso y calidad. Acompañamos tu compra hasta que tengas el equipo en tus manos.
            </p>

            {/* Rating summary */}
            <div className="inline-flex items-center gap-3 mt-8 bg-blue-base border border-blue-subtle rounded-2xl px-6 py-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <span className="font-display font-black text-xl text-navy">4.9</span>
              <span className="w-px h-5 bg-blue-subtle" />
              <span className="font-body text-sm text-[#6B7280]">+500 reseñas · Google</span>
            </div>
          </motion.div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resenas.map((resena, i) => (
              <ReviewCard key={resena.id} resena={resena} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-block glass rounded-[22px] px-8 py-7 border border-blue-subtle bg-blue-base">
              <h3 className="font-display font-bold text-xl text-navy mb-2">Tu calificación nos importa</h3>
              <p className="font-body text-[#6B7280] text-sm mb-5">
                Si ya sos cliente nuestro, contanos tu experiencia en Instagram o Google.
              </p>
              <Link
                href="https://instagram.com/importadosmdp_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy text-white font-body font-bold text-sm rounded-full px-6 py-2.5 hover:bg-accent transition-colors duration-200"
              >
                Dejar reseña →
              </Link>
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  )
}
