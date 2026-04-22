'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products as mockProducts, Product } from '../../../data/products';
import { supabase } from '../../../utils/supabase/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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
      
      // Fallback a los mock products
      const found = mockProducts.find(p => p.id === id);
      setProduct(found || null);
      setLoading(false);
    }
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-24 pb-20">
          <div className="font-display text-2xl text-navy animate-pulse">Cargando producto...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <h1 className="font-display text-4xl text-navy font-bold">Producto no encontrado</h1>
          <button 
            onClick={() => router.back()}
            className="mt-6 font-body text-accent underline"
          >
            Volver al catálogo
          </button>
        </main>
        <Footer />
      </>
    );
  }

  const message = encodeURIComponent(`Hola ImportadosMDP! Estoy interesado en el producto: ${product.name}. ¿Me podrían dar más información?`);
  const whatsappLink = `https://wa.me/5492231234567?text=${message}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          
          <button 
            onClick={() => router.back()}
            className="mb-8 font-body text-sm font-semibold text-gray-500 hover:text-accent flex items-center transition-colors"
          >
            ← Volver al catálogo
          </button>

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-blue-border p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Sección Imagen */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center p-8">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-4 mix-blend-multiply"
                  />
                </div>
              </div>

              {/* Sección Info */}
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <span className="text-sm font-bold text-accent tracking-wider uppercase">
                    {product.brand} - {product.category}
                  </span>
                  <h1 className="font-display font-extrabold text-4xl text-navy mt-2 mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <p className="font-display font-extrabold text-3xl text-navy">
                    ${product.price.toLocaleString('es-AR')}
                  </p>
                </div>

                <div className="mb-8">
                  <p className="font-body text-gray-600 leading-relaxed">
                    {product.detailedDescription}
                  </p>
                </div>

                {/* Especificaciones Clave */}
                <div className="mb-10">
                  <h3 className="font-display font-bold text-lg text-navy mb-4">Especificaciones principales</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-xl p-4 border border-blue-border">
                        <span className="block font-body text-xs text-gray-500 uppercase">{key}</span>
                        <span className="block font-body font-semibold text-navy text-sm mt-1">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón de Acción */}
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent hover:bg-black text-white py-4 rounded-xl font-body font-bold text-lg text-center transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.01 2.014c-5.46 0-9.89 4.43-9.89 9.89 0 1.74.45 3.42 1.31 4.93L2 21.92l5.25-1.38c1.47.81 3.12 1.24 4.81 1.24 5.46 0 9.89-4.43 9.89-9.89 0-5.46-4.43-9.89-9.89-9.89zM12.01 19.86c-1.48 0-2.93-.4-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.32c-.82-1.3-1.25-2.8-1.25-4.34 0-4.46 3.63-8.09 8.09-8.09 4.46 0 8.09 3.63 8.09 8.09 0 4.46-3.63 8.09-8.09 8.09zM16.48 13.91c-.25-.12-1.45-.71-1.68-.8-.22-.08-.38-.12-.54.13-.16.25-.63.8-.77.96-.15.17-.3.19-.54.07-1.19-.57-2.3-1.65-3.01-2.92-.12-.22-.01-.33.1-.44.1-.1.22-.25.33-.38.11-.12.15-.2.22-.34.08-.15.04-.28-.02-.4-.06-.12-.54-1.31-.74-1.8-.2-.48-.41-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.23.23-.88.86-.88 2.09s.9 2.41 1.03 2.58c.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.45-.6 1.66-1.17.2-.58.2-.1.2-.58.15-.14.03-.26.22-.38z"/>
                  </svg>
                  Consultar por WhatsApp
                </a>
                <p className="text-center font-body text-xs text-gray-400 mt-4">
                  Te redirigiremos a WhatsApp para ofrecerte atención personalizada.
                </p>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
