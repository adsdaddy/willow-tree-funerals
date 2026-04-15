/**
 * WILLOW TREE FUNERALS — Homepage
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: FuneralHome + LocalBusiness schema, keyword-rich copy
 * CRO: Above-fold phone CTA, trust signals, testimonials, FAQ
 *
 * Sections:
 * 1. Hero (full-screen, willow tree bg, dark text on dark overlay)
 * 2. Trust bar (24/7, licensed, 5-star, local)
 * 3. Services grid (6 services)
 * 4. About Bruce (asymmetric layout)
 * 5. Why Choose Us (3 pillars)
 * 6. Catholic / Faith section
 * 7. Testimonials
 * 8. Local area SEO grid
 * 9. FAQ accordion
 * 10. Final CTA
 */

import { useState } from "react";
import { Link } from "wouter";
import { Phone, ChevronRight, ChevronDown, Star, MapPin, Shield, Clock, Heart } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { COMPANY } from "../../../shared/company";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-main-38P4jzQnm5gVH5u842pmKp.webp";
const CATHOLIC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/catholic-service-LUjBvUWfNvTuieMmDW8eaL.webp";
const CELEBRATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/celebration-of-life-bCTtGLugDMZoxqHYrmmipo.webp";
const BRUCE_HEADSHOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-headshot_18cf3f17.png";
const BRUCE_PODIUM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-podium_d5ec753d.png";
const CHURCH_SERVICE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-service_a28d78fe.png";
const GRANDMOTHER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/grandmother-granddaughter_157c2ea1.png";

const services = [
  {
    label: "Catholic Funerals",
    desc: "Deeply reverent Catholic funeral Masses and services, coordinated with your parish priest and conducted with full liturgical care.",
    href: "/services/catholic-funerals",
    icon: "✝",
  },
  {
    label: "Funeral Services",
    desc: "Personalised funeral services tailored to honour your loved one's life, faith, and legacy — at any venue across Sydney.",
    href: "/services/funeral-services",
    icon: "🌿",
  },
  {
    label: "Cremation Services",
    desc: "Dignified cremation with full ceremony options, from simple direct cremation to a full service with viewing.",
    href: "/services/cremation",
    icon: "🕊",
  },
  {
    label: "Burial Services",
    desc: "Traditional burial services at all Sydney cemeteries, including the new MacArthur Memorial Park at Varroville.",
    href: "/services/burial",
    icon: "🌸",
  },
  {
    label: "Celebration of Life",
    desc: "A joyful, personalised tribute that celebrates who your loved one was — their passions, stories, and the lives they touched.",
    href: "/services/celebration-of-life",
    icon: "🌟",
  },
  {
    label: "Pre-Arranged Funerals",
    desc: "Plan ahead with confidence. Remove the burden from your family and ensure your wishes are honoured exactly as you intend.",
    href: "/services/pre-arranged-funerals",
    icon: "📋",
  },
];

const testimonials = [
  {
    name: "Maria C.",
    suburb: "Hurstville",
    text: "Bruce and his team were absolutely wonderful during the most difficult time of our lives. They handled everything with such grace and dignity. Our mother's Catholic funeral was exactly as she would have wanted.",
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
    text: "I have worked with many funeral directors over the years. Bruce Missen stands apart — his faith, his professionalism, and his care for families is exceptional. I recommend Willow Tree without hesitation.",
    stars: 5,
  },
  {
    name: "The Nguyen Family",
    suburb: "Sutherland",
    text: "We didn't know where to turn when Dad passed suddenly. Bruce answered our call immediately and guided us through everything. The service was beautiful and deeply personal.",
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
    a: "Cremation involves the respectful reduction of the body to ashes, which can be kept, scattered, or interred. Burial involves placing the coffin in a cemetery plot. Both options can include a full funeral service. We can explain all options during a no-obligation consultation.",
  },
  {
    q: "How much does a funeral cost in Sydney?",
    a: "Funeral costs vary depending on the type of service, cemetery or crematorium fees, and personalisation. We offer transparent, itemised pricing with no hidden fees. Please visit our Pricing page or call us for a personalised quote.",
  },
  {
    q: "Do you serve areas outside Hurstville?",
    a: "Yes. We serve the entire St George and Sutherland Shire area, as well as South West Sydney including Campbelltown, Liverpool, Narellan, Gregory Hills, and the MacArthur Memorial Park at Varroville.",
  },
  {
    q: "Can I pre-arrange my own funeral?",
    a: "Absolutely. Pre-arranging your funeral is one of the greatest gifts you can give your family. It removes the burden of decision-making during grief and ensures your wishes are honoured. Contact Bruce to arrange a confidential consultation.",
  },
];

const suburbs = [
  "Hurstville", "Kogarah", "Rockdale", "Bexley", "Penshurst",
  "Sutherland", "Cronulla", "Miranda", "Campbelltown", "Liverpool",
  "Macquarie Links", "Narellan", "Gregory Hills", "Ingleburn", "Varroville", "Leumeah",
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-light-blue">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-serif text-brand-navy font-semibold text-base md:text-lg">{q}</span>
        <ChevronDown size={18} className={`text-brand-royal shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-brand-navy/70 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

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

      {/* ── 1. HERO ── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center 30%" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/30" />
        <div className="relative z-10 container py-32">
          <div className="max-w-2xl">
            <p className="section-label text-brand-gold mb-4">Hurstville · South West Sydney</p>
            <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
              Honouring Life.<br />
              <span className="text-brand-gold">Celebrating</span><br />
              Memories.
            </h1>
            <p className="scripture text-white/80 text-lg mb-2">
              "Do not let your hearts be troubled."
            </p>
            <p className="font-sans text-white/50 text-xs tracking-widest uppercase mb-8">{COMPANY.scripture}</p>
            <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl">
              Willow Tree Funerals provides compassionate, faith-based funeral services across Hurstville, the St George area, and South West Sydney. Available 24 hours, 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2 text-sm px-8 py-4">
                <Phone size={16} /> Call {COMPANY.phone}
              </a>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy flex items-center justify-center gap-2 text-sm px-8 py-4">
                Arrange a Funeral
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── 2. TRUST BAR ── */}
      <section className="bg-brand-navy border-b border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: <Clock size={20} className="text-brand-gold" />, label: "Available", value: "24 / 7 · 365 Days" },
              { icon: <Shield size={20} className="text-brand-gold" />, label: "Licensed", value: "NSW Funeral Director" },
              { icon: <Star size={20} className="text-brand-gold" />, label: "Rated", value: "5 Stars on Google" },
              { icon: <MapPin size={20} className="text-brand-gold" />, label: "Locations", value: "Hurstville & Macquarie Links" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-5">
                {t.icon}
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-sans">{t.label}</p>
                  <p className="text-white font-sans font-semibold text-sm">{t.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES ── */}
      <section className="py-28 bg-brand-ivory">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
            <div>
              <p className="section-label mb-3">Our Services</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight">
                Every Farewell,<br />Thoughtfully Arranged
              </h2>
            </div>
            <div>
              <p className="text-brand-navy/65 text-lg leading-relaxed">
                From traditional Catholic funeral Masses to intimate celebrations of life, we offer a full range of funeral services tailored to your family's faith, culture, and wishes.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white border border-brand-light-blue p-8 hover:border-brand-royal hover:shadow-lg transition-all duration-300">
                <div className="text-3xl mb-5">{s.icon}</div>
                <h3 className="font-serif text-brand-navy text-xl font-semibold mb-3 group-hover:text-brand-royal transition-colors">
                  {s.label}
                </h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed mb-5">{s.desc}</p>
                <span className="text-brand-royal text-xs tracking-widest uppercase font-sans font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT BRUCE (asymmetric) ── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <div className="relative">
              <img
                src={BRUCE_PODIUM}
                alt="Bruce Missen — Funeral Director at Willow Tree Funerals"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 hidden lg:block">
                <img
                  src={BRUCE_HEADSHOT}
                  alt="Bruce Missen"
                  className="w-full h-full object-cover border-4 border-white shadow-xl"
                />
              </div>
              <div className="absolute top-6 left-6 bg-brand-gold px-4 py-2">
                <p className="font-sans text-white text-xs tracking-widest uppercase font-semibold">Est. {COMPANY.established}</p>
              </div>
            </div>
            {/* Text */}
            <div className="lg:pl-8">
              <p className="section-label mb-3">Meet Your Funeral Director</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Bruce Missen —<br />A Calling, Not Just a Career
              </h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
                Bruce Missen founded Willow Tree Funerals with a single purpose: to provide the families of the St George and South West Sydney communities with funeral care that is deeply personal, faith-centred, and genuinely compassionate.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                With years of experience as a licensed NSW funeral director, Bruce has guided hundreds of families through their most difficult moments. His Catholic faith and commitment to dignity inform every service he conducts.
              </p>
              <blockquote className="border-l-2 border-brand-gold pl-5 mb-8">
                <p className="scripture text-brand-royal text-lg">
                  "I believe every person deserves a farewell that truly honours who they were. That is the promise I make to every family."
                </p>
                <footer className="font-sans text-brand-navy/50 text-xs tracking-widest uppercase mt-2">— Bruce Missen, Founder</footer>
              </blockquote>
              <Link href="/about" className="btn-primary">Meet Bruce</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHY CHOOSE US ── */}
      <section className="py-28 bg-brand-navy">
        <div className="container">
          <div className="text-center mb-16">
            <p className="section-label text-brand-gold mb-3">Why Willow Tree</p>
            <h2 className="font-serif text-white text-4xl md:text-5xl font-semibold">
              The Difference You'll Feel
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={28} className="text-brand-gold" />,
                title: "Genuinely Personal",
                desc: "No call centres. No corporate scripts. When you call Willow Tree, you speak directly with Bruce — a real person who genuinely cares about your family.",
              },
              {
                icon: <Shield size={28} className="text-brand-gold" />,
                title: "Faith & Dignity",
                desc: "Rooted in Catholic faith, we bring reverence and spiritual care to every service. We work closely with parish priests and clergy across Sydney.",
              },
              {
                icon: <Star size={28} className="text-brand-gold" />,
                title: "Transparent Pricing",
                desc: "We believe families deserve clear, honest pricing with no hidden fees. Every quote is itemised and explained before any commitment is made.",
              },
            ].map((p, i) => (
              <div key={i} className="border border-white/10 p-8 hover:border-brand-gold/40 transition-colors">
                <div className="mb-5">{p.icon}</div>
                <h3 className="font-serif text-white text-xl font-semibold mb-3">{p.title}</h3>
                <p className="text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CATHOLIC / FAITH SECTION ── */}
      <section className="py-28 bg-brand-ivory overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-3">Catholic Funeral Services</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Serving Sydney's<br />Catholic Community
              </h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
                Willow Tree Funerals is one of Sydney's most trusted Catholic funeral directors. We understand the liturgical traditions, the importance of the Requiem Mass, and the comfort that faith brings to grieving families.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                We coordinate directly with parish priests across the St George, Sutherland Shire, and South West Sydney dioceses — handling all church bookings, order of service, and liturgical requirements on your behalf.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-8">
                Whether your loved one attended St Patrick's in Sutherland, St Brigid's in Marrickville, or any parish across Sydney, we will ensure their final farewell honours their faith with the reverence it deserves.
              </p>
              <Link href="/services/catholic-funerals" className="btn-primary">Learn About Catholic Funerals</Link>
            </div>
            <div className="relative">
              <img
                src={CHURCH_SERVICE}
                alt="Catholic funeral Mass in Sydney"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-royal p-6 max-w-xs hidden lg:block">
                <p className="scripture text-white/90 text-sm leading-relaxed">
                  "I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live."
                </p>
                <p className="font-sans text-white/50 text-xs tracking-widest uppercase mt-2">John 11:25</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ── */}
      <section className="py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
            <div>
              <p className="section-label mb-3">Testimonials</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight">
                Words From the<br />Families We've Served
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <img src={COMPANY.assets.fiveStars} alt="5 star rating" className="h-8 w-auto" />
              <p className="text-brand-navy/60 text-sm">Rated 5 stars on Google Reviews</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-brand-ivory border border-brand-light-blue p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-brand-navy/75 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-royal flex items-center justify-center">
                    <span className="text-white font-serif font-semibold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-brand-navy text-sm">{t.name}</p>
                    <p className="text-brand-navy/40 text-xs">{t.suburb}, Sydney</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. LOCAL AREA SEO GRID ── */}
      <section className="py-20 bg-brand-light-blue/30">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Areas We Serve</p>
            <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold">
              Serving All of Sydney's South
            </h2>
            <p className="text-brand-navy/60 mt-4 max-w-2xl mx-auto">
              From Hurstville and the St George area to Campbelltown, Liverpool, and the new MacArthur Memorial Park at Varroville — Willow Tree Funerals is your local, trusted funeral director across South Sydney and South West Sydney.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {suburbs.map((suburb) => (
              <div key={suburb} className="flex items-center gap-2 bg-white px-4 py-3 border border-brand-light-blue">
                <MapPin size={13} className="text-brand-royal shrink-0" />
                <span className="text-brand-navy text-sm font-sans">{suburb}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="py-28 bg-brand-ivory">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <p className="section-label mb-3">Frequently Asked Questions</p>
            <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold">
              We're Here to Help
            </h2>
          </div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
          <div className="mt-10">
            <Link href="/faq" className="btn-outline">View All FAQs</Link>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section
        className="relative py-32"
        style={{ backgroundImage: `url(${GRANDMOTHER})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-brand-navy/85" />
        <div className="relative z-10 container text-center">
          <p className="section-label text-brand-gold mb-4">We're Here for You</p>
          <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 max-w-3xl mx-auto leading-tight">
            You Don't Have to Face This Alone
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Call Bruce directly, any time of the day or night. We will answer, and we will help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2 px-10 py-4">
              <Phone size={16} /> {COMPANY.phone}
            </a>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy px-10 py-4">
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
