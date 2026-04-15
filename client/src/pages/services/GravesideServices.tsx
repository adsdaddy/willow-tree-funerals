/**
 * WILLOW TREE FUNERALS — Graveside Services Page
 * SEO: "graveside funeral sydney", "graveside service hurstville",
 *      "graveside committal sydney", "simple graveside funeral"
 */

import ServicePageTemplate from "../../components/ServicePageTemplate";
import { COMPANY } from "../../../../shared/company";

export default function GravesideServices() {
  return (
    <ServicePageTemplate
      seo={{
        title: "Graveside Services Sydney | Graveside Funeral Hurstville",
        description: "Simple, dignified graveside funeral services across Sydney. Willow Tree Funerals arranges graveside services at all Sydney cemeteries. Call 02 8776 1667.",
        canonical: "/services/graveside-services",
      }}
      hero={{
        label: "Graveside Services",
        heading: "Simple, Dignified Graveside Farewells",
        subheading: "An intimate graveside service that brings family and friends together at the place of final rest — simple, meaningful, and completely dignified.",
        image: COMPANY.assets.churchService,
      }}
      intro={`A graveside service is a beautiful, intimate alternative to a full chapel or church funeral. The entire service takes place at the graveside, bringing family and friends together in the open air for a simple, heartfelt farewell. Graveside services are often chosen for their simplicity, their connection to the earth, and their sense of quiet dignity. At Willow Tree Funerals, we conduct graveside services at all Sydney cemeteries — from Rookwood and Woronora to the new MacArthur Memorial Park at Varroville — with the same care and personalisation we bring to every service.`}
      includes={[
        "Transfer of your loved one into our care, 24/7",
        "Professional preparation and presentation",
        "Hearse and funeral cortège to the cemetery",
        "Graveside service conducted by Bruce Missen or a celebrant",
        "Music (portable speaker system available)",
        "Personalised order of service booklet",
        "Floral arrangements (optional)",
        "Cemetery booking and grave preparation",
        "Rite of Committal (Catholic or multi-faith)",
        "Death certificate and all statutory documentation",
      ]}
      featureImage={COMPANY.assets.brucePodium}
      pullQuote="The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."
      steps={[
        { num: "01", title: "First Call", desc: "Call Bruce on 02 8776 1667 — any time. We will come to you and take care of everything." },
        { num: "02", title: "Cemetery Selection", desc: "We help you choose the right cemetery and arrange the grave booking and all preparation." },
        { num: "03", title: "The Service", desc: "A simple, personalised service at the graveside — conducted with complete dignity and care." },
        { num: "04", title: "The Committal", desc: "The final farewell at the graveside — a moment of peace, closure, and love." },
      ]}
      faqs={[
        {
          q: "What is a graveside service?",
          a: "A graveside service is a funeral service conducted entirely at the cemetery, at the graveside. There is no separate chapel or church service — family and friends gather at the grave for the farewell. It is simple, intimate, and often deeply meaningful.",
        },
        {
          q: "Can a graveside service be Catholic?",
          a: "Yes. A Catholic graveside service typically includes the Rite of Committal, prayers, and scripture readings. If a Requiem Mass has already been celebrated at the church, the graveside service is the final part of the Catholic funeral rite.",
        },
        {
          q: "Which cemeteries do you use for graveside services?",
          a: "We conduct graveside services at all Sydney cemeteries, including Rookwood, Woronora Memorial Park, Sutherland General Cemetery, Botany Cemetery, and the new MacArthur Memorial Park at Varroville.",
        },
        {
          q: "Can we have music at a graveside service?",
          a: "Yes. We can provide a portable sound system for recorded music, or arrange for a live musician if desired. Music makes a graveside service even more personal and meaningful.",
        },
        {
          q: "Is a graveside service less expensive than a full funeral?",
          a: "Generally, yes. A graveside service avoids the cost of a separate chapel or church hire. We provide transparent, itemised pricing — please call Bruce or visit our Pricing page for details.",
        },
      ]}
      relatedServices={[
        { label: "Burial Services", href: "/services/burial", desc: "Full burial services at all Sydney cemeteries." },
        { label: "Catholic Funerals", href: "/services/catholic-funerals", desc: "Catholic graveside committals and Requiem Masses." },
        { label: "Funeral Services", href: "/services/funeral-services", desc: "Full funeral services for all faiths and traditions." },
      ]}
    />
  );
}
