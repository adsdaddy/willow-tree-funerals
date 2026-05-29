/**
 * WILLOW TREE FUNERALS  -  FAQ Section
 * SEO: FAQPage schema markup embedded
 * Keywords: funeral home Hurstville, cremation Sydney, funeral cost, funeral director
 */

import { useState } from "react";

const faqs = [
  {
    q: "How do I arrange a funeral in Hurstville?",
    a: "Simply call Willow Tree Funerals on 02 8776 1667  -  we are available 24 hours a day, 7 days a week. Our Family Care Specialists will guide you through every step of the arrangement process with care and clarity, either in person, by phone, or via video call."
  },
  {
    q: "What areas do you serve in Sydney?",
    a: "We serve all of Sydney, with a particular focus on Hurstville, the St George area (Kogarah, Rockdale, Bexley, Penshurst, Mortdale, Oatley), and the Sutherland Shire. We are a locally owned and operated funeral home based in Hurstville NSW 2220."
  },
  {
    q: "What is the difference between a traditional funeral and a celebration of life?",
    a: "A traditional funeral typically follows a structured religious or cultural format with burial or cremation. A celebration of life is a more personalised, contemporary tribute that focuses on honouring the unique personality and legacy of your loved one  -  often with music, photos, and personal tributes that reflect who they truly were."
  },
  {
    q: "How much does a funeral cost in Sydney?",
    a: "Funeral costs in Sydney vary depending on the type of service, burial or cremation, and the level of personalisation. We offer transparent pricing and will work with your family to design a meaningful farewell that suits your budget. Call us for a no-obligation discussion."
  },
  {
    q: "Can I pre-arrange my own funeral?",
    a: "Yes  -  pre-arranging your funeral is one of the most thoughtful gifts you can give your family. It relieves them of the burden of decision-making during a difficult time and ensures your wishes are honoured exactly as you intend. Our team will guide you through the process at your own pace."
  },
  {
    q: "Do you offer eco-friendly or green funeral options?",
    a: "Yes. We offer environmentally conscious funeral options including natural burials and biodegradable caskets for families who wish to minimise their environmental impact. Please contact us to discuss the options available."
  },
  {
    q: "Are you available on weekends and public holidays?",
    a: "Yes  -  Willow Tree Funerals is available 24 hours a day, 7 days a week, including weekends and all public holidays. When you need us most, we are here."
  },
  {
    q: "Do you cater to all faiths and cultures?",
    a: "Absolutely. We honour the funeral and interment customs of all faiths, cultures, and backgrounds  -  including Christian, Catholic, Buddhist, Hindu, Muslim, and non-religious services. Every life deserves to be celebrated in a way that is true to who they were."
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: "#FBFAEF" }}>
      {/* JSON-LD FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left: heading */}
          <div>
            <p className="section-label mb-3">Frequently Asked Questions</p>
            <h2 className="font-serif text-[#0D2123] mb-6" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 600 }}>
              Common Questions About Funeral Services in Sydney
            </h2>
            <p className="font-sans text-gray-600 text-sm leading-relaxed mb-6">
              We understand that arranging a funeral can feel overwhelming. Here are answers to the questions families most commonly ask us.
            </p>
            <a href="#contact" className="btn-primary">
              Ask a Question
            </a>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-2 space-y-0">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-b border-[#CBE0E3]"
              >
                <button
                  className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span
                    className="font-sans text-[#0D2123] group-hover:text-[#54B6BF] transition-colors"
                    style={{ fontSize: "0.9375rem", fontWeight: 500, lineHeight: 1.5 }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="text-[#54B6BF] shrink-0 mt-0.5 transition-transform duration-300"
                    style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)", fontSize: "1.25rem" }}
                  >
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div className="pb-5">
                    <p className="font-sans text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
