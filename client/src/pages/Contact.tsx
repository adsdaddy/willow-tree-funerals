/**
 * WILLOW TREE FUNERALS — Contact Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "contact willow tree funerals", "funeral director hurstville contact",
 *      "funeral home hurstville phone"
 * CRO: Phone number above fold, both locations, contact form
 */

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ChevronRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { COMPANY } from "../../../shared/company";

const schema = {
  "@context": "https://schema.org",
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
  "openingHours": "Mo-Su 00:00-23:59",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": COMPANY.phone,
    "contactType": "customer service",
    "availableLanguage": "English",
    "hoursAvailable": "Mo-Su 00:00-23:59"
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    suburb: "",
    enquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would POST to a backend endpoint
    // For now, show a thank-you message
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <SEOHead
        title="Contact Willow Tree Funerals | Funeral Director Hurstville | 02 8776 1667"
        description="Contact Willow Tree Funerals in Hurstville or Macquarie Links. Available 24/7. Call Bruce Missen on 02 8776 1667 or send an enquiry online. Serving all of Sydney's south and South West Sydney."
        canonical="/contact"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section className="bg-brand-navy py-28 pt-36">
        <div className="container max-w-3xl">
          <p className="section-label text-brand-gold mb-3">Contact Us</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            We're Here for You — Any Time
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Call Bruce directly on <a href={COMPANY.phoneHref} className="text-brand-gold hover:text-white transition-colors font-semibold">{COMPANY.phone}</a> — available 24 hours a day, 7 days a week. Or send us an enquiry below and we will respond promptly.
          </p>
          {/* Quick contact bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={COMPANY.phoneHref} className="btn-royal flex items-center gap-2">
              <Phone size={15} /> Call {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy flex items-center gap-2">
              <Mail size={15} /> {COMPANY.email}
            </a>
          </div>
        </div>
      </section>

      {/* Locations + Form */}
      <section className="py-24 bg-brand-ivory">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Locations */}
            <div>
              <p className="section-label mb-3">Our Locations</p>
              <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold mb-8 leading-tight">
                Two Locations Across Sydney
              </h2>

              {/* Hurstville */}
              <div className="bg-white border border-brand-light-blue p-6 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} className="text-brand-gold mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-serif text-brand-navy text-xl font-semibold">Hurstville</h3>
                    <p className="text-brand-navy/50 text-sm">Primary Location — St George &amp; Sutherland Shire</p>
                  </div>
                </div>
                <div className="space-y-2 pl-8">
                  <p className="text-brand-navy/70 text-sm">{COMPANY.address}</p>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-brand-royal shrink-0" />
                    <a href={COMPANY.phoneHref} className="text-brand-royal hover:text-brand-navy text-sm transition-colors">{COMPANY.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-brand-royal shrink-0" />
                    <a href={`mailto:${COMPANY.email}`} className="text-brand-royal hover:text-brand-navy text-sm transition-colors">{COMPANY.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-brand-gold shrink-0" />
                    <span className="text-brand-navy/60 text-sm">Available 24 hours · 7 days a week</span>
                  </div>
                </div>
              </div>

              {/* Macquarie Links */}
              <div className="bg-white border border-brand-light-blue p-6 mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} className="text-brand-gold mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-serif text-brand-navy text-xl font-semibold">Macquarie Links</h3>
                    <p className="text-brand-navy/50 text-sm">South West Sydney Location</p>
                  </div>
                </div>
                <div className="space-y-2 pl-8">
                  <p className="text-brand-navy/70 text-sm">Macquarie Links NSW 2565</p>
                  <p className="text-brand-navy/50 text-xs">Serving Campbelltown, Liverpool, Narellan, Gregory Hills &amp; surrounds</p>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-brand-royal shrink-0" />
                    <a href={COMPANY.phoneHref} className="text-brand-royal hover:text-brand-navy text-sm transition-colors">{COMPANY.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-brand-gold shrink-0" />
                    <span className="text-brand-navy/60 text-sm">Available 24 hours · 7 days a week</span>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="w-full h-64 bg-brand-light-blue/30 border border-brand-light-blue overflow-hidden">
                <iframe
                  title="Willow Tree Funerals — Hurstville"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.6!2d151.1!3d-33.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b9f0a1234567%3A0x0!2sHurstville+NSW+2220!5e0!3m2!1sen!2sau!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <p className="section-label mb-3">Send an Enquiry</p>
              <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold mb-8 leading-tight">
                We'll Respond Promptly
              </h2>

              {submitted ? (
                <div className="bg-brand-navy p-10 text-center">
                  <div className="w-16 h-16 border border-brand-gold/50 flex items-center justify-center mx-auto mb-6">
                    <span className="text-brand-gold text-2xl">✓</span>
                  </div>
                  <h3 className="font-serif text-white text-2xl font-semibold mb-3">Thank You</h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    We have received your enquiry and Bruce will be in touch shortly. If you need immediate assistance, please call us on {COMPANY.phone}.
                  </p>
                  <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2 mx-auto w-fit">
                    <Phone size={15} /> Call {COMPANY.phone}
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-brand-navy/70 text-xs tracking-widest uppercase font-sans mb-2">
                        Your Name <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-brand-light-blue bg-white px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-royal transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-navy/70 text-xs tracking-widest uppercase font-sans mb-2">
                        Phone Number <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-brand-light-blue bg-white px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-royal transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-brand-navy/70 text-xs tracking-widest uppercase font-sans mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-brand-light-blue bg-white px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-royal transition-colors"
                        placeholder="Your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-navy/70 text-xs tracking-widest uppercase font-sans mb-2">
                        Your Suburb
                      </label>
                      <input
                        type="text"
                        name="suburb"
                        value={formData.suburb}
                        onChange={handleChange}
                        className="w-full border border-brand-light-blue bg-white px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-royal transition-colors"
                        placeholder="e.g. Hurstville"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-brand-navy/70 text-xs tracking-widest uppercase font-sans mb-2">
                      Type of Enquiry
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full border border-brand-light-blue bg-white px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-royal transition-colors"
                    >
                      <option value="">Please select...</option>
                      <option value="immediate">Immediate need — someone has just passed away</option>
                      <option value="planning">Planning a funeral service</option>
                      <option value="prearranging">Pre-arranging my own funeral</option>
                      <option value="pricing">Pricing enquiry</option>
                      <option value="catholic">Catholic funeral enquiry</option>
                      <option value="repatriation">Repatriation enquiry</option>
                      <option value="other">Other question</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand-navy/70 text-xs tracking-widest uppercase font-sans mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full border border-brand-light-blue bg-white px-4 py-3 text-brand-navy text-sm focus:outline-none focus:border-brand-royal transition-colors resize-none"
                      placeholder="Please share any details that will help us assist you..."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button type="submit" className="btn-primary flex items-center justify-center gap-2">
                      Send Enquiry <ChevronRight size={14} />
                    </button>
                    <a href={COMPANY.phoneHref} className="btn-outline flex items-center justify-center gap-2">
                      <Phone size={14} /> Or Call {COMPANY.phone}
                    </a>
                  </div>
                  <p className="text-brand-navy/40 text-xs">
                    Your information is kept strictly confidential and will only be used to respond to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
