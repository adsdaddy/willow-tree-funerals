import express, { type ErrorRequestHandler } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { isDatabaseReady } from "./db";
import { registerBlogApiRoutes } from "./blogApi";
import { registerMediaRoutes, type MediaOptions } from "./media";

export type ApplicationOptions = {
  checkReadiness?: () => Promise<boolean>;
  media?: MediaOptions;
};

/** API and middleware only; startup attaches development or built client assets. */
export function createApplication(options: ApplicationOptions = {}) {
  const app = express();
  const mediaBase = options.media
    ? options.media.publicBaseUrl
    : process.env.MEDIA_PUBLIC_BASE_URL;
  const mediaOrigin = mediaBase ? new URL(mediaBase).origin : "";
  app.disable("x-powered-by");
  app.use((_req, res, next) => {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://plausible.io",
        "style-src 'self' 'unsafe-inline'",
        `img-src 'self' data: blob: https://www.facebook.com https://*.googletagmanager.com https://*.supabase.co https://*.supabase.in https://images.unsplash.com https://*.amazonaws.com https://*.cloudinary.com ${mediaOrigin}`,
        `font-src 'self' ${mediaOrigin}`,
        `media-src 'self' blob: ${mediaOrigin}`,
        `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://connect.facebook.net https://plausible.io ${mediaOrigin}`,
        "frame-src 'self' https://www.google.com",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; ")
    );
    next();
  });

  // Only the actual production www host is canonicalised; previews stay put.
  app.use((req, res, next) => {
    const host = (req.headers.host || "").toLowerCase();
    if (
      host === "www.willowtreefunerals.com.au" ||
      host === "www.willowtreefunerals.com.au:443"
    ) {
      res.redirect(301, `https://willowtreefunerals.com.au${req.originalUrl}`);
      return;
    }
    next();
  });

  app.get("/healthz", (_req, res) => res.json({ status: "ok" }));
  app.get("/readyz", async (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    try {
      const ready = await (options.checkReadiness ?? isDatabaseReady)();
      res
        .status(ready ? 200 : 503)
        .json({ status: ready ? "ready" : "not_ready" });
    } catch {
      res.status(503).json({ status: "not_ready" });
    }
  });

  // Blog content may be substantial, but no route accepts large binary uploads.
  app.use(express.json({ limit: "1mb" }));
  app.use(
    express.urlencoded({ limit: "64kb", extended: false, parameterLimit: 100 })
  );
  registerBlogApiRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({ router: appRouter, createContext })
  );
  app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));
  registerMediaRoutes(app, options.media);

  const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
    if (res.headersSent) return;
    const status =
      error?.type === "entity.too.large"
        ? 413
        : error?.type === "entity.parse.failed"
          ? 400
          : 500;
    if (status === 500) console.error("[HTTP] Request failed");
    res
      .status(status)
      .json({
        error:
          status === 413
            ? "Request body too large"
            : status === 400
              ? "Invalid JSON body"
              : "Internal server error",
      });
  };
  app.use(handleError);
  return app;
}
