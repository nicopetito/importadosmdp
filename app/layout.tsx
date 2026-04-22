import type { Metadata } from 'next'
import { Raleway, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/app/components/SmoothScrollProvider'
import MobileBottomNav from '@/app/components/MobileBottomNav'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ImportadosMDP — Tecnología importada en Mar del Plata',
  description:
    'Celulares, notebooks, auriculares y accesorios con garantía real. Enviamos a todo el país.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${raleway.variable} ${dmSans.variable} font-body bg-blue-base text-navy antialiased overflow-x-hidden`}
      >
        <SmoothScrollProvider>
          {children}
          <MobileBottomNav />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
