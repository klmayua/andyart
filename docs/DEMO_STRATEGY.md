# AndyArt — Demo Strategy
## AA_STEP_13 — Platform Surface Architecture

---

## 1. Demo Philosophy

**The demo should tell a story:**
1. A visitor discovers AndyArt as a luxury cultural house
2. A collector experiences ownership and trust
3. An artist sees their creative economy
4. An operator commands the platform

Each step should feel like entering a deeper layer of the ecosystem.

---

## 2. Demo Flow

### Step 1: Public Cultural Surface (3–4 minutes)

**URL:** `andyart.com`

**Showcase:**
1. **Homepage hero** — Cinematic full-screen video, "Collect culture. Live beautifully. Leave legacy."
2. **Five Ways to Begin** — Collect, Experience, Transform Spaces, Commission, Join Circle
3. **Featured Works** — Hover effects, wishlist hearts, price on request
4. **Heritage / Modern Bridge** — Five collection pillars with dramatic imagery
5. **AndyArt Experiences** — Events grid with hover reveals
6. **Spaces by AndyArt** — Corporate curation pitch
7. **Artist Spotlight** — Ngozi Okeke story
8. **Private Viewing Rooms** — Exclusive access pitch
9. **Collector Testimonials** — Social proof
10. **The Journal** — Editorial authority
11. **Collector Concierge** — White glove service CTA

**Communicate:**
- This is not just a gallery. This is a cultural house.
- The brand has mythology, gravity, and luxury positioning.
- Every pixel feels expensive.

**Narrative:**
> "AndyArt is a premium cultural house where collecting, gathering, gifting, commissioning, and living with art converge. The public surface is designed to feel like walking into a luxury editorial — cinematic, warm, and aspirational."

---

### Step 2: Collector Surface (3–4 minutes)

**Entry:** Click "Access" in header → `/auth/signin` → Enter demo credentials

**Showcase:**
1. **Member Access page** — "Enter your private collection"
2. **Collector Overview** — KPI cards: Acquisitions, Certificates, Viewings, Wishlist
3. **Recent Acquisitions** — Purchase history with provenance
4. **Certificates** — Authentication codes, verified status
5. **Viewings** — Attended vs upcoming
6. **Wishlist** — Priority levels, acquiring status
7. **Vault** — Secure document storage
8. **Payments** — Payment history, invoices, transactions
9. **Profile** — Tier, location, collecting focus

**Communicate:**
- Collectors feel like members of an exclusive club.
- Every acquisition is tracked, certified, and secured.
- The experience is discreet, premium, and private.

**Narrative:**
> "For collectors, AndyArt is a private ecosystem. Every artwork comes with provenance, authentication, and secure documentation. The collector portal feels like a private bank — elegant, secure, and deeply personal."

**Demo credentials:**
- Email: `obafemi.okeke@andela.com` (any password)
- Or use Google OAuth demo

---

### Step 3: Artist Surface (3–4 minutes)

**Entry:** Navigate to `/artists/portal` (or future: role-based redirect after auth)

**Showcase:**
1. **Studio Overview** — Total works, sold works, active commissions, upcoming shows
2. **Profile** — Biography, artist statement, exhibitions, awards, education
3. **Inventory** — Available, consigned, sold, reserved with filters
4. **Consignments** — Agreement numbers, split %, expiry alerts
5. **Commissions** — Milestone tracking, approvals, collector feedback
6. **Exhibitions** — Past and upcoming shows with sales metrics
7. **Payouts** — Gross, fees, tax, net with split breakdowns
8. **Analytics** — Profile views, artwork views, inquiry rate, top works, geographic reach

**Communicate:**
- Artists are first-class citizens.
- The platform handles their business so they can focus on creation.
- Payouts, commissions, and exhibitions are transparent and trackable.

**Narrative:**
> "For artists, AndyArt is a creative economy partner. They can track inventory, manage consignments, monitor commissions, and see real analytics — all in one elegant studio dashboard."

---

### Step 4: Operations Surface (4–5 minutes)

**Entry:** Navigate to `/ops/auth/signin` → Select demo account

**Showcase:**
1. **Ops Sign In** — "Operator Portal", demo accounts pre-filled
2. **Executive Dashboard** — Revenue, pipeline, system health, alerts
3. **CRM Overview** — Lead counts, VIP priority, pipeline stages, subscribers
4. **CRM Leads** — Lead table with temperature, score, status
5. **CRM Pipeline** — Kanban-style board
6. **Concierge Overview** — Request queue, bookings, commissions, VIPs
7. **Payments Overview** — Revenue, escrow, settlements, transaction volume
8. **Artist Console** — Pipeline, inventory health, expiry alerts, payout queue
9. **Global Search** — Press `/` to search across all surfaces
10. **Command Palette** — Press `⌘K` for 18 navigation commands

**Communicate:**
- The operations surface is institutional and powerful.
- Every metric, lead, payment, and alert is visible.
- The platform is not just a storefront — it's a command center.

**Narrative:**
> "Behind the luxury experience is an institutional operations engine. CRM, concierge, treasury, and executive intelligence all live in a unified command center. This is the brain of the cultural house."

**Demo accounts:**
- `admin@andyart.gallery` — Super Admin
- `chioma@andyart.gallery` — Concierge Director
- `tunde@andyart.gallery` — Concierge Director
- `compliance@andyart.gallery` — Compliance
- `readview@andyart.gallery` — Read Only

---

## 3. Demo Script (Condensed)

**Total time:** ~15 minutes

```
[0:00]  "This is AndyArt — a premium cultural house for African art."
        → Show homepage hero, scroll to Five Ways to Begin

[1:00]  "The public surface is designed to feel editorial and cinematic."
        → Show Featured Works, Heritage Bridge, Experiences

[2:30]  "But AndyArt is more than a gallery. It's an ecosystem."
        → Click "Access" → Member Access page

[3:00]  "For collectors, it's a private club."
        → Sign in → Collector Overview
        → Show acquisitions, certificates, vault, payments

[5:30]  "For artists, it's a creative economy partner."
        → Navigate to /artists/portal → Studio Overview
        → Show inventory, consignments, commissions, payouts, analytics

[8:00]  "And for the institution, it's a command center."
        → Navigate to /ops/auth/signin → Operator Portal
        → Sign in with admin demo account

[8:30]  "Executive visibility."
        → Show Executive Dashboard

[9:00]  "CRM intelligence."
        → Show CRM → Leads → Pipeline

[10:30] "Concierge operations."
        → Show Concierge → Requests → VIPs

[11:30] "Financial orchestration."
        → Show Payments → Invoices → Escrow → Settlements

[12:30] "Artist pipeline management."
        → Show Artist Console → Inventory health, expiry alerts, payout queue

[13:30] "Unified search and command."
        → Press `/` → Global Search
        → Press `⌘K` → Command Palette

[14:30] "AndyArt is a complete platform — public, private, creative, and institutional."
```

---

## 4. Demo Environment Setup

**Reset command:**
```bash
npm run db:seed
```

**Pre-seeded data:**
- 8 artists (Ngozi Okeke, Kofi Asante, Amara Okafor, Theodore Mensah, Zanele Muholi, Wangechi Mutu, El Anatsui, Yinka Shonibare)
- 12 artworks
- 12 collectors
- 8 payments, 4 invoices, 3 escrow cases
- 3 CRM leads, 3 concierge requests, 4 VIP profiles
- 8 inventory items, 4 consignments, 2 commissions, 3 exhibitions, 3 payouts

**Demo mode toggle (future):**
- Add `?demo=true` to any URL
- Shows helper tooltips
- Highlights interactive elements
- Adds "Reset Demo" floating button

---

## 5. One-Pager Summary for Stakeholders

> AndyArt is a four-surface platform:
> 1. **Public** — Cinematic luxury editorial. Discovery, aspiration, brand mythology.
> 2. **Collector** — Private club experience. Ownership, trust, certificates, vault.
> 3. **Artist** — Creative economy partner. Inventory, commissions, payouts, analytics.
> 4. **Operations** — Institutional command center. CRM, concierge, treasury, intelligence.
>
> Every surface has distinct visual identity, auth strategy, and emotional character.
> Zero experience bleed. Production-ready persistence. Demo-ready data.

---

*Strategy documented: 2026-05-11*
*Demo flow: 15 minutes, 4 surfaces, 66 routes*
