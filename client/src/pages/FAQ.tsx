/**
 * WILLOW TREE FUNERALS — FAQ Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "funeral faq sydney", "funeral questions hurstville",
 *      "what to do when someone dies sydney"
 * Schema: FAQPage (rich snippets)
 */

import { useState } from "react";
import { Link } from "wouter";
import { Phone, ChevronDown } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { COMPANY } from "../../../shared/company";

const faqCategories = [
  {
    category: "When Someone Passes Away",
    faqs: [
      {
        q: "What should I do first when someone passes away?",
        a: `Call Willow Tree Funerals on ${COMPANY.phone} immediately. We are available 24 hours a day, 7 days a week. We will guide you through the immediate steps, arrange transfer of your loved one into our care, and take care of everything else so you can focus on your family.`,
      },
      {
        q: "What if someone passes away at home?",
        a: "If the death was expected (for example, after a terminal illness), call us and we will come to you. If the death was unexpected or sudden, call 000 first, then call us. We will guide you through the process and come to your home as soon as possible.",
      },
      {
        q: "What if someone passes away in hospital?",
        a: "The hospital will contact you. Once you have been notified, call us and we will liaise with the hospital to arrange transfer of your loved one into our care. You do not need to do anything else — we take care of all the logistics.",
      },
      {
        q: "What if someone passes away overseas?",
        a: "Call us immediately. We provide international repatriation services and will manage all consular documentation, transport, and customs clearance on your behalf. Please visit our Repatriation page for more information.",
      },
    ],
  },
  {
    category: "Arranging the Funeral",
    faqs: [
      {
        q: "How long does it take to arrange a funeral?",
        a: "Most funerals are arranged within 3–5 days of the death. We work at your pace and will advise on timing based on your family's needs, the type of service, and cemetery or crematorium availability.",
      },
      {
        q: "Can we personalise the funeral service?",
        a: "Absolutely. We encourage personalisation — music, readings, photos, videos, meaningful objects, and tributes from family and friends all make a service truly unique. We will work with you to create a farewell that genuinely reflects who your loved one was.",
      },
      {
        q: "Can we have a viewing before the funeral?",
        a: "Yes. We offer viewing at our chapel or at your home, allowing family and friends to spend time with your loved one before the funeral service. This is available for both burial and cremation services.",
      },
      {
        q: "Can we choose where the funeral service is held?",
        a: "Yes. We can conduct services at our chapel, a church, a community hall, a sporting club, a garden, or any meaningful location. We will work with you to make your chosen venue work beautifully.",
      },
    ],
  },
  {
    category: "Catholic Funerals",
    faqs: [
      {
        q: "Can you arrange a Catholic funeral Mass at any parish in Sydney?",
        a: "Yes. We work with parishes across the Archdiocese of Sydney, including all churches in the St George, Sutherland Shire, and South West Sydney areas. We handle all church bookings and coordination with the parish priest on your behalf.",
      },
      {
        q: "What is a Requiem Mass?",
        a: "A Requiem Mass (also called a Mass of Christian Burial or Funeral Mass) is a full Catholic liturgical celebration that includes the Eucharist. It is the Church's primary form of funeral rite and is a profound act of faith and prayer for the deceased.",
      },
      {
        q: "Can we have a Rosary and Vigil the evening before the funeral?",
        a: "Absolutely. A Vigil service — often including the Rosary — the evening before the funeral is a beautiful Catholic tradition. We can arrange this at the church, our chapel, or another venue of your choosing.",
      },
      {
        q: "Is cremation permitted in the Catholic faith?",
        a: "Yes. The Catholic Church permits cremation, provided it is not chosen for reasons contrary to Christian doctrine. The Church prefers that the body be present for the funeral Mass, with cremation taking place afterwards. We are experienced in arranging Catholic cremation services in accordance with Church guidelines.",
      },
    ],
  },
  {
    category: "Cremation & Burial",
    faqs: [
      {
        q: "What is the difference between cremation and burial?",
        a: "Cremation involves the respectful reduction of the body to ashes, which can be kept, scattered, or interred. Burial involves placing the coffin in a cemetery plot. Both options can include a full funeral service with viewing, ceremony, and committal.",
      },
      {
        q: "What happens to the ashes after cremation?",
        a: "The ashes (cremated remains) are returned to your family in an urn. You may choose to keep them, scatter them at a meaningful location, inter them in a cemetery niche or garden, or have them incorporated into a memorial product. We can assist with all of these options.",
      },
      {
        q: "Which cemeteries do you work with in Sydney?",
        a: "We work with all major Sydney cemeteries including Rookwood, Woronora Memorial Park, Sutherland General Cemetery, Botany Cemetery, and the new MacArthur Memorial Park at Varroville. We handle all bookings and grave preparation on your behalf.",
      },
      {
        q: "What is MacArthur Memorial Park?",
        a: "MacArthur Memorial Park is Sydney's newest cemetery, located at Varroville in South West Sydney. It is the first new Crown cemetery to open in Sydney since the 1920s, offering beautiful landscaped grounds, a multi-denominational chapel, and burial and cremation options.",
      },
    ],
  },
  {
    category: "Costs & Pre-Planning",
    faqs: [
      {
        q: "How much does a funeral cost in Sydney?",
        a: "Funeral costs vary depending on the type of service. A simple direct cremation starts from approximately $2,200. A full funeral service with cremation typically ranges from $5,000–$9,000. A full funeral service with burial typically ranges from $8,000–$15,000+, depending on cemetery fees. Please visit our Pricing page for more detail.",
      },
      {
        q: "Are there any government funeral assistance payments?",
        a: "Centrelink provides a Bereavement Payment in some circumstances. The Department of Veterans' Affairs provides funeral assistance for eligible veterans. We can advise you on eligibility and help you apply.",
      },
      {
        q: "What is pre-arranging a funeral?",
        a: "Pre-arranging your funeral means documenting your wishes in advance — the type of service, the music, the readings, the burial or cremation, and any personal touches. This removes the burden of decision-making from your family during grief. There is no obligation to pre-pay when you pre-arrange.",
      },
      {
        q: "Can I pre-pay for my funeral?",
        a: "Yes. Pre-paying locks in today's prices and ensures the cost is fully covered. Funds are held in a regulated trust. Please visit our Pre-Arranged Funerals page or call Bruce to discuss.",
      },
    ],
  },
  {
    category: "Service Areas",
    faqs: [
      {
        q: "Do you serve areas outside Hurstville?",
        a: "Yes. We serve the entire St George and Sutherland Shire area, as well as South West Sydney including Campbelltown, Liverpool, Narellan, Gregory Hills, Ingleburn, and the MacArthur Memorial Park at Varroville. We also have a second location at Macquarie Links.",
      },
      {
        q: "Do you serve multicultural communities?",
        a: "Yes. We have extensive experience serving Sydney's diverse communities, including Filipino, Italian, Lebanese, Greek, Indian, Vietnamese, and Pacific Islander families. We understand and honour the cultural and religious traditions that enrich funeral rites.",
      },
      {
        q: "Do you provide repatriation services?",
        a: "Yes. We manage international and interstate repatriation — both bringing loved ones home to Sydney and arranging transport overseas. We handle all documentation, consular liaison, and transport coordination.",
      },
    ],
  },
];

const allFaqs = faqCategories.flatMap(c => c.faqs);

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": allFaqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-light-blue">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-serif text-brand-navy font-semibold text-base">{q}</span>
        <ChevronDown size={18} className={`text-brand-royal shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-brand-navy/70 leading-relaxed text-sm">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <SEOHead
        title="Funeral FAQ Sydney | Common Funeral Questions Answered | Willow Tree Funerals"
        description="Answers to common questions about arranging a funeral in Sydney — Catholic funerals, cremation, burial, costs, pre-planning, and more. Willow Tree Funerals, Hurstville. Call 02 8776 1667."
        canonical="/faq"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section className="bg-brand-navy py-28 pt-36">
        <div className="container max-w-3xl">
          <p className="section-label text-brand-gold mb-3">Frequently Asked Questions</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            Your Questions, Answered Honestly
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            We know that arranging a funeral raises many questions. Here are honest, clear answers to the questions families ask us most often. If you don't find what you're looking for, please call Bruce directly.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-brand-ivory">
        <div className="container max-w-4xl">
          {faqCategories.map((cat, ci) => (
            <div key={ci} className="mb-14">
              <h2 className="font-serif text-brand-navy text-2xl md:text-3xl font-semibold mb-6 pb-4 border-b-2 border-brand-gold/30">
                {cat.category}
              </h2>
              {cat.faqs.map((faq, fi) => (
                <FAQItem key={fi} {...faq} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-brand-navy">
        <div className="container max-w-3xl text-center">
          <p className="section-label text-brand-gold mb-3">Still Have Questions?</p>
          <h2 className="font-serif text-white text-3xl md:text-4xl font-semibold mb-6">
            Call Bruce — He Will Answer
          </h2>
          <p className="text-white/70 leading-relaxed mb-10">
            No call centres, no automated systems. When you call Willow Tree Funerals, Bruce Missen answers. He will take the time to answer every question you have, with patience and honesty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2">
              <Phone size={15} /> Call {COMPANY.phone}
            </a>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
