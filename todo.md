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
- [ ] Google Analytics 4 (GA4) — gtag.js in index.html
- [ ] Google Ads conversion tracking — linked to GA4 or standalone AW tag
- [ ] Microsoft Clarity — script in index.html
- [ ] Meta Pixel (client-side) — fbq script in index.html
- [ ] Meta Conversions API (server-side) — tRPC procedure sending events to Meta CAPI
- [ ] Conversion events wired: contact form submit, phone click, "Arrange a Funeral" CTA click, pre-arrange form submit

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
