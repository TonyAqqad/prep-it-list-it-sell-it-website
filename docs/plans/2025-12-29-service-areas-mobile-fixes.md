# Service Areas Page & Mobile Optimization Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Standardize the Service Areas page to match site design patterns and fix mobile responsiveness issues across the site.

**Architecture:** Update Service Areas page to use shared components (Breadcrumbs, SectionDivider, CTASection, Card), add explicit Google Maps link for better mobile UX, and audit/fix responsive breakpoints.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript

---

## Task 1: Standardize Service Areas Hero Section

**Files:**
- Modify: `src/app/service-areas/page.tsx`

**Step 1: Add missing imports**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { serviceAreas, serviceAreasIntro } from "@/content/service-areas";
import { Breadcrumbs, SectionDivider, Card } from "@/components/ui";
import { CTASection } from "@/components/sections";
```

**Step 2: Update hero section with gradient, pattern, glow, breadcrumbs, and badge**

Replace the hero section (lines 18-30) with:

```tsx
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-overlay opacity-50" />

        {/* Gold accent glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="relative z-10 container-section">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />

          <div className="text-center mt-8 max-w-3xl mx-auto">
            <span className="badge badge-gold mb-6">Service Areas</span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Proudly Serving the{" "}
              <span className="text-gold-gradient">Santa Clarita Valley</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-8">
              {serviceAreasIntro.description}
            </p>
          </div>
        </div>
      </section>
```

**Step 3: Verify page loads**

Run: Open `http://localhost:3000/service-areas` in browser
Expected: Hero section with gradient background, pattern, breadcrumbs, badge, and gold-gradient text

---

## Task 2: Update Areas Grid Section with Card Component

**Files:**
- Modify: `src/app/service-areas/page.tsx`

**Step 1: Add SectionDivider after hero and update grid section**

Replace the areas grid section (lines 32-51) with:

```tsx
      <SectionDivider />

      {/* Areas Grid */}
      <section className="py-16 sm:py-20 md:py-28 bg-background-light">
        <div className="container-section">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              Neighborhoods We Serve
            </h2>
            <p className="text-base sm:text-lg text-navy/60 max-w-2xl mx-auto">
              From Valencia to Agua Dulce, we know what buyers in each area are looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {serviceAreas.map((area) => (
              <Card
                key={area.slug}
                variant="light"
                className="p-4 sm:p-6 hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <h3 className="text-xl sm:text-2xl font-display font-bold text-navy mb-2 sm:mb-3">
                  {area.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{area.description}</p>
                {area.zipCodes && (
                  <p className="text-xs sm:text-sm text-gray-500 break-words">
                    ZIP codes: {area.zipCodes.join(", ")}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
```

**Step 2: Verify cards render correctly**

Run: Refresh `http://localhost:3000/service-areas`
Expected: Cards with proper styling, hover effects, responsive grid

---

## Task 3: Replace CTA Section with Shared Component

**Files:**
- Modify: `src/app/service-areas/page.tsx`

**Step 1: Replace inline CTA with CTASection component**

Replace the CTA section (lines 53-71) with:

```tsx
      <SectionDivider />

      {/* CTA Section */}
      <CTASection
        heading="Ready to Prep Your Home?"
        subheading="Whether you're in Valencia or Agua Dulce, we'll help get your home market-ready. Get a free consultation today."
      />
```

**Step 2: Verify CTA renders**

Run: Refresh `http://localhost:3000/service-areas`
Expected: CTA section matches other pages (Contact, etc.)

---

## Task 4: Add Google Maps Link to LocationMap Component

**Files:**
- Modify: `src/components/ui/LocationMap.tsx`

**Step 1: Add Icon import and link prop**

```tsx
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { Icon } from "./Icon";

interface LocationMapProps {
  /** Location query for the map (address or place name) */
  query: string;
  /** Optional height in pixels */
  height?: number;
  /** Optional zoom level (1-20) */
  zoom?: number;
  /** Optional additional CSS classes */
  className?: string;
  /** Show "Open in Google Maps" link below map */
  showLink?: boolean;
}
```

**Step 2: Update component to include link**

```tsx
export function LocationMap({
  query,
  height = 400,
  zoom = 12,
  className = "",
  showLink = true,
}: LocationMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center rounded-lg ${className}`}
        style={{ height }}
      >
        <p className="text-gray-500">Map unavailable</p>
      </div>
    );
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className={className}>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <GoogleMapsEmbed
          apiKey={apiKey}
          height={height}
          width="100%"
          mode="place"
          q={query}
          zoom={String(zoom)}
        />
      </div>
      {showLink && (
        <div className="mt-4 text-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 hover:underline transition-colors font-medium"
          >
            <Icon name="open_in_new" size="sm" />
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}
```

**Step 3: Verify link appears on contact page**

Run: Open `http://localhost:3000/contact`
Expected: "Open in Google Maps" link below the map that opens Google Maps when clicked

---

## Task 5: Mobile Font Scaling Audit

**Files:**
- Modify: `src/app/page.tsx` (home page)
- Modify: `src/app/services/page.tsx`

**Step 1: Check home page hero for mobile scaling**

Ensure hero headline uses responsive sizing:
```tsx
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold"
```

**Step 2: Check all section headings use responsive patterns**

Pattern for section headings:
```tsx
className="text-2xl sm:text-3xl md:text-4xl font-display font-bold"
```

Pattern for body text:
```tsx
className="text-base sm:text-lg"
```

**Step 3: Run visual check**

Run: Open DevTools > Toggle device toolbar > iPhone SE (375px)
Expected: Text is readable, no overflow, proper hierarchy

---

## Task 6: Mobile Card Layout Fixes

**Files:**
- Modify: `src/styles/globals.css` (if needed)

**Step 1: Verify card component has mobile-friendly defaults**

Check that `.card` class in globals.css doesn't have fixed widths or heights that break mobile.

**Step 2: Ensure all card grids use mobile-first breakpoints**

Pattern:
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
```

**Step 3: Add safe padding for mobile cards**

If cards have p-6 or p-8, change to:
```tsx
className="p-4 sm:p-6 md:p-8"
```

---

## Task 7: Content Overflow Fixes

**Files:**
- Modify: `src/components/ui/Card.tsx` (if needed)
- Modify: Various page files

**Step 1: Add overflow-hidden to card containers**

Ensure cards have:
```tsx
className="overflow-hidden"
```

**Step 2: Add word-break to long content**

For emails, URLs, ZIP codes:
```tsx
className="break-words"
```

**Step 3: Test on narrow viewport**

Run: DevTools > 320px width
Expected: No horizontal scroll, all content wraps properly

---

## Task 8: TypeScript Check & Final Verification

**Step 1: Run TypeScript check**

Run: `npm run typecheck`
Expected: No errors

**Step 2: Visual verification checklist**

- [ ] Service Areas hero matches Contact page style
- [ ] Cards have hover effects
- [ ] SectionDividers between sections
- [ ] CTASection at bottom
- [ ] Google Maps link works
- [ ] Mobile: text readable at 375px
- [ ] Mobile: no horizontal scroll
- [ ] Mobile: cards stack properly

**Step 3: Commit all changes**

```bash
git add -A
git commit -m "feat: standardize service areas page and fix mobile responsiveness

- Update Service Areas page to match site design patterns
- Add Breadcrumbs, SectionDivider, CTASection, Card components
- Add gradient hero with pattern overlay and gold glow
- Add Google Maps 'Open in Maps' link for mobile UX
- Fix mobile font scaling across pages
- Fix card layout and spacing on mobile
- Fix content overflow issues"
```

---

## Execution Checklist

- [ ] Task 1: Service Areas hero standardization
- [ ] Task 2: Areas grid with Card component
- [ ] Task 3: CTASection replacement
- [ ] Task 4: LocationMap Google Maps link
- [ ] Task 5: Mobile font scaling audit
- [ ] Task 6: Mobile card layout fixes
- [ ] Task 7: Content overflow fixes
- [ ] Task 8: TypeScript check & verification
