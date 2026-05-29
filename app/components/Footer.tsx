'use client'

import Link from 'next/link'
import { useState } from 'react'
import Toast from './Toast'

export default function Footer() {
  const year = new Date().getFullYear()
  const [showToast, setShowToast] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setShowToast(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-gradient-to-b from-[#0a0a0c] via-[#050507] to-[#020203] text-white pt-24 pb-12 border-t border-white/[0.03] relative overflow-hidden">
      
      {/* Cinematic Ambient Glow Vignette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          
          {/* Column 1: Brand (Span 4) */}
          <div className="md:col-span-4 flex flex-col items-start pr-0 md:pr-8">
            <div className="font-display font-extrabold text-2xl tracking-tighter mb-6 select-none">
              IMPORTADOS<span className="text-primary">MDP</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed max-w-[280px] font-light">
              Tecnología importada, original y seleccionada. Stock real, garantía y atención personalizada en Mar del Plata.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://wa.me/5492235000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.12] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/importadosmdp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.12] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation (Span 2) */}
          <div className="md:col-span-2">
            <h6 className="font-mono font-bold text-[9px] uppercase tracking-[0.25em] text-white/30 mb-6">Navegación</h6>
            <ul className="space-y-3.5 text-xs text-white/50">
              <li>
                <Link href="/catalogo?categoria=Celulares" className="hover:text-primary transition-colors duration-300">iPhone</Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=Notebooks" className="hover:text-primary transition-colors duration-300">MacBook</Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=Auriculares" className="hover:text-primary transition-colors duration-300">Audio Pro</Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=Accesorios" className="hover:text-primary transition-colors duration-300">Accesorios</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support (Span 2) */}
          <div className="md:col-span-2">
            <h6 className="font-mono font-bold text-[9px] uppercase tracking-[0.25em] text-white/30 mb-6">Soporte</h6>
            <ul className="space-y-3.5 text-xs text-white/50">
              <li>
                <Link href="/contacto" className="hover:text-primary transition-colors duration-300">Garantía</Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-primary transition-colors duration-300">Envíos locales</Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-primary transition-colors duration-300">Términos y condiciones</Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-primary transition-colors duration-300">Preguntas frecuentes</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (Span 4) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h6 className="font-mono font-bold text-[9px] uppercase tracking-[0.25em] text-white/30 mb-6">Newsletter Privado</h6>
            <p className="text-white/40 text-xs mb-6 leading-relaxed max-w-[320px] font-light">
              Recibí notificaciones de disponibilidad de stock exclusivo e ingresos limitados antes de la publicación general.
            </p>
            <form onSubmit={handleSubscribe} className="relative w-full max-w-[320px]">
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/5 rounded-full px-6 py-3.5 text-xs outline-none focus:border-primary/30 focus:bg-white/[0.04] transition-all text-white placeholder:text-white/20 font-light"
              />
              <button
                type="submit"
                aria-label="Suscribirse al newsletter"
                className="absolute right-2 top-1.5 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg cursor-pointer group"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-0.5 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-white/30 text-[9px] uppercase tracking-[0.3em] font-light">
            © {year} IMPORTADOSMDP — Curated technology for Mar del Plata.
          </p>
          <div className="flex gap-8 text-white/20 text-[9px] uppercase tracking-[0.25em] font-light select-none font-mono">
            <span>MDP, Buenos Aires, Argentina</span>
          </div>
        </div>
      </div>
      <Toast message="¡Te suscribiste al newsletter!" visible={showToast} onHide={() => setShowToast(false)} />
    </footer>
  )
}
