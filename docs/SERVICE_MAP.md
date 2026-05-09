# SERVICE MAP — AndyArt Cultural House

**Audit Date:** 2026-05-09  
**Project:** AndyArt Next.js 14 + Prisma + Stripe + NextAuth

---

## 1. Built Services (Live)

| # | Service | Integration Point | Status | Evidence |
|---|---------|-------------------|--------|----------|
| 1 | **Prisma ORM / PostgreSQL** | `src/lib/prisma.ts`, `prisma/schema.prisma` | ✅ Live | 10 models defined. Active in 4 API routes. Database connection functional |
| 2 | **Zustand State Store** | `src/stores/useAppStore.ts` | ✅ Live | Cart, wishlist, chatbot state with localStorage persistence |
| 3 | **Chatbot API** | `src/app/api/chatbot/route.ts` | ✅ Live | Rule-based responses with session management |
| 4 | **Event RSVP API** | `src/app/api/events/rsvp/route.ts` | ✅ Live | Validates input, creates EventRsvp in Prisma |
| 5 | **Partner Application API** | `src/app/api/partners/apply/route.ts` | ✅ Live | Validates input, creates PartnerApplication in Prisma |
| 6 | **Service Booking API** | `src/app/api/services/book/route.ts` | ✅ Live | Validates input, creates ServiceBooking in Prisma |
| 7 | **Stripe Checkout Session** | `src/lib/stripe.ts`, `src/app/api/checkout/session/route.ts` | ✅ Live | Creates Stripe checkout session. Requires `STRIPE_SECRET_KEY` env var |
| 8 | **NextAuth Handler** | `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts` | ✅ Live | Handles credentials + Google OAuth sessions |
| 9 | **WhatsApp Button** | `src/components/WhatsAppButton.tsx` | ✅ Live | Opens WhatsApp chat. Requires `NEXT_PUBLIC_WHATSAPP_URL` env var |

---

## 2. Partially Built Services

| # | Service | Integration Point | Status | What's Missing |
|---|---------|-------------------|--------|----------------|
| 1 | **Authentication (NextAuth)** | `src/lib/auth.ts` | ⚠️ Partial | CredentialsProvider accepts ANY email without password validation (demo mode). Google OAuth configured but needs env vars |
| 2 | **Stripe Payments** | `src/lib/stripe.ts` | ⚠️ Partial | Checkout session API is built. No frontend cart/checkout flow. No webhook handler for post-payment |
| 3 | **Cloudinary Images** | `next.config.js` | ⚠️ Partial | Domain whitelisted. No direct SDK integration. No upload API |
| 4 | **WhatsApp Integration** | External links only | ⚠️ Partial | No API integration. Only external `wa.me` links with placeholder numbers |

---

## 3. Missing Services

| # | Service | Business Impact | Backend Required | Frontend Required |
|---|---------|-----------------|------------------|-------------------|
| 1 | **Cart / Checkout Frontend** | Revenue blocking | Stripe API exists | **Cart page, checkout page, success/cancel pages** |
| 2 | **Email Service** | Customer communication | SMTP/API provider (SendGrid/Resend) | Email templates, trigger integration |
| 3 | **Search Engine** | Discovery | Algolia or custom search API | Search input, results page, filters |
| 4 | **Newsletter System** | Lead capture | Mailchimp/ConvertKit API | Signup form, popup, footer capture |
| 5 | **Analytics** | Business intelligence | Google Analytics / Plausible / Mixpanel | Tracking code, event instrumentation |
| 6 | **CRM Integration** | Customer management | HubSpot / Salesforce API | Contact sync, lead tracking |
| 7 | **Inventory Management** | Stock tracking | Prisma schema extension | Admin dashboard, stock alerts |
| 8 | **Admin Dashboard** | Operations | Prisma queries + auth middleware | Admin UI, CRUD for artworks/events |
| 9 | **Image Upload** | Content management | Cloudinary SDK / S3 | Upload component, image optimization |
| 10 | **Commission Request Flow** | Revenue | API endpoint + email notification | Commission form, status tracking |
| 11 | **Private Viewing Booking** | Revenue | API endpoint + calendar integration | Booking form, availability picker |
| 12 | **Membership Signup & Payment** | Revenue | Stripe subscriptions API | Tier selection, billing portal |
| 13 | **Collector Dashboard** | Retention | Order history API | Orders, saved works, preferences |
| 14 | **Live Chat (Human)** | Support | Intercom / Crisp / Zendesk | Chat widget, agent routing |
| 15 | **WhatsApp Bot** | Support | Meta Business API | Bot responses, menu flows |
| 16 | **Review/Rating System** | Social proof | Prisma schema + API | Review form, display, moderation |
| 17 | **Referral Program** | Growth | Referral tracking API | Referral link, rewards, dashboard |
| 18 | **Gift Cards** | Gifting | Stripe gift cards API | Purchase, redeem, balance |

---

## 4. Backend Required Matrix

| Service | Database Schema | API Endpoint | Auth | External Integration |
|---------|-----------------|--------------|------|---------------------|
| Cart / Checkout | ✅ (Artwork model exists) | ✅ (Stripe session) | ⚠️ (NextAuth partial) | ✅ (Stripe) |
| Email | ❌ (no email log table) | ❌ | ❌ | ❌ (no provider) |
| Search | ✅ (Artwork/Event data) | ⚠️ (`/api/artworks` partial) | ❌ | ❌ |
| Newsletter | ❌ (no subscriber table) | ❌ | ❌ | ❌ |
| Analytics | ❌ | ❌ | ❌ | ❌ |
| CRM | ❌ | ❌ | ❌ | ❌ |
| Inventory | ⚠️ (Artwork has `inStock`) | ❌ | ❌ | ❌ |
| Admin Dashboard | ✅ | ❌ | ⚠️ (needs admin role) | ❌ |
| Image Upload | ❌ | ❌ | ❌ | ⚠️ (Cloudinary domain only) |
| Commission Flow | ❌ | ❌ | ❌ | ❌ |
| Viewing Booking | ❌ | ❌ | ❌ | ❌ |
| Membership Payment | ❌ (no subscription model) | ❌ | ❌ | ⚠️ (Stripe exists) |
| Collector Dashboard | ❌ (no order model) | ❌ | ⚠️ | ❌ |

---

## 5. Service Dependency Graph

```
Prisma (Database)
├── /api/artworks → GET artworks
├── /api/events/rsvp → POST RSVP
├── /api/partners/apply → POST application
├── /api/services/book → POST booking
└── (missing) → Cart, orders, commissions, newsletter, etc.

Stripe
├── /api/checkout/session → POST create session
└── (missing) → Webhook handler, cart frontend, success page

NextAuth
├── /api/auth/[...nextauth] → Session handling
├── /auth/signin → Sign-in UI
└── (missing) → Password validation, forgot-password, signup

Zustand (Client-side only)
├── Cart state
├── Wishlist state
├── Chatbot state
└── (not synced to backend)
```

---

*End of SERVICE_MAP.md*
