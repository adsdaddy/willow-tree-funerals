import test from 'node:test';
import assert from 'node:assert/strict';
import { quoteId, portableSchema, restoreValue, assertEmptyDatabase, restoreDatabase } from './restore-database.mjs';
import { replaceMedia, MEDIA_UPDATE_SQL } from './rewrite-media.mjs';

test('SQL identifiers reject injection',()=>{
  assert.equal(quoteId('blog_posts'),'`blog_posts`');
  assert.throws(()=>quoteId('users; DROP TABLE users'),/Unsafe/);
});
test('schema removes destructive drops and TiDB-only markers',()=>{
  const sql='DROP TABLE IF EXISTS `users`;\nCREATE TABLE `users` (`id` int /*T![clustered_index] CLUSTERED */);';
  const result=portableSchema(sql);assert.ok(!result.includes('DROP TABLE'));assert.ok(!result.includes('T!'));assert.ok(result.includes('CREATE TABLE'));
});
test('empty-database safety guard refuses existing data',async()=>{
  await assert.rejects(()=>assertEmptyDatabase({query:async()=>[[{table:'blog_posts'}]]}),/not empty/);
  await assertEmptyDatabase({query:async()=>[[]]});
});
test('restore requires explicit target and confirmation before reading files',async()=>{
  await assert.rejects(()=>restoreDatabase({source:'/not-real',targetUrl:'',confirmEmpty:true}),/TARGET_DATABASE_URL/);
  await assert.rejects(()=>restoreDatabase({source:'/not-real',targetUrl:'mysql:\/\/example.invalid',confirmEmpty:false}),/confirm-empty/);
});
test('binary restoration preserves bytes',()=>{
  assert.deepEqual(restoreValue({type:'Buffer',base64:'YWJj'}),Buffer.from('abc'));
  assert.equal(restoreValue(undefined),null);
});
test('media replacement covers repeated literals without regex interpretation',()=>{
  const map={'https://cdn.example.test/a.png?x=1':'/media/a-hash.png'};
  assert.equal(replaceMedia('https://cdn.example.test/a.png?x=1 https://cdn.example.test/a.png?x=1',map),'/media/a-hash.png /media/a-hash.png');
});
test('longest URL is replaced first and path traversal rejected',()=>{
  const map={'https://cdn.test/a':'/media/short.png','https://cdn.test/a.png':'/media/long.png'};
  assert.equal(replaceMedia('https://cdn.test/a.png',map),'/media/long.png');
  assert.throws(()=>replaceMedia('x',{'x':'/media/../secure/key'}),/Unsafe/);
});
test('media updates explicitly preserve original updatedAt',()=>{
  assert.equal(MEDIA_UPDATE_SQL, 'UPDATE blog_posts SET content=?, imageUrl=?, updatedAt=? WHERE id=?');
});
