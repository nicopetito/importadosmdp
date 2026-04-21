import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturedProducts from './components/FeaturedProducts'
import QuickAccessCards from './components/QuickAccessCards'
import MapSection from './components/MapSection'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <QuickAccessCards />
        <MapSection />
      </main>
      <Footer />
    </>
  )
}
