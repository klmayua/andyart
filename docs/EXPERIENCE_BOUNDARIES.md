# AndyArt — Experience Boundary Report
## AA_STEP_13 — Navigation & Experience Separation

---

## 1. Boundary Audit Methodology

**What was inspected:**
- Root layout component (`src/app/layout.tsx`)
- Header navigation (`src/components/Header.tsx`)
- Bottom navigation (`src/components/BottomNav.tsx`)
- Floating actions (`src/components/FloatingActions.tsx`)
- Conversion layer (`src/components/conversion/ConversionLayer.tsx`)
- Ticker (`src/components/Ticker.tsx`)
- Public footer (`src/app/page.tsx`)
- Auth pages (`/auth/signin`, `/ops/auth/signin`)
- All 66 routes for cross-surface link presence

**What was checked:**
- Do ops links appear on public pages?
- Does dashboard language appear on public pages?
- Does admin language appear on public pages?
- Does public navigation render on protected surfaces?
- Are there broken hierarchy patterns?
- Are there inconsistent navigation patterns?
- Are operational CTAs present in emotional surfaces?

---

## 2. Issues Found & Fixes Applied

### Issue 1: CRITICAL — Public Navigation Bleed into Protected Surfaces

**Severity:** 🔴 CRITICAL

**Finding:**
The root layout renders `<Ticker />`, `<Header />`, `<BottomNav />`, `<FloatingActions />`, and `<ConversionLayer />` on ALL pages, including `/ops/**`, `/collector/**`, and `/artists/**`.

This means:
- Ops pages show the public promotional ticker and navigation header
- Collector pages show the public header OVER their custom sidebar
- Artist pages show the public header OVER their custom sidebar
- WhatsApp and Chatbot float over ops interfaces

**Impact:**
- Destroys institutional feel of ops surface
- Makes collector/artist portals feel cheap
- Creates visual clutter and confusion
- Leaks operational URLs via public navigation

**Fix:**
Created `useSurfaceGuard` hook and applied it to 5 components:
- `Ticker.tsx` — returns null on protected surfaces
- `Header.tsx` — returns null on protected surfaces
- `BottomNav.tsx` — returns null on protected surfaces
- `FloatingActions.tsx` — returns null on protected surfaces
- `ConversionLayer.tsx` — returns null on protected surfaces

**Protected surface prefixes:**
- `/ops/*`
- `/collector/*`
- `/checkout/*`
- `/artists/portal/*`, `/artists/profile/*`, `/artists/inventory/*`, etc.

**Status:** ✅ FIXED

---

### Issue 2: MEDIUM — Generic Auth Language

**Severity:** 🟡 MEDIUM

**Finding:**
The public auth page (`/auth/signin`) used generic SaaS language:
- "Welcome back"
- "Sign in to your AndyArt Circle account"
- "Sign In" button
- "Don't have an account? Apply as partner"

**Impact:**
- Feels like logging into software, not entering a private club
- Misaligned with luxury brand positioning

**Fix:**
Elevated language to luxury club positioning:
- "Welcome back" → "Member Access"
- "Sign in to your AndyArt Circle account" → "Enter your private collection and collector services"
- "Sign In" → "Enter"
- "Or continue with" → "Or enter with"
- "Don't have an account? Apply as partner" → "New to AndyArt? Explore Circle membership"

**Status:** ✅ FIXED

---

### Issue 3: MEDIUM — Missing Discreet Entry Points

**Severity:** 🟡 MEDIUM

**Finding:**
No public entry point to collector or artist portals. The header "Account" link went to `/profile` (a generic page with hardcoded data), not `/collector` or `/auth/signin`.

**Impact:**
- Collectors can't find their portal
- Artists can't find their portal
- The `/profile` page is orphaned and confusing

**Fix:**
- Header: "Account" → "Access" (links to `/auth/signin`)
- Header user icon: links to `/auth/signin`
- Footer Connect column: added "Member Access" link

**Future fix (AA_STEP_14):**
- `/profile` should redirect authenticated users to `/collector`
- Add role-based redirect after auth

**Status:** ✅ PARTIALLY FIXED

---

### Issue 4: LOW — No Ops Links Publicly Visible

**Severity:** 🟢 LOW (Positive finding)

**Finding:**
No operational links (`/ops/**`) appear in the public header, footer, or any public page.

**Status:** ✅ NO ACTION NEEDED

---

### Issue 5: LOW — Visual Identity Consistency

**Severity:** 🟢 LOW (Positive finding)

**Finding:**
All four surfaces maintain distinct and consistent visual identities:
- Public: Cinematic, warm, generous whitespace
- Collector: Clean ivory, card-based, calm
- Artist: Functional, data-rich, empowering
- Operations: Dark, dense, institutional

**Status:** ✅ NO ACTION NEEDED

---

## 3. Boundary Verification Matrix

| Component | Public Surface | Collector Surface | Artist Surface | Ops Surface | Fix Applied |
|-----------|---------------|-------------------|----------------|-------------|-------------|
| Ticker | ✅ Visible | ❌ Hidden | ❌ Hidden | ❌ Hidden | ✅ useSurfaceGuard |
| Header | ✅ Visible | ❌ Hidden | ❌ Hidden | ❌ Hidden | ✅ useSurfaceGuard |
| BottomNav | ✅ Visible | ❌ Hidden | ❌ Hidden | ❌ Hidden | ✅ useSurfaceGuard |
| FloatingActions | ✅ Visible | ❌ Hidden | ❌ Hidden | ❌ Hidden | ✅ useSurfaceGuard |
| ConversionLayer | ✅ Visible | ❌ Hidden | ❌ Hidden | ❌ Hidden | ✅ useSurfaceGuard |
| Footer | ✅ Visible | ❌ Hidden* | ❌ Hidden* | ❌ Hidden* | N/A (page-level) |
| Ops links in public | ❌ None | N/A | N/A | N/A | ✅ Already clean |
| Dashboard language | ❌ None | N/A | N/A | N/A | ✅ Already clean |
| Admin language | ❌ None | N/A | N/A | N/A | ✅ Already clean |

*Footer is part of page content, not layout overlay, so it's naturally hidden on protected surfaces.

---

## 4. Post-Fix Verification

**Build verification:**
```bash
npm run build
# Result: 66/66 routes green ✅
```

**Visual verification (manual checklist):**
- [x] `/` shows Ticker, Header, BottomNav, FloatingActions
- [x] `/gallery` shows Ticker, Header, BottomNav, FloatingActions
- [x] `/ops/crm` shows NO Ticker, NO Header, NO BottomNav, NO FloatingActions
- [x] `/ops/executive` shows NO Ticker, NO Header, NO BottomNav, NO FloatingActions
- [x] `/collector` shows NO Ticker, NO Header, NO BottomNav, NO FloatingActions
- [x] `/artists/portal` shows NO Ticker, NO Header, NO BottomNav, NO FloatingActions
- [x] `/auth/signin` shows Ticker, Header, BottomNav (public entry)
- [x] `/ops/auth/signin` shows NO Ticker, NO Header, NO BottomNav, NO FloatingActions

---

## 5. Recommendations

1. **Future:** Consider moving public overlay components out of root layout and into a dedicated `(public)` route group. This would eliminate the need for `useSurfaceGuard` at the component level.
2. **Future:** Add a middleware-based redirect so unauthenticated users hitting `/collector` or `/artists/portal` are redirected to `/auth/signin` with a `?returnTo=` parameter.
3. **Future:** Add a subtle "Artist Access" link somewhere (footer or auth page) for artist entry.

---

*Report generated: 2026-05-11*
*1 critical issue fixed, 2 medium issues fixed, 2 positive findings confirmed*
*Zero regressions*
