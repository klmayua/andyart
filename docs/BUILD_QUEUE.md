# BUILD QUEUE — AndyArt Cultural House

**Audit Date:** 2026-05-09  
**Project:** AndyArt Next.js 14 + Prisma + Stripe + NextAuth

---

## P0 — CRITICAL (Revenue Blocking / User Dead-Ends)

| # | Item | Type | Business Impact | Effort | File Path(s) | Action |
|---|------|------|-----------------|--------|--------------|--------|
| 1 | **Journal article links are all dead** | Broken Link | Every journal CTA is a dead anchor | Low | `src/app/journal/page.tsx` | Build `/journal/[slug]` or remove links |
| 2 | **Artist detail pages missing** | Missing Route | 5+ files link to non-existent artist profiles | Medium | `src/app/artists/[slug]` | Build dynamic artist profile page |
| 3 | **Viewing room detail pages missing** | Missing Route | List page links to non-existent detail | Medium | `src/app/viewing-rooms/[slug]` | Build dynamic viewing room page |
| 4 | **Consultation form submits to nowhere** | Dead Form | Lead capture completely broken | Low | `src/app/consult/page.tsx` | Connect to API or email service |
| 5 | **Host event form submits to nowhere** | Dead Form | Event lead capture broken | Low | `src/app/events/host/page.tsx` | Connect to API or email service |
| 6 | **Artwork inquiry modal has no handler** | Dead Form | Purchase intent discarded | Low | `src/app/gallery/[slug]/page.tsx` | Add onSubmit handler + API |
| 7 | **Dynamic detail pages use hardcoded data** | Stub | `/gallery/[slug]`, `/events/[slug]`, `/services/[slug]` show same content regardless of URL | Medium | 3 files | Connect to Prisma/API for real data |
| 8 | **ServiceDetailPage broken Tailwind classes** | Broken CSS | `text-text-primary`, `bg-surface`, `shadow-large` are undefined | Low | `src/app/services/[slug]/page.tsx` | Replace with valid Tailwind classes |
| 9 | **EventDetailPage broken Tailwind classes** | Broken CSS | Same undefined classes | Low | `src/app/events/[slug]/page.tsx` | Replace with valid Tailwind classes |
| 10 | **NextAuth accepts any email** | Security | CredentialsProvider has no password validation | Low | `src/lib/auth.ts` | Add password check or remove credentials provider |

## P1 — CORE BUSINESS (Commerce + Experience)

| # | Item | Type | Business Impact | Effort | File Path(s) | Action |
|---|------|------|-----------------|--------|--------------|--------|
| 11 | **Cart / Checkout frontend** | Missing Feature | Stripe API exists but no cart UI | High | New: `/cart`, `/checkout`, `/checkout/success`, `/checkout/cancel` | Build full cart + checkout flow |
| 12 | **Stripe webhook handler** | Missing API | No post-payment fulfillment (orders, emails) | Medium | New: `/api/webhooks/stripe` | Build webhook route |
| 13 | **Profile settings form** | Dead Form | Save Changes button does nothing | Low | `src/app/profile/page.tsx` | Connect to user update API |
| 14 | **About page** | Missing Page | No brand story, team, mission | Low | New: `/about` | Build about page |
| 15 | **Contact page** | Missing Page | No dedicated contact form | Low | New: `/contact` | Build contact page with form |
| 16 | **FAQ page** | Missing Page | No collector support content | Low | New: `/faq` | Build FAQ page |
| 17 | **Newsletter signup** | Missing Feature | No email capture anywhere | Low | New: Newsletter component + API | Add footer capture + popup |
| 18 | **Replace hardcoded data with Prisma** | Data Layer | Most pages use static mock data | High | All listing pages | Connect pages to `/api/artworks` and Prisma |
| 19 | **Real WhatsApp number** | Config | Placeholder numbers in use | Low | `.env`, `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/consult/page.tsx` | Update to real business number |
| 20 | **Search functionality** | Missing Feature | No site search | Medium | New: Search component + API | Add search bar + results page |

## P2 — GROWTH (Engagement + Retention)

| # | Item | Type | Business Impact | Effort | File Path(s) | Action |
|---|------|------|-----------------|--------|--------------|--------|
| 21 | **Commission request flow** | Missing Feature | No commission backend | Medium | New: `/commissions`, `/api/commissions` | Build commission form + tracking |
| 22 | **Private viewing booking** | Missing Feature | No booking backend | Medium | New: `/api/bookings/viewing` | Build booking form + calendar |
| 23 | **Membership payment** | Missing Feature | No Stripe subscription integration | Medium | New: `/api/subscriptions` | Build tier checkout + billing portal |
| 24 | **Collector dashboard** | Missing Feature | No order history, no saved preferences | Medium | Extend: `/profile` | Add orders tab, preferences |
| 25 | **Email service integration** | Missing Service | No transactional emails | Medium | New: Email service + templates | SendGrid/Resend integration |
| 26 | **Analytics** | Missing Service | No visitor tracking | Low | New: Google Analytics / Plausible | Add tracking code |
| 27 | **Image upload** | Missing Feature | No artwork image management | Medium | New: Upload component + API | Cloudinary SDK integration |
| 28 | **Admin dashboard** | Missing Feature | No content management | High | New: `/admin` | Build admin UI with CRUD |
| 29 | **Review/Rating system** | Missing Feature | No social proof | Medium | New: Review component + API | Build review form + display |
| 30 | **Social sharing** | Missing Feature | No share buttons | Low | New: Share component | Add to artwork + article pages |

## P3 — POLISH (UX + Performance + Accessibility)

| # | Item | Type | Business Impact | Effort | File Path(s) | Action |
|---|------|------|-----------------|--------|--------------|--------|
| 31 | **Loading states** | UX | No skeletons or spinners | Low | All pages | Add `loading.tsx` + skeletons |
| 32 | **Error handling** | UX | No error boundaries | Low | All pages | Add `error.tsx` + boundaries |
| 33 | **404 page** | UX | Default Next.js 404 | Low | New: `not-found.tsx` | Build custom 404 |
| 34 | **BottomNav HTML fix** | Accessibility | Invalid nested interactive elements | Low | `src/components/BottomNav.tsx` | Restructure button/link nesting |
| 35 | **Filter functionality** | UX | Gallery/event/journal filters are visual-only | Medium | `src/app/gallery/page.tsx`, etc. | Implement real filtering |
| 36 | **Forgot password** | Auth | No password reset flow | Low | New: `/auth/forgot-password` | Build reset flow |
| 37 | **User registration** | Auth | No signup page | Low | New: `/auth/signup` | Build registration page |
| 38 | **Accessibility audit** | Compliance | No ARIA labels, focus management | Medium | All components | Full a11y pass |
| 39 | **Performance optimization** | SEO | Large images, no lazy loading on some | Medium | All pages | Image optimization, code splitting |
| 40 | **SEO meta tags** | SEO | Generic metadata only | Low | All pages | Dynamic meta per page |
| 41 | **Sitemap** | SEO | No sitemap.xml | Low | New: `sitemap.ts` | Generate sitemap |
| 42 | **Robots.txt** | SEO | No robots.txt | Low | New: `robots.ts` | Generate robots.txt |
| 43 | **Referral program** | Growth | No referral system | Medium | New: Referral component + API | Build referral flow |
| 44 | **Gift cards** | Revenue | No gifting feature | Medium | New: `/gift-cards` | Build gift card purchase + redeem |
| 45 | **Press page** | Brand | No media kit | Low | New: `/press` | Build press page |
| 46 | **Careers page** | Brand | No jobs listing | Low | New: `/careers` | Build careers page |
| 47 | **Shipping policy** | Trust | No delivery info | Low | New: `/shipping` | Build shipping page |
| 48 | **Returns policy** | Trust | No return info | Low | New: `/returns` | Build returns page |
| 49 | **Component extraction** | Maintainability | Inline patterns duplicated | Medium | All pages | Extract reusable components |
| 50 | **Remove build error suppression** | Quality | `ignoreBuildErrors: true` masks issues | Low | `next.config.js` | Fix TS errors, remove suppression |

---

## Execution Order Recommendation

### Week 1 — P0 Critical Fixes
1. Fix journal article links (remove or build detail pages)
2. Fix broken Tailwind classes on dynamic pages
3. Connect consultation form to API
4. Connect host event form to API
5. Add inquiry modal submit handler
6. Fix NextAuth credentials security

### Week 2 — P1 Core Business
7. Build `/artists/[slug]` dynamic page
8. Build `/viewing-rooms/[slug]` dynamic page
9. Build `/about` page
10. Build `/contact` page
11. Build `/faq` page
12. Add newsletter signup
13. Update WhatsApp number

### Week 3 — P1 Commerce
14. Build `/cart` page
15. Build `/checkout` page
16. Build `/checkout/success` and `/checkout/cancel`
17. Build Stripe webhook handler
18. Connect dynamic detail pages to Prisma data

### Week 4 — P2 Growth
19. Add search functionality
20. Build commission request flow
21. Build private viewing booking
22. Integrate email service
23. Add analytics

### Week 5+ — P3 Polish
24. Add loading states
25. Add error boundaries
26. Build custom 404
27. Accessibility audit
28. Performance optimization
29. Component extraction
30. Admin dashboard

---

*End of BUILD_QUEUE.md*
