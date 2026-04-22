import Navbar from '@/app/components/Navbar'
import HeroSection from '@/app/components/HeroSection'
import FeaturedProducts from '@/app/components/FeaturedProducts'
import QuickAccessCards from '@/app/components/QuickAccessCards'
import TestimonialsSection from '@/app/components/TestimonialsSection'
import MapSection from '@/app/components/MapSection'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <QuickAccessCards />
      <TestimonialsSection />
      <MapSection />
      <Footer />
    </div>
  )
}
