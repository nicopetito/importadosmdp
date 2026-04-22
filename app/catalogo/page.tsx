'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const productos = [
  // Celulares
  { id:1, brand:'Apple', category:'Celulares',
    name:'iPhone 15 Pro Max', price:1350000,
    slug:'iphone-15-pro-max', badge:'Nuevo',
    bgColor:'#EEF1FD',
    image:'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80' },

  { id:2, brand:'Samsung', category:'Celulares',
    name:'Samsung Galaxy S24 Ultra', price:980000,
    slug:'samsung-galaxy-s24-ultra', badge:'Popular',
    bgColor:'#EEF1FD',
    image:'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&q=80' },

  { id:3, brand:'Xiaomi', category:'Celulares',
    name:'Xiaomi Redmi Note 13 Pro', price:480000,
    slug:'xiaomi-redmi-note-13-pro', badge:null,
    bgColor:'#EEF1FD',
    image:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80' },

  // Notebooks
  { id:4, brand:'Apple', category:'Notebooks',
    name:'MacBook Pro 14" M3', price:1750000,
    slug:'macbook-pro-14-m3', badge:'Nuevo',
    bgColor:'#EDF7F2',
    image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80' },

  { id:5, brand:'Apple', category:'Notebooks',
    name:'MacBook Air 13" M2', price:1100000,
    slug:'macbook-air-13-m2', badge:'Popular',
    bgColor:'#EDF7F2',
    image:'https://images.unsplash.com/photo-1611186871525-7b786b5bbada?w=300&q=80' },

  { id:6, brand:'Lenovo', category:'Notebooks',
    name:'ThinkPad E16 i7', price:890000,
    slug:'thinkpad-e16-i7', badge:null,
    bgColor:'#EDF7F2',
    image:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80' },

  // Auriculares
  { id:7, brand:'Apple', category:'Auriculares',
    name:'AirPods Pro (2da gen)', price:250000,
    slug:'airpods-pro-2da-gen', badge:'Popular',
    bgColor:'#FDF5EE',
    image:'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&q=80' },

  { id:8, brand:'Sony', category:'Auriculares',
    name:'WH-1000XM5', price:360000,
    slug:'sony-wh-1000xm5', badge:null,
    bgColor:'#FDF5EE',
    image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80' },

  { id:9, brand:'JBL', category:'Auriculares',
    name:'JBL Tune 770NC', price:115000,
    slug:'jbl-tune-770nc', badge:null,
    bgColor:'#FDF5EE',
    image:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80' },

  // Accesorios
  { id:10, brand:'Apple', category:'Accesorios',
    name:'Apple Watch Series 9', price:780000,
    slug:'apple-watch-series-9', badge:'Nuevo',
    bgColor:'#F5EEFB',
    image:'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80' },

  { id:11, brand:'Apple', category:'Accesorios',
    name:'iPad Pro 11" M2', price:850000,
    slug:'ipad-pro-11-m2', badge:null,
    bgColor:'#F5EEFB',
    image:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80' },

  { id:12, brand:'Samsung', category:'Accesorios',
    name:'Galaxy Watch 6 Classic', price:420000,
    slug:'galaxy-watch-6-classic', badge:null,
    bgColor:'#F5EEFB',
    image:'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=80' },
];

const filtros = ["Todos", "Celulares", "Notebooks", "Auriculares", "Accesorios"];

export default function CatalogoPage() {
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter(p => {
    const matchCategoria = filtroActivo === 'Todos' || p.category === filtroActivo;
    const matchBusqueda = busqueda === '' || 
      p.name.toLowerCase().includes(busqueda.toLowerCase()) || 
      p.brand.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  const getEmojiFallback = (category: string) => {
    switch (category) {
      case 'Celulares': return '📱';
      case 'Notebooks': return '💻';
      case 'Auriculares': return '🎧';
      case 'Accesorios': return '⌚';
      default: return '📦';
    }
  };

  const renderProductCard = (producto: typeof productos[0]) => (
    <Link 
      href={`/catalogo/${producto.slug}`} 
      key={producto.id} 
      className="bg-white border border-[#E0E8FF] rounded-[16px] overflow-hidden transition-all duration-200 cursor-pointer block hover:-translate-y-[4px] hover:shadow-[0_12px_32px_rgba(90,114,237,0.12)] hover:border-[#C7D4FF]"
    >
      {/* 1. ÁREA DE IMAGEN */}
      <div 
        className="h-[180px] w-full flex items-center justify-center relative" 
        style={{ backgroundColor: producto.bgColor }}
      >
        {producto.badge && (
          <span 
            className={`absolute top-[8px] left-[8px] text-[10px] font-semibold px-[8px] py-[3px] rounded-full z-10 ${
              producto.badge === 'Nuevo' ? 'bg-[#EEF1FD] text-[#3D52C4]' : 'bg-[#FDF3E3] text-[#92400E]'
            }`}
          >
            {producto.badge}
          </span>
        )}
        <Image 
          src={producto.image}
          alt={producto.name}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-contain p-[16px]"
          // Fallback en caso de error
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
            if (target.parentElement) {
              const fallback = document.createElement('div');
              fallback.className = 'text-[64px] absolute inset-0 flex items-center justify-center opacity-40';
              fallback.innerHTML = getEmojiFallback(producto.category);
              target.parentElement.appendChild(fallback);
            }
          }}
        />
      </div>

      {/* 2. INFO DEL PRODUCTO */}
      <div className="p-[14px]">
        <p className="font-body text-[10px] font-semibold text-[#5A72ED] uppercase tracking-[0.04em] mb-[4px]">
          {producto.brand} · {producto.category}
        </p>
        <h3 className="font-display font-semibold text-[13px] text-[#1A2580] leading-[1.3] mb-[14px] min-h-[34px] line-clamp-2">
          {producto.name}
        </h3>
        
        <div className="flex justify-between items-center">
          <span className="font-display font-bold text-[15px] text-[#1A2580]">
            {new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 0
            }).format(producto.price)}
          </span>
          <div className="w-[30px] h-[30px] bg-[#1A2580] text-white rounded-[8px] flex justify-center items-center text-[14px] shrink-0 group-hover:bg-[#5A72ED] transition-colors duration-150">
            →
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#F0F4FF] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#F0F4FF]/90 backdrop-blur border-b border-[#C7D4FF] h-[64px] flex items-center px-6 md:px-20 justify-between">
        <Link href="/" className="font-display font-extrabold text-[18px] text-[#1A2580]">
          importados<span className="text-[#5A72ED]">mdp</span>
        </Link>
        <div className="flex items-center gap-[32px]">
          <Link href="/catalogo" className="font-body font-medium text-[14px] text-[#5A72ED] transition-colors duration-150">
            Catálogo
          </Link>
          <Link href="/contacto" className="font-body font-normal text-[14px] text-[#1A2580] hover:text-[#5A72ED] transition-colors duration-150">
            Contacto
          </Link>
        </div>
      </nav>

      {/* CABECERA */}
      <header className="bg-[#F0F4FF] px-6 py-10 md:px-[80px] md:pt-[60px] md:pb-[40px]">
        <p className="font-body text-[11px] font-medium text-[#5A72ED] uppercase tracking-[0.15em] mb-[12px]">
          Tecnología importada · Mar del Plata
        </p>
        <h1 className="font-display font-extrabold text-[32px] md:text-[52px] text-[#1A2580] leading-[1.0] mb-[12px]">
          Catálogo
        </h1>
        <p className="font-body font-normal text-[16px] text-[#4A5568] mb-0">
          Todos nuestros productos con garantía real.
        </p>
      </header>

      {/* BARRA DE FILTROS */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-[#E0E8FF] px-6 py-4 md:px-[80px] md:py-[20px] flex flex-wrap gap-[8px] items-center">
        <span className="font-body text-[12px] text-[#6B7280] mr-[4px]">Filtrar:</span>
        {filtros.map(f => (
          <button
            key={f}
            onClick={() => setFiltroActivo(f)}
            className={`font-body text-[13px] rounded-full px-[16px] py-[6px] transition-all duration-150 ${
              filtroActivo === f 
                ? 'bg-[#1A2580] border border-[#1A2580] text-white font-medium' 
                : 'bg-[#F0F4FF] border border-[#C7D4FF] text-[#4A5568] font-normal hover:bg-[#E0E8FF] hover:border-[#5A72ED]'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto font-body text-[13px] text-[#6B7280]">
          {productosFiltrados.length} productos
        </span>
      </div>

      {/* SECCIÓN DESTACADOS (solo visible si filtro es "Todos") */}
      {filtroActivo === 'Todos' && busqueda === '' && (
        <section className="bg-white px-6 pt-[32px] md:px-[80px] md:pt-[48px]">
          <h2 className="font-display font-bold text-[20px] text-[#1A2580] mb-[24px]">Más buscados</h2>
          {/* Scroll horizontal mobile, Grid en desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-[16px] pb-4 md:pb-0 md:grid md:grid-cols-5 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {productos.slice(0, 5).map(producto => (
              <div key={producto.id} className="min-w-[70vw] snap-center sm:min-w-[280px] md:min-w-0">
                {renderProductCard(producto)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECCIÓN PRINCIPAL: TODOS LOS PRODUCTOS */}
      <section className="bg-[#F0F4FF] px-6 py-[32px] md:px-[80px] md:py-[48px]">
        <h2 className="font-display font-bold text-[20px] text-[#1A2580] mb-[24px]">
          {filtroActivo === 'Todos' ? 'Explorar todo el catálogo' : filtroActivo}
        </h2>

        {/* Barra de búsqueda */}
        <div className="relative w-full max-w-[480px] mb-[24px]">
          <svg className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#6B7280]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Buscar iPhone, Mac, teclado..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full h-[44px] bg-white border border-[#C7D4FF] rounded-full pl-[44px] pr-[20px] font-body text-[14px] text-[#1A2580] focus:border-[#5A72ED] focus:outline-none transition-colors placeholder:text-[#6B7280]"
          />
        </div>

        {/* Grid principal */}
        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[16px]">
            {productosFiltrados.map(producto => renderProductCard(producto))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="font-body text-[#4A5568] text-[16px] mb-[16px]">No encontramos productos para tu búsqueda.</p>
            <button 
              onClick={() => { setFiltroActivo('Todos'); setBusqueda(''); }}
              className="bg-transparent border border-[#5A72ED] text-[#5A72ED] font-body font-medium text-[14px] rounded-full px-[24px] py-[10px] hover:bg-[#5A72ED] hover:text-white transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}
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
