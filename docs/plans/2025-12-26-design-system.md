# Prep It List It Sell It — Design System

**Date:** 2025-12-26
**Status:** Locked

---

## Overview

A distinctive, premium design system that avoids generic template aesthetics. Key differentiators:

- **Full serif typography** — Editorial/luxury feel
- **Golden ratio spacing** — Organic, intentional rhythm
- **Fill reveal buttons** — Memorable interactions
- **Glow emergence cards** — Signature gold aura effect
- **Sharp/soft contrast** — Hierarchy through geometry

---

## 1. Typography

### Font Stack

| Role | Font | Weights | Use |
|------|------|---------|-----|
| Display | Playfair Display | 500, 600, 700, 800 | H1, H2, hero text |
| Body | Source Serif 4 | 400, 600 | Paragraphs, UI text |
| Accent | Source Serif 4 Italic | 400 | Quotes, emphasis |

### Type Scale (Golden Ratio)

| Token | Size | Line Height | Use |
|-------|------|-------------|-----|
| `text-hero` | 72px | 1.1 | Homepage H1 |
| `text-display` | 55px | 1.15 | Section H2 |
| `text-title` | 34px | 1.2 | Card titles, H3 |
| `text-lead` | 21px | 1.5 | Lead paragraphs |
| `text-body` | 17px | 1.6 | Body copy |
| `text-small` | 14px | 1.5 | Captions, meta |
| `text-micro` | 12px | 1.4 | Badges, labels |

### Mobile Type Scale

| Token | Desktop | Mobile |
|-------|---------|--------|
| `text-hero` | 72px | 40px |
| `text-display` | 55px | 34px |
| `text-title` | 34px | 24px |
| `text-lead` | 21px | 18px |

---

## 2. Color Palette

### Primary Colors

| Token | Hex | RGB | Use |
|-------|-----|-----|-----|
| `navy` | #1B2838 | 27, 40, 56 | Primary background |
| `navy-dark` | #0F1923 | 15, 25, 35 | Deeper sections, footer |
| `navy-light` | #243447 | 36, 52, 71 | Cards, surfaces |
| `gold` | #D4A74A | 212, 167, 74 | Accent, CTAs, brand |
| `gold-light` | #E4C167 | 228, 193, 103 | Hover states |
| `gold-dark` | #B8893A | 184, 137, 58 | Pressed states, shadows |

### Semantic Colors

| Token | Value | Use |
|-------|-------|-----|
| `bg-primary` | navy | Default background |
| `bg-secondary` | navy-dark | Alternate sections |
| `bg-surface` | navy-light | Cards on dark |
| `bg-light` | #F8F9FA | Light sections |
| `text-primary` | #FFFFFF | Main text on dark |
| `text-secondary` | rgba(255,255,255,0.7) | Secondary text |
| `text-inverse` | navy | Text on light/gold |

### Color Usage Rules

- Gold is for **accents only** — never large background areas except value bars
- Alternate dark/light sections to create rhythm
- Gold text only on dark backgrounds (contrast)
- White text minimum opacity: 60% on navy

---

## 3. Spacing System (Golden Ratio)

### Base Unit: 8px | Ratio: 1.618 (φ)

| Token | Value | Use |
|-------|-------|-----|
| `space-xs` | 8px | Inline gaps, icon padding |
| `space-sm` | 13px | Between related elements |
| `space-md` | 21px | Card padding, form gaps |
| `space-lg` | 34px | Between content blocks |
| `space-xl` | 55px | Section inner padding |
| `space-2xl` | 89px | Section vertical padding |
| `space-3xl` | 144px | Hero breathing room |

### Section Rhythm

| Section Type | Top | Bottom |
|--------------|-----|--------|
| Hero | 144px | 89px |
| Standard | 89px | 89px |
| Compact | 55px | 55px |
| Value bar | 21px | 21px |

### Content Density

| Context | Horizontal | Vertical |
|---------|-----------|----------|
| Card internal | 34px | 34px |
| Grid gap (mobile) | 21px | 21px |
| Grid gap (desktop) | 34px | 34px |
| Form field spacing | — | 21px |
| Button padding | 34px | 13px |
| Badge padding | 13px | 8px |

### Container Widths

| Token | Width | Use |
|-------|-------|-----|
| `container-sm` | 680px | Text-heavy, articles |
| `container-md` | 960px | Forms, focused content |
| `container-lg` | 1200px | Standard sections |
| `container-xl` | 1400px | Full-width features |

---

## 4. Buttons

### Variants

| Variant | Background | Text | Border | Use |
|---------|-----------|------|--------|-----|
| `btn-primary` | Gold | Navy | None | Main CTAs |
| `btn-secondary` | Transparent | White | Gold 2px | Secondary actions |
| `btn-ghost` | Transparent | Gold | None | Text links |

### Sizes

| Size | Padding | Font | Min Height | Radius |
|------|---------|------|------------|--------|
| `btn-sm` | 8px 21px | 14px | 34px | 4px |
| `btn-md` | 13px 34px | 17px | 44px | 4px |
| `btn-lg` | 13px 55px | 21px | 55px | 4px |

### Fill Reveal Hover Effect

```css
.btn-primary {
  position: relative;
  background: #D4A74A;
  color: #1B2838;
  overflow: hidden;
  z-index: 1;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #E4C167;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  z-index: -1;
}

.btn-primary:hover::before {
  transform: translateX(0);
}
```

### Underline Slide (Text Links)

```css
.link-underline {
  position: relative;
  color: #D4A74A;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #D4A74A;
  transition: width 0.3s ease-out;
}

.link-underline:hover::after {
  width: 100%;
}
```

---

## 5. Shape Language

### Border Radius

| Element | Radius | Rationale |
|---------|--------|-----------|
| Buttons | 4px | Sharp — action-oriented |
| Badges | 4px | Matches buttons |
| Inputs | 8px | Between sharp/soft |
| Images | 16px | Medium soft |
| Cards | 24px | Soft — inviting |
| Modals | 24px | Matches cards |

### Philosophy

- **Sharp (4px)** = Action elements (buttons, badges, CTAs)
- **Soft (24px)** = Content containers (cards, modals)
- Creates visual hierarchy: CTAs demand action, cards invite exploration

---

## 6. Cards & Components

### Card Variants

| Variant | Background | Border | Use |
|---------|-----------|--------|-----|
| `card-dark` | navy-light | 1px gold/20% | On dark backgrounds |
| `card-light` | white | none | On light backgrounds |
| `card-elevated` | navy-light | 1px gold/30% | Featured content |

### Glow Emergence Hover

```css
.card {
  position: relative;
  background: #243447;
  border-radius: 24px;
  padding: 34px;
  transition: transform 0.3s ease;
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
}

.card:hover::before {
  opacity: 1;
}
```

### Service Card Specs

| Property | Value |
|----------|-------|
| Padding | 34px |
| Border radius | 24px |
| Icon container | 55px × 55px |
| Icon bg | gold/10% |
| Title | 21px Playfair, navy |
| Description | 14px Source Serif, navy/70% |

### Testimonial Card Specs

| Property | Value |
|----------|-------|
| Padding | 34px |
| Border radius | 24px |
| Quote | 17px Source Serif italic |
| Author | 14px Source Serif bold |
| Stars | 21px, gold filled |

### Badge Specs

| Property | Value |
|----------|-------|
| Padding | 8px 13px |
| Border radius | 4px |
| Font | 12px Source Serif |
| Style | Uppercase, tracking wide |
| Background | gold/10% |
| Border | 1px gold/30% |

### Icon Containers

| Size | Dimensions | Radius |
|------|-----------|--------|
| `icon-sm` | 34px × 34px | 8px |
| `icon-md` | 55px × 55px | 13px |
| `icon-lg` | 89px × 89px | 21px |

---

## 7. Section Transitions

### Gold Line Divider

```css
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
    #D4A74A
  );
}

.section-divider::after {
  --direction: left;
}

.section-divider .mark {
  width: 13px;
  height: 13px;
  background: #D4A74A;
  transform: rotate(45deg);
}
```

### Section Backgrounds

| Type | Background | Pattern Overlay |
|------|-----------|-----------------|
| Hero | Navy gradient | Yes |
| Light | #F8F9FA | No |
| Dark | Navy | Optional |
| Accent | Gold | No |
| CTA | Navy-dark | Yes |

---

## 8. Grid System

### Breakpoints

| Name | Width | Columns | Gutter |
|------|-------|---------|--------|
| Mobile | <640px | 1 | 21px |
| Tablet | 640-1024px | 2 | 21px |
| Desktop | 1024-1280px | 3-4 | 34px |
| Wide | >1280px | 4 | 34px |

### Common Layouts

| Layout | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| Services grid | 1 col | 2 col | 4 col |
| Testimonials | 1 col | 2 col | 3 col |
| Process steps | 2 col | 2 col | 4 col |
| Two-column | Stack | Stack | 2 col |

---

## 9. Motion & Animation

### Timing

| Token | Duration | Use |
|-------|----------|-----|
| `duration-fast` | 150ms | Micro-interactions |
| `duration-base` | 300ms | Standard transitions |
| `duration-slow` | 500ms | Reveals, emphasis |
| `duration-slower` | 800ms | Page transitions |

### Easing

| Token | Curve | Use |
|-------|-------|-----|
| `ease-out` | cubic-bezier(0.0, 0, 0.2, 1) | Exits, reveals |
| `ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | State changes |
| `ease-bounce` | cubic-bezier(0.34, 1.56, 0.64, 1) | Playful emphasis |

### Signature Animations

| Name | Effect | Trigger |
|------|--------|---------|
| `fill-reveal` | Background sweeps L→R | Button hover |
| `glow-emerge` | Gold aura fades in | Card hover |
| `underline-slide` | Gold line grows L→R | Link hover |
| `fade-up` | Opacity + translateY | Scroll reveal |
| `gold-pulse` | Shadow pulse | Attention CTA |

### Staggered Reveal

```css
.reveal-group > * {
  opacity: 0;
  transform: translateY(21px);
}

.reveal-group.visible > *:nth-child(1) { animation: fadeUp 0.5s 0.0s forwards; }
.reveal-group.visible > *:nth-child(2) { animation: fadeUp 0.5s 0.1s forwards; }
.reveal-group.visible > *:nth-child(3) { animation: fadeUp 0.5s 0.2s forwards; }
.reveal-group.visible > *:nth-child(4) { animation: fadeUp 0.5s 0.3s forwards; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Z-Index Scale

| Layer | Value | Use |
|-------|-------|-----|
| `z-base` | 0 | Default content |
| `z-card` | 10 | Elevated cards |
| `z-sticky` | 40 | Sticky elements |
| `z-header` | 50 | Fixed header |
| `z-modal` | 60 | Modals, overlays |
| `z-toast` | 70 | Notifications |

---

## 11. Shadows

| Token | Value | Use |
|-------|-------|-----|
| `shadow-subtle` | 0 2px 10px rgba(27,40,56,0.08) | Slight lift |
| `shadow-card` | 0 4px 20px rgba(27,40,56,0.12) | Cards |
| `shadow-elevated` | 0 8px 40px rgba(27,40,56,0.16) | Hover states |
| `shadow-gold` | 0 4px 20px rgba(212,167,74,0.25) | Gold elements |
| `shadow-gold-glow` | 0 0 40px rgba(212,167,74,0.3) | Glow emergence |

---

## 12. Forms

### Input Specs

| Property | Value |
|----------|-------|
| Height | 55px |
| Padding | 13px 21px |
| Border radius | 8px |
| Background | white/5% |
| Border | 1px white/10% |
| Focus border | gold |
| Focus ring | 1px gold |

### Label Specs

| Property | Value |
|----------|-------|
| Font | 14px Source Serif |
| Color | white/80% |
| Margin bottom | 8px |

---

## Implementation Checklist

- [ ] Update `next/font` to load Source Serif 4
- [ ] Update Tailwind config with golden ratio spacing
- [ ] Create button component variants with fill reveal
- [ ] Create card component with glow emergence
- [ ] Add section divider component
- [ ] Update globals.css with new tokens
- [ ] Test all interactions on mobile

---

*Design system locked: 2025-12-26*
