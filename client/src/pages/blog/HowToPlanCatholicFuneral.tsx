import BlogArticleTemplate from "@/components/BlogArticleTemplate";
import { COMPANY } from "../../../../shared/company";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-interior-mass_upscaled_a84f50dd.jpg";

const relatedArticles = [
  { title: "What to Do When Someone Passes Away in NSW", href: "/blog/what-to-do-when-someone-passes-away-nsw", date: "April 2026" },
  { title: "Understanding Funeral Costs in Sydney 2026", href: "/blog/understanding-funeral-costs-sydney", date: "February 2026" },
  { title: "Macquarie Memorial Park  -  Sydney's Newest Cemetery Guide", href: "/blog/macarthur-memorial-park-guide", date: "January 2026" },
];

export default function HowToPlanCatholicFuneral() {
  return (
    <BlogArticleTemplate
      title="How to Plan a Catholic Funeral Mass in Sydney"
      metaTitle="How to Plan a Catholic Funeral Mass in Sydney | Willow Tree Funerals"
      metaDescription="Everything you need to know about arranging a Catholic funeral Mass in Sydney  -  from liaising with the parish priest to choosing readings, music, and the Mass booklet. Written by Bruce Missen."
      canonicalUrl="https://willowtreefunerals.com.au/blog/how-to-plan-catholic-funeral-sydney"
      publishDate="March 2026"
      readTime="10 min"
      heroImage={HERO_IMG}
      relatedArticles={relatedArticles}
    >
      <p>
        A Catholic funeral Mass is one of the most sacred and meaningful ways to farewell a loved one. For Catholic families in Sydney, it is both a deeply personal tribute and a sacramental act of the Church  -  a final commendation of the soul to God's mercy.
      </p>
      <p>
        Planning a Catholic funeral Mass involves coordinating with the parish priest, the church, the funeral director, and the family. This guide walks you through every step.
      </p>

      <h2>Step 1: Contact the Parish Priest</h2>
      <p>
        The first step is to contact the parish priest of the deceased's home parish. In most cases, the funeral Mass will be celebrated at the parish church where the deceased was a member. If the family has a preference for a different church, this can usually be arranged with the agreement of both parishes.
      </p>
      <p>
        Your funeral director can liaise with the parish priest on your behalf  -  handling the booking, the Mass booklet, and all coordination. At Willow Tree Funerals, Bruce Missen has extensive experience working with parish priests across St George, Sutherland Shire, and South West Sydney.
      </p>

      <h2>Step 2: Choose the Readings and Music</h2>
      <p>
        A Catholic funeral Mass typically includes two Scripture readings and a Gospel reading. The parish priest will guide you in choosing appropriate readings, but the family is welcome to select passages that were meaningful to the deceased.
      </p>
      <p>
        Common readings for Catholic funerals include:
      </p>
      <ul>
        <li><strong>John 14:1-6</strong>  -  "Do not let your hearts be troubled..."</li>
        <li><strong>Romans 8:31-35, 37-39</strong>  -  "Nothing can separate us from the love of God..."</li>
        <li><strong>Psalm 23</strong>  -  "The Lord is my shepherd..."</li>
        <li><strong>1 Corinthians 15:51-57</strong>  -  "Death is swallowed up in victory..."</li>
      </ul>
      <p>
        For music, the church organist or choir can provide traditional Catholic hymns. Families may also wish to include a favourite secular song as a tribute  -  this is usually played before or after the Mass, not during the liturgy itself.
      </p>

      <h2>Step 3: Plan the Order of Service</h2>
      <p>
        A typical Catholic funeral Mass follows this order:
      </p>
      <ul>
        <li>Reception of the body at the church door</li>
        <li>Opening rites and sprinkling with holy water</li>
        <li>Opening hymn</li>
        <li>Introductory rites and Kyrie</li>
        <li>First reading</li>
        <li>Responsorial Psalm</li>
        <li>Second reading</li>
        <li>Gospel acclamation and Gospel reading</li>
        <li>Homily by the priest</li>
        <li>General Intercessions (Prayers of the Faithful)</li>
        <li>Liturgy of the Eucharist</li>
        <li>Final Commendation and Farewell</li>
        <li>Recessional hymn</li>
      </ul>

      <h2>Step 4: Prepare the Mass Booklet</h2>
      <p>
        A Mass booklet (also called an order of service or funeral booklet) is given to guests as they arrive. It typically includes:
      </p>
      <ul>
        <li>A photograph of the deceased</li>
        <li>The order of service</li>
        <li>The readings and responses</li>
        <li>The words to the hymns</li>
        <li>A brief biography or tribute</li>
      </ul>
      <p>
        Your funeral director will prepare the Mass booklet for you. At Willow Tree Funerals, we design and print beautiful Mass booklets as part of our service.
      </p>

      <h2>Step 5: Arrange the Burial or Cremation</h2>
      <p>
        Following the Mass, the body is typically taken to the cemetery for burial, or to the crematorium. In the Catholic tradition, burial has historically been preferred, though the Church now permits cremation provided it is not chosen for reasons contrary to Christian doctrine.
      </p>
      <p>
        Your funeral director will coordinate the cemetery or crematorium booking, the graveside service (if applicable), and all transportation.
      </p>

      <h2>Working with a Catholic Specialist Funeral Director</h2>
      <p>
        Choosing a funeral director with genuine experience in Catholic funerals makes a significant difference. At Willow Tree Funerals, Bruce Missen has deep roots in the Catholic community and has coordinated hundreds of Catholic funeral Masses across Sydney. He understands the liturgy, the protocols, and the importance of getting every detail right.
      </p>
      <p>
        To discuss arranging a Catholic funeral Mass in Sydney, call us on <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>  -  available 24 hours a day, 7 days a week.
      </p>
    </BlogArticleTemplate>
  );
}
