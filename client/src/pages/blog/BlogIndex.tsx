/**
 * Blog Overview - Willow Tree Funerals
 * Premium layout: dark hero, animated counters, search, featured post,
 * tag filter, 3-col card grid, pagination, bottom CTA.
 *
 * Shows both static hand-written articles and AI-generated articles
 * from babylovegrowth.ai in a unified premium layout.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, ArrowRight, Search, ChevronLeft, ChevronRight,
  BookOpen, X, Filter, Star, Phone, Shield, Sparkles,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { COMPANY } from "../../../../shared/company";

const POSTS_PER_PAGE = 12;
const ALL_TAG = "All";

// ── Static hand-written articles (always shown, merged with DB posts) ─────────
const STATIC_ARTICLES = [
  {
    id: -1,
    slug: "what-to-do-when-someone-passes-away-nsw",
    title: "What to Do When Someone Passes Away in NSW",
    excerpt:
      "A step-by-step guide for families in New South Wales - from the moment of death through to the funeral service.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/person-phone_01a8551b.png",
    tags: "Practical Guidance",
    author: COMPANY.director,
    readingTime: 8,
    publishedAt: new Date("2026-04-01"),
    isStatic: true,
  },
  {
    id: -2,
    slug: "how-to-plan-catholic-funeral-sydney",
    title: "How to Plan a Catholic Funeral Mass in Sydney",
    excerpt:
      "Everything you need to know about arranging a Catholic funeral Mass in Sydney - from liaising with the parish priest to choosing readings, music, and the Mass booklet.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-interior-mass_upscaled_a84f50dd.jpg",
    tags: "Catholic Funerals",
    author: COMPANY.director,
    readingTime: 10,
    publishedAt: new Date("2026-03-01"),
    isStatic: true,
  },
  {
    id: -3,
    slug: "understanding-funeral-costs-sydney",
    title: "Understanding Funeral Costs in Sydney 2026",
    excerpt:
      "A transparent breakdown of what funerals cost in Sydney in 2026 - including what's included, what's extra, and how to compare funeral directors without being misled.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg",
    tags: "Pricing & Planning",
    author: COMPANY.director,
    readingTime: 7,
    publishedAt: new Date("2026-02-01"),
    isStatic: true,
  },
  {
    id: -4,
    slug: "macarthur-memorial-park-guide",
    title: "Macquarie Memorial Park - Sydney's Newest Cemetery Guide",
    excerpt:
      "Everything families need to know about Macquarie Memorial Park in Campbelltown - location, burial options, pricing, and how to arrange a service there.",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg",
    tags: "Cemeteries & Venues",
    author: COMPANY.director,
    readingTime: 6,
    publishedAt: new Date("2026-01-01"),
    isStatic: true,
  },
];

// ── Utility ───────────────────────────────────────────────────────────────────
function parseTags(tagsStr: string | null | undefined): string[] {
  return tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

function formatDate(d: Date | string | null | undefined) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── AnimatedCounter ───────────────────────────────────────────────────────────
function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 1200;
          const step = Math.max(1, Math.floor(end / (duration / 16)));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-white">{count}+</div>
      <div className="text-xs text-white/50 mt-1">{label}</div>
    </div>
  );
}

// ── Unified article type ──────────────────────────────────────────────────────
type UnifiedPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  tags: string;
  author: string;
  readingTime: number | null;
  publishedAt: Date | string | null;
  isStatic?: boolean;
};

// ── BlogCard ──────────────────────────────────────────────────────────────────
function BlogCard({
  post,
  index,
  onTagClick,
}: {
  post: UnifiedPost;
  index: number;
  onTagClick: (tag: string) => void;
}) {
  const href = `/blog/${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-brand-royal/20 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <Link href={href} className="block">
        {post.imageUrl ? (
          <div className="h-52 overflow-hidden shrink-0 relative">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {post.readingTime && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Clock size={10} /> {post.readingTime} min read
              </div>
            )}
          </div>
        ) : (
          <div className="h-52 bg-gradient-to-br from-brand-navy via-brand-royal to-blue-400 flex items-center justify-center shrink-0">
            <BookOpen size={40} className="text-white/20" />
          </div>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {parseTags(post.tags)
            .slice(0, 2)
            .map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  onTagClick(tag);
                }}
                className="text-[10px] font-semibold uppercase tracking-wider bg-brand-royal/8 text-brand-royal px-2.5 py-1 rounded-full hover:bg-brand-royal/15 transition-colors"
              >
                {tag}
              </button>
            ))}
        </div>
        <Link href={href} className="block flex-1">
          <h2 className="font-bold text-brand-navy text-base mb-2 leading-snug group-hover:text-brand-royal transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        </Link>
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 shrink-0">
              <img
                src={COMPANY.assets.bruceHeadshot}
                alt={COMPANY.director}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {formatDate(post.publishedAt)}
            </span>
          </div>
          <Link
            href={href}
            className="flex items-center gap-1 text-brand-royal font-semibold hover:gap-2 transition-all text-xs"
          >
            Read <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ── FeaturedPostCard ──────────────────────────────────────────────────────────
function FeaturedPostCard({ post }: { post: UnifiedPost }) {
  const href = `/blog/${post.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Link href={href}>
        <div className="group grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-royal/30 hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white">
          {post.imageUrl ? (
            <div className="lg:col-span-2 h-64 lg:h-auto overflow-hidden relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-brand-royal text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Sparkles size={10} /> Featured
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 h-64 lg:h-auto bg-gradient-to-br from-brand-navy to-brand-royal flex items-center justify-center relative">
              <BookOpen size={60} className="text-white/20" />
              <div className="absolute top-4 left-4 bg-brand-royal text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Sparkles size={10} /> Featured
              </div>
            </div>
          )}
          <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {parseTags(post.tags)
                .slice(0, 3)
                .map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold uppercase tracking-wider bg-brand-royal/10 text-brand-royal px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <h2 className="font-bold text-brand-navy text-2xl lg:text-3xl mb-3 leading-tight group-hover:text-brand-royal transition-colors font-serif">
              {post.title}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-sm lg:text-base line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-brand-royal/20">
                  <img
                    src={COMPANY.assets.bruceHeadshot}
                    alt={COMPANY.director}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-navy">
                    {post.author || COMPANY.director}
                  </p>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Calendar size={9} /> {formatDate(post.publishedAt)}
                    {post.readingTime && (
                      <>
                        {" "}
                        &middot; <Clock size={9} /> {post.readingTime} min read
                      </>
                    )}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-brand-royal font-semibold text-sm group-hover:gap-3 transition-all">
                Read Article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogIndex() {
  const [page, setPage] = useState(1);
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data: dbData } = trpc.blog.getAll.useQuery({
    page: 1,
    limit: 100,
    tag: undefined,
    search: undefined,
  });

  const { data: allDbTags = [] } = trpc.blog.getAllTags.useQuery();

  // Merge static + DB posts
  const allPosts: UnifiedPost[] = [
    ...STATIC_ARTICLES,
    ...(dbData?.posts ?? []).map((p) => ({
      ...p,
      href: undefined,
    })),
  ].sort((a, b) => {
    // Sort newest first by publishedAt
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // Filter
  let filtered = allPosts;
  if (activeTag !== ALL_TAG) {
    filtered = filtered.filter((p) =>
      parseTags(p.tags).includes(activeTag)
    );
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const offset = (page - 1) * POSTS_PER_PAGE;
  const pagePosts = filtered.slice(offset, offset + POSTS_PER_PAGE);

  // All tags: static + DB
  const staticTags = Array.from(
    new Set(STATIC_ARTICLES.flatMap((a) => parseTags(a.tags)))
  );
  const allTags = Array.from(new Set([...staticTags, ...allDbTags])).sort();

  const handleTagChange = useCallback((tag: string) => {
    setActiveTag(tag);
    setPage(1);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const showFeatured = page === 1 && !search && activeTag === ALL_TAG && pagePosts.length > 0;
  const featuredPost = showFeatured ? pagePosts[0] : null;
  const gridPosts = showFeatured ? pagePosts.slice(1) : pagePosts;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${COMPANY.name} - Funeral Guidance Blog`,
    description:
      "Compassionate guides on funeral planning, Catholic services, costs, and grief support in Sydney.",
    url: "https://willowtreefunerals.com.au/blog",
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      url: "https://willowtreefunerals.com.au",
      logo: COMPANY.assets.logoDark,
    },
  };

  return (
    <>
      <SEOHead
        title={`Funeral Guidance Blog - ${COMPANY.name}`}
        description="Compassionate guides on Catholic funerals, cremation, burial costs, grief support, and pre-arrangement in Sydney, St George, Sutherland Shire and South West Sydney."
        canonical="https://willowtreefunerals.com.au/blog"
        schema={schema}
      />
      <div className="min-h-screen bg-[#FAF8F2]">
        <Nav />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-brand-navy text-white py-20 lg:py-24 px-4 relative overflow-hidden pt-36">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-royal/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-brand-gold mb-4 flex items-center gap-2">
                <BookOpen size={14} /> Funeral Guidance
              </p>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight font-serif">
                    Guidance &amp; Resources
                  </h1>
                  <p className="text-white/60 max-w-xl leading-relaxed text-sm">
                    Compassionate articles on Catholic funerals, cremation, burial, costs,
                    grief support, and planning ahead - written by Bruce Missen, funeral
                    director with over 15 years of experience.
                  </p>
                </div>
                <div className="flex gap-8 shrink-0">
                  <AnimatedCounter value={50} label="Articles" />
                  <div className="w-px bg-white/10" />
                  <AnimatedCounter value={12} label="Topics" />
                  <div className="w-px bg-white/10" />
                  <AnimatedCounter value={15} label="Years Experience" />
                </div>
              </div>
            </motion.div>

            {/* Search */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSearch}
              className="mt-10 relative max-w-2xl"
            >
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-32 py-4 text-sm bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all backdrop-blur-sm"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-28 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-royal text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-brand-gold transition-colors"
              >
                Search
              </button>
            </motion.form>
          </div>
        </section>

        {/* ── Content ──────────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 py-14">

          {/* Featured Post */}
          {featuredPost && <FeaturedPostCard post={featuredPost} />}

          {/* Tag Filter */}
          <div className="flex flex-col gap-5 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-gray-500">
                {search ? (
                  <>
                    <span className="font-medium text-brand-navy">{total}</span> results
                    for &ldquo;{search}&rdquo;
                    <button
                      onClick={clearSearch}
                      className="ml-2 text-brand-royal underline text-xs"
                    >
                      Clear
                    </button>
                  </>
                ) : (
                  <>
                    <span className="font-medium text-brand-navy">{total}</span> articles
                    {activeTag !== ALL_TAG && (
                      <> in <span className="font-medium">{activeTag}</span></>
                    )}
                  </>
                )}
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-full"
              >
                <Filter size={14} /> Filter by topic
              </button>
            </div>
            <div
              className={`flex-wrap gap-2 ${showFilters ? "flex" : "hidden sm:flex"}`}
            >
              {[ALL_TAG, ...allTags].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeTag === tag
                      ? "bg-brand-royal text-white shadow-md shadow-blue-200/50 scale-105"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {activeTag !== ALL_TAG && (
                <button
                  onClick={() => handleTagChange(ALL_TAG)}
                  className="text-xs px-4 py-2 rounded-full font-medium text-brand-royal border border-brand-royal/30 hover:bg-brand-royal/5 transition-all"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {/* Card Grid */}
          {gridPosts.length === 0 && !featuredPost ? (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-medium">No articles found</p>
              <p className="text-gray-400 text-sm mt-1">
                {search
                  ? "Try a different search term"
                  : "Check back soon for new articles"}
              </p>
              {(search || activeTag !== ALL_TAG) && (
                <button
                  onClick={() => {
                    clearSearch();
                    handleTagChange(ALL_TAG);
                  }}
                  className="mt-4 text-brand-royal text-sm underline"
                >
                  View all articles
                </button>
              )}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPosts.map((post, i) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={i}
                    onTagClick={handleTagChange}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-full border border-gray-200 text-gray-500 hover:border-brand-royal hover:text-brand-royal disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, idx) =>
                  pageNum === "..." ? (
                    <span key={`ellipsis-${idx}`} className="w-10 text-center text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum as number)}
                      className={`w-10 h-10 text-sm font-medium rounded-full transition-all duration-200 ${
                        pageNum === page
                          ? "bg-brand-royal text-white shadow-md shadow-blue-200/50"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-full border border-gray-200 text-gray-500 hover:border-brand-royal hover:text-brand-royal disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-brand-navy to-blue-900 text-white py-16 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-royal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Shield size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3 font-serif">
              Need Immediate Assistance?
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Bruce Missen is available 24 hours a day, 7 days a week. Call now
              to speak directly with our Family Care Specialist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center justify-center gap-2 bg-white text-brand-navy font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <Phone size={16} /> {COMPANY.phone}
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 border border-white/30 text-white font-semibold py-4 px-8 rounded-full hover:bg-white/10 transition-all"
              >
                Send an Enquiry <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-1 mt-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  style={{ fill: "#FBBC04", color: "#FBBC04" }}
                />
              ))}
              <span className="text-white/60 text-xs ml-2">
                5.0 from 47+ Google Reviews
              </span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
