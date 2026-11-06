#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import mysql from 'mysql2/promise';
import { quoteId } from './restore-database.mjs';
import { replaceMedia } from './rewrite-media.mjs';
const args=process.argv.slice(2);const i=args.indexOf('--source');
if(i<0||!args[i+1]||!process.env.TARGET_DATABASE_URL){console.error('Usage: TARGET_DATABASE_URL=<target DB> node scripts/verify-database.mjs --source /path/to/database [--map migration/media-url-map.json]');process.exit(2);}
const source=path.resolve(args[i+1]);
const m=args.indexOf('--map');
const mapping=m>=0?JSON.parse(await fs.readFile(args[m+1],'utf8')):null;
const summary=JSON.parse(await fs.readFile(path.join(source,'database-summary.json'),'utf8'));
const u=new URL(process.env.TARGET_DATABASE_URL);
const conn=await mysql.createConnection({host:u.hostname,port:Number(u.port||3306),user:decodeURIComponent(u.username),password:decodeURIComponent(u.password),database:decodeURIComponent(u.pathname.slice(1)),timezone:'Z',dateStrings:true,supportBigNumbers:true,bigNumberStrings:true,ssl:process.env.DATABASE_SSL==='true'?{rejectUnauthorized:true}:undefined});
const hash=(rows,columns)=>crypto.createHash('sha256').update(JSON.stringify(rows.map(row=>columns.map(col=>row[col]===null?null:Buffer.isBuffer(row[col])?row[col].toString('base64'):String(row[col]))))).digest('hex');
const results=[];
try{
  for(const table of summary.tables){
    const original=JSON.parse(await fs.readFile(path.join(source,table.name+'.json'),'utf8'));
    if(mapping&&table.name==='blog_posts') for(const row of original) for(const key of ['content','imageUrl']) if(typeof row[key]==='string')row[key]=replaceMedia(row[key],mapping);
    const columns=table.columns;const order=table.primaryKey?.length?table.primaryKey:columns.slice(0,1);
    const [target]=await conn.query(`SELECT ${columns.map(quoteId).join(',')} FROM ${quoteId(table.name)} ORDER BY ${order.map(quoteId).join(',')}`);
    const expectedHash=hash(original,columns),actualHash=hash(target,columns);
    results.push({table:table.name,expectedRows:original.length,actualRows:target.length,fullRowHash:actualHash,allColumnsMatch:expectedHash===actualHash});
  }
}finally{await conn.end();}
console.log(JSON.stringify({checkedAt:new Date().toISOString(),mappedMedia:Boolean(mapping),tables:results},null,2));
if(results.some(x=>!x.allColumnsMatch))process.exitCode=1;
