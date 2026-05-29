import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Chatswood() {
  return (
    <SuburbPageTemplate
      suburb="Chatswood"
      region="North Shore, Sydney"
      slug="chatswood"
      heroHeading="Funeral Director Chatswood"
      heroSubheading="Independent, family-owned funeral services for families in Chatswood and across the North Shore. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals provides compassionate funeral services to families in Chatswood and the surrounding North Shore area. Our team understands the diverse communities that call Chatswood home and is experienced in arranging services that honour every cultural and religious tradition. We are available around the clock and can be with your family quickly when you need us most."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Willoughby", "Lane Cove", "Artarmon", "St Leonards", "Crows Nest", "North Sydney", "Roseville", "Gordon", "Lindfield", "Killara"]}
      faqs={[
        {
          q: "Do you serve Chatswood and the North Shore area?",
          a: "Yes. Willow Tree Funerals serves Chatswood and all surrounding North Shore suburbs including Willoughby, Lane Cove, Artarmon, St Leonards, Crows Nest, North Sydney, Roseville, Gordon, Lindfield, and Killara.",
        },
        {
          q: "What types of funerals do you arrange in Chatswood?",
          a: "We arrange the full range of funeral services in Chatswood  -  Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. We also have extensive experience serving Chatswood's multicultural community.",
        },
        {
          q: "How quickly can you respond to a death in Chatswood?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists  -  not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Chatswood?",
          a: "Funeral costs in Chatswood vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-chatswood"
      metaTitle="Funeral Director Chatswood | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Chatswood. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across the North Shore. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
