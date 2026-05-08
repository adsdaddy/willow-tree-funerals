/**
 * WILLOW TREE FUNERALS — Community Events Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "funeral community events sydney", "grief support sydney", "art of dying well"
 */

import { Link } from "wouter";
import { Phone, Calendar, MapPin, Clock, ExternalLink, ChevronRight, Users, Heart } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { COMPANY } from "../../../shared/company";

const BUTTERFLY_FLOWERS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20230517-WA0056_b5a70d37.jpg";
const BIRDCAGE_GARDEN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "The Art of Dying Well",
  "description": "A series of talks exploring death, dying, and the Catholic faith — presented by Bruce Missen of Willow Tree Funerals.",
  "organizer": {
    "@type": "Organization",
    "name": COMPANY.name,
    "url": "https://www.willowtreefunerals.com.au"
  },
  "location": {
    "@type": "Place",
    "name": "Our Lady of Mount Carmel",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "193 St Andrews Road",
      "addressLocality": "Varroville",
      "addressRegion": "NSW",
      "postalCode": "2566",
      "addressCountry": "AU"
    }
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.willowtreefunerals.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "Community Events", "item": "https://www.willowtreefunerals.com.au/community-events" }
  ]
};

export default function CommunityEvents() {
  useScrollReveal();

  return (
    <>
      <SEOHead
        title="Community Events | Willow Tree Funerals — Grief Support & Education Sydney"
        description="Join Willow Tree Funerals for community events including The Art of Dying Well talks and the Compassionate Companions Men's Grief Support Group across South West Sydney."
        canonical="/community-events"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end"
        style={{
          backgroundImage: `url(${BIRDCAGE_GARDEN})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/20" />
        <div className="relative z-10 container pb-16 pt-32">
          <p className="section-label text-brand-gold mb-3">Community Events</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            Healing Begins with Connection
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            At Willow Tree Funerals, we believe that healing begins with connection — with community, with faith, and with one another.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <p className="section-label mb-3">Our Community</p>
            <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-6">
              Supporting Families Beyond the Funeral
            </h2>
            <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
              Our commitment to the families we serve does not end at the graveside. Through community events, educational talks, and grief support programs, we walk alongside you in the weeks, months, and years that follow.
            </p>
            <p className="text-brand-navy/70 leading-relaxed">
              If you have a community event you would like Willow Tree Funerals to support or participate in, we would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-brand-ivory">
        <div className="container">
          <div className="text-center mb-14 scroll-reveal">
            <p className="section-label mb-3">Upcoming Events</p>
            <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold">
              Events &amp; Programs
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 scroll-reveal-stagger">

            {/* Event 1: The Art of Dying Well */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-light-blue hover:shadow-xl transition-shadow">
              <div
                className="relative h-56"
                style={{
                  backgroundImage: `url(${BUTTERFLY_FLOWERS})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="inline-block bg-brand-gold text-brand-navy text-xs font-sans font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                    Education Series
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-brand-navy text-2xl font-semibold mb-2">
                  The Art of Dying Well
                </h3>
                <p className="text-brand-navy/60 text-sm font-sans mb-5">
                  Eternal Rest Series by the Augustine Institute — Presented by Bruce Missen
                </p>
                <p className="text-brand-navy/70 leading-relaxed mb-6">
                  A series of talks exploring the Catholic understanding of death, dying, and eternal life. Presented by Bruce Missen of Willow Tree Funerals, this series draws on the Eternal Rest program by the Augustine Institute to help individuals and families prepare for death with faith, peace, and dignity.
                </p>

                <div className="space-y-3 mb-7">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-brand-navy/70 uppercase tracking-wider mb-0.5">Dates</p>
                      <p className="text-brand-navy text-sm font-semibold">Saturdays, January 10–31, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-brand-navy/70 uppercase tracking-wider mb-0.5">Time</p>
                      <p className="text-brand-navy text-sm font-semibold">10:30 am</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-brand-navy/70 uppercase tracking-wider mb-0.5">Location</p>
                      <p className="text-brand-navy text-sm font-semibold">Our Lady of Mount Carmel</p>
                      <p className="text-brand-navy/60 text-sm">193 St Andrews Road, Varroville NSW 2566</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.trybooking.com/events/landing/1508879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 w-fit"
                >
                  Register via TryBooking <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Event 2: Compassionate Companions Men's Group */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-brand-light-blue hover:shadow-xl transition-shadow">
              <div
                className="relative h-56"
                style={{
                  backgroundImage: `url(${BIRDCAGE_GARDEN})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="inline-block bg-brand-royal text-white text-xs font-sans font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                    Grief Support
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-brand-navy text-2xl font-semibold mb-2">
                  Compassionate Companions Men's Group
                </h3>
                <p className="text-brand-navy/60 text-sm font-sans mb-5">
                  Monthly Grief Support for Men — In Partnership with Grief Care
                </p>
                <p className="text-brand-navy/70 leading-relaxed mb-6">
                  A safe, supportive space for men navigating grief. The Compassionate Companions Men's Group meets monthly to provide peer support, shared stories, and a community of understanding for men who have experienced loss. Facilitated in partnership with Grief Care.
                </p>

                <div className="space-y-3 mb-7">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-brand-navy/70 uppercase tracking-wider mb-0.5">Frequency</p>
                      <p className="text-brand-navy text-sm font-semibold">First Tuesday of every month</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-brand-navy/70 uppercase tracking-wider mb-0.5">Time</p>
                      <p className="text-brand-navy text-sm font-semibold">7:00 pm – 9:00 pm</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-brand-navy/70 uppercase tracking-wider mb-0.5">Location</p>
                      <p className="text-brand-navy text-sm font-semibold">St Joachim's Parish, Lidcombe</p>
                      <p className="text-brand-navy/60 text-sm">2 Mills Street, Lidcombe NSW</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-brand-navy/70 uppercase tracking-wider mb-0.5">Contact Grief Care</p>
                      <a href="tel:0296466908" className="text-brand-navy text-sm font-semibold hover:text-brand-royal transition-colors">02 9646 6908</a>
                      <span className="text-brand-navy/70 mx-2">·</span>
                      <a href="mailto:team@griefcare.com.au" className="text-brand-navy/70 text-sm hover:text-brand-royal transition-colors">team@griefcare.com.au</a>
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:team@griefcare.com.au"
                  className="btn-primary flex items-center gap-2 w-fit"
                >
                  Contact Grief Care <ChevronRight size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-20 bg-brand-navy">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center scroll-reveal">
            <div>
              <p className="section-label text-brand-gold mb-3">Our Commitment</p>
              <h2 className="font-serif text-white text-3xl md:text-4xl font-semibold leading-tight mb-5">
                Giving Back to Our Community
              </h2>
              <p className="text-white/70 leading-relaxed mb-5">
                At Willow Tree Funerals, we are deeply committed to supporting our communities and giving back during life's most challenging moments. Through partnerships with national nonprofit organisations, we aim to make a meaningful impact by addressing grief, celebrating life, and promoting well-being across communities.
              </p>
              <p className="text-white/70 leading-relaxed mb-5">
                We proudly assist with International Women's Day, Australia's Biggest Morning Tea, monthly Dinner with Dignity for those in need, and supporting women who experience miscarriage.
              </p>
              <p className="text-white/70 leading-relaxed">
                By fostering compassion and understanding, Willow Tree Funerals strives to make a difference in the lives of those we serve — beyond the funeral itself.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Heart size={24} className="text-brand-gold" />, label: "International Women's Day" },
                { icon: <Users size={24} className="text-brand-gold" />, label: "Australia's Biggest Morning Tea" },
                { icon: <Heart size={24} className="text-brand-gold" />, label: "Dinner with Dignity" },
                { icon: <Users size={24} className="text-brand-gold" />, label: "Miscarriage Support" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 p-5 hover:border-brand-gold/40 transition-colors">
                  <div className="mb-3">{item.icon}</div>
                  <p className="text-white/80 text-sm font-sans font-medium leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Host an Event CTA */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center scroll-reveal">
            <p className="section-label mb-3">Get Involved</p>
            <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-5">
              Have a Community Event?
            </h2>
            <p className="text-brand-navy/70 leading-relaxed mb-8">
              If you are organising a community event related to grief, loss, end-of-life planning, or community wellbeing, we would love to hear from you. Willow Tree Funerals is proud to partner with organisations that share our commitment to compassion and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={COMPANY.phoneHref} className="btn-primary flex items-center gap-2 justify-center">
                <Phone size={15} /> {COMPANY.phone}
              </a>
              <Link href="/contact" className="btn-outline flex items-center gap-2 justify-center">
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
