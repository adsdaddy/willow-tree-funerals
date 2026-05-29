/**
 * WILLOW TREE FUNERALS  -  Burial Services Page
 * SEO: "burial services sydney", "funeral burial hurstville",
 *      "macarthur memorial park burial", "catholic burial sydney"
 */

import ServicePageTemplate from "../../components/ServicePageTemplate";
import { COMPANY } from "../../../../shared/company";

export default function Burial() {
  return (
    <ServicePageTemplate
      seo={{
        title: "Burial Services Sydney | Funeral Burial Hurstville & South West Sydney",
        description: "Traditional burial services at all Sydney cemeteries including MacArthur Memorial Park Varroville. Willow Tree Funerals  -  trusted burial funeral directors in Hurstville. Call 02 8776 1667.",
        canonical: "/services/burial",
      }}
      hero={{
        label: "Burial Services",
        heading: "Traditional Burial Services Across Sydney",
        subheading: "Arranging dignified burials at all Sydney cemeteries, including the new MacArthur Memorial Park at Varroville.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-burial-dyz2DwAytvkPKBsAubwnKU.webp",
      }}
      intro={`Traditional burial remains the choice of many Sydney families, particularly those of Catholic, Orthodox, and other faith traditions that hold the body sacred. At Willow Tree Funerals, we coordinate all aspects of the burial process  -  from cemetery selection and grave preparation to the funeral service and graveside committal. We work with every major Sydney cemetery, and we are one of the first funeral directors to establish a presence near the new MacArthur Memorial Park at Varroville, the first new Crown cemetery to open in Sydney in nearly a century.`}
      includes={[
        "Transfer of your loved one into our care, 24/7",
        "Professional embalming and presentation for viewing",
        "Funeral service at chapel, church, or any venue",
        "Cemetery selection and grave booking",
        "Hearse and funeral cortège",
        "Graveside service and committal",
        "Coffin selection from our full range",
        "Floral arrangements (optional)",
        "Death certificate and all statutory documentation",
        "Personalised order of service booklet",
      ]}
      featureImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg"
      pullQuote="Blessed are those who mourn, for they shall be comforted."
      steps={[
        { num: "01", title: "First Call", desc: "Call us 24/7  -  we will come to you immediately and take care of your loved one." },
        { num: "02", title: "Cemetery Selection", desc: "We guide you through all cemetery options, including Catholic cemeteries, general cemeteries, and MacArthur Memorial Park." },
        { num: "03", title: "The Funeral Service", desc: "A personalised service at a church, chapel, or graveside  -  conducted with full dignity." },
        { num: "04", title: "Graveside Committal", desc: "We accompany your family to the graveside and remain with you through the final farewell." },
      ]}
      faqs={[
        {
          q: "Which cemeteries do you work with in Sydney?",
          a: "We work with all major Sydney cemeteries including Rookwood, Woronora Memorial Park, Sutherland General Cemetery, Botany Cemetery, and the new MacArthur Memorial Park at Varroville. We handle all bookings and grave preparation on your behalf.",
        },
        {
          q: "What is MacArthur Memorial Park?",
          a: "MacArthur Memorial Park is Sydney's newest cemetery, located at Varroville in South West Sydney. It is the first new Crown cemetery to open in Sydney since the 1920s, offering beautiful landscaped grounds, a multi-denominational chapel, and burial and cremation options. Willow Tree Funerals is one of the first funeral directors to serve families choosing this cemetery.",
        },
        {
          q: "Can we have a viewing before the burial?",
          a: "Yes. We offer viewing at our chapel or at your home, allowing family and friends to spend time with your loved one before the funeral service.",
        },
        {
          q: "How much does a burial cost in Sydney?",
          a: "Burial costs include our funeral service fees plus cemetery fees, which vary by cemetery and plot type. We provide a fully itemised, transparent quote with no hidden fees. Please call our family care specialists or visit our Pricing page for details.",
        },
      ]}
      relatedServices={[
        { label: "Catholic Funerals", href: "/services/catholic-funerals", desc: "Requiem Masses and Catholic burial services across Sydney." },
        { label: "Funeral Services", href: "/services/funeral-services", desc: "Full funeral services for all faiths and traditions." },
        { label: "Cremation Services", href: "/services/cremation", desc: "Dignified cremation options for families who prefer this choice." },
      ]}
    />
  );
}
