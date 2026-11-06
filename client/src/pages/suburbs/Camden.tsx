import SuburbPageTemplate from "@/components/SuburbPageTemplate";

const HERO_IMG = "/media/de8eac36d42f43773b499b5738d82da9c0bab5486fb3c8084f13a811265ecab6.webp";

export default function Camden() {
  return (
    <SuburbPageTemplate
      suburb="Camden"
      region="South West Sydney"
      slug="camden"
      heroHeading="Funeral Director Camden"
      heroSubheading="Independent, caring funeral services for families in Camden and the Macarthur region. Available 24 hours a day, 7 days a week."
      intro="Willow Tree Funerals serves families in Camden, Narellan, Elderslie, and the broader Macarthur region from our Macquarie Links office. We are proud to be an independent, family-owned funeral home  -  not part of any corporate group. Every arrangement is personally overseen by Bruce Missen, who brings both professional expertise and genuine compassion to every family."
      services={[
        "Catholic Funeral Masses",
        "Cremation Services",
        "Burial Services",
        "Graveside Services",
        "Secular Celebrations of Life",
        "Repatriation Services",
        "Pre-Arranged Funerals",
      ]}
      nearbySuburbs={["Narellan", "Elderslie", "Harrington Park", "Mount Annan", "Smeaton Grange", "Kirkham", "Cobbitty", "Menangle", "Picton", "Campbelltown"]}
      faqs={[
        {
          q: "Do you serve Camden and the Macarthur region?",
          a: "Yes. Willow Tree Funerals serves Camden, Narellan, Elderslie, Harrington Park, Mount Annan, and all surrounding Macarthur suburbs. Our Macquarie Links office is conveniently located to serve your family quickly.",
        },
        {
          q: "Can you arrange a funeral at Camden Catholic Church?",
          a: "Yes. We have experience coordinating Catholic funeral Masses with parish priests across the Camden and Macarthur area. We handle all church liaison and coordination on your behalf.",
        },
        {
          q: "Do you work with Macquarie Memorial Park in Camden?",
          a: "Yes. We have extensive experience working with Macquarie Memorial Park, one of Sydney's newest and most beautiful cemeteries. We handle all cemetery liaison and paperwork on your behalf.",
        },
        {
          q: "How much does a funeral cost in Camden?",
          a: "Our funeral packages start from $2,950 for a direct cremation. We provide full itemised quotes with no hidden fees. Call us or visit our Pricing page for a detailed breakdown.",
        },
      ]}
      canonicalUrl="https://willowtreefunerals.com.au/funeral-director-camden"
      metaTitle="Funeral Director Camden | Willow Tree Funerals | 02 8776 1667"
      metaDescription="Independent funeral director serving Camden and the Macarthur region. Catholic, secular, and multi-faith services. Available 24/7. Call us on 02 8776 1667."
      heroImage={HERO_IMG}
    />
  );
}
