#!/usr/bin/env node
/**
 * Apply the SQL migrations in ./drizzle to the database in DATABASE_URL.
 *
 * Uses drizzle-orm's runtime migrator (no drizzle-kit needed), so it works
 * inside the production Docker image:  node scripts/migrate.mjs
 */
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import path from "node:path";
import { fileURLToPath } from "node:url";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const migrationsFolder = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "drizzle"
);

const connection = await mysql.createConnection(url);
const db = drizzle(connection);

console.log(`Applying migrations from ${migrationsFolder} ...`);
await migrate(db, { migrationsFolder });
console.log("Migrations applied.");

await connection.end();
