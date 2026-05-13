# ROUTE_TREE_FULL.md

## Complete Route Tree - AndyArt Platform

### ROOT LAYER
```
src/app/
├── layout.tsx (ROOT - BROKEN: NewsletterSeedProvider import)
├── page.tsx (/)
├── not-found.tsx
├── global-error.tsx
├── loading.tsx
```

### PUBLIC PAGES
```
├── gallery/
│   ├── page.tsx
│   └── [slug]/page.tsx ⚠️ Type error: useParams issue
├── artists/
│   ├── page.tsx
│   ├── [slug]/page.tsx ⚠️ Type error: conversion modal methods
│   └── (portal)/ (ROUTE GROUP)
│       ├── layout.tsx
│       ├── portal/page.tsx
│       ├── profile/page.tsx
│       ├── inventory/page.tsx
│       ├── consignments/page.tsx
│       ├── commissions/page.tsx
│       ├── exhibitions/page.tsx
│       ├── payouts/page.tsx
│       └── analytics/page.tsx
├── journal/
│   ├── page.tsx
│   └── [slug]/page.tsx ⚠️ Type errors: JournalArticle.image
├── events/
│   ├── page.tsx
│   ├── past/page.tsx
│   ├── host/page.tsx
│   └── [slug]/page.tsx ⚠️ Type error: conversion modal methods
├── services/
│   ├── page.tsx
│   └── [slug]/page.tsx ⚠️ Type error: conversion modal methods
├── spaces/page.tsx
├── circle/page.tsx
├── consult/page.tsx
├── checkout/
│   ├── page.tsx
│   └── [id]/page.tsx
├── viewing-rooms/
│   ├── page.tsx
│   └── [slug]/page.tsx ⚠️ Type error: conversion modal methods
├── legal/
│   ├── privacy/page.tsx
│   └── terms/page.tsx
```

### ACCESS & SYSTEM
```
├── auth/
│   └── signin/page.tsx (Premium demo access - working)
├── system-access/page.tsx
├── profile/page.tsx
└── enterprise/page.tsx
```

### PROTECTED - OPS (All require auth via layout)
```
ops/
├── auth/
│   └── signin/page.tsx
├── crm/
│   ├── layout.tsx (checks auth)
│   ├── page.tsx ⚠️ Type error: useMemo not imported
│   ├── leads/page.tsx
│   ├── pipeline/page.tsx
│   ├── subscribers/page.tsx ⚠️ Type errors: getSegmentCounts, getInterests
│   └── insights/page.tsx ⚠️ Type errors: multiple
├── concierge/
│   ├── layout.tsx (checks auth)
│   ├── page.tsx ⚠️ Type error: conciergeStats.today missing
│   ├── requests/page.tsx
│   ├── bookings/page.tsx
│   ├── commissions/page.tsx
│   ├── corporate/page.tsx
│   └── vip/page.tsx
├── payments/
│   ├── layout.tsx (checks auth)
│   ├── page.tsx
│   ├── invoices/page.tsx
│   ├── escrow/page.tsx
│   └── settlements/page.tsx
├── executive/
│   ├── layout.tsx (checks auth)
│   └── page.tsx
└── artists/
    ├── layout.tsx (checks auth)
    └── page.tsx
```

### PROTECTED - COLLECTOR (All require auth via layout)
```
collector/
├── layout.tsx (checks auth - 11 nav items)
├── page.tsx
├── profile/page.tsx
├── collection/page.tsx
├── acquisitions/page.tsx
├── certificates/page.tsx
├── viewings/page.tsx
├── wishlist/page.tsx
├── vault/page.tsx
├── payments/page.tsx
├── invoices/page.tsx ⚠️ Type error: FileText not found
└── transactions/page.tsx
```

### PROTECTED - PARTNERS
```
partners/
├── page.tsx
└── apply/page.tsx
```

### API ROUTES (18 routes)
```
api/
├── artists/
├── artworks/
├── chatbot/
├── checkout/session/
├── collectors/
├── concierge/
├── consult/
├── crm/leads/
├── events/host/
├── events/rsvp/
├── partners/apply/
├── payments/
└── services/book/
```

### ROUTE COUNT: 68 total pages

### ROUTES WITH TYPE ERRORS: 14+
- gallery/[slug] - useParams issue
- artist/[slug] - conversion modal methods
- events/[slug] - conversion modal methods  
- services/[slug] - conversion modal methods
- viewing-rooms/[slug] - conversion modal methods
- journal/[slug] - JournalArticle.image
- collector/invoices - FileText
- ops/crm - useMemo
- ops/crm/insights - multiple
- ops/crm/subscribers - getSegmentCounts, getInterests
- ops/concierge - conciergeStats.today