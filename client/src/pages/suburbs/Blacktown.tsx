import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Blacktown() {
  return (
    <SuburbPageTemplate
      suburb="Blacktown"
      region="Western Sydney"
      slug="blacktown"
      heroHeading="Funeral Director Blacktown"
      heroSubheading="Compassionate, independent funeral services for families in Blacktown and across Western Sydney. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families in Blacktown and throughout Western Sydney with genuine care and professionalism. Our team is experienced in serving Blacktown's diverse and multicultural community, arranging services that honour every cultural and religious tradition with the utmost respect. We are available around the clock and can be with your family quickly when you need us most."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Seven Hills", "Toongabbie", "Quakers Hill", "Rooty Hill", "Mount Druitt", "Stanhope Gardens", "Rouse Hill"]}
      faqs={[
        {
          q: "Do you serve Blacktown and Western Sydney?",
          a: "Yes. Willow Tree Funerals serves Blacktown and all surrounding Western Sydney suburbs including Seven Hills, Toongabbie, Quakers Hill, Rooty Hill, Mount Druitt, Stanhope Gardens, and Rouse Hill. Our team is available 24/7.",
        },
        {
          q: "What types of funerals do you arrange in Blacktown?",
          a: "We arrange the full range of funeral services in Blacktown — Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. We have extensive experience serving Blacktown's multicultural community.",
        },
        {
          q: "How quickly can you respond to a death in Blacktown?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists — not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Blacktown?",
          a: "Funeral costs in Blacktown vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://www.willowtreefunerals.com.au/funeral-director-blacktown"
      metaTitle="Funeral Director Blacktown | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Blacktown. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across Western Sydney. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
