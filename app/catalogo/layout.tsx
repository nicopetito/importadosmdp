import { ReactNode } from 'react'

export const metadata = {
  title: 'Catálogo — ImportadosMDP',
  description: 'Explorá todos nuestros productos importados de tecnología al mejor precio en Mar del Plata. Celulares, notebooks, auriculares y más. Originales sellados con garantía real.',
}

export default function CatalogoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
