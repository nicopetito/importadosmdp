'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

const MapEmbed = dynamic(() => import('@/app/components/MapEmbed'), {
  ssr: false,
  loading: () => <div className="w-full h-[320px] bg-blue-subtle rounded-[16px] animate-pulse" />,
})

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', producto: '', mensaje: '' })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const handleBlur = (field: string) => setTouched(t => ({ ...t, [field]: true }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    await new Promise(r => setTimeout(r, 1500))
    setEnviando(false)
    setEnviado(true)
  }

  const fieldOk = (field: keyof typeof form) =>
    touched[field] && form[field].trim().length > 0

  const CheckIcon = () => (
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-blue-base overflow-x-hidden">
      <Navbar />

      {/* Dark header */}
      <header className="bg-navy px-6 py-12 md:pb-16 md:pt-18 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-[11px] font-bold text-blue-border uppercase tracking-[0.2em] mb-4">
            Estamos para ayudarte
          </p>
          <h1 className="font-display font-black text-[44px] md:text-[68px] text-white leading-[1.0] mb-4">
            Hablemos.
          </h1>
          <p className="font-body text-[16px] font-light text-white/60 max-w-[480px] leading-relaxed">
            Escribinos por WhatsApp o Instagram. Respondemos en menos de 3 horas.
          </p>
        </div>
      </header>

      {/* Main body */}
      <main className="px-6 py-12 md:px-16 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-12">

          {/* Left: Channels */}
          <div>
            <h2 className="font-display font-bold text-lg text-navy mb-5">Canales directos</h2>

            {/* WhatsApp card */}
            <div className="p-[1.5px] rounded-[17px] mb-3 hover:bg-gradient-to-br hover:from-accent hover:to-blue-soft transition-all duration-300 bg-transparent">
              <a
                href="https://wa.me/+5492230000000"
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-blue-border rounded-[16px] p-6 hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-[#F0FFF4] shrink-0 flex items-center justify-center">
                    <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-navy">WhatsApp</h3>
                    <p className="font-body text-xs text-[#6B7280]">Respuesta rápida</p>
                  </div>
                </div>
                <p className="font-body text-[13px] text-[#4A5568] mb-3 leading-relaxed">
                  Canal más rápido para consultar disponibilidad y precios.
                </p>
                <span className="inline-flex items-center gap-1.5 bg-[#EEF1FD] rounded-full px-3 py-1 font-body font-medium text-[11px] text-accent-mid">
                  ⚡ Menos de 3 horas
                </span>
              </a>
            </div>

            {/* Instagram card */}
            <div className="p-[1.5px] rounded-[17px] mb-6 hover:bg-gradient-to-br hover:from-[#C13584] hover:to-[#E1306C] transition-all duration-300 bg-transparent">
              <a
                href="https://instagram.com/importadosmdp_"
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-blue-border rounded-[16px] p-6 hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-[#FDF0F7] shrink-0 flex items-center justify-center">
                    <svg className="w-5 h-5 fill-[#C13584]" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-navy">Instagram</h3>
                    <p className="font-body text-xs text-[#6B7280]">@importadosmdp_</p>
                  </div>
                </div>
                <p className="font-body text-[13px] text-[#4A5568] mb-3 leading-relaxed">
                  Seguinos para ver productos, precios y novedades.
                </p>
                <span className="inline-flex items-center gap-1.5 bg-[#FDF0F7] rounded-full px-3 py-1 font-body font-medium text-[11px] text-[#7B2D8B]">
                  📸 Ver perfil
                </span>
              </a>
            </div>

            {/* Info adicional */}
            <div className="space-y-3">
              {[
                { icon: '📍', text: 'Jujuy 1811, Mar del Plata, Buenos Aires' },
                { icon: '🕐', text: 'Lunes a Sábado de 10:00 a 20:00hs' },
                { icon: '✉️', text: 'También por DM en Instagram' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-base leading-snug mt-0.5">{item.icon}</span>
                  <span className="font-body text-[13px] text-[#4A5568] leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white border border-blue-border rounded-[20px] p-8 h-fit shadow-sm">
            {!enviado ? (
              <form onSubmit={handleSubmit}>
                <h2 className="font-display font-bold text-xl text-navy mb-1">Dejanos tu consulta</h2>
                <p className="font-body text-sm text-[#6B7280] mb-7">Te respondemos a la brevedad.</p>

                {/* Nombre */}
                <div className="float-label-group mb-5 relative">
                  <input
                    type="text"
                    placeholder=" "
                    required
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                    onBlur={() => handleBlur('nombre')}
                    className="w-full border border-blue-border rounded-[10px] px-3.5 font-body text-sm text-navy bg-blue-base outline-none focus:border-accent focus:bg-white transition-all duration-150"
                  />
                  <label>Nombre completo *</label>
                  {fieldOk('nombre') && <CheckIcon />}
                </div>

                {/* Email */}
                <div className="float-label-group mb-5 relative">
                  <input
                    type="email"
                    placeholder=" "
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onBlur={() => handleBlur('email')}
                    className="w-full border border-blue-border rounded-[10px] px-3.5 font-body text-sm text-navy bg-blue-base outline-none focus:border-accent focus:bg-white transition-all duration-150"
                  />
                  <label>Email *</label>
                  {fieldOk('email') && <CheckIcon />}
                </div>

                {/* Teléfono */}
                <div className="float-label-group mb-5 relative">
                  <input
                    type="tel"
                    placeholder=" "
                    value={form.telefono}
                    onChange={e => setForm({ ...form, telefono: e.target.value })}
                    onBlur={() => handleBlur('telefono')}
                    className="w-full border border-blue-border rounded-[10px] px-3.5 font-body text-sm text-navy bg-blue-base outline-none focus:border-accent focus:bg-white transition-all duration-150"
                  />
                  <label>Teléfono</label>
                  {fieldOk('telefono') && <CheckIcon />}
                </div>

                {/* Producto (select) */}
                <div className="float-label-group mb-5 relative">
                  <select
                    value={form.producto}
                    onChange={e => {
                      setForm({ ...form, producto: e.target.value })
                      handleBlur('producto')
                    }}
                    className={`w-full border border-blue-border rounded-[10px] px-3.5 font-body text-sm text-navy bg-blue-base outline-none focus:border-accent focus:bg-white transition-all duration-150 ${form.producto ? 'has-value' : ''}`}
                  >
                    <option value=""> </option>
                    <option>iPhone</option>
                    <option>Samsung Galaxy</option>
                    <option>MacBook</option>
                    <option>Auriculares</option>
                    <option>Apple Watch</option>
                    <option>Otro / Consulta general</option>
                  </select>
                  <label>Producto de interés</label>
                </div>

                {/* Mensaje */}
                <div className="float-label-group mb-5 relative">
                  <textarea
                    rows={4}
                    placeholder=" "
                    required
                    value={form.mensaje}
                    onChange={e => setForm({ ...form, mensaje: e.target.value })}
                    onBlur={() => handleBlur('mensaje')}
                    className="w-full border border-blue-border rounded-[10px] px-3.5 font-body text-sm text-navy bg-blue-base outline-none focus:border-accent focus:bg-white transition-all duration-150 resize-y"
                  />
                  <label>Tu consulta *</label>
                </div>

                <p className="font-body text-[11px] text-[#9CA3AF] mb-5">* Campos requeridos</p>

                <button
                  type="submit"
                  disabled={enviando}
                  className={`w-full py-3.5 font-display font-bold text-[15px] rounded-[10px] transition-all duration-200 ${
                    enviando
                      ? 'bg-blue-border text-white cursor-not-allowed'
                      : 'bg-navy text-white hover:bg-accent cursor-pointer'
                  }`}
                >
                  {enviando ? 'Enviando...' : 'Enviar consulta →'}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#F0FFF4] flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-[#25D366]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-navy text-center mb-2.5">
                  ¡Consulta enviada!
                </h3>
                <p className="font-body text-sm text-[#4A5568] text-center mb-7 max-w-[280px]">
                  Te respondemos en menos de 3 horas por el medio que prefieras.
                </p>
                <button
                  onClick={() => {
                    setEnviado(false)
                    setForm({ nombre: '', email: '', telefono: '', producto: '', mensaje: '' })
                    setTouched({})
                  }}
                  className="border border-blue-border text-navy rounded-full px-6 py-2.5 font-display font-semibold text-sm hover:border-accent hover:text-accent transition-colors"
                >
                  Hacer otra consulta
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Map section */}
      <section className="bg-white px-6 py-12 md:px-16 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-xl text-navy mb-1.5">Cómo llegar</h2>
          <p className="font-body text-sm text-[#6B7280] mb-7">Jujuy 1811, Mar del Plata, Buenos Aires.</p>
          <div className="rounded-[16px] overflow-hidden border border-blue-subtle shadow-sm">
            <MapEmbed height="320" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
