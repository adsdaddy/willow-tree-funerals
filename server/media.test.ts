import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import express from "express";
import {
  isSafeMediaFilename,
  registerMediaRoutes,
  type MediaOptions,
} from "./media";
import { requestApp } from "./test/http";

let directory: string;
beforeEach(async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), "willow-media-test-"));
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
});
function mediaApp(options: MediaOptions = {}) {
  const app = express();
  registerMediaRoutes(app, options);
  app.get("*", (_req, res) => res.send("SPA fallback must not handle media"));
  return app;
}

describe("independent media delivery", () => {
  it("redirects safe manifest basenames to the configured CDN without fetching it", async () => {
    const response = await requestApp(
      mediaApp({ publicBaseUrl: "https://media.example.com/library" }),
      "/media/001-AbCd1234.webp"
    );
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(
      "https://media.example.com/library/001-AbCd1234.webp"
    );
    expect(response.headers["cache-control"]).toContain("public");
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each([
    "001-hash.webp",
    "font-file.woff2",
    "tribute.mp4",
    "photo_name.jpg",
  ])("accepts safe filename %s", filename => {
    expect(isSafeMediaFilename(filename)).toBe(true);
  });
  it.each([
    "../secret.txt",
    "nested/photo.webp",
    ".env",
    "..",
    "a..b.jpg",
    "image\\file.jpg",
    "image%2fsecret.jpg",
  ])("rejects unsafe filename %s", filename => {
    expect(isSafeMediaFilename(filename)).toBe(false);
  });
  it.each([
    "/media/..%2Fsecret.txt",
    "/media/%2e%2e%2fsecret.txt",
    "/media/nested/photo.webp",
    "/media/%252e%252e%252fsecret.txt",
    "/media/%00.webp",
    "/media/%ZZ",
  ])("blocks traversal or malformed routes: %s", async pathname => {
    const response = await requestApp(
      mediaApp({ localDir: directory }),
      pathname
    );
    expect(response.status).toBe(400);
    expect(response.body).not.toContain("SPA fallback");
  });
  it("missing media configuration returns 404, not SPA HTML", async () => {
    const response = await requestApp(mediaApp(), "/media/001-image.webp");
    expect(response.status).toBe(404);
    expect(JSON.parse(response.body)).toEqual({ error: "Media not found" });
  });
  it("missing local files return 404", async () => {
    const response = await requestApp(
      mediaApp({ localDir: directory }),
      "/media/missing.webp"
    );
    expect(response.status).toBe(404);
  });
  it.each([
    ["001-image.webp", "image/webp"],
    ["font-file.woff2", "font/woff2"],
    ["tribute.mp4", "video/mp4"],
  ])("serves offline media %s with MIME and cache", async (filename, mime) => {
    await fs.writeFile(path.join(directory, filename), "synthetic media");
    const response = await requestApp(
      mediaApp({ localDir: directory }),
      `/media/${filename}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toBe("synthetic media");
    expect(response.headers["content-type"]).toContain(mime);
    expect(response.headers["cache-control"]).toContain("immutable");
  });
  it("does not follow a local symlink outside the media directory", async () => {
    await fs.symlink(
      path.join(directory, ".."),
      path.join(directory, "linked.webp")
    );
    const response = await requestApp(
      mediaApp({ localDir: directory }),
      "/media/linked.webp"
    );
    expect(response.status).toBe(404);
  });
  it("rejects unsupported methods without a redirect", async () => {
    const response = await requestApp(
      mediaApp({ publicBaseUrl: "https://media.example.com" }),
      "/media/001-image.webp",
      { method: "POST" }
    );
    expect(response.status).toBe(405);
    expect(response.headers.allow).toBe("GET, HEAD");
  });
  it.each([
    "http://media.example.com",
    "https://user:password@media.example.com",
    "https://media.example.com?token=test",
    "https://media.example.com#fragment",
  ])("rejects unsafe CDN configuration %s", value => {
    expect(() => mediaApp({ publicBaseUrl: value })).toThrow(
      "MEDIA_PUBLIC_BASE_URL"
    );
  });
});
