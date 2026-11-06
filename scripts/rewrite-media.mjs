#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import mysql from 'mysql2/promise';

export const MEDIA_UPDATE_SQL = 'UPDATE blog_posts SET content=?, imageUrl=?, updatedAt=? WHERE id=?';
export function replaceMedia(text, mapping) {
  let result = text;
  for (const [original, target] of Object.entries(mapping).sort((a,b) => b[0].length - a[0].length)) {
    if (!target.startsWith('/media/') || !/^\/media\/[A-Za-z0-9._-]+$/.test(target)) throw new Error('Unsafe media target');
    result = result.split(original).join(target);
  }
  return result;
}
async function rewriteSource(root, mapping) {
  let modified = 0;
  for (const base of ['client','shared']) {
    async function walk(dir) {
      for (const entry of await fs.readdir(dir,{withFileTypes:true})) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) { if (!entry.name.startsWith('.')) await walk(file); continue; }
        if (!/\.(tsx?|jsx?|css|html|json|xml|md)$/.test(file)) continue;
        const old = await fs.readFile(file,'utf8'); const next = replaceMedia(old,mapping);
        if (old !== next) { await fs.writeFile(file,next); modified++; }
      }
    }
    await walk(path.join(root,base));
  }
  return modified;
}
async function rewriteDatabase(targetUrl, mapping) {
  if (!targetUrl) throw new Error('Missing TARGET_DATABASE_URL: never default to the original DATABASE_URL.');
  const url=new URL(targetUrl);
  const conn=await mysql.createConnection({host:url.hostname,port:Number(url.port||3306),user:decodeURIComponent(url.username),password:decodeURIComponent(url.password),database:decodeURIComponent(url.pathname.slice(1)),timezone:'Z',ssl:process.env.DATABASE_SSL==='true'?{rejectUnauthorized:true}:undefined});
  try {
    const [posts]=await conn.query('SELECT id, content, imageUrl, updatedAt FROM blog_posts');
    let modified=0;
    await conn.beginTransaction();
    try {
      for(const post of posts){
        const content=replaceMedia(post.content||'',mapping);const imageUrl=replaceMedia(post.imageUrl||'',mapping);
        if(content!==post.content||imageUrl!==post.imageUrl){
          await conn.execute(MEDIA_UPDATE_SQL,[content,imageUrl,post.updatedAt,post.id]);modified++;
        }
      }
      await conn.commit();
    }catch(error){await conn.rollback();throw error;}
    return modified;
  }finally{await conn.end();}
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  const args=process.argv.slice(2);const at=args.indexOf('--map');
  if(at<0||!args[at+1]){console.error('Usage: node scripts/rewrite-media.mjs --map migration/media-url-map.json --source-root . [--database --confirm-target]');process.exit(2);}
  try{
    const mapping=JSON.parse(await fs.readFile(args[at+1],'utf8'));
    const i=args.indexOf('--source-root');let files=0,rows=0;
    if(i>=0) files=await rewriteSource(path.resolve(args[i+1]),mapping);
    if(args.includes('--database')){
      if(!args.includes('--confirm-target'))throw new Error('Database rewrite requires --confirm-target after restoring and verifying the new target database.');
      rows=await rewriteDatabase(process.env.TARGET_DATABASE_URL,mapping);
    }
    console.log(JSON.stringify({sourceFilesRewritten:files,targetBlogRowsRewritten:rows}));
  }catch(error){console.error('Media rewrite failed: '+(error.code||error.message));process.exitCode=1;}
}
