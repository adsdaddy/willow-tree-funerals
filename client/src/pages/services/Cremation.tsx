/**
 * WILLOW TREE FUNERALS  -  Cremation Services Page
 * SEO Target: "cremation services sydney", "cremation hurstville",
 *             "direct cremation sydney", "affordable cremation st george"
 */

import ServicePageTemplate from "../../components/ServicePageTemplate";
import { COMPANY } from "../../../../shared/company";

export default function Cremation() {
  return (
    <ServicePageTemplate
      seo={{
        title: "Cremation Services Sydney | Cremation Hurstville & St George",
        description: "Dignified cremation services in Hurstville and across Sydney. From simple direct cremation to full funeral services with cremation. Transparent pricing. Call Willow Tree Funerals 02 8776 1667.",
        canonical: "/services/cremation",
      }}
      hero={{
        label: "Cremation Services",
        heading: "Dignified Cremation Services Across Sydney",
        subheading: "From simple direct cremation to a full ceremony with viewing  -  we guide you through every option with honesty and care.",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-cremation-UEg2UAZKaPZjZyHzGmPiRb.webp",
      }}
      intro={`Cremation is chosen by an increasing number of Sydney families as a meaningful, flexible, and often more affordable alternative to traditional burial. At Willow Tree Funerals, we offer a full range of cremation options  -  from a simple, dignified direct cremation to a full funeral service with viewing, ceremony, and cremation. Whatever you choose, your loved one will be treated with the same respect and care as any other service we provide. We never use a third-party cremation provider  -  your loved one remains in our care throughout.`}
      includes={[
        "Transfer of your loved one into our care, 24/7",
        "Professional preparation and presentation",
        "Viewing and time with your loved one (if desired)",
        "Funeral service at our chapel, a church, or any venue",
        "Cremation at a licensed Sydney crematorium",
        "Return of ashes in a quality urn of your choice",
        "Ashes scattering or interment arrangements (if desired)",
        "Death certificate and all statutory documentation",
        "Personalised order of service booklet",
        "Grief support resources",
      ]}
      featureImage={COMPANY.assets.cremationUrn}
      pullQuote="For everything there is a season, and a time for every matter under heaven."
      steps={[
        {
          num: "01",
          title: "First Call",
          desc: "Call us any time  -  we will come to you immediately and transfer your loved one into our care.",
        },
        {
          num: "02",
          title: "Choose Your Service",
          desc: "We explain all cremation options clearly, with transparent pricing, so you can make the right choice for your family.",
        },
        {
          num: "03",
          title: "The Service",
          desc: "Whether a simple farewell or a full ceremony, we conduct the service with complete dignity and personalisation.",
        },
        {
          num: "04",
          title: "Return of Ashes",
          desc: "Your loved one's ashes are returned to you in your chosen urn, or we can arrange interment or scattering.",
        },
      ]}
      faqs={[
        {
          q: "What is the difference between direct cremation and a cremation with a service?",
          a: "Direct cremation is a simple, no-ceremony cremation where the body is transferred directly to the crematorium. A cremation with a service includes a funeral ceremony  -  at a chapel, church, or other venue  -  before the cremation takes place. We offer both options and everything in between.",
        },
        {
          q: "Can we have a viewing before cremation?",
          a: "Yes. Many families choose to have a viewing or time with their loved one before the cremation. This can be arranged at our chapel or at a venue of your choosing. We will advise on timing and preparation.",
        },
        {
          q: "What happens to the ashes after cremation?",
          a: "The ashes (also called cremated remains) are returned to your family in an urn. You may choose to keep them, scatter them at a meaningful location, inter them in a cemetery niche or garden, or have them incorporated into a memorial product. We can assist with all of these options.",
        },
        {
          q: "Is cremation permitted in the Catholic faith?",
          a: "Yes. The Catholic Church permits cremation, provided it is not chosen for reasons contrary to Christian doctrine. The Church prefers that the body be present for the funeral Mass, with cremation taking place afterwards. We are experienced in arranging Catholic cremation services in accordance with Church guidelines.",
        },
        {
          q: "How much does cremation cost in Sydney?",
          a: "Cremation costs vary depending on the type of service chosen. We offer transparent, itemised pricing with no hidden fees. Please visit our Pricing page or call our family care specialists for a personalised quote.",
        },
      ]}
      relatedServices={[
        {
          label: "Funeral Services",
          href: "/services/funeral-services",
          desc: "Full funeral services for all faiths and traditions across Sydney.",
        },
        {
          label: "Catholic Funerals",
          href: "/services/catholic-funerals",
          desc: "Catholic cremation services arranged in accordance with Church guidelines.",
        },
        {
          label: "Pre-Arranged Funerals",
          href: "/services/pre-arranged-funerals",
          desc: "Pre-arrange your cremation and ensure your wishes are honoured.",
        },
      ]}
    />
  );
}
