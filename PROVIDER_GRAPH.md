# PROVIDER_GRAPH.md

## Provider Graph - AndyArt Platform

### Providers Mounted in Root Layout (src/app/layout.tsx)

```
AuthProvider (from @/hooks/useAuth)
    └── useAuth hook provides: user, login, logout, isAuthenticated, isDemoMode
    └── Consumed by: all protected routes, collector layout, ops layouts

NewsletterSeedProvider (from @/hooks/useNewsletterSeed) ⚠️ IMPORT FAILURE
    └── Purpose: Seed mock data on app load
    └── Issue: Not exported from useNewsletterSeed module
```

### Provider Dependency Chain

```
Root Layout
├── AuthProvider
│   └── Wraps entire app
│   └── useAuth used by:
│       ├── collector/layout.tsx
│       ├── ops/crm/layout.tsx
│       ├── ops/concierge/layout.tsx
│       ├── ops/payments/layout.tsx
│       ├── ops/executive/layout.tsx
│       ├── ops/artists/layout.tsx
│       └── components/auth/RouteGuard.tsx
│
└── NewsletterSeedProvider ⚠️ BROKEN
    └── Used in layout.tsx line 48
    └── Imports from @/hooks/useNewsletterSeed
    └── Issue: NewsletterSeedProvider not exported from that module
```

### Conversion Layer Providers (Nested)

```
ConversionLayer (src/components/conversion/ConversionLayer.tsx)
├── ConversionModalProvider (from @/hooks/useConversionModal)
│   └── Creates context for modal state
│   └── useConversionModal hook provides:
│       └── modal, openModal, close
│       └── MISSING: openInquiry, openReserve, openCommission, etc.
│
└── useSurfaceGuard hook (from @/hooks/useSurfaceGuard)
    └── Determines if public or protected surface
```

### Providers Consumed But Missing/Broken

| Provider | Expected Export | Actual Status | Impact |
|----------|-----------------|---------------|--------|
| ConversionModalProvider | useConversionModal | Incomplete - missing methods | Runtime errors in 6+ pages |
| NewsletterSeedProvider | useNewsletterSeed | Import fails | Layout crashes on mount |
| useConversionModal | Multiple methods | Only has: modal, openModal, close | Components call undefined methods |

### Component Dependencies on useConversionModal

The following components call undefined methods on useConversionModal:
- src/app/artists/[slug]/ArtistDetailClient.tsx
- src/app/events/[slug]/page.tsx
- src/app/gallery/[slug]/page.tsx
- src/app/services/[slug]/page.tsx
- src/app/viewing-rooms/[slug]/ViewingRoomDetailClient.tsx

All expect: openInquiry, openReserve, openCommission, openConcierge, openRSVP, openPrivateViewing