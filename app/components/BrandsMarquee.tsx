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
    <section className="bg-white border-y border-blue-subtle py-8 overflow-hidden">
      <div className="text-center mb-6">
        <p className="font-body text-[11px] font-bold text-accent uppercase tracking-[0.2em]">
          Marcas oficiales
        </p>
      </div>
      
      <MarqueeRow gap={20} speed="45s">
        {brands.map((brand) => (
          <Link
            key={brand}
            href={`/catalogo?q=${brand}`}
            className="block bg-blue-base border border-blue-subtle rounded-[12px] px-6 py-3 flex items-center justify-center min-w-[120px] transition-all duration-300 hover:border-[#C7D2FE] hover:shadow-sm cursor-pointer"
          >
            <span className="font-display font-black text-[15px] text-navy/60 hover:text-navy transition-colors duration-200">
              {brand}
            </span>
          </Link>
        ))}
      </MarqueeRow>
    </section>
  )
}
