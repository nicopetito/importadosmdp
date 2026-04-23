import Navbar from '@/app/components/Navbar'
import HeroSection from '@/app/components/HeroSection'
import BrandsMarquee from '@/app/components/BrandsMarquee'
import FeaturedProducts from '@/app/components/FeaturedProducts'
import HowItWorks from '@/app/components/HowItWorks'
import QuickAccessCards from '@/app/components/QuickAccessCards'
import TestimonialsSection from '@/app/components/TestimonialsSection'
import MapSection from '@/app/components/MapSection'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BrandsMarquee />
      <FeaturedProducts />
      <HowItWorks />
      <QuickAccessCards />
      <TestimonialsSection />
      <MapSection />
      <Footer />
    </div>
  )
}
