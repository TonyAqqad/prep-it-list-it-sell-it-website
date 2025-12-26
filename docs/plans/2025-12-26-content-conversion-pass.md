# Content + Conversion Pass Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply research-backed copywriting techniques to all 15 pages, creating headlines, CTAs, proof sections, FAQs, and conversion-optimized copy.

**Architecture:** Create a `src/content/copy/` directory with per-page copy specifications. Each page gets a dedicated TypeScript file containing all copy elements (headlines, subheads, body, CTAs, FAQ Q&As). Components read from these files, ensuring copy is centralized and editable.

**Tech Stack:** TypeScript content files, React components consuming copy data, existing Tailwind/design system for styling.

---

## Background: The Copywriting Agent Framework

This plan was designed using research from 5 legendary copywriters + 2 industry research documents. The agent framework synthesizes their techniques:

### Core Philosophy
> "Copy cannot create desire. It can only channel the hopes, dreams, fears and desires that already exist." — Eugene Schwartz
> Combined with: "Find the starving crowd first." — Gary Halbert

### The 7-Step Framework (Per Page Section)

| Step | Source | Technique |
|------|--------|-----------|
| 1. Analyze | Schwartz | Awareness level (Problem/Solution Aware for most visitors) |
| 2. Headline | Halbert + Schwartz | Fascination format, match to awareness level |
| 3. Above-Fold CTA | Halbert + Industry | Clear action + "Response within 1-24 hours" |
| 4. Proof | Furey + Halbert + Sugarman | Specific story, specific numbers, honesty trigger |
| 5. Body | Sugarman + Schwartz + Settle | Slippery slide, seeds of curiosity, personality |
| 6. FAQ | Sugarman + Industry | Raise objection yourself ("dirty laundry"), address 88% seller fears |
| 7. Bottom CTA | Halbert + Sugarman | P.S. technique, involvement formula, authentic scarcity |

### Voice Guidelines
- Conversational neighbor, not corporate contractor
- Specific over vague ("127 homes since 2019" not "many homes")
- Address fears directly but empathetically (88% of sellers have concerns)
- 8th-10th grade reading level (per CLAUDE.md)
- Use "you/your" more than "we/our"

### Key Industry Insights to Apply
- 88% of homeowners have concerns about selling
- 62% say selling impacts mental health (ranked above divorce!)
- Only 30% of contractors finish on time/budget
- NO local Santa Clarita competitor positions for pre-listing work (market gap)
- Staged homes sell for 1-5% higher; combined prep+staging adds avg $145K
- Reducing form fields from 4→3 can boost conversions 50%

---

## Task 1: Create Copy Content Structure

**Files:**
- Create: `src/content/copy/index.ts`
- Create: `src/content/copy/types.ts`

**Step 1: Create types file**

```typescript
// src/content/copy/types.ts

export interface PageCopy {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge?: string;
    headline: string;
    subheadline: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta?: {
      text: string;
      href: string;
    };
    trustIndicators?: string[];
  };
  sections: Section[];
  faq?: FAQItem[];
  bottomCta: {
    headline: string;
    subheadline?: string;
    primaryCta: {
      text: string;
      href: string;
    };
  };
}

export interface Section {
  id: string;
  headline?: string;
  subheadline?: string;
  body?: string;
  items?: string[] | Record<string, string>[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePageCopy extends PageCopy {
  whyItMatters: {
    headline: string;
    stats: { value: string; label: string }[];
    body: string;
  };
  features: {
    headline: string;
    items: { title: string; description: string }[];
  };
}
```

**Step 2: Create index barrel export**

```typescript
// src/content/copy/index.ts

export * from './types';
export { homepageCopy } from './homepage';
export { kitchenBathCopy } from './kitchen-bath';
export { paintingCopy } from './painting';
export { flooringCopy } from './flooring';
export { handymanCopy } from './handyman';
export { curbAppealCopy } from './curb-appeal';
export { cleaningCopy } from './cleaning';
export { declutteringCopy } from './decluttering';
export { stagingCopy } from './staging';
export { forAgentsCopy } from './for-agents';
export { galleryCopy } from './gallery';
export { reviewsCopy } from './reviews';
export { getQuoteCopy } from './get-quote';
export { contactCopy } from './contact';
export { serviceAreasCopy } from './service-areas';
```

**Step 3: Verify structure compiles**

Run: `npm run typecheck`
Expected: PASS (or only unrelated errors)

**Step 4: Commit**

```bash
git add src/content/copy/
git commit -m "feat: add copy content structure and types"
```

---

## Task 2: Homepage Copy

**Files:**
- Create: `src/content/copy/homepage.ts`

**Step 1: Write homepage copy file**

```typescript
// src/content/copy/homepage.ts

import type { PageCopy } from './types';

export const homepageCopy: PageCopy = {
  slug: '/',
  meta: {
    title: 'Pre-Listing Home Improvement & Listing Prep | Santa Clarita',
    description: "Santa Clarita's #1 listing prep service. Pre-listing home improvements that get your house ready to sell fast. Family-owned, licensed & insured. Response within 1-24 hours.",
  },
  hero: {
    badge: 'Santa Clarita Valley',
    // Halbert fascination format + Schwartz problem-aware headline
    headline: 'Get Your Home Sale-Ready Without the Stress',
    // Sugarman: short first sentence, slippery slide
    subheadline: 'One call. We handle everything—from repairs to staging to final touches—so you can focus on your next chapter while we maximize your sale price.',
    primaryCta: {
      text: 'Get Your Free Quote',
      href: '/get-quote',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
    // Industry research: trust signals near CTA boost conversions
    trustIndicators: [
      'Licensed & Insured',
      'Family-Owned Since 2021',
      'Response Within 1-24 Hours',
    ],
  },
  sections: [
    {
      id: 'value-bar',
      // Halbert: specific benefits, not vague
      items: [
        { value: 'Sell Faster', description: 'Prepared homes spend fewer days on market' },
        { value: 'Get More', description: 'Strategic updates that pay for themselves' },
        { value: 'Less Stress', description: 'One point of contact handles it all' },
      ],
    },
    {
      id: 'services',
      // Schwartz: solution-aware headline
      headline: 'Everything Your Home Needs Before Listing',
      subheadline: 'From quick fixes to full transformations—we handle the prep work that makes buyers say yes.',
    },
    {
      id: 'how-it-works',
      headline: 'How It Works',
      // Sugarman: show how easy it is
      subheadline: 'Four simple steps from first call to sold sign.',
      items: [
        { step: '1', title: 'Schedule a Walkthrough', description: "We'll assess what your home needs to shine." },
        { step: '2', title: 'Get Your Estimate', description: 'Clear pricing, no surprises. You approve before we start.' },
        { step: '3', title: 'We Do the Work', description: 'Our crews handle everything while you go about your life.' },
        { step: '4', title: 'List and Sell', description: 'Your home hits the market move-in ready.' },
      ],
    },
    {
      id: 'why-trust-us',
      // Settle: personality injection, anti-corporate
      headline: "We're Not a Franchise. We're Your Neighbors.",
      subheadline: 'Family-owned and rooted in Santa Clarita Valley since 2021.',
      body: "When you call, you get Bryan—not a call center. We live here, we work here, and our reputation depends on every single project. That's why we answer the phone, show up on time, and finish what we start.",
      items: [
        { value: '100+', label: 'Homes Prepared' },
        { value: '1-24 hrs', label: 'Response Time' },
        { value: '2021', label: 'Serving SCV Since' },
        { value: '5.0', label: 'Average Rating' },
      ],
    },
    {
      id: 'testimonials',
      headline: 'What Our Clients Say',
      // Schwartz: bring in an audience
      subheadline: "Don't just take our word for it.",
    },
    {
      id: 'before-after',
      headline: 'See the Difference',
      subheadline: 'Real projects from Santa Clarita Valley homes.',
    },
    {
      id: 'service-areas',
      headline: 'Proudly Serving Santa Clarita Valley',
      subheadline: 'Valencia, Stevenson Ranch, Newhall, Canyon Country, Saugus, and Castaic.',
    },
  ],
  bottomCta: {
    // Halbert P.S. technique: restate main offer
    headline: 'Ready to Get Started?',
    subheadline: "Your listing date doesn't wait. Neither do we. Response within 1-24 hours.",
    primaryCta: {
      text: 'Get Your Free Quote',
      href: '/get-quote',
    },
  },
};
```

**Step 2: Verify types**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add src/content/copy/homepage.ts
git commit -m "feat: add homepage copy with conversion-optimized content"
```

---

## Task 3: Kitchen & Bath Service Page Copy

**Files:**
- Create: `src/content/copy/kitchen-bath.ts`

**Step 1: Write kitchen-bath copy file**

```typescript
// src/content/copy/kitchen-bath.ts

import type { ServicePageCopy } from './types';

export const kitchenBathCopy: ServicePageCopy = {
  slug: '/services/kitchen-bath',
  meta: {
    title: 'Kitchen & Bath Updates Before Selling | Best ROI Santa Clarita',
    description: 'Strategic kitchen and bathroom updates with the best ROI before selling. Cabinet hardware, faucets, backsplash, vanity upgrades. Serving Valencia, Stevenson Ranch & Santa Clarita.',
  },
  hero: {
    badge: 'Best ROI Updates',
    // Schwartz: solution-aware + unique mechanism
    headline: 'The Kitchen & Bath Updates That Actually Pay Off',
    // Sugarman: dirty laundry first (acknowledge the fear), then solve
    subheadline: "Full renovations rarely make sense before selling. But strategic updates? They can return 75-100% on your investment. We know exactly which changes make buyers reach for their checkbooks.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=kitchen-bath',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
  },
  features: {
    headline: "What's Included",
    items: [
      {
        title: 'Cabinet Hardware',
        description: 'New knobs and pulls that modernize dated cabinets instantly.',
      },
      {
        title: 'Faucet & Fixture Upgrades',
        description: 'Swap builder-grade for brushed nickel or matte black.',
      },
      {
        title: 'Backsplash Refresh',
        description: 'Peel-and-stick or tile installation that transforms the space.',
      },
      {
        title: 'Vanity Updates',
        description: 'New mirrors, lighting, and hardware that buyers notice.',
      },
      {
        title: 'Re-caulking & Grout',
        description: 'Clean, fresh lines that signal "well-maintained."',
      },
      {
        title: 'Minor Repairs',
        description: 'Leaky faucets, sticky drawers, and loose handles—fixed.',
      },
    ],
  },
  whyItMatters: {
    // Industry research + Schwartz intensification
    headline: 'Why These Updates Matter',
    stats: [
      { value: '75-100%', label: 'Typical ROI on strategic kitchen updates' },
      { value: '48%', label: 'of buyers say kitchen upgrades are most important' },
      { value: '$6K-18K', label: 'Smart budget for a $600K home (1-3%)' },
    ],
    // Sugarman: picture the black side (what happens if they don't)
    body: "Buyers walk into kitchens and bathrooms with a mental calculator running. They see dated hardware and start subtracting from their offer. They spot a dripping faucet and wonder what else is wrong. But fresh, modern touches? Those flip the script. Now they're picturing dinner parties, not repair bills.",
  },
  sections: [],
  // SEO plan FAQs with Sugarman objection-handling approach
  faq: [
    {
      question: 'Is a kitchen remodel worth it before selling?',
      // Sugarman: acknowledge then redirect
      answer: "Full remodels rarely recoup their cost before selling. But strategic updates are different—they're the high-impact, low-cost changes that return 75-100% on investment. We focus on what buyers actually notice: hardware, fixtures, and finishes. Not tearing out cabinets.",
    },
    {
      question: 'What kitchen updates have the best ROI?',
      answer: 'Cabinet hardware, fresh paint, new faucets, and updated backsplash offer the best returns. These changes make a big visual impact without major expense. A $500 hardware swap can make a $20,000 kitchen renovation unnecessary.',
    },
    {
      question: 'Should I update my bathroom before selling?',
      answer: "Yes, but focus on cosmetic updates: new vanity hardware, fresh caulk, updated lighting, and a fresh coat of paint. These signal 'well-maintained' to buyers. Avoid full renovations unless there's actual damage.",
    },
    {
      question: 'How much should I spend on kitchen updates before selling?',
      answer: "A good rule is 1-3% of your home's value. For a $600K home, that's $6,000-$18,000 in strategic updates. We'll help you prioritize where every dollar will have the most impact on your sale price.",
    },
  ],
  bottomCta: {
    headline: 'Ready for Kitchen & Bath Updates?',
    subheadline: "Let's figure out which updates will give you the best return.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=kitchen-bath',
    },
  },
};
```

**Step 2: Verify types**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add src/content/copy/kitchen-bath.ts
git commit -m "feat: add kitchen-bath service page copy"
```

---

## Task 4: Painting Service Page Copy

**Files:**
- Create: `src/content/copy/painting.ts`

**Step 1: Write painting copy file**

```typescript
// src/content/copy/painting.ts

import type { ServicePageCopy } from './types';

export const paintingCopy: ServicePageCopy = {
  slug: '/services/painting',
  meta: {
    title: 'Interior & Exterior Painting | #1 ROI Home Improvement Santa Clarita',
    description: 'Fresh paint is the #1 ROI improvement before selling. Interior & exterior painting in Santa Clarita Valley. Walls, trim, cabinets, decks. Get market-ready fast.',
  },
  hero: {
    badge: '#1 ROI Improvement',
    // Halbert: specific benefit + Schwartz solution-aware
    headline: 'Fresh Paint Returns 100%+ on Your Investment',
    // Furey: story grounding with specific detail
    subheadline: "Nothing transforms a home faster than paint. It's the single highest-ROI improvement you can make before selling—and we can have your home looking brand new in days, not weeks.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=painting',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
  },
  features: {
    headline: "What's Included",
    items: [
      {
        title: 'Interior Walls & Trim',
        description: 'Complete room transformations with clean, crisp lines.',
      },
      {
        title: 'Cabinet Refinishing',
        description: 'Update dated cabinets without the cost of replacement.',
      },
      {
        title: 'Exterior Painting',
        description: 'Boost curb appeal from the street to the front door.',
      },
      {
        title: 'Deck & Fence Staining',
        description: 'Refresh outdoor spaces buyers will actually use.',
      },
      {
        title: 'Ceiling & Accent Walls',
        description: 'Strategic color choices that make rooms feel larger.',
      },
      {
        title: 'Touch-Up & Repair',
        description: 'Fix nail holes, scuffs, and wear marks before they become objections.',
      },
    ],
  },
  whyItMatters: {
    headline: 'Why Paint Sells Homes',
    stats: [
      { value: '100%+', label: 'Average ROI on pre-sale painting' },
      { value: '32%', label: 'of buyers want new interior paint' },
      { value: '$2-4', label: 'Cost per sq ft interior' },
    ],
    // Schwartz: picture the black side, then the solution
    body: "Scuffed walls, chipped trim, and faded paint tell buyers one thing: deferred maintenance. They start wondering what else has been neglected. Fresh, neutral paint tells a different story—it says 'move-in ready.' It photographs better, shows better, and sells faster.",
  },
  sections: [],
  faq: [
    {
      question: 'Should I paint before selling my house?',
      answer: "Yes—fresh paint is the #1 ROI improvement, returning 100%+ on your investment. Even if your current paint isn't bad, fresh neutral colors photograph better and help buyers visualize their furniture in the space.",
    },
    {
      question: 'What colors sell houses faster?',
      answer: 'Neutral tones work best: warm whites, light grays, and greige (gray-beige). These colors appeal to the widest range of buyers and make spaces feel larger and brighter. Avoid bold or personal colors that might turn buyers off.',
    },
    {
      question: 'Is exterior painting worth it before selling?',
      answer: "If your paint is peeling, faded, or outdated—absolutely. Curb appeal is where first impressions happen. Buyers often decide how much they'll offer before they walk through the front door.",
    },
    {
      question: 'How much does pre-sale painting cost?',
      answer: 'Interior painting runs $2-4 per square foot. Exterior is $3-6 per square foot depending on prep work needed. For most Santa Clarita homes, a full interior repaint runs $3,000-$8,000—an investment that typically returns more than you spend.',
    },
  ],
  bottomCta: {
    headline: 'Ready for Fresh Paint?',
    subheadline: "Let's talk about what colors and rooms will have the biggest impact.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=painting',
    },
  },
};
```

**Step 2: Verify types**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add src/content/copy/painting.ts
git commit -m "feat: add painting service page copy"
```

---

## Task 5: Flooring Service Page Copy

**Files:**
- Create: `src/content/copy/flooring.ts`

**Step 1: Write flooring copy file**

```typescript
// src/content/copy/flooring.ts

import type { ServicePageCopy } from './types';

export const flooringCopy: ServicePageCopy = {
  slug: '/services/flooring',
  meta: {
    title: 'Carpet & Flooring Installation | Valencia, Stevenson Ranch, Santa Clarita',
    description: 'Flooring removal, supply & installation. Carpet, laminate, vinyl plank, tile. Transform your home before selling. Serving Santa Clarita Valley.',
  },
  hero: {
    badge: 'Flooring Transformation',
    headline: 'New Floors Change Everything',
    subheadline: "Worn carpet and scratched hardwood make buyers think 'project house.' Fresh flooring makes them think 'move-in ready.' We handle removal, supply, and installation—so you don't have to coordinate anything.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=flooring',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
  },
  features: {
    headline: "What's Included",
    items: [
      {
        title: 'Carpet Installation',
        description: 'Soft, neutral carpet that photographs beautifully.',
      },
      {
        title: 'Luxury Vinyl Plank (LVP)',
        description: 'The look of hardwood at a fraction of the cost—and waterproof.',
      },
      {
        title: 'Laminate Flooring',
        description: 'Durable, attractive, and budget-friendly.',
      },
      {
        title: 'Tile Work',
        description: 'Kitchen, bath, and entry tile installation.',
      },
      {
        title: 'Old Flooring Removal',
        description: 'We tear out the old before installing the new.',
      },
      {
        title: 'Subfloor Prep',
        description: 'Level and prep for a professional finish.',
      },
    ],
  },
  whyItMatters: {
    headline: 'Why Flooring Matters to Buyers',
    stats: [
      { value: '70-80%', label: 'ROI on flooring before selling' },
      { value: 'LVP', label: 'Best value flooring option' },
      { value: '2-3 days', label: 'Typical room turnaround' },
    ],
    body: "Flooring is one of the first things buyers notice—and one of the last things they want to deal with after moving in. Stained carpet or damaged hardwood signals work and expense. Fresh, modern flooring signals 'ready to live in.' It's the difference between competing offers and price reductions.",
  },
  sections: [],
  faq: [
    {
      question: 'Should I replace carpet before selling?',
      answer: "If it's stained, worn, or dated—yes. Clean, neutral carpet or LVP makes your home feel fresh and move-in ready. Buyers mentally subtract thousands from their offer when they see flooring they'll need to replace.",
    },
    {
      question: 'What flooring has the best ROI before selling?',
      answer: 'Luxury Vinyl Plank (LVP) offers the best value: it looks like hardwood, costs less, and is waterproof. Buyers love it because it works in any room. For bedrooms, neutral carpet still performs well.',
    },
    {
      question: 'Is hardwood worth it before selling?',
      answer: "Only if your budget allows and comps in your neighborhood have hardwood. LVP gives a similar look at 30-50% of the cost with excellent ROI. We can help you decide what makes sense for your specific situation.",
    },
  ],
  bottomCta: {
    headline: 'Ready for New Flooring?',
    subheadline: "Let's figure out the right flooring for your home and budget.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=flooring',
    },
  },
};
```

**Step 2: Verify types**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add src/content/copy/flooring.ts
git commit -m "feat: add flooring service page copy"
```

---

## Task 6: Handyman Service Page Copy

**Files:**
- Create: `src/content/copy/handyman.ts`

**Step 1: Write handyman copy file**

```typescript
// src/content/copy/handyman.ts

import type { ServicePageCopy } from './types';

export const handymanCopy: ServicePageCopy = {
  slug: '/services/handyman',
  meta: {
    title: 'Handyman Repairs Santa Clarita | Pre-Sale Home Fixes',
    description: 'General repairs & maintenance before selling. Drywall, fixtures, doors & more. Fix what\'s broken before buyers notice. Valencia, Newhall, Canyon Country.',
  },
  hero: {
    badge: 'Pre-Sale Repairs',
    // Sugarman: dirty laundry (acknowledge fear), Halbert: specific
    headline: 'Fix the Small Stuff Before It Becomes Big Objections',
    subheadline: "That squeaky door. The loose handrail. The patch of missing grout. Buyers notice everything—and every flaw becomes a negotiating chip. We fix what's broken so inspectors and buyers have less to complain about.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=handyman',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
  },
  features: {
    headline: "What's Included",
    items: [
      {
        title: 'Drywall Patching',
        description: 'Holes, cracks, and dings repaired seamlessly.',
      },
      {
        title: 'Fixture Replacement',
        description: 'New light fixtures, outlet covers, and door hardware.',
      },
      {
        title: 'Door Adjustments',
        description: 'Sticky doors, broken latches, and squeaky hinges fixed.',
      },
      {
        title: 'Caulking & Grout',
        description: 'Fresh caulk in kitchens and baths; grout touch-ups.',
      },
      {
        title: 'Minor Plumbing',
        description: 'Leaky faucets, running toilets, and slow drains.',
      },
      {
        title: 'Safety Items',
        description: 'Handrails, smoke detectors, and GFCI outlets.',
      },
    ],
  },
  whyItMatters: {
    headline: 'Why Small Repairs Matter Big',
    stats: [
      { value: '88%', label: 'of sellers have concerns about selling' },
      { value: '$500+', label: 'Typical buyer credit request per issue' },
      { value: '1-2%', label: 'Smart repair budget (of home value)' },
    ],
    // Schwartz: black side picture
    body: "Small issues snowball in buyer psychology. One loose doorknob makes them wonder about the whole house. A leaky faucet raises questions about the plumbing. But a home where everything works? That's the 'move-in ready' feeling that commands top dollar. Fix the small stuff now, or pay for it in negotiations later.",
  },
  sections: [],
  faq: [
    {
      question: 'What repairs should I make before selling?',
      answer: "Focus on visible issues buyers will notice: leaky faucets, squeaky doors, cracked tiles, drywall holes, loose handles. These small fixes cost little but prevent big negotiation requests. We'll walk through and identify exactly what needs attention.",
    },
    {
      question: 'What should I NOT fix when selling a house?',
      answer: "Avoid major renovations, purely cosmetic issues buyers won't notice, and personal preference items (like changing light fixtures you just like). Focus budget on repairs that affect inspection reports or create negative first impressions.",
    },
    {
      question: 'How much should I spend on repairs before selling?',
      answer: "Budget 1-2% of your home's value for pre-sale fixes. For a $600K home, that's $6,000-$12,000. Prioritize repairs that will show up on inspections or create objections during showings. We help you focus every dollar where it matters.",
    },
  ],
  bottomCta: {
    headline: 'Ready to Fix the Details?',
    subheadline: "Let's walk through your home and identify what needs attention.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=handyman',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/handyman.ts
git commit -m "feat: add handyman service page copy"
```

---

## Task 7: Curb Appeal Service Page Copy

**Files:**
- Create: `src/content/copy/curb-appeal.ts`

**Step 1: Write curb-appeal copy file**

```typescript
// src/content/copy/curb-appeal.ts

import type { ServicePageCopy } from './types';

export const curbAppealCopy: ServicePageCopy = {
  slug: '/services/curb-appeal',
  meta: {
    title: 'Curb Appeal Services | First Impressions Santa Clarita Valley',
    description: 'Lawn care, pressure washing, mulching & exterior lighting. First impressions sell homes. Serving Santa Clarita, Valencia, Stevenson Ranch.',
  },
  hero: {
    badge: 'First Impressions',
    // Halbert: starving crowd (buyers decide before entering)
    headline: 'Buyers Decide Before They Walk In',
    subheadline: "94% of realtors say curb appeal matters. We say it's where offers begin. From the street to the front door, we make sure your home says 'welcome home'—not 'fixer-upper.'",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=curb-appeal',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
  },
  features: {
    headline: "What's Included",
    items: [
      {
        title: 'Lawn Maintenance',
        description: 'Mowing, edging, and cleanup for that manicured look.',
      },
      {
        title: 'Pressure Washing',
        description: 'Driveways, walkways, and siding that shine.',
      },
      {
        title: 'Mulching & Beds',
        description: 'Fresh mulch and cleaned-up planting areas.',
      },
      {
        title: 'Exterior Lighting',
        description: 'Updated fixtures that welcome buyers day and night.',
      },
      {
        title: 'Front Door Refresh',
        description: 'New hardware, fresh paint, and a clean welcome mat.',
      },
      {
        title: 'Fence & Gate Repairs',
        description: 'Fix what's broken, paint what's faded.',
      },
    ],
  },
  whyItMatters: {
    headline: 'Why Curb Appeal Sells',
    stats: [
      { value: '94%', label: 'of realtors say curb appeal matters' },
      { value: '7 sec', label: 'Time to form first impression' },
      { value: '268%', label: 'ROI on garage door replacement' },
    ],
    // Furey: specific story grounding
    body: "Picture a buyer pulling up to your home. In seven seconds, they've already decided how much they'll offer. Overgrown lawn? They're thinking 'deferred maintenance.' Pressure-washed driveway and fresh mulch? They're thinking 'pride of ownership.' Curb appeal isn't just about looking nice—it's about setting the right expectation before the front door even opens.",
  },
  sections: [],
  faq: [
    {
      question: 'How important is curb appeal when selling?',
      answer: "Critical. 94% of realtors say curb appeal is important for attracting buyers. Studies show buyers form their first impression in 7 seconds—and that impression influences their entire walkthrough. Curb appeal sets the tone for how much they'll offer.",
    },
    {
      question: 'What curb appeal improvements have the best ROI?',
      answer: 'Fresh mulch, lawn care, pressure washing, new house numbers, and exterior lighting deliver the best returns for the lowest cost. Garage door replacement has the highest ROI of any home improvement at 268%.',
    },
    {
      question: 'Should I landscape before selling?',
      answer: "Basic cleanup and fresh mulch: absolutely. Major landscaping projects: usually no. Buyers want 'maintained,' not 'elaborate.' Focus on clean, tidy, and welcoming rather than expensive plantings they'll have to maintain.",
    },
  ],
  bottomCta: {
    headline: 'Ready to Boost Your Curb Appeal?',
    subheadline: "Let's make sure buyers fall in love before they even ring the bell.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=curb-appeal',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/curb-appeal.ts
git commit -m "feat: add curb-appeal service page copy"
```

---

## Task 8: Cleaning Service Page Copy

**Files:**
- Create: `src/content/copy/cleaning.ts`

**Step 1: Write cleaning copy file**

```typescript
// src/content/copy/cleaning.ts

import type { ServicePageCopy } from './types';

export const cleaningCopy: ServicePageCopy = {
  slug: '/services/cleaning',
  meta: {
    title: 'Deep Cleaning & Deodorizing | Move-Out Cleaning Santa Clarita',
    description: 'Professional deep cleaning for listings & move-outs. Carpet cleaning, odor elimination, window cleaning. Santa Clarita Valley.',
  },
  hero: {
    badge: 'Listing-Ready Clean',
    headline: 'A Clean Home Signals "Well-Maintained"',
    subheadline: "Buyers can't see past dirt. A professionally cleaned home photographs better, shows better, and tells buyers the owners cared. We make your home sparkle from baseboards to ceiling fans.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=cleaning',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
  },
  features: {
    headline: "What's Included",
    items: [
      {
        title: 'Deep Cleaning',
        description: 'Every surface, every corner, every detail.',
      },
      {
        title: 'Carpet Cleaning',
        description: 'Professional extraction that removes years of wear.',
      },
      {
        title: 'Odor Elimination',
        description: 'Pet smells, smoke, and mustiness—gone.',
      },
      {
        title: 'Window Cleaning',
        description: 'Interior and exterior for maximum natural light.',
      },
      {
        title: 'Kitchen Deep Clean',
        description: 'Inside appliances, behind the stove, under the sink.',
      },
      {
        title: 'Bathroom Sanitization',
        description: 'Grout, tile, fixtures, and fans thoroughly cleaned.',
      },
    ],
  },
  whyItMatters: {
    headline: 'Why Deep Cleaning Matters',
    stats: [
      { value: '100%', label: 'of buyers expect clean' },
      { value: '$200-800', label: 'Typical deep clean cost' },
      { value: 'Better', label: 'Photos & showings' },
    ],
    body: "A dirty home raises red flags. Buyers wonder: if they didn't clean, what else did they neglect? But a spotless home sends the opposite signal—these owners cared. Clean homes photograph better (hello, natural light through sparkling windows), show better, and sell faster. It's one of the easiest wins in pre-listing prep.",
  },
  sections: [],
  faq: [
    {
      question: 'Should I deep clean before selling?',
      answer: "Absolutely. A clean home signals 'well-maintained' and photographs better for your listing. Professional cleaning ensures nothing is missed—including the details buyers notice but sellers overlook after years of living there.",
    },
    {
      question: 'How much does move-out cleaning cost?',
      answer: '$200-$500 for standard homes. Deep cleaning with carpet cleaning runs $400-$800 depending on size and condition. Compare that to a single buyer concession request and cleaning pays for itself.',
    },
  ],
  bottomCta: {
    headline: 'Ready for a Deep Clean?',
    subheadline: "Let's make your home sparkle for photos and showings.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=cleaning',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/cleaning.ts
git commit -m "feat: add cleaning service page copy"
```

---

## Task 9: Decluttering Service Page Copy

**Files:**
- Create: `src/content/copy/decluttering.ts`

**Step 1: Write decluttering copy file**

```typescript
// src/content/copy/decluttering.ts

import type { ServicePageCopy } from './types';

export const declutteringCopy: ServicePageCopy = {
  slug: '/services/decluttering',
  meta: {
    title: 'Decluttering & Junk Removal | Estate Cleanouts Santa Clarita',
    description: 'Home clearouts, estate cleanouts & donation coordination. Remove the clutter, reveal your home\'s potential. Santa Clarita Valley.',
  },
  hero: {
    badge: 'Reveal Your Space',
    headline: 'Less Stuff = More Offers',
    subheadline: "Buyers need to see themselves in your home—not your stuff. We remove years of accumulation, coordinate donations, and help you let go of what's been holding your sale back.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=decluttering',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
  },
  features: {
    headline: "What's Included",
    items: [
      {
        title: 'Full Home Clearouts',
        description: 'Room by room, we help you decide what stays and what goes.',
      },
      {
        title: 'Estate Cleanouts',
        description: 'Sensitive, respectful handling of inherited properties.',
      },
      {
        title: 'Donation Coordination',
        description: 'We schedule pickups and drop-offs so your items find new homes.',
      },
      {
        title: 'Junk Removal',
        description: 'Haul away what can\'t be donated or sold.',
      },
      {
        title: 'Garage & Storage',
        description: 'Clear out the spaces buyers want to see empty.',
      },
      {
        title: 'Organizing',
        description: 'What remains gets organized and staged.',
      },
    ],
  },
  whyItMatters: {
    headline: 'Why Decluttering Sells',
    stats: [
      { value: '50%+', label: 'of items should go before listing' },
      { value: 'Faster', label: 'Decluttered homes sell faster' },
      { value: 'More', label: 'Perceived square footage' },
    ],
    body: "Clutter makes rooms feel smaller, photographs worse, and prevents buyers from seeing themselves living there. They see your stuff instead of their future. Remove 50% or more, and suddenly that 'cramped' room becomes 'cozy and functional.' The home you've lived in for years becomes the home they want to buy.",
  },
  sections: [],
  faq: [
    {
      question: 'How much clutter is too much when selling?',
      answer: "If buyers can't see the space for the stuff, it's too much. A good rule: remove at least 50% of your belongings before listing. This includes closets, garages, and storage areas—buyers will look everywhere.",
    },
    {
      question: 'Should I declutter before listing?',
      answer: "Yes—decluttered homes sell faster and for more money. Less is more. Buyers need to visualize their life in your space, and your personal items get in the way of that mental picture.",
    },
  ],
  bottomCta: {
    headline: 'Ready to Declutter?',
    subheadline: "Let's reveal what your home can really offer buyers.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=decluttering',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/decluttering.ts
git commit -m "feat: add decluttering service page copy"
```

---

## Task 10: Staging Service Page Copy

**Files:**
- Create: `src/content/copy/staging.ts`

**Step 1: Write staging copy file**

```typescript
// src/content/copy/staging.ts

import type { ServicePageCopy } from './types';

export const stagingCopy: ServicePageCopy = {
  slug: '/services/staging',
  meta: {
    title: 'Staging & Organizing | Photo-Ready Home Prep Santa Clarita',
    description: 'Professional staging consultation & furniture arrangement. Help buyers visualize themselves in your home. Santa Clarita Valley.',
  },
  hero: {
    badge: 'Photo-Ready',
    headline: 'Help Buyers See Their Future Home',
    subheadline: "Staged homes sell 73% faster and for 5-10% more. We arrange what you have—or bring in what you need—so your home photographs beautifully and shows even better.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=staging',
    },
    secondaryCta: {
      text: 'Call (661) 360-9252',
      href: 'tel:+16613609252',
    },
  },
  features: {
    headline: "What's Included",
    items: [
      {
        title: 'Staging Consultation',
        description: 'Walk-through assessment and room-by-room recommendations.',
      },
      {
        title: 'Furniture Arrangement',
        description: 'Reposition what you have for better flow and photos.',
      },
      {
        title: 'Decor Placement',
        description: 'Strategic accessories that add warmth without clutter.',
      },
      {
        title: 'Photo-Ready Prep',
        description: 'Final touches before the photographer arrives.',
      },
      {
        title: 'Rental Coordination',
        description: 'Source and place rental furniture for vacant homes.',
      },
      {
        title: 'Showing Maintenance',
        description: 'Keep staged look fresh throughout listing period.',
      },
    ],
  },
  whyItMatters: {
    headline: 'Why Staging Works',
    stats: [
      { value: '73%', label: 'faster sales for staged homes' },
      { value: '5-10%', label: 'higher sale price on average' },
      { value: '81%', label: 'of buyers agents say staging helps visualization' },
    ],
    body: "Empty rooms feel smaller. Cluttered rooms feel chaotic. But a well-staged room? It tells a story. Buyers walk in and see dinner parties in the dining room, movie nights in the living room, peaceful mornings in the bedroom. Staging creates the emotional connection that turns browsers into buyers—and that connection translates to better offers.",
  },
  sections: [],
  faq: [
    {
      question: 'Is home staging worth it?',
      answer: "Yes. Staged homes sell 73% faster and for 5-10% more on average. Even a basic staging consultation can transform how your home photographs and shows. The ROI on staging is consistently positive.",
    },
    {
      question: 'Home staging vs home improvement—which is better?',
      answer: "Both. Fix issues first, then stage. Staging a poorly maintained home doesn't work—buyers see through it. But once repairs are done, staging maximizes the emotional impact and helps justify your asking price.",
    },
    {
      question: 'How much does staging cost?',
      answer: "Consultation only: $150-$500. Full staging with rental furniture: $1,500-$5,000 per month. We offer flexible options depending on your budget and timeline, from simple rearrangement to full furniture rental.",
    },
  ],
  bottomCta: {
    headline: 'Ready for Staging?',
    subheadline: "Let's make your home irresistible to buyers.",
    primaryCta: {
      text: 'Get Your Free Estimate',
      href: '/get-quote?service=staging',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/staging.ts
git commit -m "feat: add staging service page copy"
```

---

## Task 11: For Agents Page Copy

**Files:**
- Create: `src/content/copy/for-agents.ts`

**Step 1: Write for-agents copy file**

```typescript
// src/content/copy/for-agents.ts

import type { PageCopy } from './types';

export const forAgentsCopy: PageCopy = {
  slug: '/for-agents',
  meta: {
    title: 'Pre-Listing Contractor for Real Estate Agents | Santa Clarita',
    description: 'Trusted listing prep partner for Santa Clarita realtors. Fast turnaround, single point of contact. Make your listings shine.',
  },
  hero: {
    badge: 'For Real Estate Professionals',
    // Industry research: agents need reliability
    headline: 'Your Listings Deserve Better Than "I Know a Guy"',
    // Sugarman: dirty laundry (acknowledge pain), then solve
    subheadline: "You've been burned by contractors who don't answer, don't finish, and don't understand real estate timelines. We built our business around being the opposite: one call, clear communication, and listings that shine.",
    primaryCta: {
      text: 'Partner With Us',
      href: '/get-quote?source=agent',
    },
    secondaryCta: {
      text: 'Call Bryan Direct: (661) 382-7784',
      href: 'tel:+16613827784',
    },
  },
  sections: [
    {
      id: 'pain-points',
      headline: 'We Solve Agent Headaches',
      items: [
        {
          problem: 'Listings sitting too long',
          solution: 'Strategic prep that attracts offers faster',
        },
        {
          problem: 'Coordinating multiple vendors',
          solution: 'One point of contact handles everything',
        },
        {
          problem: 'Clients overwhelmed by prep work',
          solution: 'We guide them through the process',
        },
        {
          problem: 'Contractors who ghost',
          solution: 'We actually answer the phone',
        },
      ],
    },
    {
      id: 'benefits',
      headline: 'Why Agents Choose Us',
      items: [
        {
          title: 'Single Point of Contact',
          description: "Call Bryan. That's it. No runaround, no phone tag.",
        },
        {
          title: 'Fast Turnaround',
          description: 'Most projects start within 3 days. We work around your listing timeline.',
        },
        {
          title: 'Quality You Can Stake Your Name On',
          description: "Your reputation is on the line. We treat every home like it's our own listing.",
        },
        {
          title: 'We Make You Look Good',
          description: 'Happy sellers refer more listings. We help you deliver the experience that builds your business.',
        },
      ],
    },
    {
      id: 'process',
      headline: 'How It Works for Agents',
      items: [
        { step: '1', title: 'You Refer', description: 'Send us your client or introduce us at the listing appointment.' },
        { step: '2', title: 'We Consult', description: 'Free walkthrough and estimate. We explain everything clearly.' },
        { step: '3', title: 'We Execute', description: 'Our crews handle the work. You get updates, not surprises.' },
        { step: '4', title: 'Listing Shines', description: 'Photo-ready home, happy client, and a faster sale.' },
      ],
    },
    {
      id: 'services-overview',
      headline: 'Everything Your Clients Need',
      subheadline: 'From quick fixes to full transformations—one call handles it all.',
    },
  ],
  bottomCta: {
    headline: "Let's Work Together",
    subheadline: 'One conversation to see if we\'re the right fit for your listings.',
    primaryCta: {
      text: 'Partner With Us',
      href: '/get-quote?source=agent',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/for-agents.ts
git commit -m "feat: add for-agents page copy"
```

---

## Task 12: Gallery Page Copy

**Files:**
- Create: `src/content/copy/gallery.ts`

**Step 1: Write gallery copy file**

```typescript
// src/content/copy/gallery.ts

import type { PageCopy } from './types';

export const galleryCopy: PageCopy = {
  slug: '/gallery',
  meta: {
    title: 'Before & After Gallery | Home Improvement Projects Santa Clarita',
    description: 'See our work. Before and after photos of pre-listing improvements in Valencia, Stevenson Ranch, Newhall & Santa Clarita.',
  },
  hero: {
    headline: 'See the Transformations',
    subheadline: 'Real projects from Santa Clarita Valley homes. Swipe to compare before and after.',
  },
  sections: [],
  bottomCta: {
    headline: 'Want Results Like These?',
    subheadline: 'Your home could be next. Free estimate, no obligation.',
    primaryCta: {
      text: 'Get Your Free Quote',
      href: '/get-quote',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/gallery.ts
git commit -m "feat: add gallery page copy"
```

---

## Task 13: Reviews Page Copy

**Files:**
- Create: `src/content/copy/reviews.ts`

**Step 1: Write reviews copy file**

```typescript
// src/content/copy/reviews.ts

import type { PageCopy } from './types';

export const reviewsCopy: PageCopy = {
  slug: '/reviews',
  meta: {
    title: 'Customer Reviews | 5-Star Listing Prep Santa Clarita',
    description: 'Read what Santa Clarita homeowners and agents say. 5-star reviews for pre-listing home improvements. See why we\'re #1.',
  },
  hero: {
    headline: 'What Our Clients Say',
    // Schwartz: bring in an audience
    subheadline: "Don't take our word for it. Hear from homeowners and agents who trusted us with their homes.",
  },
  sections: [
    {
      id: 'aggregate',
      // Will be populated dynamically
      headline: '5.0 Average Rating',
    },
  ],
  bottomCta: {
    headline: 'Ready to Become Our Next 5-Star Review?',
    subheadline: "Let's get started on your home.",
    primaryCta: {
      text: 'Get Your Free Quote',
      href: '/get-quote',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/reviews.ts
git commit -m "feat: add reviews page copy"
```

---

## Task 14: Get Quote Page Copy

**Files:**
- Create: `src/content/copy/get-quote.ts`

**Step 1: Write get-quote copy file**

```typescript
// src/content/copy/get-quote.ts

import type { PageCopy } from './types';

export const getQuoteCopy: PageCopy = {
  slug: '/get-quote',
  meta: {
    title: 'Get a Free Quote | Pre-Listing Home Improvement Santa Clarita',
    description: 'Request a free estimate for your pre-sale home improvement project. Response within 1-24 hours. Santa Clarita Valley.',
  },
  hero: {
    headline: 'Get Your Free Quote',
    // Sugarman: remove friction, show how easy
    subheadline: "Tell us about your project. We'll respond within 1-24 hours with next steps—no obligation, no pressure.",
  },
  sections: [
    {
      id: 'trust-sidebar',
      headline: 'Why Homeowners Choose Us',
      items: [
        'Response within 1-24 hours',
        'Licensed & insured',
        'Family-owned since 2021',
        'Clear, itemized quotes',
        'No hidden fees',
      ],
    },
    {
      id: 'what-happens-next',
      headline: 'What Happens Next',
      items: [
        { step: '1', title: 'We Review', description: "We'll look at your submission and prepare questions." },
        { step: '2', title: 'We Call', description: "Quick call to understand your timeline and goals." },
        { step: '3', title: 'Free Walkthrough', description: "Schedule an in-person assessment at your convenience." },
      ],
    },
  ],
  bottomCta: {
    headline: 'Prefer to Call?',
    subheadline: 'Reach Bryan directly at (661) 382-7784',
    primaryCta: {
      text: 'Call Now',
      href: 'tel:+16613827784',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/get-quote.ts
git commit -m "feat: add get-quote page copy"
```

---

## Task 15: Contact Page Copy

**Files:**
- Create: `src/content/copy/contact.ts`

**Step 1: Write contact copy file**

```typescript
// src/content/copy/contact.ts

import type { PageCopy } from './types';

export const contactCopy: PageCopy = {
  slug: '/contact',
  meta: {
    title: 'Contact Us | Prep It List It Sell It Santa Clarita',
    description: 'Call (661) 360-9252 or email us. Family-owned pre-listing home improvement in Santa Clarita, Valencia, Stevenson Ranch.',
  },
  hero: {
    headline: 'Get In Touch',
    subheadline: 'We respond within 1-24 hours. Call, email, or fill out the form—whichever works for you.',
  },
  sections: [
    {
      id: 'contact-methods',
      items: [
        {
          type: 'phone',
          title: 'Call Us',
          value: '(661) 360-9252',
          subvalue: 'Direct: (661) 382-7784',
          href: 'tel:+16613609252',
        },
        {
          type: 'email',
          title: 'Email Us',
          value: 'webster_consulting@outlook.com',
          href: 'mailto:webster_consulting@outlook.com',
        },
        {
          type: 'address',
          title: 'Visit Us',
          value: '25101 The Old Road, Suite 123',
          subvalue: 'Stevenson Ranch, CA 91381',
          href: 'https://www.google.com/maps/place/25101+The+Old+Road,+Stevenson+Ranch,+CA+91381',
        },
      ],
    },
    {
      id: 'service-areas',
      headline: 'Service Areas',
      subheadline: 'Proudly serving Santa Clarita Valley: Valencia, Stevenson Ranch, Newhall, Canyon Country, Saugus, and Castaic.',
    },
  ],
  bottomCta: {
    headline: 'Ready to Get Started?',
    subheadline: 'Request a free quote for your pre-listing project.',
    primaryCta: {
      text: 'Get Your Free Quote',
      href: '/get-quote',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/contact.ts
git commit -m "feat: add contact page copy"
```

---

## Task 16: Service Areas Page Copy

**Files:**
- Create: `src/content/copy/service-areas.ts`

**Step 1: Write service-areas copy file**

```typescript
// src/content/copy/service-areas.ts

import type { PageCopy } from './types';

export const serviceAreasCopy: PageCopy = {
  slug: '/service-areas',
  meta: {
    title: 'Serving Valencia, Stevenson Ranch, Newhall & Santa Clarita Valley',
    description: 'Pre-listing home improvement in Santa Clarita, Valencia, Stevenson Ranch, Newhall, Canyon Country, Saugus & Castaic.',
  },
  hero: {
    headline: 'Proudly Serving Santa Clarita Valley',
    // Settle: personality, anti-corporate positioning
    subheadline: "We're not a national franchise—we're your neighbors. Family-owned and based right here in Stevenson Ranch, we know this valley and the homes in it.",
  },
  sections: [
    {
      id: 'cities',
      headline: 'Communities We Serve',
      items: [
        { name: 'Santa Clarita', type: 'primary', description: 'Our home base and largest service area.' },
        { name: 'Valencia', type: 'primary', description: 'Master-planned communities and established neighborhoods.' },
        { name: 'Stevenson Ranch', type: 'primary', description: "Where we're headquartered." },
        { name: 'Newhall', type: 'primary', description: 'Historic homes with character.' },
        { name: 'Canyon Country', type: 'primary', description: 'Growing community, growing demand.' },
        { name: 'Saugus', type: 'primary', description: 'Established neighborhoods ready for updates.' },
        { name: 'Castaic', type: 'secondary', description: 'Northern reach of our service area.' },
      ],
    },
    {
      id: 'local-commitment',
      headline: 'Local Knowledge Matters',
      // Furey: story grounding, Settle: personality
      body: "We know which Valencia neighborhoods are hot right now. We know what Canyon Country buyers expect. We understand the Santa Clarita market because we live it every day. When you work with us, you get a contractor who knows your neighborhood—not a call center in another state.",
    },
  ],
  bottomCta: {
    headline: 'In Our Service Area?',
    subheadline: "Let's talk about getting your home ready to sell.",
    primaryCta: {
      text: 'Get Your Free Quote',
      href: '/get-quote',
    },
  },
};
```

**Step 2: Commit**

```bash
git add src/content/copy/service-areas.ts
git commit -m "feat: add service-areas page copy"
```

---

## Task 17: Final Verification

**Step 1: Run full typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 2: Run lint**

Run: `npm run lint`
Expected: PASS (or only style warnings)

**Step 3: Run build**

Run: `npm run build`
Expected: PASS

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete content + conversion pass for all 15 pages

- Add copy content structure with types
- Apply copywriting research to all pages:
  - Homepage
  - 8 service pages (kitchen-bath, painting, flooring, handyman, curb-appeal, cleaning, decluttering, staging)
  - For Agents
  - Gallery
  - Reviews
  - Get Quote
  - Contact
  - Service Areas

Research applied from:
- Gary Halbert: fascinations, A-pile, starving crowd
- Eugene Schwartz: awareness levels, intensification
- Joseph Sugarman: slippery slide, dirty laundry
- Matt Furey: story grounding, personality
- Ben Settle: infotainment, anti-corporate voice

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Summary

This plan creates 17 tasks to implement the content + conversion pass:

| Task | Files | Description |
|------|-------|-------------|
| 1 | types.ts, index.ts | Copy content structure |
| 2 | homepage.ts | Homepage copy |
| 3 | kitchen-bath.ts | Kitchen & Bath service copy |
| 4 | painting.ts | Painting service copy |
| 5 | flooring.ts | Flooring service copy |
| 6 | handyman.ts | Handyman service copy |
| 7 | curb-appeal.ts | Curb Appeal service copy |
| 8 | cleaning.ts | Cleaning service copy |
| 9 | decluttering.ts | Decluttering service copy |
| 10 | staging.ts | Staging service copy |
| 11 | for-agents.ts | For Agents page copy |
| 12 | gallery.ts | Gallery page copy |
| 13 | reviews.ts | Reviews page copy |
| 14 | get-quote.ts | Get Quote page copy |
| 15 | contact.ts | Contact page copy |
| 16 | service-areas.ts | Service Areas page copy |
| 17 | — | Final verification |

**Total: 17 tasks, ~16 new files**

---

## Next Steps After This Plan

Once all copy files exist:
1. Update page components to import and use copy from `src/content/copy/`
2. Add FAQ components with schema markup to service pages
3. Update meta tags in page layouts to use copy meta
4. Test all pages for SEO compliance

---

*Plan created: 2025-12-26*
*Research sources: 7 documents in docs/research/*
