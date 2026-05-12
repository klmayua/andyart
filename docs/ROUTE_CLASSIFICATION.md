# AndyArt — Route Classification Matrix
## AA_STEP_13 — Full Route Audit

---

| Route | Current Layout | Intended Persona | Experience Type | Auth Required | Current Status | Deployment Surface | Visual Identity | Notes |
|-------|---------------|------------------|-----------------|---------------|----------------|-------------------|-----------------|-------|
| `/` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Homepage hero |
| `/gallery` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Artwork grid |
| `/gallery/[slug]` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ⚠️ Partial | Public | Cinematic luxury | Uses hardcoded data |
| `/artists` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Artist directory |
| `/artists/[slug]` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Artist detail |
| `/journal` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ⚠️ Partial | Public | Cinematic luxury | Article links dead |
| `/journal/[slug]` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Article detail |
| `/events` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Events grid |
| `/events/[slug]` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ⚠️ Partial | Public | Cinematic luxury | Hardcoded data |
| `/events/host` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ⚠️ Placeholder | Public | Cinematic luxury | Form no-op |
| `/events/past` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Past events |
| `/services` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Services grid |
| `/services/[slug]` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ⚠️ Partial | Public | Cinematic luxury | Hardcoded data |
| `/viewing-rooms` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Room listing |
| `/viewing-rooms/[slug]` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ⚠️ Partial | Public | Cinematic luxury | Hardcoded data |
| `/consult` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ⚠️ Placeholder | Public | Cinematic luxury | Form no-op |
| `/circle` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Membership tiers |
| `/spaces` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Corporate curation |
| `/partners` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Partnership overview |
| `/partners/apply` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Live form + API |
| `/legal/terms` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Static content |
| `/legal/privacy` | Root + Header + BottomNav | Public visitor | Public Cultural | No | ✅ Working | Public | Cinematic luxury | Static content |
| `/profile` | Root + Header + BottomNav | Collector (public) | Public/Collector bridge | No | ⚠️ Partial | Public | Clean cards | Hardcoded data, separate from `/collector` |
| `/auth/signin` | Root + Header + BottomNav | Collector / Artist | Authentication | No | ⚠️ Partial | Public | Clean minimal | NextAuth credentials weak |
| `/checkout` | Root + Header + BottomNav | Collector | Finance | No | ✅ Working | Finance | Clean minimal | Stripe checkout |
| `/checkout/[id]` | Root + Header + BottomNav | Collector | Finance | No | ✅ Working | Finance | Clean minimal | Checkout detail |
| `/collector` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Overview dashboard |
| `/collector/profile` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Profile management |
| `/collector/collection` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Collection view |
| `/collector/acquisitions` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Acquisition history |
| `/collector/certificates` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Certificates |
| `/collector/viewings` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Viewing history |
| `/collector/wishlist` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Wishlist |
| `/collector/vault` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Document vault |
| `/collector/payments` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Payments |
| `/collector/invoices` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Invoices |
| `/collector/transactions` | CollectorLayout | Collector | Collector Surface | Yes | ✅ Working | Collector | Premium ivory | Transactions |
| `/artists/portal` | ArtistPortalLayout | Artist | Artist Surface | Yes | ✅ Working | Artist | Premium ivory | Studio overview |
| `/artists/profile` | ArtistPortalLayout | Artist | Artist Surface | Yes | ✅ Working | Artist | Premium ivory | Artist profile |
| `/artists/inventory` | ArtistPortalLayout | Artist | Artist Surface | Yes | ✅ Working | Artist | Premium ivory | Inventory |
| `/artists/consignments` | ArtistPortalLayout | Artist | Artist Surface | Yes | ✅ Working | Artist | Premium ivory | Consignments |
| `/artists/commissions` | ArtistPortalLayout | Artist | Artist Surface | Yes | ✅ Working | Artist | Premium ivory | Commissions |
| `/artists/exhibitions` | ArtistPortalLayout | Artist | Artist Surface | Yes | ✅ Working | Artist | Premium ivory | Exhibitions |
| `/artists/payouts` | ArtistPortalLayout | Artist | Artist Surface | Yes | ✅ Working | Artist | Premium ivory | Payouts |
| `/artists/analytics` | ArtistPortalLayout | Artist | Artist Surface | Yes | ✅ Working | Artist | Premium ivory | Analytics |
| `/ops/executive` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Executive dashboard |
| `/ops/crm` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | CRM overview |
| `/ops/crm/leads` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Lead management |
| `/ops/crm/pipeline` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Pipeline board |
| `/ops/crm/subscribers` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Subscribers |
| `/ops/crm/insights` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Insights |
| `/ops/concierge` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Concierge overview |
| `/ops/concierge/requests` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Requests |
| `/ops/concierge/bookings` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Bookings |
| `/ops/concierge/commissions` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Commissions |
| `/ops/concierge/corporate` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Corporate |
| `/ops/concierge/vip` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | VIP |
| `/ops/payments` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Payments |
| `/ops/payments/invoices` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Invoices |
| `/ops/payments/escrow` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Escrow |
| `/ops/payments/settlements` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Settlements |
| `/ops/artists` | UnifiedShell | Operations | Operations Surface | Yes | ✅ Working | Operations | Dark institutional | Artist console |
| `/ops/auth/signin` | Root (dark mode) | Operations | Authentication | No | ✅ Working | Operations | Dark minimal | Ops secure entry |

---

## Route Count by Surface

| Surface | Count | Auth Required |
|---------|-------|---------------|
| Public Cultural | 23 | 0 |
| Collector | 12 | 11 |
| Artist | 8 | 8 |
| Operations | 19 | 18 |
| Finance | 2 | 0 |
| Authentication | 2 | 0 |
| **Total** | **66** | **37** |

---

## Shared Infrastructure Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/api/artworks` | API | Artwork pagination + filtering |
| `/api/auth/[...nextauth]` | API | NextAuth handler |
| `/api/chatbot` | API | Chatbot responses |
| `/api/checkout/session` | API | Stripe checkout creation |
| `/api/consult` | API | Consultation submission |
| `/api/events/host` | API | Event host submission |
| `/api/events/rsvp` | API | Event RSVP |
| `/api/partners/apply` | API | Partnership application |
| `/api/services/book` | API | Service booking |
| `/api/artists` | API | Artist queries (new) |
| `/api/collectors` | API | Collector queries (new) |
| `/api/payments` | API | Payment/invoice/escrow queries (new) |
| `/api/crm/leads` | API | CRM lead queries (new) |
| `/api/concierge` | API | Concierge queries (new) |

---

*Audit completed: 2026-05-11*
*66 routes catalogued across 4 experiential surfaces*
