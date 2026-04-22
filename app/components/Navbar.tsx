'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-[60px] flex items-center bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-display font-extrabold text-xl text-navy tracking-tight">
          importados<span className="text-accent">mdp</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/catalogo"
            className="font-body text-sm text-navy hover:text-accent hover:underline transition-colors duration-150"
          >
            Catálogo
          </Link>
          <Link
            href="/contacto"
            className="font-body text-sm text-navy hover:text-accent hover:underline transition-colors duration-150"
          >
            Contacto
          </Link>
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span
            className={`block w-5 h-[2px] bg-navy rounded transition-all duration-300 ${
              open ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-navy rounded transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-navy rounded transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute top-[60px] inset-x-0 bg-blue-base/95 backdrop-blur-md border-b border-blue-border
                     transition-all duration-300 overflow-hidden ${
                       open ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                     }`}
      >
        <nav className="flex flex-col items-center gap-4 py-6">
          <Link
            href="/catalogo"
            onClick={() => setOpen(false)}
            className="font-body text-base text-navy hover:text-accent transition-colors duration-150"
          >
            Catálogo
          </Link>
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="font-body text-base text-navy hover:text-accent transition-colors duration-150"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  )
}
