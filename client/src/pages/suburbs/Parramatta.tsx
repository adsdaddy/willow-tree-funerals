import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Parramatta() {
  return (
    <SuburbPageTemplate
      suburb="Parramatta"
      region="Western Sydney"
      slug="parramatta"
      heroHeading="Funeral Director Parramatta"
      heroSubheading="Independent, compassionate funeral services for families in Parramatta and across Western Sydney. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals provides dignified, personalised funeral services to families in Parramatta and the surrounding Western Sydney area. Our team is experienced in serving Parramatta's diverse and multicultural community, arranging services that honour every cultural and religious tradition. Our Macquarie Links office means we are well-placed to serve families in the Parramatta area with care and efficiency."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Westmead", "Merrylands", "Granville", "Harris Park", "Rosehill", "Auburn", "Homebush"]}
      faqs={[
        {
          q: "Do you serve Parramatta and Western Sydney?",
          a: "Yes. Willow Tree Funerals serves Parramatta and all surrounding Western Sydney suburbs including Westmead, Merrylands, Granville, Harris Park, Rosehill, Auburn, and Homebush. Our team is available 24/7.",
        },
        {
          q: "What types of funerals do you arrange in Parramatta?",
          a: "We arrange the full range of funeral services in Parramatta — Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. We have extensive experience serving Parramatta's multicultural community.",
        },
        {
          q: "How quickly can you respond to a death in Parramatta?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists — not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Parramatta?",
          a: "Funeral costs in Parramatta vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://www.willowtreefunerals.com.au/funeral-director-parramatta"
      metaTitle="Funeral Director Parramatta | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Parramatta. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across Western Sydney. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
