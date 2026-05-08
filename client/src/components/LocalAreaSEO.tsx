/**
 * WILLOW TREE FUNERALS — Local Area SEO Section
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * Used on homepage to target suburb-level SEO keywords
 * Updated: teal colours removed, now uses brand-navy / brand-royal / brand-gold tokens
 */

import { Link } from "wouter";
import { Phone, MapPin } from "lucide-react";
import { COMPANY } from "../../../shared/company";

const serviceAreas = [
  { suburb: "Hurstville", postcode: "2220", desc: "Our primary location, serving the heart of St George." },
  { suburb: "Kogarah", postcode: "2217", desc: "Compassionate funeral services for Kogarah families." },
  { suburb: "Rockdale", postcode: "2216", desc: "Trusted funeral directors serving Rockdale and surrounds." },
  { suburb: "Bexley", postcode: "2207", desc: "Dignified funeral services for the Bexley community." },
  { suburb: "Penshurst", postcode: "2222", desc: "Caring for Penshurst families with respect and warmth." },
  { suburb: "Mortdale", postcode: "2223", desc: "Local funeral services for the Mortdale area." },
  { suburb: "Sutherland Shire", postcode: "2232", desc: "Serving all suburbs across the Sutherland Shire." },
  { suburb: "Campbelltown", postcode: "2560", desc: "South West Sydney funerals from our Macquarie Links location." },
  { suburb: "Liverpool", postcode: "2170", desc: "Serving Liverpool and surrounds from South West Sydney." },
  { suburb: "Narellan", postcode: "2567", desc: "Funeral services for the growing Narellan community." },
  { suburb: "Gregory Hills", postcode: "2557", desc: "Caring for Gregory Hills and Camden families." },
  { suburb: "Varroville", postcode: "2566", desc: "MacArthur Memorial Park — South West Sydney's premier cemetery." },
];

export default function LocalAreaSEO() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="section-label mb-3">Service Areas</p>
          <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-4">
            Serving Sydney's South &amp; South West Communities
          </h2>
          <p className="text-brand-navy/80 leading-relaxed">
            Willow Tree Funerals serves families across Sydney's southern suburbs from our Hurstville location,
            and South West Sydney from our Macquarie Links office. Wherever you are, we will come to you.
          </p>
        </div>

        {/* Suburb grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
          {serviceAreas.map((area) => (
            <div
              key={area.suburb}
              className="group border border-brand-light-blue p-5 hover:border-brand-royal hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-2 mb-2">
                <MapPin size={14} className="text-brand-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-serif text-brand-navy font-semibold text-sm group-hover:text-brand-royal transition-colors">
                    {area.suburb}
                  </p>
                  <p className="text-brand-navy/70 text-xs font-sans">NSW {area.postcode}</p>
                </div>
              </div>
              <p className="text-brand-navy/55 text-xs leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="bg-brand-navy p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-white text-xl md:text-2xl font-semibold mb-1">
              Don't See Your Suburb?
            </h3>
            <p className="text-white/65 text-sm">
              We serve all of Sydney. Call us directly and we will come to you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={COMPANY.phoneHref} className="btn-royal flex items-center gap-2">
              <Phone size={14} /> Call {COMPANY.phone}
            </a>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
              Send an Enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
