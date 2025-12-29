# Website Completion + Sanity.io Integration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the Prep It List It Sell It website with consistent navigation, footer on all pages, mobile menu, proper favicons, and full Sanity.io CMS integration for editable content.

**Architecture:** Extract layout components (Header, Footer, MobileMenu) from homepage into shared components. Set up Sanity.io with embedded studio at `/studio`. Create singleton documents for global content and collection documents for services/testimonials. Update all pages to fetch from Sanity instead of TypeScript imports.

**Tech Stack:** Next.js 15, React 19, Sanity.io v3, next-sanity, Tailwind CSS, TypeScript

---

## Phase 1: Layout Foundation

### Task 1: Create Header Component

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/index.ts`

**Step 1: Create the Header component**

Extract the header from homepage into a reusable component:

```tsx
// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#process" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 no-print">
        <div className="container-section py-4">
          <div className="backdrop-blur-safe bg-navy/90 border border-gold/20 rounded-xl px-6 py-3 flex items-center justify-between shadow-elevated">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image
                src="/logo/2.png"
                alt="Prep It List It Sell It"
                width={180}
                height={52}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2 lg:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="min-h-[44px] flex items-center px-3 text-sm font-medium text-white/80 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/get-quote" className="btn btn-primary text-sm">
                Get Free Quote
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        phone={company.contact.phone.office}
        phoneRaw={company.contact.phone.officeRaw}
      />
    </>
  );
}
```

**Step 2: Create the barrel export**

```tsx
// src/components/layout/index.ts
export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as MobileMenu } from "./MobileMenu";
```

**Step 3: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: May show errors for missing MobileMenu/Footer (created in next tasks)

---

### Task 2: Create MobileMenu Component

**Files:**
- Create: `src/components/layout/MobileMenu.tsx`

**Step 1: Create the MobileMenu component**

```tsx
// src/components/layout/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  phone: string;
  phoneRaw: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  phone,
  phoneRaw,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when menu opens
    closeButtonRef.current?.focus();

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/95 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="absolute inset-y-0 right-0 w-full max-w-sm bg-navy border-l border-gold/20 shadow-2xl animate-slide-in-right"
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Image
              src="/logo/2.png"
              alt="Prep It List It Sell It"
              width={150}
              height={44}
              className="h-10 w-auto"
            />
            <button
              ref={closeButtonRef}
              type="button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-gold transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between min-h-[52px] px-4 text-lg font-medium text-white hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-gold/60">
                      chevron_right
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Section */}
          <div className="pt-6 border-t border-gold/20">
            <Link
              href="/get-quote"
              onClick={onClose}
              className="btn btn-primary w-full text-lg mb-4"
            >
              Get Free Quote
            </Link>
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center gap-2 text-gold font-semibold hover:underline"
            >
              <span className="material-symbols-outlined">call</span>
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Add slide-in animation to globals.css**

Add to `src/styles/globals.css`:

```css
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}
```

**Step 3: Verify no TypeScript errors**

Run: `npm run typecheck`
Expected: May still show Footer missing error

---

### Task 3: Create Footer Component

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Step 1: Extract Footer from homepage**

```tsx
// src/components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { featuredServices } from "@/content/services";

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#process" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark py-16">
      <div className="container-section">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo/2.png"
              alt="Prep It List It Sell It"
              width={200}
              height={60}
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/60 text-sm mb-4">{company.description}</p>
            <div className="space-y-1 text-sm text-white/50">
              <div>{company.address.formatted}</div>
              {company.credentials.licensed && company.credentials.insured && (
                <div>Licensed & Insured</div>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {featuredServices.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div>
                <a
                  href={`tel:${company.contact.phone.officeRaw}`}
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  Office: {company.contact.phone.office}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${company.contact.phone.directRaw}`}
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  Direct: {company.contact.phone.direct}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Verify TypeScript**

Run: `npm run typecheck`
Expected: PASS (all layout components now exist)

**Step 3: Commit layout components**

```bash
git add src/components/layout/
git commit -m "feat: create layout components (Header, Footer, MobileMenu)"
```

---

### Task 4: Integrate Layout into Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update root layout**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import "@/styles/globals.css";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { Header, Footer } from "@/components/layout";
import { StickyMobileCTA } from "@/components/sections";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Prep It List It Sell It | Home Improvement Services Santa Clarita",
    template: "%s | Prep It List It Sell It",
  },
  description:
    "Family-owned home improvement and listing prep services in Santa Clarita Valley. Licensed & insured. Small jobs = Big return. Response within 1-24 hours.",
  keywords: [
    "home improvement Santa Clarita",
    "listing prep services",
    "pre-sale home repairs",
    "property improvements",
    "Santa Clarita Valley contractor",
    "Valencia home services",
  ],
  authors: [{ name: "Prep It List It Sell It Services" }],
  creator: "Prep It List It Sell It Services",
  metadataBase: new URL("https://prepitlistitsellit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prepitlistitsellit.com",
    siteName: "Prep It List It Sell It",
    title: "Prep It List It Sell It | Home Improvement Services Santa Clarita",
    description:
      "Family-owned home improvement and listing prep services in Santa Clarita Valley. Small jobs = Big return.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prep It List It Sell It | Home Improvement Services",
    description: "Family-owned listing prep services in Santa Clarita Valley.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${sourceSerif.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Skip to content link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy focus:font-bold"
        >
          Skip to content
        </a>

        <Header />

        {/* Main content */}
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>

        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Header and Footer to root layout"
```

---

### Task 5: Remove Duplicate Header/Footer from Homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Remove header and footer sections from homepage**

The homepage currently has inline header (lines ~15-56) and footer (lines ~527-616). Remove these sections since they now come from the layout.

Remove:
- The entire `<header>` element (fixed nav at top)
- The entire `<footer>` element at the bottom

Keep:
- All section content (Hero, Services, Process, Testimonials, CTA sections)

**Step 2: Verify the homepage renders correctly**

Run: `npm run dev`
Navigate to `http://localhost:3000`
Expected: Header and Footer appear from layout, no duplicate nav/footer

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "refactor: remove inline header/footer from homepage (now in layout)"
```

---

## Phase 2: Favicons & Meta

### Task 6: Generate Favicon Set

**Files:**
- Create: `public/favicon.ico`
- Create: `public/favicon-16x16.png`
- Create: `public/favicon-32x32.png`
- Create: `public/apple-touch-icon.png`
- Create: `public/icon-192.png`
- Create: `public/icon-512.png`
- Create: `public/site.webmanifest`

**Step 1: Generate favicons from logo**

Use the existing `/public/logo/2.png` to generate favicon set.

Option A: Use a favicon generator (realfavicongenerator.net or favicon.io)
Option B: Use Sharp/ImageMagick to generate programmatically

Create `public/site.webmanifest`:

```json
{
  "name": "Prep It List It Sell It",
  "short_name": "PrepIt",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1B2838",
  "background_color": "#1B2838",
  "display": "standalone"
}
```

**Step 2: Update layout.tsx metadata icons**

Already updated in Task 4 to reference proper icons.

**Step 3: Verify favicons load**

Run: `npm run dev`
Check browser tab for favicon
Expected: Custom favicon appears instead of generic Next.js icon

**Step 4: Commit**

```bash
git add public/
git commit -m "feat: add favicon set and web manifest"
```

---

### Task 7: Create Default OG Image

**Files:**
- Create: `public/og-image.png`
- Modify: `src/app/layout.tsx` (add OG image to metadata)

**Step 1: Create OG image (1200x630)**

Design specs:
- Navy background (#1B2838)
- Logo centered
- Tagline: "Small Jobs. Big Return."
- Gold accents

**Step 2: Update metadata**

Add to `layout.tsx` metadata.openGraph:

```tsx
images: [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Prep It List It Sell It - Small Jobs. Big Return.",
  },
],
```

**Step 3: Commit**

```bash
git add public/og-image.png src/app/layout.tsx
git commit -m "feat: add default OpenGraph image"
```

---

## Phase 3: Sanity Setup

### Task 8: Install Sanity Dependencies

**Step 1: Install packages**

```bash
npm install sanity next-sanity @sanity/image-url @sanity/vision
```

**Step 2: Verify installation**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Sanity.io dependencies"
```

---

### Task 9: Create Sanity Project Configuration

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity.cli.ts`
- Create: `src/sanity/env.ts`
- Create: `src/sanity/lib/client.ts`
- Create: `src/sanity/lib/image.ts`

**Step 1: Create Sanity project**

Go to sanity.io/manage and create a new project, or use CLI:
```bash
npx sanity@latest init --env
```

Note the project ID and dataset name.

**Step 2: Create environment variables**

Add to `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

**Step 3: Create Sanity config files**

```ts
// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "prep-it-list-it-sell-it",
  title: "Prep It List It Sell It",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
```

```ts
// sanity.cli.ts
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
```

```ts
// src/sanity/env.ts
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = "2024-01-01";
```

```ts
// src/sanity/lib/client.ts
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
```

```ts
// src/sanity/lib/image.ts
import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

const imageBuilder = createImageUrlBuilder(client);

export function urlFor(source: Image) {
  return imageBuilder.image(source);
}
```

**Step 4: Commit**

```bash
git add sanity.config.ts sanity.cli.ts src/sanity/
git commit -m "feat: configure Sanity.io project"
```

---

### Task 10: Create Sanity Studio Route

**Files:**
- Create: `src/app/studio/[[...tool]]/page.tsx`
- Create: `src/app/studio/[[...tool]]/layout.tsx`

**Step 1: Create Studio page**

```tsx
// src/app/studio/[[...tool]]/page.tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

```tsx
// src/app/studio/[[...tool]]/layout.tsx
export const metadata = {
  title: "CMS | Prep It List It Sell It",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
```

**Step 2: Verify Studio loads**

Run: `npm run dev`
Navigate to: `http://localhost:3000/studio`
Expected: Sanity Studio interface loads (may show "No schema types" initially)

**Step 3: Commit**

```bash
git add src/app/studio/
git commit -m "feat: add Sanity Studio route at /studio"
```

---

### Task 11: Create Singleton Schemas

**Files:**
- Create: `src/sanity/schemas/singletons/siteSettings.ts`
- Create: `src/sanity/schemas/singletons/contactInfo.ts`
- Create: `src/sanity/schemas/singletons/navigation.ts`
- Create: `src/sanity/schemas/singletons/footer.ts`
- Create: `src/sanity/schemas/index.ts`

**Step 1: Create siteSettings schema**

```ts
// src/sanity/schemas/singletons/siteSettings.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "founded",
      title: "Year Founded",
      type: "number",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "object",
      fields: [
        { name: "licensed", title: "Licensed", type: "boolean" },
        { name: "insured", title: "Insured", type: "boolean" },
        { name: "bonded", title: "Bonded", type: "boolean" },
      ],
    }),
    defineField({
      name: "serviceAreas",
      title: "Service Areas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Area Name", type: "string" },
            { name: "primary", title: "Primary Area", type: "boolean" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
```

**Step 2: Create contactInfo schema**

```ts
// src/sanity/schemas/singletons/contactInfo.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({
      name: "phoneOffice",
      title: "Office Phone",
      type: "string",
    }),
    defineField({
      name: "phoneOfficeRaw",
      title: "Office Phone (Raw)",
      type: "string",
      description: "Phone number without formatting for tel: links",
    }),
    defineField({
      name: "phoneDirect",
      title: "Direct Phone",
      type: "string",
    }),
    defineField({
      name: "phoneDirectRaw",
      title: "Direct Phone (Raw)",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "responseTime",
      title: "Response Time",
      type: "string",
      description: 'e.g., "1-24 hours"',
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "street", title: "Street", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State", type: "string" },
        { name: "zip", title: "ZIP", type: "string" },
        { name: "formatted", title: "Formatted Address", type: "string" },
        { name: "googleMapsUrl", title: "Google Maps URL", type: "url" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Information" };
    },
  },
});
```

**Step 3: Create navigation schema**

```ts
// src/sanity/schemas/singletons/navigation.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "mainNav",
      title: "Main Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "string" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
```

**Step 4: Create footer schema**

```ts
// src/sanity/schemas/singletons/footer.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "Use {year} for dynamic year, {company} for company name",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
```

**Step 5: Create schema index**

```ts
// src/sanity/schemas/index.ts
import siteSettings from "./singletons/siteSettings";
import contactInfo from "./singletons/contactInfo";
import navigation from "./singletons/navigation";
import footer from "./singletons/footer";

export const schemaTypes = [
  // Singletons
  siteSettings,
  contactInfo,
  navigation,
  footer,
];
```

**Step 6: Verify schemas load in Studio**

Run: `npm run dev`
Navigate to: `http://localhost:3000/studio`
Expected: See document types in sidebar

**Step 7: Commit**

```bash
git add src/sanity/schemas/
git commit -m "feat: create Sanity singleton schemas (siteSettings, contactInfo, navigation, footer)"
```

---

### Task 12: Create Collection Schemas

**Files:**
- Create: `src/sanity/schemas/documents/service.ts`
- Create: `src/sanity/schemas/documents/testimonial.ts`
- Modify: `src/sanity/schemas/index.ts`

**Step 1: Create service schema**

```ts
// src/sanity/schemas/documents/service.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortTitle",
      title: "Short Title",
      type: "string",
      description: "Shorter version for navigation/cards",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Material Symbols icon name (e.g., 'format_paint')",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
```

**Step 2: Create testimonial schema**

```ts
// src/sanity/schemas/documents/testimonial.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g., 'Valencia, CA'",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on homepage",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "quote",
    },
  },
});
```

**Step 3: Update schema index**

```ts
// src/sanity/schemas/index.ts
import siteSettings from "./singletons/siteSettings";
import contactInfo from "./singletons/contactInfo";
import navigation from "./singletons/navigation";
import footer from "./singletons/footer";
import service from "./documents/service";
import testimonial from "./documents/testimonial";

export const schemaTypes = [
  // Singletons
  siteSettings,
  contactInfo,
  navigation,
  footer,
  // Documents
  service,
  testimonial,
];
```

**Step 4: Commit**

```bash
git add src/sanity/schemas/
git commit -m "feat: create Sanity collection schemas (service, testimonial)"
```

---

### Task 13: Create Page Section Schemas (Modular Blocks)

**Files:**
- Create: `src/sanity/schemas/objects/heroSection.ts`
- Create: `src/sanity/schemas/objects/servicesGrid.ts`
- Create: `src/sanity/schemas/objects/processSteps.ts`
- Create: `src/sanity/schemas/objects/trustSection.ts`
- Create: `src/sanity/schemas/objects/testimonialsSection.ts`
- Create: `src/sanity/schemas/objects/ctaSection.ts`
- Create: `src/sanity/schemas/documents/page.ts`
- Modify: `src/sanity/schemas/index.ts`

**Step 1: Create heroSection object**

```ts
// src/sanity/schemas/objects/heroSection.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "headlineHighlight",
      title: "Headline Highlight",
      type: "string",
      description: "Part of headline to highlight in gold",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "string" },
        { name: "icon", title: "Icon", type: "string" },
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "string" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "headline",
    },
    prepare({ title }) {
      return {
        title: title || "Hero Section",
        subtitle: "Hero",
      };
    },
  },
});
```

**Step 2: Create ctaSection object**

```ts
// src/sanity/schemas/objects/ctaSection.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "string" },
        { name: "icon", title: "Icon", type: "string" },
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "string" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title || "CTA Section",
        subtitle: "Call to Action",
      };
    },
  },
});
```

**Step 3: Create processSteps object**

```ts
// src/sanity/schemas/objects/processSteps.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "processSteps",
  title: "Process Steps Section",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", title: "Step Number", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "icon", title: "Icon", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Process Steps",
        subtitle: "How It Works",
      };
    },
  },
});
```

**Step 4: Create servicesGrid object**

```ts
// src/sanity/schemas/objects/servicesGrid.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesGrid",
  title: "Services Grid Section",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "showAllServices",
      title: "Show All Services",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "selectedServices",
      title: "Selected Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      hidden: ({ parent }) => parent?.showAllServices,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Services Grid",
        subtitle: "Service Cards",
      };
    },
  },
});
```

**Step 5: Create trustSection object**

```ts
// src/sanity/schemas/objects/trustSection.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "trustSection",
  title: "Trust Section",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "trustPoints",
      title: "Trust Points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "string" },
            { name: "text", title: "Text", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Trust Section",
        subtitle: "Why Choose Us",
      };
    },
  },
});
```

**Step 6: Create testimonialsSection object**

```ts
// src/sanity/schemas/objects/testimonialsSection.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "showFeaturedOnly",
      title: "Show Featured Only",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "selectedTestimonials",
      title: "Selected Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      hidden: ({ parent }) => parent?.showFeaturedOnly,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Testimonials Section",
        subtitle: "Customer Reviews",
      };
    },
  },
});
```

**Step 7: Create page document with modular sections**

```ts
// src/sanity/schemas/documents/page.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        { name: "metaDescription", title: "Meta Description", type: "text" },
        { name: "ogImage", title: "OG Image", type: "image" },
      ],
    }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "servicesGrid" },
        { type: "processSteps" },
        { type: "trustSection" },
        { type: "testimonialsSection" },
        { type: "ctaSection" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug || ""}`,
      };
    },
  },
});
```

**Step 8: Update schema index with all types**

```ts
// src/sanity/schemas/index.ts
// Singletons
import siteSettings from "./singletons/siteSettings";
import contactInfo from "./singletons/contactInfo";
import navigation from "./singletons/navigation";
import footer from "./singletons/footer";

// Documents
import service from "./documents/service";
import testimonial from "./documents/testimonial";
import page from "./documents/page";

// Objects (page sections)
import heroSection from "./objects/heroSection";
import servicesGrid from "./objects/servicesGrid";
import processSteps from "./objects/processSteps";
import trustSection from "./objects/trustSection";
import testimonialsSection from "./objects/testimonialsSection";
import ctaSection from "./objects/ctaSection";

export const schemaTypes = [
  // Singletons
  siteSettings,
  contactInfo,
  navigation,
  footer,
  // Documents
  service,
  testimonial,
  page,
  // Objects
  heroSection,
  servicesGrid,
  processSteps,
  trustSection,
  testimonialsSection,
  ctaSection,
];
```

**Step 9: Commit**

```bash
git add src/sanity/schemas/
git commit -m "feat: create modular page section schemas"
```

---

## Phase 4: Content Migration

### Task 14: Create GROQ Queries

**Files:**
- Create: `src/sanity/lib/queries.ts`

**Step 1: Create all queries**

```ts
// src/sanity/lib/queries.ts
import { groq } from "next-sanity";

// Singleton queries
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName,
  shortName,
  tagline,
  description,
  founded,
  credentials,
  serviceAreas
}`;

export const contactInfoQuery = groq`*[_type == "contactInfo"][0]{
  phoneOffice,
  phoneOfficeRaw,
  phoneDirect,
  phoneDirectRaw,
  email,
  responseTime,
  address
}`;

export const navigationQuery = groq`*[_type == "navigation"][0]{
  mainNav,
  ctaButton
}`;

export const footerQuery = groq`*[_type == "footer"][0]{
  quickLinks,
  copyrightText
}`;

// Collection queries
export const allServicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  shortTitle,
  "slug": slug.current,
  description,
  icon,
  features,
  "image": image.asset->url
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  shortTitle,
  "slug": slug.current,
  description,
  icon,
  features,
  "image": image.asset->url
}`;

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc){
  _id,
  author,
  location,
  quote,
  rating
}`;

export const allTestimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  author,
  location,
  quote,
  rating,
  featured
}`;

// Page query with resolved sections
export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  seo,
  sections[]{
    _type,
    ...,
    // Resolve service references in servicesGrid
    _type == "servicesGrid" => {
      ...,
      "selectedServices": selectedServices[]->{
        _id,
        title,
        shortTitle,
        "slug": slug.current,
        description,
        icon,
        features,
        "image": image.asset->url
      }
    },
    // Resolve testimonial references
    _type == "testimonialsSection" => {
      ...,
      "selectedTestimonials": selectedTestimonials[]->{
        _id,
        author,
        location,
        quote,
        rating
      }
    }
  }
}`;

// Combined query for layout components
export const layoutDataQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0]{
    companyName,
    shortName,
    tagline,
    description,
    founded,
    credentials,
    serviceAreas
  },
  "contactInfo": *[_type == "contactInfo"][0]{
    phoneOffice,
    phoneOfficeRaw,
    phoneDirect,
    phoneDirectRaw,
    email,
    responseTime,
    address
  },
  "navigation": *[_type == "navigation"][0]{
    mainNav,
    ctaButton
  },
  "footer": *[_type == "footer"][0]{
    quickLinks,
    copyrightText
  },
  "services": *[_type == "service"] | order(order asc){
    _id,
    title,
    shortTitle,
    "slug": slug.current
  }
}`;
```

**Step 2: Commit**

```bash
git add src/sanity/lib/queries.ts
git commit -m "feat: create GROQ queries for all content types"
```

---

### Task 15: Seed Sanity with Existing Content

**Files:**
- Create: `scripts/seed-sanity.ts`

**Step 1: Create seed script**

```ts
// scripts/seed-sanity.ts
import { createClient } from "@sanity/client";
import { company } from "../src/content/company";
import { services } from "../src/content/services";
import { testimonials } from "../src/content/testimonials";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function seed() {
  console.log("Seeding Sanity...");

  // Site Settings
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: company.name,
    shortName: company.shortName,
    tagline: company.tagline,
    description: company.description,
    founded: company.founded,
    credentials: company.credentials,
    serviceAreas: company.serviceAreas,
  });
  console.log("✓ Site Settings");

  // Contact Info
  await client.createOrReplace({
    _id: "contactInfo",
    _type: "contactInfo",
    phoneOffice: company.contact.phone.office,
    phoneOfficeRaw: company.contact.phone.officeRaw,
    phoneDirect: company.contact.phone.direct,
    phoneDirectRaw: company.contact.phone.directRaw,
    email: company.contact.email,
    responseTime: company.contact.responseTime,
    address: company.address,
  });
  console.log("✓ Contact Info");

  // Navigation
  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    mainNav: [
      { label: "Services", href: "/services" },
      { label: "How It Works", href: "/#process" },
      { label: "Reviews", href: "/#testimonials" },
      { label: "Contact", href: "/contact" },
    ],
    ctaButton: { label: "Get Free Quote", href: "/get-quote" },
  });
  console.log("✓ Navigation");

  // Footer
  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    quickLinks: [
      { label: "Services", href: "/services" },
      { label: "How It Works", href: "/#process" },
      { label: "Reviews", href: "/#testimonials" },
      { label: "Contact", href: "/contact" },
    ],
    copyrightText: "© {year} {company}. All rights reserved.",
  });
  console.log("✓ Footer");

  // Services
  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    await client.createOrReplace({
      _id: `service-${service.id}`,
      _type: "service",
      title: service.title,
      shortTitle: service.shortTitle,
      slug: { _type: "slug", current: service.id },
      description: service.description,
      icon: service.icon,
      features: service.features,
      order: i,
      // Note: Images need to be uploaded separately to Sanity
    });
  }
  console.log(`✓ ${services.length} Services`);

  // Testimonials
  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
    await client.createOrReplace({
      _id: `testimonial-${testimonial.id}`,
      _type: "testimonial",
      author: testimonial.author,
      location: testimonial.location,
      quote: testimonial.quote,
      rating: testimonial.rating,
      featured: true,
      order: i,
    });
  }
  console.log(`✓ ${testimonials.length} Testimonials`);

  console.log("\nSeeding complete!");
}

seed().catch(console.error);
```

**Step 2: Add seed script to package.json**

Add to scripts:
```json
"seed": "npx tsx scripts/seed-sanity.ts"
```

**Step 3: Run seed script**

Set `SANITY_API_WRITE_TOKEN` in `.env.local` (create in Sanity dashboard under API > Tokens)

Run: `npm run seed`
Expected: All content populated in Sanity Studio

**Step 4: Commit**

```bash
git add scripts/seed-sanity.ts package.json
git commit -m "feat: add Sanity seed script with existing content"
```

---

### Task 16: Update Layout Components to Fetch from Sanity

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Create: `src/sanity/lib/fetch.ts`

**Step 1: Create fetch helper**

```ts
// src/sanity/lib/fetch.ts
import { client } from "./client";

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return client.fetch<T>(query, params);
}
```

**Step 2: Create server-side layout data fetcher**

```ts
// src/lib/getLayoutData.ts
import { sanityFetch } from "@/sanity/lib/fetch";
import { layoutDataQuery } from "@/sanity/lib/queries";

export interface LayoutData {
  siteSettings: {
    companyName: string;
    shortName: string;
    credentials: { licensed: boolean; insured: boolean; bonded: boolean };
    serviceAreas: { name: string; primary: boolean }[];
  };
  contactInfo: {
    phoneOffice: string;
    phoneOfficeRaw: string;
    phoneDirect: string;
    phoneDirectRaw: string;
    email: string;
    responseTime: string;
    address: {
      formatted: string;
      googleMapsUrl: string;
    };
  };
  navigation: {
    mainNav: { label: string; href: string }[];
    ctaButton: { label: string; href: string };
  };
  footer: {
    quickLinks: { label: string; href: string }[];
    copyrightText: string;
  };
  services: {
    _id: string;
    title: string;
    shortTitle: string;
    slug: string;
  }[];
}

export async function getLayoutData(): Promise<LayoutData> {
  return sanityFetch<LayoutData>(layoutDataQuery);
}
```

**Step 3: Update Header to accept props**

Update Header to receive navigation data as props (since it's a client component, data must come from parent):

```tsx
// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  navLinks: { label: string; href: string }[];
  ctaButton: { label: string; href: string };
  phone: string;
  phoneRaw: string;
}

export default function Header({ navLinks, ctaButton, phone, phoneRaw }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 no-print">
        <div className="container-section py-4">
          <div className="backdrop-blur-safe bg-navy/90 border border-gold/20 rounded-xl px-6 py-3 flex items-center justify-between shadow-elevated">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image
                src="/logo/2.png"
                alt="Prep It List It Sell It"
                width={180}
                height={52}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            </Link>

            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2 lg:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="min-h-[44px] flex items-center px-3 text-sm font-medium text-white/80 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href={ctaButton.href} className="btn btn-primary text-sm">
                {ctaButton.label}
              </Link>
            </nav>

            <button
              type="button"
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        ctaButton={ctaButton}
        phone={phone}
        phoneRaw={phoneRaw}
      />
    </>
  );
}
```

**Step 4: Update layout.tsx to fetch and pass data**

This requires creating a wrapper component since layout.tsx can't be async in the way we need.

Create `src/components/layout/LayoutWrapper.tsx`:

```tsx
// src/components/layout/LayoutWrapper.tsx
import { getLayoutData } from "@/lib/getLayoutData";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default async function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const data = await getLayoutData();

  return (
    <>
      <Header
        navLinks={data.navigation.mainNav}
        ctaButton={data.navigation.ctaButton}
        phone={data.contactInfo.phoneOffice}
        phoneRaw={data.contactInfo.phoneOfficeRaw}
      />
      {children}
      <Footer
        siteSettings={data.siteSettings}
        contactInfo={data.contactInfo}
        quickLinks={data.footer.quickLinks}
        services={data.services}
        copyrightText={data.footer.copyrightText}
      />
    </>
  );
}
```

**Step 5: Update root layout to use LayoutWrapper**

```tsx
// src/app/layout.tsx - update the body content
<body className="antialiased min-h-screen flex flex-col">
  <a href="#main" className="sr-only ...">Skip to content</a>
  <LayoutWrapper>
    <main id="main" className="flex-1 pb-20 md:pb-0">
      {children}
    </main>
  </LayoutWrapper>
  <StickyMobileCTA />
</body>
```

**Step 6: Commit**

```bash
git add src/components/layout/ src/lib/ src/app/layout.tsx
git commit -m "feat: update layout components to fetch from Sanity"
```

---

## Phase 5: Polish & Test

### Task 17: Verify All Pages Work with Sanity

**Step 1: Run dev server**

Run: `npm run dev`

**Step 2: Test each page**

- [ ] Homepage (/)
- [ ] Services (/services)
- [ ] Each service page (/services/[slug])
- [ ] Contact (/contact)
- [ ] Get Quote (/get-quote)
- [ ] Sanity Studio (/studio)

**Step 3: Verify mobile menu**

- [ ] Opens and closes
- [ ] Links navigate correctly
- [ ] Phone number works

**Step 4: Verify footer**

- [ ] Appears on all pages
- [ ] Links work
- [ ] Contact info correct

---

### Task 18: Run Lighthouse Audit

**Step 1: Build production**

Run: `npm run build && npm start`

**Step 2: Run Lighthouse**

Open Chrome DevTools > Lighthouse
Run audit on mobile

**Step 3: Verify scores**

Expected (per CLAUDE.md quality gates):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

**Step 4: Fix any issues**

Document and fix any scores below threshold.

---

### Task 19: Clean Up Deprecated Files

**Files:**
- Remove: `src/content/company.ts` (after verifying Sanity works)
- Remove: `src/content/services.ts`
- Remove: `src/content/testimonials.ts`
- Keep: `src/content/seo-keywords.ts` (if still used)

**Note:** Only remove after all pages are confirmed working with Sanity data.

**Step 1: Verify all imports are updated**

Run: `npm run typecheck`

**Step 2: Remove deprecated files**

```bash
git rm src/content/company.ts src/content/services.ts src/content/testimonials.ts
git commit -m "chore: remove deprecated TypeScript content files (now in Sanity)"
```

---

### Task 20: Final Commit and Tag

**Step 1: Ensure all changes committed**

Run: `git status`
Expected: Clean working directory

**Step 2: Create release tag**

```bash
git tag -a v1.0.0 -m "Website complete with Sanity CMS integration"
git push origin main --tags
```

---

## Summary

This plan covers:

1. **Layout Foundation** (Tasks 1-5): Extract and share Header, Footer, MobileMenu
2. **Favicons & Meta** (Tasks 6-7): Proper icons and OG image
3. **Sanity Setup** (Tasks 8-13): Full CMS with modular page sections
4. **Content Migration** (Tasks 14-16): Queries, seeding, component updates
5. **Polish & Test** (Tasks 17-20): Verification and cleanup

Total: ~20 tasks, each with explicit steps and commit points.
