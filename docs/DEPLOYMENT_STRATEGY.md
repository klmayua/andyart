# AndyArt — Deployment Strategy
## AA_STEP_13 — Platform Surface Architecture

---

## 1. Architecture Decision

### Recommendation: **Option A (Single App) with Future Path to Option B**

**Rationale:**
- The platform is currently a Next.js 14 monolith with 66 routes
- All surfaces share the same Prisma schema, auth system, and component library
- Splitting into subdomains would require:
  - Shared auth across domains (complex cookies/sessions)
  - Shared Prisma client or separate databases
  - Cross-domain API calls
  - Multiple deployment pipelines
- Current scale (pre-launch / demo stage) does not justify the complexity

**Decision:** Maintain monolith for now. Implement subdomain separation as a **future Phase 2** when traffic and operational complexity demand it.

---

## 2. Current Monolith Structure

```
andyart.com/                    → Public Cultural Surface
├── gallery, artists, journal, events, services
├── viewing-rooms, consult, circle, spaces
├── partners, legal, auth/signin
├── profile, checkout

andyart.com/collector/*         → Collector Surface (sidebar layout)
andyart.com/artists/portal/*    → Artist Surface (sidebar layout)
andyart.com/ops/*               → Operations Surface (dark shell)
```

**Pros:**
- Single deployment pipeline
- Shared NextAuth session
- Shared Prisma connection
- Shared component library
- Simpler local development
- Easier demo environment

**Cons:**
- Larger bundle (mitigated by route splitting)
- Ops surface URLs are discoverable
- Less premium perception than subdomains

---

## 3. Future Multi-Surface Path (Option B)

When scale demands separation:

```
www.andyart.com                 → Public Cultural Surface
    Homepage, gallery, journal, events, etc.

collectors.andyart.com          → Collector Surface
    Portal, acquisitions, vault, payments

artists.andyart.com             → Artist Surface
    Inventory, commissions, payouts, analytics

ops.andyart.com                 → Operations Surface
    CRM, concierge, treasury, executive
```

**Migration path:**
1. Extract each surface into a standalone Next.js app
2. Share `@andyart/ui` and `@andyart/prisma` as internal packages
3. Use NextAuth with `cookies.domain = .andyart.com` for cross-subdomain sessions
4. Deploy each app independently to Vercel
5. Route traffic via DNS + Vercel project aliases

---

## 4. Deployment Configuration

### 4.1 Environment Variables

| Variable | Dev | Staging | Production |
|----------|-----|---------|------------|
| `DATABASE_URL` | Local PostgreSQL | Staging Neon/Vercel Postgres | Production Neon/Vercel Postgres |
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://staging.andyart.com` | `https://www.andyart.com` |
| `NEXTAUTH_SECRET` | Dev secret | Staging secret | Production secret |
| `STRIPE_SECRET_KEY` | Test key | Test key | Live key |
| `STRIPE_PUBLISHABLE_KEY` | Test key | Test key | Live key |
| `DIRECT_URL` | Local direct | Staging direct | Production direct |

### 4.2 Build Pipeline

```bash
# Development
npm run dev

# Staging
npm run build
# Deploy to Vercel staging project

# Production
npm run build
# Deploy to Vercel production project
# Run migrations: npx prisma migrate deploy
```

### 4.3 Database Strategy

**Current:** `prisma db push` (development) + `prisma migrate dev` (schema changes)
**Production:** `prisma migrate deploy` (managed migrations)

**Seed strategy:**
- Development: `npm run db:seed` (full realistic seed)
- Staging: `npm run db:seed` (full realistic seed) + reset capability
- Production: No seed. Manual data entry or controlled import.

---

## 5. Demo Environment

**URL:** `demo.andyart.com` or `andyart.com` with `?demo=true`

**Demo data:**
- Pre-seeded with `prisma/seed.ts`
- Reset script: `npm run db:seed` (idempotent via `skipDuplicates`)

**Demo mode features:**
- Demo accounts pre-filled on ops signin
- Sample collector profile pre-loaded
- Sample artist profile pre-loaded
- Reset capability for clean demo state

---

## 6. Security Boundaries

| Surface | Public Discovery | URL Obscurity | Auth Strength |
|---------|-----------------|---------------|---------------|
| Public | Expected | N/A | None |
| Collector | Semi-public (via `/auth/signin`) | Low | NextAuth + middleware |
| Artist | Semi-public (via `/auth/signin`) | Low | NextAuth + middleware |
| Operations | Hidden (no public links) | Medium | NextAuth + role check |

**Ops hardening recommendations:**
- Add IP allowlist for `/ops/*` in production
- Add rate limiting to `/ops/auth/signin`
- Add audit logging for all ops mutations
- Consider 2FA for ops accounts

---

*Strategy documented: 2026-05-11*
*Recommendation: Monolith now, subdomains later*
