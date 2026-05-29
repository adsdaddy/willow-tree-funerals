import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function NorthSydney() {
  return (
    <SuburbPageTemplate
      suburb="North Sydney"
      region="Lower North Shore, Sydney"
      slug="north-sydney"
      heroHeading="Funeral Director North Sydney"
      heroSubheading="Compassionate, independent funeral services for families in North Sydney and across the Lower North Shore. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families in North Sydney and throughout the Lower North Shore with genuine care and professionalism. Our team is available around the clock and can be with your family quickly when you need us most. We offer the full range of funeral services  -  from Catholic Masses and multi-faith ceremonies to secular celebrations of life and direct cremations."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Milsons Point", "Kirribilli", "McMahons Point", "Lavender Bay", "Crows Nest", "Waverton", "Wollstonecraft", "St Leonards", "Artarmon", "Chatswood"]}
      faqs={[
        {
          q: "Do you serve North Sydney and the Lower North Shore?",
          a: "Yes. Willow Tree Funerals serves North Sydney and all surrounding Lower North Shore suburbs including Milsons Point, Kirribilli, McMahons Point, Lavender Bay, Crows Nest, Waverton, Wollstonecraft, St Leonards, and Artarmon.",
        },
        {
          q: "What types of funerals do you arrange in North Sydney?",
          a: "We arrange the full range of funeral services in North Sydney  -  Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. Every service is personalised to your family's wishes.",
        },
        {
          q: "How quickly can you respond to a death in North Sydney?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists  -  not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in North Sydney?",
          a: "Funeral costs in North Sydney vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-north-sydney"
      metaTitle="Funeral Director North Sydney | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in North Sydney. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across the Lower North Shore. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
