import type { Metadata } from 'next'
import { Raleway, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/app/components/SmoothScrollProvider'
import MobileBottomNav from '@/app/components/MobileBottomNav'
import PageTransition from '@/app/components/PageTransition'

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
    'Celulares, notebooks, auriculares y accesorios con garantía real. Visitanos en Jujuy 1811, Mar del Plata.',
  openGraph: {
    title: 'ImportadosMDP — Tecnología importada en Mar del Plata',
    description:
      'Celulares, notebooks, auriculares y accesorios con garantía real. Visitanos en Jujuy 1811, Mar del Plata.',
    url: 'https://importadosmdp.com',
    siteName: 'ImportadosMDP',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ImportadosMDP — Tecnología importada en Mar del Plata',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImportadosMDP — Tecnología importada en Mar del Plata',
    description:
      'Celulares, notebooks, auriculares y accesorios con garantía real. Visitanos en Jujuy 1811, Mar del Plata.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${raleway.variable} ${dmSans.variable} font-body bg-blue-base text-navy antialiased overflow-x-hidden`}
      >
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
          <MobileBottomNav />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
