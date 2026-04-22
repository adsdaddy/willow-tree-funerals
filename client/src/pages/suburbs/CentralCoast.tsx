import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg";

export default function CentralCoast() {
  return (
    <SuburbPageTemplate
      suburb="Central Coast"
      region="Central Coast, NSW"
      slug="central-coast"
      heroHeading="Funeral Director Central Coast"
      heroSubheading="Compassionate, independent funeral services for families on the Central Coast. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals extends its services to families on the Central Coast of NSW. We serve Gosford, Wyong, Terrigal, The Entrance, and all surrounding areas. Our team will travel to the Central Coast to meet your family and personally oversee every aspect of the funeral arrangement — bringing the same care and dignity that has earned us a 5-star Google rating."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Gosford", "Wyong", "Terrigal", "The Entrance", "Erina", "Tuggerah", "Woy Woy", "Umina Beach", "Avoca Beach", "Toukley"]}
      faqs={[
        {
          q: "Do you serve the Central Coast?",
          a: "Yes. Willow Tree Funerals serves families across the Central Coast including Gosford, Wyong, Terrigal, The Entrance, Erina, and all surrounding areas. Our team will travel to meet your family wherever is most convenient.",
        },
        {
          q: "Can you arrange a Catholic funeral on the Central Coast?",
          a: "Yes. We have experience coordinating Catholic funeral Masses with parish priests across the Central Coast Diocese. We handle all church liaison and coordination on your behalf.",
        },
        {
          q: "Which cemeteries do you work with on the Central Coast?",
          a: "We work with all cemeteries on the Central Coast including Kincumber Lawn Cemetery, Gosford Cemetery, and others. We handle all cemetery liaison and paperwork on your behalf.",
        },
        {
          q: "Is there an additional charge for funerals on the Central Coast?",
          a: "We serve the Central Coast as part of our standard service area. Please call us to discuss your specific needs and we will provide a full itemised quote with no hidden fees.",
        },
      ]}
      canonicalUrl="https://www.willowtreefunerals.com.au/funeral-director-central-coast"
      metaTitle="Funeral Director Central Coast NSW | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Independent funeral director serving the Central Coast NSW. Catholic, secular, and multi-faith services. Available 24/7. Call us on 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
