/**
 * BlogArticleTemplate — Reusable template for SEO blog articles.
 * Includes: hero, article content, sidebar CTA, related articles, JSON-LD schema.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { Phone, ArrowRight, Clock, Calendar } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import SEOHead from "./SEOHead";
import { COMPANY } from "../../../shared/company";

export interface RelatedArticle {
  title: string;
  href: string;
  date: string;
}

export interface BlogArticleProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  publishDate: string;
  readTime: string;
  heroImage: string;
  children: React.ReactNode;
  relatedArticles?: RelatedArticle[];
}

export default function BlogArticleTemplate({
  title,
  metaTitle,
  metaDescription,
  canonicalUrl,
  publishDate,
  readTime,
  heroImage,
  children,
  relatedArticles = [],
}: BlogArticleProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: metaDescription,
    image: heroImage,
    datePublished: publishDate,
    author: { "@type": "Person", name: "Bruce Missen", jobTitle: "Managing Director & Funeral Director" },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      url: "https://willowtreefunerals.com.au",
    },
  };

  useEffect(() => {
    const id = "blog-article-schema";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      (el as HTMLScriptElement).type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { document.getElementById(id)?.remove(); };
  }, [title]);

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative py-32 pt-40 bg-brand-navy overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-brand-navy/85" />
        <div className="relative z-10 container max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold tracking-widest uppercase mb-6 hover:text-white transition-colors">
            ← Back to Resources
          </Link>
          <h1
            className="font-serif text-white font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-xs">
            <span className="flex items-center gap-1.5"><Calendar size={12} /> {publishDate}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} /> {readTime} read</span>
            <span>By Bruce Missen, Funeral Director</span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-20 bg-brand-ivory">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article */}
            <article className="lg:col-span-2 prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-brand-navy
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-brand-navy/70 prose-p:leading-relaxed prose-p:mb-5
              prose-li:text-brand-navy/70 prose-li:leading-relaxed
              prose-strong:text-brand-navy prose-strong:font-semibold
              prose-a:text-brand-royal prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-brand-royal prose-blockquote:bg-brand-light-blue/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            ">
              {children}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* CTA card */}
              <div className="bg-brand-navy rounded-2xl p-7 mb-6 sticky top-28">
                <p className="section-label text-brand-gold mb-3">Need Help Now?</p>
                <h3 className="font-serif text-white font-semibold text-xl mb-3 leading-snug">
                  Speak Directly with one of our Family Care Specialists
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Available 24 hours a day, 7 days a week. Call our Family Care Specialists for immediate, compassionate support.
                </p>
                <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2 w-full mb-3">
                  <Phone size={14} /> {COMPANY.phone}
                </a>
                <Link href="/contact" className="flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                  Send an Enquiry <ArrowRight size={12} />
                </Link>
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-brand-light-blue/60">
                  <p className="section-label mb-4">Related Articles</p>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <Link key={article.href} href={article.href} className="block group">
                        <p className="text-brand-navy text-sm font-semibold group-hover:text-brand-royal transition-colors leading-snug mb-1">
                          {article.title}
                        </p>
                        <p className="text-brand-navy/70 text-xs">{article.date}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
