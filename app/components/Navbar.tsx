import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-[60px] flex items-center bg-blue-base/80 backdrop-blur-md border-b border-blue-border">
      <div className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-display font-extrabold text-xl text-navy tracking-tight">
          importados<span className="text-accent">mdp</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/catalogo"
            className="font-body text-sm text-navy hover:text-accent hover:underline transition-colors duration-150"
          >
            Catálogo
          </Link>
          <Link
            href="/contacto"
            className="font-body text-sm text-navy hover:text-accent hover:underline transition-colors duration-150"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  )
}
