# Prep It List It Sell It — Tech Stack

**Date:** 2025-12-26
**Status:** Locked

---

## Overview

Lean, modern stack optimized for performance, client self-service, and maintainability.

---

## Core Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 15.x | React framework, App Router |
| UI | React | 19.x | Component library |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| Forms Plugin | @tailwindcss/forms | 0.5.x | Form reset styles |
| SEO Schemas | schema-dts | 1.x | Typed JSON-LD |

---

## Infrastructure

| Service | Choice | Tier | Purpose |
|---------|--------|------|---------|
| Hosting | Vercel | Free | Deployment, CDN, previews |
| Analytics | Vercel Analytics | Free | Traffic, Core Web Vitals |
| CMS | Sanity | Free | Content management |
| Images | Sanity | Free | Image CDN + optimization |
| Forms Backend | GoHighLevel | — | Lead capture, CRM |
| Notifications | GoHighLevel | — | Email/SMS follow-up |

---

## Sanity Configuration

| Setting | Value |
|---------|-------|
| Project ID | `y0wm5pjl` |
| Dataset | `production` |
| Studio URL | `/studio` |
| API Version | `2024-01-01` |

### Content Types (Schemas)

| Schema | Fields | Client Editable |
|--------|--------|-----------------|
| `service` | title, slug, description, icon, features, image | ✓ |
| `testimonial` | author, location, quote, rating, service | ✓ |
| `galleryItem` | title, beforeImage, afterImage, service, description | ✓ |
| `company` | name, phone, email, address, hours, serviceAreas | ✓ |
| `page` | title, slug, seo, content blocks | ✓ |

---

## Packages

### Currently Installed

```json
{
  "dependencies": {
    "@tailwindcss/forms": "^0.5.10",
    "next": "^15.1.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.1.4",
    "postcss": "^8.4.49",
    "schema-dts": "^1.1.5",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2"
  }
}
```

### To Add

```bash
# Sanity CMS
npm install @sanity/client next-sanity @sanity/image-url sanity

# Vercel Analytics
npm install @vercel/analytics

# Fonts (already using next/font, just add Source Serif 4)
# No package needed - loaded via next/font/google
```

---

## Animation Strategy

**Approach:** CSS-only (no JS animation libraries)

| Animation | Implementation |
|-----------|----------------|
| Fill reveal (buttons) | `background-position` transition |
| Glow emergence (cards) | `::before` pseudo-element + opacity |
| Underline slide (links) | `::after` width transition |
| Staggered reveal | `animation-delay` + `@keyframes` |
| Reduced motion | `prefers-reduced-motion` media query |

**Rationale:** All design system animations achievable with CSS. No Framer Motion = ~25kb saved, better Lighthouse scores.

---

## Form Handling

**Flow:**
```
User submits form
    ↓
Next.js Server Action validates
    ↓
POST to GHL webhook
    ↓
GHL creates contact + triggers automation
    ↓
User sees success message
```

**No React Hook Form** — Native form + server action is sufficient for 2 simple forms.

---

## Image Optimization

| Source | Handling |
|--------|----------|
| Sanity images | `@sanity/image-url` + `next/image` |
| Static assets | `/public` folder + `next/image` |
| Logo | Local `/public/logo/` |

**Sanity Image URL Builder:**
```tsx
import imageUrlBuilder from '@sanity/image-url'

// Generates optimized URLs with width, height, format
urlFor(image).width(800).height(600).format('webp').url()
```

---

## Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=y0wm5pjl
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<write-token-for-preview>

# GHL
GHL_WEBHOOK_URL=<webhook-url>
GHL_LOCATION_ID=<location-id>

# Vercel (auto-injected)
VERCEL_URL
VERCEL_ENV
```

---

## Project Structure

```
src/
├── app/
│   ├── (site)/           # Public pages
│   │   ├── page.tsx      # Homepage
│   │   ├── services/
│   │   ├── for-agents/
│   │   ├── gallery/
│   │   ├── reviews/
│   │   ├── get-quote/
│   │   ├── contact/
│   │   └── service-areas/
│   ├── studio/           # Sanity Studio
│   │   └── [[...index]]/
│   ├── api/
│   │   └── draft/        # Preview mode
│   └── layout.tsx
├── components/
│   ├── ui/               # Design system components
│   ├── sections/         # Page sections
│   └── seo/              # Schema components
├── lib/
│   ├── sanity/
│   │   ├── client.ts     # Sanity client
│   │   ├── queries.ts    # GROQ queries
│   │   └── image.ts      # Image URL builder
│   └── ghl/
│       └── forms.ts      # GHL webhook helpers
├── sanity/
│   ├── schemas/          # Content schemas
│   ├── schema.ts         # Schema index
│   └── sanity.config.ts  # Studio config
└── styles/
    ├── globals.css
    └── brand-tokens.ts
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 95+ |
| Lighthouse SEO | 95+ |
| First Contentful Paint | <1.8s |
| Largest Contentful Paint | <2.5s |
| Cumulative Layout Shift | <0.1 |

---

## Deployment

| Environment | URL | Branch |
|-------------|-----|--------|
| Production | prepitlistitsellit.com | `main` |
| Preview | Auto-generated | PR branches |
| Local | localhost:3000 | — |

**Deploy process:**
1. Push to `main` → Vercel auto-deploys
2. PR branches get preview URLs
3. Sanity content changes trigger revalidation

---

## Security

| Concern | Solution |
|---------|----------|
| API tokens | Environment variables only |
| Form spam | GHL handles, add honeypot field |
| Sanity Studio access | Sanity authentication |
| Preview mode | Draft token + cookie |

---

## Not Using (Intentional)

| Technology | Reason |
|------------|--------|
| Framer Motion | CSS handles all animations, saves 25kb |
| React Hook Form | 2 simple forms, server actions sufficient |
| Separate email service | GHL handles notifications |
| Cloudinary | Sanity includes image CDN |
| Database | Sanity is the data layer |

---

*Tech stack locked: 2025-12-26*
