'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MapEmbed = dynamic(() => import('@/app/components/MapEmbed'), {
  ssr: false,
  loading: () => (
    <div style={{
      width:'100%', height:'320px',
      background:'#E0E8FF',
      borderRadius:'16px'
    }}/>
  )
});

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', 
    producto: '', mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEnviando(false);
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#F0F4FF]/90 backdrop-blur border-b border-[#C7D4FF] h-[64px] flex items-center px-6 md:px-20 justify-between">
        <Link href="/" className="font-display font-extrabold text-[18px] text-[#1A2580]">
          importados<span className="text-[#5A72ED]">mdp</span>
        </Link>
        <div className="flex items-center gap-[32px]">
          <Link href="/catalogo" className="font-body font-normal text-[14px] text-[#1A2580] hover:text-[#5A72ED] transition-colors duration-150">
            Catálogo
          </Link>
          <Link href="/contacto" className="font-body font-medium text-[14px] text-[#5A72ED] transition-colors duration-150">
            Contacto
          </Link>
        </div>
      </nav>

      {/* CABECERA (Oscura) */}
      <header className="bg-[#1A2580] px-6 py-12 md:pb-[64px] md:pt-[72px] md:px-[80px]">
        <p className="font-body text-[11px] font-medium text-[#C7D4FF] uppercase tracking-[0.15em] mb-[14px]">
          Estamos para ayudarte
        </p>
        <h1 className="font-display font-extrabold text-[40px] md:text-[64px] text-white leading-[1.0] mb-[16px]">
          Hablemos.
        </h1>
        <p className="font-body text-[16px] font-light text-[#C7D4FF] max-w-[480px] leading-[1.6]">
          Escribinos por WhatsApp o Instagram para atención personalizada. Respondemos en menos de 3 horas.
        </p>
      </header>

      {/* CUERPO PRINCIPAL */}
      <main className="bg-[#F0F4FF] px-6 py-10 md:px-[80px] md:py-[64px]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-[48px]">
          
          {/* COLUMNA IZQUIERDA: Canales */}
          <div>
            <h2 className="font-display font-bold text-[18px] text-[#1A2580] mb-[20px]">
              Canales directos
            </h2>

            {/* Card WhatsApp */}
            <a 
              href="https://wa.me/+5492230000000" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white border border-[#C7D4FF] rounded-[16px] p-[24px] mb-[12px] transition-all duration-200 hover:border-[#5A72ED] hover:-translate-y-[2px] cursor-pointer block"
            >
              <div className="flex items-center gap-[12px] mb-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-[#F0FFF4] shrink-0 flex items-center justify-center">
                  <svg className="w-[22px] h-[22px] fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-[16px] text-[#1A2580]">WhatsApp</h3>
                  <p className="font-body text-[12px] text-[#6B7280]">Respuesta rápida</p>
                </div>
              </div>
              <p className="font-body text-[13px] text-[#4A5568] line-height-[1.5] mb-[14px]">
                Envianos un mensaje directo. Es el canal más rápido para consultar disponibilidad y precios.
              </p>
              <div className="inline-flex gap-[6px] items-center bg-[#EEF1FD] rounded-full px-[12px] py-[4px] font-medium text-[11px] text-[#3D52C4]">
                ⚡ Menos de 3 horas
              </div>
              <span className="font-body text-[13px] font-medium text-[#5A72ED] hover:text-[#3D52C4] mt-[14px] block transition-colors">
                Enviar mensaje →
              </span>
            </a>

            {/* Card Instagram */}
            <a 
              href="https://instagram.com/importadosmdp_" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white border border-[#C7D4FF] rounded-[16px] p-[24px] mb-[12px] transition-all duration-200 hover:border-[#5A72ED] hover:-translate-y-[2px] cursor-pointer block"
            >
              <div className="flex items-center gap-[12px] mb-[12px]">
                <div className="w-[44px] h-[44px] rounded-full bg-[#FDF0F7] shrink-0 flex items-center justify-center">
                  <svg className="w-[22px] h-[22px] fill-[#C13584]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-[16px] text-[#1A2580]">Instagram</h3>
                  <p className="font-body text-[12px] text-[#6B7280]">@importadosmdp_</p>
                </div>
              </div>
              <p className="font-body text-[13px] text-[#4A5568] line-height-[1.5] mb-[14px]">
                Seguinos para ver los productos disponibles, precios actualizados y novedades del comercio.
              </p>
              <div className="inline-flex gap-[6px] items-center bg-[#FDF0F7] rounded-full px-[12px] py-[4px] font-medium text-[11px] text-[#7B2D8B]">
                📸 Ver perfil
              </div>
              <span className="font-body text-[13px] font-medium text-[#5A72ED] hover:text-[#3D52C4] mt-[14px] block transition-colors">
                Ir al perfil →
              </span>
            </a>

            {/* Info Adicional */}
            <div className="mt-[28px]">
              <h3 className="font-display font-semibold text-[14px] text-[#1A2580] mb-[14px]">
                También podés visitarnos
              </h3>
              <div className="flex flex-col gap-[12px]">
                <div className="flex gap-[10px] items-start">
                  <svg className="w-[16px] h-[16px] text-[#5A72ED] shrink-0 mt-[2px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span className="font-body text-[13px] text-[#4A5568] leading-[1.4]">Jujuy 1811, Mar del Plata, Buenos Aires</span>
                </div>
                <div className="flex gap-[10px] items-start">
                  <svg className="w-[16px] h-[16px] text-[#5A72ED] shrink-0 mt-[2px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span className="font-body text-[13px] text-[#4A5568] leading-[1.4]">Lunes a Sábado de 10:00 a 20:00hs</span>
                </div>
                <div className="flex gap-[10px] items-start">
                  <svg className="w-[16px] h-[16px] text-[#5A72ED] shrink-0 mt-[2px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span className="font-body text-[13px] text-[#4A5568] leading-[1.4]">También por DM en Instagram</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario */}
          <div className="bg-white border border-[#C7D4FF] rounded-[20px] p-[36px] h-fit">
            {!enviado ? (
              <form onSubmit={handleSubmit}>
                <h2 className="font-display font-bold text-[20px] text-[#1A2580] mb-[6px]">
                  Dejanos tu consulta
                </h2>
                <p className="font-body text-[14px] text-[#6B7280] mb-[28px]">
                  Te respondemos a la brevedad.
                </p>

                <div className="mb-[18px]">
                  <label className="font-body text-[13px] font-medium text-[#1A2580] mb-[6px] block">Nombre completo *</label>
                  <input 
                    type="text" 
                    placeholder="Ej: María González" 
                    required 
                    value={form.nombre}
                    onChange={(e) => setForm({...form, nombre: e.target.value})}
                    className="w-full border border-[#C7D4FF] rounded-[10px] p-[11px] px-[14px] font-body text-[14px] text-[#1A2580] bg-[#F0F4FF] outline-none focus:border-[#5A72ED] focus:bg-white transition-all duration-150 placeholder:text-[#6B7280]"
                  />
                </div>

                <div className="mb-[18px]">
                  <label className="font-body text-[13px] font-medium text-[#1A2580] mb-[6px] block">Email *</label>
                  <input 
                    type="email" 
                    placeholder="tu@email.com" 
                    required 
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full border border-[#C7D4FF] rounded-[10px] p-[11px] px-[14px] font-body text-[14px] text-[#1A2580] bg-[#F0F4FF] outline-none focus:border-[#5A72ED] focus:bg-white transition-all duration-150 placeholder:text-[#6B7280]"
                  />
                </div>

                <div className="mb-[18px]">
                  <label className="font-body text-[13px] font-medium text-[#1A2580] mb-[6px] block">Teléfono</label>
                  <input 
                    type="tel" 
                    placeholder="+54 9 223 000-0000" 
                    value={form.telefono}
                    onChange={(e) => setForm({...form, telefono: e.target.value})}
                    className="w-full border border-[#C7D4FF] rounded-[10px] p-[11px] px-[14px] font-body text-[14px] text-[#1A2580] bg-[#F0F4FF] outline-none focus:border-[#5A72ED] focus:bg-white transition-all duration-150 placeholder:text-[#6B7280]"
                  />
                </div>

                <div className="mb-[18px]">
                  <label className="font-body text-[13px] font-medium text-[#1A2580] mb-[6px] block">Producto de interés</label>
                  <select 
                    value={form.producto}
                    onChange={(e) => setForm({...form, producto: e.target.value})}
                    className="w-full border border-[#C7D4FF] rounded-[10px] p-[11px] px-[14px] font-body text-[14px] text-[#1A2580] bg-[#F0F4FF] outline-none focus:border-[#5A72ED] focus:bg-white transition-all duration-150 placeholder:text-[#6B7280]"
                  >
                    <option value="">Seleccioná un producto...</option>
                    <option>iPhone</option>
                    <option>Samsung Galaxy</option>
                    <option>MacBook</option>
                    <option>Auriculares</option>
                    <option>Apple Watch</option>
                    <option>Otro / Consulta general</option>
                  </select>
                </div>

                <div className="mb-[18px]">
                  <label className="font-body text-[13px] font-medium text-[#1A2580] mb-[6px] block">Tu consulta *</label>
                  <textarea 
                    rows={4} 
                    placeholder="Escribí tu consulta acá..." 
                    required 
                    value={form.mensaje}
                    onChange={(e) => setForm({...form, mensaje: e.target.value})}
                    className="w-full border border-[#C7D4FF] rounded-[10px] p-[11px] px-[14px] font-body text-[14px] text-[#1A2580] bg-[#F0F4FF] outline-none focus:border-[#5A72ED] focus:bg-white transition-all duration-150 placeholder:text-[#6B7280] resize-y"
                  />
                </div>

                <p className="font-body text-[11px] text-[#6B7280] mb-[20px]">* Campos requeridos</p>

                <button 
                  type="submit" 
                  disabled={enviando}
                  className={`w-full p-[14px] font-display font-semibold text-[15px] rounded-[10px] border-none transition-all duration-200 ${
                    enviando 
                      ? 'bg-[#C7D4FF] text-white cursor-not-allowed' 
                      : 'bg-[#1A2580] text-white cursor-pointer hover:bg-[#5A72ED]'
                  }`}
                >
                  {enviando ? 'Enviando...' : 'Enviar consulta →'}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-[48px]">
                <div className="w-[64px] h-[64px] rounded-full bg-[#F0FFF4] flex items-center justify-center mb-[20px]">
                  <svg className="w-[28px] h-[28px] text-[#25D366]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="font-display font-bold text-[22px] text-[#1A2580] text-center mb-[10px]">
                  ¡Consulta enviada!
                </h3>
                <p className="font-body text-[14px] text-[#4A5568] text-center mb-[24px]">
                  Te respondemos en menos de 3 horas por el medio que prefieras.
                </p>
                <button 
                  onClick={() => {
                    setEnviado(false);
                    setForm({ nombre: '', email: '', telefono: '', producto: '', mensaje: '' });
                  }}
                  className="border-[1.5px] border-[#C7D4FF] bg-transparent text-[#1A2580] rounded-full px-[24px] py-[10px] font-display font-semibold text-[14px] hover:border-[#5A72ED] hover:text-[#5A72ED] transition-colors mx-auto block"
                >
                  Hacer otra consulta
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MAPA INFERIOR */}
      <section className="bg-white px-6 py-[40px] md:px-[80px] md:py-[64px]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-display font-bold text-[22px] text-[#1A2580] mb-[6px]">
            Cómo llegar
          </h2>
          <p className="font-body text-[14px] text-[#6B7280] mb-[28px]">
            Jujuy 1811, Mar del Plata, Buenos Aires.
          </p>
          <MapEmbed height="320" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D1445] px-6 lg:px-[80px] py-8 lg:py-12 flex flex-col lg:flex-row justify-between items-center gap-[16px]">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Link href="/" className="font-display font-extrabold text-[18px] text-white">
            importados<span className="text-[#5A72ED]">mdp</span>
          </Link>
          <p className="font-body text-[12px] text-[#6B7280] mt-[4px]">© 2025 · Mar del Plata, Argentina</p>
        </div>
        
        <div className="flex gap-[24px]">
          <a href="https://instagram.com/importadosmdp_" target="_blank" className="font-body text-[13px] text-[#C7D4FF] hover:text-white transition-colors duration-150">Instagram</a>
          <a href="https://wa.me/..." target="_blank" className="font-body text-[13px] text-[#C7D4FF] hover:text-white transition-colors duration-150">WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}
