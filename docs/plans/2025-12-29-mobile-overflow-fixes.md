# Mobile Overflow & Navigation Fixes

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix horizontal overflow causing content to flow off the right side on mobile, and ensure navigation is visible and usable.

**Architecture:** Add overflow containment at multiple levels (html, body, page wrappers, sections), make decorative elements responsive, and fix header visibility on mobile.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript

---

## Task 1: Add Global Overflow Containment

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Update html and body overflow rules**

Find:
```css
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Replace with:
```css
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  max-width: 100vw;
}
```

**Step 2: Verify body already has overflow-x-hidden**

Confirm body has:
```css
body {
  @apply bg-navy font-body text-white overflow-x-hidden relative;
  text-rendering: optimizeLegibility;
}
```

**Step 3: Add wrapper utility class**

Add after the body rule:
```css
/* Overflow containment for page wrappers */
.overflow-safe {
  overflow-x: hidden;
  max-width: 100vw;
}
```

---

## Task 2: Fix Home Page Wrapper and Decorative Elements

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add overflow-safe to main wrapper**

Find (line ~10):
```tsx
return (
    <div className="relative">
```

Replace with:
```tsx
return (
    <div className="relative overflow-x-hidden">
```

**Step 2: Make gold glow elements responsive (hero section)**

Find (lines ~21-23):
```tsx
{/* Gold accent glow */}
<div className="absolute top-1/4 right-0 z-[2] w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
<div className="absolute bottom-1/4 left-0 z-[2] w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
```

Replace with:
```tsx
{/* Gold accent glow - hidden on mobile to prevent overflow */}
<div className="absolute top-1/4 right-0 z-[2] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl" />
<div className="absolute bottom-1/4 left-0 z-[2] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gold/5 rounded-full blur-3xl" />
```

**Step 3: Test in DevTools at 375px width**

Run: Open `http://localhost:3000` in browser, DevTools > Toggle device toolbar > iPhone SE (375px)
Expected: No horizontal scroll, content stays within viewport

---

## Task 3: Fix Service Areas Page Overflow

**Files:**
- Modify: `src/app/service-areas/page.tsx`

**Step 1: Add overflow containment to main wrapper**

Find:
```tsx
return (
    <main className="min-h-screen">
```

Replace with:
```tsx
return (
    <main className="min-h-screen overflow-x-hidden">
```

**Step 2: Make gold glow elements responsive**

Find:
```tsx
{/* Gold accent glow */}
<div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
<div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
```

Replace with:
```tsx
{/* Gold accent glow - responsive sizes */}
<div className="absolute top-1/4 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl" />
<div className="absolute bottom-1/4 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gold/5 rounded-full blur-3xl" />
```

---

## Task 4: Fix Services Page Overflow

**Files:**
- Modify: `src/app/services/page.tsx`

**Step 1: Add overflow containment to main wrapper**

Find:
```tsx
return (
    <div className="relative">
```

Replace with:
```tsx
return (
    <div className="relative overflow-x-hidden">
```

**Step 2: Make gold glow elements responsive**

Find (in hero section):
```tsx
{/* Gold accent glow */}
<div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
<div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
```

Replace with:
```tsx
{/* Gold accent glow - responsive sizes */}
<div className="absolute top-1/4 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl" />
<div className="absolute bottom-1/4 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gold/5 rounded-full blur-3xl" />
```

---

## Task 5: Fix Contact Page Overflow

**Files:**
- Modify: `src/app/contact/page.tsx`

**Step 1: Read current contact page structure**

Run: Read file to find wrapper element

**Step 2: Add overflow containment**

Add `overflow-x-hidden` to the main wrapper element.

**Step 3: Make any gold glow elements responsive (if present)**

Apply same responsive pattern as other pages.

---

## Task 6: Fix Header Mobile Visibility

**Files:**
- Modify: `src/components/layout/Header.tsx`

**Step 1: Check current header structure**

Current header uses `container-section` which has `px-4` padding. The inner content box uses `px-6`.

**Step 2: Make header more compact on mobile**

Find:
```tsx
<div className="backdrop-blur-safe bg-navy/90 border border-gold/20 rounded-xl px-6 py-3 flex items-center justify-between shadow-elevated">
```

Replace with:
```tsx
<div className="backdrop-blur-safe bg-navy/90 border border-gold/20 rounded-xl px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between shadow-elevated">
```

**Step 3: Make logo smaller on mobile**

Find:
```tsx
<Image
  src="/logo/2.png"
  alt="Prep It List It Sell It"
  width={180}
  height={52}
  className="h-10 sm:h-12 w-auto"
  priority
/>
```

Replace with:
```tsx
<Image
  src="/logo/2.png"
  alt="Prep It List It Sell It"
  width={180}
  height={52}
  className="h-8 sm:h-10 md:h-12 w-auto"
  priority
/>
```

**Step 4: Make header container padding smaller on mobile**

Find:
```tsx
<div className="container-section py-4">
```

Replace with:
```tsx
<div className="container-section py-2 sm:py-4">
```

---

## Task 7: Ensure Mobile Menu is Properly Visible

**Files:**
- Modify: `src/components/layout/MobileMenu.tsx`

**Step 1: Check mobile menu panel structure**

Current uses `max-w-sm` which is 384px - should be fine for mobile.

**Step 2: Make mobile menu full width on very small screens**

Find:
```tsx
<div
  ref={menuRef}
  className="absolute inset-y-0 right-0 w-full max-w-sm bg-navy border-l border-gold/20 shadow-2xl animate-slide-in-right"
>
```

Replace with:
```tsx
<div
  ref={menuRef}
  className="absolute inset-y-0 right-0 w-full max-w-[85vw] sm:max-w-sm bg-navy border-l border-gold/20 shadow-2xl animate-slide-in-right"
>
```

**Step 3: Make hamburger button more visible**

Find in Header.tsx:
```tsx
<button
  type="button"
  className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
  onClick={() => setMobileMenuOpen(true)}
  aria-label="Open menu"
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-menu-panel"
>
  <span className="material-symbols-outlined text-2xl">menu</span>
</button>
```

Replace with:
```tsx
<button
  type="button"
  className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-white bg-gold/10 rounded-lg hover:bg-gold/20 transition-colors"
  onClick={() => setMobileMenuOpen(true)}
  aria-label="Open menu"
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-menu-panel"
>
  <span className="material-symbols-outlined text-2xl">menu</span>
</button>
```

---

## Task 8: Fix Root Layout Main Content Padding

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Check main element padding**

Find:
```tsx
<main id="main" className="flex-1 pb-20 md:pb-0 relative z-0">
```

This has `pb-20` (80px) for the sticky mobile CTA. Verify this is enough.

**Step 2: Add overflow containment to main**

Replace with:
```tsx
<main id="main" className="flex-1 pb-24 md:pb-0 relative z-0 overflow-x-hidden">
```

---

## Task 9: TypeScript Check & Visual Verification

**Step 1: Run TypeScript check**

Run: `npm run typecheck`
Expected: No errors

**Step 2: Mobile verification checklist (DevTools at 375px)**

- [ ] Home page: No horizontal scroll
- [ ] Service Areas page: No horizontal scroll
- [ ] Services page: No horizontal scroll
- [ ] Contact page: No horizontal scroll
- [ ] Header: Logo visible, hamburger button visible with gold background
- [ ] Mobile menu: Opens properly, fills most of screen width
- [ ] Text: All readable, not cut off
- [ ] Gold glow: Smaller on mobile, no overflow

**Step 3: Commit all changes**

```bash
git add -A
git commit -m "fix: resolve mobile horizontal overflow and improve navigation visibility

- Add overflow-x-hidden to html, page wrappers, and main content
- Make gold glow decorative elements responsive (smaller on mobile)
- Reduce header padding on mobile for more content space
- Make logo smaller on mobile devices
- Add visible background to hamburger menu button
- Increase bottom padding for sticky mobile CTA
- Ensure mobile menu uses appropriate width"
```

---

## Execution Checklist

- [ ] Task 1: Global overflow containment (globals.css)
- [ ] Task 2: Home page wrapper and glow fixes
- [ ] Task 3: Service Areas page overflow
- [ ] Task 4: Services page overflow
- [ ] Task 5: Contact page overflow
- [ ] Task 6: Header mobile visibility
- [ ] Task 7: Mobile menu visibility
- [ ] Task 8: Root layout main padding
- [ ] Task 9: TypeScript check & verification
