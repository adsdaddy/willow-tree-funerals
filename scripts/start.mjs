#!/usr/bin/env node
/**
 * Production entrypoint (Dockerfile CMD).
 *
 * 1. If DATABASE_URL is set: apply pending migrations, load the blog posts
 *    into an empty table (scripts/seed-blog.mjs), then apply idempotent
 *    content fixes (scripts/fix-content.mjs).
 * 2. Start the web server.
 *
 * Database problems are logged but never stop the server from starting, so a
 * bad DATABASE_URL degrades to "site without blog" instead of a crash loop.
 * Form enquiries do not need the database: they go out by email.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

function run(script) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, [path.join(here, script)], { stdio: "inherit", cwd: root, env: process.env });
    child.on("exit", code => resolve(code ?? 1));
  });
}

if (process.env.DATABASE_URL) {
  if ((await run("migrate.mjs")) === 0) {
    await run("seed-blog.mjs");
    await run("fix-content.mjs");
  } else {
    console.error("[start] migrations failed; starting server anyway");
  }
} else {
  console.warn("[start] DATABASE_URL not set; blog content is disabled");
}

const server = spawn(process.execPath, [path.join(root, "dist", "index.js")], { stdio: "inherit", cwd: root, env: process.env });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.kill(signal));
// A server killed by a signal must not look like a clean exit, or Railway's
// ON_FAILURE restart policy would leave the site down.
server.on("exit", (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
