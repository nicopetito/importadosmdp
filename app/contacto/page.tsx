'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

const MapEmbed = dynamic(() => import('@/app/components/MapEmbed'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-surface-container-low rounded-[2rem] animate-pulse" />,
})

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    await new Promise(r => setTimeout(r, 1200))
    setEnviando(false)
    setEnviado(true)
  }

  const whatsappLink = "https://wa.me/5492235000000"

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-[72px] md:pb-0">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {/* Editorial Header */}
        <header className="mb-20 max-w-2xl">
          <p className="font-sans text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">
            Atención Personalizada
          </p>
          <h1 className="font-sans font-bold text-[48px] md:text-[64px] text-on-surface leading-none tracking-tight mb-6">
            Hablemos.
          </h1>
          <p className="font-sans text-secondary text-sm md:text-base leading-relaxed">
            Escribinos directamente por WhatsApp para consultar stock inmediato o coordinar tu retiro. Respondemos de manera inmediata.
          </p>
        </header>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Direct Channels - Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-on-surface mb-8">Canales de Contacto</h2>

            {/* WhatsApp Concierge Card */}
            <div className="bg-white border border-outline-variant/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm hover:shadow-2xl hover:border-outline-variant/30 transition-all duration-500 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-2 block">Premium Concierge</span>
                  <h3 className="font-sans font-bold text-2xl text-on-surface mb-3">WhatsApp Directo</h3>
                  <p className="font-sans text-sm text-secondary leading-relaxed max-w-md">
                    Consultá stock físico, reservá tu equipo de forma inmediata o aclará dudas sobre la garantía oficial.
                  </p>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-inverse-surface text-white text-center px-8 py-4 rounded-2xl font-sans font-bold text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md shrink-0 flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Chatear Ahora</span>
                </a>
              </div>
            </div>

            {/* Instagram details */}
            <div className="bg-white border border-outline-variant/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm hover:shadow-2xl hover:border-outline-variant/30 transition-all duration-500 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] text-secondary font-bold tracking-widest uppercase mb-2 block">Social Showcase</span>
                  <h3 className="font-sans font-bold text-2xl text-on-surface mb-3">Instagram Showroom</h3>
                  <p className="font-sans text-sm text-secondary leading-relaxed max-w-md">
                    Seguinos para enterarte de ingresos diarios, ver unboxings reales y acceder a promociones flash.
                  </p>
                </div>
                <a
                  href="https://instagram.com/importadosmdp_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-outline text-on-surface text-center px-8 py-4 rounded-2xl font-sans font-bold text-xs uppercase tracking-widest hover:bg-surface active:scale-95 transition-all shrink-0"
                >
                  Ver Perfil
                </a>
              </div>
            </div>

            {/* Ubicación y Horarios card */}
            <div className="bg-white border border-outline-variant/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
              <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-on-surface mb-8">Coordenadas del Showroom</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <span className="block text-[9px] font-bold text-secondary uppercase tracking-wider mb-2">Visita Presencial</span>
                  <p className="font-sans font-bold text-base text-on-surface">Jujuy 1611</p>
                  <p className="text-secondary text-xs mt-1">Mar del Plata, Buenos Aires, Argentina</p>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-secondary uppercase tracking-wider mb-2">Horarios</span>
                  <p className="font-sans font-bold text-base text-on-surface">Lunes a Sábado</p>
                  <p className="text-secondary text-xs mt-1">10:00 a 20:00 hs de corrido</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sleek Minimal Inquiry Form - Right Column */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-outline-variant/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm">
              {!enviado ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-sans font-bold text-lg text-on-surface mb-1">Inquiry</h2>
                    <p className="font-sans text-xs text-secondary leading-relaxed">Dejanos tus datos si preferís que te contactemos nosotros.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Nombre */}
                    <div>
                      <label className="block text-[9px] font-bold text-secondary uppercase tracking-wider mb-2">Nombre completo *</label>
                      <input
                        type="text"
                        required
                        value={form.nombre}
                        onChange={e => setForm({ ...form, nombre: e.target.value })}
                        className="w-full h-12 bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 font-sans text-sm text-on-surface focus:outline-none focus:border-on-surface focus:bg-white transition-all"
                        placeholder="ej. Juan Pérez"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[9px] font-bold text-secondary uppercase tracking-wider mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full h-12 bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 font-sans text-sm text-on-surface focus:outline-none focus:border-on-surface focus:bg-white transition-all"
                        placeholder="ej. juan@gmail.com"
                      />
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="block text-[9px] font-bold text-secondary uppercase tracking-wider mb-2">Mensaje *</label>
                      <textarea
                        rows={4}
                        required
                        value={form.mensaje}
                        onChange={e => setForm({ ...form, mensaje: e.target.value })}
                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 font-sans text-sm text-on-surface focus:outline-none focus:border-on-surface focus:bg-white transition-all resize-none"
                        placeholder="¿Qué producto estás buscando?"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full h-12 bg-inverse-surface text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md disabled:bg-outline-variant/50 disabled:cursor-not-allowed"
                  >
                    {enviando ? 'Enviando...' : 'Enviar Consulta'}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-sans font-bold text-2xl text-on-surface mb-2">
                    ¡Consulta recibida!
                  </h3>
                  <p className="font-sans text-xs text-secondary leading-relaxed max-w-[240px] mb-8">
                    Te responderemos en el transcurso del día al correo indicado.
                  </p>
                  <button
                    onClick={() => {
                      setEnviado(false)
                      setForm({ nombre: '', email: '', mensaje: '' })
                    }}
                    className="border border-outline-variant text-secondary rounded-full px-6 py-2.5 font-sans font-bold text-xs uppercase tracking-widest hover:border-on-surface hover:text-on-surface transition-colors cursor-pointer"
                  >
                    Hacer otra consulta
                  </button>
                </motion.div>
              )}
            </div>
          </div>

        </div>

        {/* Showroom Interactive Map */}
        <section className="mt-20 border-t border-outline-variant/10 pt-20">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-on-surface mb-8">Ubicación Física</h3>
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-black/[0.05] shadow-2xl h-[400px]">
            <MapEmbed height="400" />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
