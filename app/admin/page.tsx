'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

const CATEGORIES = ['Celulares', 'Notebooks', 'Accesorios', 'Audio', 'Auriculares']
const BRANDS = ['Apple', 'Samsung', 'Sony', 'JBL', 'Asus', 'Xiaomi', 'Lenovo']

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Form state
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('Apple')
  const [category, setCategory] = useState('Celulares')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [detailedDescription, setDetailedDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [inStock, setInStock] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)
  
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) {
        setProducts(data)
      }
    }
    setLoading(false)
  }

  const handleEdit = (p: any) => {
    setId(p.id)
    setName(p.name)
    setBrand(p.brand)
    setCategory(p.category)
    setPrice(p.price.toString())
    setDescription(p.description || '')
    setDetailedDescription(p.detailed_description || '')
    setImageUrl(p.image_url || '')
    setInStock(p.in_stock ?? true)
    setIsFeatured(p.is_featured ?? false)
    setStatusMessage(`Editando producto: ${p.name}`)
  }

  const handleClear = () => {
    setId('')
    setName('')
    setBrand('Apple')
    setCategory('Celulares')
    setPrice('')
    setDescription('')
    setDetailedDescription('')
    setImageUrl('')
    setInStock(true)
    setIsFeatured(false)
    setStatusMessage('')
  }

  const handleGenerateImage = async () => {
    if (!name.trim()) {
      alert('Por favor, ingresa primero el nombre del producto.')
      return
    }
    setIsGenerating(true)
    setStatusMessage('Generando imagen de estudio con IA...')

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          brand,
          category,
          id: id || name.toLowerCase().replaceAll(' ', '-')
        }),
      })

      const data = await response.json()
      if (response.ok && data.imageUrl) {
        setImageUrl(data.imageUrl)
        setStatusMessage('¡Imagen generada con éxito por la IA!')
      } else {
        alert(data.error || 'Error al generar la imagen')
        setStatusMessage('Error al generar la imagen')
      }
    } catch (error) {
      console.error(error)
      alert('Error en la conexión con la API de generación')
      setStatusMessage('Error de conexión')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      alert('Supabase no está conectado. Configura tus variables de entorno (.env.local)')
      return
    }
    if (!name.trim() || !price.trim()) {
      alert('Nombre y precio son campos requeridos.')
      return
    }

    setIsSaving(true)
    setStatusMessage('Guardando en Supabase...')
    
    const slug = id || name.toLowerCase().replaceAll(' ', '-').replaceAll('"', '')
    const productPayload = {
      id: slug,
      name,
      brand,
      category,
      price: parseFloat(price),
      description,
      detailed_description: detailedDescription,
      image_url: imageUrl || '/imagenes/iphone-15-pro-max.png',
      images: [imageUrl || '/imagenes/iphone-15-pro-max.png'],
      in_stock: inStock,
      is_featured: isFeatured,
    }

    try {
      const { error } = await supabase.from('products').upsert(productPayload)
      if (error) {
        alert(`Error al guardar: ${error.message}`)
        setStatusMessage('Error al guardar')
      } else {
        setStatusMessage('¡Producto guardado exitosamente!')
        handleClear()
        fetchProducts()
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`)
      setStatusMessage('Error inesperado')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (productId: string) => {
    if (!supabase) return
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', productId)
      if (error) {
        alert(`Error al eliminar: ${error.message}`)
      } else {
        fetchProducts()
      }
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-navy">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="font-sans font-black text-3xl">Panel de Control - Inventario</h1>
            <p className="text-gray-500 text-sm mt-1">Crea productos, edita stock y genera imágenes automáticamente con IA.</p>
          </div>
          <Link href="/catalogo" className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-sm">
            Ver catálogo público
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm h-fit">
            <h2 className="font-sans font-bold text-lg mb-6">{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="ej. iPhone 15 Pro Max"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Marca</label>
                  <select
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-sans text-sm focus:outline-none focus:bg-white"
                  >
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-sans text-sm focus:outline-none focus:bg-white"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Precio (ARS)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="1350000"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">ID (Slug único)</label>
                  <input
                    type="text"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    placeholder="Generado automáticamente"
                    disabled={!!id}
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 font-sans text-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Descripción breve</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="ej. Chip A17 Pro. Diseño de titanio."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Descripción detallada</label>
                <textarea
                  value={detailedDescription}
                  onChange={e => setDetailedDescription(e.target.value)}
                  placeholder="Especificaciones, caja, detalles comerciales..."
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 font-sans text-sm focus:outline-none focus:bg-white"
                />
              </div>

              {/* Image Input + IA Generator */}
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Imagen del Producto (URL)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    placeholder="URL de la imagen o genera una"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 font-sans text-xs focus:outline-none focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateImage}
                    disabled={isGenerating}
                    className="bg-primary text-white font-sans font-bold text-[11px] uppercase tracking-wider rounded-xl px-4 hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer whitespace-nowrap"
                  >
                    {isGenerating ? 'Generando...' : 'Generar IA'}
                  </button>
                </div>
                {imageUrl && (
                  <div className="mt-4 relative w-full h-32 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center p-2">
                    <Image src={imageUrl} alt="Vista previa" fill className="object-contain p-2" />
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 font-sans text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={e => setInStock(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  En Stock disponible
                </label>
                <label className="flex items-center gap-2 font-sans text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={e => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  Destacar producto
                </label>
              </div>

              {statusMessage && (
                <div className="p-3 bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-xl font-medium">
                  {statusMessage}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-gray-100 text-gray-700 font-sans font-bold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#1c1c1e] text-white font-sans font-bold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-[#2c2c2e] disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h2 className="font-sans font-bold text-lg mb-6">Listado de Inventario</h2>

            {loading ? (
              <div className="flex flex-col gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {products.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-12 h-12 bg-gray-50 border border-gray-150 rounded-xl overflow-hidden flex-shrink-0 p-1">
                        <Image src={p.image_url || '/imagenes/iphone-15-pro-max.png'} alt={p.name} fill className="object-contain p-1" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-sans font-bold text-sm truncate">{p.name}</h4>
                        <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">
                          {p.brand} · {p.category} · {p.in_stock ? <span className="text-green-600">Stock</span> : <span className="text-red-500">Sin Stock</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="font-sans font-black text-sm text-navy">${p.price.toLocaleString('es-AR')}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                          aria-label="Editar"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Eliminar"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 flex flex-col items-center gap-3">
                <span className="text-4xl">📦</span>
                <p className="font-sans text-sm font-semibold">No hay productos en el inventario.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
