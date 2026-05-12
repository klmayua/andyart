# SYSTEM ROUTE AUDIT - AndyArt Cultural House

## Public Routes
| Route | Layout | Auth Required |
|-------|--------|---------------|
| `/` | RootLayout | No |
| `/gallery` | RootLayout | No |
| `/gallery/[slug]` | RootLayout | No |
| `/artists` | RootLayout | No |
| `/artists/[slug]` | RootLayout | No |
| `/events` | RootLayout | No |
| `/events/[slug]` | RootLayout | No |
| `/events/past` | RootLayout | No |
| `/events/host` | RootLayout | No |
| `/journal` | RootLayout | No |
| `/journal/[slug]` | RootLayout | No |
| `/services` | RootLayout | No |
| `/services/[slug]` | RootLayout | No |
| `/spaces` | RootLayout | No |
| `/circle` | RootLayout | No |
| `/viewing-rooms` | RootLayout | No |
| `/viewing-rooms/[slug]` | RootLayout | No |
| `/partners` | RootLayout | No |
| `/partners/apply` | RootLayout | No |
| `/consult` | RootLayout | No |
| `/checkout` | RootLayout | No |
| `/checkout/[id]` | RootLayout | No |
| `/profile` | RootLayout | No |
| `/legal/terms` | RootLayout | No |
| `/legal/privacy` | RootLayout | No |

## Auth Routes
| Route | Layout | Description |
|-------|--------|-------------|
| `/auth/signin` | RootLayout | Public sign-in |
| `/ops/auth/signin` | RootLayout | Ops sign-in |

## Collector Routes (Protected)
| Route | Layout | Sidebar |
|-------|--------|---------|
| `/collector` | CollectorLayout | Yes |
| `/collector/profile` | CollectorLayout | Yes |
| `/collector/collection` | CollectorLayout | Yes |
| `/collector/acquisitions` | CollectorLayout | Yes |
| `/collector/certificates` | CollectorLayout | Yes |
| `/collector/viewings` | CollectorLayout | Yes |
| `/collector/wishlist` | CollectorLayout | Yes |
| `/collector/vault` | CollectorLayout | Yes |
| `/collector/payments` | CollectorLayout | Yes |
| `/collector/invoices` | CollectorLayout | Yes |
| `/collector/transactions` | CollectorLayout | Yes |

## Artist Routes (Protected)
| Route | Layout | Sidebar |
|-------|--------|---------|
| `/artists/portal` | ArtistPortalLayout | Yes |
| `/artists/profile` | ArtistPortalLayout | Yes |
| `/artists/inventory` | ArtistPortalLayout | Yes |
| `/artists/consignments` | ArtistPortalLayout | Yes |
| `/artists/exhibitions` | ArtistPortalLayout | Yes |
| `/artists/payouts` | ArtistPortalLayout | Yes |
| `/artists/analytics` | ArtistPortalLayout | Yes |

## Ops Routes (Protected)
| Route | Layout | Sidebar |
|-------|--------|---------|
| `/ops/crm` | OpsCRMLayout | Yes |
| `/ops/crm/leads` | OpsCRMLayout | Yes |
| `/ops/crm/pipeline` | OpsCRMLayout | Yes |
| `/ops/crm/insights` | OpsCRMLayout | Yes |
| `/ops/crm/subscribers` | OpsCRMLayout | Yes |
| `/ops/concierge` | OpsConciergeLayout | Yes |
| `/ops/concierge/bookings` | OpsConciergeLayout | Yes |
| `/ops/concierge/vip` | OpsConciergeLayout | Yes |
| `/ops/concierge/requests` | OpsConciergeLayout | Yes |
| `/ops/concierge/commissions` | OpsConciergeLayout | Yes |
| `/ops/concierge/corporate` | OpsConciergeLayout | Yes |
| `/ops/payments` | OpsPaymentsLayout | Yes |
| `/ops/payments/escrow` | OpsPaymentsLayout | Yes |
| `/ops/payments/invoices` | OpsPaymentsLayout | Yes |
| `/ops/payments/settlements` | OpsPaymentsLayout | Yes |
| `/ops/artists` | OpsArtistsLayout | Yes |
| `/ops/executive` | OpsExecutiveLayout | Yes |

## API Routes
| Route | Handler |
|-------|---------|
| `/api/artists` | artists/route.ts |
| `/api/artworks` | artworks/route.ts |
| `/api/collectors` | collectors/route.ts |
| `/api/concierge` | concierge/route.ts |
| `/api/crm/leads` | crm/leads/route.ts |
| `/api/payments` | payments/route.ts |
| `/api/events/host` | events/host/route.ts |
| `/api/events/rsvp` | events/rsvp/route.ts |
| `/api/chatbot` | chatbot/route.ts |
| `/api/consult` | consult/route.ts |
| `/api/partners/apply` | partners/apply/route.ts |
| `/api/services/book` | services/book/route.ts |
| `/api/checkout/session` | checkout/session/route.ts |

## Layout Components
- `RootLayout` - Public frontend (src/app/layout.tsx)
- `CollectorLayout` - Collector dashboard with sidebar
- `ArtistPortalLayout` - Artist dashboard with sidebar
- `OpsCRMLayout` - CRM dashboard with sidebar
- `OpsConciergeLayout` - Concierge dashboard with sidebar
- `OpsPaymentsLayout` - Payments dashboard with sidebar
- `OpsArtistsLayout` - Artist management dashboard
- `OpsExecutiveLayout` - Executive dashboard

## Auth Implementation
- Using localStorage-based auth (not NextAuth)
- AuthProvider wraps the application
- Protected layouts check `useAuth()` hook
- Redirects to `/auth/signin` when not authenticated

## Status Summary
- Total Routes: 66+
- Public: ~25 routes
- Protected (Collector): 11 routes
- Protected (Artist): 7 routes
- Protected (Ops): 18 routes
- API: 13 routes
- Auth: 2 routes