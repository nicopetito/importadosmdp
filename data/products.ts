export type Category = 'Celulares' | 'Notebooks' | 'Accesorios' | 'Audio';
export type Brand = 'Apple' | 'Samsung' | 'Sony' | 'JBL' | 'Asus';

export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  price: number;
  category: Category;
  brand: Brand;
  imageUrl: string;
  images: string[];
  specs: Record<string, string>;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    description: 'Chip A17 Pro. Diseño de titanio. Cámara principal de 48 MP.',
    detailedDescription: 'El iPhone 15 Pro Max presenta un diseño de titanio de calidad aeroespacial que lo hace liviano y resistente. Cuenta con el chip A17 Pro para un rendimiento gráfico de otro nivel y un sistema de cámaras revolucionario con zoom óptico de 5x.',
    price: 1350,
    category: 'Celulares',
    brand: 'Apple',
    imageUrl: '/imagenes/modeloDos.jpeg',
    images: ['/imagenes/modeloDos.jpeg', '/imagenes/Iphone.jpg'],
    specs: {
      'Pantalla': '6.7" Super Retina XDR',
      'Procesador': 'A17 Pro',
      'Almacenamiento': '256GB / 512GB / 1TB',
      'Cámaras': '48MP + 12MP + 12MP',
    },
    inStock: true,
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Inteligencia artificial que cambia las reglas del juego.',
    detailedDescription: 'Galaxy S24 Ultra con el nuevo procesador Snapdragon 8 Gen 3 y una increíble integración con Galaxy AI. Diseño en titanio, pantalla plana y el S-Pen incluido.',
    price: 1250,
    category: 'Celulares',
    brand: 'Samsung',
    imageUrl: '/imagenes/Iphone.jpg',
    images: ['/imagenes/Iphone.jpg'],
    specs: {
      'Pantalla': '6.8" Dynamic AMOLED 2X',
      'Procesador': 'Snapdragon 8 Gen 3',
      'Batería': '5000 mAh',
      'Cámaras': '200MP + 50MP + 12MP + 10MP',
    },
    inStock: true,
  },
  {
    id: 'macbook-pro-m3',
    name: 'MacBook Pro 14" M3',
    description: 'La laptop más avanzada con la revolucionaria familia de chips M3.',
    detailedDescription: 'Una capacidad asombrosa con los chips M3, M3 Pro y M3 Max. Liquid Retina XDR asombrosa, y batería de hasta 22 horas para potenciar tu ritmo de trabajo.',
    price: 1750,
    category: 'Notebooks',
    brand: 'Apple',
    imageUrl: '/imagenes/compu.jpeg',
    images: ['/imagenes/compu.jpeg'],
    specs: {
      'Pantalla': '14.2" Liquid Retina XDR',
      'Chip': 'Apple M3 Pro',
      'RAM': '18GB',
      'Almacenamiento': '512GB SSD',
    },
    inStock: true,
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2da gen)',
    description: 'Cancelación activa de ruido el doble de potente.',
    detailedDescription: 'Audio espacial personalizado con seguimiento dinámico de la cabeza y una enorme calidad de sonido gracias al nuevo chip H2. Hasta 6 horas de reproducción.',
    price: 250,
    category: 'Audio',
    brand: 'Apple',
    imageUrl: '/imagenes/modeloTres.jpeg',
    images: ['/imagenes/modeloTres.jpeg'],
    specs: {
      'Chip': 'Apple H2',
      'Conectividad': 'Bluetooth 5.3',
      'Duración': 'Hasta 6h (30h con estuche)',
      'Resistencia': 'IP54 (Polvo y agua)',
    },
    inStock: true,
  },
  {
    id: 'jbl-flip-6',
    name: 'Parlante JBL Flip 6',
    description: 'Sonido potente y audaz en cualquier lugar.',
    detailedDescription: 'Tu aventura musical sin igual. El altavoz Bluetooth JBL Flip 6 ofrece un potente sonido JBL Original Pro con notable claridad y sistema de altavoces de 2 vías.',
    price: 130,
    category: 'Audio',
    brand: 'JBL',
    imageUrl: '/imagenes/modeloUno.jpeg',
    images: ['/imagenes/modeloUno.jpeg'],
    specs: {
      'Potencia': '20W RMS',
      'Conectividad': 'Bluetooth 5.1',
      'Batería': 'Hasta 12 hrs',
      'Protección': 'IP67 Waterproof',
    },
    inStock: true,
  }
];
