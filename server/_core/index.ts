import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerBlogApiRoutes } from "../blogApi";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // ── Security headers (PageSpeed Best Practices + WCAG) ────────────────────
  app.use((_req, res, next) => {
    // HSTS  -  force HTTPS for 1 year, include subdomains
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    // Prevent clickjacking
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    // Cross-Origin-Opener-Policy  -  isolate top-level browsing context
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    // X-Content-Type-Options  -  prevent MIME sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");
    // Referrer-Policy
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    // Content-Security-Policy  -  permissive but effective
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://plausible.io https://*.manus-analytics.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https://d2xsxph8kpxj0f.cloudfront.net https://www.facebook.com https://*.googletagmanager.com",
        "font-src 'self' https://d2xsxph8kpxj0f.cloudfront.net",
        "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://connect.facebook.net https://plausible.io https://*.manus-analytics.com https://*.cloudfront.net",
        "frame-src 'self' https://www.google.com",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; ")
    );
    next();
  });

  // ── www → non-www redirect (canonical: willowtreefunerals.com.au) ──────────
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    // Redirect www to non-www on the production domain
    if (
      host === "www.willowtreefunerals.com.au" ||
      host === "www.willowtreefunerals.com.au:443"
    ) {
      return res.redirect(301, `https://willowtreefunerals.com.au${req.originalUrl}`);
    }
    next();
  });

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Blog webhook + REST API (babylovegrowth.ai integration)
  registerBlogApiRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
