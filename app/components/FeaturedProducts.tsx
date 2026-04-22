import Link from 'next/link'
import { products as mockProducts, Product } from '../../data/products'
import { supabase } from '../../utils/supabase/client'
import ProductCard from './ProductCard'

export default async function FeaturedProducts() {
  let featured: Product[] = []

  if (supabase) {
    const { data, error } = await supabase.from('products').select('*').eq('isFeatured', true).limit(5)
    if (!error && data && data.length > 0) {
      featured = data as Product[]
    } else {
      featured = mockProducts.filter(p => p.isFeatured).slice(0, 5)
    }
  } else {
    featured = mockProducts.filter(p => p.isFeatured).slice(0, 5)
  }

  return (
    <section className="bg-white py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-3">
              Lo más buscado
            </p>
            <h2 className="font-display font-black text-[36px] md:text-[44px] text-navy leading-tight tracking-tight">
              Productos<br className="hidden sm:block" /> destacados
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="font-body font-bold text-sm text-accent hover:text-accent-mid transition-colors duration-200 flex items-center gap-1.5 mb-1"
          >
            Ver todos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              category={product.category}
              price={product.price}
              discountPrice={product.discountPrice}
              imageUrl={product.imageUrl}
              badge={product.isFeatured ? (i === 0 ? 'Nuevo' : i < 3 ? 'Popular' : null) : null}
              index={i}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 font-body font-bold text-sm text-navy border-2 border-navy rounded-full px-8 py-3 hover:bg-navy hover:text-white transition-all duration-300 hover:shadow-md"
          >
            Ver catálogo completo →
          </Link>
        </div>
      </div>
    </section>
  )
}
