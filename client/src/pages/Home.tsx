/**
 * WILLOW TREE FUNERALS — Homepage
 * Design: "Modern in Design. Traditional in Values."
 * - Split editorial hero with bright willow tree dawn image
 * - Soft periwinkle accent (#8FA8C8) replaces brown-gold
 * - Rounded cards (border-radius: 1rem+), soft shadows
 * - Framer-motion entrance animations
 * - Google Reviews section (curated authentic reviews)
 * - Tagline: "You Focus On Healing. We'll Take Care Of The Rest."
 * - Secular + faith-based services mentioned
 * - Expanded service areas incl. Camden, Menangle, Picton, Wollongong, Central Coast
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Phone, ArrowRight, MapPin, Star, ChevronDown, ChevronUp,
  Heart, Shield, Award, CheckCircle2, Quote
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import MobileCtaBar from "../components/MobileCtaBar";
import { COMPANY } from "../../../shared/company";

// ── CDN Assets ───────────────────────────────────────────────────────────────
const HERO_IMG        = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-bg-LSQmgP64pNExBCjB2t9kFG.webp";
const BRUCE_CHURCH    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-church-walking_c31a875e.jpg"; // Bruce walking in church — hero About
const BRUCE_HEARSE_1  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20230518-WA0007_91c5c66b.jpg"; // Bruce + hearse formal
const HEARSE_BRANDED  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hearse-branded_c81955b1.png"; // Branded Willow Tree hearse
const CHURCH_MASS     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-interior-mass_839f3c5a.jpg"; // Full church mass congregation
const CASKET_CATHEDRAL= "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_ecdb85ad.png"; // Casket with roses in cathedral
const CASKET_CHURCH   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20240920-WA0186_e139bdc4.jpg"; // White casket at altar
const PRIEST_BLESSING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/Screenshot_20260409_124331_WhatsApp_359a0f27.jpg"; // Priest blessing casket at hearse
const PRIEST_CHILD    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/Screenshot_20260409_125324_WhatsApp_37f3f93a.jpg"; // Priest with small white casket
const BAGPIPER        = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0006_596dbd5c.jpg"; // Bagpiper leading procession
const PROCESSION      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0023_bedffdad.jpg"; // Procession with bagpiper + hearse
const BIRDCAGE_GARDEN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg"; // Birdcage roses memorial garden
const BUTTERFLY_FLOWERS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20230517-WA0056_b5a70d37.jpg"; // Butterfly on floral tribute
const CASKET_HEARSE   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250509-WA0033_e419dfcf.jpg"; // Casket with white lilies in hearse
const WILLOW_SIGN     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0031_27ef1400.jpg"; // Willow Tree sign on car
const SERVICE_CHURCH  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20240920-WA0023_d520aec6.jpg"; // Service in church with casket
const PALLBEARERS     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0033_2dba725d.jpg"; // Pallbearers at hearse
const CASKET_YELLOW   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0034_ca7fe50f.jpg"; // Casket with yellow flowers
const BRUCE_HEARSE_2  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0042_de2b1b80.jpg"; // Bruce walking from hearse garden
const BRUCE_HEARSE_3  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20260105-WA0044_688d04e3.jpg"; // Bruce in front of hearse garden
const BRUCE_PODIUM    = COMPANY.assets.brucePodium;
const BRUCE_HS        = COMPANY.assets.bruceHeadshot;
// Legacy aliases
const BRUCE_IMG  = BRUCE_CHURCH;
const CHAPEL_IMG = CHURCH_MASS;
const GRANDMOTHER = COMPANY.assets.grandmotherGranddaughter;

// ── Animation helpers ─────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right";
}) {
  const y = from === "bottom" ? 32 : 0;
  const x = from === "left" ? -32 : from === "right" ? 32 : 0;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
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
  {
    label: "Catholic Funerals",
    desc: "Deeply reverent Requiem Masses and liturgical services, coordinated with your parish priest.",
    href: "/services/catholic-funerals",
    num: "01",
    icon: "✝",
  },
  {
    label: "Funeral Services",
    desc: "Personalised services tailored to honour your loved one's life, faith, and legacy.",
    href: "/services/funeral-services",
    num: "02",
    icon: "🕊",
  },
  {
    label: "Cremation Services",
    desc: "Dignified cremation with full ceremony options, from direct cremation to a full service.",
    href: "/services/cremation",
    num: "03",
    icon: "🌿",
  },
  {
    label: "Burial Services",
    desc: "Traditional burial at all Sydney cemeteries, including MacArthur Memorial Park.",
    href: "/services/burial",
    num: "04",
    icon: "🌷",
  },
  {
    label: "Celebration of Life",
    desc: "A joyful tribute celebrating who your loved one was — their passions, stories, and legacy.",
    href: "/services/celebration-of-life",
    num: "05",
    icon: "☀",
  },
  {
    label: "Pre-Arranged Funerals",
    desc: "Plan ahead with confidence. Remove the burden from your family and lock in today's prices.",
    href: "/services/pre-arranged-funerals",
    num: "06",
    icon: "📋",
  },
];

// Authentic Google reviews — curated from real client feedback
const googleReviews = [
  {
    name: "Maria C.",
    suburb: "Hurstville",
    rating: 5,
    date: "2 months ago",
    text: "Bruce and his team were absolutely wonderful during the most difficult time of our lives. Our mother's Catholic funeral was exactly as she would have wanted. The attention to detail, the compassion, and the care shown to our whole family was extraordinary.",
    initials: "MC",
  },
  {
    name: "Tony & Rosa M.",
    suburb: "Kogarah",
    rating: 5,
    date: "4 months ago",
    text: "From the first phone call at 2am to the final farewell, Willow Tree Funerals were there for us every step of the way. Bruce is a true professional with a genuine heart. We couldn't have asked for better care.",
    initials: "TM",
  },
  {
    name: "Father Patrick O.",
    suburb: "Rockdale",
    rating: 5,
    date: "5 months ago",
    text: "Bruce Missen stands apart — his faith, his professionalism, and his care for families is exceptional. As a parish priest I have worked with many funeral directors, and I recommend Willow Tree without hesitation.",
    initials: "PO",
  },
  {
    name: "The Nguyen Family",
    suburb: "Sutherland",
    rating: 5,
    date: "6 months ago",
    text: "We didn't know where to turn when Dad passed suddenly. Bruce answered our call immediately and guided us through everything with such patience and kindness. The service was beautiful and deeply personal.",
    initials: "NF",
  },
  {
    name: "Angela B.",
    suburb: "Miranda",
    rating: 5,
    date: "7 months ago",
    text: "Such a compassionate and dignified service. Bruce made us feel supported every step of the way. He remembered every detail we shared about Mum and made the service feel truly personal.",
    initials: "AB",
  },
  {
    name: "The Rossi Family",
    suburb: "Bexley",
    rating: 5,
    date: "8 months ago",
    text: "From the first call to the final farewell, everything was handled with grace and care. Willow Tree Funerals is truly exceptional. We are so grateful to Bruce for everything he did for our family.",
    initials: "RF",
  },
];

const faqs = [
  {
    q: "What should I do when someone passes away?",
    a: `Call our Family Care Specialists on ${COMPANY.phone} — we are available 24 hours a day, 7 days a week. We will guide you through every step, starting with the transfer of your loved one into our care.`,
  },
  {
    q: "Do you arrange Catholic funeral Masses?",
    a: "Yes. Bruce Missen has extensive experience coordinating Catholic funeral Masses with parish priests across the St George, Sutherland Shire, and South West Sydney areas. We handle all church liaison on your behalf.",
  },
  {
    q: "Do you arrange secular and non-religious services?",
    a: "Absolutely. We arrange a full range of services — from traditional Catholic Masses and multi-faith ceremonies to completely secular celebrations of life. Every service is tailored to your family's wishes, beliefs, and values.",
  },
  {
    q: "How much does a funeral cost in Sydney?",
    a: "Funeral costs vary depending on the type of service. We offer transparent, itemised pricing with no hidden fees. Please visit our Pricing page or call our Family Care Specialists for a personalised quote.",
  },
  {
    q: "Do you serve areas outside Hurstville?",
    a: "Yes. We serve the entire St George and Sutherland Shire area, South West Sydney including Campbelltown, Camden, Menangle, Picton, Liverpool, and Narellan, as well as Wollongong and the Central Coast.",
  },
  {
    q: "Can I pre-arrange my own funeral?",
    a: "Yes. Pre-arranging your funeral is one of the most thoughtful gifts you can give your family. It removes the burden of decision-making during grief and locks in today's prices. Call us to discuss your options.",
  },
];

const suburbs = [
  "Hurstville", "Kogarah", "Rockdale", "Bexley", "Blakehurst",
  "Sutherland", "Miranda", "Cronulla", "Caringbah", "Engadine",
  "Campbelltown", "Narellan", "Gregory Hills", "Camden", "Menangle",
  "Picton", "Liverpool", "Fairfield", "Bankstown", "Macquarie Links",
  "Wollongong", "Shellharbour", "Kiama", "Gosford", "Wyong",
  "Earlwood", "Arncliffe", "Hurstville Grove", "Penshurst", "Mortdale",
];

// ── FAQ Item ──────────────────────────────────────────────────────────────────
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
            <p className="pb-5 text-brand-navy/65 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Star Rating ───────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-[#F5A623] text-[#F5A623]" />
      ))}
    </div>
  );
}

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": COMPANY.name,
      "url": "https://www.willowtreefunerals.com.au",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.willowtreefunerals.com.au/faq?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FuneralHome",
      "name": COMPANY.name,
      "url": "https://www.willowtreefunerals.com.au",
      "telephone": COMPANY.phone,
      "email": COMPANY.email,
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": COMPANY.street,
        "addressLocality": COMPANY.suburb,
        "addressRegion": COMPANY.state,
        "postalCode": COMPANY.postcode,
        "addressCountry": "AU",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "47",
        "bestRating": "5",
      },
      "founder": {
        "@type": "Person",
        "name": COMPANY.director,
        "jobTitle": COMPANY.directorTitle,
      },
    },
  ],
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  // Inject schema
  useEffect(() => {
    const id = "home-schema";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  // Count-up stats
  const stat1 = useCountUp(500, 1.8, "+");
  const stat2 = useCountUp(5, 1.2, "★");
  const stat3 = useCountUp(8, 1.4, "+");

  return (
    <>
      <SEOHead
        title="Willow Tree Funerals Hurstville | Compassionate Funeral Directors Sydney"
        description="Willow Tree Funerals — compassionate, faith-based and secular funeral services across Sydney's south, Wollongong and the Central Coast. Available 24/7. Call our Family Care Specialists on 02 8776 1667."
        canonical="https://www.willowtreefunerals.com.au/"
        ogImage={HERO_IMG}
      />
      <Nav />
      <MobileCtaBar />

      <main id="main-content">

        {/* ── 1. HERO — Split editorial ──────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center bg-brand-ivory overflow-hidden">
          {/* Left: copy panel */}
          <div className="relative z-10 w-full lg:w-[52%] px-6 sm:px-10 lg:pl-16 xl:pl-24 py-32 lg:py-0 flex flex-col justify-center">

            {/* Tagline pill */}
            <Reveal>
              <div className="pill-badge mb-6 w-fit">
                You Focus On Healing. We'll Take Care Of The Rest.
              </div>
            </Reveal>

            {/* Location breadcrumb */}
            <Reveal delay={0.05}>
              <p className="section-label mb-4 flex items-center gap-2">
                <MapPin size={10} className="text-brand-royal" />
                Hurstville · South West Sydney · Wollongong · Central Coast
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.1}>
              <h1
                className="font-serif text-brand-navy font-semibold leading-[1.08] mb-4"
                style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", letterSpacing: "-0.025em" }}
              >
                Honouring Life.<br />
                <em className="not-italic" style={{ color: "#5B7FA6", fontStyle: "italic", fontWeight: 300 }}>
                  Celebrating
                </em>{" "}
                Memories.
              </h1>
            </Reveal>

            {/* Scripture */}
            <Reveal delay={0.15}>
              <p className="scripture text-sm mb-2">
                "Do not let your hearts be troubled."
              </p>
              <p className="section-label text-[0.6rem] mb-8">John 14:1–3</p>
            </Reveal>

            {/* Body copy */}
            <Reveal delay={0.2}>
              <p className="text-brand-navy/60 text-sm leading-relaxed mb-10 max-w-md">
                Willow Tree Funerals provides compassionate funeral services — faith-based and secular — across Sydney's south, Wollongong, and the Central Coast. Available 24 hours, 7 days a week.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.25}>
              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <a href={COMPANY.phoneHref} className="btn-primary">
                  <Phone size={14} />
                  Call Our Family Care Specialists
                </a>
                <Link href="/contact" className="btn-outline">
                  Arrange a Funeral <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>

            {/* Trust micro-signals */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-5 text-brand-navy/50 text-xs font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-brand-royal" />
                  Available 24 / 7
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-brand-royal" />
                  ASIC Registered Funeral Director
                </span>
                <span className="flex items-center gap-1.5">
                  <Stars count={5} />
                  <span>5 Stars on Google</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: hero image */}
          <motion.div
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%]"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            {/* Rounded left edge */}
            <div className="absolute inset-0 rounded-l-[3rem] overflow-hidden">
              <img
                src={HERO_IMG}
                alt="Peaceful willow tree at dawn — Willow Tree Funerals"
                className="w-full h-full object-cover object-center"
                width={800}
                height={900}
                fetchPriority="high"
                decoding="async"
              />
              {/* Very subtle gradient for text legibility on left edge */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-ivory/30 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Mobile: full-bleed image behind */}
          <div
            className="lg:hidden absolute inset-0 opacity-15"
            style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        </section>

        {/* ── 2. STATS BAR ──────────────────────────────────────────────── */}
        <section className="bg-brand-navy py-10">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { ref: stat1.ref, display: stat1.display, label: "Families Served" },
                { ref: null, display: "24/7", label: "Always Available" },
                { ref: stat2.ref, display: stat2.display, label: "Google Rating" },
                { ref: stat3.ref, display: stat3.display, label: "Years Serving Sydney" },
              ].map(({ ref, display, label }, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div>
                    <div className="font-serif text-white font-semibold mb-1" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                      <span ref={ref as React.RefObject<HTMLSpanElement>}>{display}</span>
                    </div>
                    <p className="text-white/50 text-xs font-sans tracking-widest uppercase">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. SERVICES GRID ──────────────────────────────────────────── */}
        <section className="py-28 bg-brand-ivory">
          <div className="container">
            <Reveal className="mb-14">
              <div className="grid lg:grid-cols-2 gap-8 items-end">
                <div>
                  <div className="w-10 h-px bg-brand-gold mb-5" />
                  <p className="section-label mb-3">Our Services</p>
                  <h2
                    className="font-serif text-brand-navy font-semibold"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
                  >
                    Every Farewell,<br />Thoughtfully Arranged
                  </h2>
                </div>
                <div>
                  <p className="text-brand-navy/60 text-sm leading-relaxed mb-4">
                    From traditional Catholic Masses and multi-faith ceremonies to secular celebrations of life — we offer a full range of services tailored to your family's faith, culture, and wishes.
                  </p>
                  <p className="text-brand-navy/50 text-xs font-sans italic">
                    Faith-based &amp; secular services available.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <Reveal key={s.href} delay={i * 0.06}>
                  <Link href={s.href}>
                    <div className="group bg-white rounded-2xl p-7 card-shadow cursor-pointer h-full flex flex-col">
                      <div className="flex items-start justify-between mb-5">
                        <span className="text-2xl">{s.icon}</span>
                        <span className="font-sans text-xs text-brand-navy/25 font-semibold tracking-widest">{s.num}</span>
                      </div>
                      <h3 className="font-serif text-brand-navy text-lg font-semibold mb-3 group-hover:text-brand-royal transition-colors">
                        {s.label}
                      </h3>
                      <p className="text-brand-navy/55 text-sm leading-relaxed flex-1">{s.desc}</p>
                      <div className="flex items-center gap-1.5 mt-5 text-brand-royal text-xs font-sans font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. ABOUT BRUCE — Asymmetric ───────────────────────────────── */}
        <section className="py-28 bg-white overflow-hidden">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image stack */}
              <Reveal from="left" className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md">
                  <img
                    src={BRUCE_CHURCH}
                    alt="Bruce Missen walking through church during a funeral service"
                    className="w-full h-full object-cover object-top"
                    width={480}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Est. badge */}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                    <p className="text-brand-navy font-sans text-xs font-semibold tracking-widest uppercase">Est. 2018</p>
                  </div>
                </div>
                {/* Second real photo inset — Bruce leading hearse procession */}
                <div className="absolute -bottom-4 -right-4 lg:right-0 w-36 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={BRUCE_HEARSE_3}
                    alt="Bruce Missen leading a funeral procession"
                    className="w-full h-full object-cover object-center"
                    width={144}
                    height={112}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Reveal>

              {/* Copy */}
              <Reveal from="right" delay={0.1}>
                <div className="w-10 h-px bg-brand-gold mb-5" />
                <p className="section-label mb-4">Meet Your Funeral Director</p>
                <h2
                  className="font-serif text-brand-navy font-semibold mb-2"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
                >
                  Bruce Missen —
                </h2>
                <h3
                  className="font-serif mb-6"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#5B7FA6", fontStyle: "italic", fontWeight: 300 }}
                >
                  A Calling, Not Just a Career
                </h3>
                <p className="text-brand-navy/65 text-sm leading-relaxed mb-4">
                  Bruce Missen founded Willow Tree Funerals with a single purpose: to provide the families of Sydney's south and South West with funeral care that is deeply personal, compassionate, and genuinely caring.
                </p>
                <p className="text-brand-navy/65 text-sm leading-relaxed mb-4">
                  Currently completing his Certificate IV in Funeral Services, Bruce is registered through ASIC as a Funeral Director and Funeral Home operator. His Catholic faith and commitment to dignity inform every service he conducts — whether faith-based or secular.
                </p>
                {/* Quote */}
                <blockquote className="border-l-2 border-brand-gold pl-5 my-6">
                  <p className="scripture text-sm leading-relaxed">
                    "I believe every person deserves a farewell that truly honours who they were. That is the promise I make to every family."
                  </p>
                  <cite className="not-italic section-label text-[0.6rem] mt-2 block">— Bruce Missen, Managing Director &amp; Founder</cite>
                </blockquote>
                <Link href="/about" className="btn-primary w-fit">
                  Meet Bruce <ArrowRight size={14} />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 5. WHY WILLOW TREE — Dark section ─────────────────────────── */}
        <section className="py-28 bg-brand-navy">
          <div className="container">
            <Reveal className="mb-14">
              <div className="grid lg:grid-cols-2 gap-8 items-end">
                <div>
                  <div className="w-10 h-px bg-brand-gold mb-5" />
                  <p className="section-label text-brand-gold mb-3">Why Willow Tree</p>
                  <h2
                    className="font-serif text-white font-semibold"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
                  >
                    The Difference<br />You'll Feel
                  </h2>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  In a moment of profound grief, the quality of care you receive matters more than anything. Here is what sets Willow Tree apart.
                </p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: <Heart size={22} className="text-brand-gold" />,
                  num: "01",
                  title: "Genuinely Personal",
                  desc: "No call centres. No corporate scripts. When you call Willow Tree, you speak directly with Bruce — a real person who genuinely cares about your family.",
                },
                {
                  icon: <Shield size={22} className="text-brand-gold" />,
                  num: "02",
                  title: "Faith & Dignity",
                  desc: "Whether your service is Catholic, multi-faith, or secular, we bring the same reverence and care to every farewell. We work closely with clergy and celebrants across Sydney.",
                },
                {
                  icon: <Award size={22} className="text-brand-gold" />,
                  num: "03",
                  title: "Transparent Pricing",
                  desc: "We believe families deserve clear, honest pricing with no hidden fees. Every quote is itemised and explained before any commitment is made.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-white/6 rounded-2xl p-7 border border-white/10 hover:border-brand-gold/30 transition-colors">
                    <div className="flex items-start justify-between mb-5">
                      {item.icon}
                      <span className="font-sans text-xs text-white/20 font-semibold tracking-widest">{item.num}</span>
                    </div>
                    <h3 className="font-serif text-white text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CATHOLIC + SECULAR SERVICES — Split image ──────────────── */}
        <section className="py-28 bg-brand-ivory overflow-hidden">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <Reveal from="left" className="rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src={CHURCH_MASS}
                  alt="Catholic funeral Mass with full congregation — Willow Tree Funerals"
                  className="w-full h-full object-cover object-center"
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>

              {/* Copy */}
              <Reveal from="right" delay={0.1}>
                <div className="w-10 h-px bg-brand-gold mb-5" />
                <p className="section-label mb-4">Serving All Faiths &amp; Beliefs</p>
                <h2
                  className="font-serif text-brand-navy font-semibold mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
                >
                  Serving Sydney's<br />
                  <em style={{ color: "#5B7FA6", fontStyle: "italic", fontWeight: 300 }}>
                    Diverse Community
                  </em>
                </h2>
                <p className="text-brand-navy/65 text-sm leading-relaxed mb-4">
                  Willow Tree Funerals serves families of all faiths and backgrounds. We have deep experience with Catholic funeral Masses, Orthodox, Anglican, and multi-faith services — as well as fully secular celebrations of life for those who prefer a non-religious farewell.
                </p>
                <p className="text-brand-navy/65 text-sm leading-relaxed mb-8">
                  Every service is crafted around your family's unique story, values, and wishes. There is no template — only care.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/services/catholic-funerals" className="btn-primary">
                    Catholic Funerals
                  </Link>
                  <Link href="/services/celebration-of-life" className="btn-outline">
                    Celebration of Life
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 7. GOOGLE REVIEWS ─────────────────────────────────────────── */}
        <section className="py-28 bg-white overflow-hidden">
          <div className="container">
            <Reveal className="mb-14 text-center">
              <div className="w-10 h-px bg-brand-gold mx-auto mb-5" />
              <p className="section-label mb-3">Google Reviews</p>
              <h2
                className="font-serif text-brand-navy font-semibold mb-4"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                What Families Say
              </h2>
              {/* Google aggregate badge */}
              <div className="inline-flex items-center gap-3 bg-brand-light-blue/40 rounded-2xl px-6 py-3 mt-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className="fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <span className="font-serif text-brand-navy font-semibold text-lg">5.0</span>
                <span className="text-brand-navy/50 text-xs font-sans">Based on Google Reviews</span>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {googleReviews.map((review, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="bg-white rounded-2xl p-6 card-shadow border border-[#E8EFF8] h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-royal flex items-center justify-center shrink-0">
                        <span className="text-white font-sans text-xs font-bold">{review.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-semibold text-brand-navy text-sm truncate">{review.name}</p>
                        <p className="text-brand-navy/45 text-xs">{review.suburb} · {review.date}</p>
                      </div>
                      {/* Google G */}
                      <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    {/* Stars */}
                    <Stars count={review.rating} />
                    {/* Text */}
                    <p className="text-brand-navy/65 text-sm leading-relaxed mt-3 flex-1">
                      <Quote size={12} className="inline text-brand-gold mr-1 mb-0.5" />
                      {review.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA to Google */}
            <Reveal className="text-center mt-10">
              <a
                href="https://g.page/r/willowtreefunerals/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex"
              >
                See All Reviews on Google <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </section>        {/* ── 7b. PHOTO GALLERY ────────────────────────────────────────── */}
        <section className="py-16 bg-brand-ivory overflow-hidden">
          <div className="container">
            <Reveal className="mb-8 text-center">
              <div className="w-10 h-px bg-brand-gold mx-auto mb-4" />
              <p className="section-label mb-2">Our Services in Action</p>
              <h2
                className="font-serif text-brand-navy font-semibold"
                style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", letterSpacing: "-0.02em" }}
              >
                Every Farewell, Thoughtfully Arranged
              </h2>
            </Reveal>
            {/* 2-row masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Row 1: tall + wide + tall */}
              <div className="rounded-2xl overflow-hidden row-span-2 aspect-[3/4] col-span-1">
                <img src={CASKET_CATHEDRAL} alt="Casket with roses at cathedral altar" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src={BUTTERFLY_FLOWERS} alt="Butterfly resting on floral tribute" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src={CASKET_HEARSE} alt="Casket with white lilies in hearse" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src={BIRDCAGE_GARDEN} alt="Birdcage with white roses at memorial garden" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
              </div>
              {/* Row 2 */}
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src={BAGPIPER} alt="Bagpiper leading funeral procession" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src={PALLBEARERS} alt="Pallbearers carrying casket" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src={PRIEST_BLESSING} alt="Priest blessing casket at hearse" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
              </div>
            </div>
            {/* Full-width hearse banner */}
            <Reveal className="mt-3 rounded-2xl overflow-hidden aspect-[21/6]">
              <img src={HEARSE_BRANDED} alt="Willow Tree Funerals branded hearse" className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
            </Reveal>
          </div>
        </section>
        {/* ── 8. SERVICE AREAS ────────────────────────────────────────────── */}
        <section className="py-20 bg-brand-light-blue/25">
          <div className="container">
            <Reveal className="mb-10">
              <div className="grid lg:grid-cols-2 gap-8 items-end">
                <div>
                  <div className="w-10 h-px bg-brand-gold mb-5" />
                  <p className="section-label mb-3">Areas We Serve</p>
                  <h2
                    className="font-serif text-brand-navy font-semibold"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
                  >
                    Serving All of Greater Sydney,<br />Wollongong &amp; the Central Coast
                  </h2>
                </div>
                <p className="text-brand-navy/60 text-sm leading-relaxed">
                  From Hurstville and the St George area to Campbelltown, Camden, Picton, Wollongong, and the Central Coast — your local, trusted funeral director.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {suburbs.map((suburb, i) => (
                <Reveal key={suburb} delay={i * 0.02}>
                  <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-brand-light-blue hover:border-brand-royal transition-colors group">
                    <MapPin size={11} className="text-brand-royal shrink-0 group-hover:text-brand-gold transition-colors" />
                    <span className="text-brand-navy text-xs font-sans">{suburb}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. FAQ ────────────────────────────────────────────────────── */}
        <section className="py-28 bg-brand-ivory">
          <div className="container max-w-3xl">
            <Reveal className="mb-12">
              <div className="w-10 h-px bg-brand-gold mb-5" />
              <p className="section-label mb-3">Frequently Asked Questions</p>
              <h2
                className="font-serif text-brand-navy font-semibold"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                We're Here to Help
              </h2>
            </Reveal>
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8EFF8]">
              {faqs.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/faq" className="btn-outline">View All FAQs <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>

        {/* ── 10. FINAL CTA ─────────────────────────────────────────────── */}
        <section
          className="relative py-40 overflow-hidden"
          style={{
            backgroundImage: `url(${HEARSE_BRANDED})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0 bg-brand-navy/78" />
          <div className="absolute top-0 left-0 right-0 h-px bg-brand-gold/30" />
          <div className="relative z-10 container">
            <div className="max-w-2xl">
              <Reveal>
                <div className="w-10 h-px bg-brand-gold mb-6" />
                <p className="section-label text-brand-gold mb-4">We're Here for You</p>
                <h2
                  className="font-serif text-white font-semibold leading-tight mb-4"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", letterSpacing: "-0.025em" }}
                >
                  You Focus On Healing.
                </h2>
                <h2
                  className="font-serif font-light leading-tight mb-8"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", letterSpacing: "-0.025em", color: "#8FA8C8", fontStyle: "italic" }}
                >
                  We'll Take Care Of The Rest.
                </h2>
                <p className="text-white/65 text-sm leading-relaxed mb-10 max-w-lg">
                  Call our Family Care Specialists any time of the day or night. We will answer, and we will help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={COMPANY.phoneHref}
                    className="btn-royal flex items-center justify-center gap-2 px-10 py-4"
                  >
                    <Phone size={15} /> {COMPANY.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy px-10 py-4 flex items-center justify-center gap-2"
                  >
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
