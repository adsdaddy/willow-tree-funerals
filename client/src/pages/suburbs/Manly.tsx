import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Manly() {
  return (
    <SuburbPageTemplate
      suburb="Manly"
      region="Northern Beaches, Sydney"
      slug="manly"
      heroHeading="Funeral Director Manly"
      heroSubheading="Compassionate, independent funeral services for families in Manly and across the Northern Beaches. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families in Manly and throughout the Northern Beaches with the same care and dedication we bring to every family we support. Our experienced team is available around the clock and can be with your family quickly when you need us most. We offer the full range of funeral services — from Catholic Masses and multi-faith ceremonies to secular celebrations of life and direct cremations, all personalised to honour your loved one."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Freshwater", "Dee Why", "Brookvale", "Balgowlah", "Fairlight", "Seaforth", "Mosman", "Narrabeen"]}
      faqs={[
        {
          q: "Do you serve Manly and the Northern Beaches?",
          a: "Yes. Willow Tree Funerals serves Manly and all surrounding Northern Beaches suburbs including Freshwater, Dee Why, Brookvale, Balgowlah, Fairlight, Seaforth, Narrabeen, and beyond. Our team is available 24/7.",
        },
        {
          q: "What types of funerals do you arrange in Manly?",
          a: "We arrange the full range of funeral services in Manly — Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. Every service is personalised to your family's wishes.",
        },
        {
          q: "How quickly can you respond to a death in Manly?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists — not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Manly?",
          a: "Funeral costs in Manly vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://www.willowtreefunerals.com.au/funeral-director-manly"
      metaTitle="Funeral Director Manly | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Manly. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across the Northern Beaches. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
