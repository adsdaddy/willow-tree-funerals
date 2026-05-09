/**
 * WILLOW TREE FUNERALS — Pricing Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "funeral cost sydney", "funeral pricing hurstville",
 *      "how much does a funeral cost", "transparent funeral pricing"
 * CRO: Transparent pricing is a MAJOR competitive gap — most Sydney funeral homes hide prices
 * Schema: PriceSpecification
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Phone, CheckCircle2, ChevronDown, Info } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { COMPANY } from "../../../shared/company";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://willowtreefunerals.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "Funeral Pricing", "item": "https://willowtreefunerals.com.au/pricing" }
  ]
};

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a funeral cost in Sydney?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Funeral costs in Sydney vary depending on the type of service. A simple direct cremation starts from approximately $2,200. A full funeral service with cremation typically ranges from $5,000–$9,000. A full funeral service with burial typically ranges from $8,000–$15,000+, depending on cemetery fees. Willow Tree Funerals provides transparent, itemised pricing with no hidden fees."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in a funeral service price?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our funeral service price includes professional funeral director fees, transfer of your loved one, preparation and presentation, the funeral service, a personalised order of service booklet, and all statutory documentation. Cemetery or crematorium fees, coffin selection, and optional extras are itemised separately."
      }
    }
  ]
};

interface Package {
  name: string;
  tagline: string;
  priceFrom: string;
  priceNote: string;
  includes: string[];
  highlight?: boolean;
}

const packages: Package[] = [
  {
    name: "Direct Cremation",
    tagline: "Simple, dignified, and affordable",
    priceFrom: "From $3,100",
    priceNote: "All-inclusive. No hidden fees.",
    includes: [
      "24/7 transfer into our care",
      "Professional preparation",
      "Cremation at a licensed Sydney crematorium",
      "Return of ashes in a quality urn",
      "Death certificate and documentation",
      "Ashes collection or delivery",
    ],
  },
  {
    name: "Cremation with Service",
    tagline: "A full farewell, followed by cremation",
    priceFrom: "From $7,500",
    priceNote: "Crematorium fees included. Coffin selection extra.",
    highlight: true,
    includes: [
      "24/7 transfer into our care",
      "Professional preparation and presentation",
      "Viewing at our chapel (if desired)",
      "Funeral service at chapel, church, or venue",
      "Personalised order of service booklet",
      "Cremation at a licensed crematorium",
      "Return of ashes in your chosen urn",
      "Death certificate and all documentation",
    ],
  },
  {
    name: "Traditional Burial",
    tagline: "A complete burial service with full ceremony",
    priceFrom: "From $9,500",
    priceNote: "Cemetery fees are additional and vary by cemetery.",
    includes: [
      "24/7 transfer into our care",
      "Professional embalming and presentation",
      "Viewing at our chapel",
      "Funeral service at chapel, church, or venue",
      "Hearse and funeral cortège",
      "Graveside committal service",
      "Personalised order of service booklet",
      "Cemetery booking and liaison",
      "Death certificate and all documentation",
    ],
  },
];

const additionalItems = [
  { item: "Coffin upgrade (from standard)", price: "From $500" },
  { item: "Urn upgrade (from standard)", price: "From $150" },
  { item: "Floral arrangements", price: "From $250" },
  { item: "Memorial video tribute", price: "From $375" },
  { item: "Live streaming of service", price: "From $600" },
  { item: "Celebrant fee (if required)", price: "From $600" },
  { item: "Catering coordination", price: "POA" },
  { item: "Death notice / obituary", price: "From $400" },
  { item: "Ashes scattering service", price: "From $350" },
  { item: "Repatriation (international)", price: "POA" },
];

const cemeteryFees = [
  { cemetery: "Rookwood Cemetery", type: "Burial", approx: "$4,000–$12,000+" },
  { cemetery: "Woronora Memorial Park", type: "Burial / Cremation", approx: "$3,500–$10,000+" },
  { cemetery: "Sutherland General Cemetery", type: "Burial", approx: "$3,000–$8,000+" },
  { cemetery: "MacArthur Memorial Park (Varroville)", type: "Burial / Cremation", approx: "$3,500–$9,000+" },
  { cemetery: "Botany Cemetery", type: "Burial", approx: "$3,000–$7,000+" },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-light-blue">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-serif text-brand-navy font-semibold text-base md:text-lg">{q}</span>
        <ChevronDown size={18} className={`text-brand-royal shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5 pr-8" role="region">
          <p className="text-brand-navy/70 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

const pricingFaqs = [
  {
    q: "Are these prices all-inclusive?",
    a: "Our service packages include all professional funeral director fees. Cemetery fees, coffin upgrades, and optional extras are itemised separately and clearly quoted before any commitment is made. There are no hidden fees.",
  },
  {
    q: "Can I get a personalised quote?",
    a: "Yes. Call us on " + COMPANY.phone + " or complete our contact form. We will provide a fully itemised, written quote tailored to your family's specific needs and wishes — with no obligation.",
  },
  {
    q: "What is not included in the package price?",
    a: "Cemetery or crematorium fees, coffin upgrades (above the standard included coffin), floral arrangements, catering, and optional personalisation items are quoted separately. We will always explain what is and isn't included before you commit.",
  },
  {
    q: "Does the government provide any funeral assistance?",
    a: "Centrelink provides a Bereavement Payment in some circumstances. The Department of Veterans' Affairs provides funeral assistance for eligible veterans. We can advise you on eligibility and help you apply.",
  },
  {
    q: "Can I pay for a funeral in advance?",
    a: "Yes. Pre-paying for your funeral locks in today's prices and ensures the cost is fully covered. Funds are held in a regulated trust. Please visit our Pre-Arranged Funerals page or call our team to discuss.",
  },
  {
    q: "What if I cannot afford a funeral?",
    a: "We understand that cost is a real concern for many families. We will always work with you to find a dignified solution within your budget. Please call our team and speak openly — we will do our best to help.",
  },
];

export default function Pricing() {
  useScrollReveal();

  useEffect(() => {
    const id = "breadcrumb-schema";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      (el as HTMLScriptElement).type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(breadcrumbSchema);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <>
      <SEOHead
        title="Funeral Pricing Sydney | Transparent Funeral Costs | Willow Tree Funerals"
        description="Transparent funeral pricing with no hidden fees. Willow Tree Funerals, Hurstville. Direct cremation from $2,200. Full funeral services from $5,500. Call 02 8776 1667 for a personalised quote."
        canonical="/pricing"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end py-28 pt-36"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-pricing-JLQAcEeMk3Z9GnAibkXuwT.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Pricing hero"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/30" />
        <div className="relative z-10 container max-w-3xl text-center mx-auto">
          <p className="section-label text-brand-gold mb-3">Transparent Pricing</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            Honest Funeral Pricing — No Hidden Fees
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            We believe every family deserves to know exactly what they are paying for. All prices are clearly itemised, fully explained, and confirmed in writing before any commitment is made.
          </p>
          <div className="flex items-center justify-center gap-2 bg-brand-gold/10 border border-brand-gold/30 px-6 py-3 inline-flex">
            <Info size={16} className="text-brand-gold shrink-0" />
            <p className="text-white/80 text-sm">Prices shown are indicative starting points. Call our team for a personalised, itemised quote.</p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-brand-ivory">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col ${
                  pkg.highlight
                    ? "border-2 border-brand-royal shadow-xl shadow-brand-royal/10"
                    : "border border-brand-light-blue"
                } bg-white p-8`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-royal px-4 py-1">
                    <span className="text-white text-xs tracking-widest uppercase font-sans font-semibold">Most Popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="font-serif text-brand-navy text-2xl font-semibold mb-1">{pkg.name}</h2>
                  <p className="text-brand-navy/70 text-sm">{pkg.tagline}</p>
                </div>
                <div className="mb-6">
                  <p className="font-serif text-brand-navy text-3xl font-semibold">{pkg.priceFrom}</p>
                  <p className="text-brand-navy/70 text-xs mt-1">{pkg.priceNote}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-gold mt-0.5 shrink-0" />
                      <span className="text-brand-navy/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={COMPANY.phoneHref} className={pkg.highlight ? "btn-royal text-center" : "btn-outline text-center"}>
                  Call for a Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional extras */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <p className="section-label mb-3">Optional Extras</p>
          <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold mb-8">
            Personalisation &amp; Additional Services
          </h2>
          <div className="border border-brand-light-blue overflow-hidden">
            {additionalItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-brand-ivory"
                }`}
              >
                <span className="text-brand-navy/75 text-sm">{item.item}</span>
                <span className="font-sans font-semibold text-brand-navy text-sm">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-brand-navy/70 text-xs mt-4">
            POA = Price on application. All prices are indicative and subject to confirmation. Contact our team for a personalised quote.
          </p>
        </div>
      </section>

      {/* Cemetery fees */}
      <section className="py-20 bg-brand-light-blue/20">
        <div className="container max-w-4xl">
          <p className="section-label mb-3">Cemetery &amp; Crematorium Fees</p>
          <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold mb-4">
            Understanding Cemetery Costs
          </h2>
          <p className="text-brand-navy/65 leading-relaxed mb-8">
            Cemetery and crematorium fees are set by the cemetery authority — not by us — and are charged separately. The figures below are approximate guides only. We will obtain an exact quote from your chosen cemetery as part of your funeral arrangement.
          </p>
          <div className="border border-brand-light-blue overflow-hidden">
            <div className="grid grid-cols-3 bg-brand-navy px-6 py-3">
              <span className="text-white/60 text-xs tracking-widest uppercase font-sans">Cemetery</span>
              <span className="text-white/60 text-xs tracking-widest uppercase font-sans">Type</span>
              <span className="text-white/60 text-xs tracking-widest uppercase font-sans text-right">Approx. Fees</span>
            </div>
            {cemeteryFees.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-6 py-4 ${i % 2 === 0 ? "bg-white" : "bg-brand-ivory"}`}
              >
                <span className="text-brand-navy text-sm font-semibold">{row.cemetery}</span>
                <span className="text-brand-navy/60 text-sm">{row.type}</span>
                <span className="text-brand-navy text-sm text-right">{row.approx}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-ivory">
        <div className="container max-w-3xl">
          <p className="section-label mb-3">Pricing Questions</p>
          <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold mb-10">
            Common Questions About Cost
          </h2>
          {pricingFaqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-royal">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-white text-2xl md:text-3xl font-semibold mb-2">
                Get a Personalised, Itemised Quote
              </h2>
              <p className="text-white/75">Call our Family Care Specialists — no obligation, no pressure.</p>
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
