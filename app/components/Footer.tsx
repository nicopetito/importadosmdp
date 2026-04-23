'use client'

import Link from 'next/link'
import { useState } from 'react'
import Toast from './Toast'

export default function Footer() {
  const year = new Date().getFullYear()
  const [showToast, setShowToast] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('+5492235000000')
    setShowToast(true)
  }

  return (
    <footer className="bg-navy-deep px-6 pt-16 pb-8">
      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent mb-14" />

      <div className="max-w-6xl mx-auto">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 mb-14">

          {/* Col 1: Brand */}
          <div>
            <p className="font-display font-extrabold text-xl text-white tracking-tight mb-3">
              importados
              <span
                className="bg-gradient-to-r from-accent to-blue-soft bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                mdp
              </span>
            </p>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-[220px] mb-4">
              Tecnología importada con garantía real. Enviamos a todo el país.
            </p>
            <p className="font-body text-sm text-blue-soft font-medium mb-6">
              Hecho en Mar del Plata 🌊
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/importadosmdp_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://wa.me/5492235000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#25D366] transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-6">
              Navegación
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/catalogo', label: 'Catálogo' },
                { href: '/contacto', label: 'Contacto' },
                { href: '/resenas', label: 'Reseñas' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/55 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-6">
              Contacto
            </h4>
            <div className="flex flex-col gap-3 items-start">
              <p className="font-body text-sm text-white/55">Jujuy 1811, Mar del Plata</p>
              <p className="font-body text-sm text-white/55">Lunes a Sábado, 10 a 20hs</p>
              <p className="font-body text-sm text-white/55">Compra presencial en tienda</p>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/5492235000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/55 hover:text-[#25D366] transition-colors duration-200"
                >
                  WhatsApp
                </a>
                <button
                  onClick={handleCopy}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="Copiar número"
                  title="Copiar número de WhatsApp"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
              <a
                href="https://instagram.com/importadosmdp_"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-white/55 hover:text-white transition-colors duration-200"
              >
                @importadosmdp_
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 relative">
          <p className="font-body text-xs text-white/30">
            © {year} ImportadosMDP · Todos los derechos reservados
          </p>
          <p className="font-body text-xs text-white/30">
            Mar del Plata, Buenos Aires, Argentina
          </p>
        </div>
      </div>
      <Toast message="¡Número copiado!" visible={showToast} onHide={() => setShowToast(false)} />
    </footer>
  )
}
