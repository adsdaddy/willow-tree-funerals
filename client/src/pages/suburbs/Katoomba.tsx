import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Katoomba() {
  return (
    <SuburbPageTemplate
      suburb="Katoomba"
      region="Blue Mountains"
      slug="katoomba"
      heroHeading="Funeral Director Katoomba"
      heroSubheading="Compassionate, independent funeral services for families in Katoomba and across the Blue Mountains. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families in Katoomba and throughout the Blue Mountains with the same care and dedication we bring to every family we support. Our Macquarie Links office means we are well-placed to serve Blue Mountains families efficiently and with a personal touch. We offer the full range of funeral services — from Catholic Masses and multi-faith ceremonies to secular celebrations of life and direct cremations, all personalised to honour your loved one."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Leura", "Wentworth Falls", "Blackheath", "Springwood", "Hazelbrook", "Lawson", "Woodford", "Penrith"]}
      faqs={[
        {
          q: "Do you serve Katoomba and the Blue Mountains?",
          a: "Yes. Willow Tree Funerals serves Katoomba and all surrounding Blue Mountains communities including Leura, Wentworth Falls, Blackheath, Springwood, Hazelbrook, Lawson, and Woodford. Our Macquarie Links office means we can be with your family quickly.",
        },
        {
          q: "What types of funerals do you arrange in Katoomba?",
          a: "We arrange the full range of funeral services in Katoomba — Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. Every service is personalised to your family's wishes.",
        },
        {
          q: "How quickly can you respond to a death in Katoomba?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists — not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Katoomba?",
          a: "Funeral costs in Katoomba vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-katoomba"
      metaTitle="Funeral Director Katoomba | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Katoomba. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across the Blue Mountains. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
