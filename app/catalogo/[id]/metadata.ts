import { products as mockProducts } from '../../../data/products'
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const resolvedParams = await params
  const product = mockProducts.find(p => p.id === resolvedParams.id)
  
  if (!product) return { title: 'Producto no encontrado — ImportadosMDP' }
  
  return {
    title: `${product.name} — ImportadosMDP`,
    description: product.description || `Comprá ${product.name} al mejor precio y con garantía en ImportadosMDP.`,
    openGraph: {
      title: `${product.name} — ImportadosMDP`,
      description: product.description || `Comprá ${product.name} al mejor precio y con garantía en ImportadosMDP.`,
      images: [{ url: product.imageUrl || (product.images && product.images[0]) || '', width: 800, height: 800 }],
      locale: 'es_AR',
      type: 'website',
    },
  }
}
