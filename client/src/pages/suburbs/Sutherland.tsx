import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20240920-WA0186_e139bdc4.jpg";

export default function Sutherland() {
  return (
    <SuburbPageTemplate
      suburb="Sutherland"
      region="Sutherland Shire, Sydney"
      slug="sutherland"
      heroHeading="Funeral Director Sutherland"
      heroSubheading="Trusted, independent funeral services for families across the Sutherland Shire. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals has deep roots in the Sutherland Shire community. We serve families across Sutherland, Miranda, Cronulla, Caringbah, Engadine, and all surrounding suburbs. Bruce Missen personally oversees every arrangement, bringing both professional expertise and genuine compassion to every family he serves."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Miranda", "Cronulla", "Caringbah", "Engadine", "Gymea", "Kirrawee", "Jannali", "Como", "Loftus", "Heathcote"]}
      faqs={[
        {
          q: "Do you serve Sutherland and the Sutherland Shire?",
          a: "Yes. Willow Tree Funerals serves the entire Sutherland Shire including Sutherland, Miranda, Cronulla, Caringbah, Engadine, Gymea, Kirrawee, Jannali, Como, and all surrounding suburbs.",
        },
        {
          q: "Can you arrange a Catholic funeral in Sutherland?",
          a: "Absolutely. Bruce Missen has extensive experience coordinating Catholic funeral Masses with parish priests across the Sutherland Shire. We handle all church liaison, Mass booklets, and coordination on your behalf.",
        },
        {
          q: "Are you available on weekends and public holidays in Sutherland?",
          a: "Yes. We are available 24 hours a day, 7 days a week  -  including weekends and public holidays. When you call, you speak directly with Bruce Missen, not a call centre.",
        },
        {
          q: "What cemeteries do you use in the Sutherland Shire?",
          a: "We work with all cemeteries in the Sutherland Shire area including Woronora Cemetery, Sutherland General Cemetery, and others. We handle all cemetery liaison on your behalf.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-sutherland"
      metaTitle="Funeral Director Sutherland Shire | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Trusted funeral director serving Sutherland and the Sutherland Shire. Catholic, secular, and multi-faith services. Available 24/7. Call us on 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
