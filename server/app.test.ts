import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createApplication } from "./app";
import { serveStatic } from "./_core/static";
import { getPort, listenServer } from "./_core/index";
import { requestApp } from "./test/http";

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  isDatabaseReady: vi.fn().mockResolvedValue(false),
  closeDatabase: vi.fn(),
}));
let directory: string;
beforeEach(async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), "willow-server-test-"));
  await fs.mkdir(path.join(directory, "assets"));
  await fs.writeFile(
    path.join(directory, "index.html"),
    "<!doctype html><title>Willow SPA</title>"
  );
  await fs.writeFile(
    path.join(directory, "assets", "index-AbCd1234.js"),
    "console.log('synthetic');"
  );
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("External network forbidden");
    })
  );
});
afterEach(async () => {
  await fs.rm(directory, { recursive: true, force: true });
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function app(ready = false) {
  const application = createApplication({
    checkReadiness: async () => ready,
    media: {},
  });
  serveStatic(application, directory);
  return application;
}

describe("independent HTTP application", () => {
  it("has liveness independent of database availability", async () => {
    const response = await requestApp(app(), "/healthz");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ status: "ok" });
  });
  it.each([false, true])(
    "readiness is based on a real probe result: %s",
    async ready => {
      const response = await requestApp(app(ready), "/readyz");
      expect(response.status).toBe(ready ? 200 : 503);
      expect(response.headers["cache-control"]).toBe("no-store");
      expect(JSON.parse(response.body)).toEqual({
        status: ready ? "ready" : "not_ready",
      });
    }
  );
  it("fails readiness closed if a probe throws", async () => {
    const application = createApplication({
      media: {},
      checkReadiness: async () => {
        throw new Error("private credentials");
      },
    });
    const response = await requestApp(application, "/readyz");
    expect(response.status).toBe(503);
    expect(response.body).not.toContain("private credentials");
  });
  it.each([
    "/api/unknown",
    "/api/oauth/callback?code=legacy&state=legacy",
    "/api/blog/missing",
  ])("unknown API remains a JSON 404: %s", async url => {
    const response = await requestApp(app(), url);
    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toContain("application/json");
    expect(JSON.parse(response.body)).toEqual({ error: "Not found" });
  });
  it("serves the built SPA for deep links", async () => {
    const response = await requestApp(app(), "/services/catholic-funerals");
    expect(response.status).toBe(200);
    expect(response.body).toContain("Willow SPA");
    expect(response.headers["cache-control"]).toContain("must-revalidate");
  });
  it("serves hashed Vite assets with immutable caching, not SPA HTML", async () => {
    const response = await requestApp(app(), "/assets/index-AbCd1234.js");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("javascript");
    expect(response.headers["cache-control"]).toContain("immutable");
    const missing = await requestApp(app(), "/assets/missing.js");
    expect(missing.status).toBe(404);
    expect(missing.body).not.toContain("Willow SPA");
  });
  it("fails startup visibly if client build is absent", () => {
    expect(() =>
      serveStatic(
        createApplication({ media: {} }),
        path.join(directory, "missing")
      )
    ).toThrow("Built client assets are missing");
  });
  it("redirects only the production www host and preserves URL", async () => {
    const canonical = await requestApp(app(), "/contact?source=test", {
      headers: { host: "www.willowtreefunerals.com.au" },
    });
    expect(canonical.status).toBe(301);
    expect(canonical.headers.location).toBe(
      "https://willowtreefunerals.com.au/contact?source=test"
    );
    const preview = await requestApp(app(), "/contact", {
      headers: { host: "www.unrelated-preview.example.com" },
    });
    expect(preview.status).toBe(200);
    expect(preview.headers.location).toBeUndefined();
  });
  it("limits JSON bodies to 1 MB and returns JSON errors", async () => {
    const response = await requestApp(app(), "/api/blog/webhook", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: "x".repeat(1024 * 1024) }),
    });
    expect(response.status).toBe(413);
    expect(JSON.parse(response.body)).toEqual({
      error: "Request body too large",
    });
  });
  it("handles malformed JSON without leaking content", async () => {
    const response = await requestApp(app(), "/api/blog/webhook", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: '{"private-test":',
    });
    expect(response.status).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ error: "Invalid JSON body" });
  });
  it("permits configured media CDN resources in CSP", async () => {
    const application = createApplication({
      media: { publicBaseUrl: "https://media.example.com" },
    });
    const response = await requestApp(application, "/healthz");
    expect(response.headers["content-security-policy"]).toContain(
      "https://media.example.com"
    );
    expect(response.headers["content-security-policy"]).not.toMatch(
      /manus|cloudfront/
    );
  });
});

describe("deterministic PORT startup", () => {
  it("uses 3000 by default and respects PORT", () => {
    expect(getPort("3000")).toBe(3000);
    expect(getPort("8080")).toBe(8080);
  });
  it.each(["0", "-1", "65536", "random", "3000suffix", "3.14", ""])(
    "rejects invalid PORT %s",
    port => {
      expect(() => getPort(port)).toThrow("PORT must be an integer");
    }
  );
  it("binds exactly once to 0.0.0.0 and does not silently change a busy port", async () => {
    const listeners = new Map<string, (...args: any[]) => void>();
    const fake = {
      once: vi.fn((event: string, callback: (...args: any[]) => void) => {
        listeners.set(event, callback);
      }),
      removeListener: vi.fn(),
      listen: vi.fn((_port, _host, _callback) => {
        listeners.get("error")!(new Error("EADDRINUSE"));
      }),
    };
    await expect(listenServer(fake as any, 8080)).rejects.toThrow("EADDRINUSE");
    expect(fake.listen).toHaveBeenCalledOnce();
    expect(fake.listen).toHaveBeenCalledWith(
      8080,
      "0.0.0.0",
      expect.any(Function)
    );
  });
});
