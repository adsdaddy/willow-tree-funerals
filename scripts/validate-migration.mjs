#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2);
const i=args.indexOf('--base-url');
if(i<0||!args[i+1]){console.error('Usage: node scripts/validate-migration.mjs --base-url https://ACTUAL.up.railway.app [--map migration/media-url-map.json] [--all-media]');process.exit(2);}
const base=new URL(args[i+1]);
if(!['https:','http:'].includes(base.protocol))throw new Error('Invalid target protocol');
const results=[];
async function check(label, pathname, options={}, expected=200, predicate){
  try{
    const response=await fetch(new URL(pathname,base),{redirect:'follow',signal:AbortSignal.timeout(15000),...options});
    const text=await response.text();
    const ok=response.status===expected&&(!predicate||predicate(text,response));
    results.push({label,status:response.status,ok});
  }catch{results.push({label,ok:false,error:'request-failed'});}
}
await check('liveness','/healthz',{},200,(body)=>{try{return JSON.parse(body).status==='ok';}catch{return false;}});
await check('database readiness','/readyz',{},200);
for(const route of ['/','/contact','/pricing','/about','/blog','/services/catholic-funerals','/pre-arrange','/order-flowers','/obituaries','/community-events']){
  await check('route '+route,route,{},200,(body)=>body.includes('id="root"')&&!body.includes('%VITE_')&&!body.includes('This page could not be found (404)'));
}
await check('sitemap','/sitemap.xml',{},200,(text)=>text.includes('willowtreefunerals.com.au'));
await check('robots','/robots.txt',{},200);
await check('unknown API is not SPA','/api/not-a-real-route',{},404,(text,response)=>response.headers.get('content-type')?.includes('application/json'));
// This sends no valid key and no article; verifies only the unauthorized guard.
await check('webhook rejects missing key','/api/blog/webhook',{method:'POST',headers:{'content-type':'application/json'},body:'{}'},401);
const m=args.indexOf('--map');
if(m>=0){
  const mapping=JSON.parse(await fs.readFile(path.resolve(args[m+1]),'utf8'));
  const targets=[...new Set(Object.values(mapping))];
  for(const target of args.includes('--all-media')?targets:targets.slice(0,12)){
    await check('media '+target,target,{},200,(_text,response)=>/^(image\/|font\/|video\/|application\/(font|octet-stream|pdf))/.test(response.headers.get('content-type')||''));
  }
}
console.log(JSON.stringify({checkedAt:new Date().toISOString(),baseUrl:base.origin,passed:results.filter(x=>x.ok).length,failed:results.filter(x=>!x.ok).length,checks:results},null,2));
if(results.some(x=>!x.ok))process.exitCode=1;
