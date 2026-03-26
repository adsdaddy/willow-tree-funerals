/**
 * WILLOW TREE FUNERALS — Homepage
 * Design Philosophy: "Serene Elegance"
 * Fonts: Playfair Display (headings) + Montserrat (body/nav) + Libre Baskerville (quotes/scripture)
 * Colours: Deep Teal #0D2123, Brand Teal #54B6BF, Soft Mint #CBE0E3, Warm White #FBFAEF, Gold #C16510
 * SEO: Keyword clusters — funeral home Hurstville, funeral director Sydney, cremation St George
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { COMPANY } from "../../../shared/company";
import FAQSection from "../components/FAQSection";
import LocalAreaSEO from "../components/LocalAreaSEO";

// ── Sticky Header ─────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#process", label: "Our Process" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(13,33,35,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(84,182,191,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" aria-label="Willow Tree Funerals — Home">
          <img
            src={COMPANY.assets.logoWhite}
            alt="Willow Tree Funerals"
            className="h-12 object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-white/70 hover:text-white transition-colors"
              style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={COMPANY.phoneHref}
            className="font-sans text-[#54B6BF] hover:text-white transition-colors"
            style={{ fontSize: "0.7rem", letterSpacing: "0.12em", fontWeight: 500 }}
          >
            {COMPANY.phone}
          </a>
          <a
            href="#contact"
            className="btn-teal"
            style={{ padding: "0.6rem 1.5rem", fontSize: "0.65rem" }}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0D2123] border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-white/70 hover:text-white transition-colors py-2 border-b border-white/5"
              style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              {link.label}
            </a>
          ))}
          <a href={COMPANY.phoneHref} className="btn-teal mt-2 text-center">
            Call {COMPANY.phone}
          </a>
        </div>
      )}
    </header>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={COMPANY.assets.heroBg}
          alt="Serene willow tree landscape"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(13,33,35,0.92) 40%, rgba(13,33,35,0.55) 75%, rgba(13,33,35,0.3) 100%)"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          <p className="section-label text-[#54B6BF] mb-5">
            Funeral Home · Hurstville, Sydney NSW
          </p>
          <h1
            className="font-serif text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            Honouring Life.<br />
            <span style={{ color: "#54B6BF" }}>Celebrating</span><br />
            Memories.
          </h1>
          <p
            className="font-sans text-white/75 mb-8 max-w-lg"
            style={{ fontSize: "1.0625rem", lineHeight: 1.8 }}
          >
            Compassionate, personalised funeral services for families across Sydney's St George and Sutherland Shire. Available 24 hours a day, 7 days a week.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#contact" className="btn-teal">
              Speak with Bruce
            </a>
            <a href="#services" className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}>
              Our Services
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: "24/7 Available", value: "Always Here" },
              { label: "Years of Service", value: "Est. 2018" },
              { label: "Google Reviews", value: "5.0 ★★★★★" },
            ].map(stat => (
              <div key={stat.label} className="border-l border-[#54B6BF]/40 pl-4">
                <p className="font-sans text-white text-base font-medium">{stat.value}</p>
                <p className="font-sans text-white/50 text-xs tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scripture */}
      <div className="absolute bottom-8 right-8 md:right-12 z-10 text-right">
        <p className="font-baskerville italic text-white/50 text-sm">
          "Let not your heart be troubled."
        </p>
        <p className="font-sans text-white/30 text-xs tracking-widest uppercase mt-1">John 14:1</p>
      </div>
    </section>
  );
}

// ── Announcement Bar ──────────────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div className="bg-[#54B6BF] py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-sans text-white text-sm text-center">
          <strong>Available 24 hours, 7 days a week.</strong> When you need us most, we are here.
        </p>
        <a
          href={COMPANY.phoneHref}
          className="font-sans text-white font-medium text-sm border border-white/40 px-4 py-1.5 hover:bg-white hover:text-[#54B6BF] transition-colors shrink-0"
          style={{ letterSpacing: "0.05em" }}
        >
          Call {COMPANY.phone}
        </a>
      </div>
    </div>
  );
}

// ── Services Section ──────────────────────────────────────────────────────
function ServicesSection() {
  const services = [
    {
      title: "Traditional Funeral Service",
      desc: "A dignified full funeral service with burial or cremation, conducted with meticulous care and personalised to honour your loved one's unique life story.",
      icon: "✦",
      keywords: "funeral service Hurstville, burial service Sydney"
    },
    {
      title: "Celebration of Life",
      desc: "A joyful, personalised tribute that focuses on the unique personality, passions, and legacy of the person being remembered — a true celebration.",
      icon: "✦",
      keywords: "celebration of life Sydney, memorial service Hurstville"
    },
    {
      title: "Cremation Services",
      desc: "Respectful cremation services with a range of options from simple direct cremation to full funeral services with cremation, tailored to your family's wishes.",
      icon: "✦",
      keywords: "cremation Hurstville, cremation services Sydney"
    },
    {
      title: "Eco-Friendly Funerals",
      desc: "Environmentally conscious funeral options including natural burials and biodegradable caskets for families who wish to minimise their environmental impact.",
      icon: "✦",
      keywords: "eco funeral Sydney, green burial NSW"
    },
    {
      title: "Pre-Arranged Funerals",
      desc: "Plan ahead and relieve your loved ones of the burden of decision-making. A pre-arranged funeral ensures your wishes are honoured exactly as you intend.",
      icon: "✦",
      keywords: "pre-arranged funeral Sydney, funeral planning Hurstville"
    },
    {
      title: "Grief Support",
      desc: "Our care doesn't end after the service. We provide ongoing grief support resources and can connect your family with professional counselling services.",
      icon: "✦",
      keywords: "grief support Sydney, bereavement services NSW"
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-10" style={{ backgroundColor: "#FBFAEF" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-3">Our Services</p>
            <h2 className="font-serif text-[#0D2123]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
              Funeral Services in<br />Hurstville & Sydney
            </h2>
          </div>
          <p className="font-sans text-gray-600 text-sm max-w-sm leading-relaxed">
            Every life is unique. Every farewell should be too. We offer a full range of funeral services tailored to the needs of your family.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#CBE0E3]">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="bg-[#FBFAEF] p-8 hover:bg-white transition-colors group"
            >
              <span className="text-[#54B6BF] text-2xl block mb-5 group-hover:text-[#0D2123] transition-colors">
                {service.icon}
              </span>
              <h3 className="font-serif text-[#0D2123] text-xl mb-3" style={{ fontWeight: 600 }}>
                {service.title}
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-5">
                {service.desc}
              </p>
              <a
                href="#contact"
                className="section-label hover:text-[#0D2123] transition-colors"
              >
                Enquire Now →
              </a>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-px bg-[#0D2123] p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-white text-xl" style={{ fontWeight: 600 }}>
              Not sure which service is right for you?
            </p>
            <p className="font-sans text-white/60 text-sm mt-1">
              Call Bruce directly — he'll guide you through every option with care and clarity.
            </p>
          </div>
          <a href={COMPANY.phoneHref} className="btn-teal shrink-0">
            Call {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: "#CBE0E3" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Images */}
        <div className="relative">
          <div className="relative z-10">
            <img
              src={COMPANY.assets.brucePodium}
              alt="Bruce Missen conducting a funeral service in Hurstville"
              className="w-full aspect-[4/3] object-cover rounded-sm"
            />
          </div>
          {/* Floating headshot */}
          <div
            className="absolute -bottom-8 -right-4 md:-right-8 z-20 border-4 border-[#CBE0E3] rounded-sm overflow-hidden shadow-2xl"
            style={{ width: 140, height: 140 }}
          >
            <img
              src={COMPANY.assets.bruceHeadshot}
              alt="Bruce Missen — Funeral Director"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Accent block */}
          <div
            className="absolute -bottom-4 -left-4 z-0 w-32 h-32"
            style={{ backgroundColor: "#54B6BF", opacity: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="lg:pl-8">
          <p className="section-label mb-3">About Willow Tree Funerals</p>
          <h2 className="font-serif text-[#0D2123] mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 600 }}>
            A Funeral Home Built on<br />Compassion & Faith
          </h2>

          <blockquote className="border-l-4 border-[#54B6BF] pl-5 mb-8">
            <p className="font-baskerville italic text-[#0D2123] text-lg leading-relaxed">
              "My purpose is to serve families with the same care and dignity I would want for my own."
            </p>
            <cite className="font-sans text-xs text-[#54B6BF] tracking-widest uppercase mt-2 block not-italic">
              — {COMPANY.director}, Funeral Director & Owner
            </cite>
          </blockquote>

          <p className="font-sans text-gray-700 text-sm leading-relaxed mb-6">
            Willow Tree Funerals is a locally owned and operated funeral home serving Hurstville, the St George area, and all of Sydney. Founded by Bruce Missen, our practice is built on a foundation of Christian faith, community service, and an unwavering commitment to personalised care.
          </p>
          <p className="font-sans text-gray-700 text-sm leading-relaxed mb-8">
            We believe that every life deserves to be honoured with dignity and celebrated with meaning. Whether your family requires a traditional religious service, a contemporary celebration of life, or a simple direct cremation, we bring the same meticulous attention to detail and heartfelt compassion to every arrangement.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: "Serving Sydney Since", value: "2018" },
              { label: "Service Area", value: "All of Sydney" },
              { label: "Availability", value: "24 / 7 / 365" },
              { label: "Google Rating", value: "5.0 Stars" },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-4">
                <p className="font-serif text-[#0D2123] text-2xl" style={{ fontWeight: 600 }}>{stat.value}</p>
                <p className="font-sans text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-primary">
            Meet Bruce Missen
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Process Section ───────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "First Call",
      desc: "Call us any time, day or night. Bruce will answer personally and guide you through the immediate next steps with calm and clarity."
    },
    {
      step: "02",
      title: "Transfer & Care",
      desc: "We gently bring your loved one into our care, treating them with the same respect and dignity we would give our own family."
    },
    {
      step: "03",
      title: "Personal Arrangement",
      desc: "We sit with your family — in person or via video call — to understand your loved one's story and design a service that truly honours them."
    },
    {
      step: "04",
      title: "The Service",
      desc: "We manage every detail of the service so your family can be fully present — from venue coordination to music, flowers, and tributes."
    },
    {
      step: "05",
      title: "Ongoing Support",
      desc: "Our care continues after the service. We assist with paperwork, death notices, and connect you with grief support resources."
    },
  ];

  return (
    <section id="process" className="py-24 px-6 md:px-10" style={{ backgroundColor: "#0D2123" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label text-[#54B6BF] mb-3">How We Work</p>
            <h2 className="font-serif text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
              Our Process
            </h2>
          </div>
          <p className="font-sans text-white/50 text-sm max-w-sm leading-relaxed">
            We guide you through every step of the journey — from the first call to the final farewell and beyond.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-[#54B6BF]/20" style={{ top: "2.5rem" }} />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map(step => (
              <div key={step.step} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative z-10"
                    style={{ backgroundColor: "#54B6BF" }}
                  >
                    <span className="font-sans text-white text-xs font-medium">{step.step}</span>
                  </div>
                </div>
                <h3 className="font-serif text-white text-lg mb-2" style={{ fontWeight: 600 }}>
                  {step.title}
                </h3>
                <p className="font-sans text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo strip */}
        <div className="grid grid-cols-3 gap-4 mt-16">
          <img src={COMPANY.assets.churchService} alt="Church funeral service Sydney"
               className="w-full aspect-video object-cover rounded-sm opacity-70 hover:opacity-100 transition-opacity" />
          <img src={COMPANY.assets.chapelInterior} alt="Modern funeral chapel Hurstville"
               className="w-full aspect-video object-cover rounded-sm opacity-70 hover:opacity-100 transition-opacity" />
          <img src={COMPANY.assets.cremationUrn} alt="Cremation service Sydney"
               className="w-full aspect-video object-cover rounded-sm opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </section>
  );
}

// ── Testimonials Section ──────────────────────────────────────────────────
function TestimonialsSection() {
  const reviews = [
    {
      name: "Sarah M.",
      location: "Hurstville",
      text: "Bruce and his team were absolutely incredible during the most difficult time of our lives. Every detail was handled with such care and compassion. We couldn't have asked for more.",
      rating: 5
    },
    {
      name: "David & Lisa T.",
      location: "Kogarah",
      text: "From the very first phone call, we felt supported. Bruce personally guided us through every decision and made sure Mum's farewell was exactly what she would have wanted.",
      rating: 5
    },
    {
      name: "The Nguyen Family",
      location: "Hurstville",
      text: "We are so grateful for the respectful and personalised service we received. Bruce honoured our cultural traditions beautifully. Truly a remarkable funeral director.",
      rating: 5
    },
    {
      name: "Margaret K.",
      location: "Sutherland",
      text: "I pre-arranged my own funeral with Willow Tree Funerals and felt completely at ease throughout the entire process. Bruce was patient, kind, and thoroughly professional.",
      rating: 5
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 md:px-10" style={{ backgroundColor: "#FBFAEF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-3">What Families Say</p>
            <h2 className="font-serif text-[#0D2123]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
              Trusted by Sydney Families
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <img src={COMPANY.assets.fiveStars} alt="5 star Google rating" className="h-8 object-contain" />
            <div>
              <p className="font-sans text-[#0D2123] font-medium text-sm">5.0 Google Rating</p>
              <p className="font-sans text-gray-500 text-xs">Based on verified reviews</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map(review => (
            <div key={review.name} className="bg-white border border-[#CBE0E3] p-8">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-[#C16510] text-sm">★</span>
                ))}
              </div>
              <p className="font-baskerville italic text-[#0D2123] text-base leading-relaxed mb-6">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-medium text-sm"
                  style={{ backgroundColor: "#54B6BF" }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans font-medium text-[#0D2123] text-sm">{review.name}</p>
                  <p className="font-sans text-gray-500 text-xs">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Community Section ─────────────────────────────────────────────────────
function CommunitySection() {
  return (
    <section className="py-24 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: "#CBE0E3" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-label mb-3">Community & Giving Back</p>
          <h2 className="font-serif text-[#0D2123] mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 600 }}>
            Rooted in the<br />St George Community
          </h2>
          <p className="font-sans text-gray-700 text-sm leading-relaxed mb-6">
            Willow Tree Funerals is more than a business — we are an active member of the Hurstville and St George community. We believe in giving back to the people we serve.
          </p>
          <div className="space-y-4 mb-8">
            {[
              "Supporting Australia's Biggest Morning Tea for cancer research",
              "Participating in International Women's Day events",
              "Providing compassionate care for families experiencing miscarriage and infant loss",
              "Partnering with local churches and community organisations",
            ].map(item => (
              <div key={item} className="flex gap-3 items-start">
                <span className="text-[#54B6BF] mt-0.5 shrink-0">✦</span>
                <p className="font-sans text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src={COMPANY.assets.grandmotherGranddaughter}
            alt="Compassionate care for families in Sydney"
            className="w-full aspect-square object-cover rounded-sm"
          />
          <img
            src={COMPANY.assets.communityDinner}
            alt="Community gathering and support"
            className="w-full aspect-square object-cover rounded-sm mt-8"
          />
        </div>
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-10" style={{ backgroundColor: "#0D2123" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Left: info */}
        <div>
          <p className="section-label text-[#54B6BF] mb-3">Contact Us</p>
          <h2 className="font-serif text-white mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 600 }}>
            We Are Here<br />When You Need Us
          </h2>
          <p className="font-sans text-white/60 text-sm leading-relaxed mb-10">
            Whether you need immediate assistance or would like to discuss arrangements in advance, Bruce is available 24 hours a day, 7 days a week.
          </p>

          <div className="space-y-6 mb-10">
            {[
              { label: "Phone (24/7)", value: COMPANY.phone, href: COMPANY.phoneHref },
              { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { label: "Address", value: COMPANY.address, href: `https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}` },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-px h-10 bg-[#54B6BF]/40 shrink-0 mt-1" />
                <div>
                  <p className="font-sans text-white/40 text-xs tracking-widest uppercase mb-1">{item.label}</p>
                  <a
                    href={item.href}
                    className="font-sans text-white hover:text-[#54B6BF] transition-colors text-sm"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bruce photo */}
          <div className="flex items-center gap-4 border border-white/10 p-4">
            <img
              src={COMPANY.assets.bruceHeadshot}
              alt="Bruce Missen — Funeral Director Hurstville"
              className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#54B6BF]"
            />
            <div>
              <p className="font-serif text-white text-base" style={{ fontWeight: 600 }}>{COMPANY.director}</p>
              <p className="font-sans text-white/50 text-xs">{COMPANY.directorTitle}</p>
              <p className="font-sans text-[#54B6BF] text-xs mt-1">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#54B6BF]/20 flex items-center justify-center mb-6">
                <span className="text-[#54B6BF] text-2xl">✓</span>
              </div>
              <h3 className="font-serif text-white text-2xl mb-3" style={{ fontWeight: 600 }}>
                Thank You
              </h3>
              <p className="font-sans text-white/60 text-sm max-w-sm leading-relaxed">
                We have received your message. Bruce will be in touch with you shortly. If you need immediate assistance, please call {COMPANY.phone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-sans text-white/50 text-xs tracking-widest uppercase block mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#54B6BF] transition-colors placeholder:text-white/20"
                  placeholder="Your full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-white/50 text-xs tracking-widest uppercase block mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#54B6BF] transition-colors placeholder:text-white/20"
                    placeholder="02 xxxx xxxx"
                  />
                </div>
                <div>
                  <label className="font-sans text-white/50 text-xs tracking-widest uppercase block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#54B6BF] transition-colors placeholder:text-white/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="font-sans text-white/50 text-xs tracking-widest uppercase block mb-2">
                  How Can We Help? *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 text-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#54B6BF] transition-colors placeholder:text-white/20 resize-none"
                  placeholder="Please share how we can help your family..."
                />
              </div>
              <button type="submit" className="btn-teal w-full">
                Send Message
              </button>
              <p className="font-sans text-white/30 text-xs text-center leading-relaxed">
                For immediate assistance, please call {COMPANY.phone} — available 24/7.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: "#060F10" }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <img src={COMPANY.assets.logoWhite} alt="Willow Tree Funerals" className="h-14 object-contain mb-4" />
          <p className="font-sans text-white/40 text-xs leading-relaxed max-w-xs mb-4">
            Compassionate, personalised funeral services for families across Hurstville, the St George area, and all of Sydney NSW.
          </p>
          <p className="font-baskerville italic text-[#54B6BF] text-sm">
            "Honouring Life. Celebrating Memories."
          </p>
        </div>

        {/* Services */}
        <div>
          <p className="font-sans text-white/50 text-xs tracking-widest uppercase mb-4">Services</p>
          <ul className="space-y-2">
            {["Traditional Funeral", "Celebration of Life", "Cremation Services", "Eco Funerals", "Pre-Arranged Funerals", "Grief Support"].map(s => (
              <li key={s}>
                <a href="#services" className="font-sans text-white/40 hover:text-white/70 text-xs transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-sans text-white/50 text-xs tracking-widest uppercase mb-4">Contact</p>
          <div className="space-y-3">
            <div>
              <p className="font-sans text-white/30 text-xs">Phone (24/7)</p>
              <a href={COMPANY.phoneHref} className="font-sans text-white/70 hover:text-white text-sm transition-colors">
                {COMPANY.phone}
              </a>
            </div>
            <div>
              <p className="font-sans text-white/30 text-xs">Email</p>
              <a href={`mailto:${COMPANY.email}`} className="font-sans text-white/70 hover:text-white text-xs transition-colors">
                {COMPANY.email}
              </a>
            </div>
            <div>
              <p className="font-sans text-white/30 text-xs">Address</p>
              <p className="font-sans text-white/70 text-xs">{COMPANY.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-white/25 text-xs">
            © {COMPANY.year} {COMPANY.name} · {COMPANY.address} · Funeral Director: {COMPANY.director}
          </p>
          <div className="flex gap-4">
            <Link href="/brand-guide">
              <span className="font-sans text-white/20 hover:text-white/50 text-xs transition-colors cursor-pointer">
                Brand Guide
              </span>
            </Link>
            <a href="#" className="font-sans text-white/20 hover:text-white/50 text-xs transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AnnouncementBar />
        <ServicesSection />
        <LocalAreaSEO />
        <AboutSection />
        <ProcessSection />
        <TestimonialsSection />
        <CommunitySection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
