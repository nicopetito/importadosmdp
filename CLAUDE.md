# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

If these are not set, the Supabase client in [utils/supabase/client.ts](utils/supabase/client.ts) returns `null` and the app falls back to mock data from [data/products.ts](data/products.ts).

## Architecture

**Next.js 15 App Router** with React 19. All routes live under [app/](app/).

**Routes:**
- `/` — Home page (hero, featured products, testimonials, map)
- `/catalogo` — Product catalog with client-side category filtering
- `/catalogo/[id]` — Product detail (dynamic route)
- `/contacto` — Contact form + Google Maps embed

**Data layer:** Products are currently served from static mock data in [data/products.ts](data/products.ts). Supabase ([utils/supabase/client.ts](utils/supabase/client.ts)) is the intended backend but is optional — the app degrades gracefully without credentials.

**Components** live in [app/components/](app/components/). Pages import these directly; there is no separate `src/` directory or barrel exports.

**Map rendering:** [app/components/MapEmbed.tsx](app/components/MapEmbed.tsx) uses `next/dynamic` with `{ ssr: false }` — required for any iframe/browser-only embed.

## Styling

- Tailwind CSS with two custom fonts: `font-display` (Raleway) and `font-body` (DM Sans), loaded as CSS variables in [app/layout.tsx](app/layout.tsx).
- Custom Tailwind animations `animate-float` and `animate-reveal-up` are defined in [tailwind.config.ts](tailwind.config.ts).
- Brand colors are hard-coded hex values (e.g., `#1A2580`, `#5A72ED`) — no CSS custom properties for colors.
- Framer Motion (`motion.div`, `useScroll`, `useTransform`) is used for parallax and entrance animations in hero and product sections.

## Images

- Next.js `<Image>` is used throughout. Remote images from `images.unsplash.com` are whitelisted in [next.config.ts](next.config.ts).
- Local product images are in [public/](public/); hero mockups are in [public/images/](public/images/).
- Components include emoji fallbacks if images fail to load.
