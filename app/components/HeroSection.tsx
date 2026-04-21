'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${-window.scrollY * 0.12}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="bg-blue-base overflow-hidden grid grid-cols-1 md:grid-cols-[55%_45%]"
      style={{ minHeight: 'calc(100vh - 60px)' }}
    >
      {/* ── Columna izquierda: texto ── */}
      <div className="flex flex-col justify-center px-8 md:px-12 py-20">

        {/* Eyebrow */}
        <p className="animate-reveal-up font-body text-[12px] text-accent uppercase tracking-[0.15em] mb-5">
          Mar del Plata · Tecnología importada
        </p>

        {/* H1 */}
        <h1 className="animate-reveal-up-1 font-display font-extrabold text-[38px] md:text-[68px] leading-[1.0] text-navy">
          <span className="block">Tecnología</span>
          <span className="block">importada,</span>
          <span className="block">al precio</span>
          <span className="block">justo.</span>
        </h1>

        {/* Subtítulo */}
        <p className="animate-reveal-up-2 font-body font-light text-base text-[#4A5568] max-w-[400px] leading-relaxed mt-5">
          Celulares, notebooks, auriculares y accesorios con garantía real.
          Enviamos a todo el país.
        </p>

        {/* Botones */}
        <div className="animate-reveal-up-3 flex flex-wrap gap-3 mt-8">
          <Link
            href="/catalogo"
            className="font-display font-semibold text-sm text-white bg-navy rounded-full px-7 py-3.5
                       transition-colors duration-200 hover:bg-accent"
          >
            Ver catálogo →
          </Link>
          <Link
            href="/contacto"
            className="font-display font-semibold text-sm text-navy bg-transparent
                       border-[1.5px] border-blue-border rounded-full px-7 py-3.5
                       transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Contactanos
          </Link>
        </div>

        {/* Badge de confianza */}
        <div className="animate-reveal-up-4 flex flex-wrap gap-4 mt-6">
          {['✓ +500 ventas', '✓ Garantía real', '✓ Envíos a todo el país'].map((item) => (
            <span key={item} className="font-body font-light text-[12px] text-[#6B7280]">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Columna derecha: imagen con parallax ── */}
      <div className="hidden md:flex items-center justify-center py-12">
        <div ref={imageRef}>
          <div className="animate-float flex items-center justify-center">
            {/*
              Imagen del iPhone importado.
              Reemplazar por PNG con fondo transparente para mejor resultado visual.
              Fuente actual: /Iphone.jpg
            */}
            <div className="relative w-[240px] h-[480px] drop-shadow-2xl">
              <Image
                src="/Iphone.jpg"
                alt="iPhone importado — importadosmdp"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
