/**
 * WILLOW TREE FUNERALS — Order Flowers Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "funeral flowers sydney", "sympathy flowers hurstville", "order funeral flowers"
 */

import { Link } from "wouter";
import { Phone, ChevronRight, Flower, Truck, Heart } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { COMPANY } from "../../../shared/company";

const BUTTERFLY_FLOWERS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20230517-WA0056_b5a70d37.jpg";
const BIRDCAGE_GARDEN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg";
const CASKET_CATHEDRAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Funeral Flower Delivery — Willow Tree Funerals",
  "description": "Order funeral and sympathy flowers through Willow Tree Funerals. Partnered with Rays Florist and Lazy Daisy Florist for premium delivery to church services, funeral homes, and memorials across Sydney.",
  "provider": {
    "@type": "FuneralHome",
    "name": COMPANY.name,
    "telephone": COMPANY.phone,
    "url": "https://www.willowtreefunerals.com.au"
  },
  "areaServed": {
    "@type": "City",
    "name": "Sydney"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.willowtreefunerals.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "Order Flowers", "item": "https://www.willowtreefunerals.com.au/order-flowers" }
  ]
};

const flowerTypes = [
  {
    title: "Wreath Tributes",
    desc: "A timeless symbol of eternal life and remembrance. Wreaths are a traditional choice for funeral services, crafted with seasonal blooms and foliage.",
    icon: <Flower size={28} className="text-brand-gold" />,
  },
  {
    title: "Casket Flowers",
    desc: "Elegant floral arrangements designed to rest atop the casket during the service. Available in a range of styles from traditional to contemporary.",
    icon: <Heart size={28} className="text-brand-gold" />,
  },
  {
    title: "Tribute Heart Wreaths",
    desc: "A heartfelt expression of love and loss. Heart-shaped wreaths are a beautiful tribute for those closest to the departed.",
    icon: <Heart size={28} className="text-brand-gold" />,
  },
  {
    title: "Sympathy Arrangements",
    desc: "Thoughtful floral gifts delivered to the family home or service venue — a meaningful way to express your condolences and support.",
    icon: <Flower size={28} className="text-brand-gold" />,
  },
];

export default function OrderFlowers() {
  useScrollReveal();

  return (
    <>
      <SEOHead
        title="Order Funeral Flowers | Willow Tree Funerals — Sydney Delivery"
        description="Order funeral and sympathy flowers through Willow Tree Funerals. Partnered with Rays Florist and Lazy Daisy Florist for premium delivery to church services, funeral homes, and memorials across Sydney."
        canonical="/order-flowers"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end"
        style={{
          backgroundImage: `url(${BUTTERFLY_FLOWERS})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/20" />
        <div className="relative z-10 container pb-16 pt-32">
          <p className="section-label text-brand-gold mb-3">Order Flowers</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            Flowers for a Final Farewell
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            A beautiful floral tribute is one of the most meaningful ways to honour a life and express your love and condolences.
          </p>
        </div>
      </section>

      {/* Quote banner */}
      <section className="py-12 bg-brand-navy">
        <div className="container">
          <blockquote className="text-center">
            <p className="scripture text-brand-gold text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              "Those we love don't go away, they walk beside us everyday — unseen, unheard, but always near, still loved, still missed and very dear."
            </p>
          </blockquote>
        </div>
      </section>

      {/* Order section */}
      <section className="py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <p className="section-label mb-3">Order Flowers</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Our Preferred Florists
              </h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
                Willow Tree Funerals has partnered with two trusted local florists — <strong>Rays Florist</strong> and <strong>Lazy Daisy Florist</strong> — to provide beautiful, premium floral arrangements for funeral services and sympathy deliveries.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                Funeral flowers are floral arrangements suitable for delivery to church services, funeral homes, and memorials. They include wreath tributes, casket flowers, tribute heart wreaths, and sympathy arrangements.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-8">
                We offer a premium funeral delivery service to our customers at no extra cost. Servicing the local area ensures that we always deliver your flowers well in advance of any service.
              </p>

              <div className="rounded-2xl bg-brand-light-blue/40 border border-brand-light-blue p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Truck size={20} className="text-brand-royal mt-0.5 shrink-0" />
                  <div>
                    <p className="font-serif text-brand-navy font-semibold mb-1">Premium Delivery — No Extra Cost</p>
                    <p className="text-brand-navy/65 text-sm leading-relaxed">
                      We deliver to church services, funeral homes, memorials, and the family home. Always delivered well in advance of the service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href={COMPANY.phoneHref} className="btn-primary flex items-center gap-2 justify-center">
                  <Phone size={15} /> Call to Place an Order
                </a>
                <Link href="/contact" className="btn-outline flex items-center gap-2 justify-center">
                  Send an Enquiry <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="scroll-reveal">
              <img
                src={CASKET_CATHEDRAL}
                alt="Floral tribute at a funeral service — Willow Tree Funerals"
                className="rounded-2xl shadow-2xl w-full object-cover"
                style={{ maxHeight: "520px" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flower types */}
      <section className="py-28 bg-brand-ivory">
        <div className="container">
          <div className="text-center mb-14 scroll-reveal">
            <p className="section-label mb-3">Flower Arrangements</p>
            <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight">
              Types of Funeral Flowers
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal-stagger">
            {flowerTypes.map((type, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-brand-light-blue hover:border-brand-royal hover:shadow-lg transition-all">
                <div className="mb-5">{type.icon}</div>
                <h3 className="font-serif text-brand-navy text-lg font-semibold mb-3">{type.title}</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery strip */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img src={BUTTERFLY_FLOWERS} alt="Funeral flowers" className="rounded-2xl object-cover w-full h-48 md:h-64" loading="lazy" />
            <img src={BIRDCAGE_GARDEN} alt="Garden ceremony with flowers" className="rounded-2xl object-cover w-full h-48 md:h-64" loading="lazy" />
            <img src={CASKET_CATHEDRAL} alt="Casket with floral tribute" className="rounded-2xl object-cover w-full h-48 md:h-64 hidden md:block" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-royal">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-white text-2xl md:text-3xl font-semibold mb-2">
                Ready to Order Flowers?
              </h2>
              <p className="text-white/75">
                Call our team on <strong className="text-white">{COMPANY.phone}</strong> to arrange a beautiful floral tribute. We will handle everything.
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
