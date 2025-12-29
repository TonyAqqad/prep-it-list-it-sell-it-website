# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Local-SEO focused Next.js 15 website for **Prep It List It Sell It Services** (home improvement/listing prep in Santa Clarita Valley). Uses React 19, Tailwind CSS, and TypeScript.

**Scope**: Website + brand kit only. GHL/voice workflows live elsewhere.

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run typecheck  # TypeScript check (tsc --noEmit)
npm run lint       # ESLint
npm start          # Start production server
npm run seed       # Seed Sanity CMS with content from src/content/
```

**Sanity Studio**: Access at `/studio` route when dev server running (requires env vars).

## Architecture

### Content System (Hybrid: Sanity CMS + TypeScript Fallback)

**Primary Source**: Sanity CMS (editable via `/studio`)
- Layout components fetch from Sanity with automatic fallback to TypeScript files
- Run `npm run seed` to populate Sanity with content from `src/content/`

**TypeScript Content Files** (`src/content/`) — Seed data & fallback:
- `company.ts` — NAP (name/address/phone), contact info, service areas, credentials
- `services.ts` — Service definitions with icons (Material Symbols names), features
- `testimonials.ts` — Customer reviews
- `seo-keywords.ts` — Keyword strategy
- `service-areas.ts` — Service area definitions with name, slug, description, ZIP codes array, and intro text (headline, subheadline, description)

**Data Flow**: Sanity → Fallback to TypeScript if Sanity unavailable → Component rendering

### Layout Components (Server-Side with Sanity Fetch)
Shared layout in `src/components/layout/`:
- `LayoutWrapper.tsx` — Server component that fetches layout data via `getLayoutData()`, wraps Header and Footer, passes data as props. Used in root layout to handle all layout rendering
- `Header.tsx` — Fixed header with logo, nav, mobile menu trigger (client component, receives props, uses HashLink for hash navigation). Mobile-optimized with reduced padding (px-3 sm:px-6, py-2 sm:py-3) and smaller logo (h-8 sm:h-10 md:h-12)
- `Footer.tsx` — Company info, quick links, services, contact (server component, receives props)
- `MobileMenu.tsx` — Slide-in mobile nav with backdrop, focus trap, escape handling (client component, uses HashLink for hash navigation). Hamburger button has visible gold background (bg-gold/10) for better mobile visibility

**Data Fetching**: `src/lib/getLayoutData.ts` — Fetches siteSettings, contactInfo, navigation, footer, and services from Sanity with graceful fallback to TypeScript content files. Default navigation includes "Service Areas" link.

### Brand System
- `src/styles/brand-tokens.ts` — Design tokens (colors, fonts, spacing, shadows)
- `tailwind.config.ts` — Tailwind extension using brand colors (navy/gold palette)
- `src/styles/globals.css` — Complete design system with CSS custom properties, component classes, and utilities

**Color palette**: Navy (`#1B2838`) + Gold (`#D4A74A`). Use semantic names: `text-navy`, `bg-gold`, `text-gold-gradient`.

**Global Styles Architecture** (`globals.css`):
- **CSS Variables**: Color tokens (navy/gold variants), shadows, transitions in `:root`
- **Base Layer**: Smooth scrolling, horizontal overflow containment (html/body), safe area insets for mobile, custom selection, focus states, heading defaults
- **Component Classes**:
  - `.card` / `.card-gold` — Card system with hover effects, gold glow, and radial gradient borders
  - `.btn` / `.btn-primary` — Button base with tap targets, slide animations, gold shadow
  - `.gold-border`, `.gold-glow` — Gold accent utilities
  - `.gradient-navy`, `.gradient-gold` — Brand gradient backgrounds
  - `.pattern-overlay` — Subtle SVG pattern (gold dots at 3% opacity)
  - `.container-section` — Max-width container with responsive padding
  - `.overflow-safe` — Overflow containment utility for page wrappers (overflow-x-hidden, max-width 100vw)
  - `.tap-target` — Enforces 44px minimum for accessibility

### SEO & Metadata
- `src/components/seo/LocalBusinessSchema.tsx` — JSON-LD structured data (HomeAndConstructionBusiness type)
- Root layout handles metadata template, OpenGraph, Twitter cards
- Uses `schema-dts` for typed JSON-LD
- **Favicons**: Complete set generated via `scripts/generate-favicons.mjs` (16x16, 32x32, 48x48 ICO, 180x180 Apple, 192x192 & 512x512 PWA)
- **OG Image**: Default OpenGraph image (`/og-image.png` 1200x630) generated via `scripts/generate-og-image.mjs`
- **Web Manifest**: PWA-ready manifest at `/site.webmanifest`

### Sanity CMS Integration (Fully Configured)

**Studio & Config**:
- **Studio Route**: `/studio` — Embedded Sanity Studio (catch-all at `src/app/studio/[[...tool]]/`)
  - `page.tsx` — Client component rendering `<NextStudio>` with config
  - `layout.tsx` — Simple container layout (fixed inset-0) with noindex/nofollow metadata; root layout handles html/body
- **Configuration**: `sanity.config.ts` — Project config with Structure Tool & Vision plugins, basePath: "/studio"
- **Client**: `src/sanity/lib/client.ts` — next-sanity client instance
- **Env**: `src/sanity/env.ts` — Project ID, dataset, API version
- **Environment Variables** (`.env.local`):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
  - `NEXT_PUBLIC_SANITY_DATASET` — Dataset name (typically "production")
  - `SANITY_API_WRITE_TOKEN` — Write token for seeding (keep private, not exposed to client)
  - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — Google Maps API key for location features (client-side)

**Data Layer**:
- **Fetch Helper**: `src/sanity/lib/fetch.ts` — Error-safe wrapper around Sanity client
- **Queries**: `src/sanity/lib/queries.ts` — GROQ queries for all content types (singletons, services, testimonials, pages)
- **Image Helpers**: `src/sanity/lib/image.ts` — Sanity image URL builder

**Schema Architecture** (`src/sanity/schemas/`):
- **Singletons**: `siteSettings`, `contactInfo`, `navigation`, `footer` (single-document types)
- **Documents**: `service`, `testimonial`, `page` (collections)
- **Objects** (page sections): `heroSection`, `servicesGrid`, `processSteps`, `trustSection`, `testimonialsSection`, `ctaSection`

**Schema Field Enhancements**:
- `service` schema includes: title, shortTitle, slug, description, icon (Material Symbol name), image (with hotspot), features array, display order
- `testimonial` schema includes: author, location, quote, star rating (1-5), featured flag, display order
- `siteSettings` schema includes: companyName, shortName, tagline, description, year founded, credentials (licensed/insured/bonded booleans), service areas array
- `contactInfo` schema includes: phone (office/direct with formatted and raw versions), email, response time, full address object with Google Maps URL

**Seeding**: `scripts/seed-sanity.ts` — Migrates content from TypeScript files to Sanity (run via `npm run seed`)
- Uses `dotenv` to load `.env.local` variables (SANITY_API_WRITE_TOKEN, project ID, dataset)
- Creates/replaces singletons (siteSettings, contactInfo, navigation, footer)
- Seeds services and testimonials from `src/content/` arrays

### Next.js Configuration
**Image Optimization** (`next.config.mjs`):
- Configured `remotePatterns` for `next/image` optimization
- Allowed domains:
  - `cdn.sanity.io` — Sanity CMS image hosting (required for CMS images)
  - `images.unsplash.com` — External image assets (placeholder/demo content)

### Fonts
Loaded via `next/font` in `src/app/layout.tsx`:
- Display: Playfair Display (`--font-playfair` / `font-display`) — weights 500/600/700/800
- Body: Source Serif 4 (`--font-source-serif` / `font-source-serif`) — weights 400/600, normal & italic styles
- Icons: Material Symbols Outlined (loaded via Google Fonts link in `<head>`)

## Quality Gates (Definition of Done)

- Lighthouse mobile: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- WCAG AA contrast, keyboard nav, skip link (already in layout)
- Semantic HTML: single `h1` per page, proper heading order
- JSON-LD: LocalBusiness + Service + FAQ + Breadcrumbs per page type

## Key Rules

### Frontend
- App Router in `src/app/`, Server Components by default
- Root layout (`src/app/layout.tsx`) renders `<html>` and `<body>`, includes LayoutWrapper (which handles Header/Footer), StickyMobileCTA, and skip link
- Main content wrapper includes `overflow-x-hidden` class to prevent horizontal scroll issues on mobile
- Nested layouts must NOT render html/body tags (root layout handles these)
- `next/image` for images, `next/font` for fonts
- Minimal client JS — avoid heavy animation libraries

### SEO
- Every page: title (50-60 chars), meta description (150-160 chars), canonical, OG/Twitter
- Consistent NAP across footer/contact/schema (use `company.ts`)
- JSON-LD schemas required for indexable pages

### Copy
- No unverified claims (bonded status is `false` in company.ts)
- Response expectation: "within 1-24 hours"
- 8th-10th grade reading level

### UI/UX
- Mobile-first, 44px minimum tap targets
- Focus rings, proper form labels, helpful errors
- Trust indicators as reusable components

## Component Patterns

### Client vs Server Components
- **Server Components** (default): Header/Footer, page content, static sections
- **Client Components** (`"use client"`): MobileMenu, interactive UI (forms, modals, state management), HashLink
- Keep client boundaries minimal — hoist interactivity to leaf components

### Navigation & Hash Links
**HashLink Component** (`src/components/ui/HashLink.tsx`):
- Client component for handling cross-page hash navigation (`/#process`, `/#testimonials`)
- When on home page: smooth scrolls to target element
- When on other pages: navigates to home, then scrolls to target with retry logic
- Used in Header and MobileMenu for hash links (non-hash links use standard `next/link`)

### UI Components

**Card** (`src/components/ui/Card.tsx`):
- Flexible card component with variant system
- Variants: `dark` (navy with gold border), `light` (white background), `elevated` (with gold glow)
- Padding options: `none`, `sm`, `md`, `lg` (default)
- Includes overflow-hidden for proper content containment
- Used throughout site for service cards, area cards, contact cards

**LocationMap** (`src/components/ui/LocationMap.tsx`):
- Google Maps embed component using `@next/third-parties/google` GoogleMapsEmbed
- Props: `query` (address/place name), optional `height` (default 400px), `zoom` (default 12), `className`, `showLink` (default true)
- Mode: "place" with query-based location
- Requires `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable
- Graceful fallback when API key missing (shows gray placeholder)
- Includes "Open in Google Maps" link below map (can be disabled via `showLink={false}`)
- Used on contact page to show service area
- Rounded corners with shadow-lg styling

**GHLFormContainer** (`src/components/ui/GHLFormContainer.tsx`):
- Client component for GoHighLevel (GHL) form embeds via secure iframe
- Props: `formUrl` (required, iframe src URL), optional `title`, `description`, `minHeight` (default 500px), `className`
- Handles iframe resize messages from GHL domain (leadconnectorhq.com) via postMessage API
- Styled with brand colors: navy header for title/description, white card background, shadow-lg
- Iframe settings: lazy loading, allows geolocation, no border
- Responsive padding: p-4 mobile, p-6 desktop

### Navigation Links
Defined in `getLayoutData()` with fallback, reused across Header, MobileMenu, Footer:
```ts
const defaultNavLinks = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "How It Works", href: "/#process" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];
```

### Accessibility Features
- **Skip Link**: Main layout includes skip-to-content link (first focusable element)
- **Focus Management**: MobileMenu auto-focuses close button on open, traps focus, handles Escape key
- **ARIA**: Proper landmarks (`nav`, `main`, `footer`), labels, and modal roles
- **Tap Targets**: All interactive elements minimum 44x44px
- **Keyboard Nav**: All functionality accessible via keyboard

## Dependencies

### Core
- `next@^15.1.4` — App Router, React 19, Server Components
- `react@^19.0.0`, `react-dom@^19.0.0`
- `typescript@^5.7.2`
- `@next/third-parties@^16.1.1` — Google Maps & analytics integrations

### CMS & Content
- `sanity@^3.99.0` — Sanity Studio & client
- `next-sanity@^9.12.3` — Next.js integration for Sanity
- `@sanity/image-url@^1.2.0` — Image URL builder
- `@sanity/vision@^3.99.0` — GROQ query playground

### Styling
- `tailwindcss@^3.4.17`
- `@tailwindcss/forms@^0.5.10` — Form styling plugin
- `autoprefixer@^10.4.20`, `postcss@^8.4.49`

### SEO & Build
- `schema-dts@^1.1.5` — TypeScript definitions for Schema.org JSON-LD
- `sharp@^0.34.5` — Image optimization (favicon/OG generation)
- `dotenv@^17.2.3` — Environment variable loading (dev dependency, used in seed script)

## Content Management Workflow

1. **Initial Setup**: Run `npm run seed` to populate Sanity with content from `src/content/`
2. **Editing Content**: Access Sanity Studio at `localhost:3000/studio` (dev) or `yourdomain.com/studio` (production)
3. **Content Updates**: Edit singletons (site settings, contact, nav, footer) or documents (services, testimonials, pages) in Studio
4. **Automatic Fallback**: If Sanity is unreachable, layout components gracefully fall back to TypeScript content files

## Pages

**Static Routes**:
- `/` — Home page (hero, services, process, testimonials, CTA)
- `/services` — Services listing with standardized hero section and grid layout. Page wrapper includes `overflow-x-hidden` to prevent mobile horizontal scroll. Responsive decorative gold glow elements (w-48/h-48 mobile → w-96/h-96 desktop)
- `/service-areas` — Service areas page with standardized hero section (gradient background, pattern overlay, gold glow, breadcrumbs, badge), neighborhoods grid using Card component (8 Santa Clarita Valley areas with ZIP codes), SectionDividers, and CTASection. Areas include: Santa Clarita, Valencia, Saugus, Canyon Country, Newhall, Stevenson Ranch, Castaic, Agua Dulce. Responsive grid: 1 col mobile, 2 col sm, 3 col lg, 4 col xl. Mobile-optimized with responsive typography and padding
- `/contact` — Contact page with standardized hero, phone/email cards with hover effects, response time indicator, service area map (Google Maps via LocationMap component with "Open in Google Maps" link), and address link. Page wrapper includes `overflow-x-hidden`, responsive decorative elements. Mobile-responsive with proper tap targets
- `/get-quote` — Quote request page
- `/studio` — Sanity CMS Studio (embedded, noindex)

## Schema Reference

**Singletons** (one instance per site):
- `siteSettings`: Company name, tagline, description, credentials, service areas
- `contactInfo`: Phone numbers, email, address, response time
- `navigation`: Main nav links, CTA button
- `footer`: Quick links, copyright text

**Documents** (collections):
- `service`: Title, slug, description, icon, features, image, order
- `testimonial`: Author, location, quote, rating, featured flag, order
- `page`: Title, slug, SEO fields, sections array (composable page builder)

**Page Sections** (objects):
- `heroSection`: Headline, subheadline, CTA buttons, background image
- `servicesGrid`: Service references, layout options
- `processSteps`: Step-by-step process with icons
- `trustSection`: Trust indicators, credentials display
- `testimonialsSection`: Testimonial references
- `ctaSection`: Call-to-action with custom copy

## Implementation Plans

Recent implementation plans are stored in `docs/plans/`:
- `2025-12-29-website-enhancements.md` — Hash link navigation fixes, Service Areas page, GHL form container, Google Maps integration, Sanity schema descriptions (COMPLETED)
- `2025-12-29-service-areas-mobile-fixes.md` — Service Areas page standardization (shared components, mobile responsiveness, LocationMap Google Maps link) (COMPLETED)
- `2025-12-29-mobile-overflow-fixes.md` — Mobile horizontal overflow fixes and navigation visibility improvements (COMPLETED)

**Completed Features** (commit b27a7ba):
- HashLink component for cross-page hash navigation
- Service Areas page with 8 Santa Clarita Valley neighborhoods
- GHLFormContainer for GoHighLevel form embeds
- LocationMap with Google Maps integration and "Open in Google Maps" link
- Mobile-responsive design patterns across all pages
- Standardized hero sections with gradient, pattern, breadcrumbs
- Card component with proper mobile padding and responsive typography

**Mobile Responsiveness Focus**:
- Overflow containment: `overflow-x-hidden` on html, body, page wrappers (`<div className="relative overflow-x-hidden">`), and main content element
- Responsive decorative elements: Gold glow elements scale down on mobile (w-48/h-48 mobile → w-96/h-96 desktop) across contact and services pages
- Header mobile optimization: Reduced padding (px-3 sm:px-6, py-2 sm:py-3), smaller logo (h-8 sm:h-10 md:h-12)
- Mobile menu: Uses max-w-[85vw] on small screens, hamburger button has visible gold background (bg-gold/10) for improved visibility
- Sticky mobile CTA: Increased bottom padding (pb-24) to prevent content overlap with fixed CTA bar

Use `superpowers:executing-plans` skill when implementing new plans.

## Open Questions (Confirm Before Final Copy)
- Complete services list
- Primary CTA choice (Call vs Request estimate vs Book consult)
- Persona split (Homeowners vs Realtors/Agents)
- "No upfront cost / pay at close" offer (only if true)
