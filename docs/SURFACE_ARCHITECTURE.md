# AndyArt — Surface Architecture Report
## AA_STEP_13 — Platform Identity & Experience Separation

---

## 1. Executive Summary

The AndyArt platform has been audited, classified, and strategically separated into four distinct experiential surfaces. Critical experience bleed (public navigation rendering on operational surfaces) has been eliminated. Authentication language has been elevated. Discreet entry points have been established.

**Surfaces Defined:**
1. **Public Cultural Surface** — Storytelling, discovery, editorial, brand mythology
2. **Collector Surface** — Ownership, trust, acquisitions, vault, concierge relationship
3. **Artist Surface** — Creator operations, inventory, payouts, commissions
4. **Operations Surface** — Orchestration, CRM, treasury, executive visibility

---

## 2. Surface Definitions

### 2.1 Public Cultural Surface

| Attribute | Value |
|-----------|-------|
| **Purpose** | Storytelling, discovery, editorial, exhibitions, aspiration, brand mythology |
| **Emotional Character** | Cinematic, warm, luxurious, editorial, emotional, tactile |
| **Primary Color** | `#FFFDF9` (warm ivory) on `#171614` (deep charcoal) |
| **Accent** | `#C6A66B` (warm gold) |
| **Typography** | Playfair Display (serif) + Inter (sans) |
| **Motion** | Slow, graceful, cinematic parallax |
| **Density** | Breathable, generous whitespace |
| **Glassmorphism** | Subtle backdrop blur, refined borders |

**Routes:**
- `/` — Homepage
- `/gallery` — Artwork collection
- `/gallery/[slug]` — Artwork detail
- `/artists` — Artist directory
- `/artists/[slug]` — Artist profile (public)
- `/journal` — Editorial content
- `/journal/[slug]` — Article detail
- `/events` — Events listing
- `/events/[slug]` — Event detail
- `/events/past` — Past events archive
- `/events/host` — Host an event
- `/services` — Services directory
- `/services/[slug]` — Service detail
- `/viewing-rooms` — Viewing rooms
- `/viewing-rooms/[slug]` — Room detail
- `/consult` — Consultation request
- `/circle` — Membership program
- `/spaces` — Corporate curation
- `/partners` — Partnerships
- `/partners/apply` — Partnership application
- `/legal/terms` — Terms
- `/legal/privacy` — Privacy
- `/auth/signin` — Member access entry

### 2.2 Collector Surface

| Attribute | Value |
|-----------|-------|
| **Purpose** | Ownership, trust, acquisitions, certificates, vault, payments, concierge |
| **Emotional Character** | Discreet, premium, secure, elegant, private |
| **Primary Color** | `#F7F2E8` (warm ivory) on `#FFFFFF` (white) |
| **Accent** | `#caa25d` (andy-gold) |
| **Typography** | Playfair Display (headings) + Inter (data) |
| **Motion** | Subtle, calm, reassuring |
| **Density** | Medium, card-based |
| **Glassmorphism** | Minimal, clean borders |

**Routes:**
- `/collector` — Overview dashboard
- `/collector/profile` — Profile management
- `/collector/collection` — Collection view
- `/collector/acquisitions` — Acquisition history
- `/collector/certificates` — Authenticity certificates
- `/collector/viewings` — Viewing history
- `/collector/wishlist` — Saved works
- `/collector/vault` — Secure document storage
- `/collector/payments` — Payment history
- `/collector/invoices` — Invoices
- `/collector/transactions` — Transaction ledger
- `/checkout` — Purchase flow
- `/checkout/[id]` — Checkout detail

**Auth:** Protected by `useAuth` → redirect to `/auth/signin`
**Layout:** Custom sidebar (`CollectorLayout`) with 11 nav items

### 2.3 Artist Surface

| Attribute | Value |
|-----------|-------|
| **Purpose** | Creator operations, inventory management, payouts, commissions, exhibition tracking |
| **Emotional Character** | Professional, empowering, elevated, creative-operational |
| **Primary Color** | `#F7F2E8` (warm ivory) on `#FFFFFF` (white) |
| **Accent** | `#caa25d` (andy-gold) |
| **Typography** | Playfair Display (headings) + Inter (data) |
| **Motion** | Functional, responsive |
| **Density** | Medium-high, data-rich |
| **Glassmorphism** | Minimal, clean borders |

**Routes:**
- `/artists/portal` — Studio overview
- `/artists/profile` — Artist profile
- `/artists/inventory` — Artwork inventory
- `/artists/consignments` — Gallery consignments
- `/artists/commissions` — Commission tracking
- `/artists/exhibitions` — Exhibition participation
- `/artists/payouts` — Payout history
- `/artists/analytics` — Performance analytics

**Auth:** Protected by `useAuth` → redirect to `/auth/signin`
**Layout:** Custom sidebar (`ArtistPortalLayout`) with 8 nav items

### 2.4 Operations Surface

| Attribute | Value |
|-----------|-------|
| **Purpose** | Orchestration, CRM, concierge, treasury, executive visibility, platform operations |
| **Emotional Character** | Institutional, dense, command-centric, high-signal, operational |
| **Primary Color** | `#171614` (deep charcoal) on `#FFFDF9` (warm ivory text) |
| **Accent** | `#caa25d` (andy-gold) |
| **Typography** | Playfair Display (section headers) + Inter (dense data) |
| **Motion** | Fast, functional, keyboard-driven |
| **Density** | High, information-dense |
| **Glassmorphism** | Dark glass, subtle borders |

**Routes:**
- `/ops/executive` — Executive dashboard
- `/ops/crm` — CRM overview
- `/ops/crm/leads` — Lead management
- `/ops/crm/pipeline` — Pipeline board
- `/ops/crm/subscribers` — Subscriber tiers
- `/ops/crm/insights` — CRM insights
- `/ops/concierge` — Concierge overview
- `/ops/concierge/requests` — Request queue
- `/ops/concierge/bookings` — Booking management
- `/ops/concierge/commissions` — Concierge commissions
- `/ops/concierge/corporate` — Corporate clients
- `/ops/concierge/vip` — VIP management
- `/ops/payments` — Payments overview
- `/ops/payments/invoices` — Invoice console
- `/ops/payments/escrow` — Escrow management
- `/ops/payments/settlements` — Settlement records
- `/ops/artists` — Artist console
- `/ops/auth/signin` — Ops secure access

**Auth:** Protected by `useAuth` → redirect to `/ops/auth/signin`
**Layout:** `UnifiedShell` with dark sidebar, global search, command palette, breadcrumbs

---

## 3. Visual Identity Separation Assessment

| Surface | Typography | Color Hierarchy | Spacing | Motion | Density | Glassmorphism |
|---------|-----------|-----------------|---------|--------|---------|---------------|
| **Public** | Large serif headings, generous line-height | Ivory on charcoal, gold accents | Very generous (72–110px sections) | Slow parallax, fade-up | Low | Hero glass cards |
| **Collector** | Medium serif headings, clean sans data | Ivory on white, gold on KPIs | Medium (24–48px sections) | Subtle hover transitions | Medium | Card borders |
| **Artist** | Medium serif headings, functional sans | Ivory on white, gold status badges | Medium (20–40px sections) | Functional transitions | Medium-high | Minimal |
| **Operations** | Small serif section headers, dense sans | Dark sidebar, light content, gold active states | Compact (16–32px sections) | Keyboard-driven, fast | High | Dark glass nav |

**Assessment:** All four surfaces maintain distinct visual identities. No visual identity conflicts detected.

---

## 4. Technical Architecture Review

### 4.1 Layout Hierarchy

```
Root Layout (all routes)
├── Ticker          → HIDDEN on protected surfaces
├── Header          → HIDDEN on protected surfaces
├── <main>          → children
│   ├── Public pages → Root layout only
│   ├── /collector/* → CollectorLayout (sidebar + main)
│   ├── /artists/portal/* → ArtistPortalLayout (sidebar + main)
│   ├── /ops/*      → OpsLayout → UnifiedShell (dark sidebar + topbar + main)
│   └── /auth/*     → Root layout (public entry)
├── BottomNav       → HIDDEN on protected surfaces
├── FloatingActions → HIDDEN on protected surfaces
└── ConversionLayer → HIDDEN on protected surfaces
```

### 4.2 Auth Boundaries

| Surface | Entry Point | Auth Guard | Redirect on Failure |
|---------|-------------|------------|---------------------|
| Public | N/A | None | N/A |
| Collector | `/auth/signin` | `useAuth` in `CollectorLayout` | `/auth/signin` |
| Artist | `/auth/signin` | `useAuth` in `ArtistPortalLayout` | `/auth/signin` |
| Operations | `/ops/auth/signin` | `useAuth` in each `ops/*/layout.tsx` | `/ops/auth/signin` |

### 4.3 Route Grouping

- `(portal)` route group used for artist portal to isolate layout without URL prefix
- `ops` uses explicit subdirectories with shared `UnifiedShell`
- `collector` uses explicit directory with `CollectorLayout`

### 4.4 Architectural Risks Identified

| Risk | Severity | Mitigation |
|------|----------|------------|
| Root layout renders public nav on all pages | **HIGH** | ✅ Fixed via `useSurfaceGuard` hook |
| `/profile` is separate from `/collector` portal | MEDIUM | Documented; future refactor to merge or redirect |
| Artist portal shares auth with collector | MEDIUM | Acceptable for demo; future: role-based routing |
| No subdomain separation | LOW | Monolith acceptable for current scale |

---

## 5. Experience Bleed Fixes Applied

### Fix 1: Surface Guard Hook
Created `src/hooks/useSurfaceGuard.ts` — detects protected surface prefixes and artist portal routes.

### Fix 2: Component Suppression
Updated 5 components to return `null` on protected surfaces:
- `Ticker.tsx` — public promotional ticker
- `Header.tsx` — public navigation header
- `BottomNav.tsx` — mobile bottom navigation
- `FloatingActions.tsx` — WhatsApp + Chatbot floating buttons
- `ConversionLayer.tsx` — conversion modals (inquiry, reserve, RSVP)

### Fix 3: Auth Language Elevation
Updated `/auth/signin`:
- "Welcome back" → "Member Access"
- "Sign in to your AndyArt Circle account" → "Enter your private collection and collector services"
- "Sign In" button → "Enter"
- "Or continue with" → "Or enter with"
- "Don't have an account? Apply as partner" → "New to AndyArt? Explore Circle membership"

### Fix 4: Discreet Entry Points
- Header right nav: "Account" → "Access" (links to `/auth/signin`)
- Header user icon: links to `/auth/signin`
- Footer Connect column: added "Member Access" link

---

## 6. Institutional Positioning Summary

**AndyArt Cultural House** is positioned as:
- A premium African art gallery and cultural house
- A bilateral platform serving collectors, artists, and institutional operations
- A luxury brand where public presence feels editorial and cinematic
- An operational powerhouse where back-office feels institutional and dense

**Positioning Principles:**
1. Public surface never reveals operational depth
2. Collector surface feels like a private club
3. Artist surface feels like a professional studio manager
4. Operations surface feels like a command center

---

## 7. Recommended Next Execution Steps

1. **AA_STEP_14: Collector Experience Polish** — Wire `/profile` to redirect authenticated users to `/collector`, add onboarding flow, refine collector portal empty states
2. **AA_STEP_15: Artist Onboarding** — Create artist onboarding flow, connect artist portal to real Prisma data, add artwork upload capability
3. **AA_STEP_16: Operations Intelligence** — Add real-time activity feed to executive dashboard, connect CRM to lead capture forms, enable invoice generation
4. **AA_STEP_17: Deployment Hardening** — Set up staging environment, configure Vercel/Netlify, add health check endpoints, implement rate limiting
5. **AA_STEP_18: Demo Environment** — Create demo data reset script, add demo mode toggle, build guided tour overlay

---

*Report generated: 2026-05-11*
*Audit scope: 66 routes, 4 surfaces, 30+ Prisma models*
*Zero regressions introduced*
