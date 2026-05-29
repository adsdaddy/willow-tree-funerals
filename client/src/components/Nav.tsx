/**
 * WILLOW TREE FUNERALS  -  Global Navigation
 * Design: Sacred Elegance  -  Royal Blue / Catholic-inspired
 * Sticky header, transparent-to-solid on scroll, mobile hamburger menu
 * CRO: Phone number always visible, "Arrange a Funeral" CTA button
 * Fix: Services dropdown works on both hover (desktop) and click (touch/keyboard)
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown, Facebook, Instagram } from "lucide-react";
import { COMPANY } from "../../../shared/company";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";

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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = location === "/";

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-brand-navy text-white/80 text-center py-2 px-4 text-xs tracking-widest uppercase font-sans">
        Available 24 Hours · 7 Days a Week &nbsp;|&nbsp;
        <a href={COMPANY.phoneHref} className="text-white/90 hover:text-white transition-colors font-semibold" onClick={() => trackPhoneClick("top_bar")}>
          {COMPANY.phone}
        </a>
      </div>

      {/* Main nav */}
      <header
        data-react-header="true"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-brand-navy shadow-lg shadow-brand-navy/30"
            : "bg-brand-navy/95 backdrop-blur-sm"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo  -  enlarged for visibility */}
            <Link href="/">
              <img
                src={COMPANY.assets.logoWhite}
                alt="Willow Tree Funerals"
                className="h-12 w-auto object-contain"
                width={200}
                height={99}
                decoding="async"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3 inline-block"
              >
                Home
              </Link>

              {/* Services dropdown  -  works on hover AND click */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  onClick={() => setServicesOpen((prev) => !prev)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3"
                >
                  Services <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 bg-white shadow-2xl rounded-2xl border border-[#E8EFF8] py-2 overflow-hidden z-50"
                    role="menu"
                  >
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        role="menuitem"
                        className="block px-5 py-3 text-brand-navy hover:bg-brand-light-blue/60 hover:text-brand-royal text-xs tracking-wide uppercase font-sans font-medium transition-colors rounded-lg mx-1"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3 inline-block"
              >
                About
              </Link>
              <Link
                href="/obituaries"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3 inline-block"
              >
                Obituaries
              </Link>
              <Link
                href="/order-flowers"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3 inline-block"
              >
                Flowers
              </Link>
              <Link
                href="/community-events"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3 inline-block"
              >
                Community
              </Link>
              <Link
                href="/pricing"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3 inline-block"
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3 inline-block"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-white text-xs tracking-widest uppercase font-sans font-medium transition-colors py-3 inline-block"
              >
                Contact
              </Link>
            </nav>

            {/* CRO: Phone + CTA + Social */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Social icons */}
              <div className="flex items-center gap-2 border-r border-white/20 pr-4">
                <a
                  href={COMPANY.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Willow Tree Funerals on Facebook"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  <Facebook size={14} />
                </a>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Willow Tree Funerals on Instagram"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  <Instagram size={14} />
                </a>
              </div>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2 text-brand-gold hover:text-white transition-colors"
                aria-label={`Call ${COMPANY.phone}`}
                onClick={() => trackPhoneClick("nav_desktop")}
              >
                <Phone size={15} />
                <span className="font-sans font-semibold text-sm">{COMPANY.phone}</span>
              </a>
              <Link href="/contact" className="btn-royal text-xs px-5 py-2.5" onClick={() => trackCTAClick("arrange_a_funeral", "nav_desktop")}>
                Arrange a Funeral
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
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
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  aria-expanded={mobileServicesOpen}
                  className="flex items-center justify-between w-full text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10"
                >
                  Services <ChevronDown size={14} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 mt-2 flex flex-col gap-1">
                    {services.map((s) => (
                      <Link key={s.href} href={s.href} className="text-white/70 text-xs tracking-wide uppercase font-sans py-2 hover:text-white transition-colors">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/about" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">About</Link>
              <Link href="/obituaries" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Obituaries</Link>
              <Link href="/order-flowers" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Order Flowers</Link>
              <Link href="/community-events" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Community Events</Link>
              <Link href="/pricing" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Pricing</Link>
              <Link href="/blog" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Blog</Link>
              <Link href="/faq" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">FAQ</Link>
              <Link href="/contact" className="text-white/80 text-sm tracking-widest uppercase font-sans font-medium py-2 border-b border-white/10">Contact</Link>
              <a href={COMPANY.phoneHref} className="btn-royal text-center mt-2" onClick={() => trackPhoneClick("nav_mobile")}>
                Call {COMPANY.phone}
              </a>
              <Link href="/contact" className="btn-outline border-white text-white text-center" onClick={() => trackCTAClick("arrange_a_funeral", "nav_mobile")}>
                Arrange a Funeral
              </Link>
              {/* Social icons in mobile menu */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={COMPANY.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  <Instagram size={15} />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
