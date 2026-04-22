# Importados MDP - E-Commerce y Catálogo

Una plataforma web de catálogo moderno construida con Next.js 15, React, y conectada a Supabase para manejo de inventario dinámico.

## 🚀 Características

- **Diseño Premium**: Interfaz moderna, minimalista enfocada en la exhibición por galería (colores institucionales *Navy* y *Accent* claro).
- **Catálogo Dinámico**: Filtrado integrado por Marca y Categoría en tiempo real.
- **Conectividad a WhatsApp**: Cada producto redirige orgánicamente hacia el cliente a un chat de ventas pre-cargado con el modelo consultado.
- **Backend Integrado**: Conexión a `Supabase` para evitar usar bases de datos complejas. Simplemente cargas los productos y la web se actualiza sola.

## 🛠️ Tecnologías Utilizadas
- **Next.js 15.2** (App Router)
- **React 19**
- **Tailwind CSS** (Estilos y visuales)
- **Supabase** (Base de datos PostgreSQL y API genérica backend)

---

## 💻 Entorno Local y Configuración

### 1. Variables de entorno

Para que el entorno local se enchufe a la nube de Supabase, debes configurar las credenciales.
Crea o copia el archivo `.env.local` en la raíz del proyecto y completa:

```bash
NEXT_PUBLIC_SUPABASE_URL=tus-credenciales
NEXT_PUBLIC_SUPABASE_ANON_KEY=tus-credenciales
```

### 2. Base de Datos en Supabase

Si es una instalación nueva, en tu proyecto de Supabase ve a la zona de **SQL Editor** y ejecuta el siguiente script para crear la tabla de los productos e insertar una base de datos de prueba:

```sql
create table public.products (
  id text primary key,
  name text not null,
  description text,
  detailed_description text,
  price numeric not null,
  category text not null,
  brand text not null,
  image_url text not null,
  images text[] default '{}',
  specs jsonb default '{}'::jsonb,
  in_stock boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

*Importante: Configura o desactiva las políticas de seguridad (RLS) en Supabase para permitir consultas `SELECT` a la tabla o tus clientes no verán los productos.*

### 3. Ejecución en desarrollo

Abre tu terminal, posicionate en la carpeta e instala y arranca:

```bash
npm install
npm run dev
```

Sitio será accesible en [http://localhost:3000](http://localhost:3000).

---

## 🗂️ Estructura del Código

- `/app/catalogo`: Carpeta con la grilla de productos, el filtrado y página individual de modelos.
- `/app/components`: Todos los componentes reutilizables (Botones, NavBar, Tarjetas rápidas y Productos destacados).
- `/data`: Contiene el listado de archivos "mock" (Pruebas). La web lee de aquí *solo si* detecta que las variables de Supabase están rotas o desconectadas, asegurando que ante una eventualidad el sitio web no se caiga ni colapse.
- `/utils/supabase`: Aquí yace el cliente de inicialización con la nube backend.

## 👥 Equipo
Proyecto llevado a cabo para automatizar procesos de ventas en Importados Mar del Plata.
