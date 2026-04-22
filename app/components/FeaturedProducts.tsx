import Image from 'next/image';
import Link from 'next/link';
import { products as mockProducts, Product } from '../../data/products';
import { supabase } from '../../utils/supabase/client';

export default async function FeaturedProducts() {
  let featured: Product[] = [];

  if (supabase) {
    const { data, error } = await supabase.from('products').select('*').eq('isFeatured', true).limit(5);
    if (!error && data && data.length > 0) {
      featured = data as Product[];
    } else {
      featured = mockProducts.filter(p => p.isFeatured).slice(0, 5);
    }
  } else {
    featured = mockProducts.filter(p => p.isFeatured).slice(0, 5);
  }

  return (
    <section className="bg-white py-20 px-6 relative z-10 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-navy-deep tracking-tight">Productos Destacados</h2>
          <p className="font-body text-gray-500 mt-4 max-w-xl mx-auto text-lg">
            Descubre los equipos más buscados y elegidos por nuestros clientes en este momento.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {featured.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)] transition-all duration-[400ms] group flex flex-col hover:shadow-[0_8px_25px_rgb(0,0,0,0.08)] hover:border-accent hover:-translate-y-1"
            >
              <div className="relative w-full h-32 md:h-40 bg-gray-50 flex items-center justify-center p-3">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500 rounded-t-xl p-3"
                />
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-accent tracking-wider uppercase mb-1">
                  {product.brand}
                </span>
                <h3 className="font-display font-black text-sm md:text-base text-navy-deep mb-1 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="mt-auto pt-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="font-display font-black text-lg md:text-xl text-navy-deep">
                    ${product.price.toLocaleString('es-AR')}
                  </span>
                  <Link 
                    href={`/catalogo/${product.id}`}
                    className="bg-navy-deep text-white px-3 py-1.5 rounded-full font-body font-bold text-xs hover:bg-accent transition-colors duration-300 text-center"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/catalogo"
            className="inline-block bg-white text-navy font-body font-bold border-2 border-navy px-8 py-3 rounded-full hover:bg-navy hover:text-white transition-colors hover:shadow-md"
          >
            Ver catálogo completo →
          </Link>
        </div>
      </div>
    </section>
  )
}
