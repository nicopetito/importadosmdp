import Navbar from '@/app/components/Navbar'
import HeroSection from '@/app/components/HeroSection'
import ColeccionesSection from '@/app/components/ColeccionesSection'
import FeaturedProducts from '@/app/components/FeaturedProducts'
import TrustBadgesSection from '@/app/components/TrustBadgesSection'
import MapSection from '@/app/components/MapSection'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F8F6]">
      <Navbar />
      <HeroSection />
      <ColeccionesSection />
      <FeaturedProducts />
      <TrustBadgesSection />
      <MapSection />
      <Footer />
    </div>
  )
}
