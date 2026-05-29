import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Strathfield() {
  return (
    <SuburbPageTemplate
      suburb="Strathfield"
      region="Inner West, Sydney"
      slug="strathfield"
      heroHeading="Funeral Director Strathfield"
      heroSubheading="Independent, compassionate funeral services for families in Strathfield and the Inner West. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals provides dignified, personalised funeral services to families in Strathfield and the surrounding Inner West. Our team is experienced in serving Strathfield's diverse and multicultural community, arranging services that honour every cultural and religious tradition with the utmost respect. We are available around the clock and can be with your family quickly when you need us most."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Burwood", "Homebush", "North Strathfield", "Flemington", "Concord", "Croydon", "Ashfield"]}
      faqs={[
        {
          q: "Do you serve Strathfield and the Inner West?",
          a: "Yes. Willow Tree Funerals serves Strathfield and all surrounding Inner West suburbs including Burwood, Homebush, North Strathfield, Flemington, Concord, Croydon, and Ashfield. Our team is available 24/7.",
        },
        {
          q: "What types of funerals do you arrange in Strathfield?",
          a: "We arrange the full range of funeral services in Strathfield  -  Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. We have extensive experience serving Strathfield's multicultural community.",
        },
        {
          q: "How quickly can you respond to a death in Strathfield?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists  -  not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Strathfield?",
          a: "Funeral costs in Strathfield vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-strathfield"
      metaTitle="Funeral Director Strathfield | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Strathfield. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across the Inner West. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
