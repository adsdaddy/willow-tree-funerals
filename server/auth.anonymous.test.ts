import { afterEach, describe, expect, it, vi } from "vitest";
import { createContext, type TrpcContext } from "./_core/context";
import { appRouter } from "./routers";
import { protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";

vi.mock("./email", () => ({ sendFormEmail: vi.fn() }));
vi.mock("./db", () => ({ getDb: vi.fn() }));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("public anonymous authentication", () => {
  async function context() {
    return createContext({
      req: {
        protocol: "https",
        headers: {
          cookie: "app_session_id=legacy-token",
          authorization: "Bearer forged",
          "x-admin-key": "forged",
          "x-user-role": "admin",
        },
      } as any,
      res: { clearCookie: vi.fn() } as any,
      info: {} as any,
    });
  }
  it("ignores legacy cookies, owner env, and forged headers without network calls", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("External network forbidden");
      })
    );
    vi.stubEnv("OWNER_OPEN_ID", "forged");
    vi.stubEnv("JWT_SECRET", "forged");
    const ctx = await context();
    expect(ctx.user).toBeNull();
    expect(await appRouter.createCaller(ctx).auth.me()).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });
  it("auth.me remains null even if a synthetic caller injects a user", async () => {
    const ctx = await context();
    ctx.user = { role: "admin" } as NonNullable<TrpcContext["user"]>;
    expect(await appRouter.createCaller(ctx).auth.me()).toBeNull();
  });
  it("logout is harmless and works anonymously", async () => {
    const ctx = await context();
    expect(await appRouter.createCaller(ctx).auth.logout()).toEqual({
      success: true,
    });
    expect(ctx.res.clearCookie).toHaveBeenCalledOnce();
  });
  it("admin API fails closed for anonymous requests", async () => {
    await expect(
      appRouter
        .createCaller(await context())
        .system.notifyOwner({ title: "Test", content: "Test" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
  it("protected procedures fail closed for anonymous requests", async () => {
    const testRouter = router({
      secret: protectedProcedure.query(() => "never exposed"),
    });
    await expect(
      testRouter.createCaller(await context()).secret()
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
  it("owner notifications are a no-op even when former Forge env vars exist", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("External network forbidden");
      })
    );
    vi.stubEnv("BUILT_IN_FORGE_API_URL", "https://unused.example.com");
    vi.stubEnv("BUILT_IN_FORGE_API_KEY", "unused-test-token");
    const log = vi.spyOn(console, "info");
    expect(
      await notifyOwner({
        title: "private-test-title",
        content: "private-test-content",
      })
    ).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });
});
