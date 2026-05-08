/**
 * WILLOW TREE FUNERALS — 404 Not Found Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 */

import { Link } from "wouter";
import { Phone, Home, ChevronRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { COMPANY } from "../../../shared/company";

export default function NotFound() {
  return (
    <>
      <Nav />
      <section className="min-h-[70vh] bg-brand-ivory flex items-center">
        <div className="container max-w-2xl text-center py-20">
          <p className="font-serif text-brand-gold text-8xl font-semibold mb-4">404</p>
          <h1 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold mb-4">
            Page Not Found
          </h1>
          <p className="text-brand-navy/75 leading-relaxed mb-10">
            We couldn't find the page you were looking for. Please use the navigation above, or contact us directly — we're available 24 hours a day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary flex items-center justify-center gap-2">
              <Home size={15} /> Return Home
            </Link>
            <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2">
              <Phone size={15} /> Call {COMPANY.phone}
            </a>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">
            {[
              { label: "Our Services", href: "/services/funeral-services" },
              { label: "Catholic Funerals", href: "/services/catholic-funerals" },
              { label: "Pricing", href: "/pricing" },
              { label: "About Bruce Missen", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "FAQ", href: "/faq" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-brand-royal hover:text-brand-navy text-sm font-sans transition-colors"
              >
                <ChevronRight size={13} /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
