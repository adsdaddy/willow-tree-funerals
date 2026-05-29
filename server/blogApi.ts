/**
 * Blog REST API + babylovegrowth.ai Webhook Receiver
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides two modes of ingestion:
 *
 * 1. WEBHOOK (babylovegrowth.ai native format)
 *    POST /api/blog/webhook
 *    Auth: Authorization: Bearer <BLOG_API_KEY>
 *    Payload: babylovegrowth.ai webhook payload (see docs)
 *
 * 2. REST API (manual / custom integrations)
 *    POST   /api/blog/posts          – Create post (custom JSON)
 *    PUT    /api/blog/posts/:slug    – Update post
 *    DELETE /api/blog/posts/:slug    – Unpublish or hard-delete
 *    GET    /api/blog/posts          – List posts (paginated)
 *    GET    /api/blog/posts/:slug    – Get single post
 */

import { Router, Request, Response } from "express";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";

// ── Helpers ───────────────────────────────────────────────────────────────────

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Strip HTML tags to get plain text for excerpt generation */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Extract the first markdown image URL from content, e.g. ![alt](url) */
function extractFirstImageUrl(markdown: string): string | null {
  const match = markdown.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return match ? match[1] : null;
}

// ── Auth middleware ───────────────────────────────────────────────────────────

function requireApiKey(req: Request, res: Response, next: () => void) {
  const apiKey = process.env.BLOG_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "Blog API not configured – BLOG_API_KEY missing" });
    return;
  }
  const provided =
    (req.headers["x-api-key"] as string) ||
    (req.headers["authorization"] as string)?.replace(/^Bearer\s+/i, "");
  if (provided !== apiKey) {
    res.status(401).json({ error: "Unauthorized – invalid API key" });
    return;
  }
  next();
}

// ── babylovegrowth.ai Webhook Payload Type ────────────────────────────────────

interface BabyLoveGrowthPayload {
  id?: number;
  title: string;
  slug?: string;
  metaDescription?: string;
  content_html?: string;
  content_markdown?: string;
  heroImageUrl?: string;
  jsonLd?: object;
  faqJsonLd?: object;
  languageCode?: string;
  publicUrl?: string;
  tags?: string | string[];
  createdAt?: string;
}

// ── Router ────────────────────────────────────────────────────────────────────

export function registerBlogApiRoutes(app: { use: Function }) {
  const router = Router();

  // ── WEBHOOK ENDPOINT (babylovegrowth.ai native) ──────────────────────────

  /**
   * POST /api/blog/webhook
   *
   * babylovegrowth.ai sends:
   *   Authorization: Bearer <BLOG_API_KEY>
   *   Content-Type: application/json
   *
   * Payload fields used:
   *   title            → blog post title
   *   slug             → URL slug (auto-generated from title if missing)
   *   metaDescription  → excerpt / SEO description
   *   content_markdown → preferred content (Markdown)
   *   content_html     → fallback if no markdown
   *   heroImageUrl     → featured image
   *   jsonLd           → Article schema (stored, injected in <head>)
   *   faqJsonLd        → FAQPage schema (stored, injected in <head>)
   *   tags             → comma-separated or array
   *   createdAt        → publish date
   */
  router.post("/webhook", requireApiKey, async (req: Request, res: Response) => {
    const body = req.body as BabyLoveGrowthPayload;

    if (!body.title || typeof body.title !== "string") {
      res.status(400).json({ error: "title is required" });
      return;
    }

    try {
      const db = await getDb();
      if (!db) { res.status(503).json({ error: "Database unavailable" }); return; }

      // Build slug
      let slug = body.slug ? toSlug(body.slug) : toSlug(body.title);
      const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
      const existingPost = existing[0] ?? null;

      // Content: prefer markdown, fall back to HTML
      // babylovegrowth.ai sometimes sends content with ";" as line separators instead of "\n"
      // Normalise to proper markdown newlines so the renderer works correctly
      const rawContent = body.content_markdown?.trim() || stripHtml(body.content_html ?? "") || "";
      const normalised = rawContent.includes("\n")
        ? rawContent  // already has newlines, use as-is
        : rawContent.replace(/;\s*/g, "\n\n").trim();  // convert semicolons to paragraph breaks
      // Strip leading H1 (title is stored in the title field, no need to repeat in content)
      const content = normalised.replace(/^#\s+.+\n?/, "").trim();
      if (!content) {
        res.status(400).json({ error: "content_markdown or content_html is required" });
        return;
      }

      // Excerpt from metaDescription or auto-generated
      const excerpt = body.metaDescription?.trim() ||
        content.replace(/^#+\s.+\n?/m, "").replace(/[#*_`>]/g, "").trim().slice(0, 200);

      // Tags
      const tags = Array.isArray(body.tags)
        ? body.tags.join(",")
        : (body.tags ?? "Funerals,Sydney");

      // Store JSON-LD schemas as JSON strings in content for use in BlogArticle page
      // We append them as HTML comments so the frontend can extract them
      let finalContent = content;
      if (body.jsonLd) {
        finalContent += `\n\n<!-- jsonld:article:${JSON.stringify(body.jsonLd)} -->`;
      }
      if (body.faqJsonLd) {
        finalContent += `\n\n<!-- jsonld:faq:${JSON.stringify(body.faqJsonLd)} -->`;
      }

      const readingTime = estimateReadingTime(content);
      const publishedAt = body.createdAt ? new Date(body.createdAt) : new Date();

      // Extract hero image: prefer explicit heroImageUrl, fall back to first image in markdown
      const heroImage = body.heroImageUrl ?? extractFirstImageUrl(content) ?? null;

      let postId: number | undefined;
      let isUpdate = false;

      if (existingPost) {
        // Update existing post (idempotent upsert - babylovegrowth.ai may resend)
        isUpdate = true;
        await db.update(blogPosts).set({
          title: body.title.trim(),
          excerpt,
          content: finalContent,
          imageUrl: heroImage,
          tags,
          readingTime,
          isPublished: 1,
          publishedAt,
        }).where(eq(blogPosts.slug, slug));
        postId = existingPost.id;
      } else {
        // Insert new post
        const [result] = await db.insert(blogPosts).values({
          title: body.title.trim(),
          slug,
          excerpt,
          content: finalContent,
          imageUrl: heroImage,
          tags,
          author: "Willow Tree Funerals",
          readingTime,
          isPublished: 1,
          publishedAt,
        });
        postId = (result as { insertId?: number })?.insertId;
      }

      // Notify owner (only for new posts)
      if (!isUpdate) {
        await notifyOwner({
          title: `📝 New Blog Post: ${body.title}`,
          content: `Slug: ${slug}\nTags: ${tags}\nReading time: ${readingTime} min\nURL: /blog/${slug}`,
        }).catch(() => {});
      }

      // Return 200 with post info (babylovegrowth.ai expects HTTP 200)
      res.status(200).json({
        success: true,
        id: postId,
        slug,
        url: `/blog/${slug}`,
        publicUrl: `https://willowtreefunerals.com.au/blog/${slug}`,
        message: isUpdate
          ? `Post "${body.title}" updated successfully`
          : `Post "${body.title}" published successfully`,
      });
    } catch (err) {
      console.error("[Blog Webhook] error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // ── REST API ENDPOINTS ────────────────────────────────────────────────────

  /** GET /api/blog/posts – List posts (paginated, public) */
  router.get("/posts", async (req: Request, res: Response) => {
    try {
      const db = await getDb();
      if (!db) { res.status(503).json({ error: "Database unavailable" }); return; }
      const limit = Math.min(100, parseInt(String(req.query.limit ?? "20")));
      const offset = (Math.max(1, parseInt(String(req.query.page ?? "1"))) - 1) * limit;
      const posts = await db
        .select({ id: blogPosts.id, title: blogPosts.title, slug: blogPosts.slug, excerpt: blogPosts.excerpt, imageUrl: blogPosts.imageUrl, tags: blogPosts.tags, author: blogPosts.author, readingTime: blogPosts.readingTime, isPublished: blogPosts.isPublished, publishedAt: blogPosts.publishedAt, updatedAt: blogPosts.updatedAt })
        .from(blogPosts)
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit)
        .offset(offset);
      res.json({ posts, page: Math.ceil(offset / limit) + 1, limit });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /** GET /api/blog/posts/:slug – Get single post (public) */
  router.get("/posts/:slug", async (req: Request, res: Response) => {
    try {
      const db = await getDb();
      if (!db) { res.status(503).json({ error: "Database unavailable" }); return; }
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, req.params.slug)).limit(1);
      if (!post) { res.status(404).json({ error: "Post not found" }); return; }
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * POST /api/blog/posts – Create post (custom JSON, requires API key)
   *
   * Body: { title, content, excerpt?, slug?, imageUrl?, tags?, author?, readingTime?, isPublished?, publishedAt? }
   */
  router.post("/posts", requireApiKey, async (req: Request, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) { res.status(400).json({ error: "title and content are required" }); return; }
    try {
      const db = await getDb();
      if (!db) { res.status(503).json({ error: "Database unavailable" }); return; }
      let slug = req.body.slug ? toSlug(req.body.slug) : toSlug(title);
      const existing = await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
      if (existing.length > 0) slug = `${slug}-${Date.now()}`;
      const tags = Array.isArray(req.body.tags) ? req.body.tags.join(",") : (req.body.tags ?? "");
      const excerpt = req.body.excerpt?.trim() || content.replace(/[#*_`>]/g, "").trim().slice(0, 200);
      const readingTime = req.body.readingTime ?? estimateReadingTime(content);
      const isPublished = req.body.isPublished === false || req.body.isPublished === 0 ? 0 : 1;
      const publishedAt = req.body.publishedAt ? new Date(req.body.publishedAt) : new Date();
      const [result] = await db.insert(blogPosts).values({ title: title.trim(), slug, excerpt, content, imageUrl: req.body.imageUrl ?? null, tags, author: req.body.author ?? "Willow Tree Funerals", readingTime, isPublished, publishedAt });
      res.status(201).json({ success: true, id: (result as { insertId?: number })?.insertId, slug, url: `/blog/${slug}` });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /** PUT /api/blog/posts/:slug – Update post (requires API key) */
  router.put("/posts/:slug", requireApiKey, async (req: Request, res: Response) => {
    if (!req.body.content) { res.status(400).json({ error: "content is required" }); return; }
    try {
      const db = await getDb();
      if (!db) { res.status(503).json({ error: "Database unavailable" }); return; }
      const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.slug, req.params.slug)).limit(1);
      if (!existing) { res.status(404).json({ error: "Post not found" }); return; }
      const updateData: Partial<typeof blogPosts.$inferInsert> = {};
      if (req.body.title) updateData.title = req.body.title.trim();
      if (req.body.content) { updateData.content = req.body.content; updateData.readingTime = req.body.readingTime ?? estimateReadingTime(req.body.content); }
      if (req.body.excerpt) updateData.excerpt = req.body.excerpt;
      if (req.body.imageUrl !== undefined) updateData.imageUrl = req.body.imageUrl ?? null;
      if (req.body.tags !== undefined) updateData.tags = Array.isArray(req.body.tags) ? req.body.tags.join(",") : req.body.tags;
      if (req.body.isPublished !== undefined) updateData.isPublished = req.body.isPublished === false || req.body.isPublished === 0 ? 0 : 1;
      if (req.body.publishedAt) updateData.publishedAt = new Date(req.body.publishedAt);
      await db.update(blogPosts).set(updateData).where(eq(blogPosts.slug, req.params.slug));
      res.json({ success: true, slug: req.params.slug, url: `/blog/${req.params.slug}` });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /** DELETE /api/blog/posts/:slug – Unpublish or hard-delete (requires API key) */
  router.delete("/posts/:slug", requireApiKey, async (req: Request, res: Response) => {
    try {
      const db = await getDb();
      if (!db) { res.status(503).json({ error: "Database unavailable" }); return; }
      const [existing] = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, req.params.slug)).limit(1);
      if (!existing) { res.status(404).json({ error: "Post not found" }); return; }
      if (req.query.hard === "true") {
        await db.delete(blogPosts).where(eq(blogPosts.slug, req.params.slug));
        res.json({ success: true, message: `Post "${req.params.slug}" permanently deleted` });
      } else {
        await db.update(blogPosts).set({ isPublished: 0 }).where(eq(blogPosts.slug, req.params.slug));
        res.json({ success: true, message: `Post "${req.params.slug}" unpublished` });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Mount under /api/blog
  (app as any).use("/api/blog", router);
}
