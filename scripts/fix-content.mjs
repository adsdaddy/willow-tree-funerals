#!/usr/bin/env node
/**
 * Idempotent content fixes, run on every start (after seed-blog.mjs).
 *
 * babylovegrowth wrote internal links as https://blog.willowtreefunerals.com.au/...
 * That host has never existed, so those links were dead. Point them at the
 * main site, where the posts live. Safe to run repeatedly.
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;
if (!url) process.exit(0);

const conn = await mysql.createConnection(url);
const [a] = await conn.query(
  "UPDATE blog_posts SET content = REPLACE(content, 'https://blog.willowtreefunerals.com.au/blog/vek-ritual-com-ua-alternatives-3', 'https://willowtreefunerals.com.au/blog') WHERE content LIKE '%blog.willowtreefunerals.com.au/blog/vek-ritual%'"
);
const [b] = await conn.query(
  "UPDATE blog_posts SET content = REPLACE(content, 'https://blog.willowtreefunerals.com.au', 'https://willowtreefunerals.com.au') WHERE content LIKE '%://blog.willowtreefunerals.com.au%'"
);
console.log(`[fix-content] dead blog-subdomain links fixed in ${a.affectedRows + b.affectedRows} posts`);
await conn.end();
