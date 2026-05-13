# PROVIDER_DEPENDENCY_TRACE.md

## Provider Dependency Trace - AndyArt Platform

### 1. NewsletterSeedProvider Dependency

**Import Chain:**
- `src/app/layout.tsx` line 11: `import { NewsletterSeedProvider } from '@/hooks/useNewsletterSeed'`
- Expected export: `NewsletterSeedProvider`
- Actual location: `src/hooks/useNewsletterSeed.tsx` (exported)
- Broken location: `src/hooks/useNewsletterSeed.ts` (NOT exported)

**Consumer:** layout.tsx line 48

**Resolution Issue:** 
- Import from `@/hooks/useNewsletterSeed` could resolve to either .ts or .tsx
- .ts file does NOT export NewsletterSeedProvider
- This causes runtime crash on deployment

**Fix Required:** Update import in layout.tsx to explicitly use .tsx path

---

### 2. ConversionModalProvider Dependency

**Mount Location:**
- `src/components/conversion/ConversionLayer.tsx` line 17-19
- Provider wraps `<ConversionModals />` component only
- ConversionLayer rendered in layout.tsx (line 56)

**Consumer Pages (ALL inside provider scope via layout children):**
- `/gallery/[slug]` - uses openInquiry, openReserve, openPrivateViewing, openConcierge
- `/artists/[slug]` - uses openPrivateViewing, openCommission, openConcierge
- `/events/[slug]` - uses openRSVP, openConcierge
- `/services/[slug]` - uses openCommission, openConcierge
- `/viewing-rooms/[slug]` - uses openPrivateViewing, openConcierge

**Current Issue:**
- Hook exports only: modal, openModal, close
- Pages expect: openInquiry, openReserve, openPrivateViewing, openCommission, openConcierge, openRSVP, closeModal

**Fix Required:** Add named methods to useConversionModal hook

---

### 3. AuthProvider Dependency

**Mount Location:**
- `src/app/layout.tsx` line 47

**Imported from:** `@/hooks/useAuth`

**Consumers:**
- `src/hooks/useAuth.tsx` - defines AuthProvider
- All protected layouts check useAuth:
  - `/collector/layout.tsx`
  - `/ops/crm/layout.tsx`
  - `/ops/concierge/layout.tsx`
  - `/ops/payments/layout.tsx`
  - `/ops/executive/layout.tsx`
  - `/ops/artists/layout.tsx`

**Auth Implementation:**
- Primary: `src/hooks/useAuth.tsx` (AuthProvider + useAuth hook)
- Secondary: `src/lib/auth.ts` (ops auth functions)
- Demo: `src/lib/demo-auth.ts` (demo login)
- Legacy: `src/lib/demo-session.ts` (duplicate)

**Fix Required:** Consolidate auth systems (future step)

---

## Import Graph Summary

| Provider | Import Path | Mount | Consumers | Status |
|----------|-------------|-------|-----------|--------|
| NewsletterSeedProvider | @/hooks/useNewsletterSeed | layout.tsx:48 | None (provider only) | BROKEN - wrong file |
| ConversionModalProvider | @/hooks/useConversionModal | ConversionLayer.tsx:17 | 5 pages | INCOMPLETE - missing methods |
| AuthProvider | @/hooks/useAuth | layout.tsx:47 | 6 layouts | ACTIVE - working |

## File Path Reference

| File | Exports | Used By |
|------|---------|---------|
| src/hooks/useNewsletterSeed.ts | useNewsletterSeed (hook only) | NOT USED |
| src/hooks/useNewsletterSeed.tsx | NewsletterSeedProvider | layout.tsx (broken import) |
| src/hooks/useConversionModal.tsx | ConversionModalProvider, useConversionModal | ConversionLayer + 5 pages |
| src/hooks/useAuth.tsx | AuthProvider, useAuth | layout.tsx + 6 layouts |