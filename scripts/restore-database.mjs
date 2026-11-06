#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import mysql from 'mysql2/promise';

export const quoteId = (name) => {
  if (!/^[A-Za-z0-9_]+$/.test(name)) throw new Error('Unsafe SQL identifier');
  return '`' + name + '`';
};
export function portableSchema(sql) {
  return sql.replace(/\/\*T![\s\S]*?\*\//g, '')
    .replace(/^\s*DROP TABLE IF EXISTS[^;]+;\s*$/gm, '')
    .replace(/\s+AUTO_RANDOM(?:\(\d+\))?/g, '');
}
export function restoreValue(value) {
  if (value && typeof value === 'object' && value.type === 'Buffer' && value.base64) return Buffer.from(value.base64, 'base64');
  if (value && typeof value === 'object' && value.type === 'Buffer' && Array.isArray(value.data)) return Buffer.from(value.data);
  return value === undefined ? null : value;
}
export async function assertEmptyDatabase(connection) {
  const [tables] = await connection.query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'");
  if (tables.length !== 0) throw new Error('Refusing restore: target database is not empty. Use a fresh database, never overwrite production.');
}
export async function restoreDatabase({source, targetUrl, confirmEmpty, ssl = false}) {
  if (!targetUrl) throw new Error('Set TARGET_DATABASE_URL to the new Railway database, not the old Manus database.');
  if (!confirmEmpty) throw new Error('Restore requires --confirm-empty. It creates tables and inserts data only in an empty target.');
  const summary = JSON.parse(await fs.readFile(path.join(source, 'database-summary.json'), 'utf8'));
  const schema = portableSchema(await fs.readFile(path.join(source, 'schema.sql'), 'utf8'));
  const tables = summary.tables;
  if (!Array.isArray(tables) || !tables.length) throw new Error('No tables in source summary');
  for (const table of tables) quoteId(table.name);
  // Validate and read every file before creating anything on the target.
  const datasets = [];
  for (const table of tables) {
    const rows = JSON.parse(await fs.readFile(path.join(source, table.name + '.json'), 'utf8'));
    if (!Array.isArray(rows) || rows.length !== table.rows) throw new Error('Source row count mismatch: ' + table.name);
    const columns = table.insertColumns || table.columns;
    columns.forEach(quoteId);
    datasets.push({table, rows, columns});
  }
  const url = new URL(targetUrl);
  const connection = await mysql.createConnection({host:url.hostname, port:Number(url.port || 3306),user:decodeURIComponent(url.username),password:decodeURIComponent(url.password),database:decodeURIComponent(url.pathname.slice(1)), timezone:'Z',dateStrings:true,multipleStatements:true, ssl:ssl ? {rejectUnauthorized:true} : undefined});
  try {
    await assertEmptyDatabase(connection);
    await connection.query("SET time_zone = '+00:00'");
    // DDL commits in MySQL. If this stage fails, discard only this fresh target
    // database and retry on a new empty target; never auto-drop tables.
    await connection.query(schema);
    await connection.beginTransaction();
    try {
      for (const {table, rows, columns} of datasets) {
        const placeholders = columns.map(() => '?').join(',');
        const statement = `INSERT INTO ${quoteId(table.name)} (${columns.map(quoteId).join(',')}) VALUES (${placeholders})`;
        for (const row of rows) await connection.execute(statement, columns.map(column => restoreValue(row[column])));
      }
      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    }
    const verified = [];
    for (const {table} of datasets) {
      const [rows] = await connection.query(`SELECT COUNT(*) AS count FROM ${quoteId(table.name)}`);
      if (Number(rows[0].count) !== table.rows) throw new Error('Restored count mismatch: ' + table.name);
      verified.push({name:table.name,rows:table.rows});
    }
    return {restoredAt:new Date().toISOString(),tables:verified};
  } finally { await connection.end(); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const i = args.indexOf('--source');
  if (i < 0 || !args[i+1]) { console.error('Usage: TARGET_DATABASE_URL=<new DB> node scripts/restore-database.mjs --source /path/to/database --confirm-empty'); process.exit(2); }
  try {
    console.log(JSON.stringify(await restoreDatabase({source:path.resolve(args[i+1]),targetUrl:process.env.TARGET_DATABASE_URL,confirmEmpty:args.includes('--confirm-empty'),ssl:process.env.DATABASE_SSL === 'true'}),null,2));
  } catch (error) { console.error('Restore failed: ' + (error.code || error.message)); process.exitCode=1; }
}
