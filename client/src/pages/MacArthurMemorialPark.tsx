/**
 * WILLOW TREE FUNERALS — MacArthur Memorial Park Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "macarthur memorial park funeral", "macarthur memorial park varroville",
 *      "funeral director macarthur memorial park", "varroville cemetery funeral"
 * UNCONTESTED KEYWORD — highest priority South West Sydney SEO page
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Phone, MapPin, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { COMPANY } from "../../../shared/company";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.willowtreefunerals.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "MacArthur Memorial Park", "item": "https://www.willowtreefunerals.com.au/macarthur-memorial-park" }
  ]
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FuneralHome",
      "name": COMPANY.name,
      "url": "https://www.willowtreefunerals.com.au",
      "telephone": COMPANY.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Macquarie Links",
        "addressRegion": "NSW",
        "postalCode": "2565",
        "addressCountry": "AU"
      },
      "areaServed": [
        { "@type": "City", "name": "Varroville" },
        { "@type": "City", "name": "Campbelltown" },
        { "@type": "City", "name": "Liverpool" },
        { "@type": "City", "name": "Narellan" },
        { "@type": "City", "name": "Gregory Hills" },
        { "@type": "City", "name": "Ingleburn" },
        { "@type": "City", "name": "Macquarie Links" },
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is MacArthur Memorial Park?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "MacArthur Memorial Park is Sydney's newest Crown cemetery, located at Varroville in South West Sydney. It is the first new Crown cemetery to open in Sydney since the 1920s, offering beautiful landscaped grounds, a multi-denominational chapel, and burial and cremation options."
          }
        },
        {
          "@type": "Question",
          "name": "Which funeral directors serve MacArthur Memorial Park?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Willow Tree Funerals is one of the first funeral directors to establish a presence near MacArthur Memorial Park at Varroville. With our Macquarie Links location, we are ideally placed to serve families choosing this cemetery."
          }
        }
      ]
    }
  ]
};

const features = [
  "Sydney's newest Crown cemetery — opened 2024",
  "Located at Varroville, South West Sydney",
  "Beautifully landscaped natural grounds",
  "Multi-denominational chapel on site",
  "Burial plots, lawn sections, and mausoleum options",
  "Cremation niches and memorial gardens",
  "Catholic, Christian, and multi-faith sections",
  "Accessible from Campbelltown, Liverpool, Narellan & surrounds",
];

const faqs = [
  {
    q: "What is MacArthur Memorial Park?",
    a: "MacArthur Memorial Park is Sydney's newest Crown cemetery, located at Varroville in South West Sydney. It is the first new Crown cemetery to open in Sydney since the 1920s. The park offers beautifully landscaped grounds, a multi-denominational chapel, burial plots, cremation niches, and memorial gardens.",
  },
  {
    q: "Where is MacArthur Memorial Park located?",
    a: "MacArthur Memorial Park is located at Varroville, NSW 2566 — in South West Sydney, near Campbelltown, Liverpool, Narellan, and Gregory Hills. It is easily accessible from the Hume Highway and the South Western Motorway.",
  },
  {
    q: "Can I have a Catholic burial at MacArthur Memorial Park?",
    a: "Yes. MacArthur Memorial Park has dedicated Catholic and Christian sections, and the on-site chapel can accommodate Catholic funeral services. Willow Tree Funerals can coordinate your Requiem Mass and Catholic burial at the park.",
  },
  {
    q: "How do I book a burial at MacArthur Memorial Park?",
    a: "Call Willow Tree Funerals on 02 8776 1667. We handle all cemetery bookings, grave selection, and preparation on your behalf. You do not need to contact the cemetery directly — we take care of everything.",
  },
  {
    q: "What types of burial are available at MacArthur Memorial Park?",
    a: "MacArthur Memorial Park offers traditional lawn burial, natural burial, mausoleum entombment, and cremation interment in niches and memorial gardens. We can advise on all options and availability.",
  },
  {
    q: "Is MacArthur Memorial Park suitable for families from Campbelltown, Liverpool, and Narellan?",
    a: "Yes. MacArthur Memorial Park is ideally located for families from Campbelltown, Liverpool, Narellan, Gregory Hills, Ingleburn, Leumeah, Varroville, and all surrounding South West Sydney suburbs.",
  },
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
        <span className="font-serif text-brand-navy font-semibold text-base">{q}</span>
        <ChevronDown size={18} className={`text-brand-royal shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5 pr-8" role="region">
          <p className="text-brand-navy/70 leading-relaxed text-sm">{a}</p>
        </div>
      )}
    </div>
  );
}

const suburbs = [
  "Varroville", "Campbelltown", "Liverpool", "Narellan", "Gregory Hills",
  "Ingleburn", "Leumeah", "Macquarie Links", "Macquarie Fields", "Minto",
  "Raby", "St Andrews", "Currans Hill", "Mount Annan", "Harrington Park",
  "Cobbitty", "Elderslie", "Camden", "Smeaton Grange", "Bardia",
];

export default function MacArthurMemorialPark() {
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
        title="MacArthur Memorial Park Funeral Director | Varroville Cemetery | Willow Tree Funerals"
        description="Willow Tree Funerals — funeral directors serving MacArthur Memorial Park at Varroville, South West Sydney. Catholic funerals, burial & cremation at Sydney's newest Crown cemetery. Call 02 8776 1667."
        canonical="/macarthur-memorial-park"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[65vh] flex items-end"
        style={{
          backgroundImage: `url(${COMPANY.assets.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/65 to-brand-navy/25" />
        <div className="relative z-10 container pb-16 pt-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs tracking-wider uppercase font-sans mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-brand-gold">MacArthur Memorial Park</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-brand-gold" />
            <p className="section-label text-brand-gold">Varroville, South West Sydney</p>
          </div>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            Funeral Services at MacArthur Memorial Park
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed mb-8">
            Willow Tree Funerals is one of the first funeral directors to serve families choosing Sydney's newest Crown cemetery at Varroville — with our Macquarie Links location right on your doorstep.
          </p>
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

      {/* About the cemetery */}
      <section className="py-24 bg-brand-ivory">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-3">About MacArthur Memorial Park</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Sydney's Newest Crown Cemetery
              </h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
                MacArthur Memorial Park at Varroville is the first new Crown cemetery to open in Sydney since the 1920s. Set on beautifully landscaped grounds in South West Sydney, it offers a peaceful, natural setting for burials, cremation interments, and memorial services.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                The park features a multi-denominational chapel, dedicated Catholic and Christian sections, lawn burial areas, mausoleum options, and cremation memorial gardens. It is ideally located for families from Campbelltown, Liverpool, Narellan, Gregory Hills, and all of the MacArthur region.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-8">
                Willow Tree Funerals established our Macquarie Links location specifically to serve the growing South West Sydney community — and to be the natural choice for families choosing MacArthur Memorial Park.
              </p>
              <Link href="/services/burial" className="btn-primary">Learn About Burial Services</Link>
            </div>
            <div>
              <ul className="space-y-4">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-gold mt-0.5 shrink-0" />
                    <span className="text-brand-navy/75">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us for MacArthur */}
      <section className="py-24 bg-brand-navy">
        <div className="container">
          <div className="text-center mb-16">
            <p className="section-label text-brand-gold mb-3">Why Choose Willow Tree</p>
            <h2 className="font-serif text-white text-4xl md:text-5xl font-semibold">
              Your Local MacArthur Funeral Director
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Local Presence",
                desc: "Our Macquarie Links location means we are right in the MacArthur region — close to you, and close to the cemetery. We know the park, the staff, and the processes.",
              },
              {
                title: "Catholic Expertise",
                desc: "We are experienced Catholic funeral directors. We coordinate Requiem Masses, graveside committals, and all Catholic rites at MacArthur Memorial Park's Catholic sections.",
              },
              {
                title: "All Arrangements Handled",
                desc: "We manage everything — cemetery booking, grave selection, preparation, the funeral service, and the graveside committal. You focus on your family; we handle the rest.",
              },
            ].map((p, i) => (
              <div key={i} className="border border-white/10 p-8 hover:border-brand-gold/40 transition-colors">
                <h3 className="font-serif text-white text-xl font-semibold mb-3">{p.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suburbs served */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <p className="section-label mb-3">Service Area</p>
            <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-4">
              Serving the MacArthur Region &amp; South West Sydney
            </h2>
            <p className="text-brand-navy/65 leading-relaxed">
              From our Macquarie Links location, we serve families across the entire MacArthur region and South West Sydney corridor.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {suburbs.map((suburb) => (
              <div key={suburb} className="flex items-center gap-2 bg-brand-ivory px-4 py-3 border border-brand-light-blue">
                <MapPin size={12} className="text-brand-royal shrink-0" />
                <span className="text-brand-navy text-sm font-sans">{suburb}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-ivory">
        <div className="container max-w-3xl">
          <p className="section-label mb-3">Frequently Asked Questions</p>
          <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold mb-10">
            MacArthur Memorial Park — Your Questions Answered
          </h2>
          {faqs.map((faq, i) => (
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
                Arranging a Funeral at MacArthur Memorial Park?
              </h2>
              <p className="text-white/75">Call our family care specialists — we will take care of everything, from the first call to the final farewell.</p>
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
