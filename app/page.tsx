import Navbar from '@/app/components/Navbar'
import HeroSection from '@/app/components/HeroSection'
import TrustBadgesSection from '@/app/components/TrustBadgesSection'
import ColeccionesSection from '@/app/components/ColeccionesSection'
import FeaturedProducts from '@/app/components/FeaturedProducts'
import HowItWorks from '@/app/components/HowItWorks'
import TestimonialsSection from '@/app/components/TestimonialsSection'
import MapSection from '@/app/components/MapSection'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8fa]">
      <Navbar hero />
      <HeroSection />
      <TrustBadgesSection />
      <ColeccionesSection />
      <FeaturedProducts />
      <HowItWorks />
      <TestimonialsSection />
      <MapSection />
      <Footer />
    </div>
  )
}
