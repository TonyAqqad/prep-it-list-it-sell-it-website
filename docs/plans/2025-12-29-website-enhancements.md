# Website Enhancements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix navigation hash links, add Service Areas page, create GHL form container, add Google Maps embed, and add Sanity schema descriptions.

**Architecture:** Client-side navigation handlers for hash links, new static page for service areas, reusable form container component, Google Maps via @next/third-parties, Sanity schema field descriptions.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Sanity CMS, Google Maps Embed API

---

## Task 1: Fix Navigation Hash Links

**Problem:** Hash links (`/#process`, `/#testimonials`) don't scroll to sections when clicked from non-home pages.

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/MobileMenu.tsx`

### Step 1: Create HashLink component

Create a new client component that handles cross-page hash navigation.

**File:** `src/components/ui/HashLink.tsx`

```tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, MouseEvent, ReactNode } from "react";

interface HashLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function HashLink({ href, children, className, onClick }: HashLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Only handle hash links to home page
      if (!href.startsWith("/#")) {
        onClick?.();
        return;
      }

      const hash = href.slice(1); // Remove leading "/"
      const targetId = hash.slice(1); // Remove "#"

      // If already on home page, just scroll
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        onClick?.();
        return;
      }

      // If on different page, navigate then scroll
      e.preventDefault();
      router.push("/");

      // Wait for navigation, then scroll
      const checkAndScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // Retry if element not found yet
          setTimeout(checkAndScroll, 100);
        }
      };

      setTimeout(checkAndScroll, 150);
      onClick?.();
    },
    [href, pathname, router, onClick]
  );

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
```

### Step 2: Update Header.tsx to use HashLink

**File:** `src/components/layout/Header.tsx`

Replace `Link` with `HashLink` for hash links in the navigation.

```tsx
// Add import at top
import { HashLink } from "@/components/ui/HashLink";

// In the nav links mapping, replace:
// <Link href={link.href} ...>
// With conditional:
{link.href.startsWith("/#") ? (
  <HashLink href={link.href} className="...">
    {link.label}
  </HashLink>
) : (
  <Link href={link.href} className="...">
    {link.label}
  </Link>
)}
```

### Step 3: Update MobileMenu.tsx to use HashLink

**File:** `src/components/layout/MobileMenu.tsx`

Same pattern as Header - use HashLink for hash links, passing the close function.

```tsx
// Add import
import { HashLink } from "@/components/ui/HashLink";

// In nav links mapping:
{link.href.startsWith("/#") ? (
  <HashLink
    href={link.href}
    className="..."
    onClick={onClose}
  >
    {link.label}
  </HashLink>
) : (
  <Link href={link.href} className="..." onClick={onClose}>
    {link.label}
  </Link>
)}
```

### Step 4: Test hash links

Run dev server and verify:
1. From home page: `/#process` and `/#testimonials` scroll smoothly
2. From `/services`: clicking `/#process` navigates to home and scrolls
3. From `/contact`: clicking `/#testimonials` navigates to home and scrolls

---

## Task 2: Add Service Areas Page

**Files:**
- Create: `src/app/service-areas/page.tsx`
- Create: `src/content/service-areas.ts`
- Modify: `src/content/company.ts` (add detailed area data)
- Modify: Navigation in Sanity or fallback

### Step 1: Create service areas content file

**File:** `src/content/service-areas.ts`

```typescript
export interface ServiceArea {
  name: string;
  slug: string;
  description: string;
  zipCodes?: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    name: "Santa Clarita",
    slug: "santa-clarita",
    description: "Serving all Santa Clarita neighborhoods including Valencia, Saugus, Canyon Country, and Newhall.",
    zipCodes: ["91350", "91351", "91354", "91355", "91381", "91387"],
  },
  {
    name: "Valencia",
    slug: "valencia",
    description: "Master-planned community with diverse housing styles from condos to custom estates.",
    zipCodes: ["91354", "91355", "91381"],
  },
  {
    name: "Saugus",
    slug: "saugus",
    description: "Historic area with established neighborhoods and newer developments.",
    zipCodes: ["91350", "91390"],
  },
  {
    name: "Canyon Country",
    slug: "canyon-country",
    description: "Growing community with a mix of single-family homes and equestrian properties.",
    zipCodes: ["91351", "91387"],
  },
  {
    name: "Newhall",
    slug: "newhall",
    description: "The heart of Santa Clarita with historic Main Street and surrounding residential areas.",
    zipCodes: ["91321", "91381"],
  },
  {
    name: "Stevenson Ranch",
    slug: "stevenson-ranch",
    description: "Upscale planned community known for excellent schools and family-friendly amenities.",
    zipCodes: ["91381"],
  },
  {
    name: "Castaic",
    slug: "castaic",
    description: "Northern gateway to Santa Clarita Valley with lake access and mountain views.",
    zipCodes: ["91384"],
  },
  {
    name: "Agua Dulce",
    slug: "agua-dulce",
    description: "Rural community with ranch properties and custom homes on larger lots.",
    zipCodes: ["91390"],
  },
];

export const serviceAreasIntro = {
  headline: "Proudly Serving the Santa Clarita Valley",
  subheadline: "Local expertise for every neighborhood in our community",
  description: "We know the Santa Clarita Valley because we live here. From Valencia's master-planned communities to Agua Dulce's ranch properties, we understand what buyers are looking for in each unique area.",
};
```

### Step 2: Create Service Areas page

**File:** `src/app/service-areas/page.tsx`

```tsx
import { Metadata } from "next";
import Link from "next/link";
import { serviceAreas, serviceAreasIntro } from "@/content/service-areas";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Service Areas | Santa Clarita Valley Home Prep Services",
  description: "Prep It List It Sell It serves Santa Clarita, Valencia, Saugus, Canyon Country, Newhall, Stevenson Ranch, Castaic, and Agua Dulce. Local home improvement for listing prep.",
  openGraph: {
    title: "Service Areas | Prep It List It Sell It",
    description: "Serving all Santa Clarita Valley neighborhoods with professional home prep services.",
  },
};

export default function ServiceAreasPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="container-section">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {serviceAreasIntro.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gold font-medium mb-6">
            {serviceAreasIntro.subheadline}
          </p>
          <p className="text-lg text-gray-300 max-w-3xl">
            {serviceAreasIntro.description}
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-section">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area) => (
              <article key={area.slug} className="card p-6">
                <h2 className="text-2xl font-display font-bold text-navy mb-3">
                  {area.name}
                </h2>
                <p className="text-gray-700 mb-4">{area.description}</p>
                {area.zipCodes && (
                  <p className="text-sm text-gray-500">
                    ZIP codes: {area.zipCodes.join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy text-white">
        <div className="container-section text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Prep Your Home?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re in Valencia or Agua Dulce, we&apos;ll help get your home market-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote" className="btn btn-primary">
              Get a Free Quote
            </Link>
            <Link href="/contact" className="btn bg-white text-navy hover:bg-gray-100">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

### Step 3: Add Service Areas to navigation

Update the nav links in `src/components/layout/Header.tsx` to include Service Areas:

```typescript
const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "How It Works", href: "/#process" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];
```

### Step 4: Test the page

1. Navigate to `/service-areas`
2. Verify all areas display correctly
3. Check mobile responsiveness
4. Verify nav link works from all pages

---

## Task 3: Create GHL Form Container Component

**Files:**
- Create: `src/components/ui/GHLFormContainer.tsx`

### Step 1: Create the form container component

**File:** `src/components/ui/GHLFormContainer.tsx`

```tsx
"use client";

interface GHLFormContainerProps {
  /** The GHL iframe embed code */
  embedCode: string;
  /** Optional title above the form */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Optional additional CSS classes */
  className?: string;
}

export function GHLFormContainer({
  embedCode,
  title,
  description,
  className = "",
}: GHLFormContainerProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="bg-navy text-white px-6 py-4">
          {title && (
            <h3 className="text-xl font-display font-bold">{title}</h3>
          )}
          {description && (
            <p className="text-gray-300 text-sm mt-1">{description}</p>
          )}
        </div>
      )}
      <div
        className="ghl-form-wrapper p-4 md:p-6"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
      <style jsx>{`
        .ghl-form-wrapper iframe {
          width: 100% !important;
          min-height: 500px;
          border: none;
        }
      `}</style>
    </div>
  );
}
```

**Note:** The `dangerouslySetInnerHTML` is used here because GHL provides iframe embed codes that must be injected as HTML. The embed code should only come from trusted GHL sources (admin-controlled, not user input).

### Step 2: Example usage

Add to any page where a GHL form is needed:

```tsx
import { GHLFormContainer } from "@/components/ui/GHLFormContainer";

// In the component:
<GHLFormContainer
  embedCode='<iframe src="https://api.leadconnectorhq.com/widget/form/YOUR_FORM_ID" style="width:100%;height:100%;border:none;"></iframe>'
  title="Request a Free Quote"
  description="We'll respond within 1-24 hours"
/>
```

---

## Task 4: Add Google Maps Embed to Contact Page

**Files:**
- Modify: `src/app/contact/page.tsx`
- Create: `src/components/ui/LocationMap.tsx`

### Step 1: Install Google Maps package (if not already installed)

```bash
npm install @next/third-parties
```

### Step 2: Create LocationMap component

**File:** `src/components/ui/LocationMap.tsx`

```tsx
import { GoogleMapsEmbed } from "@next/third-parties/google";

interface LocationMapProps {
  /** Location query for the map (address or place name) */
  query: string;
  /** Optional height in pixels */
  height?: number;
  /** Optional zoom level (1-20) */
  zoom?: number;
  /** Optional additional CSS classes */
  className?: string;
}

export function LocationMap({
  query,
  height = 400,
  zoom = 12,
  className = "",
}: LocationMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <p className="text-gray-500">Map unavailable</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <GoogleMapsEmbed
        apiKey={apiKey}
        height={height}
        width="100%"
        mode="place"
        q={query}
        zoom={zoom}
      />
    </div>
  );
}
```

### Step 3: Add map to contact page

**File:** `src/app/contact/page.tsx`

Add the LocationMap component to the contact page:

```tsx
import { LocationMap } from "@/components/ui/LocationMap";

// In the JSX, add after the contact info section:
<section className="py-12 bg-cream">
  <div className="container-section">
    <h2 className="text-2xl font-display font-bold text-navy mb-6 text-center">
      Serving the Santa Clarita Valley
    </h2>
    <LocationMap
      query="Santa Clarita, CA"
      height={400}
      zoom={11}
      className="max-w-4xl mx-auto"
    />
  </div>
</section>
```

### Step 4: Test the map

1. Verify map loads on `/contact`
2. Check that it's responsive
3. Verify API key is working (no billing errors)

---

## Task 5: Add Sanity Schema Descriptions

**Files:**
- Modify: `src/sanity/schemas/singletons/siteSettings.ts`
- Modify: `src/sanity/schemas/singletons/contactInfo.ts`
- Modify: `src/sanity/schemas/documents/service.ts`
- Modify: `src/sanity/schemas/documents/testimonial.ts`
- (And other schemas as needed)

### Step 1: Add descriptions to siteSettings

**File:** `src/sanity/schemas/singletons/siteSettings.ts`

Add `description` property to each field:

```typescript
{
  name: "companyName",
  title: "Company Name",
  type: "string",
  description: "Your business name as it should appear across the site (e.g., 'Prep It List It Sell It Services')",
  validation: (Rule) => Rule.required(),
},
{
  name: "tagline",
  title: "Tagline",
  type: "string",
  description: "A short phrase that appears with your logo (e.g., 'Get Your Home Market-Ready')",
},
{
  name: "description",
  title: "Site Description",
  type: "text",
  rows: 3,
  description: "A 1-2 sentence description of your business. Used for SEO and when sharing links on social media.",
},
```

### Step 2: Add descriptions to contactInfo

**File:** `src/sanity/schemas/singletons/contactInfo.ts`

```typescript
{
  name: "phone",
  title: "Phone Number",
  type: "string",
  description: "Primary business phone. Format: (XXX) XXX-XXXX",
},
{
  name: "email",
  title: "Email Address",
  type: "string",
  description: "Main contact email. This is where form submissions will be sent.",
},
{
  name: "address",
  title: "Business Address",
  type: "object",
  description: "Your physical address (shown in footer and used for local SEO)",
  fields: [
    { name: "street", title: "Street", type: "string", description: "Street address" },
    { name: "city", title: "City", type: "string", description: "City name" },
    { name: "state", title: "State", type: "string", description: "State abbreviation (e.g., CA)" },
    { name: "zip", title: "ZIP Code", type: "string", description: "5-digit ZIP code" },
  ],
},
```

### Step 3: Add descriptions to service schema

**File:** `src/sanity/schemas/documents/service.ts`

```typescript
{
  name: "title",
  title: "Service Name",
  type: "string",
  description: "The name of this service (e.g., 'Deep Cleaning', 'Handyman Repairs')",
  validation: (Rule) => Rule.required(),
},
{
  name: "slug",
  title: "URL Slug",
  type: "slug",
  description: "The URL path for this service page. Click 'Generate' to create from title.",
  options: { source: "title" },
},
{
  name: "description",
  title: "Short Description",
  type: "text",
  rows: 3,
  description: "A brief summary (2-3 sentences) shown on the services list page.",
},
{
  name: "icon",
  title: "Icon Name",
  type: "string",
  description: "Material Symbol icon name (e.g., 'cleaning_services', 'handyman'). Find icons at fonts.google.com/icons",
},
```

### Step 4: Add descriptions to testimonial schema

**File:** `src/sanity/schemas/documents/testimonial.ts`

```typescript
{
  name: "author",
  title: "Customer Name",
  type: "string",
  description: "The customer's name (e.g., 'John D.' or 'Sarah M.')",
  validation: (Rule) => Rule.required(),
},
{
  name: "location",
  title: "Location",
  type: "string",
  description: "Where the customer is from (e.g., 'Valencia, CA')",
},
{
  name: "quote",
  title: "Testimonial Quote",
  type: "text",
  rows: 4,
  description: "The customer's review in their own words. Keep it authentic and specific.",
  validation: (Rule) => Rule.required(),
},
{
  name: "rating",
  title: "Star Rating",
  type: "number",
  description: "Rating from 1-5 stars",
  validation: (Rule) => Rule.min(1).max(5),
},
{
  name: "featured",
  title: "Featured?",
  type: "boolean",
  description: "Turn on to highlight this review on the homepage",
  initialValue: false,
},
```

### Step 5: Test in Sanity Studio

1. Open `/studio`
2. Navigate to each content type
3. Verify descriptions appear as help text below each field
4. Check that descriptions are clear and actionable

---

## Execution Checklist

- [ ] Task 1: Create HashLink component
- [ ] Task 1: Update Header.tsx
- [ ] Task 1: Update MobileMenu.tsx
- [ ] Task 1: Test hash links from all pages
- [ ] Task 2: Create service-areas.ts content
- [ ] Task 2: Create /service-areas page
- [ ] Task 2: Add nav link
- [ ] Task 2: Test page and navigation
- [ ] Task 3: Create GHLFormContainer component
- [ ] Task 4: Install @next/third-parties (if needed)
- [ ] Task 4: Create LocationMap component
- [ ] Task 4: Add map to contact page
- [ ] Task 4: Test map loads correctly
- [ ] Task 5: Add descriptions to siteSettings schema
- [ ] Task 5: Add descriptions to contactInfo schema
- [ ] Task 5: Add descriptions to service schema
- [ ] Task 5: Add descriptions to testimonial schema
- [ ] Task 5: Test descriptions in Studio
