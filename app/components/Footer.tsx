import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 px-10 py-12">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Izquierda: logo + copyright */}
        <div className="text-center sm:text-left">
          <p className="font-display font-extrabold text-xl text-navy-deep tracking-tight">
            importados<span className="text-accent">mdp</span>
          </p>
          <p className="font-body font-medium text-[13px] text-gray-400 mt-1">
            © {new Date().getFullYear()} · Mar del Plata, Argentina
          </p>
        </div>

        {/* Derecha: links */}
        <nav className="flex gap-6">
          <Link
            href="https://instagram.com/importadosmdp_"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-semibold text-[14px] text-gray-500 hover:text-accent transition-colors duration-150"
          >
            Instagram
          </Link>
          <Link
            href="/contacto"
            className="font-body font-semibold text-[14px] text-gray-500 hover:text-accent transition-colors duration-150"
          >
            WhatsApp
          </Link>
        </nav>

      </div>
    </footer>
  )
}
