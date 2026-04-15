/**
 * WILLOW TREE FUNERALS — Privacy Policy Page
 */

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { COMPANY } from "../../../shared/company";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Willow Tree Funerals"
        description="Privacy policy for Willow Tree Funerals — how we collect, use, and protect your personal information."
        canonical="/privacy"
      />
      <Nav />

      <section className="bg-brand-navy py-24 pt-32">
        <div className="container max-w-3xl">
          <p className="section-label text-brand-gold mb-3">Legal</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl font-semibold leading-tight">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-20 bg-brand-ivory">
        <div className="container max-w-3xl prose prose-slate max-w-none">
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            Willow Tree Funerals ("{COMPANY.name}") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs).
          </p>

          <h2 className="font-serif text-brand-navy text-2xl font-semibold mt-10 mb-4">Information We Collect</h2>
          <p className="text-brand-navy/70 leading-relaxed mb-4">
            We collect personal information that you provide to us directly, including your name, phone number, email address, and details about your funeral arrangements. We may also collect information when you visit our website, including your IP address and browsing behaviour.
          </p>

          <h2 className="font-serif text-brand-navy text-2xl font-semibold mt-10 mb-4">How We Use Your Information</h2>
          <p className="text-brand-navy/70 leading-relaxed mb-4">
            We use your personal information to provide funeral services, respond to your enquiries, process your arrangements, and comply with legal obligations. We do not sell, rent, or share your personal information with third parties for marketing purposes.
          </p>

          <h2 className="font-serif text-brand-navy text-2xl font-semibold mt-10 mb-4">Contact Us</h2>
          <p className="text-brand-navy/70 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or wish to access or correct your personal information, please contact us:
          </p>
          <ul className="text-brand-navy/70 space-y-1 mb-6">
            <li><strong>Phone:</strong> {COMPANY.phone}</li>
            <li><strong>Email:</strong> {COMPANY.email}</li>
            <li><strong>Address:</strong> {COMPANY.address}</li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
