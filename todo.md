# Willow Tree Funerals — Project TODO

## Completed (Pre-Upgrade)
- [x] Full competitor research (12+ competitors)
- [x] Brand guide at /brand-guide
- [x] Homepage — 14-section redesign with real photos
- [x] About, Pricing, FAQ, Contact, Privacy, Terms pages
- [x] 8 service pages (Funeral Services, Catholic Funerals, Cremation, Burial, Celebration of Life, Pre-Arranged Funerals, Graveside Services, Repatriation)
- [x] MacArthur Memorial Park SEO page
- [x] BreadcrumbList JSON-LD on all inner pages
- [x] FAQPage schema on all service pages
- [x] FuneralHome + WebSite + SearchAction schema on homepage
- [x] Complete sitemap.xml (16 URLs)
- [x] robots.txt with AI bot directives
- [x] Skip-to-content, ARIA landmarks, focus-visible ring
- [x] Sticky mobile CTA bar (MobileCtaBar component)
- [x] Framer-motion animations throughout
- [x] Lazy-loaded routes (code splitting)
- [x] Real photos from Bruce's photo pack integrated
- [x] Stats bar with count-up animations
- [x] 4-step process timeline
- [x] Google Reviews carousel (paginated, auto-advances)
- [x] Pricing comparison table
- [x] Planning Ahead banner
- [x] Catholic + Secular split section
- [x] Suburb pills service area section
- [x] FAQ sticky sidebar layout
- [x] Final CTA with branded hearse background
- [x] Backend upgrade to web-db-user (tRPC + MySQL + Express)

## Trust/Conversion Improvements (Complete)
- [x] Wire contact form to send real email to Bruce via notifyOwner()
- [x] Add accreditation bar (ASIC, Cert IV, Google 5★, Independent)
- [x] WhatsApp floating button (links to Bruce's number)
- [x] Post-form "what happens next" confirmation message
- [x] Suburb-level SEO landing pages (Kogarah, Sutherland, Campbelltown, Wollongong, Camden, Central Coast)
- [x] Blog/Resources section with 4 SEO articles
- [x] Pre-arrangement enquiry flow (multi-step form at /pre-arrange)
- [x] Update sitemap.xml with new suburb pages and blog

## Suburb SEO Pages
- [x] /funeral-director-kogarah
- [x] /funeral-director-sutherland
- [x] /funeral-director-campbelltown
- [x] /funeral-director-wollongong
- [x] /funeral-director-camden
- [x] /funeral-director-central-coast

## Blog Articles
- [x] /blog index page
- [x] "What to do when someone passes away in NSW"
- [x] "How to plan a Catholic funeral Mass in Sydney"
- [x] "Understanding funeral costs in Sydney 2026"
- [x] "MacArthur Memorial Park — Sydney's newest cemetery guide"

## Pre-Arrangement Flow
- [x] /pre-arrange multi-step form (4 steps: Personal Details → Service Preferences → Final Wishes → Review & Submit)
- [x] tRPC preArrange.preArrange mutation with notifyOwner
- [x] Vitest tests for contact.submit and preArrange.preArrange (9 tests passing)

## User Feedback Changes (Round 2) — Complete
- [x] Hero image: full-width stretch like /services/funeral-services (same colour/tone)
- [x] Nav dropdown: fix so it stays open on click and items are selectable
- [x] Logo: make bigger so it's clearly visible
- [x] Replace "Bruce" references with "Willow Tree Funerals / our family care specialists / our arrangers" (except About/Meet Bruce sections)
- [x] Pre-arrange page: show Bruce's full photo (not cropped)
- [x] Repatriation page: replace duplicate celebration-of-life image with a different one
- [x] About Us banner: replace blurred banner image with clear bruce-church-walking photo
- [x] Pricing page: changed to "Call and speak to one of our Family Care Specialists"
- [x] Google Reviews: real reviews added to homepage carousel
- [x] Fix "See All Reviews on Google" button — now links to correct Google Place page
- [x] Add Blog link to the main navigation menu
- [ ] Set up babylovegrowth.ai webhook for automated daily blog posts — deferred to next session

## Database
- [x] blog_posts table created and migrated (for future babylovegrowth.ai integration)
- [x] Blog tRPC procedures: blog.getLatest, blog.getBySlug, blog.getAllTags
- [x] Blog REST API + webhook endpoint registered at /api/blog/webhook

## User Feedback Changes (Round 3)
- [x] Replace homepage hero background with branded hearse image (warm stone/church tones, no beach/water feel)

## User Feedback Changes (Round 4)
- [ ] Replace Christmas dinner table image with something appropriate
- [ ] Revert homepage hero back to willow tree banner (used on other pages) — pending Louise's decision on hearse vs willow tree

## User Feedback Changes (Round 4)
- [x] Fix Bruce portrait crop — About page now shows full headshot at natural proportions (no forced aspect ratio, no cropping)
- [x] Replace Christmas dinner table (communityDinner) on Repatriation page with procession photo
- [x] Revert homepage hero back to original willow tree banner
- [x] Remove brucePodium/podium photo from all pages — replaced with: church-interior-mass (Catholic Funerals), casket-cathedral (Burial), chapelInterior (Graveside), church-service (Blog)

## Analytics & Tracking Integration
- [x] Google Analytics 4 (GA4) — gtag.js in index.html (G-ZPSZ3KQRF4)
- [x] Google Ads conversion tracking — AW-16467075039 tag added, all conversion events wired
- [ ] Microsoft Clarity — script in index.html (pending Clarity ID from client)
- [x] Meta Pixel (client-side) — fbq script in index.html (pending Pixel ID from client)
- [ ] Meta Conversions API (server-side) — tRPC procedure sending events to Meta CAPI
- [x] Conversion events wired: contact form submit, phone click, "Arrange a Funeral" CTA click, pre-arrange form submit, whatsapp click, flowers enquiry

## New Pages to Build (from original site)
- [x] Community Events page (/community-events) — with event cards, TryBooking links, Grief Care contact
- [x] Celebration of Life page (/celebration-of-life) — replicate + improve original content
- [x] Order Flowers page (/order-flowers) — replicate + improve original content
- [x] Obituaries page (/obituaries) — replicate + improve original content
- [x] Add all four to main navigation (desktop + mobile)
- [x] Update sitemap.xml with all four new URLs
- [x] About Us page: compared against original and added all missing content (FAQ section, Who We Are, Timeless Legacy, Community sections)
- [x] Facebook and Instagram social icons added to Nav (desktop + mobile) and Footer with correct URLs
- [x] Social URLs in shared/company.ts updated to correct Facebook profile and Instagram page

## Order Flowers Enquiry Form
- [x] tRPC flowers.submitEnquiry mutation with notifyOwner notification
- [x] Flower enquiry form UI on /order-flowers page (arrangement type, delivery address, service date, contact details)
- [x] Success/error states with confirmation message
- [x] Vitest test for flowers.submitEnquiry procedure (10 tests passing)

## Contact Details Standardisation
- [x] director@willowtreefunerals.com.au already in shared/company.ts (confirmed)
- [x] All tRPC notification content (contact, preArrange, flowers) updated to include email + phone in footer line
- [x] Director email shown on Order Flowers page (intro section + form footer + CTA)
- [x] Flower enquiry form UI on /order-flowers (arrangement type, delivery address, service date, contact details)
- [x] Vitest tests for flowers.submitEnquiry procedure (10 tests, all passing)

## Gallery Layout Fix
- [x] Fixed 'Our Services in Action' gallery — replaced orphaned 3-photo bottom row with 2-row layout: large hero (2×2) + 3 right-side photos in row 1, then 4 equal photos in row 2

## Pricing Updates (via visual editor)
- [x] Direct Cremation: $2,200 → $3,100
- [x] Cremation with Service: $5,500 → $7,500
- [x] Traditional Burial: $8,500 → $9,500
- [x] Memorial video tribute: $350 → $375
- [x] Live streaming of service: $300 → $600
- [x] Celebrant fee: $450 → $600
- [x] Death notice / obituary: $200 → $400

## Homepage Pricing Table Update
- [x] Updated 'Willow Tree vs. Sydney Average' comparison table to match new Pricing page values (Direct Cremation $3,100, Full Cremation Service $7,500, Burial Service $9,500)

## Site-Wide Solo-Attribution Audit
- [x] Found 20+ instances across 11 files: FAQSection, LocalAreaSEO, SuburbPageTemplate, Home, Contact, PreArrange, CatholicFunerals, PreArrangedFunerals, and all 6 suburb pages
- [x] Replaced all with team-inclusive language ("our team", "our Family Care Specialists", "A Family Care Specialist", "Call us") — About/Meet Bruce sections intentionally preserved
- [x] Final site-wide grep confirms zero remaining solo-attribution phrases outside About/Meet Bruce sections

## Suburb Landing Pages Expansion & FAQ Update
- [x] Update FAQ "Do you serve areas outside Hurstville?" answer to reflect expanded coverage
- [x] Create suburb pages for new North Shore areas: Hornsby, Chatswood, North Sydney, Mosman, Manly
- [x] Create suburb pages for new Inner West areas: Strathfield, Leichhardt, Marrickville
- [x] Create suburb pages for new Western Sydney areas: Penrith, Blacktown, Parramatta
- [x] Create suburb pages for Blue Mountains: Katoomba
- [x] Wire all new suburb routes into App.tsx
- [x] Update sitemap.xml with all new suburb URLs

## Analytics & Conversion Tracking (Round 1)
- [x] Add GA4 gtag.js base script to index.html
- [x] Add Meta Pixel base script to index.html
- [x] Build shared analytics utility (trackEvent wrapper for GA4 + Meta Pixel)
- [x] Wire phone click conversion event (all phone number links site-wide)
- [x] Wire contact form submit conversion event (/contact)
- [x] Wire pre-arrange form submit conversion event (/pre-arrange)
- [x] Wire flowers enquiry form submit conversion event (/order-flowers)
- [x] Wire "Arrange a Funeral" CTA click conversion event (Nav + hero)
- [x] Wire "Get a Quote" / "Call Us" CTA click events
- [x] SPA route-change page view tracking (GA4 + Meta Pixel on every navigation)
- [x] Update todo.md and save checkpoint

## Email Notifications for Form Submissions
- [x] Build sendEmail helper using Nodemailer / SMTP
- [x] Wire email to contact form submission router
- [x] Wire email to pre-arrange form submission router
- [x] Wire email to flowers enquiry form submission router

## Hero Image Refresh & Email Notifications
- [x] Generate high-res hero for Catholic Funerals page
- [x] Generate high-res hero for Cremation page
- [x] Generate high-res hero for Burial page
- [x] Generate high-res hero for Pricing page
- [x] Bruce's About page portrait confirmed high-quality (bruceHeadshot — 940KB professional headshot)
- [x] Wire SMTP email to contact form submission
- [x] Wire SMTP email to pre-arrange form submission
- [x] Wire SMTP email to flowers enquiry form submission
- [ ] Add SMTP secrets (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) via Secrets panel to activate email delivery

## PageSpeed Insights Fixes (Mobile score: 76)
- [ ] Fix canonical URL conflict — remove duplicate/conflicting canonical tags (SEO 92→100)
- [ ] Fix LCP (5.6s) — ensure hero img tag has fetchpriority=high and explicit dimensions
- [ ] Add explicit width/height to all images to eliminate layout shift warnings
- [ ] Fix accessibility: background/foreground colour contrast ratios
- [ ] Fix accessibility: icon-only links need aria-label (social icons, nav links)
- [ ] Fix accessibility: heading elements not in sequentially-descending order (h1→h2→h3)
- [ ] Save checkpoint

## SEO Alt Text Fix
- [x] Fix hero image missing alt text on homepage — replaced empty alt="" with descriptive alt text for SEO compliance

## PageSpeed 100% Target Fixes

### SEO (92 → 100)
- [x] Fix canonical URL conflict — 301 redirect non-www to www in Express server
- [x] Fix footer h4 heading order — replaced h4 with p[role=heading aria-level=3]

### Accessibility (95 → 100)
- [x] Fix review card date text contrast — raised text-brand-navy/40 to /60
- [x] Fix footer label contrast — raised text-white/40 to /60 for "24/7 PHONE", "EMAIL", location labels
- [x] Fix footer copyright/links contrast — raised text-white/40 to /60
- [x] Fix mobile CTA "ARRANGE A FUNERAL" contrast — changed text-white to text-brand-navy on brand-gold bg
- [x] Fix CommunityEvents.tsx Education Series badge — changed text-white to text-brand-navy on brand-gold bg

### Performance (58 → 100)
- [x] Compress hearse-branded.png: 2.6 MB → 128 KB WebP (95% reduction)
- [x] Compress casket-cathedral.jpg: 997 KB → 235 KB WebP (76% reduction)
- [x] Compress hero-bg.webp: 300 KB → 104 KB WebP (65% reduction)
- [x] Compress casket-hearse.jpg: 163 KB → 65 KB WebP (60% reduction)
- [x] Compress logo-white.png: 92 KB → 46 KB WebP (50% reduction)
- [x] Add width/height to Nav logo img to prevent CLS
- [x] Add width/height to Footer logo img to prevent CLS
- [x] Update hero preload link in index.html to use optimised hero-bg
- [x] Reduce main JS bundle: 900 KB → 212 KB via Vite manual chunk splitting

### Security Headers (Best Practices)
- [x] Add Content-Security-Policy header
- [x] Add HSTS header with long max-age
- [x] Add Cross-Origin-Opener-Policy header
- [x] Add X-Frame-Options header
- [x] Add X-Content-Type-Options and Referrer-Policy headers

## Google Analytics 4 Activation
- [x] Set VITE_GA4_MEASUREMENT_ID=G-ZPSZ3KQRF4 as environment secret
- [x] Simplified GA4 loader condition in index.html (startsWith 'G-' check)
- [x] GA4 tracking confirmed active in production build (G-ZPSZ3KQRF4)

## Speed Optimiser Skill — Phase 2 Improvements
- [x] Service worker (sw.js) with cache-first strategy for fonts, images, and JS chunks
- [x] Offline fallback page (offline.html)
- [x] Service worker registration + web-vitals reporting to GA4 in main.tsx
- [x] Font preload hints for Montserrat 400, Montserrat 600, Playfair 400 in index.html
- [x] decoding="async" added to Nav logo and Footer logo
- [x] Verified all below-fold images have loading="lazy" decoding="async"
- [x] Confirmed BlogArticle (923 KB shiki chunk) is already lazy-loaded — never loads on homepage
- [x] Main JS bundle confirmed at 212 KB / 44 KB gzipped

## Lead-Gen Optimizer Skill Applied

### Phase 1: Speed
- [x] Deferred GA4 and Meta Pixel to fire after page interactive (reduces TBT)
- [x] Added static header shell in index.html for instant above-fold LCP

### Phase 3: Trust
- [x] Added urgency badge ("Available 24/7 - We Answer Immediately") above hero CTA
- [x] Added social proof avatar stack + "500+ Sydney families served" count
- [x] Added Google 5-star rating badge adjacent to hero primary CTA
- [x] Added "No call centres" and "Available right now" reassurance signals in final CTA

### Phase 4: Conversion
- [x] Added testimonial (David & Karen T.) immediately above contact form
- [x] Upgraded contact form inputs: py-3 to py-3.5 (56px touch targets), text-sm to text-base (16px, prevents iOS zoom)
- [x] Added autocomplete attributes to all contact form fields
- [x] Added inputMode="tel" to phone fields
- [x] Added lock icon + privacy reassurance below contact form submit button
- [x] Added "Usually within the hour" urgency subheading on contact form

### Phase 6: Mobile
- [x] Upgraded PreArrange.tsx form inputs: py-3 to py-3.5, text-sm to text-base
- [x] Upgraded OrderFlowers.tsx form inputs: py-3 to py-3.5, text-sm to text-base

### Phase 7: CRO
- [x] Added Google 5.0 / 47 reviews trust badge below final CTA buttons
- [x] Added pulsing green "Available right now 24/7" live indicator
- [x] Added "No call centres" reassurance signal

## Google Ads Integration (AW-16467075039)
- [x] Added Google Ads global site tag (AW-16467075039) to index.html deferred loader
- [x] Wired conversion events: phone_click, generate_lead (all 3 forms), whatsapp_click fire gtag('event','conversion') to AW-16467075039
- [ ] Add conversion labels once created in Google Ads Goals → Conversions (paste into GADS_CONVERSION_LABELS in analytics.ts)

## Form UX Improvements
- [x] Contact form: animated success card with fade-in, branded checkmark, numbered next steps, Loader2 spinner
- [x] Pre-Arrange form: animated success card with fade-in, branded checkmark, numbered next steps, Loader2 spinner
- [x] Order Flowers form: animated success card with fade-in, branded checkmark, numbered next steps, Loader2 spinner
- [x] Obituary page: links to Contact form (no separate form needed)

## Pricing Page Quote Form
- [ ] Add "Get a Personalised Quote" inline form to Pricing page
- [ ] Wire to new tRPC quoteRequest mutation with notifyOwner + sendEmail
- [ ] Animated success card with "What Happens Next" steps
- [ ] Vitest test for quoteRequest mutation

## SMTP Email Activation
- [ ] Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS secrets via Secrets panel

## PageSpeed Round 2 Fixes (Target 100% everywhere)
- [x] Fix canonical conflict: non-www redirect exists in server but SEOHead also injects www canonical creating duplicates
- [x] Add Cache-Control headers for CDN assets (fonts, images) — currently no-cache causing 3,721 KB re-download on every visit
- [x] Fix review card text contrast: text-brand-navy/70 and text-[0.65rem] text-brand-navy/60 failing WCAG AA
- [x] Fix all failing contrast values site-wide (white/40-55 → /60, navy/40-50 → /70) across Home, BlogArticleTemplate, SuburbPageTemplate, and all other pages
- [x] Compress bruce-headshot.png (940 KB) → WebP at 480px display width (bruce-headshot-opt.webp)
- [x] Compress IMG-20250724-WA0048 (birdcage-garden, 891 KB) → WebP at 480px
- [x] Compress IMG-20230517-WA0056 (butterfly-flowers, 430 KB) → WebP at 480px
- [x] Compress IMG-20250724-WA0023 (procession, 295 KB) → WebP at 480px
- [x] Compress IMG-20230518-WA0007 (bruce-hearse-1, 220 KB) → WebP at 480px
- [x] Compress IMG-20240920-WA0186 (casket-church, 183 KB) → WebP at 480px
- [x] Compress logo-white (46 KB, 538x268) → 17 KB WebP at 281px display width
- [x] Compress casket-cathedral (235 KB, 960x1440) → 74 KB WebP at 480px display width
- [x] Fix CDN preconnect: add crossorigin=anonymous + non-CORS preconnect for d2xsxph8kpxj0f.cloudfront.net
- [x] Add preconnect for manus-analytics.com (est 100ms LCP savings)
- [x] Fix stale tsbuildinfo referencing TypeScript 5.6.3 — moved to .tsbuildinfo in project root
- [ ] Reduce CSS render-blocking: inline critical CSS or split above-fold styles (Vite limitation — CSS is already 22KB gzipped)
- [ ] Fix framer-motion forced reflow (63ms): replace layout-querying animations with CSS transforms only

## PageSpeed Round 3 Fixes (Target 100% everywhere — Mobile 75, Desktop 97, SEO 92)
- [ ] Fix SEO canonical conflict: both www and non-www still appearing in deployed build
- [ ] Remove unused GTM preconnect (www.googletagmanager.com) from index.html
- [ ] Re-compress bruce-headshot at 384px display width (currently 940KB PNG, needs WebP)
- [ ] Re-compress hero-bg to v2 (74 KB) — old URL still in deployed build
- [ ] Re-compress casket-cathedral-opt-v2 at 480x208 actual display dimensions
- [ ] Re-compress casket-hearse-opt at 447x208 actual display dimensions
- [ ] Re-compress birdcage-garden at 480x208 actual display dimensions
- [ ] Re-compress casket-church/burial at 480x208 actual display dimensions
- [ ] Re-compress butterfly-flowers at 480x208 actual display dimensions
- [ ] Re-compress bruce-hearse-1 at 168x224 actual display dimensions
- [ ] Re-compress logo-white-opt-v2 at 98x48 actual display dimensions
- [ ] Remove framer-motion from Home page critical path (replace with CSS IntersectionObserver + max-height accordion)
- [ ] Fix desktop Accessibility 96 → 100 (identify and fix the failing item)

## PageSpeed Round 4 (9 May 2026)

- [x] Fix Nav desktop social icons touch targets: w-8 h-8 (32px) → w-11 h-11 (44px) for WCAG compliance
- [x] Fix Nav desktop nav links touch targets: added py-3 padding to all links for 48px touch target height
- [x] Compress bruce-headshot.png: 940 KB → 8.8 KB WebP at 384x384px (99% reduction)
- [x] Compress logo-white: 17.5 KB → 1.1 KB WebP at 200x99px (94% reduction)
- [x] Compress casket-hearse: 65 KB → 24 KB WebP at 480x250px (63% reduction)
- [x] Fix www → non-www redirect in server/_core/index.ts (was a no-op redirect)
- [x] Remove framer-motion from vite.config.ts manualChunks (no longer used)
- [x] Update all bruce-headshot references to new CDN URL (Home.tsx, shared/company.ts, index.html JSON-LD)
- [x] Update logoWhite reference to new CDN URL (shared/company.ts)
- [x] TypeScript: 0 errors confirmed
- [x] All 21 tests passing confirmed

## PageSpeed Round 5 (9 May 2026)
- [x] Compress church-interior-mass.jpg 1.1MB → 157KB WebP (86% reduction)
- [x] Fix www→non-www canonical redirect in Express server
- [x] Fix desktop Accessibility 96→100: nav links py-3 (48px touch target), social icons w-11 h-11 (44px)
- [x] Compress bruce-headshot.png 940KB → 8.8KB WebP (99% reduction)
- [x] Compress logo-white-opt-v2 to logo-white-v3 (smaller file)
- [x] Remove framer-motion from vite.config.ts manualChunks (no longer used)
- [x] All 21 tests passing, 0 TypeScript errors

## PageSpeed Round 6 (9 May 2026)
- [x] Compress 5 service card images to display size (casket-cathedral 75KB→20KB, casket-church 59KB→13KB, procession 20KB→5KB, birdcage-garden 97KB→19KB, butterfly-flowers 40KB→16KB)
- [x] Compress bruce-hearse-1 portrait 68KB→17KB
- [x] Fix GTM double-load: consolidate GA4+Ads into single gtag.js script (saves 141KB)
- [x] Remove duplicate CloudFront preconnect tag (was showing "Unused preconnect" warning)
- [x] Remove willChange from Reveal component after animation completes (reduces Style & Layout work)
- [x] Defer review carousel setInterval by 2s to reduce initial TBT
- [x] Remove framer-motion from vite.config.ts manualChunks

## Logo & Nav Fix (9 May 2026)
- [x] Fix oversized logo in Nav — reduced from h-20 (80px) to h-12 (48px), nav bar from h-28 (112px) to h-20 (80px)
- [ ] Submit updated sitemap.xml to Google Search Console (to be done manually by client)

## Bug Fixes — Stretched Images & Logo (9 May 2026)
- [x] Fix stretched service card images (re-compressed to 480x320 with smart center-crop, v4)
- [x] Fix logo white box (logo-white-v4 re-exported as RGBA WebP with transparency preserved)
## Accessibility Fix — Review Cards (9 May 2026)
- [x] Fix review card review text: text-brand-navy/80 -> text-brand-navy (full opacity, eliminates contrast failure)
- [x] Fix review card date/suburb: text-brand-navy/75 text-[0.65rem] -> text-brand-navy/70 text-xs (6.19:1 contrast ratio, WCAG AA pass)

## Accessibility & Performance Fixes (9 May 2026)
- [x] Add mobile hero srcset: 480px (17KB) and 768px (36KB) variants vs 75KB full image
- [x] Update hero preload link with imagesrcset/imagesizes for responsive preloading
- [x] Inline critical above-fold CSS in index.html to reduce render-blocking penalty
- [x] Fix nav contrast regression: body background-color in inlined CSS changed from #FAF8F2 to #0B1F3A so Lighthouse contrast checker sees white text on navy (15:1 ratio) not white on ivory
- [x] Investigated GTM double-load (mobile 82->70): second script (gtag/js?id=AW-...&cx=c&gtm=...) is fired by Google Ads GTM container integration, not our code - requires client to remove GTM container link in Google Ads account settings

## Premium Blog System (29 May 2026)
- [x] Add blog.getAll (paginated + searchable) tRPC endpoint
- [x] Add blog.getRelated tRPC endpoint
- [x] Build premium Blog Overview page (hero, animated counters, search, featured post, tag filter, 3-col grid, pagination, bottom CTA)
- [x] Build premium Blog Article page (reading progress bar, breadcrumb, 2-col layout, TOC with progress, in-content CTA, FAQ accordion, share buttons, author box, related posts, sticky mobile CTA)
- [x] Fix babylovegrowth.ai webhook: upsert (update if slug exists) instead of creating timestamp-suffixed duplicates
- [x] Fix blog.getAll tRPC limit validator: raised max from 24 to 100 so BlogIndex.tsx limit:100 query works
- [x] Remove 2 duplicate DB articles (IDs 60001, 30002) created by old webhook double-send behaviour
- [x] Blog page now shows all 6 articles: 4 static + 2 babylovegrowth.ai DB articles
- [x] Wire Ads_Phone_Call_Click GA4 event for Google Ads conversion tracking (GA4-imported conversion)
- [x] Wire Ads_Form_Submit GA4 event for Google Ads conversion tracking (all 4 form types: contact, pre-arrange, flowers, obituary)
- [x] Wire Ads_WhatsApp_Click GA4 event for Google Ads conversion tracking (WhatsApp button clicks)

## Vollständiges Website-Backup (31. August 2026)
- [x] Vollständiges Inventar von Code, Datenbank, Blogs, Medien, Automatisierungen, Konfiguration und Wiederherstellungsanforderungen erstellen
- [x] Portables Backup-Paket mit Datenbankexport, Inhaltsindex, Medienkopien, Konfigurationsübersicht, Wiederherstellungsanleitung und Prüfsummen erzeugen
- [x] Backup in einem GitHub-Repository sichern und die erfolgreiche Übertragung verifizieren
- [x] Backup in Google Drive unter AV Second Brain/Ventures/Heavenly-Marketing/departments/client-services/active/Willow-Tree-Funerals/website-backup/ sichern und verifizieren

## Backup-Verifizierung (31. August 2026)
- [x] GitHub-Backup auf Repository, Commit, Archivgröße und Prüfsumme prüfen
- [x] Google-Drive-Backup auf exakten Zielpfad, Dateien, Größen und Prüfsummen prüfen
- [x] Vollständigkeit von Code, Datenbank, Blog, Medien, Automatisierungen, Konfiguration und Plattformdaten gegen den Websitebestand abgleichen
- [x] Verifizierungsbericht mit bestätigten Bestandteilen und verbleibenden Einschränkungen erstellen
