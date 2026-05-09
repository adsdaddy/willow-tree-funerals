import BlogArticleTemplate from "@/components/BlogArticleTemplate";
import { COMPANY } from "../../../../shared/company";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/person-phone_01a8551b.png";

const relatedArticles = [
  { title: "How to Plan a Catholic Funeral Mass in Sydney", href: "/blog/how-to-plan-catholic-funeral-sydney", date: "March 2026" },
  { title: "Understanding Funeral Costs in Sydney 2026", href: "/blog/understanding-funeral-costs-sydney", date: "February 2026" },
  { title: "Macquarie Memorial Park — Sydney's Newest Cemetery Guide", href: "/blog/macarthur-memorial-park-guide", date: "January 2026" },
];

export default function WhatToDoWhenSomeonePasses() {
  return (
    <BlogArticleTemplate
      title="What to Do When Someone Passes Away in NSW"
      metaTitle="What to Do When Someone Passes Away in NSW | Willow Tree Funerals"
      metaDescription="A step-by-step guide for families in NSW — from the moment of death through to the funeral service. Written by Bruce Missen, funeral director at Willow Tree Funerals."
      canonicalUrl="https://willowtreefunerals.com.au/blog/what-to-do-when-someone-passes-away-nsw"
      publishDate="April 2026"
      readTime="8 min"
      heroImage={HERO_IMG}
      relatedArticles={relatedArticles}
    >
      <p>
        When a loved one passes away, it can be difficult to know what to do next. The grief is overwhelming, and the practical steps can feel impossible. This guide walks you through exactly what happens — and what you need to do — in the hours and days following a death in New South Wales.
      </p>

      <p>
        The most important thing to know is this: <strong>you do not have to face this alone</strong>. A good funeral director will guide you through every step, handle the paperwork, and take care of all the practical arrangements so you can focus on your family.
      </p>

      <h2>Step 1: Call a Doctor or Medical Professional</h2>
      <p>
        When someone passes away, the first step is to have a doctor certify the death. If the death occurs at home and was expected (for example, following a terminal illness), call the person's GP or the palliative care team. If the death was sudden or unexpected, call 000 immediately.
      </p>
      <p>
        In NSW, a doctor must certify the cause of death before the body can be moved. This is a legal requirement. The doctor will issue a Medical Certificate of Cause of Death (MCCD), which is needed to register the death.
      </p>

      <h2>Step 2: Call a Funeral Director</h2>
      <p>
        Once the death has been certified, call a funeral director. You do not need to have everything decided — a good funeral director will guide you through the process step by step. At Willow Tree Funerals, we are available 24 hours a day, 7 days a week. When you call, you speak directly with one of our friendly Family Care Specialists.
      </p>
      <p>
        The funeral director will arrange the transfer of your loved one into their care. This can happen at home, at hospital, at a nursing home, or wherever your loved one has passed. There is no need to rush — take the time you need to say goodbye.
      </p>

      <blockquote>
        <p>"When you call us, we answer. Day or night, weekends and public holidays — our Family Care Specialists are always available. You will never speak to a call centre."</p>
        <cite>— Bruce Missen, Managing Director, Willow Tree Funerals</cite>
      </blockquote>

      <h2>Step 3: Register the Death</h2>
      <p>
        In NSW, all deaths must be registered with the NSW Registry of Births, Deaths and Marriages within 7 days. Your funeral director will handle this on your behalf. You will need to provide some basic information about the deceased, including their full name, date of birth, and address.
      </p>
      <p>
        Once the death is registered, you can obtain a Death Certificate. You will need multiple certified copies — for banks, superannuation, insurance, and other legal matters. Your funeral director can advise you on how many copies to order.
      </p>

      <h2>Step 4: Notify Family and Friends</h2>
      <p>
        There is no right or wrong way to notify people of a death. Some families prefer to make phone calls; others send a message or email. Your funeral director can help you draft a death notice for publication in newspapers or online if you wish.
      </p>

      <h2>Step 5: Plan the Funeral Service</h2>
      <p>
        Your funeral director will meet with you — at home, at their office, or wherever is most comfortable — to discuss the funeral arrangements. This includes:
      </p>
      <ul>
        <li>The type of service (burial or cremation)</li>
        <li>The venue (church, chapel, graveside, or another location)</li>
        <li>The date and time of the service</li>
        <li>Music, readings, and tributes</li>
        <li>The casket or urn</li>
        <li>Flowers and other tributes</li>
        <li>The funeral notice and order of service</li>
      </ul>
      <p>
        At Willow Tree Funerals, we handle all of this for you — including liaising with the church, the cemetery or crematorium, and any other service providers. You only need to focus on your family.
      </p>

      <h2>Step 6: Attend to Legal and Financial Matters</h2>
      <p>
        After the funeral, there are a number of legal and financial matters to attend to. These include:
      </p>
      <ul>
        <li>Notifying Centrelink or the Department of Veterans' Affairs</li>
        <li>Notifying the Australian Taxation Office</li>
        <li>Contacting banks and financial institutions</li>
        <li>Applying for probate if there is a will</li>
        <li>Cancelling subscriptions, memberships, and accounts</li>
      </ul>
      <p>
        Your funeral director can provide guidance on these matters, and many families choose to engage a solicitor or estate administrator to help.
      </p>

      <h2>Who to Call First in NSW</h2>
      <p>
        If you are unsure who to call, start with your funeral director. At Willow Tree Funerals, we can guide you through every step — from the moment of death through to the final farewell. Call us any time on <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>.
      </p>
    </BlogArticleTemplate>
  );
}
