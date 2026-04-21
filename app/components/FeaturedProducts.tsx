import Image from 'next/image';
import Link from 'next/link';
import { products } from '../../data/products';

export default function FeaturedProducts() {
  // Tomamos los 3 primeros productos como "destacados" para la demo
  const featured = products.slice(0, 3);

  return (
    <section className="bg-gray-50 py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy">Productos Destacados</h2>
          <p className="font-body text-gray-500 mt-3 max-w-xl mx-auto">
            Descubre los equipos más buscados y elegidos por nuestros clientes en este momento.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-[20px] overflow-hidden border border-blue-border shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col hover:-translate-y-1"
            >
              <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-accent tracking-wider uppercase mb-2">
                  {product.brand} - {product.category}
                </span>
                <h3 className="font-display font-bold text-xl text-navy mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="font-body text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-display font-extrabold text-2xl text-navy">
                    ${product.price}
                  </span>
                  <Link 
                    href={`/catalogo/${product.id}`}
                    className="bg-accent text-white px-5 py-2 rounded-full font-body font-semibold text-sm hover:bg-black transition-colors"
                  >
                    Ver detalles
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
