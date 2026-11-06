import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import { createPool, type Pool, type PoolOptions } from "mysql2/promise";

let database: MySql2Database | null = null;
let pool: Pool | null = null;

/**
 * DATABASE_SSL=true enables certificate-verified TLS; false permits plain MySQL.
 * With no flag, TiDB Cloud uses TLS and ordinary MySQL uses its usual plain
 * connection. URL query options cannot override the explicit TLS policy.
 */
export function getDatabaseOptions(
  databaseUrl: string,
  sslFlag: string | undefined = process.env.DATABASE_SSL
): PoolOptions {
  const url = new URL(databaseUrl);
  if (url.protocol !== "mysql:" || !url.hostname || !url.pathname.slice(1)) {
    throw new Error("DATABASE_URL must be a MySQL URL with a database name");
  }
  if (sslFlag !== undefined && sslFlag !== "true" && sslFlag !== "false") {
    throw new Error("DATABASE_SSL must be true or false");
  }
  const useTls =
    sslFlag === undefined
      ? url.hostname.endsWith(".tidbcloud.com")
      : sslFlag === "true";
  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.slice(1)),
    ...(useTls ? { ssl: { rejectUnauthorized: true } } : {}),
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 100,
    connectTimeout: 5000,
    enableKeepAlive: true,
    multipleStatements: false,
  };
}

// Pool construction is lazy and does not make a database query.
export async function getDb() {
  if (!database && process.env.DATABASE_URL) {
    try {
      pool = createPool(getDatabaseOptions(process.env.DATABASE_URL));
      database = drizzle(pool);
    } catch {
      // Raw driver errors can include connection strings and credentials.
      console.error("[Database] Invalid connection configuration");
      database = null;
      pool = null;
    }
  }
  return database;
}

/** Read-only readiness probe: checks connectivity rather than just configuration. */
export async function isDatabaseReady(): Promise<boolean> {
  try {
    if (!(await getDb()) || !pool) return false;
    await pool.query({ sql: "SELECT 1", timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

export async function closeDatabase(): Promise<void> {
  const current = pool;
  pool = null;
  database = null;
  if (current) await current.end();
}
