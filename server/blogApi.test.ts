import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { registerBlogApiRoutes } from "./blogApi";
import { getDb } from "./db";
import { notifyOwner } from "./_core/notification";
import { requestApp } from "./test/http";

vi.mock("./db", () => ({ getDb: vi.fn() }));
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(false),
}));

const posts = [
  {
    id: 1,
    slug: "public-post",
    title: "Public",
    content: "Synthetic content",
    isPublished: 1,
  },
  {
    id: 2,
    slug: "private-draft",
    title: "Private Draft",
    content: "Private synthetic content",
    isPublished: 0,
  },
];
const dialect = new MySqlDialect();
let conditions: Array<{ sql: string; params: unknown[] }>;
let inserted: ReturnType<typeof vi.fn>;
let updated: ReturnType<typeof vi.fn>;
let database: any;

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(notifyOwner).mockResolvedValue(false);
  vi.stubEnv("BLOG_API_KEY", "test-blog-key-never-real");
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("External network forbidden");
    })
  );
  conditions = [];
  inserted = vi.fn().mockResolvedValue([{ insertId: 42 }]);
  updated = vi.fn(() => ({ where: vi.fn().mockResolvedValue(undefined) }));
  database = {
    select: vi.fn(() => {
      let selected = [...posts];
      const chain: any = {
        from: () => chain,
        where: (condition: any) => {
          const query = dialect.sqlToQuery(condition);
          conditions.push(query);
          if (query.sql.includes("isPublished"))
            selected = selected.filter(post => post.isPublished === 1);
          const slug = query.params.find(value => typeof value === "string");
          if (slug) selected = selected.filter(post => post.slug === slug);
          return chain;
        },
        orderBy: () => chain,
        limit: () => chain,
        offset: () => chain,
        then: (resolve: any, reject: any) =>
          Promise.resolve(selected).then(resolve, reject),
      };
      return chain;
    }),
    insert: vi.fn(() => ({ values: inserted })),
    update: vi.fn(() => ({ set: updated })),
    delete: vi.fn(() => ({ where: vi.fn().mockResolvedValue(undefined) })),
  };
  vi.mocked(getDb).mockResolvedValue(database);
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function app() {
  const application = express();
  application.use(express.json());
  registerBlogApiRoutes(application);
  return application;
}
function writeOptions(method: string, headers: Record<string, string> = {}) {
  return {
    method,
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify({
      title: "Synthetic title",
      content: "Synthetic content",
      content_markdown: "Synthetic content",
    }),
  };
}
const writeRoutes = [
  { method: "POST", url: "/api/blog/webhook" },
  { method: "POST", url: "/api/blog/posts" },
  { method: "PUT", url: "/api/blog/posts/public-post" },
  { method: "DELETE", url: "/api/blog/posts/public-post" },
];

describe("blog write authentication", () => {
  it.each(writeRoutes)(
    "missing key configuration fails closed: $method $url",
    async ({ method, url }) => {
      vi.stubEnv("BLOG_API_KEY", "");
      const response = await requestApp(
        app(),
        url,
        writeOptions(method, { "x-api-key": "test-blog-key-never-real" })
      );
      expect(response.status).toBe(503);
      expect(getDb).not.toHaveBeenCalled();
    }
  );
  it.each(writeRoutes)(
    "incorrect key fails closed: $method $url",
    async ({ method, url }) => {
      const response = await requestApp(
        app(),
        url,
        writeOptions(method, { authorization: "Bearer wrong-key" })
      );
      expect(response.status).toBe(401);
      expect(getDb).not.toHaveBeenCalled();
    }
  );
  it.each([
    {},
    { authorization: "test-blog-key-never-real" },
    { authorization: "Basic test-blog-key-never-real" },
    { "x-api-key": "x" },
  ])(
    "rejects malformed/missing credentials without throwing",
    async headers => {
      const response = await requestApp(
        app(),
        "/api/blog/webhook",
        writeOptions("POST", headers)
      );
      expect(response.status).toBe(401);
      expect(getDb).not.toHaveBeenCalled();
    }
  );
  it.each([
    { authorization: "Bearer test-blog-key-never-real" },
    { authorization: "bEaReR test-blog-key-never-real" },
    { "x-api-key": "test-blog-key-never-real" },
  ])("preserves supported bearer and x-api-key formats", async headers => {
    vi.mocked(getDb).mockResolvedValue(null);
    const response = await requestApp(
      app(),
      "/api/blog/webhook",
      writeOptions("POST", headers)
    );
    expect(response.status).toBe(503); // Auth passes, unavailable mocked DB fails visibly.
    expect(getDb).toHaveBeenCalledOnce();
  });
});

describe("public blog privacy", () => {
  it("lists only published posts using a database predicate", async () => {
    const response = await requestApp(app(), "/api/blog/posts");
    expect(response.status).toBe(200);
    expect(
      JSON.parse(response.body).posts.map((post: any) => post.slug)
    ).toEqual(["public-post"]);
    expect(conditions[0].sql).toContain("isPublished");
    expect(conditions[0].params).toContain(1);
  });
  it("returns 404 for an unpublished slug", async () => {
    const response = await requestApp(app(), "/api/blog/posts/private-draft");
    expect(response.status).toBe(404);
    expect(response.body).not.toContain("Private synthetic content");
    expect(conditions[0].sql).toContain("isPublished");
    expect(conditions[0].params).toEqual(["private-draft", 1]);
  });
  it("still returns a published post without authentication", async () => {
    const response = await requestApp(app(), "/api/blog/posts/public-post");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.body).slug).toBe("public-post");
  });
  it("normalizes invalid pagination rather than passing NaN or negatives to SQL", async () => {
    const response = await requestApp(
      app(),
      "/api/blog/posts?page=invalid&limit=-10"
    );
    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toMatchObject({ page: 1, limit: 1 });
  });
});

describe("babylovegrowth webhook compatibility", () => {
  it("publishes the native payload and returns HTTP 200 without a live notification", async () => {
    const response = await requestApp(app(), "/api/blog/webhook", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer test-blog-key-never-real",
      },
      body: JSON.stringify({
        title: "Synthetic Article",
        slug: "synthetic-article",
        metaDescription: "Synthetic description",
        content_markdown: "# Synthetic Article\n\nA funeral article body.",
        heroImageUrl: "/media/001-tribute.webp",
        tags: ["Funerals", "Sydney"],
        jsonLd: { "@type": "Article" },
        faqJsonLd: { "@type": "FAQPage" },
        createdAt: "2026-01-01T00:00:00Z",
      }),
    });
    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toMatchObject({
      success: true,
      id: 42,
      slug: "synthetic-article",
      url: "/blog/synthetic-article",
      publicUrl: "https://willowtreefunerals.com.au/blog/synthetic-article",
    });
    expect(inserted).toHaveBeenCalledOnce();
    expect(inserted.mock.calls[0][0]).toMatchObject({
      title: "Synthetic Article",
      tags: "Funerals,Sydney",
      isPublished: 1,
      imageUrl: "/media/001-tribute.webp",
    });
    expect(inserted.mock.calls[0][0].content).toContain("<!-- jsonld:article:");
    expect(inserted.mock.calls[0][0].content).toContain("<!-- jsonld:faq:");
    expect(inserted.mock.calls[0][0].content).not.toContain(
      "# Synthetic Article"
    );
    expect(fetch).not.toHaveBeenCalled();
  });
  it("updates an existing slug idempotently", async () => {
    const response = await requestApp(app(), "/api/blog/webhook", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer test-blog-key-never-real",
      },
      body: JSON.stringify({
        title: "Updated",
        slug: "public-post",
        content_markdown: "Updated body",
      }),
    });
    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toMatchObject({
      success: true,
      id: 1,
      slug: "public-post",
    });
    expect(updated).toHaveBeenCalledOnce();
    expect(inserted).not.toHaveBeenCalled();
    expect(notifyOwner).not.toHaveBeenCalled();
  });
});
