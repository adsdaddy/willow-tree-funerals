/**
 * WILLOW TREE FUNERALS — Service Page Template
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * Used by all service pages for consistent SEO, UX, and CRO structure
 *
 * Section order (CRO-optimised):
 * 1. Hero with H1 + breadcrumb
 * 2. Intro paragraph (keyword-rich)
 * 3. What's included (trust builder)
 * 4. Feature image + pull quote
 * 5. Process steps
 * 6. FAQ accordion (FAQPage schema)
 * 7. Related services
 * 8. CTA strip (phone + arrange button)
 */

import { Link } from "wouter";
import { Phone, ChevronRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import SEOHead from "./SEOHead";
import { COMPANY } from "../../../shared/company";

interface FAQ {
  q: string;
  a: string;
}

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface ServicePageProps {
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  hero: {
    label: string;
    heading: string;
    subheading: string;
    image: string;
  };
  intro: string;
  includes: string[];
  featureImage: string;
  pullQuote: string;
  steps: Step[];
  faqs: FAQ[];
  relatedServices: { label: string; href: string; desc: string }[];
  schema?: object;
}

function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-light-blue">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
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

export default function ServicePageTemplate({
  seo, hero, intro, includes, featureImage, pullQuote, steps, faqs, relatedServices, schema
}: ServicePageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <>
      <SEOHead {...seo} schema={schema || faqSchema} />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-end"
        style={{ backgroundImage: `url(${hero.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/20" />
        <div className="relative z-10 container pb-16 pt-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-xs tracking-wider uppercase font-sans mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services/funeral-services" className="hover:text-white/80 transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-brand-gold">{hero.label}</span>
          </nav>
          <p className="section-label text-brand-gold mb-3">{hero.label}</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            {hero.heading}
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed mb-8">{hero.subheading}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={COMPANY.phoneHref} className="btn-royal flex items-center gap-2">
              <Phone size={15} /> Call {COMPANY.phone}
            </a>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
              Arrange a Funeral
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-brand-ivory">
        <div className="container max-w-4xl">
          <p className="text-brand-navy/80 text-lg md:text-xl leading-relaxed">{intro}</p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-3">What's Included</p>
              <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold mb-8 leading-tight">
                Everything Cared For, So You Can Focus on Family
              </h2>
              <ul className="space-y-4">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-gold mt-0.5 shrink-0" />
                    <span className="text-brand-navy/75">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                <Link href="/contact" className="btn-primary">Enquire Now</Link>
                <Link href="/pricing" className="btn-outline">View Pricing</Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={featureImage}
                alt={hero.heading}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-navy p-6 max-w-xs hidden lg:block">
                <p className="scripture text-brand-gold text-sm leading-relaxed">"{pullQuote}"</p>
                <p className="font-sans text-white/40 text-xs tracking-widest uppercase mt-2">{COMPANY.scripture}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-24 bg-brand-navy">
        <div className="container">
          <div className="text-center mb-16">
            <p className="section-label text-brand-gold mb-3">Our Process</p>
            <h2 className="font-serif text-white text-3xl md:text-4xl font-semibold">
              Guiding You Through Every Step
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-brand-gold/20 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 border border-brand-gold/50 flex items-center justify-center mb-5">
                    <span className="font-serif text-brand-gold text-xl font-semibold">{step.num}</span>
                  </div>
                  <h3 className="font-serif text-white text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-ivory">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <p className="section-label mb-3">Frequently Asked Questions</p>
            <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold">
              Your Questions Answered
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-20 bg-white">
        <div className="container">
          <p className="section-label mb-3">Related Services</p>
          <h2 className="font-serif text-brand-navy text-2xl md:text-3xl font-semibold mb-10">
            We're Here for Every Need
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((s) => (
              <Link key={s.href} href={s.href}
                className="group border border-brand-light-blue p-6 hover:border-brand-royal hover:shadow-md transition-all">
                <h3 className="font-serif text-brand-navy text-lg font-semibold mb-2 group-hover:text-brand-royal transition-colors">
                  {s.label}
                </h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-brand-royal text-xs tracking-widest uppercase font-sans font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 bg-brand-royal">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-white text-2xl md:text-3xl font-semibold mb-2">
                We're Available 24 Hours, 7 Days a Week
              </h2>
              <p className="text-white/75">Call Bruce directly — no call centres, no delays.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href={COMPANY.phoneHref} className="btn-primary bg-white text-brand-navy border-white hover:bg-brand-ivory flex items-center gap-2">
                <Phone size={15} /> {COMPANY.phone}
              </a>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
                Send an Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
