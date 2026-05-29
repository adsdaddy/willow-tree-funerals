import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Hornsby() {
  return (
    <SuburbPageTemplate
      suburb="Hornsby"
      region="North Shore, Sydney"
      slug="hornsby"
      heroHeading="Funeral Director Hornsby"
      heroSubheading="Compassionate, independent funeral services for families in Hornsby and across the North Shore. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families in Hornsby and throughout the North Shore with the same care and dedication we bring to every family we support. Our experienced team is available around the clock and can be with your family quickly when you need us most. We offer the full range of funeral services  -  from Catholic Masses and multi-faith ceremonies to secular celebrations of life and direct cremations."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Wahroonga", "Turramurra", "Asquith", "Mount Colah", "Waitara", "Normanhurst", "Pennant Hills", "Cheltenham", "Thornleigh", "Berowra"]}
      faqs={[
        {
          q: "Do you serve Hornsby and the North Shore area?",
          a: "Yes. Willow Tree Funerals serves Hornsby and all surrounding North Shore suburbs including Wahroonga, Turramurra, Asquith, Mount Colah, Waitara, Normanhurst, Pennant Hills, Cheltenham, and Thornleigh. Our team is available 24/7.",
        },
        {
          q: "What types of funerals do you arrange in Hornsby?",
          a: "We arrange the full range of funeral services in Hornsby  -  Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. Every service is personalised to your family's wishes.",
        },
        {
          q: "How quickly can you respond to a death in Hornsby?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists  -  not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Hornsby?",
          a: "Funeral costs in Hornsby vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-hornsby"
      metaTitle="Funeral Director Hornsby | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Hornsby. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across the North Shore. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
