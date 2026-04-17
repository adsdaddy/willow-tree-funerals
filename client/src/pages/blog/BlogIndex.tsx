/**
 * WILLOW TREE FUNERALS — Blog / Resources Index
 * SEO: "funeral advice sydney", "what to do when someone dies nsw"
 */

import { Link } from "wouter";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { COMPANY } from "../../../../shared/company";

const articles = [
  {
    slug: "/blog/what-to-do-when-someone-passes-away-nsw",
    title: "What to Do When Someone Passes Away in NSW",
    excerpt: "A step-by-step guide for families in New South Wales — from the moment of death through to the funeral service. Written by Bruce Missen, funeral director.",
    date: "April 2026",
    readTime: "8 min",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/person-phone_01a8551b.png",
    category: "Practical Guidance",
  },
  {
    slug: "/blog/how-to-plan-catholic-funeral-sydney",
    title: "How to Plan a Catholic Funeral Mass in Sydney",
    excerpt: "Everything you need to know about arranging a Catholic funeral Mass in Sydney — from liaising with the parish priest to choosing readings, music, and the Mass booklet.",
    date: "March 2026",
    readTime: "10 min",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-interior-mass_upscaled_a84f50dd.jpg",
    category: "Catholic Funerals",
  },
  {
    slug: "/blog/understanding-funeral-costs-sydney",
    title: "Understanding Funeral Costs in Sydney 2026",
    excerpt: "A transparent breakdown of what funerals cost in Sydney in 2026 — including what's included, what's extra, and how to compare funeral directors without being misled.",
    date: "February 2026",
    readTime: "7 min",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-podium_d5ec753d.png",
    category: "Pricing & Planning",
  },
  {
    slug: "/blog/macarthur-memorial-park-guide",
    title: "Macquarie Memorial Park — Sydney's Newest Cemetery Guide",
    excerpt: "Everything families need to know about Macquarie Memorial Park in Campbelltown — location, burial options, pricing, and how to arrange a service there.",
    date: "January 2026",
    readTime: "6 min",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg",
    category: "Cemeteries & Venues",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${COMPANY.name} — Resources & Guidance`,
  url: "https://www.willowtreefunerals.com.au/blog",
  description: "Practical guidance and advice for families navigating funeral arrangements in Sydney and NSW.",
  publisher: {
    "@type": "Organization",
    name: COMPANY.name,
    url: "https://www.willowtreefunerals.com.au",
  },
};

export default function BlogIndex() {
  return (
    <>
      <SEOHead
        title="Funeral Resources & Guidance | Willow Tree Funerals Sydney"
        description="Practical guidance for families navigating funeral arrangements in Sydney and NSW. Articles on Catholic funerals, funeral costs, what to do when someone passes, and more."
        canonical="https://www.willowtreefunerals.com.au/blog"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section className="bg-brand-navy py-28 pt-36">
        <div className="container max-w-3xl">
          <p className="section-label text-brand-gold mb-3">Resources & Guidance</p>
          <h1 className="font-serif text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.025em" }}>
            Helpful Guidance for Families
          </h1>
          <p className="text-white/65 text-lg leading-relaxed">
            Practical articles written by Bruce Missen to help families navigate funeral arrangements in Sydney and NSW with clarity and confidence.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-24 bg-brand-ivory">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} href={article.slug}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-brand-light-blue/60 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-brand-royal/90 text-white text-[0.6rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-4 text-brand-navy/40 text-xs mb-3">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {article.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime} read</span>
                    </div>
                    <h2 className="font-serif text-brand-navy font-semibold text-xl mb-3 leading-snug group-hover:text-brand-royal transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-brand-navy/60 text-sm leading-relaxed mb-5">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-brand-royal text-xs font-semibold tracking-wide uppercase group-hover:gap-2.5 transition-all">
                      Read Article <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
