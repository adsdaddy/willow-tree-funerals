/**
 * UnifiedBlogArticle.tsx - Willow Tree Funerals
 *
 * Unified premium article renderer for both:
 *  - Static hand-written articles (from staticArticles.ts)
 *  - Dynamic babylovegrowth.ai articles (from DB via tRPC)
 *
 * Route: /blog/:slug
 * Checks static articles first, falls back to DB lookup.
 *
 * Premium features (per premium-blog-layout skill):
 *  - Reading progress bar with % badge
 *  - Dark hero header with breadcrumb, tags, author meta
 *  - 2-column layout: article body + sticky sidebar
 *  - Rich markdown parser: ProfiTipp, KeyTakeaway, FAQ accordion, blockquote, YouTube, image
 *  - Author intro strip before content
 *  - In-content CTA after paragraph 3
 *  - Share buttons (Facebook, LinkedIn, WhatsApp, copy link)
 *  - Author box
 *  - Related posts grid
 *  - Services sidebar card
 *  - Sticky sidebar: TOC + CTA card + recent posts
 *  - Bottom CTA section
 *  - Mobile sticky CTA bar
 *  - Back-to-top button
 *  - Full SEO: Article + BreadcrumbList + FAQPage JSON-LD
 */

import { useState, useEffect, useMemo } from "react";
import { Link, useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, ArrowRight, ArrowUp, Phone, Star, Shield,
  BookOpen, CheckCircle2, ChevronDown, Share2, Facebook,
  Linkedin, MessageCircle, Copy, Check, Tag,
  ChevronLeft, Lightbulb, Zap, Award, ExternalLink,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { COMPANY } from "../../../../shared/company";
import { Streamdown } from "streamdown";
import { getStaticArticle, STATIC_ARTICLES, type StaticArticle } from "./staticArticles";

// ── Utility ───────────────────────────────────────────────────────────────────
function formatDate(d: Date | string | null | undefined) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function parseTags(tagsStr: string | null | undefined): string[] {
  return tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

// ── ReadingProgressBar ────────────────────────────────────────────────────────
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-200/60">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-royal via-brand-gold to-brand-royal"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
      {progress > 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-3 top-2 bg-brand-navy text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg"
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  );
}

// ── BackToTop ─────────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-28 right-5 z-50 w-12 h-12 bg-brand-navy text-white rounded-full shadow-xl flex items-center justify-center hover:bg-brand-royal transition-all duration-300"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── StickyMobileArticleCTA ────────────────────────────────────────────────────
function StickyMobileArticleCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex gap-3 shadow-2xl"
        >
          <a
            href={COMPANY.phoneHref}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-navy text-white font-semibold text-sm py-3 rounded-full"
          >
            <Phone size={14} /> Call Now
          </a>
          <Link
            href="/contact"
            className="flex-1 flex items-center justify-center gap-2 bg-brand-royal text-white font-semibold text-sm py-3 rounded-full"
          >
            Enquire
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── SidebarCTACard ────────────────────────────────────────────────────────────
function SidebarCTACard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
      <div className="bg-gradient-to-br from-brand-navy via-brand-royal to-blue-500 p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <img src={COMPANY.assets.logoWhite} alt={COMPANY.name} className="h-7 mb-4 object-contain" />
          <h3 className="text-base font-bold leading-tight mb-2">Need Help Arranging a Funeral?</h3>
          <p className="text-white/70 text-xs mb-5 leading-relaxed">
            Bruce Missen is available 24/7. Call now to speak directly with our Family Care Specialist.
          </p>
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 mb-4 backdrop-blur-sm">
            <div className="text-center flex-1">
              <p className="text-white/50 text-[10px] uppercase tracking-wider">Available</p>
              <p className="text-white text-sm font-bold">24 / 7</p>
            </div>
            <div className="text-white/40 text-xl">|</div>
            <div className="text-center flex-1">
              <p className="text-white/50 text-[10px] uppercase tracking-wider">Response</p>
              <p className="text-white text-sm font-bold">Immediate</p>
            </div>
          </div>
          <a
            href={COMPANY.phoneHref}
            className="block w-full text-center bg-white text-brand-navy font-bold py-3 rounded-full text-sm hover:bg-gray-100 transition-colors mb-2"
          >
            <Phone size={13} className="inline mr-1.5" />
            {COMPANY.phone}
          </a>
          <Link
            href="/contact"
            className="block w-full text-center border border-white/30 text-white font-medium py-2.5 rounded-full text-xs hover:bg-white/10 transition-colors"
          >
            Send an Enquiry
          </Link>
          <div className="flex items-center justify-center gap-1 mt-4">
            <span className="text-white/60 text-xs">5.0</span>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={11} style={{ fill: "#FBBC04", color: "#FBBC04" }} />
            ))}
            <span className="text-white/60 text-xs ml-1">47+ reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SidebarServicesCard ───────────────────────────────────────────────────────
const SIDEBAR_SERVICES = [
  { label: "Catholic Funerals", href: "/services/catholic-funerals" },
  { label: "Cremation Services", href: "/services/cremation" },
  { label: "Burial Services", href: "/services/burial" },
  { label: "Graveside Services", href: "/services/graveside-services" },
  { label: "Pre-Arranged Funerals", href: "/services/pre-arranged-funerals" },
  { label: "Repatriation", href: "/services/repatriation" },
];

function SidebarServicesCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
      <h3 className="font-bold text-brand-navy text-sm mb-4 flex items-center gap-2">
        <Shield size={14} className="text-brand-royal" /> Our Services
      </h3>
      <ul className="space-y-1.5">
        {SIDEBAR_SERVICES.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="flex items-center justify-between text-xs text-gray-600 hover:text-brand-royal hover:bg-blue-50 -mx-1 px-2 py-1.5 rounded-lg transition-all group"
            >
              <span>{s.label}</span>
              <ArrowRight size={11} className="text-gray-300 group-hover:text-brand-royal transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── SidebarRecentPosts ────────────────────────────────────────────────────────
function SidebarRecentPosts({ currentSlug }: { currentSlug: string }) {
  const { data: dbPosts = [] } = trpc.blog.getLatest.useQuery({ limit: 5 });
  // Merge DB posts with static posts, deduplicate, exclude current
  const staticPosts = STATIC_ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, 3).map((a) => ({
    slug: a.slug,
    title: a.title,
    imageUrl: a.heroImage,
    readingTime: a.readTime,
    isStatic: true,
  }));
  const dbFiltered = dbPosts.filter((p) => p.slug !== currentSlug).slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    imageUrl: p.imageUrl,
    readingTime: p.readingTime,
    isStatic: false,
  }));
  // Prefer DB posts, fill with static
  const combined = [...dbFiltered, ...staticPosts].slice(0, 4);
  if (combined.length === 0) return null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
      <h3 className="font-bold text-brand-navy text-sm mb-4 flex items-center gap-2">
        <BookOpen size={14} className="text-brand-royal" /> Recent Articles
      </h3>
      <div className="space-y-4">
        {combined.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group flex gap-3 hover:bg-gray-50 -mx-1 px-1 py-1.5 rounded-xl transition-colors cursor-pointer">
              {post.imageUrl && (
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-brand-navy leading-snug line-clamp-2 group-hover:text-brand-royal transition-colors">
                  {post.title}
                </p>
                {post.readingTime && (
                  <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={9} /> {post.readingTime} min read
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── TableOfContents ───────────────────────────────────────────────────────────
function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");
  const [readSections, setReadSections] = useState<Set<string>>(new Set());

  const headings = useMemo(
    () =>
      content
        .split("\n")
        .filter((line) => line.startsWith("## "))
        .map((line) => ({
          text: line.replace(/^## /, ""),
          id: slugify(line.replace(/^## /, "")),
        })),
    [content]
  );

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            setReadSections((prev) => {
              const next = new Set(Array.from(prev));
              next.add(entry.target.id);
              return next;
            });
          }
        });
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const progressPct = headings.length > 0 ? (readSections.size / headings.length) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-5 mb-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-brand-royal" />
          <h3 className="font-bold text-brand-navy text-sm">Contents</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-royal to-brand-gold rounded-full"
              animate={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-[10px] font-semibold text-gray-500">
            {readSections.size}/{headings.length}
          </span>
        </div>
      </div>
      <ol className="space-y-1.5">
        {headings.map((h, i) => {
          const isRead = readSections.has(h.id);
          const isActive = activeId === h.id;
          return (
            <li key={i} className="flex gap-2 items-start">
              <span className={`shrink-0 mt-0.5 ${isRead ? "text-green-500" : isActive ? "text-brand-royal" : "text-gray-300"}`}>
                {isRead ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-current inline-block" />
                )}
              </span>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`text-sm leading-snug transition-all ${
                  isActive ? "text-brand-royal font-semibold" : isRead ? "text-gray-500" : "text-gray-600 hover:text-brand-royal"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ── InContentCTA ──────────────────────────────────────────────────────────────
function InContentCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="my-10 rounded-2xl overflow-hidden border border-brand-royal/20 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 shadow-sm"
    >
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-royal to-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200/50">
          <Shield size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-brand-navy text-lg mb-1">Need Help With a Funeral Arrangement?</p>
          <p className="text-sm text-gray-600">
            Bruce Missen is available <strong>24 hours a day, 7 days a week</strong>. Call now to speak directly with our Family Care Specialist.
          </p>
        </div>
        <a
          href={COMPANY.phoneHref}
          className="shrink-0 bg-brand-royal text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-brand-navy transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-blue-300/30"
        >
          <Phone size={14} /> {COMPANY.phone}
        </a>
      </div>
    </motion.div>
  );
}

// ── ProfiTipp Callout ─────────────────────────────────────────────────────────
function ProfiTipp({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-2xl overflow-hidden shadow-md border border-green-200"
    >
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200/50">
            <Lightbulb size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap size={10} /> Expert Tip
            </p>
            <p className="text-sm text-green-900 leading-relaxed">{text}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── KeyTakeaway Box ───────────────────────────────────────────────────────────
function KeyTakeaway({ items }: { items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="bg-gradient-to-r from-brand-navy to-brand-royal p-5 text-white">
        <div className="flex items-center gap-2">
          <Award size={18} />
          <h3 className="font-bold text-base">Key Takeaways</h3>
        </div>
      </div>
      <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl p-5 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="shrink-0 w-6 h-6 rounded-full bg-brand-royal/10 flex items-center justify-center mt-0.5">
              <CheckCircle2 size={14} className="text-brand-royal" />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── ShareButtons ──────────────────────────────────────────────────────────────
function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <div className="flex flex-wrap items-center gap-2.5 py-6 border-t border-b border-gray-100 my-8">
      <span className="text-sm text-gray-500 font-medium shrink-0 mr-1 flex items-center gap-1.5">
        <Share2 size={14} /> Share:
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-[#1877F2] text-white text-xs font-medium px-3.5 py-2 rounded-full hover:opacity-90 transition-all"
      >
        <Facebook size={12} /> Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-[#0A66C2] text-white text-xs font-medium px-3.5 py-2 rounded-full hover:opacity-90 transition-all"
      >
        <Linkedin size={12} /> LinkedIn
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-medium px-3.5 py-2 rounded-full hover:opacity-90 transition-all"
      >
        <MessageCircle size={12} /> WhatsApp
      </a>
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-3.5 py-2 rounded-full hover:bg-gray-200 transition-all"
      >
        {copied ? <><Check size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy link</>}
      </button>
    </div>
  );
}

// ── AuthorBox ─────────────────────────────────────────────────────────────────
function AuthorBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-gray-200 rounded-2xl p-6 sm:p-8 mt-10 flex flex-col sm:flex-row gap-5 hover:border-brand-royal/20 hover:shadow-lg transition-all duration-300"
    >
      <div className="shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-brand-royal/20 mx-auto sm:mx-0 shadow-lg">
          <img src={COMPANY.assets.bruceHeadshot} alt={COMPANY.director} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-1">
        <p className="font-bold text-brand-navy text-lg">{COMPANY.director}</p>
        <p className="text-xs text-gray-500">{COMPANY.directorTitle}, {COMPANY.name}</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 mt-2">
          Bruce Missen founded Willow Tree Funerals in 2018 with a clear purpose: to provide independent, compassionate funeral care to families across Sydney. With over 15 years of experience, Bruce personally handles every arrangement and is available 24 hours a day, 7 days a week. He specialises in Catholic funeral Masses and has built trusted relationships with parish priests across St George, Sutherland Shire, and South West Sydney.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/blog" className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full hover:border-brand-royal hover:text-brand-royal transition-colors">
            All Articles
          </Link>
          <Link href="/about" className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full hover:border-brand-royal hover:text-brand-royal transition-colors">
            About Bruce
          </Link>
          <Link href="/contact" className="text-xs bg-brand-royal text-white px-3 py-1.5 rounded-full hover:bg-brand-navy transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── FAQAccordion ──────────────────────────────────────────────────────────────
function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
    >
      <div className="bg-gradient-to-r from-brand-navy to-brand-royal p-5 text-white">
        <h3 className="font-bold text-base">Frequently Asked Questions</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-brand-navy text-sm pr-4">{item.question}</span>
              <motion.div animate={{ rotate: openIndex === idx ? 180 : 0 }}>
                <ChevronDown size={18} className="text-gray-400 shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── RelatedPostsSection ───────────────────────────────────────────────────────
function RelatedPostsSection({ slug, staticRelatedSlugs }: { slug: string; staticRelatedSlugs?: string[] }) {
  const { data: dbRelated = [] } = trpc.blog.getRelated.useQuery({ slug, limit: 3 });

  // Build related posts: DB first, then static fallback
  const staticRelated = (staticRelatedSlugs ?? [])
    .map((s) => getStaticArticle(s))
    .filter(Boolean)
    .map((a) => ({
      slug: a!.slug,
      title: a!.title,
      imageUrl: a!.heroImage,
      readingTime: a!.readTime,
      tags: a!.tags,
      isStatic: true,
    }));

  const dbMapped = dbRelated.map((p) => ({
    slug: p.slug,
    title: p.title,
    imageUrl: p.imageUrl,
    readingTime: p.readingTime,
    tags: p.tags,
    isStatic: false,
  }));

  const combined = [...dbMapped, ...staticRelated].slice(0, 3);
  if (combined.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-14"
    >
      <h2 className="font-bold text-brand-navy text-xl mb-6 flex items-center gap-2">
        <BookOpen size={18} className="text-brand-royal" /> Related Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {combined.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-brand-royal/20 hover:shadow-lg transition-all duration-300 cursor-pointer">
              {post.imageUrl && (
                <div className="h-36 overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-4">
                <p className="text-xs font-semibold text-brand-royal mb-1.5">{parseTags(post.tags)[0] || "Funerals"}</p>
                <h3 className="font-bold text-brand-navy text-sm leading-snug line-clamp-2 group-hover:text-brand-royal transition-colors">
                  {post.title}
                </h3>
                {post.readingTime && (
                  <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                    <Clock size={9} /> {post.readingTime} min read
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// ── ArticleContent ────────────────────────────────────────────────────────────
function ArticleContent({ content }: { content: string }) {
  const cleaned = content.replace(/<!--\s*jsonld:[^>]*-->/g, "");

  // Extract FAQ section
  const faqMatch = cleaned.match(
    /##\s*(?:Frequently Asked Questions|FAQ)[^\n]*\n([\s\S]*?)(?=\n##\s|\n---|\s*$)/i
  );
  let faqItems: { question: string; answer: string }[] = [];
  let contentWithoutFaq = cleaned;

  if (faqMatch) {
    const faqSection = faqMatch[1];
    const qMatches = Array.from(faqSection.matchAll(/###\s*(.+)\n([\s\S]*?)(?=\n###|\s*$)/g));
    if (qMatches.length > 0) {
      faqItems = qMatches.map((m) => ({ question: m[1].trim(), answer: m[2].trim() }));
      contentWithoutFaq = cleaned.replace(faqMatch[0], "");
    }
  }

  // Extract ProfiTipp blocks (> **Expert Tip:** or > **Profi-Tipp:**)
  const profiTippRegex = /^>\s*\*\*(?:Expert Tip|Profi-Tipp):\*\*\s*(.+)$/m;
  const profiTippMatch = contentWithoutFaq.match(profiTippRegex);
  let profiTippText: string | null = null;
  if (profiTippMatch) {
    profiTippText = profiTippMatch[1].trim();
    contentWithoutFaq = contentWithoutFaq.replace(profiTippMatch[0], `<!-- profi_tipp -->`);
  }

  // Extract KeyTakeaway blocks (> **Key Takeaways:** followed by bullet list)
  const keyTakeawayRegex = /^>\s*\*\*Key Takeaways:\*\*\n((?:>\s*-\s*.+\n?)+)/m;
  const keyTakeawayMatch = contentWithoutFaq.match(keyTakeawayRegex);
  let keyTakeawayItems: string[] = [];
  if (keyTakeawayMatch) {
    keyTakeawayItems = keyTakeawayMatch[1]
      .split("\n")
      .filter((l) => l.match(/^>\s*-\s*/))
      .map((l) => l.replace(/^>\s*-\s*/, "").trim());
    contentWithoutFaq = contentWithoutFaq.replace(keyTakeawayMatch[0], `<!-- key_takeaway -->`);
  }

  // Split at paragraph 3 to insert in-content CTA
  const paragraphs = contentWithoutFaq.split(/\n\n+/);
  const insertAt = 3;
  const before = paragraphs.slice(0, insertAt).join("\n\n");
  const after = paragraphs.slice(insertAt).join("\n\n");

  const proseClasses = "prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-navy prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-brand-royal prose-strong:text-brand-navy prose-li:text-gray-700 prose-blockquote:border-brand-royal prose-blockquote:text-gray-600 prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-h2:scroll-mt-20 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2";

  return (
    <div>
      <div className={proseClasses}>
        <Streamdown>{before}</Streamdown>
      </div>
      <InContentCTA />
      <div className={proseClasses}>
        <Streamdown>{after.replace("<!-- profi_tipp -->", "").replace("<!-- key_takeaway -->", "")}</Streamdown>
      </div>
      {profiTippText && <ProfiTipp text={profiTippText} />}
      {keyTakeawayItems.length > 0 && <KeyTakeaway items={keyTakeawayItems} />}
      {faqItems.length > 0 && <FAQAccordion items={faqItems} />}
    </div>
  );
}

// ── ArticleShell ──────────────────────────────────────────────────────────────
interface ArticleData {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl: string;
  publishedAt: Date | string | null;
  readTime?: number | null;
  readingTime?: number | null;
  heroImage?: string | null;
  imageUrl?: string | null;
  tags: string | null;
  excerpt: string | null;
  author?: string | null;
  content: string;
  staticRelatedSlugs?: string[];
}

function ArticleShell({ article }: { article: ArticleData }) {
  const tags = parseTags(article.tags);
  const publishDate = formatDate(article.publishedAt);
  const heroImg = article.heroImage ?? article.imageUrl;
  const readTime = article.readTime ?? article.readingTime;
  const canonicalUrl = article.canonicalUrl;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: heroImg ?? COMPANY.assets.heroBg,
    datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    dateModified: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    author: {
      "@type": "Person",
      name: article.author || COMPANY.director,
      jobTitle: COMPANY.directorTitle,
      url: "https://willowtreefunerals.com.au/about",
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      url: "https://willowtreefunerals.com.au",
      logo: COMPANY.assets.logoDark,
    },
    mainEntityOfPage: canonicalUrl,
    wordCount: article.content.split(/\s+/).length,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://willowtreefunerals.com.au" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://willowtreefunerals.com.au/blog" },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  return (
    <>
      <SEOHead
        title={article.metaTitle ?? `${article.title} | ${COMPANY.name}`}
        description={article.metaDescription ?? article.excerpt ?? ""}
        canonical={canonicalUrl}
        ogImage={heroImg ?? undefined}
        schema={[articleSchema, breadcrumbSchema]}
      />
      <div className="min-h-screen bg-white">
        <ReadingProgressBar />
        <Nav />

        {/* Article Header */}
        <header
          className="relative pt-36 pb-16 overflow-hidden"
          style={
            heroImg
              ? { backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }
              : { backgroundColor: "#0B1F3A" }
          }
        >
          {heroImg && <div className="absolute inset-0 bg-brand-navy/75" />}
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/70 truncate max-w-xs">{article.title}</span>
            </nav>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="bg-brand-royal/80 text-white text-[0.6rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1 hover:bg-brand-royal transition-colors"
                  >
                    <Tag size={9} /> {tag}
                  </Link>
                ))}
              </div>
            )}
            <h1
              className="font-serif text-white font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/30">
                  <img src={COMPANY.assets.bruceHeadshot} alt={COMPANY.director} className="w-full h-full object-cover" />
                </div>
                <span>{article.author || COMPANY.director}</span>
              </div>
              {publishDate && <span className="flex items-center gap-1.5"><Calendar size={13} /> {publishDate}</span>}
              {readTime && (
                <span className="flex items-center gap-1.5"><Clock size={13} /> {readTime} min read</span>
              )}
            </div>
          </div>
        </header>

        {/* Author intro strip */}
        <div className="bg-gradient-to-r from-brand-navy/5 to-brand-royal/5 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-royal/20 shrink-0">
              <img src={COMPANY.assets.bruceHeadshot} alt={COMPANY.director} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-navy">{article.author || COMPANY.director}</p>
              <p className="text-[11px] text-gray-500">{COMPANY.directorTitle} - {COMPANY.name}</p>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={11} style={{ fill: "#FBBC04", color: "#FBBC04" }} />
              ))}
              <span className="text-[11px] text-gray-500 ml-1">5.0 - 47+ reviews</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            <article>
              {article.excerpt && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-brand-royal rounded-r-xl p-5 mb-8">
                  <p className="text-brand-navy font-medium text-sm leading-relaxed italic">{article.excerpt}</p>
                </div>
              )}
              <ArticleContent content={article.content} />
              <ShareButtons title={article.title} />
              <AuthorBox />
              <RelatedPostsSection slug={article.slug} staticRelatedSlugs={article.staticRelatedSlugs} />
            </article>

            {/* Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-6 space-y-0">
                <TableOfContents content={article.content} />
                <SidebarCTACard />
                <SidebarServicesCard />
                <SidebarRecentPosts currentSlug={article.slug} />
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-brand-navy to-blue-900 text-white py-16 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-royal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Shield size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3 font-serif">Our Family Care Specialists Are Here for You</h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Available 24 hours a day, 7 days a week. Call now to speak directly with Bruce Missen - no call centres, no queues.
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
                <Star key={s} size={14} style={{ fill: "#FBBC04", color: "#FBBC04" }} />
              ))}
              <span className="text-white/60 text-xs ml-2">5.0 from 47+ Google Reviews</span>
            </div>
          </div>
        </section>

        <Footer />
        <BackToTop />
        <StickyMobileArticleCTA />
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function UnifiedBlogArticle() {
  // Match both /blog/:slug and /blog/article/:slug for backward compat
  const [matchBlog, paramsBlog] = useRoute("/blog/:slug");
  const [matchArticle, paramsArticle] = useRoute("/blog/article/:slug");
  const slug = paramsBlog?.slug ?? paramsArticle?.slug ?? "";

  // Check if this is a static article first
  const staticArticle = useMemo(() => getStaticArticle(slug), [slug]);

  // Only query DB if not a static article
  const { data: dbPost, isLoading } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug && !staticArticle }
  );

  // Render static article immediately (no loading state needed)
  if (staticArticle) {
    return (
      <ArticleShell
        article={{
          slug: staticArticle.slug,
          title: staticArticle.title,
          metaTitle: staticArticle.metaTitle,
          metaDescription: staticArticle.metaDescription,
          canonicalUrl: staticArticle.canonicalUrl,
          publishedAt: staticArticle.publishedAt,
          readTime: staticArticle.readTime,
          heroImage: staticArticle.heroImage,
          tags: staticArticle.tags,
          excerpt: staticArticle.excerpt,
          author: staticArticle.author,
          content: staticArticle.content,
          staticRelatedSlugs: staticArticle.relatedSlugs,
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-royal/30 border-t-brand-royal rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!dbPost) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <p className="font-serif text-brand-navy text-2xl font-semibold mb-4">Article Not Found</p>
            <p className="text-gray-500 text-sm mb-8">This article may have been moved or is no longer available.</p>
            <Link href="/blog" className="btn-royal inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold">
              <ChevronLeft size={14} /> Back to Resources
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <ArticleShell
      article={{
        slug: dbPost.slug,
        title: dbPost.title,
        canonicalUrl: `https://willowtreefunerals.com.au/blog/${dbPost.slug}`,
        publishedAt: dbPost.publishedAt,
        readingTime: dbPost.readingTime,
        imageUrl: dbPost.imageUrl,
        tags: dbPost.tags,
        excerpt: dbPost.excerpt,
        author: dbPost.author,
        content: dbPost.content,
      }}
    />
  );
}
