'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroParticles = dynamic(
  () => import('@/app/components/HeroParticles'),
  { ssr: false }
)

const MapEmbed = dynamic(() => import('@/app/components/MapEmbed'), {
  ssr: false,
  loading: () => (
    <div style={{
      width:'100%', height:'360px',
      background:'rgba(255,255,255,0.05)',
      borderRadius:'16px',
      animation:'pulse 1.5s infinite'
    }}/>
  )
});

const featuredMocks = [
  { id:1, brand:'Apple', category:'Celulares', name:'iPhone 15 Pro Max', price:1350000, slug:'iphone-15-pro-max', badge:'Nuevo', bgColor:'#EEF1FD' },
  { id:2, brand:'Samsung', category:'Celulares', name:'Samsung Galaxy S24 Ultra', price:980000, slug:'samsung-galaxy-s24-ultra', badge:'Popular', bgColor:'#EEF1FD' },
  { id:3, brand:'Apple', category:'Notebooks', name:'MacBook Pro 14" M3', price:1750000, slug:'macbook-pro-m3', badge:'Nuevo', bgColor:'#EDF7F2' },
  { id:4, brand:'Apple', category:'Audio', name:'AirPods Pro (2da gen)', price:250000, slug:'airpods-pro-2', badge:'Popular', bgColor:'#FDF5EE' },
  { id:5, brand:'JBL', category:'Audio', name:'Parlante JBL Flip 6', price:130000, slug:'jbl-flip-6', badge:null, bgColor:'#FDF5EE' },
];

export default function Home() {
  const containerRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], ['0px', '-80px']);

  return (
    <div className="min-h-screen bg-[#F0F4FF] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#F0F4FF]/90 backdrop-blur border-b border-[#C7D4FF] h-[64px] flex items-center px-6 md:px-20 justify-between">
        <Link href="/" className="font-display font-extrabold text-[18px] text-[#1A2580]">
          importados<span className="text-[#5A72ED]">mdp</span>
        </Link>
        <div className="flex items-center gap-[32px]">
          <Link href="/catalogo" className="font-body font-normal text-[14px] text-[#1A2580] hover:text-[#5A72ED] transition-colors duration-150">
            Catálogo
          </Link>
          <Link href="/contacto" className="font-body font-normal text-[14px] text-[#1A2580] hover:text-[#5A72ED] transition-colors duration-150">
            Contacto
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="min-h-[calc(100vh-64px)]"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 80px',
          width: '100%',
        }}
      >
        <div>
          <p className="font-body font-normal text-[12px] text-[#5A72ED] uppercase tracking-[0.15em] mb-[20px] opacity-0 animate-reveal-up [animation-delay:0ms]">
            Mar del Plata · Tecnología importada
          </p>
          <h1 className="font-display font-extrabold text-[36px] lg:text-[68px] text-[#1A2580] leading-[1.0] opacity-0 animate-reveal-up [animation-delay:100ms]">
            <span className="block">Tecnología</span>
            <span className="block">importada,</span>
            <span className="block">al precio</span>
            <span className="block">justo.</span>
          </h1>
          <p className="font-body font-light text-[16px] text-[#4A5568] max-w-[400px] leading-[1.65] mt-[20px] opacity-0 animate-reveal-up [animation-delay:200ms]">
            Celulares, notebooks, auriculares y accesorios con garantía real. Enviamos a todo el país.
          </p>
          
          <div className="mt-[32px] flex flex-wrap gap-[12px] opacity-0 animate-reveal-up [animation-delay:300ms]">
            <Link href="/catalogo" className="bg-[#1A2580] text-white font-display font-semibold text-[14px] rounded-full px-[28px] py-[14px] border-none hover:bg-[#5A72ED] transition-colors duration-200">
              Ver catálogo →
            </Link>
            <Link href="/contacto" className="bg-transparent border-[1.5px] border-[#C7D4FF] text-[#1A2580] font-display font-semibold text-[14px] rounded-full px-[28px] py-[14px] hover:border-[#5A72ED] hover:text-[#5A72ED] transition-colors duration-200">
              Contactanos
            </Link>
          </div>

          <div className="mt-[28px] flex flex-wrap gap-[20px] bg-white rounded-full px-[20px] py-[10px] border border-[#C7D4FF] w-fit font-body text-[12px] font-normal text-[#4A5568] opacity-0 animate-reveal-up [animation-delay:400ms]">
            <span><span className="text-[#5A72ED]">✓</span> +500 ventas</span>
            <span>·</span>
            <span><span className="text-[#5A72ED]">✓</span> Garantía real</span>
            <span>·</span>
            <span><span className="text-[#5A72ED]">✓</span> Envíos a todo el país</span>
          </div>
        </div>

        {/* COLUMNA DERECHA - MOCKUP PARALLAX */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '520px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
            borderRadius: '24px',
          }}
        >
          {/* Partículas interactivas en el fondo */}
          <HeroParticles />

          {/* Celular encima con z-index superior */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <motion.div style={{ y: phoneY }}>
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -18, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
                >
                  {/* PRESENTACIÓN MULTIDISPOSITIVO */}
                  <div className="relative flex items-center justify-center w-full">
                    <Image
                      src="/images/mockup-triple.png"
                      alt="ImportadosMDP Multidispositivo"
                      width={800}
                      height={500}
                      priority
                      className="w-full max-w-[500px] lg:max-w-[650px] xl:max-w-[750px] h-auto object-contain hover:scale-105 transition-transform duration-700"
                      style={{ filter: 'drop-shadow(0 40px 80px rgba(26,37,128,0.2))' }}
                    />

                    {/* Badge Flotante 1: En línea ahora */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.5, ease: 'backOut' }}
                      style={{ position: 'absolute', top: '10%', right: '-10px', background: 'white', border: '1px solid #C7D4FF', borderRadius: '12px', padding: '8px 12px', boxShadow: '0 8px 24px rgba(90,114,237,0.15)', zIndex: 20, display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366', animation: 'pulse 2s infinite' }} />
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#1A2580', fontFamily: 'var(--font-body)' }}>En línea ahora</span>
                    </motion.div>

                    {/* Badge Flotante 2: Calificación */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.5, ease: 'backOut' }}
                      style={{ position: 'absolute', bottom: '10%', left: '-10px', background: '#FFFFFF', border: '1px solid #C7D4FF', borderRadius: '12px', padding: '8px 14px', boxShadow: '0 8px 24px rgba(90,114,237,0.12)', zIndex: 20, display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <span style={{ fontSize: '14px' }}>⭐</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1A2580', fontFamily: 'var(--font-display)', lineHeight: 1 }}>4.9 / 5.0</span>
                        <span style={{ fontSize: '8px', color: '#6B7280', fontWeight: 500 }}>+500 reseñas</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="bg-white px-6 lg:px-[80px] py-10 lg:py-20">
        <h2 className="font-display font-bold text-[28px] text-[#1A2580] mb-[8px]">Productos destacados</h2>
        <p className="font-body text-[15px] text-[#6B7280] mb-[40px]">Los equipos más buscados del momento.</p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-[16px]">
          {featuredMocks.map(product => (
            <div key={product.id} className="bg-white border border-[#E0E8FF] rounded-[16px] overflow-hidden transition-all duration-200 cursor-pointer hover:border-[#C7D4FF] hover:shadow-[0_12px_32px_rgba(90,114,237,0.12)] hover:-translate-y-1">
              <div className="relative h-[160px] w-full flex items-center justify-center" style={{ backgroundColor: product.bgColor }}>
                {product.badge && (
                  <span className={`absolute top-2 left-2 text-[10px] font-semibold px-[8px] py-[3px] rounded-full z-10 ${product.badge === 'Nuevo' ? 'bg-[#EEF1FD] text-[#3D52C4]' : 'bg-[#FDF5EE] text-[#92400E]'}`}>
                    {product.badge}
                  </span>
                )}
                <Image 
                  src={
                    product.id === 1 ? 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80' :
                    product.id === 2 ? 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&q=80' :
                    product.id === 3 ? 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80' :
                    product.id === 4 ? 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&q=80' :
                    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80'
                  } 
                  alt={product.name} 
                  fill 
                  className="object-cover mix-blend-multiply opacity-90 p-4" 
                />
              </div>

              <div className="p-[14px]">
                <p className="font-body text-[10px] font-semibold text-[#5A72ED] uppercase tracking-[0.05em] mb-[4px] truncate">
                  {product.brand} · {product.category}
                </p>
                <h3 className="font-display font-semibold text-[14px] text-[#1A2580] leading-[1.3] mb-[12px] line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-display font-bold text-[15px] text-[#1A2580]">
                    {product.price.toLocaleString('es-AR', {style:'currency', currency:'ARS', minimumFractionDigits:0})}
                  </span>
                  <Link href={`/catalogo/${product.slug}`} className="w-[32px] h-[32px] bg-[#1A2580] text-white rounded-[8px] flex justify-center items-center text-[13px] hover:bg-[#5A72ED] transition-colors duration-150">
                    →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/catalogo" className="block mx-auto mt-[40px] font-display font-semibold text-[14px] text-[#1A2580] bg-transparent border-[1.5px] border-[#C7D4FF] rounded-full px-[28px] py-[12px] w-fit hover:border-[#5A72ED] hover:text-[#5A72ED] transition-colors">
          Ver catálogo completo →
        </Link>
      </section>

      {/* CARDS DE ACCESO RÁPIDO */}
      <section className="bg-[#F0F4FF] px-6 py-10 lg:py-20 lg:px-20">
        <div className="max-w-[1100px] mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

          {/* Card 1 — Catálogo */}
          <Link href="/catalogo" className="group bg-white border border-[#C7D4FF] rounded-[20px] p-[32px] lg:px-[28px] transition-all duration-250 block hover:bg-[#E0E8FF] hover:border-[#5A72ED] hover:-translate-y-[6px]">
            <h4 className="font-display font-extrabold text-[52px] text-[#5A72ED] leading-[1] mb-[4px]">+60</h4>
            <p className="font-body font-light text-[12px] text-[#6B7280] mb-[20px]">productos disponibles</p>
            <hr className="border-[#E0E8FF] mb-[20px]"/>
            <svg className="w-[24px] h-[24px] text-[#5A72ED] mb-[10px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <h5 className="font-display font-bold text-[18px] text-[#1A2580] mb-[8px]">Catálogo completo</h5>
            <p className="font-body text-[14px] text-[#4A5568] leading-[1.5] mb-[16px]">Celulares, notebooks, auriculares y accesorios.</p>
            <span className="font-body text-[13px] font-medium text-[#5A72ED] group-hover:text-[#3D52C4]">Ver productos →</span>
          </Link>

          {/* Card 2 — Reseñas */}
          <Link href="/resenas" style={{ textDecoration: 'none' }}>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #C7D4FF',
                borderRadius: '20px',
                padding: '32px 28px',
                cursor: 'pointer',
                transition: 'all 250ms ease',
                height: '100%',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#E0E8FF'
                e.currentTarget.style.borderColor = '#5A72ED'
                e.currentTarget.style.transform = 'translateY(-6px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#FFFFFF'
                e.currentTarget.style.borderColor = '#C7D4FF'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '52px', color: '#5A72ED', lineHeight: 1, marginBottom: '4px' }}>
                4.9★
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: '#6B7280', marginBottom: '20px' }}>
                calificación promedio
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #E0E8FF', marginBottom: '20px' }} />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '10px' }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#5A72ED" />
              </svg>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: '#1A2580', marginBottom: '8px' }}>
                Lo que dicen nuestros clientes
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#4A5568', lineHeight: 1.5, marginBottom: '16px' }}>
                Más de 500 ventas en Mar del Plata.
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: '#5A72ED' }}>
                Leer reseñas →
              </span>
            </div>
          </Link>

          {/* Card 3 — Contacto */}
          <Link href="/contacto" className="group bg-white border border-[#C7D4FF] rounded-[20px] p-[32px] lg:px-[28px] transition-all duration-250 block hover:bg-[#E0E8FF] hover:border-[#5A72ED] hover:-translate-y-[6px]">
            <h4 className="font-display font-extrabold text-[52px] text-[#5A72ED] leading-[1] mb-[4px]">&lt;3hs</h4>
            <p className="font-body font-light text-[12px] text-[#6B7280] mb-[20px]">tiempo de respuesta</p>
            <hr className="border-[#E0E8FF] mb-[20px]"/>
            <svg className="w-[24px] h-[24px] text-[#5A72ED] mb-[10px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <h5 className="font-display font-bold text-[18px] text-[#1A2580] mb-[8px]">Hablemos</h5>
            <p className="font-body text-[14px] text-[#4A5568] leading-[1.5] mb-[16px]">WhatsApp e Instagram. Atención personalizada.</p>
            <span className="font-body text-[13px] font-medium text-[#5A72ED] group-hover:text-[#3D52C4]">Contactanos →</span>
          </Link>

        </div>
      </section>

      {/* RESEÑAS / TESTIMONIOS */}
      <section id="resenas" className="bg-white px-6 py-12 lg:py-24 lg:px-[80px]">
        
        {/* HEADER TIPO LAYOUT FOTO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[48px] gap-6 max-w-[1200px] mx-auto">
          <div>
            <p className="font-body text-[12px] font-semibold text-[#5A72ED] uppercase tracking-[0.2em] mb-[8px]">
              Lo que dicen
            </p>
            <h2 className="font-display font-extrabold text-[44px] lg:text-[64px] text-[#1A2580] leading-[0.9] tracking-tight uppercase">
              Reseñas
            </h2>
          </div>

          <div className="flex flex-col items-end gap-[12px]">
            {/* Botones de navegación del carrusel */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={scrollLeft}
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #C7D4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 150ms ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#5A72ED'; e.currentTarget.style.borderColor = '#5A72ED'; (e.currentTarget.querySelector('svg') as SVGElement | null)?.setAttribute('stroke', 'white'); }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#C7D4FF'; (e.currentTarget.querySelector('svg') as SVGElement | null)?.setAttribute('stroke', '#1A2580'); }}
                aria-label="Anterior"
              >
                <svg width="16" height="16" fill="none" stroke="#1A2580" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button
                onClick={scrollRight}
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #C7D4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 150ms ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#5A72ED'; e.currentTarget.style.borderColor = '#5A72ED'; (e.currentTarget.querySelector('svg') as SVGElement | null)?.setAttribute('stroke', 'white'); }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#C7D4FF'; (e.currentTarget.querySelector('svg') as SVGElement | null)?.setAttribute('stroke', '#1A2580'); }}
                aria-label="Siguiente"
              >
                <svg width="16" height="16" fill="none" stroke="#1A2580" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>

            <div className="flex items-center gap-[20px] bg-white border border-[#E0E8FF] shadow-[0_8px_32px_rgba(90,114,237,0.08)] rounded-[20px] p-[20px]">
            <div className="pr-[20px] border-r border-[#E0E8FF]">
              <div className="flex gap-[3px] mb-[6px] justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-[18px] h-[18px] text-[#FBBF24] fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ))}
              </div>
              <p className="font-display font-bold text-[28px] text-[#1A2580] text-center leading-[1] mb-[4px]">4.9</p>
              <p className="font-body text-[10px] text-[#6B7280] uppercase tracking-wider text-center font-medium">+500 VENTAS</p>
            </div>
            <div>
              <p className="font-body text-[12px] text-[#4A5568] mb-[6px]">Calificado en</p>
              <div className="flex items-center gap-[6px] mb-[8px]">
                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span className="font-display font-bold text-[16px] text-[#1A2580]">Google</span>
              </div>
              <a href="#" className="font-body text-[12px] font-medium text-[#5A72ED] hover:underline flex items-center gap-[4px]">
                Ver todas <svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-[20px] pb-8 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-[80px] max-w-[1360px] xl:mx-auto">
          {[
            { id: 1, name: "Martina G.", location: "Villa Gesell", time: "Hace 2 semanas", com: "Compré el iPhone 15 Pro, me lo entregaron en caja sellada y con funda de regalo. ¡Súper recomendados!", rating: 5 },
            { id: 2, name: "Lucas P.", location: "Buenos Aires", time: "Hace 1 mes", com: "El mejor precio de todo Mar del Plata. Excelente atención por WhatsApp. Respuesta rapidísima.", rating: 5 },
            { id: 3, name: "Sofía R.", location: "Villa Gesell", time: "Hace 3 semanas", com: "Trajeron el parlante JBL que buscaba hace meses. Muy atentos y con garantía oficial.", rating: 5 },
            { id: 4, name: "Tomás V.", location: "Mar del Plata", time: "Hace 1 semana", com: "Entrega en el día, me ayudaron a pasar los datos de mi celu viejo al nuevo teléfono. Unos cracks.", rating: 5 },
            { id: 5, name: "Agustín P.", location: "Miramar", time: "Hace 2 meses", com: "Todo de 10. Pasé a retirar por su oficina y la calidad técnica de los chicos es de primera.", rating: 5 },
          ].map((review) => (
            <div key={review.id} className="min-w-[85vw] sm:min-w-[340px] max-w-[380px] snap-center bg-white border border-[#E0E8FF] shadow-[0_12px_40px_rgba(90,114,237,0.06)] rounded-[24px] p-[32px] flex flex-col justify-between hover:border-[#C7D4FF] transition-all duration-300">
              <div>
                <div className="flex gap-[4px] mb-[24px]">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-[18px] h-[18px] text-[#FBBF24] fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  ))}
                </div>
                <p className="font-body text-[15px] text-[#4A5568] leading-[1.7] mb-[40px]">
                  "{review.com}"
                </p>
              </div>
              <div className="flex justify-between items-end mt-auto pt-[20px] border-t border-[#EEF1FD]">
                <div>
                  <h5 className="font-display font-bold text-[16px] text-[#1A2580] mb-[2px]">
                    {review.name}
                  </h5>
                  <p className="font-body text-[13px] text-[#6B7280]">
                    {review.location}
                  </p>
                </div>
                <p className="font-body text-[12px] text-[#6B7280]">
                  {review.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAPA + INFO */}
      <section className="bg-[#1A2580] px-6 lg:px-[80px] py-12 lg:py-20">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-14">
          
          <div>
            <p className="font-body font-medium text-[11px] text-[#C7D4FF] uppercase tracking-[0.15em] mb-[14px]">
              Encontranos
            </p>
            <h2 className="font-display font-bold text-[26px] text-white leading-[1.2] mb-[28px]">
              Estamos en el corazón de MDP
            </h2>
            
            <div className="flex flex-col mb-[18px]">
              {[
                { icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>, text: 'Jujuy 1811, Mar del Plata, Buenos Aires' },
                { icon: <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>, text: 'Lunes a Sábado, 10:00 a 20:00hs' },
                { icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>, text: 'WhatsApp: consultar por DM' },
                { icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>, text: '@importadosmdp_ en Instagram' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-[12px] items-start mb-[18px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" style={{ flexShrink: 0 }} className="text-[#C7D4FF]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  </div>
                  <p className="font-body text-[14px] text-[#C7D4FF] leading-[1.4] mt-[6px]">{item.text}</p>
                </div>
              ))}
            </div>

            <Link href="/contacto" className="inline-block mt-[8px] bg-transparent border-[1.5px] border-[#5A72ED] text-[#5A72ED] font-display font-semibold text-[13px] rounded-full px-[22px] py-[10px] hover:bg-[#5A72ED] hover:text-white transition-colors duration-200 w-fit">
              Cómo llegar →
            </Link>
          </div>

          <div className="w-full">
            <MapEmbed />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D1445] px-6 lg:px-[80px] py-8 lg:py-12 flex flex-col lg:flex-row justify-between items-center gap-[16px]">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Link href="/" className="font-display font-extrabold text-[18px] text-white">
            importados<span className="text-[#5A72ED]">mdp</span>
          </Link>
          <p className="font-body text-[12px] text-[#6B7280] mt-[4px]">© 2025 · Mar del Plata, Argentina</p>
        </div>
        
        <div className="flex gap-[24px]">
          <a href="https://instagram.com/importadosmdp_" target="_blank" className="font-body text-[13px] text-[#C7D4FF] hover:text-white transition-colors duration-150">Instagram</a>
          <a href="https://wa.me/..." target="_blank" className="font-body text-[13px] text-[#C7D4FF] hover:text-white transition-colors duration-150">WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}
