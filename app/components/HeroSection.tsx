'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Suave efecto Parallax para el fondo completo
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center pt-20 pb-32"
      style={{ minHeight: 'calc(100vh - 60px)' }}
    >
      {/* ── Fondo con Imagen Full Cover y Borrosa ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <div ref={bgRef} className="absolute inset-x-0 -top-[20%] -bottom-[20%]">
          <Image
            src="/HERO2.png" 
            alt="Fondo importados"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
        </div>
        {/* Overlay difuminado y gradiente hacia abajo para mezclarse con la página blanca */}
        <div className="absolute inset-0 backdrop-blur-[6px] bg-gradient-to-b from-black/50 via-black/30 to-white"></div>
      </div>

      {/* ── Contenido Centrado ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6">
        
        {/* Eyebrow */}
        <p className="animate-reveal-up font-body text-[12px] md:text-[14px] text-accent font-bold uppercase tracking-[0.2em] mb-6 drop-shadow-md">
          Mar del Plata · Tecnología importada
        </p>

        {/* H1 */}
        <h1 className="animate-reveal-up-1 font-display font-black text-[50px] md:text-[85px] leading-[1.05] text-white tracking-tight drop-shadow-2xl">
          Tecnología importada, <br className="hidden md:block" />
          <span className="text-gray-300 font-extrabold">al precio </span>
          <span className="text-accent underline decoration-[6px] underline-offset-8">justo.</span>
        </h1>

        {/* Subtítulo */}
        <p className="animate-reveal-up-2 font-body text-lg md:text-xl text-gray-200 font-medium max-w-[600px] leading-relaxed mt-8 drop-shadow-md">
          Celulares, notebooks, auriculares y accesorios con garantía real. Enviamos a todo el país.
        </p>

        {/* Botones */}
        <div className="animate-reveal-up-3 flex flex-col sm:flex-row justify-center items-center gap-5 mt-10 w-full sm:w-auto">
          <Link
            href="/catalogo"
            className="w-full sm:w-auto font-display font-bold text-base text-white bg-accent rounded-full px-12 py-4
                       transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(0,85,255,0.5)] hover:shadow-[0_0_50px_rgba(0,85,255,0.8)]"
          >
            Ver catálogo →
          </Link>
          <Link
            href="/contacto"
            className="w-full sm:w-auto font-display font-semibold text-base text-white backdrop-blur-md bg-white/10
                       border-[1px] border-white/30 rounded-full px-12 py-4
                       transition-all duration-300 hover:bg-white/20 hover:border-white"
          >
            Contactanos
          </Link>
        </div>

        {/* Badge de confianza */}
        <div className="animate-reveal-up-4 flex flex-wrap justify-center gap-4 md:gap-8 mt-14 bg-black/40 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 shadow-xl">
          {['✓ +500 ventas', '✓ Garantía real', '✓ Envíos a todo el país'].map((item) => (
            <span key={item} className="font-body font-semibold text-[13px] md:text-[14px] text-gray-300">
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
