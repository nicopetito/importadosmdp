import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ResenasPage() {
  const resenas = [
    {
      id: 1,
      name: "Juan Ignacio",
      product: "iPhone 15 Pro Max",
      text: "Excelente atención. Me asesoraron por WhatsApp, coordinamos y me entregaron el celu nuevo sellado. Muy recomendables.",
      rating: 5,
      date: "Hace 2 semanas"
    },
    {
      id: 2,
      name: "Martina S.",
      product: "MacBook Pro M3",
      text: "La compu vuela. Conseguí mejor precio que en cualquier local de Buenos Aires y me la alcanzaron a casa el mismo día.",
      rating: 5,
      date: "Hace 1 mes"
    },
    {
      id: 3,
      name: "Carlos",
      product: "Samsung S24 Ultra",
      text: "Todo de 10. Tuve una duda con la configuración de la cámara apenas lo compré y me ayudaron al instante. Grandes vendedores.",
      rating: 4,
      date: "Hace 1 mes"
    },
    {
      id: 4,
      name: "Valentina G.",
      product: "AirPods Pro",
      text: "100% originales, en caja sellada y con garantía de Apple. Volvería a comprar.",
      rating: 5,
      date: "Hace 2 meses"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h1 className="font-display font-black text-4xl md:text-5xl text-navy-deep tracking-tight mb-4">Lo que dicen nuestros clientes</h1>
            <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
              Más de 500 ventas avalan nuestro compromiso y calidad. Acompañamos tu compra hasta que tengas el equipo en tus manos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resenas.map((resena) => (
              <div 
                key={resena.id} 
                className="bg-white p-8 rounded-[20px] border border-blue-border shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill={i < resena.rating ? "currentColor" : "none"} stroke="currentColor">
                        <path d="M10 1l2.47 5.01L18 6.76l-4 3.9.94 5.49L10 13.77 5.06 16.15 6 10.66 2 6.76l5.53-.75L10 1z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-gray-700 italic text-lg leading-relaxed mb-6">
                    "{resena.text}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <span className="block font-display font-bold text-navy">{resena.name}</span>
                    <span className="block font-body text-xs text-gray-400">Compró un {resena.product}</span>
                  </div>
                  <span className="font-body text-xs text-gray-400">{resena.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-blue-base px-8 py-6 rounded-[20px] border border-blue-border">
              <h3 className="font-display font-bold text-xl text-navy mb-2">Tu calificación nos importa</h3>
              <p className="font-body text-gray-500 text-sm">
                Si ya sos cliente nuestro, contanos tu experiencia en Instagram o Google.
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
