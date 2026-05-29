import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Kogarah() {
  return (
    <SuburbPageTemplate
      suburb="Kogarah"
      region="St George, Sydney"
      slug="kogarah"
      heroHeading="Funeral Director Kogarah"
      heroSubheading="Compassionate, independent funeral services for families in Kogarah and the St George area. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals has been serving families in Kogarah and the broader St George area since 2018. Our Hurstville office is just minutes from Kogarah, ensuring we can be with your family quickly when you need us most. We offer the full range of funeral services  -  from Catholic Masses and multi-faith ceremonies to secular celebrations of life and direct cremations."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Hurstville", "Rockdale", "Arncliffe", "Bexley", "Carlton", "Allawah", "Blakehurst", "Ramsgate", "Monterey"]}
      faqs={[
        {
          q: "Do you serve Kogarah and the St George area?",
          a: "Yes. Willow Tree Funerals serves Kogarah and all surrounding St George suburbs including Hurstville, Rockdale, Arncliffe, Bexley, Carlton, Allawah, Blakehurst, Ramsgate, and Monterey. Our Hurstville office is just minutes away.",
        },
        {
          q: "What types of funerals do you arrange in Kogarah?",
          a: "We arrange the full range of funeral services in Kogarah  -  Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. Every service is personalised to your family's wishes.",
        },
        {
          q: "How quickly can you respond to a death in Kogarah?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with Bruce Missen  -  not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Kogarah?",
          a: "Funeral costs in Kogarah vary depending on the type of service. Our packages start from $2,950 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-kogarah"
      metaTitle="Funeral Director Kogarah | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Kogarah. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services. Available 24/7. Call us on 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
