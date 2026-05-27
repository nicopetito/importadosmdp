---
name: MDP Premium Retail System
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#414753'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005cbb'
  primary: '#0059b5'
  on-primary: '#ffffff'
  primary-container: '#0071e3'
  on-primary-container: '#fcfbff'
  inverse-primary: '#abc7ff'
  secondary: '#5e5e63'
  on-secondary: '#ffffff'
  secondary-container: '#e0dfe4'
  on-secondary-container: '#626267'
  tertiary: '#006a2d'
  on-tertiary: '#ffffff'
  tertiary-container: '#00863b'
  on-tertiary-container: '#f2ffef'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#e3e2e7'
  secondary-fixed-dim: '#c7c6cb'
  on-secondary-fixed: '#1a1b1f'
  on-secondary-fixed-variant: '#46464b'
  tertiary-fixed: '#66ff8e'
  tertiary-fixed-dim: '#3de273'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005322'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 19px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 20px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style
The design system is engineered for a premium technology retail experience that balances editorial elegance with high-conversion commerciality. The brand personality is authoritative yet welcoming, mirroring the high-touch service of a boutique tech showroom.

The aesthetic follows a **Modern / Corporate** style with heavy influences from **Minimalism**. It prioritizes extreme clarity, generous whitespace, and a rhythmic use of typography to establish trust. Every interface element is designed to disappear, allowing the product photography to remain the focal point. The emotional response should be one of "effortless sophistication"—the user should feel they are purchasing authentic, high-value goods from a reliable source.

## Colors
The palette is rooted in a "Warm Minimalist" spectrum. The background uses a specific off-white to reduce eye strain and provide a more premium feel than pure hex white. 

- **Primary (#0071E3):** A vivid, high-contrast blue reserved strictly for primary calls to action and interactive states.
- **Neutral / Text (#1D1D1F):** A deep graphite that provides strong legibility without the harshness of true black.
- **Secondary / UI (#86868B, #F5F5F7):** Grays are used for metadata, inactive states, and subtle surface layering.
- **WhatsApp (#25D366):** Reserved exclusively for communication triggers to maintain brand integrity while leveraging the familiarity of the platform.

## Typography
The system utilizes **Inter** for its modern, geometric clarity and exceptional legibility at all scales. The typographic scale is "Display-heavy," using large font sizes and tight letter-spacing for headings to create a high-end editorial feel.

Body copy is set at a generous 17px or 19px to ensure the reading experience feels premium and accessible. For mobile, headline sizes are aggressively scaled down to maintain visual hierarchy without overwhelming the smaller viewport. Use bold weights for emphasis and light secondary colors for "hint" text or labels.

## Layout & Spacing
The design system employs a **Fixed Grid** philosophy for desktop to maintain an editorial "magazine" look, transitioning to a fluid model for mobile devices.

- **Desktop:** 12-column grid with a 1200px max-width, 24px gutters, and 40px side margins. 
- **Mobile:** Single column with 20px side margins.
- **Rhythm:** An 8px linear scale drives all padding and margins. Use `stack-xl` (64px) to separate major sections, and `stack-md` (16px) for internal component spacing.

Content should be centered with significant "white-space lungs" to prevent the interface from feeling cluttered or "cheap."

## Elevation & Depth
This design system avoids heavy shadows, instead using **Tonal Layers** and **Low-contrast Outlines** to define hierarchy.

1.  **Level 0 (Background):** #FBFBFD.
2.  **Level 1 (Cards/Containers):** #FFFFFF with a 1px solid border (#E5E5E7) or a very soft, diffused ambient shadow (0px 4px 20px rgba(0,0,0,0.04)).
3.  **Level 2 (Modals/Dropdowns):** Pure white with a slightly more defined shadow and a backdrop blur effect (10px - 20px) when overlaying content.

Interactive elements should feel "flush" with the surface, using color shifts rather than physical elevation to signal state.

## Shapes
The shape language is consistently **Rounded**, using a 0.5rem (8px) base radius. This provides a modern, friendly, and ergonomic feel that matches the industrial design of modern consumer electronics.

- **Standard Buttons/Inputs:** 8px (0.5rem).
- **Product Cards:** 16px (1rem) for a more prominent, "contained" look.
- **Chips/Badges:** Full pill-shape for distinct categorization.

## Components
Consistent execution of these components ensures the premium retail feel:

- **Buttons:** Primary CTAs use the Electric Blue background with white text. Secondary buttons use a light gray surface (#F5F5F7) with black text. Buttons have no borders and utilize 16px-24px horizontal padding.
- **E-commerce Cards:** Products are housed in white cards with high-quality imagery. Pricing is bold, and the product title uses `headline-md`. A subtle hover state should slightly scale the image or deepen the ambient shadow.
- **Input Fields:** Clean, minimal fields with a 1px border (#D2D2D7). On focus, the border transitions to the primary blue. Labels sit above the field in `label-md`.
- **Sticky Navigation:** A minimal, semi-transparent white bar (#FFFFFF with 80% opacity and backdrop-blur) that stays at the top. Use thin dividers (#D2D2D7) to separate sections.
- **Trust Badges:** Simple icons paired with `label-sm` text. Use grayscale for icons to keep the focus on the product, turning them blue only on interaction.
- **WhatsApp Button:** A floating action button (FAB) in the bottom right, using the specific WhatsApp Green (#25D366) with a white icon, clearly separated from the primary UI flow.