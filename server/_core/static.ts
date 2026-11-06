import express, { type Express } from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function serveStatic(
  app: Express,
  distPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "public"
  )
) {
  const indexPath = path.join(distPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(
      "Built client assets are missing; run the build before starting"
    );
  }

  app.use(
    express.static(distPath, {
      dotfiles: "deny",
      setHeaders: (res, filePath) => {
        // Vite hashes can contain letters, digits, underscores, and hyphens.
        const immutable =
          /[/\\]assets[/\\]/.test(filePath) &&
          /[-.][a-zA-Z0-9_-]{8,}\.[a-z0-9]+$/i.test(filePath);
        res.setHeader(
          "Cache-Control",
          immutable
            ? "public, max-age=31536000, immutable"
            : "public, max-age=0, must-revalidate"
        );
      },
    })
  );

  // Missing asset URLs must not receive HTML masquerading as JS/CSS/images.
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/assets/") || path.extname(req.path))
      return next();
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.sendFile(indexPath);
  });
  app.use((_req, res) => res.status(404).type("text/plain").send("Not found"));
}
