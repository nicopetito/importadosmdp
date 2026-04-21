import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import QuickAccessCards from './components/QuickAccessCards'
import MapSection from './components/MapSection'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <QuickAccessCards />
        <MapSection />
      </main>
      <Footer />
    </>
  )
}
