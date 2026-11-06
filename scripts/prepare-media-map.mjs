#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const args=process.argv.slice(2);const at=args.indexOf('--backup'),out=args.indexOf('--output');
if(at<0||out<0||!args[at+1]||!args[out+1]){console.error('Usage: node scripts/prepare-media-map.mjs --backup /path/to/pre-migration --output /path/outside/repo/media-files');process.exit(2);}
const root=path.resolve(args[at+1]),output=path.resolve(args[out+1]);
const manifest=JSON.parse(await fs.readFile(path.join(root,'media/manifest.json'),'utf8'));
await fs.mkdir(output,{recursive:true});await fs.mkdir('migration',{recursive:true});
const mapping={},objects=new Map();
for(const asset of manifest.assets){
  if(!asset.localRelativePath)continue;
  const file=path.resolve(root,asset.localRelativePath);
  if(!file.startsWith(root+path.sep))throw new Error('Unsafe backup path');
  const bytes=await fs.readFile(file);
  const sha=crypto.createHash('sha256').update(bytes).digest('hex');
  if(sha!==asset.sha256)throw new Error('Media checksum mismatch: '+asset.localRelativePath);
  // Preserve historical non-media responses in the full backup, not the R2 bucket.
  if (asset.mime?.startsWith('text/html') || asset.mime?.startsWith('text/plain')) continue;
  const ext=path.extname(file).toLowerCase();
  if(!/^\.(png|jpe?g|webp|gif|svg|avif|ico|woff2?|ttf|otf|mp4|webm|pdf)$/.test(ext))throw new Error('Unsupported media extension '+ext);
  const key=sha+ext;
  if(!objects.has(key)){await fs.copyFile(file,path.join(output,key));objects.set(key,{filename:key,sha256:sha,bytes:bytes.length,mime:asset.mime,originalURLs:[]});}
  objects.get(key).originalURLs.push(asset.originalURL);
  if(/^https?:\/\//.test(asset.originalURL))mapping[asset.originalURL]='/media/'+key;
}
await fs.writeFile('migration/media-url-map.json',JSON.stringify(mapping,null,2)+'\n');
await fs.writeFile('migration/media-objects.json',JSON.stringify({preparedAt:new Date().toISOString(),objects:[...objects.values()],uniqueObjects:objects.size,byteTotal:[...objects.values()].reduce((s,x)=>s+x.bytes,0),mappedURLs:Object.keys(mapping).length},null,2)+'\n');
console.log(JSON.stringify({objects:objects.size,mappedURLs:Object.keys(mapping).length,output}));
