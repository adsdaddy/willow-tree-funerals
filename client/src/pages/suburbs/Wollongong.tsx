import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-interior-mass_upscaled_a84f50dd.jpg";

export default function Wollongong() {
  return (
    <SuburbPageTemplate
      suburb="Wollongong"
      region="Illawarra, NSW"
      slug="wollongong"
      heroHeading="Funeral Director Wollongong"
      heroSubheading="Compassionate funeral services for families in Wollongong and the Illawarra region. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals extends its services to families in Wollongong and the Illawarra region. We understand that when a loved one passes, families need immediate, compassionate support — and we provide exactly that. Bruce Missen will travel to Wollongong to meet your family and personally oversee every aspect of the funeral arrangement."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Shellharbour", "Kiama", "Dapto", "Unanderra", "Figtree", "Fairy Meadow", "Thirroul", "Corrimal", "Bulli", "Helensburgh"]}
      faqs={[
        {
          q: "Do you serve Wollongong and the Illawarra?",
          a: "Yes. Willow Tree Funerals serves families in Wollongong, Shellharbour, Kiama, and throughout the Illawarra region. Bruce Missen will travel to meet your family wherever is most convenient.",
        },
        {
          q: "Can you arrange a Catholic funeral in Wollongong?",
          a: "Yes. We have experience coordinating Catholic funeral Masses with parish priests across the Wollongong Diocese. We handle all church liaison, Mass booklets, and coordination on your behalf.",
        },
        {
          q: "Which cemeteries do you work with in Wollongong?",
          a: "We work with all cemeteries in the Wollongong and Illawarra area including Wollongong General Cemetery, Dapto Lawn Cemetery, and others. We handle all cemetery liaison on your behalf.",
        },
        {
          q: "How far do you travel for funerals in the Illawarra?",
          a: "We serve the entire Illawarra region including Wollongong, Shellharbour, Kiama, and surrounding areas. There is no additional travel charge for families in these areas.",
        },
      ]}
      canonicalUrl="https://www.willowtreefunerals.com.au/funeral-director-wollongong"
      metaTitle="Funeral Director Wollongong | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Compassionate funeral director serving Wollongong and the Illawarra. Catholic, secular, and multi-faith services. Available 24/7. Call Bruce Missen on 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
