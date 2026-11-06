import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({ getDb: vi.fn() }));
vi.mock("./email", () => ({ sendFormEmail: vi.fn() }));

const posts = Array.from({ length: 122 }, (_, index) => ({
  id: index + 1,
  title: `Synthetic article ${index + 1}`,
  slug: `synthetic-article-${index + 1}`,
  excerpt: "Synthetic archive entry",
  content: "Synthetic article content",
  tags: "Funerals,Sydney",
  isPublished: 1,
  publishedAt: new Date("2026-01-01T00:00:00Z"),
}));
const context: TrpcContext = {
  user: null,
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
};

beforeEach(() => {
  vi.clearAllMocks();
  const chain = {
    from: vi.fn(() => chain),
    where: vi.fn(() => chain),
    orderBy: vi.fn().mockResolvedValue(posts),
  };
  vi.mocked(getDb).mockResolvedValue({ select: () => chain } as any);
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw new Error("External network forbidden");
    })
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("migrated public blog archive", () => {
  it("accepts limit 1000 and preserves all 122 current published articles", async () => {
    const result = await appRouter
      .createCaller(context)
      .blog.getAll({ page: 1, limit: 1000 });
    expect(result.posts).toHaveLength(122);
    expect(result.total).toBe(122);
    expect(result.totalPages).toBe(1);
    expect(result.posts.at(-1)?.slug).toBe("synthetic-article-122");
    expect(fetch).not.toHaveBeenCalled();
  });
  it("still enforces an explicit archive cap", async () => {
    await expect(
      appRouter.createCaller(context).blog.getAll({ page: 1, limit: 1001 })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(getDb).not.toHaveBeenCalled();
  });
  it("retains smaller paginated requests and default page size", async () => {
    const caller = appRouter.createCaller(context);
    const first = await caller.blog.getAll({ page: 1, limit: 100 });
    const second = await caller.blog.getAll({ page: 2, limit: 100 });
    expect(first.posts).toHaveLength(100);
    expect(second.posts).toHaveLength(22);
    expect(second.totalPages).toBe(2);
    const defaults = await caller.blog.getAll({});
    expect(defaults.posts).toHaveLength(12);
  });
});
