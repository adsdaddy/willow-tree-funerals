import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Mosman() {
  return (
    <SuburbPageTemplate
      suburb="Mosman"
      region="Lower North Shore, Sydney"
      slug="mosman"
      heroHeading="Funeral Director Mosman"
      heroSubheading="Independent, compassionate funeral services for families in Mosman and the Lower North Shore. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals provides dignified, personalised funeral services to families in Mosman and the surrounding Lower North Shore. Our team brings genuine care and professionalism to every arrangement, ensuring your loved one is honoured with the respect they deserve. We are available around the clock and can be with your family quickly when you need us most."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Cremorne", "Neutral Bay", "Balmoral", "Spit Junction", "Clifton Gardens", "Middle Cove", "Seaforth", "Manly", "Cammeray", "North Sydney"]}
      faqs={[
        {
          q: "Do you serve Mosman and the Lower North Shore?",
          a: "Yes. Willow Tree Funerals serves Mosman and all surrounding Lower North Shore suburbs including Cremorne, Neutral Bay, Balmoral, Spit Junction, Clifton Gardens, Middle Cove, Seaforth, and Cammeray.",
        },
        {
          q: "What types of funerals do you arrange in Mosman?",
          a: "We arrange the full range of funeral services in Mosman — Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. Every service is personalised to your family's wishes.",
        },
        {
          q: "How quickly can you respond to a death in Mosman?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists — not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Mosman?",
          a: "Funeral costs in Mosman vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-mosman"
      metaTitle="Funeral Director Mosman | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Mosman. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across the Lower North Shore. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
