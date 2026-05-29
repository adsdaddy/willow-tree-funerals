/**
 * WILLOW TREE FUNERALS  -  Repatriation Service Page
 * SEO: "repatriation funeral sydney", "body repatriation australia",
 *      "overseas repatriation sydney", "international funeral transfer"
 */

import ServicePageTemplate from "../../components/ServicePageTemplate";
import { COMPANY } from "../../../../shared/company";

export default function Repatriation() {
  return (
    <ServicePageTemplate
      seo={{
        title: "Repatriation Services Sydney | International Body Transfer | Willow Tree Funerals",
        description: "International and interstate repatriation services from Sydney. We manage all documentation, consular liaison, and transport to bring your loved one home. Call Willow Tree Funerals 02 8776 1667.",
        canonical: "/services/repatriation",
      }}
      hero={{
        label: "Repatriation Services",
        heading: "Bringing Your Loved One Home",
        subheading: "International and interstate repatriation managed with complete care  -  from consular documentation to safe transport, wherever home may be.",
        image: COMPANY.assets.heroBg,
      }}
      intro={`When a loved one passes away overseas or interstate, the process of bringing them home can feel overwhelming. At Willow Tree Funerals, we manage the entire repatriation process on your behalf  -  from liaising with overseas funeral homes and consulates, to arranging all documentation, permits, and transport. We also receive loved ones being repatriated to Sydney from abroad, ensuring they are cared for with the same dignity and respect as any local service. Our experience with Sydney's multicultural communities  -  including Filipino, Lebanese, Italian, Indian, and Pacific Islander families  -  means we understand the cultural and religious sensitivities involved.`}
      includes={[
        "24/7 initial advice and coordination",
        "Liaison with overseas or interstate funeral directors",
        "Consular and embassy documentation assistance",
        "Death certificate translation and authentication",
        "International transport and airline coordination",
        "Customs and quarantine clearance",
        "Receiving and caring for your loved one on arrival",
        "Funeral service arrangements in Sydney",
        "Burial or cremation in Sydney or onward transport",
        "Ongoing communication with your family throughout",
      ]}
      featureImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0023_bedffdad.jpg"
      pullQuote="Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me."
      steps={[
        { num: "01", title: "First Call", desc: "Call us immediately  -  our team will take over all coordination so your family can focus on grieving, not logistics." },
        { num: "02", title: "Documentation", desc: "We manage all consular, embassy, and government documentation required for international transport." },
        { num: "03", title: "Transport", desc: "We coordinate with airlines and overseas funeral homes to ensure safe, dignified transport." },
        { num: "04", title: "Home", desc: "Your loved one arrives in Sydney in our care, ready for the funeral service your family chooses." },
      ]}
      faqs={[
        {
          q: "How long does international repatriation take?",
          a: "Timelines vary depending on the country of origin, documentation requirements, and airline availability. In most cases, repatriation takes between 5–14 days. We will advise you of realistic timelines as soon as we have the details.",
        },
        {
          q: "What documentation is required for repatriation to Australia?",
          a: "Requirements vary by country but typically include a death certificate (translated if necessary), a certificate of embalming, a freedom-from-infection certificate, and a permit to transport. We manage all of this on your behalf.",
        },
        {
          q: "Can you repatriate a loved one from the Philippines, Lebanon, or India?",
          a: "Yes. We have extensive experience with repatriation from the Philippines, Lebanon, India, Italy, and many other countries. We understand the specific consular requirements and cultural sensitivities for each community.",
        },
        {
          q: "Can you receive a loved one being repatriated to Sydney from overseas?",
          a: "Yes. If your loved one is being repatriated to Sydney from overseas, we can receive them at the airport, care for them, and arrange the funeral service in Sydney.",
        },
        {
          q: "How much does repatriation cost?",
          a: "Costs vary significantly depending on the country of origin, airline, and documentation requirements. We provide a transparent, itemised quote as soon as we have the necessary information. Please call our family care specialists directly for an initial estimate.",
        },
      ]}
      relatedServices={[
        { label: "Funeral Services", href: "/services/funeral-services", desc: "Full funeral services once your loved one is home in Sydney." },
        { label: "Catholic Funerals", href: "/services/catholic-funerals", desc: "Faith-centred Catholic funeral services for multicultural families." },
        { label: "Burial Services", href: "/services/burial", desc: "Burial arrangements at all Sydney cemeteries." },
      ]}
    />
  );
}
