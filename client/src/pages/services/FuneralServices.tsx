/**
 * WILLOW TREE FUNERALS — Funeral Services Overview Page
 * SEO: "funeral services hurstville", "funeral director hurstville",
 *      "funeral services sydney south", "funeral home st george"
 */

import ServicePageTemplate from "../../components/ServicePageTemplate";
import { COMPANY } from "../../../../shared/company";

export default function FuneralServices() {
  return (
    <ServicePageTemplate
      seo={{
        title: "Funeral Services Hurstville | Funeral Director St George Sydney",
        description: "Willow Tree Funerals — compassionate funeral services in Hurstville and across Sydney's south. Catholic funerals, cremation, burial & celebration of life. Available 24/7. Call 02 8776 1667.",
        canonical: "/services/funeral-services",
      }}
      hero={{
        label: "Funeral Services",
        heading: "Compassionate Funeral Services in Hurstville & Sydney",
        subheading: "Every service is personally arranged by Bruce Missen — a licensed funeral director who answers your call 24 hours a day, 7 days a week.",
        image: COMPANY.assets.heroBg,
      }}
      intro={`Willow Tree Funerals provides a complete range of funeral services for families across Hurstville, the St George and Sutherland Shire area, and South West Sydney. Whether you are facing an unexpected loss or planning ahead, Bruce Missen will guide you through every decision with patience, honesty, and genuine compassion. There are no call centres, no corporate scripts — just a real person who cares deeply about your family and the life you are honouring.`}
      includes={[
        "Immediate 24/7 transfer of your loved one into our care",
        "Professional preparation, embalming, and presentation",
        "Viewing and time with your loved one",
        "Funeral service at any church, chapel, or venue",
        "Personalised order of service booklet",
        "Hearse and funeral cortège",
        "Burial or cremation arrangements",
        "Cemetery or crematorium liaison",
        "Death certificate and all statutory documentation",
        "Grief support and aftercare resources",
      ]}
      featureImage={COMPANY.assets.grandmotherGranddaughter}
      pullQuote="Do not let your hearts be troubled. You believe in God; believe also in me."
      steps={[
        { num: "01", title: "Call Us", desc: "Call us on 02 8776 1667 — any time, day or night. Our family care specialists will come to you and take care of everything from the very first moment." },
        { num: "02", title: "Plan Together", desc: "We sit with your family and help you plan a service that truly reflects your loved one's life, faith, and personality." },
        { num: "03", title: "The Service", desc: "We conduct a beautiful, personalised service — at a church, chapel, graveside, or any meaningful location." },
        { num: "04", title: "Aftercare", desc: "Our care doesn't end at the service. We provide ongoing support and help with all post-funeral administration." },
      ]}
      faqs={[
        {
          q: "What should I do first when someone passes away?",
          a: "Call Willow Tree Funerals on 02 8776 1667. We are available 24 hours a day, 7 days a week. We will guide you through the immediate steps, arrange transfer of your loved one into our care, and take care of everything else so you can focus on your family.",
        },
        {
          q: "How long does it take to arrange a funeral?",
          a: "Most funerals are arranged within 3–5 days of the death. We work at your pace and will advise on timing based on your family's needs, the type of service, and cemetery or crematorium availability.",
        },
        {
          q: "Can we personalise the funeral service?",
          a: "Absolutely. We encourage personalisation — music, readings, photos, videos, meaningful objects, and tributes from family and friends all make a service truly unique. We will work with you to create a farewell that genuinely reflects who your loved one was.",
        },
        {
          q: "Do you offer funeral services outside Hurstville?",
          a: "Yes. We serve the entire St George and Sutherland Shire area, as well as South West Sydney including Campbelltown, Liverpool, Narellan, Gregory Hills, and Varroville. We also have a second location at Macquarie Links.",
        },
        {
          q: "What is the difference between a funeral service and a memorial service?",
          a: "A funeral service is held with the body or ashes present, typically within a few days of the death. A memorial service is held without the body, often weeks or months later, and can be more flexible in format and location. We can arrange both.",
        },
      ]}
      relatedServices={[
        { label: "Catholic Funerals", href: "/services/catholic-funerals", desc: "Requiem Masses and faith-centred Catholic funeral services." },
        { label: "Cremation Services", href: "/services/cremation", desc: "Dignified cremation options from direct cremation to full ceremony." },
        { label: "Celebration of Life", href: "/services/celebration-of-life", desc: "A joyful, personalised tribute celebrating who your loved one was." },
      ]}
    />
  );
}
