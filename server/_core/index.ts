import "dotenv/config";
import { createServer, type Server } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApplication } from "../app";
import { closeDatabase } from "../db";
import { serveStatic } from "./static";

export function getPort(value = process.env.PORT): number {
  const raw = value ?? "3000";
  if (!/^\d+$/.test(raw))
    throw new Error("PORT must be an integer between 1 and 65535");
  const port = Number(raw);
  if (port < 1 || port > 65535)
    throw new Error("PORT must be an integer between 1 and 65535");
  return port;
}

export function listenServer(server: Server, port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "0.0.0.0", () => {
      server.removeListener("error", reject);
      resolve();
    });
  });
}

export async function startServer() {
  const port = getPort();
  const app = createApplication();
  const server = createServer(app);
  let closeVite: (() => Promise<void>) | undefined;
  if (process.env.NODE_ENV === "development") {
    const { setupVite } = await import("./vite");
    const vite = await setupVite(app, server);
    closeVite = () => vite.close();
  } else {
    serveStatic(app);
  }
  await listenServer(server, port);
  console.info(`[HTTP] Listening on 0.0.0.0:${port}`);

  let shuttingDown = false;
  const shutdown = () => {
    if (shuttingDown) return;
    shuttingDown = true;
    const timer = setTimeout(() => process.exit(1), 10_000);
    timer.unref();
    server.close(async () => {
      try {
        await closeVite?.();
        await closeDatabase();
        clearTimeout(timer);
        process.exit(0);
      } catch {
        process.exit(1);
      }
    });
  };
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
  return server;
}

// Keep imports side-effect free for unit tests; the bundled entrypoint starts here.
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  startServer().catch(() => {
    // Do not dump errors that may contain URLs, submitted content, or credentials.
    console.error(
      "[HTTP] Startup failed; check PORT, media configuration, and built client assets"
    );
    process.exitCode = 1;
  });
}
