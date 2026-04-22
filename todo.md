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
