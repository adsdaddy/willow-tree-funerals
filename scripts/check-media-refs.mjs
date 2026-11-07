#!/usr/bin/env node
/**
 * Fails when source code references a /media file that is not in
 * client/public/media, or still points at Manus hosting (/manus-storage,
 * Manus' CloudFront). Run in CI.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mediaDir = path.join(root, "client", "public", "media");
const media = new Set(fs.readdirSync(mediaDir));
const SCAN = ["client/src", "shared", "client/index.html", "client/public/manifest.json"];
const NAME = /(?:\/media\/|\$\{CDN\}\/)([A-Za-z0-9_.%-]+\.(?:webp|png|jpe?g|gif|svg|woff2|ico))/g;
const MANUS = /\/manus-storage\/|d2xsxph8kpxj0f\.cloudfront\.net|d36hbw14aib5lz\.cloudfront\.net|manuscdn\.com/;

function* files(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) return;
  if (fs.statSync(full).isFile()) { yield full; return; }
  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    const rel = path.join(p, entry.name);
    if (entry.isDirectory()) yield* files(rel);
    else if (/\.(tsx?|jsx?|json|html|css)$/.test(entry.name) && !entry.name.includes(".test.")) yield path.join(root, rel);
  }
}

const problems = [];
let refs = 0;
for (const p of SCAN) {
  for (const file of files(p)) {
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(root, file);
    if (MANUS.test(text)) problems.push(`${rel}: still references Manus hosting`);
    for (const m of text.matchAll(NAME)) {
      refs++;
      if (!media.has(decodeURIComponent(m[1]))) problems.push(`${rel}: missing /media/${m[1]}`);
    }
  }
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`[media] ${refs} references, all present in client/public/media (${media.size} files)`);
