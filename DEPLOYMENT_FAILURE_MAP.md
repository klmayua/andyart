# DEPLOYMENT_FAILURE_MAP.md

## Deployment Failures - Root Cause Analysis

### PRIMARY CRASH: useConversionModal is not defined

**Status**: FIXED - hook file was created
**Residual Issue**: Hook missing required methods

### SECONDARY: NewsletterSeedProvider import failure

**File**: src/app/layout.tsx line 11
**Import**: `import { NewsletterSeedProvider } from '@/hooks/useNewsletterSeed'`
**Problem**: useNewsletterSeed.ts doesn't export NewsletterSeedProvider
**Status**: NOT FIXED - will crash on deployment

### TypeScript Errors Blocking Build

**Note**: Build currently passes because TypeScript validation is skipped (`npm run build` skips validation).

**If TypeScript validation enabled**: 45 errors would block build.

### Route-by-Route Status

| Route | Expected | Actual | Issue |
|-------|----------|--------|-------|
| / | Loads | Loads | OK |
| /gallery | Loads | Loads | OK |
| /gallery/[slug] | Loads | Type error | useParams issue |
| /auth/signin | Loads | Loads | OK |
| /enterprise | Loads | Loads | OK |
| /ops/crm | Loads | Type warning | useMemo |
| /collector | Loads | Loads | OK |
| /artists/portal | Loads | Loads | OK |
| All other routes | Loads | Likely OK | Type warnings |

### Why Build Passes But Runtime Fails

1. Build skips TypeScript validation
2. Next.js compiles successfully
3. Runtime crashes when:
   - layout tries to import non-existent export
   - pages call undefined methods on useConversionModal

### Vercel-Specific Issues

None identified - configuration appears standard for Next.js 14 App Router.

### Configuration Files

| File | Status |
|------|--------|
| next.config.js | Standard |
| tsconfig.json | Standard |
| package.json | Standard |
| vercel.json | Not present (uses auto-detect) |

### Summary

- **Deployment will fail** if NewsletterSeedProvider import not fixed
- **Runtime will crash** if conversion modal methods not added
- **TypeScript errors** currently hidden by build configuration