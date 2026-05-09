/**
 * SuburbPageTemplate — Reusable template for suburb-level SEO landing pages.
 * Each suburb page renders this with suburb-specific data.
 * Includes: hero, services, about Bruce, FAQ, CTA, JSON-LD schema.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { Phone, MapPin, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import SEOHead from "./SEOHead";
import { COMPANY } from "../../../shared/company";

export interface SuburbPageProps {
  suburb: string;
  region: string;
  slug: string;
  heroHeading: string;
  heroSubheading: string;
  intro: string;
  services: string[];
  nearbySuburbs: string[];
  faqs: { q: string; a: string }[];
  canonicalUrl: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
}

export default function SuburbPageTemplate({
  suburb,
  region,
  slug,
  heroHeading,
  heroSubheading,
  intro,
  services,
  nearbySuburbs,
  faqs,
  canonicalUrl,
  metaTitle,
  metaDescription,
  heroImage,
}: SuburbPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FuneralHome",
        name: COMPANY.name,
        url: `https://willowtreefunerals.com.au/funeral-director-${slug}`,
        telephone: COMPANY.phone,
        description: metaDescription,
        areaServed: { "@type": "City", name: suburb, addressRegion: "NSW", addressCountry: "AU" },
        founder: { "@type": "Person", name: "Bruce Missen" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://willowtreefunerals.com.au/" },
          { "@type": "ListItem", position: 2, name: `Funeral Director ${suburb}`, item: `https://willowtreefunerals.com.au/funeral-director-${slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  useEffect(() => {
    const id = `suburb-schema-${slug}`;
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      (el as HTMLScriptElement).type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { document.getElementById(id)?.remove(); };
  }, [slug]);

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-center bg-brand-navy overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-brand-navy/80" />
        <div className="relative z-10 container py-32 pt-40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-brand-gold" />
              <span className="section-label text-brand-gold">{region}</span>
            </div>
            <h1
              className="font-serif text-white font-bold leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", letterSpacing: "-0.03em" }}
            >
              {heroHeading}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">{heroSubheading}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2">
                <Phone size={14} /> Call {COMPANY.phone}
              </a>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy flex items-center justify-center gap-2">
                Send an Enquiry <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + Services */}
      <section className="py-20 bg-brand-ivory">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-3">Funeral Director {suburb}</p>
              <h2 className="font-serif text-brand-navy font-bold leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.025em" }}>
                Serving {suburb} & Surrounding Areas
              </h2>
              <p className="text-brand-navy/70 text-base leading-relaxed mb-6">{intro}</p>
              <p className="text-brand-navy/70 text-base leading-relaxed mb-8">
                Our team personally oversees every arrangement — you will always speak directly with your funeral director, not a call centre. We are available 24 hours a day, 7 days a week, including weekends and public holidays.
              </p>
              <a href={COMPANY.phoneHref} className="btn-royal inline-flex items-center gap-2">
                <Phone size={14} /> Call Us Now
              </a>
            </div>
            <div>
              <p className="section-label mb-4">Services Available in {suburb}</p>
              <div className="space-y-3">
                {services.map((svc) => (
                  <div key={svc} className="flex items-center gap-3 bg-white border border-brand-light-blue/60 px-5 py-4 rounded-lg">
                    <CheckCircle2 size={16} className="text-brand-royal shrink-0" />
                    <span className="text-brand-navy text-sm font-medium">{svc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-14 bg-brand-navy">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "24/7", label: "Availability" },
              { value: "500+", label: "Families Served" },
              { value: "5★", label: "Google Rating" },
              { value: "2", label: "Sydney Locations" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-white font-bold text-3xl mb-1">{value}</p>
                <p className="section-label text-white/60 text-[0.6rem]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby suburbs */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center">
          <p className="section-label mb-3">Also Serving</p>
          <h2 className="font-serif text-brand-navy font-bold text-2xl mb-6">Suburbs Near {suburb}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {nearbySuburbs.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 bg-brand-ivory text-brand-navy text-xs font-medium px-3.5 py-2 rounded-full border border-brand-royal/15">
                <MapPin size={9} className="text-brand-royal shrink-0" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-brand-ivory">
        <div className="container max-w-3xl">
          <p className="section-label mb-3 text-center">Frequently Asked Questions</p>
          <h2 className="font-serif text-brand-navy font-bold text-3xl mb-10 text-center">Funeral Services in {suburb}</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white border border-brand-light-blue/60 rounded-lg p-6">
                <h3 className="font-serif text-brand-navy font-semibold text-base mb-3">{q}</h3>
                <p className="text-brand-navy/80 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-navy">
        <div className="container max-w-2xl text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />)}
          </div>
          <h2 className="font-serif text-white font-bold text-3xl md:text-4xl mb-4 leading-tight">
            Need a Funeral Director in {suburb}?
          </h2>
          <p className="text-white/65 text-base leading-relaxed mb-8">
            Call us directly — available 24 hours a day, 7 days a week. We serve {suburb} and all surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2">
              <Phone size={14} /> {COMPANY.phone}
            </a>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy flex items-center justify-center gap-2">
              Send an Enquiry <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
