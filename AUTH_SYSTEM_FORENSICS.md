# AUTH_SYSTEM_FORENSICS.md

## Auth System Analysis

### Current Auth Implementations

#### 1. src/lib/auth.ts (Original Ops Auth)
**Purpose:** Original authentication for ops system
**Exports:**
- login(email, password) -> { success, user?, error? }
- logout() -> void
- getCurrentUser() -> User | null
- getSession() -> Session | null
- isAuthenticated() -> boolean
- getAllOpsUsers() -> User[]
- inviteUser(email, name, role) -> { success, user?, error? }
- updateUserRole(userId, role) -> void
- deactivateUser(userId) -> void

**localStorage Keys:**
- `andyart_ops_users` - user list
- `andyart_ops_session` - active session

**Usage:**
- Used by useAuth.tsx for actual auth operations
- Demo users: chioma@andyart.gallery, tunde@andyart.gallery, admin@andyart.gallery

---

#### 2. src/lib/demo-auth.ts (New Demo Auth)
**Purpose:** New demo authentication system for role-based access
**Exports:**
- loginDemoUser(email, password) -> { success, session?, error? }
- loginWithDemoAccount(account) -> { success, session? }
- logoutDemoUser() -> void
- getDemoUser() -> DemoSession | null
- isDemoAuthenticated() -> boolean
- hasRoleAccess(route) -> boolean
- getDemoAccounts() -> DemoAccount[]

**localStorage Keys:**
- `andyart-demo-session` - demo session
- `aa_demo_mode` - demo mode flag

**Usage:**
- Used by /auth/signin page for demo login
- Used by useAuth.tsx for demo authentication
- 7 demo accounts with different roles

---

#### 3. src/lib/demo-session.ts (Legacy Session)
**Purpose:** Legacy demo session handling (appears duplicate)
**Exports:**
- setDemoSession(role) -> void
- getDemoSession() -> DemoSession | null
- clearDemoSession() -> void
- hasDemoAccess() -> boolean
- getDemoRoleFromSession() -> DemoRole | null

**localStorage Keys:**
- `aa_demo_session` - legacy session key
- `aa_demo_mode` - demo mode flag

**Status:** LEGACY - Not actively used in current flow

---

#### 4. src/hooks/useAuth.tsx (Auth Integration)
**Purpose:** Unified auth hook combining all systems

**Behavior:**
- On mount: checks isDemoAuthenticated() OR getCurrentUser()
- login() function: tries demo-auth first, falls back to lib/auth
- logout(): calls both logoutDemoUser() and apiLogout()
- Demo mode detection: checks localStorage.getItem('aa_demo_mode') === 'enabled'

**localStorage Keys Used:**
- `aa_demo_mode` - primary demo flag
- `andyart-demo-session` - demo session (demo-auth)
- `andyart_ops_session` - ops session (auth.ts)

---

### Auth Flow Diagram

```
User visits /auth/signin
    │
    ├── Form Login:
    │   └── loginDemoUser(email, password)
    │       └── Creates session in localStorage
    │       └── Sets aa_demo_mode flag
    │
    └── Demo Quick Access:
        └── loginWithDemoAccount(account)
            └── Creates session in localStorage
            └── Sets aa_demo_mode flag

User visits protected route
    │
    └── useAuth hook checks:
        ├── isDemoAuthenticated() → checks aa_demo_mode
        └── OR getCurrentUser() → checks andyart_ops_session

Both paths set user context
Both allow access to protected routes
```

---

### Key Findings

#### Active Auth Systems:
1. **demo-auth.ts** - Primary for demo login flow
2. **auth.ts** - Legacy ops auth (still referenced)

#### Dead/Legacy:
- **demo-session.ts** - Not actively used (duplicate functionality)

#### localStorage Keys:
| Key | System | Purpose |
|-----|--------|---------|
| aa_demo_mode | Both demo systems | Demo mode flag |
| andyart-demo-session | demo-auth | Demo user session |
| aa_demo_session | demo-session | Legacy session |
| andyart_ops_session | auth.ts | Ops user session |
| andyart_ops_users | auth.ts | Ops user list |

---

### Issues Identified

1. **Duplicate Session Keys**: Both demo-auth and demo-session write to `aa_demo_mode`
2. **Duplicate Functionality**: demo-auth and demo-session have overlapping features
3. **Auth Consolidation Needed**: Should choose one demo auth system

---

### Recommended Action

**For Now (Maintenance Mode):** Keep both systems as-is since both are working.

**Future (Architecture):**
- Choose demo-auth.ts as canonical (more complete, has account system)
- Remove demo-session.ts
- Consolidate localStorage keys to single demo session

---

### Current Status: OPERATIONAL

Both auth paths work:
- Demo login on /auth/signin ✅
- Protected routes accessible ✅
- Session persistence works ✅
- No redirect loops ✅