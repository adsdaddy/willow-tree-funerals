/**
 * WILLOW TREE FUNERALS — About Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "about willow tree funerals", "bruce missen funeral director",
 *      "funeral director hurstville", "catholic funeral director sydney"
 * Schema: Person (Bruce Missen), FuneralHome
 */

import { Link } from "wouter";
import { Phone, Heart, Shield, Star, MapPin, Award, ChevronRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { COMPANY } from "../../../shared/company";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FuneralHome",
      "name": COMPANY.name,
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
      "founder": {
        "@type": "Person",
        "name": COMPANY.director,
        "jobTitle": COMPANY.directorTitle,
        "worksFor": { "@type": "Organization", "name": COMPANY.name }
      }
    },
    {
      "@type": "Person",
      "name": COMPANY.director,
      "jobTitle": COMPANY.directorTitle,
      "worksFor": { "@type": "Organization", "name": COMPANY.name },
      "description": "Bruce Missen is a licensed NSW funeral director and the founder of Willow Tree Funerals. He has guided hundreds of Sydney families through their most difficult moments with compassion, faith, and professionalism.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hurstville",
        "addressRegion": "NSW",
        "addressCountry": "AU"
      }
    }
  ]
};

const values = [
  {
    icon: <Heart size={28} className="text-brand-gold" />,
    title: "Genuine Compassion",
    desc: "We believe funeral care is a calling. Every family we serve receives our full attention, our genuine care, and our unwavering commitment to their wellbeing.",
  },
  {
    icon: <Shield size={28} className="text-brand-gold" />,
    title: "Faith & Dignity",
    desc: "Rooted in Catholic faith, we bring reverence and spiritual depth to every service. We honour the sacred nature of death and the promise of eternal life.",
  },
  {
    icon: <Star size={28} className="text-brand-gold" />,
    title: "Honest Transparency",
    desc: "We provide clear, itemised pricing with no hidden fees. We explain every option honestly so families can make informed decisions without pressure.",
  },
  {
    icon: <MapPin size={28} className="text-brand-gold" />,
    title: "Community Roots",
    desc: "We are a local, independent funeral home — not a corporate chain. We are deeply invested in the communities of Hurstville, St George, and South West Sydney.",
  },
  {
    icon: <Award size={28} className="text-brand-gold" />,
    title: "Professional Excellence",
    desc: "Bruce holds all required NSW funeral director licences and maintains the highest standards of professional practice, preparation, and care.",
  },
  {
    icon: <Phone size={28} className="text-brand-gold" />,
    title: "Always Available",
    desc: "Death does not keep business hours. We are available 24 hours a day, 7 days a week — and when you call, Bruce answers.",
  },
];

export default function About() {
  return (
    <>
      <SEOHead
        title="About Willow Tree Funerals | Bruce Missen — Funeral Director Hurstville"
        description="Meet Bruce Missen, founder and funeral director of Willow Tree Funerals in Hurstville. A faith-based, compassionate funeral home serving Sydney's south and South West Sydney since 2018."
        canonical="/about"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-end"
        style={{
          backgroundImage: `url(${COMPANY.assets.brucePodium})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/20" />
        <div className="relative z-10 container pb-16 pt-32">
          <p className="section-label text-brand-gold mb-3">About Us</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            A Funeral Home Built on Faith, Compassion &amp; Community
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            Willow Tree Funerals was founded by Bruce Missen in Hurstville — with a single purpose: to serve the families of Sydney's south with the care, dignity, and faith they deserve.
          </p>
        </div>
      </section>

      {/* Bruce's Story */}
      <section className="py-28 bg-brand-ivory">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src={COMPANY.assets.bruceHeadshot}
                alt="Bruce Missen — Funeral Director, Willow Tree Funerals"
                className="w-full aspect-[3/4] object-cover object-top"
              />
              <div className="absolute top-6 left-6 bg-brand-gold px-4 py-2">
                <p className="font-sans text-white text-xs tracking-widest uppercase font-semibold">
                  Est. {COMPANY.established}
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-navy p-6 max-w-xs hidden lg:block">
                <p className="scripture text-brand-gold text-sm leading-relaxed">
                  "Do not let your hearts be troubled. You believe in God; believe also in me."
                </p>
                <p className="font-sans text-white/40 text-xs tracking-widest uppercase mt-2">{COMPANY.scripture}</p>
              </div>
            </div>

            {/* Text */}
            <div className="lg:pl-8">
              <p className="section-label mb-3">Our Story</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Meet Bruce Missen
              </h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
                Bruce Missen is a licensed NSW funeral director and the founder of Willow Tree Funerals. He established the business in Hurstville in {COMPANY.established} with a clear vision: to create a funeral home that felt genuinely different from the corporate chains that dominate the industry.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                Bruce's Catholic faith is at the heart of everything he does. He understands the profound importance of the Requiem Mass, the comfort of scripture, and the role that faith plays in helping families find peace in the midst of grief. He works closely with parish priests across the Archdiocese of Sydney, and is trusted by clergy and families alike.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                Over the years, Bruce has guided hundreds of families through their most difficult moments — from sudden, unexpected losses to peaceful passings after long lives well lived. His approach is always the same: patient, honest, and deeply personal.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-8">
                In 2025, Willow Tree Funerals expanded to a second location at Macquarie Links, bringing the same standard of care to families across South West Sydney — including those choosing the new MacArthur Memorial Park at Varroville.
              </p>
              <blockquote className="border-l-2 border-brand-gold pl-5 mb-8">
                <p className="scripture text-brand-royal text-lg">
                  "I believe every person deserves a farewell that truly honours who they were. That is the promise I make to every family I serve."
                </p>
                <footer className="font-sans text-brand-navy/50 text-xs tracking-widest uppercase mt-2">
                  — Bruce Missen, Founder &amp; Funeral Director
                </footer>
              </blockquote>
              <a href={COMPANY.phoneHref} className="btn-primary flex items-center gap-2 w-fit">
                <Phone size={15} /> Call Bruce: {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-brand-navy">
        <div className="container">
          <div className="text-center mb-16">
            <p className="section-label text-brand-gold mb-3">Our Values</p>
            <h2 className="font-serif text-white text-4xl md:text-5xl font-semibold">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="border border-white/10 p-8 hover:border-brand-gold/40 transition-colors">
                <div className="mb-5">{v.icon}</div>
                <h3 className="font-serif text-white text-xl font-semibold mb-3">{v.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Locations */}
      <section className="py-28 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="section-label mb-3">Our Locations</p>
            <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Two Locations, One Standard of Care
            </h2>
            <p className="text-brand-navy/65 leading-relaxed">
              Whether you are in Hurstville or South West Sydney, Willow Tree Funerals is close to you — and we will always come to you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {COMPANY.locations.map((loc) => (
              <div key={loc.name} className="border border-brand-light-blue p-8 hover:border-brand-royal hover:shadow-md transition-all">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} className="text-brand-gold mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-serif text-brand-navy text-xl font-semibold">{loc.name}</h3>
                    <p className="text-brand-navy/50 text-sm font-sans">{loc.region}</p>
                  </div>
                </div>
                <p className="text-brand-navy/70 text-sm mb-2">{loc.address}</p>
                <p className="text-brand-navy/50 text-xs font-sans">Established {loc.established}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-royal">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-white text-2xl md:text-3xl font-semibold mb-2">
                Ready to Speak with Bruce?
              </h2>
              <p className="text-white/75">Available 24 hours, 7 days a week — call any time.</p>
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
