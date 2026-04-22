'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products as mockProducts, Product } from '../../../data/products';
import { supabase } from '../../../utils/supabase/client';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price);

const getEmojiFallback = (cat: string) => {
  if (cat === 'Celulares') return '📱';
  if (cat === 'Notebooks') return '💻';
  if (cat === 'Audio') return '🎧';
  return '⌚';
};

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (supabase) {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (!error && data) {
          setProduct(data as Product);
          setLoading(false);
          return;
        }
      }
      const found = mockProducts.find(p => p.id === id);
      setProduct(found || null);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  // Reset image state when product changes
  useEffect(() => {
    setSelectedImage(0);
    setImgError(false);
  }, [product]);

  /* ─── LOADING ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center">
        <p className="font-display font-bold text-[20px] text-[#1A2580] animate-pulse">Cargando producto...</p>
      </div>
    );
  }

  /* ─── NOT FOUND ─── */
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F0F4FF] overflow-x-hidden">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 bg-[#F0F4FF]/90 backdrop-blur border-b border-[#C7D4FF] h-[64px] flex items-center px-6 md:px-20 justify-between">
          <Link href="/" className="font-display font-extrabold text-[18px] text-[#1A2580]">
            importados<span className="text-[#5A72ED]">mdp</span>
          </Link>
          <div className="flex items-center gap-[32px]">
            <Link href="/catalogo" className="font-body font-medium text-[14px] text-[#5A72ED] transition-colors duration-150">Catálogo</Link>
            <Link href="/contacto" className="font-body font-normal text-[14px] text-[#1A2580] hover:text-[#5A72ED] transition-colors duration-150">Contacto</Link>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6">
          <h1 className="font-display font-extrabold text-[32px] text-[#1A2580] mb-[24px]">Producto no encontrado</h1>
          <button
            onClick={() => router.push('/catalogo')}
            className="bg-transparent border-[1.5px] border-[#C7D4FF] text-[#1A2580] font-display font-semibold text-[14px] rounded-full px-[24px] py-[12px] hover:border-[#5A72ED] hover:text-[#5A72ED] transition-colors duration-200"
          >
            ← Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  /* ─── RELATED PRODUCTS ─── */
  const related = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const relatedProducts = related.length >= 2
    ? related
    : mockProducts.filter(p => p.id !== product.id).slice(0, 4);

  const message = encodeURIComponent(`Hola ImportadosMDP! Estoy interesado en: ${product.name}. ¿Me podrían dar más información?`);
  const whatsappLink = `https://wa.me/5492231234567?text=${message}`;

  const currentImageSrc = product.images?.[selectedImage] || product.imageUrl;

  return (
    <div className="min-h-screen bg-[#F0F4FF] overflow-x-hidden">

      {/* ═══ NAVBAR ═══ */}
      <nav className="sticky top-0 z-50 bg-[#F0F4FF]/90 backdrop-blur border-b border-[#C7D4FF] h-[64px] flex items-center px-6 md:px-20 justify-between">
        <Link href="/" className="font-display font-extrabold text-[18px] text-[#1A2580]">
          importados<span className="text-[#5A72ED]">mdp</span>
        </Link>
        <div className="flex items-center gap-[32px]">
          <Link href="/catalogo" className="font-body font-medium text-[14px] text-[#5A72ED] transition-colors duration-150">Catálogo</Link>
          <Link href="/contacto" className="font-body font-normal text-[14px] text-[#1A2580] hover:text-[#5A72ED] transition-colors duration-150">Contacto</Link>
        </div>
      </nav>

      {/* ═══ BREADCRUMB ═══ */}
      <div className="bg-[#F0F4FF] px-6 py-[16px] md:px-[80px] md:py-[24px]">
        <div className="max-w-[1100px] mx-auto flex items-center gap-[8px] font-body text-[13px]">
          <Link href="/" className="text-[#5A72ED] hover:underline">Inicio</Link>
          <span className="text-[#6B7280]">/</span>
          <Link href="/catalogo" className="text-[#5A72ED] hover:underline">Catálogo</Link>
          <span className="text-[#6B7280]">/</span>
          <span className="text-[#1A2580] font-medium">{product.name}</span>
        </div>
      </div>

      {/* ═══ CONTENIDO PRINCIPAL ═══ */}
      <section className="px-6 pb-[40px] md:px-[80px] md:pt-[16px] md:pb-[60px]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[48px] items-start">

          {/* ── COLUMNA IZQUIERDA: GALERÍA ── */}
          <div>
            {/* Imagen principal */}
            <div className="relative w-full bg-white border border-[#E0E8FF] rounded-[20px] overflow-hidden" style={{ aspectRatio: '1/1' }}>
              {!imgError ? (
                <Image
                  src={currentImageSrc}
                  alt={product.name}
                  fill
                  className="object-contain"
                  style={{ padding: '24px' }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[64px] opacity-40">
                  {getEmojiFallback(product.category)}
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-[8px] mt-[12px]">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImage(idx); setImgError(false); }}
                    className="relative w-[72px] h-[72px] rounded-[12px] overflow-hidden bg-white cursor-pointer transition-all duration-150"
                    style={{ border: `2px solid ${selectedImage === idx ? '#5A72ED' : '#E0E8FF'}` }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-contain"
                      style={{ padding: '6px' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── COLUMNA DERECHA: INFORMACIÓN ── */}
          <div>
            {/* Eyebrow */}
            <p className="font-body text-[11px] font-semibold text-[#5A72ED] uppercase tracking-[0.1em] mb-[8px]">
              {product.brand} · {product.category}
            </p>

            {/* Nombre */}
            <h1 className="font-display font-extrabold text-[26px] md:text-[32px] text-[#1A2580] leading-[1.1] mb-[16px]">
              {product.name}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-[8px] mb-[20px]">
              {product.inStock && (
                <span className="inline-flex items-center gap-[6px] bg-[#EDF7F2] text-[#059669] text-[11px] font-semibold px-[12px] py-[4px] rounded-full">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#059669]" />
                  En Stock
                </span>
              )}
              {product.hasDiscount && (
                <span className="bg-[#FDF3E3] text-[#92400E] text-[11px] font-semibold px-[12px] py-[4px] rounded-full">
                  Oferta
                </span>
              )}
            </div>

            {/* Precio */}
            <div className="mb-[24px]">
              {product.hasDiscount && product.discountPrice ? (
                <>
                  <span className="font-body text-[16px] text-[#6B7280] line-through mr-[12px]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-display font-extrabold text-[36px] text-[#1A2580]">
                    {formatPrice(product.discountPrice)}
                  </span>
                </>
              ) : (
                <span className="font-display font-extrabold text-[36px] text-[#1A2580]">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Separador */}
            <hr className="border-none border-t border-[#E0E8FF] mb-[24px]" style={{ borderTop: '1px solid #E0E8FF' }} />

            {/* Descripción */}
            <p className="font-body text-[15px] text-[#4A5568] leading-[1.7] mb-[32px]">
              {product.detailedDescription}
            </p>

            {/* Especificaciones */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-[32px]">
                <h3 className="font-display font-bold text-[16px] text-[#1A2580] mb-[16px]">Especificaciones</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="bg-[#F0F4FF] border border-[#E0E8FF] rounded-[12px] p-[14px_16px]">
                      <span className="block font-body text-[10px] text-[#6B7280] uppercase tracking-[0.05em]">{key}</span>
                      <span className="block font-body font-semibold text-[14px] text-[#1A2580] mt-[4px]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botón WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-[10px] text-white font-display font-bold text-[16px] rounded-[14px] py-[16px] transition-colors duration-200 hover:bg-[#1DA851]"
              style={{ background: '#25D366', border: 'none', cursor: 'pointer' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.01 2.014c-5.46 0-9.89 4.43-9.89 9.89 0 1.74.45 3.42 1.31 4.93L2 21.92l5.25-1.38c1.47.81 3.12 1.24 4.81 1.24 5.46 0 9.89-4.43 9.89-9.89 0-5.46-4.43-9.89-9.89-9.89zM12.01 19.86c-1.48 0-2.93-.4-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.32c-.82-1.3-1.25-2.8-1.25-4.34 0-4.46 3.63-8.09 8.09-8.09 4.46 0 8.09 3.63 8.09 8.09 0 4.46-3.63 8.09-8.09 8.09zM16.48 13.91c-.25-.12-1.45-.71-1.68-.8-.22-.08-.38-.12-.54.13-.16.25-.63.8-.77.96-.15.17-.3.19-.54.07-1.19-.57-2.3-1.65-3.01-2.92-.12-.22-.01-.33.1-.44.1-.1.22-.25.33-.38.11-.12.15-.2.22-.34.08-.15.04-.28-.02-.4-.06-.12-.54-1.31-.74-1.8-.2-.48-.41-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.23.23-.88.86-.88 2.09s.9 2.41 1.03 2.58c.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.45-.6 1.66-1.17.2-.58.2-.1.2-.58.15-.14.03-.26.22-.38z"/>
              </svg>
              Consultar por WhatsApp
            </a>
            <p className="font-body text-[12px] text-[#6B7280] text-center mt-[10px]">
              Te redirigiremos a WhatsApp para ofrecerte atención personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTOS RELACIONADOS ═══ */}
      <section className="bg-white px-6 py-[32px] md:px-[80px] md:py-[48px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-display font-bold text-[20px] text-[#1A2580] mb-[24px]">También te puede interesar</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px]">
            {relatedProducts.map(p => (
              <Link
                key={p.id}
                href={`/catalogo/${p.id}`}
                className="group bg-white border border-[#E0E8FF] rounded-[16px] overflow-hidden transition-all duration-200 cursor-pointer hover:border-[#C7D4FF] hover:shadow-[0_12px_32px_rgba(90,114,237,0.12)] hover:-translate-y-1 block"
              >
                {/* Imagen */}
                <div className="relative h-[160px] w-full flex items-center justify-center bg-[#F0F4FF]">
                  {p.isFeatured && (
                    <span className="absolute top-2 left-2 text-[10px] font-semibold px-[8px] py-[3px] rounded-full z-10 bg-[#EEF1FD] text-[#3D52C4]">
                      Destacado
                    </span>
                  )}
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    className="object-contain p-4"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                {/* Info */}
                <div className="p-[14px]">
                  <p className="font-body text-[10px] font-semibold text-[#5A72ED] uppercase tracking-[0.04em] mb-[4px] truncate">
                    {p.brand} · {p.category}
                  </p>
                  <h3 className="font-display font-semibold text-[13px] text-[#1A2580] leading-[1.3] mb-[14px] min-h-[34px] line-clamp-2">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-[15px] text-[#1A2580]">
                      {formatPrice(p.hasDiscount && p.discountPrice ? p.discountPrice : p.price)}
                    </span>
                    <div className="w-[30px] h-[30px] bg-[#1A2580] text-white rounded-[8px] flex justify-center items-center text-[14px] shrink-0 group-hover:bg-[#5A72ED] transition-colors duration-150">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
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
