import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath, {
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        // Vite output: content-hashed file names, safe to cache forever
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (filePath.includes(`${path.sep}media${path.sep}`)) {
        // Site photos and fonts: file names carry a hash suffix, cache for 30 days
        res.setHeader("Cache-Control", "public, max-age=2592000");
      } else if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache, no-transform");
      } else {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      }
    },
  }));

  // Missing files under /assets or /media are real 404s, not the app shell
  app.use(["/assets", "/media"], (_req, res) => {
    res.status(404).type("text/plain").send("Not found");
  });

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    // no-transform stops Cloudflare injecting its analytics beacon before consent
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
