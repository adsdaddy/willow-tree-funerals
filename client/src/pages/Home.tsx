/**
 * Home.tsx — Willow Tree Funerals
 * Design: Modern editorial, Royal Blue + Periwinkle accent, Playfair Display serif
 * Philosophy: "Modern in design, traditional in values" — trust, status, reverence
 *
 * Sections:
 *  1. Hero — split editorial, bright willow tree image, tagline
 *  2. Stats bar — count-up numbers
 *  3. Process timeline — "How we help" 4-step journey (competitor improvement #1)
 *  4. Services grid — numbered cards
 *  5. About Bruce — asymmetric portrait
 *  6. Why Willow Tree — dark trust section
 *  7. Pricing trust section — transparent pricing comparison (competitor improvement #5)
 *  8. Catholic + Secular — split image faith section
 *  9. Planning Ahead banner — pre-arrangement CTA (competitor improvement #8)
 * 10. Google Reviews — auto-scroll carousel (competitor improvement #4)
 * 11. Photo gallery — real event photos
 * 12. Service areas — suburb pills (competitor improvement #7)
 * 13. FAQ accordion
 * 14. Final CTA — hearse background
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  Phone, ArrowRight, ChevronDown, ChevronUp, Star,
  CheckCircle2, Clock, Heart, Shield, MapPin, Calendar,
  Quote, ChevronLeft, ChevronRight,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { COMPANY } from "@/../../shared/company";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";

// ── CDN Assets ───────────────────────────────────────────────────────────────
const HERO_IMG        = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-bg-LSQmgP64pNExBCjB2t9kFG.webp";
const BRUCE_CHURCH    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-church-walking_upscaled_a1fa6d59.jpg";
const BRUCE_HEARSE_1  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20230518-WA0007_91c5c66b.jpg";
const HEARSE_BRANDED  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hearse-branded_c81955b1.png";
const CHURCH_MASS     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-interior-mass_upscaled_a84f50dd.jpg";
const CASKET_CATHEDRAL= "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";
const CASKET_CHURCH   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20240920-WA0186_e139bdc4.jpg";
const PRIEST_BLESSING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/Screenshot_20260409_124331_WhatsApp_upscaled_13fb4a7e.jpg";
const BAGPIPER        = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0006_596dbd5c.jpg";
const PROCESSION      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0023_bedffdad.jpg";
const BIRDCAGE_GARDEN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg";
const BUTTERFLY_FLOWERS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20230517-WA0056_b5a70d37.jpg";
const CASKET_HEARSE   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250509-WA0033_e419dfcf.jpg";
const PALLBEARERS     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0033_2dba725d.jpg";
const CASKET_YELLOW   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0034_ca7fe50f.jpg";
const BRUCE_HEARSE_2  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0042_de2b1b80.jpg";
const BRUCE_HEARSE_3  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0044_688d04e3.jpg";
const SERVICE_CHURCH  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20240920-WA0023_d520aec6.jpg";

// ── Animation helpers ─────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
function Reveal({
  children, delay = 0, className = "", from = "bottom",
}: {
  children: React.ReactNode; delay?: number; className?: string; from?: "bottom" | "left" | "right";
}) {
  const y = from === "bottom" ? 28 : 0;
  const x = from === "left" ? -28 : from === "right" ? 28 : 0;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1.6, suffix = "") {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * target) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, suffix]);
  return { ref, display };
}

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  { label: "Catholic Funerals", desc: "Coordinated with parish priests across St George, Sutherland Shire & South West Sydney.", href: "/services/catholic-funerals", img: CASKET_CATHEDRAL },
  { label: "Cremation Services", desc: "Dignified cremation with full ceremony options, tailored to your family's wishes.", href: "/services/cremation", img: CASKET_HEARSE },
  { label: "Burial Services", desc: "Traditional burial services at cemeteries across Sydney, Wollongong & the Central Coast.", href: "/services/burial", img: CASKET_CHURCH },
  { label: "Graveside Services", desc: "Intimate farewell ceremonies held at the graveside, led with care and reverence.", href: "/services/graveside", img: BIRDCAGE_GARDEN },
  { label: "Repatriation", desc: "Respectful transfer of your loved one to their home country, handled with precision.", href: "/services/repatriation", img: PROCESSION },
  { label: "Secular & Non-Religious", desc: "Meaningful celebrations of life for families of all beliefs and backgrounds.", href: "/services/secular-funerals", img: BUTTERFLY_FLOWERS },
];

const processSteps = [
  {
    number: "01",
    icon: Phone,
    title: "We Answer Your Call",
    desc: "Day or night, our Family Care Specialists answer immediately. No call centres, no queues — you speak directly with someone who cares.",
  },
  {
    number: "02",
    icon: Heart,
    title: "We Come to You",
    desc: "We meet you at home, at hospital, or wherever is most comfortable. We bring calm, clarity, and compassion to your door.",
  },
  {
    number: "03",
    icon: Shield,
    title: "We Handle Everything",
    desc: "From transfer and preparation to church liaison, cemetery coordination, and every detail in between — we take care of it all.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "You Focus On Healing",
    desc: "On the day, we ensure everything unfolds with dignity and grace. Your only role is to be present with the people you love.",
  },
];

const reviews = [
  { name: "Maria S.", suburb: "Hurstville", rating: 5, date: "2 weeks ago", text: "Bruce was absolutely wonderful. He guided our family through the most difficult time with such grace and professionalism. The Catholic Mass was perfectly coordinated and deeply moving.", initials: "MS" },
  { name: "David & Karen T.", suburb: "Sutherland", rating: 5, date: "1 month ago", text: "From the very first phone call at 2am, Bruce was calm, kind, and completely in control. He made an impossible situation feel manageable. We are forever grateful.", initials: "DT" },
  { name: "The Kowalski Family", suburb: "Campbelltown", rating: 5, date: "2 months ago", text: "We cannot speak highly enough of Willow Tree Funerals. Every detail was handled with such care and dignity. Bruce treated our father as if he were his own family.", initials: "KF" },
  { name: "Father Patrick O.", suburb: "Rockdale", rating: 5, date: "5 months ago", text: "Bruce Missen stands apart — his faith, professionalism, and care for families is exceptional. As a parish priest I have worked with many funeral directors, and I recommend Willow Tree without hesitation.", initials: "PO" },
  { name: "The Nguyen Family", suburb: "Sutherland", rating: 5, date: "6 months ago", text: "We didn't know where to turn when Dad passed suddenly. Bruce answered immediately and guided us through everything with such patience and kindness. The service was beautiful and deeply personal.", initials: "NF" },
  { name: "Angela B.", suburb: "Miranda", rating: 5, date: "7 months ago", text: "Such a compassionate and dignified service. Bruce made us feel supported every step of the way. He remembered every detail we shared about Mum and made the service feel truly personal.", initials: "AB" },
  { name: "The Rossi Family", suburb: "Bexley", rating: 5, date: "8 months ago", text: "From the first call to the final farewell, everything was handled with grace and care. Willow Tree Funerals is truly exceptional. We are so grateful to Bruce for everything he did for our family.", initials: "RF" },
  { name: "Thomas M.", suburb: "Cronulla", rating: 5, date: "3 months ago", text: "I've attended many funerals over the years. The service Bruce conducted for my mother was the most dignified and heartfelt I have ever witnessed. He has a rare gift.", initials: "TM" },
  { name: "Kellie Bell", suburb: "Sydney", rating: 5, date: "3 months ago", text: "Bruce and his team were amazing, even before our loved one passed and we were preparing for the inevitable. His warmth and care is second to none and his organisation and assistance of everything really took the pressure off.", initials: "KB" },
  { name: "Jane Xie", suburb: "Sydney", rating: 5, date: "2 months ago", text: "Thank you so much, Bruce and your beautiful team! Your sincere generosity, sensitivity and professionalism have been heaven sent in our most difficult moments with mum's passing. You've made everything so smooth and easy — a true witness in this sacred vocation.", initials: "JX" },
  { name: "Simon Yeak", suburb: "Sydney", rating: 5, date: "2 months ago", text: "Bruce is not only an old friend, but the only person that came to mind in entrusting my mother-in-law to. He held the service with such faith and devotion that all who were present felt his respect for someone he never met. Thank you, brother. The love you showed my family and I will never be forgotten.", initials: "SY" },
];

const faqs = [
  { q: "What should I do when someone passes away?", a: `Call our Family Care Specialists on ${COMPANY.phone} — we are available 24 hours a day, 7 days a week. We will guide you through every step, starting with the transfer of your loved one into our care.` },
  { q: "Do you arrange Catholic funeral Masses?", a: "Yes. Bruce Missen has extensive experience coordinating Catholic funeral Masses with parish priests across the St George, Sutherland Shire, and South West Sydney areas. We handle all church liaison on your behalf." },
  { q: "Do you arrange secular and non-religious services?", a: "Absolutely. We arrange a full range of services — from traditional Catholic Masses and multi-faith ceremonies to completely secular celebrations of life. Every service is tailored to your family's wishes, beliefs, and values." },
  { q: "How much does a funeral cost in Sydney?", a: "Funeral costs vary depending on the type of service. We offer transparent, itemised pricing with no hidden fees. Please visit our Pricing page or call our Family Care Specialists for a personalised quote." },
  { q: "Do you serve areas outside Hurstville?", a: "Yes. We serve the entire St George and Sutherland Shire area, South West Sydney including Campbelltown, Camden, Menangle, Picton, Liverpool, and Narellan, as well as Wollongong and the Central Coast." },
  { q: "Can I pre-arrange my own funeral?", a: "Yes. Pre-arranging your funeral is one of the most thoughtful gifts you can give your family. It removes the burden of decision-making during grief and locks in today's prices. Call us to discuss your options." },
];

const suburbs = [
  // St George & Sutherland Shire
  "Hurstville", "Kogarah", "Rockdale", "Bexley", "Blakehurst",
  "Sutherland", "Miranda", "Cronulla", "Caringbah", "Engadine",
  "Earlwood", "Arncliffe", "Penshurst", "Mortdale", "Revesby",
  // South West Sydney & Macarthur
  "Campbelltown", "Narellan", "Gregory Hills", "Camden", "Menangle",
  "Picton", "Liverpool", "Fairfield", "Bankstown", "Macquarie Links",
  "Ingleburn", "Minto", "Leumeah", "Glenfield", "Casula",
  // North Shore & Hornsby
  "Hornsby", "Wahroonga", "Turramurra", "Gordon", "Pymble",
  "Chatswood", "North Sydney", "Mosman", "Manly", "St Ives",
  // Inner West
  "Strathfield", "Burwood", "Ashfield", "Leichhardt", "Marrickville",
  // Western Sydney & Blue Mountains
  "Penrith", "Richmond", "Windsor", "Blacktown", "Parramatta",
  "Katoomba", "Springwood", "Lithgow",
  // Wollongong & Central Coast
  "Wollongong", "Shellharbour", "Kiama", "Gosford", "Wyong",
];

// ── Sub-components ────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#D4E3F5] last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif text-brand-navy font-semibold text-base leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full bg-brand-light-blue/60 flex items-center justify-center text-brand-royal transition-transform">
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
            role="region"
          >
            <p className="pb-5 text-brand-navy/80 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FuneralHome",
      name: COMPANY.name,
      url: "https://willowtreefunerals.com.au",
      telephone: COMPANY.phone,
      description: "Independent, family-owned funeral directors serving all of Sydney, North Shore, Hornsby, St George, Sutherland Shire, South West Sydney, Western Sydney and the Blue Mountains, Wollongong and the Central Coast. Specialising in Catholic, multi-faith, and secular funeral services.",
      address: [
        { "@type": "PostalAddress", streetAddress: COMPANY.locations[0].address, addressLocality: "Hurstville", addressRegion: "NSW", postalCode: "2220", addressCountry: "AU" },
        { "@type": "PostalAddress", streetAddress: COMPANY.locations[1].address, addressLocality: "Macquarie Links", addressRegion: "NSW", postalCode: "2565", addressCountry: "AU" },
      ],
      openingHours: "Mo-Su 00:00-23:59",
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "47", bestRating: "5" },
      founder: { "@type": "Person", name: "Bruce Missen", jobTitle: "Managing Director & Founder" },
    },
    {
      "@type": "WebSite",
      url: "https://willowtreefunerals.com.au",
      name: COMPANY.name,
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://willowtreefunerals.com.au/search?q={search_term_string}" }, "query-input": "required name=search_term_string" },
    },
  ],
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const stat1 = useCountUp(500, 1.8, "+");
  const stat2 = useCountUp(24, 1.2, "/7");
  const stat3 = useCountUp(5, 1.0, "★");
  const stat4 = useCountUp(2, 0.8, " locations");

  // Reviews carousel
  const [reviewIndex, setReviewIndex] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const visibleReviews = reviews.slice(reviewIndex * reviewsPerPage, reviewIndex * reviewsPerPage + reviewsPerPage);
  useEffect(() => {
    const t = setInterval(() => setReviewIndex(i => (i + 1) % totalPages), 5000);
    return () => clearInterval(t);
  }, [totalPages]);

  return (
    <>
      <SEOHead
        title="Willow Tree Funerals | Funeral Directors Sydney"
        description="Family-owned funeral directors serving Sydney, St George, Sutherland Shire & South West Sydney. Catholic, multi-faith & secular services. Available 24/7."
        canonical="/"
        ogImage={HEARSE_BRANDED}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Nav />
      <main id="main-content">

        {/* ── 1. HERO — Split editorial ──────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* LCP hero image — explicit img tag so browser discovers it early */}
          <img
            src={HERO_IMG}
            alt="Willow Tree Funerals — Sydney funeral directors serving St George, Sutherland Shire and South West Sydney"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/65 to-brand-navy/30" />
          {/* Copy */}
          <div className="relative z-10 container py-32 lg:py-0">
            <div className="max-w-xl">
              <Reveal delay={0.05}>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-px bg-brand-gold" />
                  <span className="section-label text-white/70">Available 24 Hours · 7 Days</span>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <h1
                  className="font-serif text-white font-bold leading-[1.05] mb-6"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)", letterSpacing: "-0.03em" }}
                >
                  Caring for Families
                  <br />
                  <span
                    className="font-light"
                    style={{ color: "#8FA8C8", fontStyle: "italic" }}
                  >
                    Across Sydney &amp; Beyond
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-px bg-white/30" />
                  <p className="font-serif italic text-white/80 text-base" style={{ letterSpacing: "0.01em" }}>
                    "{COMPANY.tagline}"
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.32}>
                <p className="text-white/70 text-base leading-relaxed mb-10 max-w-md">
                  Independent, family-owned funeral directors serving all of Sydney, North Shore, Hornsby, St George, Sutherland Shire, South West Sydney, Western Sydney and the Blue Mountains, Wollongong and the Central Coast. Catholic, multi-faith, and secular services.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 mb-12">
                  <a
                    href={COMPANY.phoneHref}
                    className="btn-royal flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wide"
                    onClick={() => trackPhoneClick("home_hero")}
                  >
                    <Phone size={14} /> Call Our Family Care Specialists
                  </a>
                  <Link
                    href="/contact"
                    className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold"
                    onClick={() => trackCTAClick("arrange_a_funeral", "home_hero")}
                  >
                    Send an Enquiry <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
              {/* Trust badges */}
              <Reveal delay={0.48}>
                <div className="flex flex-wrap gap-4">
                  {[
                    "Independent & Family-Owned",
                    "ASIC Registered Funeral Home",
                    "Cert IV Funeral Services",
                  ].map(badge => (
                    <div key={badge} className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                      <CheckCircle2 size={12} className="text-brand-gold shrink-0" />
                      {badge}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <span className="text-[0.6rem] tracking-[0.15em] uppercase font-medium">Scroll</span>
            <ChevronDown size={14} />
          </motion.div>
        </section>
                {/* ── 2. STATS BAR ──────────────────────────────────────────────── */}
        <section className="bg-brand-navy py-10">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { ref: stat1.ref, display: stat1.display, label: "Families Served" },
                { ref: stat2.ref, display: stat2.display, label: "Hour Availability" },
                { ref: stat3.ref, display: stat3.display, label: "Google Rating" },
                { ref: stat4.ref, display: stat4.display, label: "Sydney Locations" },
              ].map(({ ref, display, label }) => (
                <div key={label}>
                  <span ref={ref} className="block font-serif text-white font-bold text-3xl mb-1">{display}</span>
                  <span className="section-label text-white/50 text-[0.6rem]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. PROCESS TIMELINE — "How We Help" ───────────────────────── */}
        <section className="py-28 bg-white overflow-hidden">
          <div className="container">
            <Reveal>
              <div className="text-center mb-16">
                <p className="section-label mb-3">How We Help</p>
                <h2 className="font-serif text-brand-navy font-bold leading-tight" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                  From First Call to Final Farewell
                </h2>
                <p className="text-brand-navy/55 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
                  We guide you through every step with calm, clarity, and compassion — so you never feel alone.
                </p>
              </div>
            </Reveal>

            <div className="relative">
              {/* Connecting line (desktop) */}
              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-royal/20 to-transparent" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {processSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <Reveal key={step.number} delay={i * 0.1}>
                      <div className="relative flex flex-col items-center text-center group">
                        {/* Number + icon circle */}
                        <div className="relative mb-6">
                          <div className="w-20 h-20 rounded-full bg-brand-light-blue/40 flex items-center justify-center group-hover:bg-brand-royal/10 transition-colors duration-300 border border-brand-royal/15">
                            <Icon size={26} className="text-brand-royal" />
                          </div>
                          <span
                            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-navy flex items-center justify-center font-serif text-white font-bold"
                            style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
                          >
                            {step.number}
                          </span>
                        </div>
                        <h3 className="font-serif text-brand-navy font-semibold text-base mb-3 leading-snug">{step.title}</h3>
                        <p className="text-brand-navy/55 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* CTA under timeline */}
            <Reveal delay={0.4}>
              <div className="text-center mt-14">
                <a
                  href={COMPANY.phoneHref}
                  className="btn-royal inline-flex items-center gap-2 px-10 py-4 text-sm font-semibold"
                >
                  <Phone size={14} /> Call Willow Tree Funerals Now
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 4. SERVICES GRID ──────────────────────────────────────────── */}
        <section className="py-28 bg-brand-ivory">
          <div className="container">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14">
                <div>
                  <p className="section-label mb-3">Our Services</p>
                  <h2 className="font-serif text-brand-navy font-bold leading-tight" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                    Every Service, Every Culture,<br />Every Family
                  </h2>
                </div>
                <Link href="/services" className="btn-outline text-sm px-7 py-3 self-start lg:self-auto flex items-center gap-2 shrink-0">
                  All Services <ArrowRight size={13} />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((svc, i) => (
                <Reveal key={svc.label} delay={i * 0.07}>
                  <Link href={svc.href}>
                    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#E8EFF8]">
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={svc.img}
                          alt={svc.label}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          width={480} height={208}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                        {/* Number badge */}
                        <span className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center font-serif text-brand-navy font-bold text-xs">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-serif text-brand-navy font-semibold text-lg mb-2 leading-snug group-hover:text-brand-royal transition-colors">{svc.label}</h3>
                        <p className="text-brand-navy/55 text-sm leading-relaxed mb-4">{svc.desc}</p>
                        <span className="inline-flex items-center gap-1.5 text-brand-royal text-xs font-semibold tracking-wide uppercase group-hover:gap-2.5 transition-all">
                          Learn More <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. ABOUT BRUCE — Asymmetric editorial ─────────────────────── */}
        <section className="py-28 bg-white overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left: image stack */}
              <Reveal from="left">
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0 shadow-2xl">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-headshot_18cf3f17.png"
                      alt="Bruce Missen, Managing Director & Founder of Willow Tree Funerals"
                      className="w-full h-auto block"
                      width={480} height={480}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {/* Floating inset card */}
                  <div className="absolute -bottom-6 -right-4 lg:-right-8 w-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                    <img
                      src={BRUCE_HEARSE_1}
                      alt="Bruce Missen with the Willow Tree Funerals hearse"
                      className="w-full h-36 object-cover"
                      width={176} height={144}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-brand-light-blue/30 -z-10" />
                </div>
              </Reveal>

              {/* Right: copy */}
              <Reveal from="right">
                <div>
                  <p className="section-label mb-4">Meet Your Funeral Director</p>
                  <h2 className="font-serif text-brand-navy font-bold leading-tight mb-2" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                    Bruce Missen
                  </h2>
                  <p className="text-brand-royal font-semibold text-sm tracking-wide mb-6">Managing Director &amp; Founder</p>

                  <div className="w-10 h-px bg-brand-royal/40 mb-6" />

                  <p className="text-brand-navy/70 text-base leading-relaxed mb-5">
                    Bruce founded Willow Tree Funerals with a single conviction: that every family deserves the same level of care, dignity, and personal attention — regardless of their background, faith, or budget.
                  </p>
                  <p className="text-brand-navy/70 text-base leading-relaxed mb-5">
                    With deep roots in the Catholic community and extensive experience across multi-faith and secular services, Bruce brings both professional expertise and genuine compassion to every family he serves.
                  </p>

                  <blockquote className="border-l-2 border-brand-royal pl-5 mb-8">
                    <p className="font-serif italic text-brand-navy text-base leading-relaxed">
                      "I started Willow Tree because I believe every family deserves to be treated like my own. That's a promise I keep personally, every single time."
                    </p>
                    <cite className="not-italic section-label text-[0.6rem] mt-2 block">— Bruce Missen, Managing Director &amp; Founder</cite>
                  </blockquote>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {["ASIC Registered Funeral Home", "Cert IV Funeral Services", "Catholic Specialist", "24/7 Available"].map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1.5 bg-brand-light-blue/40 text-brand-navy text-xs font-medium px-3 py-1.5 rounded-full border border-brand-royal/15">
                        <CheckCircle2 size={10} className="text-brand-royal" /> {tag}
                      </span>
                    ))}
                  </div>

                  <Link href="/about" className="btn-royal inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold">
                    Meet Bruce <ArrowRight size={13} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 6. WHY WILLOW TREE — Dark trust section ───────────────────── */}
        <section className="py-28 bg-brand-navy">
          <div className="container">
            <Reveal>
              <div className="text-center mb-14">
                <p className="section-label text-brand-gold mb-3">Why Willow Tree</p>
                <h2 className="font-serif text-white font-bold leading-tight" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                  What Makes Us Different
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Truly Independent", desc: "We are not part of any corporate group. Every decision we make is guided by your family's needs — not shareholder returns." },
                { icon: Heart, title: "Personal from Start to Finish", desc: "Our team personally oversees every arrangement. You will always speak to the same person, who knows your family and your loved one's story." },
                { icon: Clock, title: "Available 24 Hours a Day", desc: "When you call, we answer. Day or night, weekends and public holidays — our Family Care Specialists are always available." },
                { icon: CheckCircle2, title: "Transparent Pricing", desc: "No hidden fees, no upselling, no surprises. We publish our prices openly and provide itemised quotes so you know exactly what you're paying for." },
                { icon: MapPin, title: "Two Sydney Locations", desc: "With offices in Hurstville and Campbelltown, we serve families across St George, Sutherland Shire, South West Sydney, Wollongong and the Central Coast." },
                { icon: Star, title: "5-Star Google Rating", desc: "Our families' trust is our greatest honour. Read their words on Google and you'll understand why families choose Willow Tree again and again." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-7 hover:bg-white/8 transition-colors duration-300">
                      <div className="w-11 h-11 rounded-xl bg-brand-royal/20 flex items-center justify-center mb-5">
                        <Icon size={20} className="text-brand-gold" />
                      </div>
                      <h3 className="font-serif text-white font-semibold text-base mb-3">{item.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. PRICING TRUST SECTION ──────────────────────────────────── */}
        <section className="py-28 bg-brand-ivory overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: copy */}
              <Reveal from="left">
                <div>
                  <p className="section-label mb-3">Transparent Pricing</p>
                  <h2 className="font-serif text-brand-navy font-bold leading-tight mb-6" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                    No Hidden Fees.<br />No Surprises.
                  </h2>
                  <p className="text-brand-navy/80 text-base leading-relaxed mb-5">
                    We believe families deserve to know exactly what a funeral costs before they commit. That's why we publish our prices openly and provide a full itemised quote for every arrangement.
                  </p>
                  <p className="text-brand-navy/80 text-base leading-relaxed mb-8">
                    Our packages start from <strong className="text-brand-navy font-semibold">$3,100</strong> for a direct cremation and include everything you need, with no upselling and no pressure.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/pricing" className="btn-royal inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold">
                      View Full Pricing <ArrowRight size={13} />
                    </Link>
                    <a href={COMPANY.phoneHref} className="btn-outline inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold">
                      <Phone size={13} /> Get a Quote
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Right: comparison table */}
              <Reveal from="right">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E8EFF8]">
                  {/* Table header */}
                  <div className="bg-brand-navy px-6 py-4">
                    <p className="text-white font-serif font-semibold text-sm">Willow Tree vs. Sydney Average</p>
                    <p className="text-white/50 text-xs mt-0.5">Indicative pricing — exact quotes provided on enquiry</p>
                  </div>
                  {/* Table rows */}
                  {[
                    { service: "Direct Cremation", us: "From $3,100", avg: "From $3,500–$5,000" },
                    { service: "Full Cremation Service", us: "From $7,500", avg: "From $7,000–$10,000" },
                    { service: "Burial Service", us: "From $9,500", avg: "From $9,000–$15,000" },
                  ].map((row, i) => (
                    <div key={row.service} className={`grid grid-cols-3 px-6 py-4 text-sm border-b border-[#E8EFF8] last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-brand-ivory/60"}`}>
                      <span className="font-medium text-brand-navy col-span-1 pr-2">{row.service}</span>
                      <span className="text-brand-royal font-semibold text-center">{row.us}</span>
                      <span className="text-brand-navy/40 text-center text-xs self-center">{row.avg}</span>
                    </div>
                  ))}
                  {/* Column labels */}
                  <div className="grid grid-cols-3 px-6 py-3 bg-brand-light-blue/30 text-[0.6rem] font-semibold tracking-widest uppercase text-brand-navy/75">
                    <span>Service</span>
                    <span className="text-center text-brand-royal">Willow Tree</span>
                    <span className="text-center">Sydney Avg.</span>
                  </div>
                  <div className="px-6 py-4 bg-white">
                    <p className="text-[0.65rem] text-brand-navy/40 leading-relaxed">
                      * Cemetery, crematorium, and disbursement fees are additional and vary by location. All prices include GST. Full itemised quotes provided on request.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 8. CATHOLIC + SECULAR SERVICES — Split image ──────────────── */}
        <section className="py-28 bg-white overflow-hidden">
          <div className="container">
            <Reveal>
              <div className="text-center mb-14">
                <p className="section-label mb-3">Serving A Wide Range Of Faiths &amp; Beliefs</p>
                <h2 className="font-serif text-brand-navy font-bold leading-tight" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                  Every Service. Every Culture.<br />Every Family.
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  img: CHURCH_MASS,
                  tag: "Faith-Based Services",
                  title: "Catholic & Multi-Faith Funerals",
                  desc: "Bruce has deep experience coordinating Catholic funeral Masses, Orthodox services, and multi-faith ceremonies with clergy across Sydney. Every detail — from the Mass booklet to the church liaison — is handled with reverence and precision.",
                  href: "/services/catholic-funerals",
                  cta: "Catholic Funerals",
                },
                {
                  img: BIRDCAGE_GARDEN,
                  tag: "Secular Services",
                  title: "Celebrations of Life",
                  desc: "Not all farewells are religious — and that's perfectly fine. We create deeply meaningful, personalised celebrations of life for families of all beliefs and backgrounds, honouring your loved one exactly as they were.",
                  href: "/services/secular-funerals",
                  cta: "Secular Services",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 border border-[#E8EFF8]">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        width={640} height={256}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 to-transparent" />
                      <span className="absolute top-4 left-4 section-label text-white/80 bg-brand-navy/50 backdrop-blur-sm px-3 py-1 rounded-full text-[0.6rem]">
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-8 bg-white">
                      <h3 className="font-serif text-brand-navy font-semibold text-xl mb-3 leading-snug">{item.title}</h3>
                      <p className="text-brand-navy/75 text-sm leading-relaxed mb-6">{item.desc}</p>
                      <Link href={item.href} className="inline-flex items-center gap-2 text-brand-royal text-sm font-semibold group-hover:gap-3 transition-all">
                        {item.cta} <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. PLANNING AHEAD BANNER ──────────────────────────────────── */}
        <section className="py-20 bg-brand-navy overflow-hidden">
          <div className="container">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-10 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <Reveal from="left">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-brand-royal/20 flex items-center justify-center">
                        <Calendar size={18} className="text-brand-gold" />
                      </div>
                      <p className="section-label text-brand-gold">Planning Ahead</p>
                    </div>
                    <h2 className="font-serif text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.025em" }}>
                      The Most Thoughtful Gift<br />You Can Give Your Family
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Pre-arranging your own funeral removes the burden of decision-making from your loved ones during the most difficult time of their lives. It also locks in today's prices, protecting your family from future cost increases.
                    </p>
                  </div>
                </Reveal>
                <Reveal from="right">
                  <div className="space-y-4">
                    {[
                      { title: "Peace of Mind", desc: "Your wishes are documented and respected — no guesswork for your family." },
                      { title: "Financial Protection", desc: "Lock in today's prices and protect your family from rising funeral costs." },
                      { title: "No Obligation", desc: "We'll talk through your options with no pressure and no commitment required." },
                    ].map(item => (
                      <div key={item.title} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-brand-royal/30 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 size={12} className="text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm mb-0.5">{item.title}</p>
                          <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4">
                      <a href={COMPANY.phoneHref} className="btn-royal inline-flex items-center gap-2 px-10 py-4 text-sm font-semibold" onClick={() => trackPhoneClick("home_why_us")}>                        <Phone size={13} /> Discuss Pre-Arrangement
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. GOOGLE REVIEWS CAROUSEL ───────────────────────────────── */}
        <section className="py-28 bg-brand-ivory overflow-hidden">
          <div className="container">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
                <div>
                  <p className="section-label mb-3">Google Reviews</p>
                  <h2 className="font-serif text-brand-navy font-bold leading-tight" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                    What Families Say
                  </h2>
                </div>
                {/* Google rating badge */}
                <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-[#E8EFF8] self-start lg:self-auto">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <div>
                    <div className="flex items-center gap-1">
                      <Stars count={5} />
                      <span className="font-bold text-brand-navy text-sm ml-1">5.0</span>
                    </div>
                    <p className="text-brand-navy/75 text-[0.65rem]">58 reviews</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Review cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {visibleReviews.map((review) => (
                  <div key={review.name} className="bg-white rounded-2xl p-7 shadow-sm border border-[#E8EFF8] flex flex-col">
                    <Quote size={20} className="text-brand-royal/30 mb-4 shrink-0" />
                    <p className="text-brand-navy/70 text-sm leading-relaxed flex-1 mb-6 italic">"{review.text}"</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-white font-serif font-bold text-xs shrink-0">
                        {review.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy text-sm">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <Stars count={review.rating} />
                          <span className="text-brand-navy/40 text-[0.6rem]">{review.suburb} · {review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Carousel controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setReviewIndex(i => (i - 1 + totalPages) % totalPages)}
                className="w-10 h-10 rounded-full border border-brand-royal/30 flex items-center justify-center text-brand-royal hover:bg-brand-royal hover:text-white transition-colors"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === reviewIndex ? "bg-brand-royal w-6" : "bg-brand-royal/25"}`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
              <button
                onClick={() => setReviewIndex(i => (i + 1) % totalPages)}
                className="w-10 h-10 rounded-full border border-brand-royal/30 flex items-center justify-center text-brand-royal hover:bg-brand-royal hover:text-white transition-colors"
                aria-label="Next reviews"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <Reveal delay={0.3}>
              <div className="text-center mt-8">
                <a
                  href="https://www.google.com/maps/place/Willow+Tree+Funerals/@-33.9669895,151.1117502,17z/data=!4m8!3m7!1s0x6b12bfda70d48fbb:0xdd9386a77997c51c!8m2!3d-33.9669895!4d151.1117502!9m1!1b1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-royal text-sm font-semibold hover:gap-3 transition-all"
                >
                  See All Reviews on Google <ArrowRight size={13} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 11. PHOTO GALLERY ─────────────────────────────────────────── */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="container">
            <Reveal>
              <div className="text-center mb-10">
                <p className="section-label mb-2">Our Services in Action</p>
                <h2 className="font-serif text-brand-navy font-semibold leading-tight" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.02em" }}>
                  Every Farewell, Handled with Grace
                </h2>
              </div>
            </Reveal>
            {/* Row 1: large hero photo (2×2) + 3 smaller photos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {/* Hero — spans 2 cols × 2 rows */}
              <Reveal delay={0} className="col-span-1 md:col-span-2 row-span-1 md:row-span-2">
                <div className="rounded-xl overflow-hidden h-52 md:h-[380px]">
                  <img src={CASKET_CATHEDRAL} alt="Casket with roses at cathedral altar"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    width={640} height={480} loading="lazy" decoding="async" />
                </div>
              </Reveal>
              {/* Three small photos to the right */}
              {[
                { src: BAGPIPER,    alt: "Bagpiper leading funeral procession" },
                { src: PALLBEARERS, alt: "Pallbearers carrying casket" },
                { src: CASKET_HEARSE, alt: "Casket with white lilies in hearse" },
              ].map((photo, i) => (
                <Reveal key={photo.src} delay={(i + 1) * 0.07}>
                  <div className="rounded-xl overflow-hidden h-52 md:h-[182px]">
                    <img src={photo.src} alt={photo.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      width={480} height={320} loading="lazy" decoding="async" />
                  </div>
                </Reveal>
              ))}
            </div>
            {/* Row 2: 4 equal-width photos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: BIRDCAGE_GARDEN, alt: "Birdcage floral tribute in memorial garden" },
                { src: PRIEST_BLESSING, alt: "Priest blessing casket at hearse" },
                { src: CASKET_YELLOW,   alt: "Casket with yellow flower tribute" },
                { src: SERVICE_CHURCH,  alt: "Funeral service inside church" },
              ].map((photo, i) => (
                <Reveal key={photo.src} delay={(i + 4) * 0.07}>
                  <div className="rounded-xl overflow-hidden h-40 md:h-52">
                    <img src={photo.src} alt={photo.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      width={480} height={320} loading="lazy" decoding="async" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12. SERVICE AREAS — Suburb pills ──────────────────────────── */}
        <section className="py-20 bg-brand-light-blue/20">
          <div className="container">
            <Reveal>
              <div className="text-center mb-10">
                <p className="section-label mb-3">Areas We Serve</p>
                <h2 className="font-serif text-brand-navy font-bold leading-tight mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.025em" }}>
                  Serving Sydney, Wollongong &amp; the Central Coast
                </h2>
                <p className="text-brand-navy/55 text-sm max-w-xl mx-auto leading-relaxed">
                  From St George and Sutherland Shire to South West Sydney, Wollongong, and the Central Coast — we come to you, wherever you are.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-10">
                {suburbs.map(suburb => (
                  <span
                    key={suburb}
                    className="inline-flex items-center gap-1.5 bg-white text-brand-navy text-xs font-medium px-3.5 py-2 rounded-full border border-brand-royal/15 shadow-sm hover:border-brand-royal/40 hover:shadow-md transition-all cursor-default"
                  >
                    <MapPin size={9} className="text-brand-royal shrink-0" /> {suburb}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="text-center">
                <p className="text-brand-navy/75 text-xs mb-4">Don't see your suburb? We likely serve your area.</p>
                <a href={COMPANY.phoneHref} className="btn-royal inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold">
                  <Phone size={13} /> Call to Confirm Your Area
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 13. FAQ ────────────────────────────────────────────────────── */}
        <section className="py-28 bg-brand-ivory">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <Reveal from="left">
                <div className="lg:sticky lg:top-32">
                  <p className="section-label mb-3">Frequently Asked Questions</p>
                  <h2 className="font-serif text-brand-navy font-bold leading-tight mb-6" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}>
                    We're Here to Answer<br />Your Questions
                  </h2>
                  <p className="text-brand-navy/75 text-sm leading-relaxed mb-8">
                    If you can't find the answer you're looking for, please call our Family Care Specialists — we're available 24 hours a day, 7 days a week.
                  </p>
                  <a href={COMPANY.phoneHref} className="btn-royal inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold">
                    <Phone size={13} /> {COMPANY.phone}
                  </a>
                  <div className="mt-8">
                    <Link href="/faq" className="inline-flex items-center gap-2 text-brand-royal text-sm font-semibold hover:gap-3 transition-all">
                      View All FAQs <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </Reveal>
              <Reveal from="right">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8EFF8]">
                  {faqs.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 14. FINAL CTA ─────────────────────────────────────────────── */}
        <section
          className="relative py-40 overflow-hidden"
          style={{ backgroundImage: `url(${HEARSE_BRANDED})`, backgroundSize: "cover", backgroundPosition: "center 40%" }}
        >
          <div className="absolute inset-0 bg-brand-navy/80" />
          <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
          <div className="relative z-10 container">
            <div className="max-w-2xl">
              <Reveal>
                <div className="w-10 h-px bg-white/30 mb-6" />
                <p className="section-label text-white/60 mb-4">We're Here for You</p>
                <h2
                  className="font-serif text-white font-bold leading-tight mb-8"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", letterSpacing: "-0.025em" }}
                >
                  You Focus On Healing.
                  <br />
                  <span
                    className="font-light"
                    style={{ color: "#8FA8C8", fontStyle: "italic" }}
                  >
                    We'll Take Care Of The Rest.
                  </span>
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-lg">
                  Call our Family Care Specialists any time of the day or night. We will answer, and we will help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2 px-10 py-4" onClick={() => trackPhoneClick("home_final_cta")}>
                    <Phone size={15} /> {COMPANY.phone}
                  </a>
                  <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy px-10 py-4 flex items-center justify-center gap-2" onClick={() => trackCTAClick("send_enquiry", "home_final_cta")}>
                    Send an Enquiry <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
