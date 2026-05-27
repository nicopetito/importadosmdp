'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { products } from '@/data/products'

const navLinks = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/resenas', label: 'Reseñas' },
  { href: '/contacto', label: 'Contacto' },
]

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-[320px] bg-[#050916] flex flex-col shadow-2xl"
          >
            {/* Close */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
              <span className="font-display font-extrabold text-lg text-white">
                importados<span className="text-primary">mdp</span>
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Cerrar menú"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-6 pt-8 gap-2 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block font-display font-bold text-2xl text-white/80 hover:text-white py-3 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.26 }}
                className="mt-6"
              >
                <Link
                  href="/catalogo"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold font-body rounded-full px-6 py-3 text-sm shadow-[0_4px_14px_rgba(0,113,227,0.35)]"
                >
                  Ver catálogo →
                </Link>
              </motion.div>
            </nav>

            {/* Social links */}
            <div className="px-6 pb-10 flex items-center gap-5">
              <a
                href="https://instagram.com/importadosmdp_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://wa.me/5492235000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

function HeaderSearch({ isMobileSearchOpen, setIsMobileSearchOpen }: {
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen: (val: boolean) => void;
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Sync search input with URL param q when on catalog page
  useEffect(() => {
    const qParam = searchParams.get('q') || ''
    setSearchQuery(qParam)
  }, [searchParams])

  // Real-time catalog filtering when typing inside the catalog page
  useEffect(() => {
    if (pathname !== '/catalogo') return
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchQuery === '') {
        params.delete('q')
      } else {
        params.set('q', searchQuery)
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, pathname, router, searchParams])

  // Filter products based on search input query
  const filtered = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() !== '') {
      setIsDropdownOpen(false)
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Desktop Search input */}
      <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-44 lg:w-56 group">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 group-focus-within:text-on-surface transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value)
            setIsDropdownOpen(true)
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full h-[36px] bg-black/[0.04] hover:bg-black/[0.06] focus:bg-white border border-transparent focus:border-black/[0.06] rounded-xl pl-9 pr-4 font-sans text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-secondary/50"
        />
      </form>

      {/* Mobile Search Button */}
      <button
        onClick={() => setIsMobileSearchOpen(true)}
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/[0.03] text-on-surface/80 hover:text-on-surface transition-colors"
        aria-label="Buscar"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {/* Desktop Suggestions Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && searchQuery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-11 right-0 w-80 lg:w-96 bg-white/95 backdrop-blur-md border border-black/[0.05] rounded-2xl shadow-2xl p-4 z-50 overflow-hidden flex flex-col gap-1"
          >
            {filtered.length > 0 ? (
              <>
                <span className="text-[10px] text-secondary/60 uppercase font-mono tracking-wider font-bold block mb-2 px-1">
                  Sugerencias
                </span>
                <div className="flex flex-col gap-1 max-h-[320px] overflow-y-auto">
                  {filtered.map(p => (
                    <Link
                      key={p.id}
                      href={`/catalogo/${p.id}`}
                      onClick={() => {
                        setIsDropdownOpen(false)
                        setSearchQuery('')
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/[0.02] active:bg-black/[0.04] transition-colors group/item"
                    >
                      <div className="relative w-10 h-10 bg-[#F2F2F2] rounded-lg overflow-hidden flex-shrink-0 p-1.5">
                        <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans font-bold text-xs text-on-surface group-hover/item:text-primary transition-colors truncate">{p.name}</h4>
                        <p className="font-sans text-[9px] text-secondary/70 uppercase tracking-wider">{p.brand} · {p.category}</p>
                      </div>
                      <span className="font-sans font-bold text-xs text-inverse-surface">${p.price.toLocaleString('es-AR')}</span>
                    </Link>
                  ))}
                </div>
                <div className="h-px bg-black/[0.04] my-2" />
                <Link
                  href={`/catalogo?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => {
                    setIsDropdownOpen(false)
                    setSearchQuery('')
                  }}
                  className="block text-center py-2 text-[10px] font-bold text-primary hover:text-primary-container transition-colors uppercase tracking-widest"
                >
                  Ver todos los resultados →
                </Link>
              </>
            ) : (
              <div className="py-8 text-center flex flex-col items-center gap-2">
                <span className="text-2xl opacity-40">🔍</span>
                <p className="text-xs text-secondary/80 font-sans">No se encontraron productos.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full bg-white px-5 py-4 border-b border-black/[0.05] flex flex-col gap-4 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                {/* Input */}
                <div className="relative flex-1">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar tecnología..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full h-10 bg-[#F2F2F2] border-none rounded-xl pl-10 pr-4 font-sans text-sm text-on-surface focus:outline-none"
                    autoFocus
                  />
                </div>
                {/* Cancel */}
                <button
                  onClick={() => {
                    setIsMobileSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="text-xs font-bold text-secondary uppercase tracking-widest px-2 py-1"
                >
                  Cerrar
                </button>
              </div>

              {/* Suggestions */}
              {searchQuery.length > 0 && (
                <div className="flex flex-col divide-y divide-black/[0.04] max-h-[60vh] overflow-y-auto">
                  {filtered.map(p => (
                    <Link
                      key={p.id}
                      href={`/catalogo/${p.id}`}
                      onClick={() => {
                        setIsMobileSearchOpen(false)
                        setSearchQuery('')
                      }}
                      className="flex items-center gap-4 py-3 hover:bg-surface"
                    >
                      <div className="relative w-11 h-11 bg-[#F2F2F2] rounded-lg overflow-hidden flex-shrink-0 p-1.5">
                        <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans font-bold text-xs text-on-surface truncate">{p.name}</h4>
                        <p className="font-sans text-[9px] text-secondary/70 uppercase tracking-wider">{p.brand} · {p.category}</p>
                      </div>
                      <span className="font-sans font-bold text-xs text-inverse-surface">${p.price.toLocaleString('es-AR')}</span>
                    </Link>
                  ))}
                  {filtered.length > 0 ? (
                    <Link
                      href={`/catalogo?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        setIsMobileSearchOpen(false)
                        setSearchQuery('')
                      }}
                      className="block text-center py-3 text-xs font-bold text-primary uppercase tracking-widest"
                    >
                      Ver todos los resultados →
                    </Link>
                  ) : (
                    <div className="py-8 text-center flex flex-col items-center gap-2">
                      <span className="text-2xl opacity-40">🔍</span>
                      <p className="text-xs text-secondary/80 font-sans font-semibold">No se encontraron productos.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="relative sticky top-0 z-50 h-[64px] flex items-center glass-light border-b border-black/[0.03] shadow-sm">
        <div className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-display font-extrabold text-[18px] text-on-surface tracking-tight">
              importados<span className="text-primary">mdp</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-body text-sm transition-colors duration-200 group ${
                    isActive ? 'text-primary font-medium' : 'text-on-surface/70 hover:text-primary'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right-side elements (Search and Hamburger) */}
          <div className="flex items-center ml-auto gap-3">
            <Suspense fallback={<div className="w-9 h-9 md:w-44 md:h-9 bg-black/[0.03] rounded-xl animate-pulse" />}>
              <HeaderSearch 
                isMobileSearchOpen={isMobileSearchOpen} 
                setIsMobileSearchOpen={setIsMobileSearchOpen} 
              />
            </Suspense>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className={`block w-5 h-[2px] bg-on-surface rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-[2px] bg-on-surface rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-on-surface rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
