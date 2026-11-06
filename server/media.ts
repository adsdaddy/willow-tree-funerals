import type { Express } from "express";
import fs from "node:fs/promises";
import path from "node:path";

export type MediaOptions = {
  publicBaseUrl?: string;
  localDir?: string;
};

export function isSafeMediaFilename(filename: string): boolean {
  return (
    filename.length <= 255 &&
    /^[a-zA-Z0-9][a-zA-Z0-9._-]*\.[a-zA-Z0-9]+$/.test(filename) &&
    !filename.includes("..")
  );
}

export function registerMediaRoutes(
  app: Express,
  options: MediaOptions = {
    publicBaseUrl: process.env.MEDIA_PUBLIC_BASE_URL,
    localDir: process.env.MEDIA_LOCAL_DIR,
  }
) {
  let base: URL | undefined;
  if (options.publicBaseUrl) {
    base = new URL(options.publicBaseUrl);
    if (
      base.protocol !== "https:" ||
      base.username ||
      base.password ||
      base.search ||
      base.hash
    ) {
      throw new Error(
        "MEDIA_PUBLIC_BASE_URL must be an HTTPS URL without credentials, query, or fragment"
      );
    }
    if (!base.pathname.endsWith("/")) base.pathname += "/";
  }
  const localRoot = options.localDir
    ? path.resolve(options.localDir)
    : undefined;

  // Every /media path is handled here, including invalid and missing media.
  app.use("/media", async (req, res) => {
    let filename: string;
    try {
      filename = decodeURIComponent(req.path.slice(1));
    } catch {
      res.status(400).json({ error: "Invalid media filename" });
      return;
    }
    if (!isSafeMediaFilename(filename)) {
      res.status(400).json({ error: "Invalid media filename" });
      return;
    }
    if (req.method !== "GET" && req.method !== "HEAD") {
      res
        .status(405)
        .set("Allow", "GET, HEAD")
        .json({ error: "Method not allowed" });
      return;
    }
    if (base) {
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.redirect(302, new URL(encodeURIComponent(filename), base).toString());
      return;
    }
    if (localRoot) {
      try {
        // Resolve symlinks too, so a media directory cannot expose other files.
        const root = await fs.realpath(localRoot);
        const file = await fs.realpath(path.join(root, filename));
        if (path.dirname(file) !== root || !(await fs.stat(file)).isFile()) {
          res.status(404).json({ error: "Media not found" });
          return;
        }
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.sendFile(file, error => {
          if (error && !res.headersSent)
            res.status(404).json({ error: "Media not found" });
        });
        return;
      } catch {
        // No local paths or driver errors are disclosed.
      }
    }
    res.status(404).json({ error: "Media not found" });
  });
}
