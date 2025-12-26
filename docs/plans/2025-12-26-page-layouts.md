# Prep It List It Sell It — Page Layouts

**Date:** 2025-12-26
**Status:** Locked

---

## Overview

8 distinct page templates for 15 pages. Each template defines section structure, content requirements, and component usage.

---

## Shared Components (All Pages)

| Component | Description |
|-----------|-------------|
| **Sticky Header** | Logo, nav links, CTA button. Blur background on scroll. |
| **Breadcrumbs** | All pages except homepage. Schema markup included. |
| **Gold Line Divider** | Section separator with centered diamond mark. |
| **CTA Section** | "Ready to get started?" with contact options. |
| **Footer** | Logo, links, contact info, copyright. |
| **Sticky Mobile CTA** | Fixed bottom bar on mobile: Call Now \| Get Quote |

---

## Page Type 1: Homepage

**Used by:** `/` (1 page)

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
│  Logo | Nav Links | CTA Button          │
├─────────────────────────────────────────┤
│  HERO                                   │
│  Badge + H1 + Tagline + CTAs            │
│  Trust indicators (licensed, response)  │
├─────────────────────────────────────────┤
│  VALUE BAR (gold background)            │
│  "Sell Faster • Get More • Less Stress" │
├───────── GOLD LINE DIVIDER ─────────────┤
│  SERVICES GRID                          │
│  Section heading + 8 service cards      │
│  CTA: "Get a Free Quote"                │
├───────── GOLD LINE DIVIDER ─────────────┤
│  HOW IT WORKS                           │
│  4 steps: Schedule → Estimate → Work →  │
│  Sell                                   │
├───────── GOLD LINE DIVIDER ─────────────┤
│  WHY TRUST US                           │
│  Trust points + Stats grid              │
├───────── GOLD LINE DIVIDER ─────────────┤
│  TESTIMONIALS (3 cards)                 │
│  Link to full reviews page              │
├───────── GOLD LINE DIVIDER ─────────────┤
│  BEFORE/AFTER PREVIEW (2-3 images)      │
│  Link to full gallery                   │
├───────── GOLD LINE DIVIDER ─────────────┤
│  SERVICE AREAS MAP                      │
│  Cities list + mini map                 │
├─────────────────────────────────────────┤
│  CTA SECTION                            │
│  "Ready to Get Started?" + Contact      │
├─────────────────────────────────────────┤
│  FOOTER                                 │
├─────────────────────────────────────────┤
│  STICKY MOBILE CTA (mobile only)        │
│  Call Now | Get Quote                   │
└─────────────────────────────────────────┘
```

### Homepage Sections Detail

| Section | Content | Data Source |
|---------|---------|-------------|
| Hero | H1, tagline, 2 CTAs, trust badges | Hardcoded + company.ts |
| Value Bar | 3 value props with icons | Hardcoded |
| Services Grid | 8 service cards | Sanity: services |
| How It Works | 4 numbered steps | Hardcoded |
| Why Trust Us | 5 trust points + 4 stats | company.ts |
| Testimonials | 3 review cards | Sanity: testimonials |
| Before/After Preview | 2-3 gallery items | Sanity: gallery (featured) |
| Service Areas | Cities list + mini map | company.ts |
| CTA Section | Heading + phone + email cards | company.ts |

---

## Page Type 2: Service Page

**Used by:** 8 pages
- `/services/kitchen-bath`
- `/services/painting`
- `/services/flooring`
- `/services/handyman`
- `/services/curb-appeal`
- `/services/cleaning`
- `/services/decluttering`
- `/services/staging`

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
├─────────────────────────────────────────┤
│  BREADCRUMBS                            │
│  Home > Services > [Service Name]       │
├─────────────────────────────────────────┤
│  SERVICE HERO                           │
│  Badge + H1 + Description               │
│  CTA buttons (Call | Get Quote)         │
│  Hero image (from Sanity)               │
├───────── GOLD LINE DIVIDER ─────────────┤
│  WHAT'S INCLUDED                        │
│  Features grid (icons + text)           │
│  4-6 feature items                      │
├───────── GOLD LINE DIVIDER ─────────────┤
│  BEFORE/AFTER (service-specific)        │
│  2-3 examples for this service          │
│  Link to full gallery                   │
├───────── GOLD LINE DIVIDER ─────────────┤
│  WHY THIS SERVICE MATTERS               │
│  ROI stats, buyer psychology            │
│  "Fresh paint returns 100%+ ROI"        │
├───────── GOLD LINE DIVIDER ─────────────┤
│  FAQ SECTION                            │
│  3-5 questions (accordion)              │
│  FAQ schema markup                      │
├───────── GOLD LINE DIVIDER ─────────────┤
│  TESTIMONIAL (1 relevant)               │
│  Service-specific if available          │
├─────────────────────────────────────────┤
│  CTA SECTION                            │
│  "Ready for [Service Name]?"            │
├─────────────────────────────────────────┤
│  RELATED SERVICES                       │
│  3 other service cards                  │
├─────────────────────────────────────────┤
│  FOOTER                                 │
├─────────────────────────────────────────┤
│  STICKY MOBILE CTA                      │
└─────────────────────────────────────────┘
```

### Service Page Sections Detail

| Section | Content | Data Source |
|---------|---------|-------------|
| Breadcrumbs | Home > Services > [Name] | Generated |
| Service Hero | H1, description, image, CTAs | Sanity: service |
| What's Included | 4-6 features with icons | Sanity: service.features |
| Before/After | 2-3 gallery items | Sanity: gallery (filtered) |
| Why It Matters | ROI stats, value text | Hardcoded per service |
| FAQ | 3-5 Q&A pairs | Hardcoded (from SEO plan) |
| Testimonial | 1 review | Sanity: testimonials (filtered) |
| Related Services | 3 service cards | Sanity: services (exclude current) |

---

## Page Type 3: For Agents (Landing Page)

**Used by:** `/for-agents` (1 page)

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
├─────────────────────────────────────────┤
│  AGENT HERO                             │
│  Badge: "For Real Estate Professionals" │
│  H1: "Your Trusted Listing Prep Partner"│
│  Subhead: Agent-specific value prop     │
│  CTAs: "Partner With Us" | "Call Direct"│
├───────── GOLD LINE DIVIDER ─────────────┤
│  AGENT PAIN POINTS                      │
│  3 problems we solve:                   │
│  • Listings sitting too long            │
│  • Coordinating multiple vendors        │
│  • Clients overwhelmed by prep work     │
├───────── GOLD LINE DIVIDER ─────────────┤
│  HOW WE HELP AGENTS                     │
│  Benefits grid:                         │
│  • Single point of contact              │
│  • Fast turnaround (3-day start)        │
│  • Quality you can stake reputation on  │
│  • We make you look good                │
├───────── GOLD LINE DIVIDER ─────────────┤
│  OUR PROCESS (Agent version)            │
│  1. You refer → 2. We consult →         │
│  3. We execute → 4. Listing shines      │
├───────── GOLD LINE DIVIDER ─────────────┤
│  SERVICES OVERVIEW                      │
│  Quick grid of all 8 services           │
│  "Everything your clients need"         │
├───────── GOLD LINE DIVIDER ─────────────┤
│  BEFORE/AFTER SHOWCASE                  │
│  2-3 dramatic transformations           │
├───────── GOLD LINE DIVIDER ─────────────┤
│  AGENT TESTIMONIALS                     │
│  Quotes from realtors (if available)    │
│  Or general testimonials                │
├─────────────────────────────────────────┤
│  PARTNER CTA                            │
│  "Let's Work Together"                  │
│  Direct phone + email + form            │
├─────────────────────────────────────────┤
│  FOOTER                                 │
├─────────────────────────────────────────┤
│  STICKY MOBILE CTA                      │
└─────────────────────────────────────────┘
```

### For Agents Sections Detail

| Section | Content | Data Source |
|---------|---------|-------------|
| Agent Hero | Agent-specific H1, badge, CTAs | Hardcoded |
| Pain Points | 3 problems with icons | Hardcoded |
| How We Help | 4 benefits grid | Hardcoded |
| Our Process | 4 steps (agent perspective) | Hardcoded |
| Services Overview | 8 service mini-cards | Sanity: services |
| Before/After | 2-3 gallery items | Sanity: gallery (featured) |
| Testimonials | 2-3 reviews | Sanity: testimonials (agent tag) |
| Partner CTA | Heading + contact options | company.ts |

---

## Page Type 4: Gallery

**Used by:** `/gallery` (1 page)

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
├─────────────────────────────────────────┤
│  BREADCRUMBS                            │
│  Home > Gallery                         │
├─────────────────────────────────────────┤
│  GALLERY HERO                           │
│  H1: "Before & After Gallery"           │
│  Subhead: "See the transformations"     │
├─────────────────────────────────────────┤
│  FILTER BAR (multi-select)              │
│  All | Kitchen & Bath | Painting |      │
│  Flooring | Curb Appeal | etc.          │
├─────────────────────────────────────────┤
│  GALLERY GRID                           │
│  Before/After cards                     │
│  3 col desktop, 2 tablet, 1 mobile      │
├─────────────────────────────────────────┤
│  LOAD MORE / PAGINATION                 │
│  If many items                          │
├─────────────────────────────────────────┤
│  CTA SECTION                            │
│  "Want results like these?"             │
├─────────────────────────────────────────┤
│  FOOTER                                 │
├─────────────────────────────────────────┤
│  STICKY MOBILE CTA                      │
└─────────────────────────────────────────┘
```

### Gallery Card Component

| Element | Description |
|---------|-------------|
| Before image | Top half or left side |
| After image | Bottom half or right side |
| Service badge | Tag showing service type |
| Location | City name |
| Description | Brief project description |
| Hover | Glow emergence effect |
| Click | Opens lightbox with slider |

### Gallery Behavior

- **Filters:** Multi-select, client-side filtering
- **Default:** "All" selected
- **Lightbox:** Before ↔ After slider comparison
- **Loading:** Lazy load images, skeleton placeholders

---

## Page Type 5: Reviews

**Used by:** `/reviews` (1 page)

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
├─────────────────────────────────────────┤
│  BREADCRUMBS                            │
│  Home > Reviews                         │
├─────────────────────────────────────────┤
│  REVIEWS HERO                           │
│  H1: "What Our Clients Say"             │
│  Aggregate: ⭐⭐⭐⭐⭐ 5.0 (12 reviews)     │
├─────────────────────────────────────────┤
│  FILTER BAR (optional)                  │
│  All | Homeowners | Agents | By Service │
├─────────────────────────────────────────┤
│  FEATURED REVIEW (large card)           │
│  Best/longest testimonial               │
├───────── GOLD LINE DIVIDER ─────────────┤
│  REVIEWS GRID                           │
│  Review cards                           │
│  3 col desktop, 2 tablet, 1 mobile      │
├─────────────────────────────────────────┤
│  EXTERNAL REVIEWS LINKS                 │
│  "See more on Google | Yelp"            │
├─────────────────────────────────────────┤
│  CTA SECTION                            │
│  "Ready to become our next 5-star?"     │
├─────────────────────────────────────────┤
│  FOOTER                                 │
├─────────────────────────────────────────┤
│  STICKY MOBILE CTA                      │
└─────────────────────────────────────────┘
```

### Review Card Component

| Element | Description |
|---------|-------------|
| Stars | ⭐⭐⭐⭐⭐ (1-5) |
| Quote | Review text |
| Author | Name |
| Location | City |
| Service | Service type badge (optional) |
| Date | When posted (optional) |

### Reviews Page Data

| Section | Data Source |
|---------|-------------|
| Aggregate rating | Calculated from Sanity reviews |
| Featured review | Sanity: testimonial (featured flag) |
| Reviews grid | Sanity: testimonials |
| External links | company.ts (social.google, social.yelp) |

---

## Page Type 6: Get Quote

**Used by:** `/get-quote` (1 page)

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
├─────────────────────────────────────────┤
│  BREADCRUMBS                            │
│  Home > Get a Free Quote                │
├─────────────────────────────────────────┤
│  TWO-COLUMN LAYOUT                      │
│  ┌──────────────────┬─────────────────┐ │
│  │  LEFT: FORM      │  RIGHT: TRUST   │ │
│  │                  │                 │ │
│  │  H1: "Get Your   │  Why choose us  │ │
│  │   Free Quote"    │  • Response in  │ │
│  │                  │    1-24 hours   │ │
│  │  [Form fields]   │  • Licensed     │ │
│  │                  │  • Family-owned │ │
│  │  [Submit]        │                 │ │
│  │                  │  Mini review    │ │
│  │                  │                 │ │
│  │                  │  Phone number   │ │
│  └──────────────────┴─────────────────┘ │
│  (Stacks on mobile)                     │
├─────────────────────────────────────────┤
│  WHAT HAPPENS NEXT                      │
│  3 steps: Review → Call → Consultation  │
├─────────────────────────────────────────┤
│  FOOTER                                 │
├─────────────────────────────────────────┤
│  STICKY MOBILE CTA                      │
└─────────────────────────────────────────┘
```

### Quote Form Fields

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Name | Text | ✓ | — |
| Phone | Tel | ✓ | — |
| Email | Email | ✓ | — |
| Service type | Select | ✓ | 8 services + "Not sure" |
| Property address | Text | — | — |
| Project description | Textarea | — | — |
| Timeline | Select | — | ASAP, 1-2 weeks, 1 month, Flexible |
| How did you hear? | Select | — | Google, Referral, Agent, Social, Other |

### Form Behavior

- **Validation:** Client-side + server-side
- **Submit:** Server action → GHL webhook
- **Success:** Replace form with confirmation message
- **Error:** Inline error messages

---

## Page Type 7: Contact

**Used by:** `/contact` (1 page)

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
├─────────────────────────────────────────┤
│  BREADCRUMBS                            │
│  Home > Contact                         │
├─────────────────────────────────────────┤
│  CONTACT HERO                           │
│  H1: "Get In Touch"                     │
│  Subhead: "We respond within 1-24 hours"│
├─────────────────────────────────────────┤
│  THREE-COLUMN CONTACT CARDS             │
│  Phone | Email | Address                │
│  Each with icon + CTA button            │
├───────── GOLD LINE DIVIDER ─────────────┤
│  MAP EMBED                              │
│  Google Maps showing location           │
├───────── GOLD LINE DIVIDER ─────────────┤
│  SIMPLE CONTACT FORM                    │
│  Name | Email | Message                 │
│  [Send Message]                         │
├───────── GOLD LINE DIVIDER ─────────────┤
│  SERVICE AREAS                          │
│  Cities list + link to full page        │
├─────────────────────────────────────────┤
│  FOOTER                                 │
├─────────────────────────────────────────┤
│  STICKY MOBILE CTA                      │
└─────────────────────────────────────────┘
```

### Contact Form Fields

| Field | Type | Required |
|-------|------|----------|
| Name | Text | ✓ |
| Email | Email | ✓ |
| Message | Textarea | ✓ |

### Contact Cards Data

| Card | Content | Action |
|------|---------|--------|
| Phone | Office + Direct numbers | `tel:` link |
| Email | Email address | `mailto:` link |
| Address | Full address | Google Maps link |

---

## Page Type 8: Service Areas

**Used by:** `/service-areas` (1 page)

```
┌─────────────────────────────────────────┐
│  HEADER (sticky)                        │
├─────────────────────────────────────────┤
│  BREADCRUMBS                            │
│  Home > Service Areas                   │
├─────────────────────────────────────────┤
│  SERVICE AREAS HERO                     │
│  H1: "Serving Santa Clarita Valley"     │
│  Subhead: "Family-owned, locally based" │
├─────────────────────────────────────────┤
│  MAP SECTION                            │
│  Google Maps embed with service area    │
├───────── GOLD LINE DIVIDER ─────────────┤
│  CITIES GRID                            │
│  7 city cards (6 primary, 1 secondary)  │
│  3 col desktop, 2 tablet, 1 mobile      │
├───────── GOLD LINE DIVIDER ─────────────┤
│  LOCAL COMMITMENT                       │
│  "We're not a national franchise..."    │
│  Family-owned messaging                 │
├───────── GOLD LINE DIVIDER ─────────────┤
│  SERVICES WE BRING                      │
│  8 service icons/mini-cards             │
├─────────────────────────────────────────┤
│  CTA SECTION                            │
│  "In our service area? Let's talk."     │
├─────────────────────────────────────────┤
│  FOOTER                                 │
├─────────────────────────────────────────┤
│  STICKY MOBILE CTA                      │
└─────────────────────────────────────────┘
```

### Cities Data

| City | Type | ZIP Codes |
|------|------|-----------|
| Santa Clarita | Primary | 91350, 91351, 91354, 91355, 91387 |
| Valencia | Primary | 91354, 91355 |
| Stevenson Ranch | Primary | 91381 |
| Newhall | Primary | 91321 |
| Canyon Country | Primary | 91351, 91387 |
| Saugus | Primary | 91350, 91390 |
| Castaic | Secondary | 91384 |

### Map Configuration

- **Type:** Google Maps embed
- **Center:** Santa Clarita Valley
- **Zoom:** Show all service areas
- **Marker:** Business location

---

## Component Library Summary

### Layout Components

| Component | Used On |
|-----------|---------|
| `Header` | All pages |
| `Footer` | All pages |
| `Breadcrumbs` | All except homepage |
| `StickyMobileCTA` | All pages (mobile only) |
| `GoldLineDivider` | All pages (between sections) |
| `CTASection` | All pages |

### Content Components

| Component | Used On |
|-----------|---------|
| `ServiceCard` | Homepage, Service pages, For Agents |
| `TestimonialCard` | Homepage, Reviews, Service pages |
| `GalleryCard` | Homepage, Gallery, Service pages |
| `CityCard` | Service Areas |
| `ContactCard` | Contact |
| `StatCard` | Homepage (Why Trust Us) |
| `StepCard` | Homepage, For Agents (Process) |
| `FeatureCard` | Service pages |
| `FAQAccordion` | Service pages |

### Form Components

| Component | Used On |
|-----------|---------|
| `QuoteForm` | Get Quote |
| `ContactForm` | Contact |
| `FilterBar` | Gallery, Reviews |

### Interactive Components

| Component | Used On |
|-----------|---------|
| `Lightbox` | Gallery |
| `MapEmbed` | Contact, Service Areas |

---

## Responsive Breakpoints

| Breakpoint | Width | Grid Columns |
|------------|-------|--------------|
| Mobile | < 640px | 1 |
| Tablet | 640-1024px | 2 |
| Desktop | 1024-1280px | 3-4 |
| Wide | > 1280px | 4 |

---

## Implementation Priority

### Phase 1: Core Pages
1. Homepage (updated with new sections)
2. Get Quote
3. Contact

### Phase 2: Service Pages
4. Kitchen & Bath (template)
5. Apply template to remaining 7 services

### Phase 3: Content Pages
6. Gallery
7. Reviews
8. For Agents
9. Service Areas

---

*Page layouts locked: 2025-12-26*
