/**
 * Blog Article Page - Willow Tree Funerals
 * Premium layout: reading progress bar, breadcrumb, article header,
 * 2-col layout (article + sticky sidebar), rich markdown parser,
 * author box, share buttons, related posts, mobile CTA bar.
 *
 * Handles babylovegrowth.ai articles at /blog/article/:slug
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, ArrowRight, ArrowUp, Phone, Star, Shield,
  BookOpen, CheckCircle2, ChevronDown, Share2, Facebook,
  Linkedin, MessageCircle, Copy, Check, Tag,
  ChevronLeft,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { COMPANY } from "../../../../shared/company";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

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

// ── SidebarRecentPosts ────────────────────────────────────────────────────────
function SidebarRecentPosts({ currentSlug }: { currentSlug: string }) {
  const { data } = trpc.blog.getLatest.useQuery({ limit: 5 });
  const posts = (data ?? []).filter((p) => p.slug !== currentSlug).slice(0, 4);
  if (posts.length === 0) return null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
      <h3 className="font-bold text-brand-navy text-sm mb-4 flex items-center gap-2">
        <BookOpen size={14} className="text-brand-royal" /> Recent Articles
      </h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/article/${post.slug}`}>
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
                <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                  <Clock size={9} /> {post.readingTime} min read
                </p>
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

// ── RelatedPostsSection ───────────────────────────────────────────────────────
function RelatedPostsSection({ slug }: { slug: string }) {
  const { data: related = [] } = trpc.blog.getRelated.useQuery({ slug, limit: 3 });
  if (related.length === 0) return null;
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
        {related.map((post) => (
          <Link key={post.slug} href={`/blog/article/${post.slug}`}>
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
                <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                  <Clock size={9} /> {post.readingTime} min read
                </p>
              </div>
            </div>
          </Link>
        ))}
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

  // Split at paragraph 3 to insert in-content CTA
  const paragraphs = contentWithoutFaq.split(/\n\n+/);
  const insertAt = 3;
  const before = paragraphs.slice(0, insertAt).join("\n\n");
  const after = paragraphs.slice(insertAt).join("\n\n");

  return (
    <div>
      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-navy prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-brand-royal prose-strong:text-brand-navy prose-li:text-gray-700 prose-blockquote:border-brand-royal prose-blockquote:text-gray-600 prose-img:rounded-lg prose-img:my-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>{before}</ReactMarkdown>
      </div>
      <InContentCTA />
      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-navy prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-brand-royal prose-strong:text-brand-navy prose-li:text-gray-700 prose-blockquote:border-brand-royal prose-blockquote:text-gray-600 prose-img:rounded-lg prose-img:my-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>{after}</ReactMarkdown>
      </div>
      {faqItems.length > 0 && <FAQAccordion items={faqItems} />}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogArticle() {
  const [, params] = useRoute("/blog/article/:slug");
  const slug = params?.slug ?? "";

  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

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

  if (!post) {
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

  const tags = parseTags(post.tags);
  const publishDate = formatDate(post.publishedAt);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl ?? COMPANY.assets.heroBg,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    author: {
      "@type": "Person",
      name: post.author || COMPANY.director,
      jobTitle: COMPANY.directorTitle,
      url: "https://willowtreefunerals.com.au/about",
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      url: "https://willowtreefunerals.com.au",
      logo: COMPANY.assets.logoDark,
    },
    mainEntityOfPage: `https://willowtreefunerals.com.au/blog/article/${post.slug}`,
    wordCount: post.content.split(/\s+/).length,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://willowtreefunerals.com.au" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://willowtreefunerals.com.au/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://willowtreefunerals.com.au/blog/article/${post.slug}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | ${COMPANY.name}`}
        description={post.excerpt}
        canonical={`https://willowtreefunerals.com.au/blog/article/${post.slug}`}
        ogImage={post.imageUrl ?? undefined}
        schema={[articleSchema, breadcrumbSchema]}
      />
      <div className="min-h-screen bg-white">
        <ReadingProgressBar />
        <Nav />

        {/* Article Header */}
        <header
          className="relative pt-36 pb-16 overflow-hidden"
          style={
            post.imageUrl
              ? { backgroundImage: `url(${post.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
              : { backgroundColor: "#0B1F3A" }
          }
        >
          {post.imageUrl && <div className="absolute inset-0 bg-brand-navy/75" />}
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/70 truncate max-w-xs">{post.title}</span>
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
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/30">
                  <img src={COMPANY.assets.bruceHeadshot} alt={COMPANY.director} className="w-full h-full object-cover" />
                </div>
                <span>{post.author || COMPANY.director}</span>
              </div>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {publishDate}</span>
              {post.readingTime && (
                <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readingTime} min read</span>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            <article>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-brand-royal rounded-r-xl p-5 mb-8">
                <p className="text-brand-navy font-medium text-sm leading-relaxed italic">{post.excerpt}</p>
              </div>
              <ArticleContent content={post.content} />
              <ShareButtons title={post.title} />
              <AuthorBox />
              <RelatedPostsSection slug={post.slug} />
            </article>

            {/* Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-6 space-y-0">
                <TableOfContents content={post.content} />
                <SidebarCTACard />
                <SidebarRecentPosts currentSlug={post.slug} />
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
