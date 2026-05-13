# AA_STEP_16D - RUNTIME_BASELINE_REPORT.md

## Execution Date: 2026-05-13
## Environment: Production Mode (npm run start)

---

## BUILD STATUS
- **Result**: SUCCESS
- **Routes Compiled**: 68
- **First Load JS**: 87.5 kB shared

---

## ROUTE TEST RESULTS

### Public Surface (PASS)
| Route | Status | Notes |
|-------|--------|-------|
| / | 200 OK | Homepage renders |
| /gallery | 200 OK | Gallery listing |
| /artists | 200 OK | Artists listing |
| /events | 200 OK | Events listing |
| /enterprise | 200 OK | Enterprise landing |
| /journal | 200 OK | Journal listing |
| /services | 200 OK | Services listing |
| /spaces | 200 OK | Spaces listing |
| /circle | 200 OK | Circle listing |
| /consult | 200 OK | Consult listing |
| /partners | 200 OK | Partners listing |
| /viewing-rooms | 200 OK | Viewing rooms listing |

### Protected/Dashboard Surface (PASS)
| Route | Status | Notes |
|-------|--------|-------|
| /ops/crm | 200 OK | CRM dashboard |
| /ops/payments | 200 OK | Payments dashboard |
| /collector | 200 OK | Collector dashboard |
| /auth/signin | 200 OK | Sign in page |
| /artists/portal | 200 OK | Artist portal |
| /system-access | 200 OK | System access page |

### Dynamic Routes (PARTIAL FAILURE)
| Route | Status | Notes |
|-------|--------|-------|
| /artists/pablo-picasso | 200 OK | Artist detail works |
| /gallery/sculpture | **500 ERROR** | **CRASH - Internal Server Error** |

### Route Failures
| Route | Status | Root Cause |
|-------|--------|------------|
| /ops | 404 | No base ops route defined |
| /gallery/sculpture | 500 | Server-side crash |

---

## OBSERVATIONS

### Critical Issues
1. `/gallery/[slug]` dynamic route returns 500 - crashes on actual gallery item access
2. `/ops` returns 404 - no base operational dashboard (subroutes work)

### Runtime Verification Method
- Production server started via `npm run start`
- HTTP status codes captured via Invoke-WebRequest
- Full HTML response verified for homepage

---

## NEXT STEPS
1. Investigate /gallery/sculpture 500 error
2. Continue full public surface walkthrough
3. Test all dynamic routes
4. Validate auth flows