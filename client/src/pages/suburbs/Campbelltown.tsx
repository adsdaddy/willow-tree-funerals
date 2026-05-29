import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0023_bedffdad.jpg";

export default function Campbelltown() {
  return (
    <SuburbPageTemplate
      suburb="Campbelltown"
      region="South West Sydney"
      slug="campbelltown"
      heroHeading="Funeral Director Campbelltown"
      heroSubheading="Independent, compassionate funeral services for families in Campbelltown and South West Sydney. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families across Campbelltown, Narellan, Gregory Hills, Camden, and all of South West Sydney from our Macquarie Links office. Bruce Missen brings the same personal care and attention to every family  -  whether you need a Catholic Mass, a secular celebration of life, or a simple direct cremation."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Narellan", "Gregory Hills", "Camden", "Menangle", "Picton", "Ingleburn", "Minto", "Leumeah", "Glenfield", "Macquarie Fields"]}
      faqs={[
        {
          q: "Do you have a funeral home in Campbelltown?",
          a: "Yes. Willow Tree Funerals has an office in nearby Macquarie Links, serving Campbelltown and all of South West Sydney. Bruce Missen is available to meet your family at home, at hospital, or wherever is most comfortable.",
        },
        {
          q: "What funeral services do you offer in Campbelltown?",
          a: "We offer the full range of funeral services in Campbelltown  -  Catholic Masses, multi-faith ceremonies, secular celebrations of life, cremations, burials, graveside services, and pre-arranged funerals.",
        },
        {
          q: "Which cemeteries do you use near Campbelltown?",
          a: "We work with all cemeteries in the South West Sydney area including Campbelltown Catholic Cemetery, Campbelltown General Cemetery, and Macquarie Memorial Park. We handle all cemetery liaison on your behalf.",
        },
        {
          q: "How much does a funeral cost in Campbelltown?",
          a: "Our funeral packages start from $2,950 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for a detailed breakdown.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-campbelltown"
      metaTitle="Funeral Director Campbelltown | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Independent funeral director serving Campbelltown and South West Sydney. Catholic, secular, and multi-faith services. Available 24/7. Call us on 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
