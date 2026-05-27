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
      alert('¡Gracias por suscribirte a nuestro newsletter privado!')
      setEmail('')
    }
  }

  return (
    <footer className="bg-gradient-to-b from-[#0a0a0c] via-[#050507] to-[#020203] text-white pt-24 pb-12 border-t border-white/[0.03] relative overflow-hidden">
      
      {/* Cinematic Ambient Glow Vignette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          
          {/* Column 1: Brand (Span 4) */}
          <div className="md:col-span-4 flex flex-col items-start pr-0 md:pr-8">
            <div className="font-display font-extrabold text-2xl tracking-tighter mb-6 select-none">
              IMPORTADOS<span className="text-primary">MDP</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed max-w-[280px] font-light">
              La curaduría de tecnología más exclusiva de la costa atlántica. Productos seleccionados bajo estrictos estándares de originalidad, garantía y excelencia.
            </p>
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
                placeholder="Tu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/5 rounded-full px-6 py-3.5 text-xs outline-none focus:border-primary/30 focus:bg-white/[0.04] transition-all text-white placeholder:text-white/20 font-light"
              />
              <button
                type="submit"
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
      <Toast message="¡Número copiado!" visible={showToast} onHide={() => setShowToast(false)} />
    </footer>
  )
}
