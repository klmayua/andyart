# IMPORT_FAILURE_AUDIT.md

## Import Failures and Broken References

### CRITICAL IMPORT FAILURES

#### 1. NewsletterSeedProvider Import (ROOT CRASH CAUSE)
- **File**: `src/app/layout.tsx` line 11
- **Import**: `import { NewsletterSeedProvider } from '@/hooks/useNewsletterSeed'`
- **Status**: FAILS - NewsletterSeedProvider not exported from useNewsletterSeed.ts
- **Fix needed**: Either export from useNewsletterSeed.ts or change import to useNewsletterSeed.tsx

#### 2. useConversionModal Methods Missing
- **File**: `src/hooks/useConversionModal.tsx`
- **Expected exports**: openInquiry, openReserve, openCommission, openConcierge, openRSVP, openPrivateViewing
- **Actual exports**: only modal, openModal, close
- **Impact**: 6+ pages call undefined methods → runtime errors

### TYPE ERRORS IN IMPORTS

| File | Line | Error |
|------|------|-------|
| src/app/artists/[slug]/ArtistDetailClient.tsx | 20 | openPrivateViewing, openCommission, openConcierge don't exist |
| src/app/events/[slug]/page.tsx | 16 | openRSVP, openConcierge don't exist |
| src/app/gallery/[slug]/page.tsx | 21 | openInquiry, openReserve, openPrivateViewing, openConcierge don't exist |
| src/app/services/[slug]/page.tsx | 26 | openCommission, openConcierge don't exist |
| src/app/viewing-rooms/[slug]/ViewingRoomDetailClient.tsx | 13 | openPrivateViewing, openConcierge don't exist |
| src/app/layout.tsx | 11 | NewsletterSeedProvider not exported |
| src/app/ops/crm/page.tsx | 57 | useMemo not imported |
| src/lib/collector.ts | 244 | undefined variable 'collectorId' |
| src/lib/newsletterScoring.ts | 84 | Property 'email' not on type |

### DUPLICATE/REDUNDANT IMPORTS

1. **useNewsletterSeed**: Exists as both .ts and .tsx
   - useNewsletterSeed.ts - hook version, no Provider export
   - useNewsletterSeed.tsx - Provider version, has Provider export
   
2. **Auth implementations**: 3 different systems
   - src/lib/auth.ts - original ops auth
   - src/lib/demo-auth.ts - new demo auth
   - src/lib/demo-session.ts - legacy demo session

### CASE SENSITIVITY ISSUES

None detected - all imports use proper casing.

### CIRCULAR DEPENDENCIES

None detected in import chain.

### BROKEN ALIAS IMPORTS

- `@/hooks/useNewsletterSeed` resolves but doesn't export Provider
- All other @ aliases resolve correctly