# ROUTE AUDIT — AndyArt Cultural House

**Audit Date:** 2026-05-09  
**Project:** AndyArt Next.js 14 + Prisma + Stripe + NextAuth  
**Method:** Deep file scan + href validation + API endpoint check + build log analysis

---

## 1. Full Route Map

### Static Pages (18 routes)

| # | Route | File | Status | Notes |
|---|-------|------|--------|-------|
| 1 | `/` | `src/app/page.tsx` | ✅ Working | Full homepage, 8 sections |
| 2 | `/gallery` | `src/app/gallery/page.tsx` | ✅ Working | Artwork grid, wishlist, visual filters |
| 3 | `/artists` | `src/app/artists/page.tsx` | ✅ Working | 3 hardcoded artists, links to missing detail pages |
| 4 | `/events` | `src/app/events/page.tsx` | ✅ Working | 6 hardcoded events, visual category filters |
| 5 | `/events/host` | `src/app/events/host/page.tsx` | ⚠️ Placeholder | Form UI complete, submission is no-op (no API call) |
| 6 | `/events/past` | `src/app/events/past/page.tsx` | ✅ Working | Past events archive |
| 7 | `/services` | `src/app/services/page.tsx` | ✅ Working | Services grid, dead Circle Chat link |
| 8 | `/spaces` | `src/app/spaces/page.tsx` | ✅ Working | B2B curation page |
| 9 | `/consult` | `src/app/consult/page.tsx` | ⚠️ Placeholder | Form UI complete, submission is no-op (no API call) |
| 10 | `/circle` | `src/app/circle/page.tsx` | ✅ Working | Membership tiers, CTAs link to `/profile` |
| 11 | `/partners` | `src/app/partners/page.tsx` | ✅ Working | Partnership overview |
| 12 | `/partners/apply` | `src/app/partners/apply/page.tsx` | ✅ Working | Live form, POSTs to `/api/partners/apply` |
| 13 | `/viewing-rooms` | `src/app/viewing-rooms/page.tsx` | ✅ Working | List page, links to missing detail pages |
| 14 | `/profile` | `src/app/profile/page.tsx` | ⚠️ Partial | Hardcoded mock user data, settings don't submit |
| 15 | `/journal` | `src/app/journal/page.tsx` | ⚠️ Partial | All article links point to `#` |
| 16 | `/auth/signin` | `src/app/auth/signin/page.tsx` | ⚠️ Partial | Credentials accept any email, Google OAuth configured |
| 17 | `/legal/terms` | `src/app/legal/terms/page.tsx` | ✅ Working | Static content |
| 18 | `/legal/privacy` | `src/app/legal/privacy/page.tsx` | ✅ Working | Static content |

### Dynamic Pages (3 routes)

| # | Route | File | Status | Notes |
|---|-------|------|--------|-------|
| 19 | `/gallery/[slug]` | `src/app/gallery/[slug]/page.tsx` | ⚠️ Partial | Same artwork regardless of slug. Inquiry modal has no submit handler |
| 20 | `/events/[slug]` | `src/app/events/[slug]/page.tsx` | ⚠️ Partial | Same event regardless of slug. RSVP modal submits to live API |
| 21 | `/services/[slug]` | `src/app/services/[slug]/page.tsx` | ⚠️ Partial | Same service regardless of slug. Booking modal submits to live API. Broken Tailwind classes (`text-text-primary`, `bg-surface`) |

### API Routes (7 endpoints)

| # | Route | Methods | Status | Notes |
|---|-------|---------|--------|-------|
| 22 | `/api/artworks` | GET | ✅ Working | Prisma-powered pagination + filtering |
| 23 | `/api/auth/[...nextauth]` | GET, POST | ✅ Working | NextAuth handler wrapper |
| 24 | `/api/chatbot` | POST | ✅ Working | Rule-based static responses |
| 25 | `/api/checkout/session` | POST | ✅ Working | Stripe Checkout session creation |
| 26 | `/api/events/rsvp` | POST | ✅ Working | Creates EventRsvp in Prisma |
| 27 | `/api/partners/apply` | POST | ✅ Working | Creates PartnerApplication in Prisma |
| 28 | `/api/services/book` | POST | ✅ Working | Creates ServiceBooking in Prisma |

---

## 2. Route Status Matrix

| Status | Count | Routes |
|--------|-------|--------|
| ✅ Working | 15 | `/`, `/gallery`, `/events`, `/events/past`, `/services`, `/spaces`, `/partners`, `/partners/apply`, `/viewing-rooms`, `/circle`, `/legal/terms`, `/legal/privacy`, `/artists`, 7 API routes |
| ⚠️ Partial | 6 | `/auth/signin`, `/profile`, `/journal`, `/gallery/[slug]`, `/events/[slug]`, `/services/[slug]` |
| ⚠️ Placeholder | 2 | `/events/host`, `/consult` |
| ❌ Missing | 9 | `/artists/[slug]`, `/journal/[slug]`, `/viewing-rooms/[slug]`, `/checkout`, `/cart`, `/profile/orders`, `/api/webhooks/stripe`, `not-found.tsx`, `error.tsx` |

---

## 3. Broken Link Table

| # | Link Text | Href | Source File | Issue | Severity |
|---|-----------|------|-------------|-------|----------|
| 1 | Journal articles (featured + grid) | `#` | `src/app/journal/page.tsx` | All 7 article links are dead anchors | **SEVERE** |
| 2 | Enter room | `/viewing-rooms/{slug}` | `src/app/viewing-rooms/page.tsx` | Dynamic route page missing | **SEVERE** |
| 3 | Artist cards (3 artists) | `/artists/{slug}` | `src/app/artists/page.tsx` | Dynamic route page missing | **SEVERE** |
| 4 | Artist link (artwork detail) | `/artists/{slug}` | `src/app/gallery/[slug]/page.tsx` | Dynamic route page missing | **HIGH** |
| 5 | Artist link (artwork card) | `/artists/{slug}` | `src/components/ArtworkCard.tsx` | Dynamic route page missing | **HIGH** |
| 6 | Artist link (profile page) | `/artists/{slug}` | `src/app/profile/page.tsx` | Dynamic route page missing | **HIGH** |
| 7 | Circle Chat | `#` | `src/app/services/page.tsx` | Dead anchor instead of chatbot action | **MEDIUM** |
| 8 | WhatsApp Concierge | `https://wa.me/1234567890` | `src/app/page.tsx` | Placeholder phone number | **MEDIUM** |
| 9 | WhatsApp | `https://wa.me/1234567890` | `src/app/page.tsx` (footer) | Placeholder phone number | **MEDIUM** |
| 10 | WhatsApp | `https://wa.me/2348002649278` | `src/app/services/page.tsx` | Unverified phone number | **MEDIUM** |
| 11 | WhatsApp | `https://wa.me/2348002649278` | `src/app/consult/page.tsx` | Unverified phone number | **MEDIUM** |
| 12 | WhatsApp Button | `#` (fallback) | `src/components/WhatsAppButton.tsx` | Shows alert if env var missing | **MEDIUM** |
| 13 | Profile/orders | `/profile/orders` | `src/app/api/checkout/session/route.ts` | Success redirect to non-existent page | **MEDIUM** |

---

## 4. Dead CTA Table

| # | CTA Label | Location | Expected Action | Actual Behavior | Severity |
|---|-----------|----------|-----------------|-----------------|----------|
| 1 | Submit (Host Event) | `/events/host` | POST to API | Sets `isSubmitted=true`, data discarded | **SEVERE** |
| 2 | Submit (Consultation) | `/consult` | POST to API | Sets `isSubmitted=true`, data discarded | **SEVERE** |
| 3 | Send Inquiry | `/gallery/[slug]` modal | POST to API | No `onSubmit` handler | **SEVERE** |
| 4 | Save Changes | `/profile` (Settings tab) | PATCH user data | Button does nothing | **MEDIUM** |
| 5 | Circle Chat | `/services` | Open chatbot | Links to `#` | **MEDIUM** |
| 6 | Request Similar | `/gallery` | Filter/search | Button only, no action | **LOW** |
| 7 | Filter buttons | `/gallery`, `/events`, `/journal` | Filter content | Visual-only, no logic | **LOW** |

---

*End of ROUTE_AUDIT.md*
