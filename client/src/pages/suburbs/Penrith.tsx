import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

export default function Penrith() {
  return (
    <SuburbPageTemplate
      suburb="Penrith"
      region="Western Sydney"
      slug="penrith"
      heroHeading="Funeral Director Penrith"
      heroSubheading="Compassionate, independent funeral services for families in Penrith and across Western Sydney. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families in Penrith and throughout Western Sydney with genuine care and professionalism. Our Macquarie Links office means we are well-placed to serve families in the Penrith area quickly and with the personal attention that every family deserves. We offer the full range of funeral services — from Catholic Masses and multi-faith ceremonies to secular celebrations of life and direct cremations."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["St Marys", "Kingswood", "Werrington", "Emu Plains", "Glenmore Park", "Richmond", "Windsor"]}
      faqs={[
        {
          q: "Do you serve Penrith and Western Sydney?",
          a: "Yes. Willow Tree Funerals serves Penrith and all surrounding Western Sydney suburbs including St Marys, Kingswood, Werrington, Emu Plains, Glenmore Park, Richmond, and Windsor. Our Macquarie Links office means we can be with your family quickly.",
        },
        {
          q: "What types of funerals do you arrange in Penrith?",
          a: "We arrange the full range of funeral services in Penrith — Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, and graveside services. Every service is personalised to your family's wishes.",
        },
        {
          q: "How quickly can you respond to a death in Penrith?",
          a: "We are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our Family Care Specialists — not a call centre. We can transfer your loved one into our care promptly and be with your family within hours.",
        },
        {
          q: "What does a funeral cost in Penrith?",
          a: "Funeral costs in Penrith vary depending on the type of service. Our packages start from $3,100 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for details.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-penrith"
      metaTitle="Funeral Director Penrith | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director in Penrith. Willow Tree Funerals offers Catholic, secular, and multi-faith funeral services across Western Sydney. Available 24/7. Call 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
