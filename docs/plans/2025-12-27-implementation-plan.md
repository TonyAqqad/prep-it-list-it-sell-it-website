# Prep It List It Sell It — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the complete website from locked plans — design system, components, pages, SEO, forms, and Sanity CMS integration.

**Architecture:** Static-first build with Sanity migration at end. All content lives in `src/content/*.ts` initially, then migrates to Sanity CMS. CSS-only animations, no JS animation libraries.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Sanity CMS, Vercel, GoHighLevel webhooks

---

## Phase 0: Design System Sync

Sync `globals.css` and `tailwind.config.ts` with the locked design system. Add golden ratio spacing, Source Serif 4 font, signature animations.

---

### Task 0.1: Add Source Serif 4 Font

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Import Source Serif 4 in layout.tsx**

Find the font imports at the top of layout.tsx and update:

```tsx
import { Playfair_Display, Source_Serif_4 } from "next/font/google";

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
```

**Step 2: Apply font variable to body**

Update the className on the html/body tag to include both font variables:

```tsx
<body className={`${playfair.variable} ${sourceSerif.variable} antialiased`}>
```

**Step 3: Run dev server to verify fonts load**

Run: `npm run dev`
Expected: No errors, fonts load in browser

**Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Source Serif 4 font for body text"
```

---

### Task 0.2: Add Golden Ratio Spacing to Tailwind

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Add golden ratio spacing tokens**

Add to `theme.extend`:

```ts
spacing: {
  // Golden ratio spacing (base 8px, ratio 1.618)
  'xs': '8px',      // 8
  'sm': '13px',     // 8 * 1.618 = 13
  'md': '21px',     // 13 * 1.618 = 21
  'lg': '34px',     // 21 * 1.618 = 34
  'xl': '55px',     // 34 * 1.618 = 55
  '2xl': '89px',    // 55 * 1.618 = 89
  '3xl': '144px',   // 89 * 1.618 = 144
},
```

**Step 2: Add golden ratio font sizes**

Add to `theme.extend`:

```ts
fontSize: {
  'micro': ['12px', { lineHeight: '1.4' }],
  'small': ['14px', { lineHeight: '1.5' }],
  'body': ['17px', { lineHeight: '1.6' }],
  'lead': ['21px', { lineHeight: '1.5' }],
  'title': ['34px', { lineHeight: '1.2' }],
  'display': ['55px', { lineHeight: '1.15' }],
  'hero': ['72px', { lineHeight: '1.1' }],
},
```

**Step 3: Update body font family**

Change the body font to Source Serif 4:

```ts
fontFamily: {
  display: ["var(--font-playfair)", "Georgia", "serif"],
  body: ["var(--font-source-serif)", "Georgia", "serif"],
},
```

**Step 4: Run typecheck**

Run: `npm run typecheck`
Expected: No TypeScript errors

**Step 5: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add golden ratio spacing and typography tokens"
```

---

### Task 0.3: Add Fill-Reveal Button Effect

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Update btn-primary with fill-reveal effect**

Replace the existing `.btn-primary` in globals.css:

```css
.btn-primary {
  @apply bg-gold text-navy hover:bg-gold-light;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: var(--shadow-gold);
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgb(var(--color-gold-light));
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  z-index: -1;
}

.btn-primary:hover::before {
  transform: translateX(0);
}

.btn-primary:hover {
  box-shadow: 0 6px 25px rgba(212, 167, 74, 0.35);
}
```

**Step 2: Run dev server and test button hover**

Run: `npm run dev`
Expected: Primary buttons show fill-reveal animation on hover

**Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add fill-reveal hover effect to primary buttons"
```

---

### Task 0.4: Add Glow-Emergence Card Effect

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Update card hover with glow-emergence effect**

Replace the existing `.card` and `.card:hover` styles:

```css
.card {
  @apply bg-navy-light rounded-2xl;
  position: relative;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-base) ease,
              box-shadow var(--transition-base) ease;
}

.card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 26px;
  background: radial-gradient(
    circle at center,
    rgba(212, 167, 74, 0.4) 0%,
    transparent 70%
  );
  opacity: 0;
  z-index: -1;
  transition: opacity 0.4s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-elevated);
}

.card:hover::before {
  opacity: 1;
}
```

**Step 2: Run dev server and test card hover**

Run: `npm run dev`
Expected: Cards show gold glow emergence on hover

**Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add glow-emergence hover effect to cards"
```

---

### Task 0.5: Add Underline-Slide Link Effect

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Add underline-slide link style**

Add to `@layer components`:

```css
/* Underline slide effect for text links */
.link-underline {
  position: relative;
  color: rgb(var(--color-gold));
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(var(--color-gold));
  transition: width 0.3s ease-out;
}

.link-underline:hover::after {
  width: 100%;
}
```

**Step 2: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add underline-slide effect for text links"
```

---

### Task 0.6: Add Section Divider Styles

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Add gold line divider styles**

Add to `@layer components`:

```css
/* Gold line section divider with diamond */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;
  padding: 55px 0;
}

.section-divider::before,
.section-divider::after {
  content: '';
  height: 1px;
  width: 89px;
  background: linear-gradient(
    to var(--direction, right),
    transparent,
    rgb(var(--color-gold))
  );
}

.section-divider::after {
  --direction: left;
}

.section-divider-mark {
  width: 13px;
  height: 13px;
  background: rgb(var(--color-gold));
  transform: rotate(45deg);
}
```

**Step 2: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add gold line section divider styles"
```

---

## Phase 1: Shared Components

Create reusable UI components used across all pages.

---

### Task 1.1: Create Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`

**Step 1: Create Button component**

```tsx
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-gold-outline",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-sm py-xs text-small min-h-[34px]",
  md: "px-lg py-sm text-body min-h-[44px]",
  lg: "px-xl py-sm text-lead min-h-[55px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const classes = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: No TypeScript errors

**Step 3: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: create Button component with variants and sizes"
```

---

### Task 1.2: Create Card Component

**Files:**
- Create: `src/components/ui/Card.tsx`

**Step 1: Create Card component**

```tsx
type CardVariant = "dark" | "light" | "elevated";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses: Record<CardVariant, string> = {
  dark: "card bg-navy-light border border-gold/20",
  light: "bg-white text-navy rounded-2xl",
  elevated: "card card-gold",
};

const paddingClasses = {
  none: "",
  sm: "p-sm",
  md: "p-md",
  lg: "p-lg",
};

export function Card({
  children,
  variant = "dark",
  className = "",
  padding = "lg",
}: CardProps) {
  return (
    <div className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Card.tsx
git commit -m "feat: create Card component with variants"
```

---

### Task 1.3: Create Badge Component

**Files:**
- Create: `src/components/ui/Badge.tsx`

**Step 1: Create Badge component**

```tsx
type BadgeVariant = "gold" | "navy" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: "badge-gold",
  navy: "badge-navy",
  outline: "bg-transparent text-gold border border-gold",
};

export function Badge({
  children,
  variant = "gold",
  className = "",
}: BadgeProps) {
  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Badge.tsx
git commit -m "feat: create Badge component"
```

---

### Task 1.4: Create SectionDivider Component

**Files:**
- Create: `src/components/ui/SectionDivider.tsx`

**Step 1: Create SectionDivider component**

```tsx
interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`section-divider ${className}`} aria-hidden="true">
      <div className="section-divider-mark" />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/SectionDivider.tsx
git commit -m "feat: create SectionDivider component"
```

---

### Task 1.5: Create JsonLd Utility Component

**Files:**
- Create: `src/components/seo/JsonLd.tsx`

**Step 1: Create a safe JsonLd wrapper component**

This component safely renders JSON-LD structured data. The data is server-generated and trusted (not user input).

```tsx
import type { Thing, WithContext } from "schema-dts";

interface JsonLdProps<T extends Thing> {
  data: WithContext<T>;
}

/**
 * Renders JSON-LD structured data for SEO.
 * SECURITY: Only use with server-generated schema data, never user input.
 */
export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      // Safe: data is server-generated schema, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

**Step 2: Commit**

```bash
git add src/components/seo/JsonLd.tsx
git commit -m "feat: create JsonLd utility component for structured data"
```

---

### Task 1.6: Create Breadcrumbs Component with Schema

**Files:**
- Create: `src/components/ui/Breadcrumbs.tsx`

**Step 1: Create Breadcrumbs component**

```tsx
import Link from "next/link";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { JsonLd } from "@/components/seo/JsonLd";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://prepitlistitsellit.com${item.href}` }),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="py-md">
        <ol className="flex items-center gap-2 text-small text-white/60">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="material-symbols-outlined text-gold/50" style={{ fontSize: '16px' }}>
                  chevron_right
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className="hover:text-gold transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white/80">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Breadcrumbs.tsx
git commit -m "feat: create Breadcrumbs component with JSON-LD schema"
```

---

### Task 1.7: Create Icon Component

**Files:**
- Create: `src/components/ui/Icon.tsx`

**Step 1: Create Icon component for Material Symbols**

```tsx
interface IconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  filled?: boolean;
}

const sizeClasses = {
  sm: "text-[20px]",
  md: "text-[24px]",
  lg: "text-[32px]",
};

export function Icon({
  name,
  size = "md",
  className = "",
  filled = false,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${sizeClasses[size]} ${className}`}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
      {name}
    </span>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Icon.tsx
git commit -m "feat: create Icon component for Material Symbols"
```

---

### Task 1.8: Create UI Component Index

**Files:**
- Create: `src/components/ui/index.ts`

**Step 1: Create barrel export**

```ts
export { Button } from "./Button";
export { Card } from "./Card";
export { Badge } from "./Badge";
export { SectionDivider } from "./SectionDivider";
export { Breadcrumbs } from "./Breadcrumbs";
export { Icon } from "./Icon";
```

**Step 2: Commit**

```bash
git add src/components/ui/index.ts
git commit -m "feat: add UI component barrel export"
```

---

### Task 1.9: Create TrustIndicators Component

**Files:**
- Create: `src/components/sections/TrustIndicators.tsx`

**Step 1: Create TrustIndicators component**

```tsx
import { Icon } from "@/components/ui";
import { company } from "@/content/company";

interface TrustIndicatorProps {
  icon: string;
  text: string;
}

function TrustIndicator({ icon, text }: TrustIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-small text-white/70">
      <Icon name={icon} size="sm" className="text-gold" />
      <span>{text}</span>
    </div>
  );
}

export function TrustIndicators() {
  const indicators = [
    { icon: "verified_user", text: "Licensed & Insured" },
    { icon: "family_restroom", text: `Family-Owned Since ${company.established}` },
    { icon: "schedule", text: "Response in 1-24 Hours" },
    { icon: "home", text: `${company.stats.homesPrepped}+ Homes Prepared` },
  ];

  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
      {indicators.map((indicator) => (
        <TrustIndicator key={indicator.icon} {...indicator} />
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/TrustIndicators.tsx
git commit -m "feat: create TrustIndicators component"
```

---

### Task 1.10: Create CTASection Component

**Files:**
- Create: `src/components/sections/CTASection.tsx`

**Step 1: Create CTASection component**

```tsx
import { Icon } from "@/components/ui";
import { company } from "@/content/company";

interface CTASectionProps {
  heading?: string;
  subheading?: string;
}

export function CTASection({
  heading = "Ready to Get Started?",
  subheading = "One call. Everything handled. Let's get your home market-ready.",
}: CTASectionProps) {
  return (
    <section className="py-2xl bg-navy-dark">
      <div className="container-section text-center">
        <h2 className="section-heading mb-md">{heading}</h2>
        <p className="section-subheading mx-auto mb-xl">{subheading}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-lg">
          {/* Phone Card */}
          <a
            href={`tel:${company.contact.phone.primary.replace(/[^0-9]/g, "")}`}
            className="card card-gold p-lg flex items-center gap-md hover:scale-105 transition-transform"
          >
            <div className="icon-container">
              <Icon name="call" size="lg" />
            </div>
            <div className="text-left">
              <div className="text-small text-white/60">Call Bryan Now</div>
              <div className="text-title text-gold">{company.contact.phone.primary}</div>
            </div>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${company.contact.email}`}
            className="card card-gold p-lg flex items-center gap-md hover:scale-105 transition-transform"
          >
            <div className="icon-container">
              <Icon name="mail" size="lg" />
            </div>
            <div className="text-left">
              <div className="text-small text-white/60">Email Us</div>
              <div className="text-lead text-gold">{company.contact.email}</div>
            </div>
          </a>
        </div>

        <p className="mt-lg text-small text-white/50">
          We respond within 1-24 hours. Your call goes directly to Bryan.
        </p>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/CTASection.tsx
git commit -m "feat: create CTASection component"
```

---

### Task 1.11: Create StickyMobileCTA Component

**Files:**
- Create: `src/components/sections/StickyMobileCTA.tsx`

**Step 1: Create StickyMobileCTA component**

```tsx
import { Icon } from "@/components/ui";
import { company } from "@/content/company";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom no-print">
      <div className="bg-navy-dark/95 backdrop-blur-safe border-t border-gold/20 px-4 py-3">
        <div className="flex gap-3">
          <a
            href={`tel:${company.contact.phone.primary.replace(/[^0-9]/g, "")}`}
            className="btn btn-primary flex-1 justify-center"
          >
            <Icon name="call" size="sm" />
            Call Now
          </a>
          <a
            href="/get-quote"
            className="btn btn-secondary flex-1 justify-center"
          >
            <Icon name="edit_note" size="sm" />
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/StickyMobileCTA.tsx
git commit -m "feat: create StickyMobileCTA component"
```

---

### Task 1.12: Create Sections Index

**Files:**
- Create: `src/components/sections/index.ts`

**Step 1: Create barrel export**

```ts
export { TrustIndicators } from "./TrustIndicators";
export { CTASection } from "./CTASection";
export { StickyMobileCTA } from "./StickyMobileCTA";
```

**Step 2: Commit**

```bash
git add src/components/sections/index.ts
git commit -m "feat: add sections barrel export"
```

---

## Phase 2: SEO Foundation

Add sitemap, robots.txt, and JSON-LD schemas.

---

### Task 2.1: Create Dynamic Sitemap

**Files:**
- Create: `src/app/sitemap.ts`

**Step 1: Create sitemap.ts**

```ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prepitlistitsellit.com";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/get-quote`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/service-areas`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/for-agents`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const servicePages = [
    "kitchen-bath",
    "painting",
    "flooring",
    "handyman",
    "curb-appeal",
    "cleaning",
    "decluttering",
    "staging",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}
```

**Step 2: Run build to verify sitemap generates**

Run: `npm run build`
Expected: Build succeeds, sitemap.xml generated

**Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add dynamic sitemap.ts"
```

---

### Task 2.2: Create Robots.txt

**Files:**
- Create: `src/app/robots.ts`

**Step 1: Create robots.ts**

```ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: "https://prepitlistitsellit.com/sitemap.xml",
  };
}
```

**Step 2: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat: add robots.ts"
```

---

### Task 2.3: Create ServiceSchema Component

**Files:**
- Create: `src/components/seo/ServiceSchema.tsx`

**Step 1: Create ServiceSchema component**

```tsx
import type { Service, WithContext } from "schema-dts";
import { company } from "@/content/company";
import { JsonLd } from "./JsonLd";

interface ServiceSchemaProps {
  name: string;
  description: string;
  slug: string;
  image?: string;
}

export function ServiceSchema({ name, description, slug, image }: ServiceSchemaProps) {
  const schema: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `https://prepitlistitsellit.com/services/${slug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: company.name,
      telephone: company.contact.phone.primary,
      email: company.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.state,
        postalCode: company.address.zip,
        addressCountry: "US",
      },
    },
    areaServed: company.serviceAreas.primary.map((city) => ({
      "@type": "City",
      name: city,
    })),
    ...(image && { image }),
  };

  return <JsonLd data={schema} />;
}
```

**Step 2: Commit**

```bash
git add src/components/seo/ServiceSchema.tsx
git commit -m "feat: create ServiceSchema JSON-LD component"
```

---

### Task 2.4: Create FAQSchema Component

**Files:**
- Create: `src/components/seo/FAQSchema.tsx`

**Step 1: Create FAQSchema component**

```tsx
import type { FAQPage, WithContext } from "schema-dts";
import { JsonLd } from "./JsonLd";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}
```

**Step 2: Commit**

```bash
git add src/components/seo/FAQSchema.tsx
git commit -m "feat: create FAQSchema JSON-LD component"
```

---

### Task 2.5: Create SEO Components Index

**Files:**
- Create: `src/components/seo/index.ts`

**Step 1: Create barrel export**

```ts
export { LocalBusinessSchema } from "./LocalBusinessSchema";
export { ServiceSchema } from "./ServiceSchema";
export { FAQSchema } from "./FAQSchema";
export { JsonLd } from "./JsonLd";
```

**Step 2: Commit**

```bash
git add src/components/seo/index.ts
git commit -m "feat: add SEO components barrel export"
```

---

## Phase 3: Homepage Update

Update homepage with locked content from `docs/plans/2025-12-26-page-content.md`.

---

### Task 3.1: Update Homepage Hero Section

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Import new components**

```tsx
import { Icon, SectionDivider } from "@/components/ui";
import { TrustIndicators, CTASection, StickyMobileCTA } from "@/components/sections";
```

**Step 2: Update H1 and tagline**

Find the hero section and update the headline:

```tsx
{/* Headline */}
<h1 className="text-hero font-display font-bold text-white mb-md leading-tight text-balance">
  The Small Fixes That Add{" "}
  <span className="text-gold-gradient">Thousands to Your Sale Price</span>
</h1>

{/* Tagline */}
<p className="text-lead text-gold font-display italic mb-md">
  Small Jobs. Big Return.
</p>

{/* Description */}
<p className="text-body text-white/70 mb-lg max-w-xl mx-auto lg:mx-0">
  You have enough on your plate. We handle the painting, repairs, cleaning, and curb appeal — so your home shows its best and you get the offers you deserve.
</p>
```

**Step 3: Update CTAs with locked copy**

```tsx
{/* CTAs */}
<div className="flex flex-wrap justify-center lg:justify-start gap-md mb-lg">
  <a href={`tel:${company.contact.phone.primary.replace(/[^0-9]/g, "")}`} className="btn btn-primary text-lead">
    <Icon name="call" size="sm" />
    Call Bryan Now
  </a>
  <a href="/get-quote" className="btn btn-secondary text-lead">
    Get YOUR Free Quote
  </a>
</div>

{/* Trust indicators */}
<TrustIndicators />
```

**Step 4: Run dev and verify changes**

Run: `npm run dev`
Expected: Homepage shows updated headline, tagline, CTAs

**Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: update homepage hero with locked content"
```

---

### Task 3.2: Add SectionDividers to Homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add dividers between sections**

Add `<SectionDivider />` between each major section (after hero, services, process, etc.)

**Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add section dividers to homepage"
```

---

### Task 3.3: Add CTASection to Homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add CTA section before footer**

```tsx
<CTASection />
```

**Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add CTASection to homepage"
```

---

### Task 3.4: Add StickyMobileCTA to Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Import and add StickyMobileCTA**

```tsx
import { StickyMobileCTA } from "@/components/sections";
```

**Step 2: Add to layout after children**

```tsx
<main className="pb-20 md:pb-0">
  {children}
</main>
<StickyMobileCTA />
```

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add StickyMobileCTA to layout"
```

---

## Phase 4: Service Page Template

Create the service page template and services index.

---

### Task 4.1: Create Service Page Template

**Files:**
- Create: `src/app/services/[slug]/page.tsx`

**Step 1: Create dynamic service page**

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { Breadcrumbs, SectionDivider } from "@/components/ui";
import { ServiceSchema } from "@/components/seo";
import { CTASection } from "@/components/sections";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) return {};

  return {
    title: `${service.name} Services | Prep It List It Sell It`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name },
  ];

  return (
    <>
      <ServiceSchema
        name={service.name}
        description={service.description}
        slug={service.slug}
      />

      <div className="pt-24">
        <div className="container-section">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <section className="py-xl">
          <div className="container-section">
            <h1 className="section-heading mb-md">{service.name}</h1>
            <p className="section-subheading mb-lg">{service.description}</p>
          </div>
        </section>

        <SectionDivider />

        <section className="py-xl">
          <div className="container-section">
            <h2 className="text-title font-display mb-lg">What&apos;s Included</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-gold">check_circle</span>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <CTASection heading={`Ready for ${service.name}?`} />
      </div>
    </>
  );
}
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: No TypeScript errors

**Step 3: Commit**

```bash
git add src/app/services/[slug]/page.tsx
git commit -m "feat: create dynamic service page template"
```

---

### Task 4.2: Create Services Index Page

**Files:**
- Create: `src/app/services/page.tsx`

**Step 1: Create services index page**

```tsx
import { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { Breadcrumbs, Card, Icon, SectionDivider } from "@/components/ui";
import { CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Our Services | Prep It List It Sell It",
  description: "Pre-listing home improvement services in Santa Clarita Valley.",
};

export default function ServicesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services" },
  ];

  return (
    <div className="pt-24">
      <div className="container-section">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="py-xl">
        <div className="container-section text-center">
          <h1 className="section-heading mb-md">Our Services</h1>
          <p className="section-subheading mx-auto">
            Everything you need to get your home market-ready. One call, all handled.
          </p>
        </div>
      </section>

      <SectionDivider />

      <section className="py-xl">
        <div className="container-section">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-lg">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card variant="dark" className="h-full hover:border-gold/50 transition-colors">
                  <div className="icon-container mb-md">
                    <Icon name={service.icon} size="lg" />
                  </div>
                  <h2 className="text-title font-display text-white mb-sm">{service.name}</h2>
                  <p className="text-small text-white/60">{service.shortDescription}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <CTASection />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: create services index page"
```

---

## Phase 5: Core Pages

Create Contact and Get Quote pages.

---

### Task 5.1: Create Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`

**Step 1: Create contact page**

```tsx
import { Metadata } from "next";
import { Breadcrumbs, Icon, SectionDivider } from "@/components/ui";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact Us | Prep It List It Sell It",
  description: "Get in touch with Prep It List It Sell It. We respond within 1-24 hours.",
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];

  return (
    <div className="pt-24">
      <div className="container-section">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="py-xl">
        <div className="container-section text-center">
          <h1 className="section-heading mb-md">Get In Touch</h1>
          <p className="section-subheading mx-auto">
            Ready to get started? Call Bryan directly or send us a message.
          </p>
        </div>
      </section>

      <SectionDivider />

      <section className="py-xl">
        <div className="container-section">
          <div className="max-w-2xl mx-auto grid gap-lg">
            <a
              href={`tel:${company.contact.phone.primary.replace(/[^0-9]/g, "")}`}
              className="card card-gold p-lg flex items-center gap-lg"
            >
              <div className="icon-container">
                <Icon name="call" size="lg" />
              </div>
              <div>
                <div className="text-small text-white/60">Call Bryan Now</div>
                <div className="text-title text-gold">{company.contact.phone.primary}</div>
              </div>
            </a>

            <a
              href={`mailto:${company.contact.email}`}
              className="card card-gold p-lg flex items-center gap-lg"
            >
              <div className="icon-container">
                <Icon name="mail" size="lg" />
              </div>
              <div>
                <div className="text-small text-white/60">Email Us</div>
                <div className="text-lead text-gold">{company.contact.email}</div>
              </div>
            </a>

            <p className="text-center text-small text-white/50">
              We respond within 1-24 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: create contact page"
```

---

### Task 5.2: Create Get Quote Page

**Files:**
- Create: `src/app/get-quote/page.tsx`

**Step 1: Create get-quote page with form**

```tsx
import { Metadata } from "next";
import { Breadcrumbs, SectionDivider } from "@/components/ui";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Get a Free Quote | Prep It List It Sell It",
  description: "Request a free quote for pre-listing home improvement services.",
};

export default function GetQuotePage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Get Quote" },
  ];

  return (
    <div className="pt-24">
      <div className="container-section">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <section className="py-xl">
        <div className="container-section text-center">
          <h1 className="section-heading mb-md">Get Your Free Quote</h1>
          <p className="section-subheading mx-auto">
            Tell us about your project. We respond within 1-24 hours.
          </p>
        </div>
      </section>

      <SectionDivider />

      <section className="py-xl">
        <div className="container-section">
          <div className="max-w-xl mx-auto">
            <form className="space-y-lg">
              <div>
                <label htmlFor="name" className="form-label">Your Name *</label>
                <input type="text" id="name" name="name" required className="form-input" />
              </div>

              <div>
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required className="form-input" />
              </div>

              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" id="email" name="email" className="form-input" />
              </div>

              <div>
                <label htmlFor="service" className="form-label">Service Needed</label>
                <select id="service" name="service" className="form-input">
                  <option value="">Select a service...</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name}
                    </option>
                  ))}
                  <option value="multiple">Multiple Services</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="form-label">Tell us about your project</label>
                <textarea id="message" name="message" rows={4} className="form-input" />
              </div>

              {/* Honeypot for spam */}
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              <button type="submit" className="btn btn-primary w-full">
                Get My Free Quote
              </button>

              <p className="text-center text-small text-white/50">
                Free consultation. No obligation.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/get-quote/page.tsx
git commit -m "feat: create get-quote page with form"
```

---

## Phase 6: Testing & Polish

Run audits and fix issues.

---

### Task 6.1: Run Typecheck and Lint

**Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: No errors

**Step 2: Run lint**

Run: `npm run lint`
Expected: No errors

**Step 3: Commit any fixes**

```bash
git add .
git commit -m "chore: fix lint and type errors"
```

---

### Task 6.2: Run Production Build

**Step 1: Build the project**

Run: `npm run build`
Expected: Build succeeds

**Step 2: Start production server**

Run: `npm start`

**Step 3: Verify sitemap.xml and robots.txt**

Visit: `http://localhost:3000/sitemap.xml`
Visit: `http://localhost:3000/robots.txt`

---

### Task 6.3: Run Lighthouse Audit

**Step 1: Run Lighthouse in Chrome DevTools**

Open Chrome DevTools > Lighthouse > Generate report (Mobile)

**Step 2: Document scores**

Target: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+

**Step 3: Create follow-up tasks for any failing audits**

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 0 | 6 | Design system (fonts, spacing, animations) |
| 1 | 12 | Shared components (Button, Card, etc.) |
| 2 | 5 | SEO foundation (sitemap, robots, schemas) |
| 3 | 4 | Homepage update |
| 4 | 2 | Service pages |
| 5 | 2 | Contact & Quote pages |
| 6 | 3 | Testing & polish |

**Total: 34 tasks**

---

*Plan created: 2025-12-27*
