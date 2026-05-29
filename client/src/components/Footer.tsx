/**
 * WILLOW TREE FUNERALS  -  Global Footer
 * Design: Sacred Elegance  -  deep navy background, gold accents
 * SEO: Internal links to all service pages, location pages, schema-friendly markup
 * A11y: All text meets WCAG AA contrast (4.5:1 min). Footer headings use <p> with role="heading"
 *       to avoid disrupting the page heading hierarchy (h1→h2→h3 flow).
 */

import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { COMPANY } from "../../../shared/company";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white/70">
      {/* Scripture banner */}
      <div className="border-t border-brand-gold/30 border-b border-brand-gold/30 py-6 text-center">
        <p className="scripture text-brand-gold/90 text-base md:text-lg">
          "Do not let your hearts be troubled. You believe in God; believe also in me."
        </p>
        {/* Raised from text-white/60 to text-white/60 for WCAG AA contrast */}
        <p className="font-sans text-xs tracking-widest uppercase text-white/60 mt-1">{COMPANY.scripture}</p>
      </div>

      {/* Main footer grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <img
              src={COMPANY.assets.logoWhite}
              alt="Willow Tree Funerals"
              className="h-14 w-auto mb-6 opacity-90"
              width={281}
              height={140}
              decoding="async"
            />
            <p className="text-sm leading-relaxed text-white/70 mb-6">
              Serving families across all of Sydney, North Shore, Hornsby, St George, Sutherland Shire, South West Sydney, Western Sydney and the Blue Mountains, Wollongong and the Central Coast with dignity and compassion since {COMPANY.established}.
            </p>
            <div className="flex gap-3">
              <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer"
                aria-label="Willow Tree Funerals on Facebook"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors">
                <Facebook size={15} aria-hidden="true" />
              </a>
              <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer"
                aria-label="Willow Tree Funerals on Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors">
                <Instagram size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services  -  use <p role="heading" aria-level="3"> to avoid skipping heading levels */}
          <div>
            <p role="heading" aria-level={3} className="font-sans text-xs tracking-widest uppercase text-white font-semibold mb-5">Our Services</p>
            <ul className="space-y-2.5">
              {[
                { label: "Funeral Services", href: "/services/funeral-services" },
                { label: "Catholic Funerals", href: "/services/catholic-funerals" },
                { label: "Cremation Services", href: "/services/cremation" },
                { label: "Burial Services", href: "/services/burial" },
                { label: "Celebration of Life", href: "/services/celebration-of-life" },
                { label: "Pre-Arranged Funerals", href: "/services/pre-arranged-funerals" },
                { label: "Repatriation Services", href: "/services/repatriation" },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-white/70 hover:text-brand-gold transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <p role="heading" aria-level={3} className="font-sans text-xs tracking-widest uppercase text-white font-semibold mb-5">Information</p>
            <ul className="space-y-2.5">
              {[
                { label: "About Bruce Missen", href: "/about" },
                { label: "Obituaries", href: "/obituaries" },
                { label: "Order Flowers", href: "/order-flowers" },
                { label: "Community Events", href: "/community-events" },
                { label: "Transparent Pricing", href: "/pricing" },
                { label: "Frequently Asked Questions", href: "/faq" },
                { label: "Contact Us", href: "/contact" },
                { label: "Brand Guide", href: "/brand-guide" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-brand-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p role="heading" aria-level={3} className="font-sans text-xs tracking-widest uppercase text-white font-semibold mt-8 mb-5">Areas We Serve</p>
            <ul className="space-y-2.5">
              {["Hurstville", "Kogarah", "Rockdale", "Sutherland", "Campbelltown", "Liverpool", "Macquarie Links", "Camden", "Menangle", "Picton", "Wollongong", "Central Coast"].map((suburb) => (
                <li key={suburb}>
                  <span className="text-sm text-white/60">{suburb}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p role="heading" aria-level={3} className="font-sans text-xs tracking-widest uppercase text-white font-semibold mb-5">Contact Us</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Phone size={15} className="text-brand-gold mt-0.5 shrink-0" />
                <div>
                  {/* Raised from text-white/60 to text-white/60 for WCAG AA contrast */}
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">24/7 Phone</p>
                  <a href={COMPANY.phoneHref} className="text-white hover:text-brand-gold transition-colors font-semibold">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={15} className="text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-white/70 hover:text-brand-gold transition-colors text-sm break-all">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
              {COMPANY.locations.map((loc) => (
                <div key={loc.name} className="flex gap-3">
                  <MapPin size={15} className="text-brand-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">{loc.name}</p>
                    <p className="text-white/70 text-sm">{loc.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Raised from text-white/60 to text-white/60 for WCAG AA contrast */}
          <p className="text-xs text-white/60">
            &copy; {year} {COMPANY.name}. All rights reserved. ASIC Registered Funeral Director &amp; Funeral Home.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/60 hover:text-white/80 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/60 hover:text-white/80 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
