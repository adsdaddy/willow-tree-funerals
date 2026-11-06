import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  closeDatabase,
  getDatabaseOptions,
  getDb,
  isDatabaseReady,
} from "./db";

const { query, end, createPool, drizzle } = vi.hoisted(() => {
  const query = vi.fn();
  const end = vi.fn().mockResolvedValue(undefined);
  const createPool = vi.fn(() => ({ query, end }));
  const drizzle = vi.fn(() => ({ mockedDatabase: true }));
  return { query, end, createPool, drizzle };
});
vi.mock("mysql2/promise", () => ({ createPool }));
vi.mock("drizzle-orm/mysql2", () => ({ drizzle }));

beforeEach(async () => {
  await closeDatabase();
  vi.clearAllMocks();
  vi.stubEnv(
    "DATABASE_URL",
    "mysql://test-user:test-password@db.example.com:3307/test_db"
  );
  vi.stubEnv("DATABASE_SSL", "false");
  query.mockResolvedValue([[{ "1": 1 }], []]);
});
afterEach(async () => {
  await closeDatabase();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("portable MySQL configuration", () => {
  it("parses URL-encoded connection details for ordinary MySQL", () => {
    const options = getDatabaseOptions(
      "mysql://test%40user:test%3Apassword@db.example.com:3307/test_db",
      "false"
    );
    expect(options).toMatchObject({
      host: "db.example.com",
      port: 3307,
      user: "test@user",
      password: "test:password",
      database: "test_db",
      multipleStatements: false,
    });
    expect(options.ssl).toBeUndefined();
  });
  it("enables verified TLS explicitly on any MySQL host", () => {
    expect(
      getDatabaseOptions("mysql://test:test@db.example.com/db", "true").ssl
    ).toEqual({ rejectUnauthorized: true });
  });
  it("uses secure TLS automatically for TiDB Cloud when flag is absent", () => {
    vi.unstubAllEnvs();
    const previous = process.env.DATABASE_SSL;
    delete process.env.DATABASE_SSL;
    try {
      expect(
        getDatabaseOptions("mysql://test:test@gateway.example.tidbcloud.com/db")
          .ssl
      ).toEqual({ rejectUnauthorized: true });
      expect(
        getDatabaseOptions("mysql://test:test@ordinary.example.com/db").ssl
      ).toBeUndefined();
    } finally {
      if (previous !== undefined) process.env.DATABASE_SSL = previous;
    }
  });
  it("URL query flags cannot disable certificate verification", () => {
    expect(
      getDatabaseOptions(
        'mysql://test:test@db.example.com/db?ssl={"rejectUnauthorized":false}',
        "true"
      ).ssl
    ).toEqual({ rejectUnauthorized: true });
  });
  it.each(["1", "yes", "invalid", ""])(
    "rejects invalid explicit TLS flag %s",
    flag => {
      expect(() =>
        getDatabaseOptions("mysql://test:test@db.example.com/db", flag)
      ).toThrow("DATABASE_SSL");
    }
  );
  it.each([
    "postgres://test:test@db.example.com/db",
    "mysql://test:test@db.example.com/",
  ])("rejects unsupported database URLs", url => {
    expect(() => getDatabaseOptions(url, "false")).toThrow("DATABASE_URL");
  });
});

describe("database readiness", () => {
  it("creates a lazy pool once without issuing a query", async () => {
    await getDb();
    await getDb();
    expect(createPool).toHaveBeenCalledOnce();
    expect(drizzle).toHaveBeenCalledOnce();
    expect(query).not.toHaveBeenCalled();
  });
  it("checks connectivity using only SELECT 1", async () => {
    await expect(isDatabaseReady()).resolves.toBe(true);
    expect(query).toHaveBeenCalledWith({ sql: "SELECT 1", timeout: 5000 });
  });
  it("fails readiness without a DATABASE_URL and does not construct a pool", async () => {
    vi.stubEnv("DATABASE_URL", "");
    await expect(isDatabaseReady()).resolves.toBe(false);
    expect(createPool).not.toHaveBeenCalled();
  });
  it("fails readiness without leaking credentials on a connection failure", async () => {
    query.mockRejectedValue(new Error("private credentials"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(isDatabaseReady()).resolves.toBe(false);
    expect(log).not.toHaveBeenCalled();
  });
  it("does not print raw invalid connection strings", async () => {
    vi.stubEnv("DATABASE_URL", "private-invalid-url-with-test-password");
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(getDb()).resolves.toBeNull();
    expect(log).toHaveBeenCalledWith(
      "[Database] Invalid connection configuration"
    );
  });
});
