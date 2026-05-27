import MarqueeRow from './MarqueeRow'
import Link from 'next/link'

const brands = [
  'Apple',
  'Samsung',
  'Sony',
  'JBL',
  'Asus',
  'Lenovo',
  'Xiaomi',
  'Bose'
]

export default function BrandsMarquee() {
  return (
    <section className="bg-background border-y border-outline-variant/20 py-8 overflow-hidden">
      <div className="text-center mb-6">
        <p className="font-sans text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
          Marcas Oficiales
        </p>
      </div>
      
      <MarqueeRow gap={20} speed="45s">
        {brands.map((brand) => (
          <Link
            key={brand}
            href={`/catalogo?q=${brand}`}
            className="block bg-surface border border-outline-variant/30 rounded-[12px] px-6 py-3 flex items-center justify-center min-w-[120px] transition-all duration-300 hover:border-outline hover:shadow-sm cursor-pointer"
          >
            <span className="font-sans font-extrabold text-sm text-on-surface/50 hover:text-on-surface transition-colors duration-200 uppercase tracking-wider">
              {brand}
            </span>
          </Link>
        ))}
      </MarqueeRow>
    </section>
  )
}
