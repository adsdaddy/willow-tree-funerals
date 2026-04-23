/**
 * WILLOW TREE FUNERALS — About Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "about willow tree funerals", "bruce missen funeral director",
 *      "funeral director hurstville", "catholic funeral director sydney"
 * Schema: Person (Bruce Missen), FuneralHome
 * Content: Fully aligned with original willowtreefunerals.com.au/about-us
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { Phone, Heart, Shield, Star, MapPin, Award, ChevronRight, Users, TreePine, Sparkles } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
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
      "description": "Bruce Missen is the Managing Director and Founder of Willow Tree Funerals, registered through ASIC as a Funeral Director and Funeral Home operator. He has guided hundreds of Sydney families through their most difficult moments with compassion, faith, and professionalism.",
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
    desc: "Bruce holds all required NSW funeral director registrations and maintains the highest standards of professional practice, preparation, and care.",
  },
  {
    icon: <Phone size={28} className="text-brand-gold" />,
    title: "Always Available",
    desc: "Death does not keep business hours. We are available 24 hours a day, 7 days a week — and when you call, our team answers.",
  },
];

const faqs = [
  {
    q: "Do you have to have a funeral in Sydney?",
    a: "No, there is no legal requirement to hold a funeral in Australia. However, there are rules about handling your loved one's body, such as burial or cremation. If you have specific wishes about not having a funeral, make sure to communicate them clearly to your loved ones or executor. Funerals serve multiple purposes, and one of the most important is to provide a meaningful way for loved ones to say goodbye and begin the healing process.",
  },
  {
    q: "Should I choose burial or cremation?",
    a: "The choice between burial and cremation depends on personal, cultural, or religious preferences. Burial involves interment in a grave or vault, while cremation reduces the body to ashes. Consider factors like cost, environmental impact, and the deceased's wishes when deciding. Our Family Care Specialists are happy to guide you through the options.",
  },
  {
    q: "What is the total cost of a funeral, and what payment options are available?",
    a: "Funeral costs vary widely depending on services chosen (e.g., burial vs. cremation). Typical expenses include caskets, urns, venue hire, and professional fees. To find out more and to plan ahead, contact Willow Tree Funerals today on 02 8776 1667.",
  },
  {
    q: "What documents are required to arrange a funeral?",
    a: "Essential documents include the death certificate and any pre-arranged funeral plans or wills. Registration of death with the state's Births, Deaths and Marriages and a cremation certificate are also mandatory before proceeding with arrangements. Willow Tree Funerals will journey with you through the process of all necessary paperwork.",
  },
  {
    q: "Can I personalise the funeral service?",
    a: "Yes, Willow Tree Funerals can work with you to customise your loved one's service to meet your specific rituals, music, readings, or cultural elements to reflect the personality and preferences of the deceased. This can include adding your loved one's favourite colour, playing a song that they loved, and so on.",
  },
  {
    q: "Do you do non-religious funerals?",
    a: "Most definitely! At Willow Tree Funerals, we provide beautiful and cost-effective services, regardless of your religious views. We can customise a service that meets your needs and budget requirements.",
  },
  {
    q: "Do you do religious funerals?",
    a: "Most definitely! Willow Tree Funerals specialises in Catholic Funerals. Our Requiem Masses meet all the requirements as outlined by the Catholic Church. We also conduct many other religious services, including Orthodox, Maronite, and other Christian denominations. We work closely with our families to ensure everything is just perfect.",
  },
  {
    q: "Can I have a custom funeral?",
    a: "Customised funerals is what we do best! Nearly every funeral we do is bespoke in design. We see every person as unique, so why should their service be any different? We will work closely with you to ensure a completely bespoke service that meets all your needs, in order to honour your loved one's life and legacy.",
  },
  {
    q: "My loved one passed away interstate — can you arrange to bring them home?",
    a: "Of course. Sometimes the unfortunate happens when your loved one passes away a long way from home. Our professional team can make all the arrangements to bring your loved one home. We take care of all the paperwork, transfers, and everything else — so you need not worry about a thing. You focus on healing, and we'll take care of the rest.",
  },
  {
    q: "Can you help me send my loved one back overseas?",
    a: "Of course we can! Our highly trained team can make all the necessary arrangements to repatriate your loved one to anywhere in the world. We take care of all the paperwork, certificates, flight bookings, and more. Our job is to do all the heavy lifting so you can spend more time with family.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.willowtreefunerals.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "About Willow Tree Funerals", "item": "https://www.willowtreefunerals.com.au/about" }
  ]
};

export default function About() {
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
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-church-walking_upscaled_a1fa6d59.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/20" />
        <div className="relative z-10 container pb-16 pt-32">
          <p className="section-label text-brand-gold mb-3">About Us</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            About Willow Tree Funerals
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            Willow Tree Funerals was founded by Bruce Missen in Hurstville — with a single purpose: to serve the families of Sydney's south, Wollongong and the Central Coast with the care, dignity, and compassion they deserve.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <p className="section-label mb-3">Our Mission</p>
            <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-6">
              A Truly Personalised Experience
            </h2>
            <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
              We support families on their journey as they bid a final farewell to their loved ones. We craft meaningful remembrances that honour the distinct values, character, and traditions of each family we serve.
            </p>
            <p className="text-brand-navy/70 leading-relaxed">
              This is not only our passion, but also our purpose and our promise — to provide a truly personalised experience. We guarantee this commitment to excellence in every way.
            </p>
          </div>
        </div>
      </section>

      {/* Bruce's Story */}
      <section className="py-28 bg-brand-ivory">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative scroll-reveal">
              <img
                src={COMPANY.assets.bruceHeadshot}
                alt="Bruce Missen — Funeral Director, Willow Tree Funerals"
                className="w-full rounded-2xl shadow-2xl"
                style={{ display: 'block', maxWidth: '480px' }}
                loading="lazy"
                decoding="async"
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
            <div className="lg:pl-8 scroll-reveal">
              <p className="section-label mb-3">Our Story</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Meet Bruce Missen
              </h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
                Bruce Missen is the Managing Director and Founder of Willow Tree Funerals. Currently completing his Certificate IV in Funeral Services, Bruce is registered through ASIC as a Funeral Director and Funeral Home operator. He established the business in Hurstville in {COMPANY.established} with a single vision: to create a funeral home that felt genuinely different from the corporate chains that dominate the industry.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                Bruce's Catholic faith is at the heart of everything he does. He understands the profound importance of the Requiem Mass, the comfort of scripture, and the role that faith plays in helping families find peace in the midst of grief. He works closely with parish priests across the Archdiocese of Sydney, and is trusted by clergy and families alike. Willow Tree also arranges secular and non-religious services, including celebrations of life, for families of all backgrounds and beliefs.
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
                  — Bruce Missen, Managing Director &amp; Founder
                </footer>
              </blockquote>
              <a href={COMPANY.phoneHref} className="btn-primary flex items-center gap-2 w-fit">
                <Phone size={15} /> Call Our Family Care Specialists
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <p className="section-label mb-3">Who We Are</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Serving Families Is Our Passion
              </h2>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                Whether you're planning a funeral or cremation service for a loved one, or making your own arrangements in advance, meaningful life celebrations begin with our compassionate funeral and event planners.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                For Willow Tree Funerals, there is no greater honour than helping to remember a life lived. We are dedicated, local professionals committed to getting every detail right, every time. We achieve this by listening, caring for, and guiding each family who entrusts us with their loved one's service.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-8">
                It's why we've become a trusted part of the community we serve, and why families consistently appreciate our exceptional care.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-brand-light-blue p-6">
                  <Sparkles size={24} className="text-brand-gold mb-3" />
                  <h3 className="font-serif text-brand-navy text-lg font-semibold mb-2">Attention to Detail</h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed">
                    When someone we love passes, it's not the big things we miss most. It's all the irreplaceable little things that made them special. It's the details that matter to you — and also to us.
                  </p>
                </div>
                <div className="rounded-2xl border border-brand-light-blue p-6">
                  <TreePine size={24} className="text-brand-gold mb-3" />
                  <h3 className="font-serif text-brand-navy text-lg font-semibold mb-2">What the Willow Tree Stands For</h3>
                  <p className="text-brand-navy/60 text-sm leading-relaxed">
                    The Willow Tree gives us hope, a sense of belonging, and safety — the ability to let go of pain and suffering and grow new, strong, and bold. It is our path to stability, hope, and healing.
                  </p>
                </div>
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="rounded-2xl bg-brand-navy p-10 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-brand-gold font-semibold text-sm font-sans">5-Star Rated</span>
                </div>
                <h3 className="font-serif text-white text-2xl font-semibold mb-4">Every Detail Remembered</h3>
                <p className="text-white/70 leading-relaxed mb-5">
                  At Willow Tree Funerals, we believe that the most personal memorial services are the ones that leave a lasting impression. It's the small, wonderful details that made your loved one truly special.
                </p>
                <p className="text-white/70 leading-relaxed mb-5">
                  Our compassionate team understands the importance of these details and how they can create a truly unforgettable farewell.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We are also knowledgeable about the funeral and interment customs of various faiths and cultures, ensuring that we can help plan a tribute that honours these traditions. Whether you prefer a traditional funeral service or a celebration of life, we will guide you through every step of the arrangement process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeless Legacy */}
      <section className="py-20 bg-brand-ivory">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center scroll-reveal">
            <div>
              <p className="section-label mb-3">A Timeless Legacy</p>
              <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-5">
                For Future Generations
              </h2>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                A permanent memorial site provides a meaningful space for family and friends to come together, reflect, and cherish memories. Whether you prefer burial or cremation, Willow Tree Funerals works with many cemeteries throughout Sydney to offer a wide range of beautiful and enduring remembrance options.
              </p>
              <p className="text-brand-navy/70 leading-relaxed">
                Each memorial park celebrates the diverse legacies of various cultures, backgrounds, and heritages, offering a serene resting place for loved ones amidst diverse natural environments.
              </p>
            </div>
            <div>
              <div className="rounded-2xl bg-brand-royal/10 border border-brand-royal/20 p-8">
                <Users size={32} className="text-brand-royal mb-4" />
                <h3 className="font-serif text-brand-navy text-2xl font-semibold mb-4">Supporting Our Community</h3>
                <p className="text-brand-navy/70 leading-relaxed mb-4">
                  At Willow Tree Funerals, we are deeply committed to supporting our communities and giving back during life's most challenging moments. Our programs are designed to provide comfort, honour, and hope to individuals and families in need.
                </p>
                <p className="text-brand-navy/70 leading-relaxed mb-4">
                  Through partnerships with national nonprofit organisations, we aim to make a meaningful impact by addressing grief, celebrating life, and promoting well-being across communities.
                </p>
                <p className="text-brand-navy/70 leading-relaxed mb-5">
                  We proudly assist with International Women's Day, Australia's Biggest Morning Tea, monthly Dinner with Dignity for those in need, and supporting women who experience miscarriage.
                </p>
                <Link href="/community-events" className="inline-flex items-center gap-2 text-brand-royal font-semibold text-sm hover:gap-3 transition-all">
                  View Community Events <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-brand-navy">
        <div className="container">
          <div className="text-center mb-16 scroll-reveal">
            <p className="section-label text-brand-gold mb-3">Our Values</p>
            <h2 className="font-serif text-white text-4xl md:text-5xl font-semibold">
              What We Stand For
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal-stagger">
            {values.map((v, i) => (
              <div key={i} className="rounded-2xl border border-white/10 p-8 hover:border-brand-gold/40 transition-colors">
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
              <div key={loc.name} className="rounded-2xl border border-brand-light-blue p-8 hover:border-brand-royal hover:shadow-lg transition-all">
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

      {/* FAQ Section — from original About Us page */}
      <section className="py-28 bg-brand-ivory">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 scroll-reveal">
              <p className="section-label mb-3">Frequently Asked Questions</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight">
                Common Questions
              </h2>
            </div>
            <div className="space-y-0 scroll-reveal">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/faq" className="btn-primary inline-flex items-center gap-2">
                View All FAQs <ChevronRight size={14} />
              </Link>
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
                Ready to Speak with Our Family Care Team?
              </h2>
              <p className="text-white/75">Our Family Care Specialists are available 24 hours, 7 days a week — call any time.</p>
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

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

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
