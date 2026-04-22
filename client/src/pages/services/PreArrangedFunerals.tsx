/**
 * WILLOW TREE FUNERALS — Pre-Arranged Funerals Page
 * SEO: "pre-arranged funerals sydney", "pre-plan funeral hurstville",
 *      "funeral pre-planning st george", "pre-paid funeral sydney"
 */

import ServicePageTemplate from "../../components/ServicePageTemplate";
import { COMPANY } from "../../../../shared/company";

export default function PreArrangedFunerals() {
  return (
    <ServicePageTemplate
      seo={{
        title: "Pre-Arranged Funerals Sydney | Pre-Plan Your Funeral Hurstville",
        description: "Pre-arrange your funeral with Willow Tree Funerals and give your family the gift of certainty. Catholic funerals, cremation & burial pre-planning across Sydney. Call 02 8776 1667.",
        canonical: "/services/pre-arranged-funerals",
      }}
      hero={{
        label: "Pre-Arranged Funerals",
        heading: "Give Your Family the Gift of Certainty",
        subheading: "Pre-arranging your funeral is one of the most loving things you can do — sparing your family from difficult decisions at the hardest time.",
        image: COMPANY.assets.personPhone,
      }}
      intro={`Pre-arranging your funeral is a profound act of love and care for the people you will leave behind. When your wishes are clearly documented and your arrangements are in place, your family is spared the burden of making difficult decisions while they are grieving. At Willow Tree Funerals, our team will meet with you personally — at our Hurstville office, our Macquarie Links location, or in your own home — to discuss your wishes, document your preferences, and ensure everything is prepared exactly as you want it. There is no pressure, no obligation, and no rush.`}
      includes={[
        "Personal consultation with our team at a time and place of your choosing",
        "Documentation of all your funeral wishes",
        "Choice of service type: Catholic, religious, secular, or Celebration of Life",
        "Coffin or urn selection",
        "Cemetery or crematorium preference",
        "Music, readings, and personalisation preferences",
        "Secure storage of your pre-arrangement documents",
        "Notification to your family and executor",
        "Option to pre-pay and lock in today's prices",
        "Annual review of your arrangements (if desired)",
      ]}
      featureImage={COMPANY.assets.bruceHeadshot}
      pullQuote="In my Father's house are many rooms. I am going there to prepare a place for you."
      steps={[
        { num: "01", title: "Initial Conversation", desc: "Call us on 02 8776 1667 or complete our online enquiry form. We will arrange a time to meet — at our office, or in your home." },
        { num: "02", title: "Document Your Wishes", desc: "We record every detail of your preferences — the service, the music, the readings, the burial or cremation, and any personal touches." },
        { num: "03", title: "Secure Your Arrangements", desc: "Your wishes are securely stored and your family and executor are notified of the arrangements." },
        { num: "04", title: "Peace of Mind", desc: "You and your family have complete peace of mind, knowing everything is taken care of exactly as you wish." },
      ]}
      faqs={[
        {
          q: "What is the difference between pre-arranging and pre-paying?",
          a: "Pre-arranging means documenting your funeral wishes in advance — no money changes hands. Pre-paying means paying for your funeral now, locking in today's prices and ensuring the cost is covered. Both options are available, and there is no obligation to pre-pay when you pre-arrange.",
        },
        {
          q: "Can I pre-arrange a Catholic funeral?",
          a: "Yes. We can document all your Catholic funeral preferences — your parish, the type of Mass, readings, hymns, and any other liturgical wishes — so your family and parish priest have clear guidance.",
        },
        {
          q: "What happens to my pre-arrangement if I move interstate or overseas?",
          a: "We can transfer your pre-arrangement to a funeral director in your new location, or your family can contact us and we will assist with repatriation. If you have pre-paid, your funds are held in a regulated trust and are transferable.",
        },
        {
          q: "Can I change my pre-arrangement after it is set up?",
          a: "Yes, absolutely. Your wishes may change over time, and we encourage you to review your arrangements periodically. There is no cost to update your pre-arrangement.",
        },
        {
          q: "Does pre-arranging save my family money?",
          a: "Pre-paying locks in today's prices and protects your family from future price increases. Pre-arranging (without pre-paying) does not lock in prices but still saves your family the emotional cost of making decisions under pressure.",
        },
      ]}
      relatedServices={[
        { label: "Catholic Funerals", href: "/services/catholic-funerals", desc: "Pre-arrange your Catholic funeral Mass and burial." },
        { label: "Funeral Services", href: "/services/funeral-services", desc: "Learn about all our funeral service options." },
        { label: "Cremation Services", href: "/services/cremation", desc: "Pre-arrange your cremation and choose your urn." },
      ]}
    />
  );
}
