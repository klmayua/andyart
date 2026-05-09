# COMPONENT AUDIT — AndyArt Cultural House

**Audit Date:** 2026-05-09  
**Project:** AndyArt Next.js 14 + Tailwind CSS

---

## 1. Reusable Components (9 total)

| # | Component | File | Purpose | Status | Issues |
|---|-----------|------|---------|--------|--------|
| 1 | **Ticker** | `src/components/Ticker.tsx` | Top announcement marquee | ✅ Functional | None |
| 2 | **Header** | `src/components/Header.tsx` | Fixed top nav with glassmorphism + mobile menu | ✅ Functional | None |
| 3 | **BottomNav** | `src/components/BottomNav.tsx` | Mobile bottom tab bar (5 items) | ⚠️ Functional | Invalid HTML nesting: `<button>` wraps `<Link>`, creating nested interactive elements |
| 4 | **FloatingFooter** | `src/components/FloatingFooter.tsx` | Quick-links floating menu (bottom-right) | ✅ Functional | None |
| 5 | **Chatbot** | `src/components/Chatbot.tsx` | Circle concierge chat widget | ✅ Functional | None |
| 6 | **WhatsAppButton** | `src/components/WhatsAppButton.tsx` | Fixed WhatsApp FAB | ✅ Functional | Requires env var; shows alert fallback |
| 7 | **EventCard** | `src/components/EventCard.tsx` | Event card with image, date, price, RSVP | ✅ Functional | None |
| 8 | **ServiceCard** | `src/components/ServiceCard.tsx` | Service card with icon, price, booking link | ✅ Functional | None |
| 9 | **ArtworkCard** | `src/components/ArtworkCard.tsx` | Artwork card with image, wishlist, artist link | ✅ Functional | Defined but unused in gallery page (gallery uses inline cards) |

---

## 2. Broken Components

| # | Component | File | Issue | Severity |
|---|-----------|------|-------|----------|
| 1 | **ServiceDetailPage** | `src/app/services/[slug]/page.tsx` | Uses undefined Tailwind classes: `text-text-primary`, `bg-surface`, `shadow-large` | **HIGH** |
| 2 | **EventDetailPage** | `src/app/events/[slug]/page.tsx` | Uses undefined Tailwind classes: `text-text-primary`, `bg-surface`, `shadow-large` | **HIGH** |
| 3 | **BottomNav** | `src/components/BottomNav.tsx` | `<button>` element wraps `<Link>` element, violating HTML spec for nested interactive elements | **MEDIUM** |

---

## 3. Missing Components

| # | Component | Needed By | Priority |
|---|-----------|-----------|----------|
| 1 | **LoadingSkeleton** | All pages | Medium |
| 2 | **ErrorBoundary** | All pages | Medium |
| 3 | **NotFoundPage** | All dynamic routes | Medium |
| 4 | **Pagination** | `/gallery`, `/events`, `/journal` | Medium |
| 5 | **Breadcrumb** | All detail pages | Low |
| 6 | **ImageGallery** | `/gallery/[slug]` | Medium |
| 7 | **VideoPlayer** | `/events/[slug]` | Low |
| 8 | **MapEmbed** | `/spaces`, `/contact` | Low |
| 9 | **SocialShare** | `/gallery/[slug]`, `/journal/[slug]` | Low |
| 10 | **Toast/Notification** | All forms | Medium |
| 11 | **Modal** | Reusable overlay | Medium |
| 12 | **Dropdown** | Filters, sorting | Low |
| 13 | **Accordion** | `/faq`, `/services` | Low |
| 14 | **Tabs** | `/profile` (exists inline) | Low |
| 15 | **Slider/Carousel** | Homepage, gallery | Low |

---

## 4. Duplicate Components / Patterns

| # | Pattern | Locations | Recommendation |
|---|---------|-----------|----------------|
| 1 | **Modal overlay pattern** | `GalleryDetail`, `ServiceDetail`, `EventDetail` | Extract reusable `Modal` component |
| 2 | **Form input styling** | `/consult`, `/events/host`, `/partners/apply` | Extract `FormInput`, `FormTextarea`, `FormSelect` |
| 3 | **CTA button styling** | Every page | Extract `Button` component with variants |
| 4 | **Section header pattern** | Every page | Extract `SectionHeader` component |
| 5 | **Card glassmorphism** | `EventCard`, `ServiceCard`, homepage cards | Extract `GlassCard` component |
| 6 | **Image with gradient overlay** | `EventCard`, `ServiceCard`, `/gallery` | Extract `GradientImage` component |

---

## 5. Component Usage Map

```
layout.tsx
├── Ticker (global)
├── Header (global)
├── BottomNav (global, mobile)
├── FloatingFooter (global)
├── WhatsAppButton (global)
└── Chatbot (global)

page.tsx (Home)
├── Header (imported via layout)
├── EventCard (not used on home)
├── ServiceCard (not used on home)
└── ArtworkCard (not used on home)

gallery/page.tsx
├── (inline artwork cards, not ArtworkCard component)

gallery/[slug]/page.tsx
├── (inline detail layout)

events/page.tsx
├── EventCard ✅

events/[slug]/page.tsx
├── (inline detail layout)

services/page.tsx
├── ServiceCard ✅

services/[slug]/page.tsx
├── (inline detail layout)

artists/page.tsx
├── (inline artist cards)

journal/page.tsx
├── (inline article cards)

circle/page.tsx
├── (inline tier cards)

spaces/page.tsx
├── (inline offering cards)

consult/page.tsx
├── (inline form)

profile/page.tsx
├── (inline tabs)
```

---

*End of COMPONENT_AUDIT.md*
