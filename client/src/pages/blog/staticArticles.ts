/**
 * Static blog articles for Willow Tree Funerals.
 * These are hand-written articles stored as markdown strings,
 * rendered through the same premium BlogArticle layout as babylovegrowth.ai articles.
 */

export interface StaticArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  publishDate: string;
  publishedAt: Date;
  readTime: number;
  heroImage: string;
  tags: string;
  excerpt: string;
  author: string;
  content: string;
  relatedSlugs: string[];
}

export const STATIC_ARTICLES: StaticArticle[] = [
  {
    slug: "what-to-do-when-someone-passes-away-nsw",
    title: "What to Do When Someone Passes Away in NSW",
    metaTitle: "What to Do When Someone Passes Away in NSW | Willow Tree Funerals",
    metaDescription:
      "A step-by-step guide for families in NSW - from the moment of death through to the funeral service. Written by Bruce Missen, funeral director at Willow Tree Funerals.",
    canonicalUrl:
      "https://willowtreefunerals.com.au/blog/what-to-do-when-someone-passes-away-nsw",
    publishDate: "April 2026",
    publishedAt: new Date("2026-04-01"),
    readTime: 8,
    heroImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/person-phone_01a8551b.png",
    tags: "Practical Guidance,NSW,After Death",
    excerpt:
      "A step-by-step guide for families in NSW - from the moment of death through to the funeral service. You do not have to face this alone.",
    author: "Bruce Missen",
    relatedSlugs: [
      "how-to-plan-catholic-funeral-sydney",
      "understanding-funeral-costs-sydney",
      "macarthur-memorial-park-guide",
    ],
    content: `When a loved one passes away, it can be difficult to know what to do next. The grief is overwhelming, and the practical steps can feel impossible. This guide walks you through exactly what happens - and what you need to do - in the hours and days following a death in New South Wales.

The most important thing to know is this: **you do not have to face this alone**. A good funeral director will guide you through every step, handle the paperwork, and take care of all the practical arrangements so you can focus on your family.

## Step 1: Call a Doctor or Medical Professional

When someone passes away, the first step is to have a doctor certify the death. If the death occurs at home and was expected (for example, following a terminal illness), call the person's GP or the palliative care team. If the death was sudden or unexpected, call 000 immediately.

In NSW, a doctor must certify the cause of death before the body can be moved. This is a legal requirement. The doctor will issue a Medical Certificate of Cause of Death (MCCD), which is needed to register the death.

## Step 2: Call a Funeral Director

Once the death has been certified, call a funeral director. You do not need to have everything decided - a good funeral director will guide you through the process step by step. At Willow Tree Funerals, we are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our friendly Family Care Specialists.

The funeral director will arrange the transfer of your loved one into their care. This can happen at home, at hospital, at a nursing home, or wherever your loved one has passed. There is no need to rush - take the time you need to say goodbye.

> "When you call us, we answer. Day or night, weekends and public holidays - our Family Care Specialists are always available. You will never speak to a call centre."
> - Bruce Missen, Managing Director, Willow Tree Funerals

## Step 3: Register the Death

In NSW, all deaths must be registered with the NSW Registry of Births, Deaths and Marriages within 7 days. Your funeral director will handle this on your behalf. You will need to provide some basic information about the deceased, including their full name, date of birth, and address.

Once the death is registered, you can obtain a Death Certificate. You will need multiple certified copies - for banks, superannuation, insurance, and other legal matters. Your funeral director can advise you on how many copies to order.

## Step 4: Notify Family and Friends

There is no right or wrong way to notify people of a death. Some families prefer to make phone calls; others send a message or email. Your funeral director can help you draft a death notice for publication in newspapers or online if you wish.

## Step 5: Plan the Funeral Service

Your funeral director will meet with you - at home, at their office, or wherever is most comfortable - to discuss the funeral arrangements. This includes:

- The type of service (burial or cremation)
- The venue (church, chapel, graveside, or another location)
- The date and time of the service
- Music, readings, and tributes
- The casket or urn
- Flowers and other tributes
- The funeral notice and order of service

At Willow Tree Funerals, we handle all of this for you - including liaising with the church, the cemetery or crematorium, and any other service providers. You only need to focus on your family.

## Step 6: Attend to Legal and Financial Matters

After the funeral, there are a number of legal and financial matters to attend to. These include:

- Notifying Centrelink or the Department of Veterans' Affairs
- Notifying the Australian Taxation Office
- Contacting banks and financial institutions
- Applying for probate if there is a will
- Cancelling subscriptions, memberships, and accounts

Your funeral director can provide guidance on these matters, and many families choose to engage a solicitor or estate administrator to help.

## Who to Call First in NSW

If you are unsure who to call, start with your funeral director. At Willow Tree Funerals, we can guide you through every step - from the moment of death through to the final farewell. Call us any time on [02 8776 1667](tel:+61287761667).

## Frequently Asked Questions

### Do I need to call the police when someone dies at home?

Only if the death was sudden, unexpected, or suspicious. If the death was expected (for example, following a terminal illness), you do not need to call the police - call the person's GP or palliative care team instead. If you are unsure, call 000 and they will advise you.

### How long do I have before I need to call a funeral director?

There is no strict time limit, but most families call within a few hours of the death. The funeral director will arrange for the transfer of your loved one into their care at a time that suits your family.

### Can I stay with my loved one until the funeral director arrives?

Yes, absolutely. There is no rush. Take the time you need to say goodbye. The funeral director will arrive when you are ready.

### Does the funeral director handle the death registration?

Yes. Your funeral director will register the death with the NSW Registry of Births, Deaths and Marriages on your behalf. You will need to provide some basic information about the deceased.`,
  },
  {
    slug: "how-to-plan-catholic-funeral-sydney",
    title: "How to Plan a Catholic Funeral Mass in Sydney",
    metaTitle: "How to Plan a Catholic Funeral Mass in Sydney | Willow Tree Funerals",
    metaDescription:
      "Everything you need to know about arranging a Catholic funeral Mass in Sydney - from liaising with the parish priest to choosing readings, music, and the Mass booklet. Written by Bruce Missen.",
    canonicalUrl:
      "https://willowtreefunerals.com.au/blog/how-to-plan-catholic-funeral-sydney",
    publishDate: "March 2026",
    publishedAt: new Date("2026-03-01"),
    readTime: 10,
    heroImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-interior-mass_upscaled_a84f50dd.jpg",
    tags: "Catholic Funerals,Sydney,Planning",
    excerpt:
      "Everything you need to know about arranging a Catholic funeral Mass in Sydney - from liaising with the parish priest to choosing readings, music, and the Mass booklet.",
    author: "Bruce Missen",
    relatedSlugs: [
      "what-to-do-when-someone-passes-away-nsw",
      "understanding-funeral-costs-sydney",
      "macarthur-memorial-park-guide",
    ],
    content: `A Catholic funeral Mass is one of the most sacred and meaningful ways to farewell a loved one. For Catholic families in Sydney, it is both a deeply personal tribute and a sacramental act of the Church - a final commendation of the soul to God's mercy.

Planning a Catholic funeral Mass involves coordinating with the parish priest, the church, the funeral director, and the family. This guide walks you through every step.

## Step 1: Contact the Parish Priest

The first step is to contact the parish priest of the deceased's home parish. In most cases, the funeral Mass will be celebrated at the parish church where the deceased was a member. If the family has a preference for a different church, this can usually be arranged with the agreement of both parishes.

Your funeral director can liaise with the parish priest on your behalf - handling the booking, the Mass booklet, and all coordination. At Willow Tree Funerals, Bruce Missen has extensive experience working with parish priests across St George, Sutherland Shire, and South West Sydney.

## Step 2: Choose the Readings and Music

A Catholic funeral Mass typically includes two Scripture readings and a Gospel reading. The parish priest will guide you in choosing appropriate readings, but the family is welcome to select passages that were meaningful to the deceased.

Common readings for Catholic funerals include:

- **John 14:1-6** - "Do not let your hearts be troubled..."
- **Romans 8:31-35, 37-39** - "Nothing can separate us from the love of God..."
- **Psalm 23** - "The Lord is my shepherd..."
- **1 Corinthians 15:51-57** - "Death is swallowed up in victory..."

For music, the church organist or choir can provide traditional Catholic hymns. Families may also wish to include a favourite secular song as a tribute - this is usually played before or after the Mass, not during the liturgy itself.

## Step 3: Plan the Order of Service

A typical Catholic funeral Mass follows this order:

- Reception of the body at the church door
- Opening rites and sprinkling with holy water
- Opening hymn
- Introductory rites and Kyrie
- First reading
- Responsorial Psalm
- Second reading
- Gospel acclamation and Gospel reading
- Homily by the priest
- General Intercessions (Prayers of the Faithful)
- Liturgy of the Eucharist
- Final Commendation and Farewell
- Recessional hymn

## Step 4: Prepare the Mass Booklet

A Mass booklet (also called an order of service or funeral booklet) is given to guests as they arrive. It typically includes:

- A photograph of the deceased
- The order of service
- The readings and responses
- The words to the hymns
- A brief biography or tribute

Your funeral director will prepare the Mass booklet for you. At Willow Tree Funerals, we design and print beautiful Mass booklets as part of our service.

## Step 5: Arrange the Burial or Cremation

Following the Mass, the body is typically taken to the cemetery for burial, or to the crematorium. In the Catholic tradition, burial has historically been preferred, though the Church now permits cremation provided it is not chosen for reasons contrary to Christian doctrine.

Your funeral director will coordinate the cemetery or crematorium booking, the graveside service (if applicable), and all transportation.

## Working with a Catholic Specialist Funeral Director

Choosing a funeral director with genuine experience in Catholic funerals makes a significant difference. At Willow Tree Funerals, Bruce Missen has deep roots in the Catholic community and has coordinated hundreds of Catholic funeral Masses across Sydney. He understands the liturgy, the protocols, and the importance of getting every detail right.

To discuss arranging a Catholic funeral Mass in Sydney, call us on [02 8776 1667](tel:+61287761667) - available 24 hours a day, 7 days a week.

## Frequently Asked Questions

### Can a non-Catholic have a Catholic funeral Mass?

In some circumstances, yes. The parish priest has discretion to celebrate a funeral Mass for a non-Catholic who was in a relationship with the Catholic community. Speak with the parish priest directly to discuss your situation.

### Does the deceased need to have been baptised Catholic?

Generally, yes - a Catholic funeral Mass is a sacrament of the Church and is normally reserved for baptised Catholics. However, a funeral liturgy outside of Mass can be celebrated for non-Catholics, and the parish priest can advise on the most appropriate form of service.

### How long does a Catholic funeral Mass take?

A typical Catholic funeral Mass lasts approximately 60 to 90 minutes, depending on the number of readings, the homily, and whether Communion is distributed.

### Can we have a eulogy at a Catholic funeral Mass?

Yes. A eulogy or tribute is typically given after Communion, before the Final Commendation. The parish priest will advise on the appropriate timing and length.`,
  },
  {
    slug: "understanding-funeral-costs-sydney",
    title: "Understanding Funeral Costs in Sydney 2026",
    metaTitle: "Understanding Funeral Costs in Sydney 2026 | Willow Tree Funerals",
    metaDescription:
      "A transparent breakdown of what funerals cost in Sydney in 2026 - including what's included, what's extra, and how to compare funeral directors without being misled.",
    canonicalUrl:
      "https://willowtreefunerals.com.au/blog/understanding-funeral-costs-sydney",
    publishDate: "February 2026",
    publishedAt: new Date("2026-02-01"),
    readTime: 7,
    heroImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-service_a28d78fe.png",
    tags: "Pricing,Sydney,Planning",
    excerpt:
      "A transparent breakdown of what funerals cost in Sydney in 2026 - including what's included, what's extra, and how to compare funeral directors without being misled.",
    author: "Bruce Missen",
    relatedSlugs: [
      "what-to-do-when-someone-passes-away-nsw",
      "how-to-plan-catholic-funeral-sydney",
      "macarthur-memorial-park-guide",
    ],
    content: `Funeral costs in Sydney can vary enormously - from under $3,000 for a simple direct cremation to over $20,000 for a full burial service with a premium casket. Understanding what drives these costs, and what to watch out for, can help families make informed decisions during a difficult time.

This guide provides a transparent breakdown of funeral costs in Sydney in 2026, based on our experience at Willow Tree Funerals.

## The Three Components of Funeral Costs

Funeral costs in Sydney are made up of three main components:

- **Funeral director's fees** - the professional services provided by the funeral home
- **Disbursements** - third-party costs paid on your behalf (cemetery, crematorium, death certificates, etc.)
- **Optional extras** - flowers, catering, death notices, memorial products, etc.

When comparing funeral directors, always ask for a full itemised quote that separates these three components. Beware of "all-inclusive" prices that bundle everything together - they can make it difficult to compare like for like.

## Direct Cremation: From $3,100

A direct cremation is the most affordable option. It involves the transfer of the deceased into the funeral director's care, preparation, and cremation - without a formal funeral service. The ashes are then returned to the family.

At Willow Tree Funerals, direct cremation starts from **$3,100**. The Sydney average for a direct cremation is $3,500-$5,000.

## Full Cremation Service: From $7,500

A full cremation service includes a formal funeral ceremony - at a church, chapel, or another venue - followed by cremation. This is the most common choice for families who want a meaningful farewell without the ongoing costs of a burial plot.

At Willow Tree Funerals, a full cremation service starts from **$7,500**. The Sydney average is $7,000-$10,000.

## Burial Service: From $9,500

A burial service includes a formal funeral ceremony followed by burial at a cemetery. The cost of the burial plot and interment fees are additional and vary significantly by cemetery - from around $4,000 at a general cemetery to over $15,000 at a premium lawn cemetery.

At Willow Tree Funerals, a burial service starts from **$9,500** (excluding cemetery fees). The Sydney average is $9,000-$15,000 (excluding cemetery fees).

## What's Included in a Funeral Director's Fee?

A reputable funeral director's fee should include:

- Transfer of the deceased into care (24/7)
- Preparation and presentation of the deceased
- Coordination of all arrangements
- The funeral ceremony (if applicable)
- Provision of a hearse
- The casket or urn (at the chosen level)
- The order of service / Mass booklet
- Death registration and paperwork

## Common Disbursements (Third-Party Costs)

Disbursements are costs paid by the funeral director on your behalf. They are not profit for the funeral home - they are passed through at cost. Common disbursements include:

- Crematorium fee: $800-$1,500
- Cemetery burial plot: $4,000-$15,000+
- Interment fee (opening and closing of grave): $1,500-$3,000
- Death certificates (per copy): $60-$80
- Newspaper death notice: $200-$600
- Church fee (if applicable): $300-$800

## How to Avoid Being Overcharged

The funeral industry is not always transparent about pricing. Here are some tips to protect your family:

- Always ask for a full itemised written quote before agreeing to anything
- Compare at least two or three funeral directors
- Ask specifically about disbursements - are they included in the quoted price?
- Be wary of upselling - you do not need the most expensive casket to honour your loved one
- Choose an independent funeral director, not a corporate chain

At Willow Tree Funerals, we publish our prices openly and provide full itemised quotes with no hidden fees. To get a quote, call us on [02 8776 1667](tel:+61287761667) or visit our [Pricing page](/pricing).

## Frequently Asked Questions

### Is there a government rebate for funeral costs?

Centrelink provides a Bereavement Payment to eligible recipients, but this is not specifically for funeral costs. Some superannuation funds offer a death benefit that can be used to cover funeral expenses. Speak with a financial adviser or your funeral director for guidance.

### Can I pay for a funeral in instalments?

Some funeral directors offer payment plans. At Willow Tree Funerals, we can discuss payment options with you. We also recommend speaking with your bank, as some offer funeral finance products.

### What is the cheapest legal funeral in NSW?

The most affordable legal option is a direct cremation, which starts from around $2,500-$3,500 with a budget provider. At Willow Tree Funerals, direct cremation starts from $3,100 and includes full professional care and service.

### Does the price include GST?

Yes. All funeral prices in Australia include GST. When comparing quotes, ensure you are comparing GST-inclusive prices.`,
  },
  {
    slug: "macarthur-memorial-park-guide",
    title: "Macarthur Memorial Park - Sydney's Newest Cemetery Guide",
    metaTitle:
      "Macarthur Memorial Park Campbelltown - Cemetery Guide | Willow Tree Funerals",
    metaDescription:
      "Everything families need to know about Macarthur Memorial Park in Campbelltown - location, burial options, pricing, and how to arrange a service there. Written by Bruce Missen.",
    canonicalUrl:
      "https://willowtreefunerals.com.au/blog/macarthur-memorial-park-guide",
    publishDate: "January 2026",
    publishedAt: new Date("2026-01-01"),
    readTime: 6,
    heroImage:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg",
    tags: "Cemeteries,Campbelltown,South West Sydney",
    excerpt:
      "Everything families need to know about Macarthur Memorial Park in Campbelltown - location, burial options, pricing, and how to arrange a funeral service there.",
    author: "Bruce Missen",
    relatedSlugs: [
      "what-to-do-when-someone-passes-away-nsw",
      "understanding-funeral-costs-sydney",
      "how-to-plan-catholic-funeral-sydney",
    ],
    content: `Macarthur Memorial Park is one of Sydney's newest and most beautifully designed cemeteries, located in the heart of the Macarthur region in South West Sydney. Since opening, it has become a popular choice for families across Campbelltown, Camden, Narellan, and surrounding areas.

This guide covers everything you need to know about Macarthur Memorial Park - from its location and burial options to pricing and how to arrange a funeral service there.

## Location

Macarthur Memorial Park is located at Campbelltown, NSW, in the Macarthur region of South West Sydney. It is easily accessible from the Hume Highway and is approximately 60 kilometres south-west of the Sydney CBD.

The park is conveniently located for families in Campbelltown, Camden, Narellan, Gregory Hills, Harrington Park, Mount Annan, and all surrounding Macarthur suburbs.

## About the Cemetery

Macarthur Memorial Park is a modern, beautifully landscaped memorial park offering a peaceful and dignified setting for burials and memorial services. The park features:

- Lawn burial sections
- Monumental burial sections
- Above-ground mausoleum options
- Cremation memorial options
- A non-denominational chapel for funeral services
- Beautifully maintained gardens and memorial areas

## Burial Options

Macarthur Memorial Park offers a range of burial options to suit different preferences and budgets:

- **Lawn burials** - simple, dignified burial in a well-maintained lawn section
- **Monumental burials** - burial with a headstone or monument
- **Above-ground mausoleum** - interment in a mausoleum crypt above ground
- **Cremation memorials** - placement of ashes in a dedicated memorial area

## Pricing

Burial plot prices at Macarthur Memorial Park vary depending on the section and type of burial. As a general guide:

- Lawn burial plots: from approximately $6,500-$10,000
- Monumental burial plots: from approximately $8,500-$14,000
- Mausoleum crypts: from approximately $12,000+
- Interment (opening and closing) fees: approximately $2,000-$3,000

These are indicative prices only. For current pricing, contact Macarthur Memorial Park directly or ask your funeral director to obtain a quote on your behalf.

## Arranging a Funeral at Macarthur Memorial Park

Your funeral director will handle all coordination with Macarthur Memorial Park on your behalf - including booking the burial plot, arranging the interment, and coordinating the graveside service.

At Willow Tree Funerals, we have extensive experience working with Macarthur Memorial Park and can guide your family through every step of the process. We serve families across the Macarthur region from our Macquarie Links office.

## Catholic Funerals at Macarthur Memorial Park

Macarthur Memorial Park welcomes Catholic funerals and has dedicated Catholic burial sections. The park works closely with local parishes and funeral directors to accommodate Catholic funeral rites, including graveside blessings and the Rite of Committal.

Our team at Willow Tree Funerals has coordinated many Catholic funerals at Macarthur Memorial Park and can liaise with the parish priest and the cemetery on your behalf.

To arrange a funeral at Macarthur Memorial Park or to discuss your options, call us on [02 8776 1667](tel:+61287761667) - available 24 hours a day, 7 days a week.

## Frequently Asked Questions

### Is Macarthur Memorial Park a Catholic cemetery?

Macarthur Memorial Park is a non-denominational cemetery that welcomes families of all faiths, including Catholic families. It has dedicated Catholic burial sections and works closely with local parishes.

### How do I purchase a burial plot at Macarthur Memorial Park?

Your funeral director can arrange the purchase of a burial plot on your behalf. Alternatively, you can contact Macarthur Memorial Park directly to purchase a pre-need plot.

### Can I visit the cemetery before making a decision?

Yes. Macarthur Memorial Park welcomes families to visit and tour the grounds. Contact them directly to arrange a visit, or ask your funeral director to accompany you.

### Does Willow Tree Funerals serve the Campbelltown area?

Yes. We serve families across the entire Macarthur region from our Macquarie Links office, including Campbelltown, Camden, Narellan, Gregory Hills, and all surrounding suburbs.`,
  },
];

export function getStaticArticle(slug: string): StaticArticle | undefined {
  return STATIC_ARTICLES.find((a) => a.slug === slug);
}

export function getStaticArticleByRelatedSlug(
  currentSlug: string,
  limit = 3
): StaticArticle[] {
  const current = STATIC_ARTICLES.find((a) => a.slug === currentSlug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => STATIC_ARTICLES.find((a) => a.slug === s))
    .filter(Boolean)
    .slice(0, limit) as StaticArticle[];
}
