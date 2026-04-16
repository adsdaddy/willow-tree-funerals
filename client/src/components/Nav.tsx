/**
 * WILLOW TREE FUNERALS — Global Navigation
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * Sticky header, transparent-to-solid on scroll, mobile hamburger menu
 * CRO: Phone number always visible, "Arrange a Funeral" CTA button
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { COMPANY } from "../../../shared/company";

const services = [
  { label: "Funeral Services", href: "/services/funeral-services" },
  { label: "Catholic Funerals", href: "/services/catholic-funerals" },
  { label: "Cremation Services", href: "/services/cremation" },
  { label: "Burial Services", href: "/services/burial" },
  { label: "Celebration of Life", href: "/services/celebration-of-life" },
  { label: "Pre-Arranged Funerals", href: "/services/pre-arranged-funerals" },
  { label: "Repatriation", href: "/services/repatriation" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-brand-navy text-white/80 text-center py-2 px-4 text-xs tracking-widest uppercase font-sans">
        Available 24 Hours · 7 Days a Week &nbsp;|&nbsp;
        <a href={COMPANY.phoneHref} className="text-white/90 hover:text-white transition-colors font-semibold">
          {COMPANY.phone}
        </a>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-brand-navy shadow-lg shadow-brand-navy/30"
            : "bg-brand-navy/95 backdrop-blur-sm"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/">
              <img
                src={COMPANY.assets.logoWhite}
                alt="Willow Tree Funerals"
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors"
              >
                Home
              </Link>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors">
                  Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-2xl rounded-2xl border border-[#E8EFF8] py-2 overflow-hidden">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-5 py-2.5 text-brand-navy hover:bg-brand-light-blue/60 hover:text-brand-royal text-xs tracking-wide uppercase font-sans font-medium transition-colors rounded-lg mx-1"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* CRO: Phone + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2 text-brand-gold hover:text-white transition-colors"
              aria-label={`Call ${COMPANY.phone}`}
              >
                <Phone size={15} />
                <span className="font-sans font-semibold text-sm">{COMPANY.phone}</span>
              </a>
              <Link href="/contact" className="btn-royal text-xs px-5 py-2.5">
                Arrange a Funeral
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-brand-navy border-t border-white/10">
            <div className="container py-6 flex flex-col gap-4">
              <Link href="/" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Home</Link>
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10"
                >
                  Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <div className="pl-4 mt-2 flex flex-col gap-2">
                    {services.map((s) => (
                      <Link key={s.href} href={s.href} className="text-white/60 text-xs tracking-wide uppercase font-sans py-1.5">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/about" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">About</Link>
              <Link href="/pricing" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Pricing</Link>
              <Link href="/faq" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">FAQ</Link>
              <Link href="/contact" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Contact</Link>
              <a href={COMPANY.phoneHref} className="btn-royal text-center mt-2">
                Call {COMPANY.phone}
              </a>
              <Link href="/contact" className="btn-outline border-white text-white text-center">
                Arrange a Funeral
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
