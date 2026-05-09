import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Leichhardt() {
  return (
    <SuburbPageTemplate
      suburb="Leichhardt"
      region="Inner West, Sydney"
      slug="leichhardt"
      heroHeading="Funeral Director Leichhardt"
      heroSubheading="Compassionate, independent funeral services for families in Leichhardt and the Inner West. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families in Leichhardt and throughout the Inner West with genuine care and professionalism. Our team understands the close-knit, diverse communities of the Inner West and brings a personal, unhurried approach to every arrangement. We are available around the clock and can be with your family quickly when you need us most, guiding you through every step with compassion."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Annandale", "Balmain", "Rozelle", "Lilyfield", "Haberfield", "Ashfield", "Summer Hill", "Petersham"]}
      faqs={[
        {
          q: "Do you serve Leichhardt and the Inner West?",
          a: "Yes. Willow Tree Funerals serves Leichhardt and all surrounding Inner West suburbs including Annandale, Balmain, Rozelle, Lilyfield, Haberfield, Ashfield, Summer Hill, and Petersham. Our team is available 24/7.",
        },
        {
          q: "What types of funerals do you arrange in Leichhardt?",
          a: "We arrange the full range of funeral services in Leichhardt — Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. Every service is personalised to your family's wishes.",
        },
        {
          q: "How quickly can you respond to a death in Leichhardt?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists — not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Leichhardt?",
          a: "Funeral costs in Leichhardt vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-leichhardt"
      metaTitle="Funeral Director Leichhardt | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Leichhardt. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across the Inner West. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
