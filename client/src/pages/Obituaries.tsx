/**
 * WILLOW TREE FUNERALS — Obituaries Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "funeral obituaries sydney", "willow tree funerals obituaries"
 * Note: Names sourced from original site — no individual detail pages (privacy)
 */

import { Link } from "wouter";
import { Phone, ChevronRight, Heart, BookOpen } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { COMPANY } from "../../../shared/company";

const PROCESSION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0023_bedffdad.jpg";

// Names from original site obituaries directory
const memorials = [
  "Wenying Li", "Andrew Xu", "Jamie Dowsett", "Frank Nygryn", "Melissa Richards",
  "Neville Pye", "Madeline Mazzella-Williams", "Jim Collard", "Adel Katrib",
  "Matthew Borham", "Loyd Hope", "Efstathios Papadimitriou", "Kevin Buckley",
  "Marie Lamond", "Gustaw Kaster", "Angus Ryce", "John Chate",
  "Penuel 'Ben' Robertson", "Stephan Henderson", "Rodney Jaggs", "George Vassallo",
  "Louiza Akhtar", "Robert James Bennett", "Marie Missen", "Brian Rylands",
  "Doris Odenthal", "Michael Imbert", "Catherine McGeown", "Emanuel Vassallo",
  "Vaitoelau Pele", "Ulrich (Rick) Odenthal", "Luke Raharaha", "Paul Hill",
  "Razia Emanuel", "Dorothy Kaster", "Wayne Tomlinson", "Pauline Hannan",
  "Raymond Burgess", "Mimose Mandavy", "Patricia Carey",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((n) => n.length > 1 && !["'", "("].some((c) => n.startsWith(c)))
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Obituaries — Willow Tree Funerals",
  "description": "A memorial directory honouring those who have passed through the care of Willow Tree Funerals in Sydney.",
  "publisher": {
    "@type": "FuneralHome",
    "name": COMPANY.name,
    "telephone": COMPANY.phone,
    "url": "https://www.willowtreefunerals.com.au"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.willowtreefunerals.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "Obituaries", "item": "https://www.willowtreefunerals.com.au/obituaries" }
  ]
};

export default function Obituaries() {
  useScrollReveal();

  return (
    <>
      <SEOHead
        title="Obituaries | Willow Tree Funerals — In Loving Memory"
        description="A memorial directory honouring those who have passed through the care of Willow Tree Funerals in Sydney. Each life remembered with dignity and love."
        canonical="/obituaries"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end"
        style={{
          backgroundImage: `url(${PROCESSION})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/65 to-brand-navy/25" />
        <div className="relative z-10 container pb-16 pt-32">
          <p className="section-label text-brand-gold mb-3">In Loving Memory</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            Obituaries
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            A memorial directory honouring those who have passed through the care of Willow Tree Funerals. Each life remembered with dignity, love, and reverence.
          </p>
        </div>
      </section>

      {/* Scripture quote */}
      <section className="py-12 bg-brand-navy">
        <div className="container">
          <blockquote className="text-center">
            <p className="scripture text-brand-gold text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              "I am the resurrection and the life. The one who believes in me will live, even though they die."
            </p>
            <footer className="font-sans text-white/40 text-xs tracking-widest uppercase mt-3">John 11:25</footer>
          </blockquote>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <p className="section-label mb-3">Memorial Directory</p>
            <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-6">
              Remembering Those We Have Served
            </h2>
            <p className="text-brand-navy/70 leading-relaxed mb-4">
              This page is a tribute to the individuals and families who have entrusted Willow Tree Funerals with the care of their loved ones. Each name represents a unique life, a family's love, and a story worth remembering.
            </p>
            <p className="text-brand-navy/70 leading-relaxed">
              If you would like to submit an obituary or share a tribute for a loved one, please contact our team and we will be honoured to help.
            </p>
          </div>
        </div>
      </section>

      {/* Memorial grid */}
      <section className="py-16 bg-brand-ivory">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 scroll-reveal">
            {memorials.map((name, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-brand-light-blue p-5 flex flex-col items-center text-center hover:border-brand-royal hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-brand-navy flex items-center justify-center mb-3 shrink-0">
                  <span className="font-serif text-white text-lg font-semibold">
                    {getInitials(name)}
                  </span>
                </div>
                <p className="font-serif text-brand-navy text-sm font-semibold leading-snug">{name}</p>
                <div className="mt-2">
                  <Heart size={12} className="text-brand-gold/60 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit an obituary */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center scroll-reveal">
            <div>
              <p className="section-label mb-3">Submit a Tribute</p>
              <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-5">
                Share a Loved One's Story
              </h2>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                If you would like to submit an obituary or memorial tribute for a loved one who was cared for by Willow Tree Funerals, we would be honoured to include them in our memorial directory.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-8">
                Please contact our Family Care Specialists and we will guide you through the process with care and sensitivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={COMPANY.phoneHref} className="btn-primary flex items-center gap-2 justify-center">
                  <Phone size={15} /> {COMPANY.phone}
                </a>
                <Link href="/contact" className="btn-outline flex items-center gap-2 justify-center">
                  Contact Us <ChevronRight size={14} />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="rounded-2xl bg-brand-light-blue/30 border border-brand-light-blue p-6">
                <BookOpen size={24} className="text-brand-royal mb-3" />
                <h3 className="font-serif text-brand-navy text-lg font-semibold mb-2">Write an Obituary</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed">
                  An obituary is a meaningful way to share your loved one's story — their life, their passions, their family, and their legacy. Our team can help you craft a tribute that truly honours who they were.
                </p>
              </div>
              <div className="rounded-2xl bg-brand-light-blue/30 border border-brand-light-blue p-6">
                <Heart size={24} className="text-brand-royal mb-3" />
                <h3 className="font-serif text-brand-navy text-lg font-semibold mb-2">Plan a Celebration of Life</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed mb-3">
                  A celebration of life is a beautiful way to honour your loved one's memory with family and friends. We can help you plan every detail.
                </p>
                <Link href="/services/celebration-of-life" className="text-brand-royal text-sm font-semibold hover:underline inline-flex items-center gap-1">
                  Learn more <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-royal">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-white text-2xl md:text-3xl font-semibold mb-2">
                We Are Here for Your Family
              </h2>
              <p className="text-white/75">
                Our Family Care Specialists are available 24 hours, 7 days a week — call any time.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href={COMPANY.phoneHref} className="btn-primary bg-white text-brand-navy border-white hover:bg-brand-ivory flex items-center gap-2">
                <Phone size={15} /> {COMPANY.phone}
              </a>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy flex items-center gap-2">
                Send an Enquiry <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
