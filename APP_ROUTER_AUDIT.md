# APP_ROUTER_AUDIT.md

## App Router Structure Audit

### Layout Hierarchy

```
src/app/layout.tsx (ROOT)
├── Providers: AuthProvider, NewsletterSeedProvider ⚠️ BROKEN
├── Components: Ticker, Header, BottomNav, FloatingActions, ConversionLayer
└── Children rendered in main content area

src/app/ops/crm/layout.tsx
├── Auth check via useAuth
├── Sidebar navigation
└── Children: CRM dashboard pages

src/app/ops/concierge/layout.tsx
├── Auth check via useAuth
├── Sidebar navigation
└── Children: Concierge pages

src/app/ops/payments/layout.tsx
├── Auth check via useAuth
├── Sidebar navigation
└── Children: Payment pages

src/app/ops/executive/layout.tsx
├── Auth check via useAuth
└── Children: Executive pages

src/app/ops/artists/layout.tsx
├── Auth check via useAuth
└── Children: Ops artist pages

src/app/collector/layout.tsx
├── Auth check via useAuth
├── Sidebar with 11 nav items
└── Children: Collector pages

src/app/artists/(portal)/layout.tsx
└── Artist portal wrapper
```

### Route Groups

| Group | Routes | Status |
|-------|--------|--------|
| (portal) | /artists/portal, /artists/profile, etc. | Valid |
| ops | /ops/crm, /ops/concierge, /ops/payments, /ops/executive | Valid |
| collector | /collector/* (11 routes) | Valid |
| auth | /auth/signin | Valid |

### Protected Routes Using Auth

All ops/* routes check isAuthenticated in their layouts:
- /ops/crm/*
- /ops/concierge/*
- /ops/payments/*
- /ops/executive/*
- /ops/artists/*

All collector/* routes check isAuthenticated in collector/layout.tsx

### Pages by Route Category

**Public (no auth):**
- /, /gallery, /artists, /journal, /events, /services, /spaces, /viewing-rooms, /circle
- /legal/privacy, /legal/terms

**Access (auth required):**
- /auth/signin, /system-access, /enterprise

**Protected (auth + role check):**
- /ops/crm (and sub-routes)
- /ops/concierge (and sub-routes)
- /ops/payments (and sub-routes)
- /ops/executive
- /ops/artists
- /collector (and sub-routes)
- /artists/portal (and sub-routes)
- /partners

### Layout Issues Detected

1. **NewsletterSeedProvider breaks root layout** - layout.tsx imports from non-exporting module
2. **No recursive layout wrapping detected** - hierarchy is clean
3. **Provider mounted once** - only in root layout
4. **All child layouts properly nested** - no shadowing issues

### Missing Files

None detected - all expected page files exist for routes.

### Client/Server Boundary

- All route pages use 'use client' appropriately
- No Server Components trying to use client-only hooks directly
- Auth hooks properly isolated in client components