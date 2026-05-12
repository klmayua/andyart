# AndyArt — Authentication Strategy
## AA_STEP_13 — Platform Surface Architecture

---

## 1. Guiding Principle

**Authentication should feel like entering a private club, not logging into SaaS.**

Avoid:
- Generic "Login" / "Sign In" buttons
- "Dashboard" language
- "Admin" language
- "Account" language (in primary CTAs)

Prefer:
- "Member Access"
- "Enter"
- "Private Access"
- "Collector Portal"
- "Concierge Access"

---

## 2. Entry Points by Surface

### 2.1 Public Surface Entry

**Primary entry:** `/auth/signin`

**Language:**
- Page title: "Member Access"
- Subtitle: "Enter your private collection and collector services"
- CTA button: "Enter"
- Google CTA: "Or enter with Google"
- Alternative: "New to AndyArt? Explore Circle membership"

**Placement:**
- Header right nav: "Access" (desktop)
- Header user icon: links to `/auth/signin` (mobile + desktop)
- Footer Connect column: "Member Access"
- Hero CTA: "Join Circle" (membership marketing, not auth)

### 2.2 Collector Entry Flow

```
Public → "Access" in header → /auth/signin → Authenticate → /profile
                                    ↓
                              (Future: redirect to /collector)
```

**Current state:**
- Authenticated users land on `/profile`
- `/profile` is a generic page with hardcoded data
- `/collector` is the real portal but has no direct public entry

**Recommended fix (AA_STEP_14):**
- Make `/profile` redirect authenticated users to `/collector`
- Or merge `/profile` functionality into `/collector`

### 2.3 Artist Entry Flow

```
Public → "Access" in header → /auth/signin → Authenticate → /profile
                                    ↓
                              (Future: role-based redirect to /artists/portal)
```

**Current state:**
- Artists share the same auth entry as collectors
- No artist-specific entry point
- Artist portal at `/artists/portal` requires manual navigation

**Recommended fix (AA_STEP_15):**
- Add role detection to auth flow
- Redirect `artist` roles to `/artists/portal`
- Add "Artist Access" discreet link (e.g., footer or auth page)

### 2.4 Operations Entry Flow

```
Direct URL: /ops/auth/signin → Authenticate → /ops/crm
```

**Language:**
- Page title: "Operator Portal"
- Subtitle: "AndyArt Cultural House — Secure Access"
- CTA button: "Sign In to Portal"

**Placement:**
- NO public links to `/ops/auth/signin`
- Entry is by direct URL only
- Demo accounts pre-filled for demonstration

**Security:**
- Demo accounts visible on signin page (acceptable for demo)
- Production: remove demo accounts, enforce real auth
- Consider IP allowlist for `/ops/*`

---

## 3. Auth State Visibility

| Surface | Auth Status Indicator | Location |
|---------|----------------------|----------|
| Public | User icon (neutral) | Header right |
| Public (authenticated) | User icon + name | Header right (future) |
| Collector | Logout button | Sidebar bottom |
| Artist | Logout button | Sidebar bottom |
| Operations | Logout + profile dropdown | UnifiedShell topbar |

---

## 4. Session Strategy

**Current:** NextAuth.js with JWT sessions
**Session lifetime:** 30 days (default)
**Storage:** HTTP-only cookie

**Per-surface session rules:**
- Public: No session required
- Collector: Valid session + authenticated
- Artist: Valid session + authenticated
- Operations: Valid session + authenticated + role check

---

## 5. Role-Based Access

| Role | Surfaces | Permissions |
|------|----------|-------------|
| `collector` | Public, Collector | Own data only |
| `artist` | Public, Artist | Own data only |
| `concierge_director` | Public, Operations | CRM + Concierge |
| `admin` | Public, Operations | All ops |
| `read_only` | Public, Operations | View only |

**Current implementation:**
- Roles stored in `useAuth` demo system
- No server-side role enforcement yet
- Future: Add role to JWT token, enforce in middleware

---

## 6. Auth Language Audit Results

### Before Fixes
- `/auth/signin`: "Welcome back", "Sign in", "Sign In to your AndyArt Circle account"
- Header: "Account" → `/profile`

### After Fixes
- `/auth/signin`: "Member Access", "Enter", "Enter your private collection"
- Header: "Access" → `/auth/signin`
- Footer: Added "Member Access" link

---

## 7. Future Auth Improvements

1. **Role-based redirects:** After auth, redirect based on role
2. **Collector onboarding:** First-time auth → onboarding wizard
3. **Password reset:** `/auth/forgot-password`
4. **Registration:** `/auth/signup` (invite-only for artists/ops)
5. **2FA for ops:** TOTP or email verification for ops accounts
6. **SSO:** Google OAuth (already configured)

---

*Strategy documented: 2026-05-11*
*Language elevated from SaaS to luxury club*
