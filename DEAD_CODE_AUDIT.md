# DEAD_CODE_AUDIT.md

## Dead Code and Duplicate Systems

### DUPLICATE HOOK FILES

#### 1. useNewsletterSeed (DUPLICATE)
- **File 1**: `src/hooks/useNewsletterSeed.ts` (12 lines)
  - Exports: `useNewsletterSeed` hook function
  - Missing: No Provider export
- **File 2**: `src/hooks/useNewsletterSeed.tsx` (19 lines)
  - Exports: `NewsletterSeedProvider` component
  - Has: Provider component with data seeding effect
- **Issue**: Both exist, causing import confusion. layout.tsx imports from .ts expecting .tsx export.

### DUPLICATE AUTH IMPLEMENTATIONS

#### Triple Auth System Confusion

| File | Purpose | Key Features |
|------|---------|--------------|
| `src/lib/auth.ts` | Original ops auth | login, logout, getCurrentUser, session management |
| `src/lib/demo-auth.ts` | New demo auth | loginDemoUser, getDemoUser, isDemoAuthenticated |
| `src/lib/demo-session.ts` | Legacy session | setDemoSession, getDemoSession, hasDemoAccess |

**Problem**: Three different auth systems with overlapping functionality:
- All use localStorage for session
- All check 'aa_demo_mode' flag
- useAuth.tsx imports from both auth.ts and demo-auth.ts

### POTENTIALLY UNUSED FILES

- `src/hooks/useAnalytics.ts` - Not imported anywhere detected
- `src/components/Chatbot.tsx` - Only imported in one place, may be conditional
- `src/lib/repositories/index.ts` - Not imported in main app

### STALE/LEGACY FILES

- `src/hooks/useMounted.ts` - Simple mounting hook, appears in use
- `src/components/InlineLoader.tsx` - Appears in use

### TEMPORARY/RECOVERY FILES

- None detected in src/ directory

### DUPLICATE COMPONENTS

None detected - all conversion modals are unique (BaseModal, InquiryModal, ReserveModal, etc.)

### UNUSED EXPORTS

Based on grep, potential unused exports:
- Various type exports from mock data files
- Some lib function exports not consumed in main flow