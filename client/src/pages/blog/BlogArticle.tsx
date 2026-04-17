/**
 * WILLOW TREE FUNERALS — Dynamic Blog Article Page
 * Loads AI-generated articles from the database (populated by babylovegrowth.ai webhook)
 * Route: /blog/article/:slug
 */

import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Phone } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { COMPANY } from "../../../../shared/company";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-brand-ivory flex items-center justify-center pt-24">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-brand-royal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-brand-navy/50 text-sm">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-brand-ivory flex items-center justify-center pt-24">
          <div className="text-center max-w-md mx-auto px-6">
            <p className="font-serif text-brand-navy text-2xl font-semibold mb-4">Article Not Found</p>
            <p className="text-brand-navy/60 text-sm mb-8">
              This article may have been moved or is no longer available.
            </p>
            <Link href="/blog" className="btn-royal inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold">
              <ArrowLeft size={14} /> Back to Resources
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const tags = post.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <>
      <SEOHead
        title={`${post.title} | Willow Tree Funerals`}
        description={post.excerpt}
        canonical={`https://www.willowtreefunerals.com.au/blog/article/${post.slug}`}
        ogImage={post.imageUrl ?? undefined}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 bg-brand-navy overflow-hidden"
        style={
          post.imageUrl
            ? { backgroundImage: `url(${post.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
            : {}
        }
      >
        {post.imageUrl && <div className="absolute inset-0 bg-brand-navy/80" />}
        <div className="relative z-10 container max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Resources
          </Link>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag) => (
                <span key={tag} className="bg-brand-royal/80 text-white text-[0.6rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-serif text-white font-bold leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/50 text-sm">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {publishDate}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readingTime} min read</span>
            <span className="text-white/40">By {post.author || COMPANY.name}</span>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-20 bg-brand-ivory">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-brand-light-blue/40">
            <p className="text-brand-navy/70 text-base leading-relaxed mb-8 font-medium border-l-4 border-brand-royal pl-5 italic">
              {post.excerpt}
            </p>
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-navy prose-p:text-brand-navy/70 prose-a:text-brand-royal prose-strong:text-brand-navy">
              <Streamdown>{post.content.replace(/<!--\s*jsonld:[^>]*-->/g, "")}</Streamdown>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-brand-navy rounded-2xl p-8 md:p-10 text-center">
            <p className="section-label text-brand-gold mb-3">Need Help?</p>
            <h2 className="font-serif text-white font-bold text-2xl mb-4 leading-tight">
              Our Family Care Specialists Are Here for You
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
              If you have questions about funeral arrangements or would like to speak with one of our team, we are available 24 hours a day, 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={COMPANY.phoneHref} className="btn-royal inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold">
                <Phone size={14} /> {COMPANY.phone}
              </a>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold">
                Send an Enquiry
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-royal text-sm font-semibold hover:gap-3 transition-all">
              <ArrowLeft size={13} /> Back to All Resources
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
