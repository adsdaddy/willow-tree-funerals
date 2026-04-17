/**
 * WILLOW TREE FUNERALS — Catholic Funerals Service Page
 * SEO Target: "catholic funerals sydney", "catholic funeral director hurstville",
 *             "requiem mass sydney", "catholic funeral mass st george"
 * CRO: Phone CTA above fold, trust signals, FAQ schema
 */

import ServicePageTemplate from "../../components/ServicePageTemplate";
import { COMPANY } from "../../../../shared/company";

const HERO_IMG = COMPANY.assets.churchService;
const FEATURE_IMG = COMPANY.assets.brucePodium;

export default function CatholicFunerals() {
  return (
    <ServicePageTemplate
      seo={{
        title: "Catholic Funerals Sydney | Catholic Funeral Director Hurstville",
        description: "Willow Tree Funerals — Sydney's trusted Catholic funeral director. Requiem Masses, Catholic burial services, and faith-centred farewells across St George, Sutherland Shire & South West Sydney. Call 02 8776 1667.",
        canonical: "/services/catholic-funerals",
      }}
      hero={{
        label: "Catholic Funerals",
        heading: "Faithful, Reverent Catholic Funeral Services",
        subheading: "Coordinating Requiem Masses and Catholic burial services with your parish priest across all of Sydney's southern communities.",
        image: HERO_IMG,
      }}
      intro={`At Willow Tree Funerals, we understand that for Catholic families, a funeral is not merely a farewell — it is a sacred liturgical celebration of the resurrection and the promise of eternal life. Bruce Missen has deep experience coordinating Catholic funeral Masses with parish priests across the St George, Sutherland Shire, and South West Sydney dioceses. From the initial notification of death through to the Rite of Committal at the graveside, every step is conducted with the reverence and care your faith demands.`}
      includes={[
        "Coordination with your parish priest and church booking",
        "Full Requiem Mass or Funeral Mass arrangements",
        "Order of service booklets with liturgical readings and hymns",
        "Rosary and Vigil service the evening before (if desired)",
        "Transfer of your loved one into our care, 24/7",
        "Professional embalming and presentation for viewing",
        "Coffin selection from our full range",
        "Hearse and funeral cortège to the church and cemetery",
        "Graveside Rite of Committal",
        "Catholic cemetery liaison (all Sydney Catholic cemeteries)",
        "Death certificate and all statutory documentation",
        "Grief support resources for your family",
      ]}
      featureImage={FEATURE_IMG}
      pullQuote="I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live."
      steps={[
        {
          num: "01",
          title: "First Call",
          desc: "Call our Family Care Specialists on 02 8776 1667 — any time, day or night. We will come to you immediately.",
        },
        {
          num: "02",
          title: "Church Liaison",
          desc: "We contact your parish priest and arrange the Requiem Mass, booking the church and coordinating the liturgy.",
        },
        {
          num: "03",
          title: "The Funeral Mass",
          desc: "Bruce personally conducts the funeral cortège, ensuring every liturgical detail is honoured with dignity.",
        },
        {
          num: "04",
          title: "Committal & Burial",
          desc: "We accompany your family to the graveside for the final Rite of Committal, and remain with you until the end.",
        },
      ]}
      faqs={[
        {
          q: "Can you arrange a Catholic funeral Mass at any parish in Sydney?",
          a: "Yes. We work with parishes across the Archdiocese of Sydney, including all churches in the St George, Sutherland Shire, and South West Sydney areas. We handle all church bookings and coordination with the parish priest on your behalf.",
        },
        {
          q: "What is the difference between a Requiem Mass and a Funeral Mass?",
          a: "A Requiem Mass (also called a Mass of Christian Burial or Funeral Mass) is a full Catholic liturgical celebration that includes the Eucharist. A Funeral Liturgy outside Mass is a shorter service without the Eucharist. We can advise which is most appropriate based on your parish's availability and your family's wishes.",
        },
        {
          q: "Can we have a Rosary and Vigil the evening before the funeral?",
          a: "Absolutely. A Vigil service — often including the Rosary — the evening before the funeral is a beautiful Catholic tradition. We can arrange this at the church, our chapel, or another venue of your choosing.",
        },
        {
          q: "Which Catholic cemeteries do you work with in Sydney?",
          a: "We work with all Catholic cemeteries in Sydney, including Rookwood Catholic Cemetery, Woronora Memorial Park, Sutherland General Cemetery, and the new MacArthur Memorial Park at Varroville. We handle all cemetery bookings and grave preparation.",
        },
        {
          q: "My loved one was not a regular churchgoer — can we still have a Catholic funeral?",
          a: "Yes. The Catholic Church welcomes all baptised Catholics to receive a Catholic funeral. We can speak with you and your parish priest about the most appropriate form of service.",
        },
        {
          q: "Do you provide Catholic funeral services for Filipino, Italian, or Lebanese communities?",
          a: "Yes. We have extensive experience serving Sydney's diverse Catholic communities, including Filipino, Italian, Lebanese, Irish, and Pacific Islander families. We understand the cultural traditions that enrich Catholic funeral rites and will honour them fully.",
        },
      ]}
      relatedServices={[
        {
          label: "Burial Services",
          href: "/services/burial",
          desc: "Traditional burial at Catholic cemeteries across Sydney, including MacArthur Memorial Park.",
        },
        {
          label: "Funeral Services",
          href: "/services/funeral-services",
          desc: "Full funeral services for all faiths and traditions across Sydney.",
        },
        {
          label: "Pre-Arranged Funerals",
          href: "/services/pre-arranged-funerals",
          desc: "Plan your Catholic funeral in advance and ensure your wishes are honoured.",
        },
      ]}
    />
  );
}
