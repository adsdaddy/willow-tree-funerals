/**
 * WILLOW TREE FUNERALS — Terms of Service Page
 */

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { COMPANY } from "../../../shared/company";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service | Willow Tree Funerals"
        description="Terms of service for Willow Tree Funerals — the terms governing the use of our website and services."
        canonical="/terms"
      />
      <Nav />

      <section className="bg-brand-navy py-24 pt-32">
        <div className="container max-w-3xl">
          <p className="section-label text-brand-gold mb-3">Legal</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl font-semibold leading-tight">Terms of Service</h1>
        </div>
      </section>

      <section className="py-20 bg-brand-ivory">
        <div className="container max-w-3xl">
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-brand-navy/70 leading-relaxed mb-6">
            By accessing and using the Willow Tree Funerals website (willowtreefunerals.com.au), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="font-serif text-brand-navy text-2xl font-semibold mt-10 mb-4">Use of Website</h2>
          <p className="text-brand-navy/70 leading-relaxed mb-4">
            This website is provided for informational purposes about Willow Tree Funerals' services. You may not use this website for any unlawful purpose or in any way that could damage, disable, or impair the website.
          </p>

          <h2 className="font-serif text-brand-navy text-2xl font-semibold mt-10 mb-4">Intellectual Property</h2>
          <p className="text-brand-navy/70 leading-relaxed mb-4">
            All content on this website, including text, images, logos, and design, is the property of Willow Tree Funerals and is protected by Australian copyright law. You may not reproduce or distribute any content without our written permission.
          </p>

          <h2 className="font-serif text-brand-navy text-2xl font-semibold mt-10 mb-4">Limitation of Liability</h2>
          <p className="text-brand-navy/70 leading-relaxed mb-4">
            Willow Tree Funerals provides this website on an "as is" basis. We make no warranties, expressed or implied, about the accuracy or completeness of the information on this website. To the extent permitted by law, we are not liable for any damages arising from your use of this website.
          </p>

          <h2 className="font-serif text-brand-navy text-2xl font-semibold mt-10 mb-4">Contact Us</h2>
          <p className="text-brand-navy/70 leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
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
