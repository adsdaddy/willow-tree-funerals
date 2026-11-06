import type { Express } from "express";
import fs from "node:fs";
import type { Server } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Development only: production never imports Vite or its configuration. */
export async function setupVite(app: Express, server: Server) {
  const { createServer: createViteServer } = await import("vite");
  const projectRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../.."
  );
  const vite = await createViteServer({
    configFile: path.join(projectRoot, "vite.config.ts"),
    server: { middlewareMode: true, hmr: { server } },
    appType: "custom",
  });
  app.use(vite.middlewares);
  app.get("*", async (req, res, next) => {
    try {
      const template = await fs.promises.readFile(
        path.join(projectRoot, "client", "index.html"),
        "utf-8"
      );
      const page = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).type("html").end(page);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
  return vite;
}
