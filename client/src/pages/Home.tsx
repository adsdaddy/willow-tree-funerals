/**
 * WILLOW TREE FUNERALS — Homepage (Redesigned)
 * Design: Sacred Elegance × Editorial Luxury
 * Philosophy: High-status, trust-forward, designer-crafted.
 *   - Split hero: bright willow tree image RIGHT, editorial copy LEFT
 *   - Framer-motion entrance animations (no AI-slop bounce, pure eased fades)
 *   - Count-up stats bar — animated numbers on scroll-enter
 *   - Service cards: refined hover, no emoji, typographic icons
 *   - About Bruce: full-bleed asymmetric image + editorial text
 *   - Testimonials: CSS marquee dual-row (dark-luxury pattern)
 *   - Typography: Playfair Display headings, Montserrat body (brand unchanged)
 *   - Colours: Royal Blue Navy, Gold, Ivory (brand unchanged)
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Phone, ChevronRight, ChevronDown, Star, MapPin, Shield, Clock, Heart, ArrowRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { COMPANY } from "../../../shared/company";

// ── Asset URLs ──────────────────────────────────────────────────────────────
const HERO_DAWN    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-bright-dawn-VnKQk6Dt7A3jyMiJqSJz4r.webp";
const CHAPEL_IMG   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-bright-chapel-SiEcAGNzmSqqRi8AGzsfeU.webp";
const BRUCE_PODIUM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-podium_d5ec753d.png";
const BRUCE_HEAD   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-headshot_18cf3f17.png";
const GRANDMOTHER  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/grandmother-granddaughter_157c2ea1.png";

// ── Motion helpers ───────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Count-up hook ────────────────────────────────────────────────────────────
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

// ── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    label: "Catholic Funerals",
    desc: "Deeply reverent Requiem Masses and liturgical services, coordinated with your parish priest.",
    href: "/services/catholic-funerals",
    num: "01",
  },
  {
    label: "Funeral Services",
    desc: "Personalised services tailored to honour your loved one's life, faith, and legacy.",
    href: "/services/funeral-services",
    num: "02",
  },
  {
    label: "Cremation Services",
    desc: "Dignified cremation with full ceremony options, from direct cremation to a full service.",
    href: "/services/cremation",
    num: "03",
  },
  {
    label: "Burial Services",
    desc: "Traditional burial at all Sydney cemeteries, including MacArthur Memorial Park.",
    href: "/services/burial",
    num: "04",
  },
  {
    label: "Celebration of Life",
    desc: "A joyful tribute celebrating who your loved one was — their passions, stories, and legacy.",
    href: "/services/celebration-of-life",
    num: "05",
  },
  {
    label: "Pre-Arranged Funerals",
    desc: "Plan ahead with confidence. Remove the burden from your family and lock in today's prices.",
    href: "/services/pre-arranged-funerals",
    num: "06",
  },
];

const testimonials = [
  {
    name: "Maria C.",
    suburb: "Hurstville",
    text: "Bruce and his team were absolutely wonderful during the most difficult time of our lives. Our mother's Catholic funeral was exactly as she would have wanted.",
    stars: 5,
  },
  {
    name: "Tony & Rosa M.",
    suburb: "Kogarah",
    text: "From the first phone call at 2am to the final farewell, Willow Tree Funerals were there for us every step of the way. Bruce is a true professional with a genuine heart.",
    stars: 5,
  },
  {
    name: "Father Patrick O.",
    suburb: "Rockdale",
    text: "Bruce Missen stands apart — his faith, his professionalism, and his care for families is exceptional. I recommend Willow Tree without hesitation.",
    stars: 5,
  },
  {
    name: "The Nguyen Family",
    suburb: "Sutherland",
    text: "We didn't know where to turn when Dad passed suddenly. Bruce answered our call immediately and guided us through everything. The service was beautiful.",
    stars: 5,
  },
  {
    name: "Angela B.",
    suburb: "Miranda",
    text: "Such a compassionate and dignified service. Bruce made us feel supported every step of the way. We couldn't have asked for more.",
    stars: 5,
  },
  {
    name: "The Rossi Family",
    suburb: "Bexley",
    text: "From the first call to the final farewell, everything was handled with grace and care. Willow Tree Funerals is truly exceptional.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "What should I do when someone passes away?",
    a: "Call us immediately on " + COMPANY.phone + " — we are available 24 hours a day, 7 days a week. We will guide you through every step, starting with the transfer of your loved one into our care.",
  },
  {
    q: "Do you arrange Catholic funeral Masses?",
    a: "Yes. Bruce Missen has extensive experience coordinating Catholic funeral Masses with parish priests across the St George, Sutherland Shire, and South West Sydney areas. We handle all church liaison on your behalf.",
  },
  {
    q: "What is the difference between cremation and burial?",
    a: "Cremation involves the respectful reduction of the body to ashes, which can be kept, scattered, or interred. Burial involves placing the coffin in a cemetery plot. Both options can include a full funeral service.",
  },
  {
    q: "How much does a funeral cost in Sydney?",
    a: "Funeral costs vary depending on the type of service. We offer transparent, itemised pricing with no hidden fees. Please visit our Pricing page or call us for a personalised quote.",
  },
  {
    q: "Do you serve areas outside Hurstville?",
    a: "Yes. We serve the entire St George and Sutherland Shire area, as well as South West Sydney including Campbelltown, Liverpool, Narellan, Gregory Hills, and the MacArthur Memorial Park at Varroville.",
  },
  {
    q: "Can I pre-arrange my own funeral?",
    a: "Absolutely. Pre-arranging your funeral is one of the greatest gifts you can give your family. It removes the burden of decision-making during grief and ensures your wishes are honoured.",
  },
];

const suburbs = [
  "Hurstville", "Kogarah", "Rockdale", "Bexley", "Penshurst",
  "Sutherland", "Cronulla", "Miranda", "Campbelltown", "Liverpool",
  "Macquarie Links", "Narellan", "Gregory Hills", "Ingleburn", "Varroville", "Leumeah",
];

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FuneralHome",
      "name": COMPANY.name,
      "description": "Compassionate, faith-based funeral services in Hurstville and South West Sydney. Catholic funerals, cremation, burial, and celebration of life services.",
      "url": "https://www.willowtreefunerals.com.au",
      "telephone": COMPANY.phone,
      "email": COMPANY.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": COMPANY.street,
        "addressLocality": COMPANY.suburb,
        "addressRegion": COMPANY.state,
        "postalCode": COMPANY.postcode,
        "addressCountry": "AU"
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$",
      "founder": { "@type": "Person", "name": COMPANY.director },
      "areaServed": suburbs.map(s => ({ "@type": "City", "name": s })),
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ]
};

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-light-blue">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-serif text-brand-navy font-semibold text-base md:text-lg group-hover:text-brand-royal transition-colors">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-brand-royal shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 pr-8" role="region">
          <p className="text-brand-navy/70 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Stat Item ─────────────────────────────────────────────────────────────────
function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp(target, 1.6, suffix);
  return (
    <div className="text-center px-6 py-8">
      <span ref={ref} className="font-serif text-brand-gold text-4xl md:text-5xl font-semibold block mb-1">
        {display}
      </span>
      <p className="font-sans text-white/50 text-xs tracking-widest uppercase">{label}</p>
    </div>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="shrink-0 w-80 bg-white border border-brand-light-blue p-7 mx-3"
      style={{ borderTop: "2px solid #B8973A" }}
    >
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.stars }).map((_, j) => (
          <Star key={j} size={12} className="text-brand-gold fill-brand-gold" />
        ))}
      </div>
      <p className="text-brand-navy/75 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
      <div>
        <p className="font-sans font-semibold text-brand-navy text-sm">{t.name}</p>
        <p className="text-brand-navy/40 text-xs tracking-wide">{t.suburb}, Sydney</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <SEOHead
        title="Willow Tree Funerals Hurstville | Compassionate Funeral Directors Sydney"
        description="Willow Tree Funerals — trusted funeral directors in Hurstville, Sydney NSW. Catholic funerals, cremation, burial & celebration of life. Available 24/7. Call Bruce Missen on 02 8776 1667."
        canonical="/"
        schema={homeSchema}
      />
      <Nav />

      {/* ── 1. HERO — Split editorial layout ─────────────────────────────── */}
      <section className="relative min-h-screen grid lg:grid-cols-2 overflow-hidden bg-brand-ivory">
        {/* Left: Editorial copy panel */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-32 lg:py-40 bg-brand-ivory">
          {/* Thin gold rule top-left */}
          <motion.div
            className="w-12 h-px bg-brand-gold mb-8"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          />

          <motion.p
            className="section-label text-brand-royal mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            Hurstville · South West Sydney
          </motion.p>

          <motion.h1
            className="font-serif text-brand-navy leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", letterSpacing: "-0.025em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          >
            Honouring Life.<br />
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "#B8973A" }}>Celebrating</em><br />
            Memories.
          </motion.h1>

          <motion.p
            className="font-baskerville italic text-brand-royal/80 text-lg mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          >
            "Do not let your hearts be troubled."
          </motion.p>
          <motion.p
            className="font-sans text-brand-navy/40 text-xs tracking-widest uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          >
            {COMPANY.scripture}
          </motion.p>

          <motion.p
            className="text-brand-navy/65 text-base leading-relaxed mb-10 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          >
            Willow Tree Funerals provides compassionate, faith-based funeral services across Hurstville, the St George area, and South West Sydney. Available 24 hours, 7 days a week.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          >
            <a
              href={COMPANY.phoneHref}
              className="btn-royal flex items-center justify-center gap-2 text-sm px-8 py-4"
            >
              <Phone size={15} /> Call {COMPANY.phone}
            </a>
            <Link
              href="/contact"
              className="btn-outline flex items-center justify-center gap-2 text-sm px-8 py-4"
            >
              Arrange a Funeral <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Trust micro-signals */}
          <motion.div
            className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-brand-light-blue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          >
            {[
              { icon: <Clock size={14} className="text-brand-gold" />, text: "Available 24 / 7" },
              { icon: <Shield size={14} className="text-brand-gold" />, text: "Licensed NSW Director" },
              { icon: <Star size={14} className="text-brand-gold fill-brand-gold" />, text: "5 Stars on Google" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span className="font-sans text-brand-navy/60 text-xs tracking-wide">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Full-bleed hero image */}
        <div className="relative hidden lg:block overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <img
              src={HERO_DAWN}
              alt="Willow tree at dawn — Willow Tree Funerals"
              className="w-full h-full object-cover"
              width={1376}
              height={768}
              fetchPriority="high"
              decoding="async"
            />
            {/* Subtle left-edge gradient so copy panel edge is clean */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-ivory/30 via-transparent to-transparent" />
          </motion.div>

          {/* Floating credential badge */}
          <motion.div
            className="absolute bottom-10 right-10 bg-brand-navy/90 backdrop-blur-sm px-6 py-4 border-l-2 border-brand-gold"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          >
            <p className="font-sans text-white/50 text-xs tracking-widest uppercase mb-1">Est. {COMPANY.established}</p>
            <p className="font-serif text-white text-sm font-semibold">Bruce Missen</p>
            <p className="font-sans text-brand-gold text-xs tracking-wide">Licensed Funeral Director</p>
          </motion.div>
        </div>

        {/* Mobile hero image strip */}
        <div className="lg:hidden w-full h-64 overflow-hidden">
          <img
            src={HERO_DAWN}
            alt="Willow tree at dawn"
            className="w-full h-full object-cover object-center"
            width={768}
            height={256}
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* ── 2. COUNT-UP STATS BAR ────────────────────────────────────────── */}
      <section className="bg-brand-navy">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            <StatItem target={500} suffix="+" label="Families Served" />
            <StatItem target={24} suffix="/7" label="Always Available" />
            <StatItem target={5} suffix="★" label="Google Rating" />
            <StatItem target={2} suffix=" Locations" label="Hurstville & Macquarie Links" />
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES — Numbered editorial grid ───────────────────────── */}
      <section className="py-32 bg-brand-ivory">
        <div className="container">
          <Reveal className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <div className="w-8 h-px bg-brand-gold mb-5" />
                <p className="section-label mb-3">Our Services</p>
                <h2
                  className="font-serif text-brand-navy font-semibold leading-tight"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
                >
                  Every Farewell,<br />Thoughtfully Arranged
                </h2>
              </div>
              <div>
                <p className="text-brand-navy/60 text-base leading-relaxed">
                  From traditional Catholic funeral Masses to intimate celebrations of life, we offer a full range of funeral services tailored to your family's faith, culture, and wishes.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-light-blue">
            {services.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.06}>
                <Link
                  href={s.href}
                  className="group bg-white p-8 flex flex-col gap-4 h-full hover:bg-brand-navy transition-colors duration-500"
                >
                  <span className="font-sans text-brand-light-blue/0 group-hover:text-brand-gold/40 text-5xl font-semibold leading-none transition-colors duration-500 select-none">
                    {s.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-brand-navy group-hover:text-white text-xl font-semibold mb-3 transition-colors duration-500">
                      {s.label}
                    </h3>
                    <p className="text-brand-navy/55 group-hover:text-white/60 text-sm leading-relaxed transition-colors duration-500">
                      {s.desc}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-brand-royal group-hover:text-brand-gold text-xs tracking-widest uppercase font-sans font-medium transition-colors duration-500">
                    Learn More <ChevronRight size={12} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT BRUCE — Full-bleed asymmetric ──────────────────────── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
            {/* Image side */}
            <Reveal y={30}>
              <div className="relative">
                {/* Main image */}
                <img
                  src={BRUCE_PODIUM}
                  alt="Bruce Missen — Funeral Director at Willow Tree Funerals"
                  className="w-full aspect-[4/5] object-cover object-top"
                  width={560}
                  height={700}
                  loading="lazy"
                  decoding="async"
                />
                {/* Est. badge */}
                <div className="absolute top-6 left-6 bg-brand-gold px-4 py-2">
                  <p className="font-sans text-white text-xs tracking-widest uppercase font-semibold">
                    Est. {COMPANY.established}
                  </p>
                </div>
                {/* Headshot inset */}
                <div className="absolute -bottom-8 -right-6 w-36 h-36 hidden lg:block border-4 border-white shadow-2xl overflow-hidden">
                  <img
                    src={BRUCE_HEAD}
                    alt="Bruce Missen"
                    className="w-full h-full object-cover"
                    width={144}
                    height={144}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>

            {/* Text side */}
            <div className="lg:pl-4">
              <Reveal delay={0.1}>
                <div className="w-8 h-px bg-brand-gold mb-5" />
                <p className="section-label mb-3">Meet Your Funeral Director</p>
                <h2
                  className="font-serif text-brand-navy font-semibold leading-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
                >
                  Bruce Missen —<br />
                  <em style={{ fontStyle: "italic", fontWeight: 300, color: "#1B4B8A" }}>
                    A Calling, Not Just a Career
                  </em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-brand-navy/70 text-base leading-relaxed mb-5">
                  Bruce Missen founded Willow Tree Funerals with a single purpose: to provide the families of the St George and South West Sydney communities with funeral care that is deeply personal, faith-centred, and genuinely compassionate.
                </p>
                <p className="text-brand-navy/70 text-base leading-relaxed mb-7">
                  With years of experience as a licensed NSW funeral director, Bruce has guided hundreds of families through their most difficult moments. His Catholic faith and commitment to dignity inform every service he conducts.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <blockquote className="border-l-2 border-brand-gold pl-6 mb-8">
                  <p className="font-baskerville italic text-brand-royal text-lg leading-relaxed">
                    "I believe every person deserves a farewell that truly honours who they were. That is the promise I make to every family."
                  </p>
                  <footer className="font-sans text-brand-navy/40 text-xs tracking-widest uppercase mt-3">
                    — Bruce Missen, Founder
                  </footer>
                </blockquote>
                <Link href="/about" className="btn-primary">
                  Meet Bruce
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHY CHOOSE US — Three pillars on navy ────────────────────── */}
      <section className="py-32 bg-brand-navy overflow-hidden">
        <div className="container">
          <Reveal className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <div className="w-8 h-px bg-brand-gold mb-5" />
                <p className="section-label text-brand-gold mb-3">Why Willow Tree</p>
                <h2
                  className="font-serif text-white font-semibold leading-tight"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
                >
                  The Difference<br />You'll Feel
                </h2>
              </div>
              <p className="text-white/50 text-base leading-relaxed">
                In a moment of profound grief, the quality of care you receive matters more than anything. Here is what sets Willow Tree apart.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart size={22} className="text-brand-gold" />,
                title: "Genuinely Personal",
                desc: "No call centres. No corporate scripts. When you call Willow Tree, you speak directly with Bruce — a real person who genuinely cares about your family.",
                num: "01",
              },
              {
                icon: <Shield size={22} className="text-brand-gold" />,
                title: "Faith & Dignity",
                desc: "Rooted in Catholic faith, we bring reverence and spiritual care to every service. We work closely with parish priests and clergy across Sydney.",
                num: "02",
              },
              {
                icon: <Star size={22} className="text-brand-gold fill-brand-gold" />,
                title: "Transparent Pricing",
                desc: "We believe families deserve clear, honest pricing with no hidden fees. Every quote is itemised and explained before any commitment is made.",
                num: "03",
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border border-white/8 p-8 hover:border-brand-gold/30 transition-colors duration-500 group h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center">
                      {p.icon}
                    </div>
                    <span className="font-sans text-white/10 text-4xl font-semibold group-hover:text-brand-gold/20 transition-colors duration-500">
                      {p.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-white text-xl font-semibold mb-3">{p.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CATHOLIC FAITH — Image + editorial text ──────────────────── */}
      <section className="py-32 bg-brand-ivory overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-20 items-center">
            {/* Image */}
            <Reveal y={30}>
              <div className="relative">
                <img
                  src={CHAPEL_IMG}
                  alt="Catholic chapel — Willow Tree Funerals"
                  className="w-full aspect-[4/3] object-cover"
                  width={660}
                  height={495}
                  loading="lazy"
                  decoding="async"
                />
                {/* Scripture overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 bg-brand-navy/85 backdrop-blur-sm"
                  style={{ borderTop: "2px solid #B8973A" }}
                >
                  <p className="font-baskerville italic text-white/85 text-sm leading-relaxed">
                    "I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live."
                  </p>
                  <p className="font-sans text-brand-gold text-xs tracking-widest uppercase mt-2">John 11:25</p>
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <div>
              <Reveal delay={0.1}>
                <div className="w-8 h-px bg-brand-gold mb-5" />
                <p className="section-label mb-3">Catholic Funeral Services</p>
                <h2
                  className="font-serif text-brand-navy font-semibold leading-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
                >
                  Serving Sydney's<br />
                  <em style={{ fontStyle: "italic", fontWeight: 300, color: "#1B4B8A" }}>
                    Catholic Community
                  </em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-brand-navy/70 text-base leading-relaxed mb-5">
                  Willow Tree Funerals is one of Sydney's most trusted Catholic funeral directors. We understand the liturgical traditions, the importance of the Requiem Mass, and the comfort that faith brings to grieving families.
                </p>
                <p className="text-brand-navy/70 text-base leading-relaxed mb-8">
                  We coordinate directly with parish priests across the St George, Sutherland Shire, and South West Sydney dioceses — handling all church bookings, order of service, and liturgical requirements on your behalf.
                </p>
                <Link href="/services/catholic-funerals" className="btn-primary">
                  Learn About Catholic Funerals
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS — CSS marquee dual-row ──────────────────────── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="container mb-14">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <div className="w-8 h-px bg-brand-gold mb-5" />
                <p className="section-label mb-3">Testimonials</p>
                <h2
                  className="font-serif text-brand-navy font-semibold leading-tight"
                  style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
                >
                  Words From the<br />Families We've Served
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-brand-navy/50 text-sm">5 stars on Google Reviews</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative">
          <div
            className="flex"
            style={{
              animation: "marquee 40s linear infinite",
              width: "max-content",
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* Row 2 — scrolls right (offset) */}
        <div className="relative mt-4">
          <div
            className="flex"
            style={{
              animation: "marquee-reverse 50s linear infinite",
              width: "max-content",
            }}
          >
            {[...testimonials.slice(2), ...testimonials, ...testimonials.slice(0, 2)].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
      </section>

      {/* ── 8. LOCAL AREA SEO GRID ──────────────────────────────────────── */}
      <section className="py-20 bg-brand-light-blue/25">
        <div className="container">
          <Reveal className="mb-10">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <div className="w-8 h-px bg-brand-gold mb-5" />
                <p className="section-label mb-3">Areas We Serve</p>
                <h2
                  className="font-serif text-brand-navy font-semibold"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
                >
                  Serving All of Sydney's South
                </h2>
              </div>
              <p className="text-brand-navy/60 text-sm leading-relaxed">
                From Hurstville and the St George area to Campbelltown, Liverpool, and the new MacArthur Memorial Park at Varroville — your local, trusted funeral director.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {suburbs.map((suburb, i) => (
              <Reveal key={suburb} delay={i * 0.03}>
                <div className="flex items-center gap-2 bg-white px-4 py-3 border border-brand-light-blue hover:border-brand-royal transition-colors group">
                  <MapPin size={12} className="text-brand-royal shrink-0 group-hover:text-brand-gold transition-colors" />
                  <span className="text-brand-navy text-sm font-sans">{suburb}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-32 bg-brand-ivory">
        <div className="container max-w-3xl">
          <Reveal className="mb-12">
            <div className="w-8 h-px bg-brand-gold mb-5" />
            <p className="section-label mb-3">Frequently Asked Questions</p>
            <h2
              className="font-serif text-brand-navy font-semibold"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              We're Here to Help
            </h2>
          </Reveal>
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
          <div className="mt-10">
            <Link href="/faq" className="btn-outline">View All FAQs</Link>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA — Full-bleed image with editorial overlay ─────── */}
      <section
        className="relative py-40 overflow-hidden"
        style={{
          backgroundImage: `url(${GRANDMOTHER})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Layered overlay — lighter than before */}
        <div className="absolute inset-0 bg-brand-navy/75" />
        {/* Gold rule accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-brand-gold/40" />

        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <Reveal>
              <div className="w-8 h-px bg-brand-gold mb-6" />
              <p className="section-label text-brand-gold mb-4">We're Here for You</p>
              <h2
                className="font-serif text-white font-semibold leading-tight mb-6"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
              >
                You Don't Have to<br />
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(184,151,58,0.9)" }}>
                  Face This Alone
                </em>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-10 max-w-lg">
                Call Bruce directly, any time of the day or night. We will answer, and we will help.
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
                  className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy px-10 py-4 flex items-center justify-center"
                >
                  Send an Enquiry
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
