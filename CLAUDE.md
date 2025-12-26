# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Local-SEO focused Next.js 15 website for **Prep It List It Sell It Services** (home improvement/listing prep in Santa Clarita Valley). Uses React 19, Tailwind CSS, and TypeScript.

**Scope**: Website + brand kit only. GHL/voice workflows live elsewhere.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run typecheck  # TypeScript check (tsc --noEmit)
npm run lint       # ESLint
npm start          # Start production server
```

## Architecture

### Content System
All structured content lives in `src/content/` — never hardcode long copy in components:
- `company.ts` — NAP (name/address/phone), contact info, service areas, credentials (source of truth)
- `services.ts` — Service definitions with icons (Material Symbols names), features, descriptions
- `testimonials.ts` — Customer reviews
- `seo-keywords.ts` — Keyword strategy

### Brand System
- `src/styles/brand-tokens.ts` — Design tokens (colors, fonts, spacing, shadows)
- `tailwind.config.ts` — Tailwind extension using brand colors (navy/gold palette)
- `src/styles/globals.css` — Utility classes, component styles

**Color palette**: Navy (`#1B2838`) + Gold (`#D4A74A`). Use semantic names: `text-navy`, `bg-gold`, `text-gold-gradient`.

### SEO Components
- `src/components/seo/LocalBusinessSchema.tsx` — JSON-LD structured data (HomeAndConstructionBusiness type)
- Root layout handles metadata template, OpenGraph, Twitter cards
- Uses `schema-dts` for typed JSON-LD

### Fonts
Loaded via `next/font` in layout.tsx:
- Display: Playfair Display (`font-display`)
- Body: Inter (`font-body`)
- Icons: Material Symbols Outlined (loaded via Google Fonts link)

## Quality Gates (Definition of Done)

- Lighthouse mobile: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- WCAG AA contrast, keyboard nav, skip link (already in layout)
- Semantic HTML: single `h1` per page, proper heading order
- JSON-LD: LocalBusiness + Service + FAQ + Breadcrumbs per page type

## Key Rules

### Frontend
- App Router in `src/app/`, Server Components by default
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

## Open Questions (Confirm Before Final Copy)
- Complete services list
- Primary CTA choice (Call vs Request estimate vs Book consult)
- Persona split (Homeowners vs Realtors/Agents)
- "No upfront cost / pay at close" offer (only if true)
