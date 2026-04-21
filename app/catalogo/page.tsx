'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products, Category, Brand } from '../../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CatalogoPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'Todas'>('Todas');

  const categories: (Category | 'Todos')[] = ['Todos', 'Celulares', 'Notebooks', 'Audio', 'Accesorios'];
  const brands: (Brand | 'Todas')[] = ['Todas', 'Apple', 'Samsung', 'Sony', 'JBL', 'Asus'];

  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
    return matchCategory && matchBrand;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h1 className="font-display font-extrabold text-4xl text-navy mb-4">Catálogo de Productos</h1>
            <p className="font-body text-gray-600 max-w-2xl mx-auto">
              Encuentra los mejores dispositivos importados al mejor precio. Filtra por categoría y marca para una búsqueda rápida.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center items-center">
            <div className="flex gap-2 items-center">
              <span className="font-body text-sm font-semibold text-navy">Categoría:</span>
              <select 
                title="Filtrar por Categoría"
                className="border border-blue-border rounded-lg px-4 py-2 text-sm font-body bg-white outline-none focus:border-accent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'Todos')}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <span className="font-body text-sm font-semibold text-navy">Marca:</span>
              <select 
                title="Filtrar por Marca"
                className="border border-blue-border rounded-lg px-4 py-2 text-sm font-body bg-white outline-none focus:border-accent"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value as Brand | 'Todas')}
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Listado de Productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-blue-border shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col"
                >
                  <div className="relative w-full h-64 bg-gray-100 overflow-hidden flex items-center justify-center p-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500 rounded-t-2xl p-4"
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
                        Ver Detalle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="font-display text-2xl text-gray-400">No se encontraron productos</h3>
              <p className="font-body text-gray-500 mt-2">Prueba ajustando los filtros de búsqueda.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
