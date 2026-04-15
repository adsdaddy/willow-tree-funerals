/**
 * WILLOW TREE FUNERALS — Celebration of Life Page
 * SEO: "celebration of life sydney", "celebration of life funeral hurstville",
 *      "non-religious funeral sydney", "life celebration service st george"
 */

import ServicePageTemplate from "../../components/ServicePageTemplate";
import { COMPANY } from "../../../../shared/company";

export default function CelebrationOfLife() {
  return (
    <ServicePageTemplate
      seo={{
        title: "Celebration of Life Sydney | Life Celebration Funeral Hurstville",
        description: "Beautiful celebration of life services in Sydney. Joyful, personalised tributes that honour who your loved one truly was. Willow Tree Funerals, Hurstville. Call 02 8776 1667.",
        canonical: "/services/celebration-of-life",
      }}
      hero={{
        label: "Celebration of Life",
        heading: "A Joyful Tribute to a Life Well Lived",
        subheading: "Personalised celebration of life services that honour your loved one's passions, stories, and the lives they touched.",
        image: COMPANY.assets.chapelInterior,
      }}
      intro={`A Celebration of Life is a beautiful, personalised service that focuses on honouring who your loved one truly was — their passions, their humour, their relationships, and the legacy they leave behind. While a traditional funeral centres on the solemnity of loss, a Celebration of Life embraces joy, gratitude, and the richness of a life fully lived. At Willow Tree Funerals, we help families create deeply meaningful tributes that feel authentic, warm, and uniquely personal — whether held at a chapel, a garden, a favourite venue, or even a sporting club.`}
      includes={[
        "Personalised service design consultation with Bruce",
        "Photo and video tribute presentation",
        "Music of your choice — live or recorded",
        "Personalised order of service booklet",
        "Venue coordination (chapel, garden, club, or any location)",
        "Floral arrangements reflecting your loved one's personality",
        "Guest book and memory table",
        "Catering coordination (optional)",
        "Transfer and care of your loved one",
        "Cremation or burial arrangements",
      ]}
      featureImage={COMPANY.assets.grandmotherGranddaughter}
      pullQuote="Give thanks in all circumstances; for this is the will of God in Christ Jesus for you."
      steps={[
        { num: "01", title: "Share Their Story", desc: "Tell us about your loved one — their life, their passions, their favourite things. This is where the service begins." },
        { num: "02", title: "Design Together", desc: "We work with your family to design a service that feels authentic, personal, and genuinely celebratory." },
        { num: "03", title: "The Celebration", desc: "A warm, joyful tribute that brings people together to laugh, cry, remember, and celebrate." },
        { num: "04", title: "The Farewell", desc: "Whether cremation or burial follows, we ensure the transition is handled with the same care and dignity." },
      ]}
      faqs={[
        {
          q: "What is the difference between a Celebration of Life and a traditional funeral?",
          a: "A traditional funeral tends to follow a more formal, structured format — often religious — and focuses on the solemnity of loss. A Celebration of Life is more flexible and personalised, focusing on joy, gratitude, and the unique character of the person who has died. Both can include religious or spiritual elements if desired.",
        },
        {
          q: "Can we have a Celebration of Life at a non-traditional venue?",
          a: "Absolutely. We have held Celebrations of Life at sporting clubs, restaurants, gardens, beaches, and community halls. If your loved one had a special place they loved, we will do everything we can to make it happen there.",
        },
        {
          q: "Can a Celebration of Life include religious elements?",
          a: "Yes. Many families choose to incorporate prayers, scripture readings, or hymns into a Celebration of Life. We will work with you and any clergy to blend faith and personalisation in a way that feels right for your family.",
        },
        {
          q: "How far in advance do we need to plan?",
          a: "Some families choose to hold the Celebration of Life a few weeks after the death, giving more time to plan and allowing distant family members to travel. Others prefer to hold it within the usual timeframe. We are flexible and will work to your timeline.",
        },
      ]}
      relatedServices={[
        { label: "Funeral Services", href: "/services/funeral-services", desc: "Full funeral services for all faiths and traditions." },
        { label: "Cremation Services", href: "/services/cremation", desc: "Dignified cremation options to complement your celebration." },
        { label: "Pre-Arranged Funerals", href: "/services/pre-arranged-funerals", desc: "Plan your own Celebration of Life in advance." },
      ]}
    />
  );
}
