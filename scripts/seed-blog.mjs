#!/usr/bin/env node
/**
 * Load the blog posts exported from Manus (seed/blog-posts.json) into an
 * empty blog_posts table. Does nothing once the table has rows, so posts that
 * babylovegrowth sends later through /api/blog/webhook are never overwritten.
 *
 *   node scripts/seed-blog.mjs
 */
import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const file = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "seed", "blog-posts.json");
const posts = JSON.parse(fs.readFileSync(file, "utf8"));
const conn = await mysql.createConnection(url);

const [[{ n }]] = await conn.query("SELECT COUNT(*) AS n FROM blog_posts");
if (n > 0) {
  console.log(`[seed-blog] blog_posts already has ${n} rows, skipping`);
  await conn.end();
  process.exit(0);
}

const toDate = v => (v ? new Date(v) : new Date());
for (const p of posts) {
  await conn.query(
    `INSERT INTO blog_posts (id, title, slug, excerpt, content, imageUrl, tags, author, readingTime, isPublished, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.id, p.title, p.slug, p.excerpt ?? "", p.content ?? "", p.imageUrl ?? null, p.tags ?? "", p.author ?? "",
     p.readingTime ?? 5, p.isPublished ?? 1, toDate(p.publishedAt), toDate(p.createdAt), toDate(p.updatedAt)]
  );
}
const [[{ m }]] = await conn.query("SELECT COUNT(*) AS m FROM blog_posts");
console.log(`[seed-blog] inserted ${posts.length} posts, table now has ${m}`);
await conn.end();
