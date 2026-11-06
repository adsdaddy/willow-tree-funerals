# Willow Tree Funerals: permanent off-Manus migration handover

Prepared on 6 November 2026. **Status: migration preparation, not a completed move.** Railway, Resend, Cloudflare DNS and R2 production setup and traffic cutover remain pending. Provider access, exact deployment records, final backup evidence and production acceptance must be supplied or verified by the next operator. Do not describe the site as moved or live on the new stack until the acceptance gates below pass.

The required destination is the client-controlled GitHub repository, a portable Node application and MySQL database on Railway, Resend-only transactional email, and Cloudflare DNS with R2 media storage. Public visitors must not depend on Manus login, storage proxies, analytics, maps proxies or other platform runtime services.

## Verified preparation status

The fresh snapshot is complete at `2026-11-06T07:17:02.392Z` UTC: 122 published database blog rows, one user and two migration records. Independent local MariaDB restore and full-column verification passed before and after the media URL transformation, preserving article timestamps. TypeScript, production build, 132 mocked application tests and eight migration-tool tests passed. Production-mode local smoke testing with all Manus credentials absent passed 451 read-only checks. The prepared public R2 media set contains 439 content-addressed files mapped from 573 remote URLs. See `docs/VERIFICATION-REPORT.md` for scope and evidence.

Read `docs/MEDIA-EXCEPTIONS.md`: seven broad-scan candidates failed, with four external PDF citations still without archived bytes. The one obsolete Open Graph JPEG has been explicitly replaced with the preserved current homepage WebP. Dynamic tracking and an unused documentation image are not lost website media. Future ingestion media rehosting remains an operational policy to implement, not an automation already configured.

The GitHub release is confirmed at https://github.com/adsdaddy/willow-tree-funerals/releases/tag/migration-2026-11-06-prepared . The public and encrypted archives were independently downloaded and their SHA-256 values matched. Read `docs/DELIVERY-RECORD.md` for exact published artifacts, Drive IDs and successful container CI. The tested code/artifact commit is `c7b5c16f27d9427c3b266571c7ff2670afac59ef`; later documentation-only updates do not change that archived code. Recoverable files use `willow-tree-funerals-public-handover-20261106.tar.gz`, `willow-tree-funerals-full-20261106.tar.gz.age` and `willow-tree-funerals-migration-20261106.sha256`. Restricted Drive also holds the plaintext full archive and `willow-tree-funerals-recovery-20261106.key.txt` separately. Read `docs/ENCRYPTED-RECOVERY.md` before decrypting. Do not substitute September data or expose the key.


## 1. What is safe, what is failing, and where to resume

The preparation research recorded generic Manus Space HTTP 404 responses at all three investigated hosted addresses on 6 November at approximately 06:58 UTC. The underlying cause is unproven. Do not assume an expired subscription, deleted project, DNS fault or missing source. The local original source at checkpoint `5bb0b903` is available. Source availability does not prove that all remote media have been recovered.

The repository is now **PUBLIC**: [adsdaddy/willow-tree-funerals](https://github.com/adsdaddy/willow-tree-funerals). Use branch `migration/railway-resend-cloudflare-20261106`. Do not reset it to an older backup, overwrite the original checkpoint, force-push, merge to the production branch or enable automatic production deployment without the owner's approval. Pin the final reviewed preparation commit before deploying.

The local preparation checkout is `/home/ubuntu/migrations/willow-tree-funerals-20261106/app`. The local plan is `/home/ubuntu/migrations/willow-tree-funerals-20261106/PLAN.md`, with research notes in `/home/ubuntu/migration-research/sources.md`. The `app` folder is the local Git checkout; it is not automatically a subfolder named `app` inside the remote repository. Determine Railway's source root from the actual repository layout.

Original baseline preservation is the [September final3 release](https://github.com/adsdaddy/willow-tree-funerals/releases/tag/backup-2026-09-04-final3). Keep it unchanged. Its public tar SHA-256 recorded in the research is `4220779062eb7ca0f4815ed6370b1b48939a22ce3948dc09496cc4f3bffca221`. This historical backup had 90 database blog records and is not the current migration restore source.

Restricted recovery storage is the [designated Google Drive folder](https://drive.google.com/drive/folders/1MJAK__sJXJecS0xKkgVGN4PtD_ZPuTTS), under `AV - Second Brain / 00_Second_Brain/A_Obsidian_Vault/Ventures/Heavenly-Marketing/departments/client-services/active/Willow-Tree-Funerals/website-backup`. The folder ID is `1MJAK__sJXJecS0xKkgVGN4PtD_ZPuTTS`. The historical final3 full archive ID is `1lM7GwKsIF4AL9TPlcQ7Acr4qO3EmT118`. Do not assume that historical file contains the November snapshot.

The prepared release is published as `migration-2026-11-06-prepared` with sanitized preservation artifacts, an approved encrypted recovery archive and checksums. Its publication, asset names, hashes, new Drive IDs and decryption recovery must be verified, not inferred from the proposed tag. Record the confirmed preparation commit and immutable artifact links in the delivery record.

## 2. Preservation contract and evidence still required

A live database query on 6 November at approximately 07:09 UTC recorded **122 current `blog_posts` rows**, compared with 90 in September. The consistent fresh export confirms 122 records at the timestamp above. A later controlled-cutover snapshot can legitimately contain more than 122. Never force a newer source back to 122 or substitute September's 90 rows. Record the snapshot time, table counts, latest update time and hash alongside the export.

Preserve all application source, migration history, build and lock files, four source-defined static articles, database blog records, local public assets and all referenced fonts, images and video. Database and static article counts are separate: do not claim 126 distinct published URLs without checking slug overlap, routing precedence and publication state. Preserve blog IDs, slugs, dates, publication flags, metadata, JSON-LD comments and body content rather than rebuilding them from rendered HTML.

The database research found `__drizzle_migrations`, `blog_posts` and `users`. Preserve every source table in the restricted full snapshot, including original user rows and migration state. **Preserved users are not migrated admin credentials.** Keep users, private configuration, credentials and any personal data out of the public repository and plaintext public releases. Review even a blog-only export for material that is not intended to be public.

Keep original/private configuration only in the restricted Drive recovery set. A public source archive must contain safe examples, never actual secret values. Any approved public encrypted full-recovery artifact requires authenticated encryption, a separately restricted recovery key and a tested decryption procedure. Do not publish its key, an unencrypted inner archive, database users or original configuration. If ownership or encryption safety is unclear, store the full archive only in restricted Drive.

The preservation set needs a machine-readable assets manifest and the prepared URL map, planned as `migration/media-url-map.json`. For each recovered object, retain its original reference, local path, destination object key, byte size, MIME type and SHA-256. Record failed URLs and reasons explicitly. Preserve downloaded bytes and original filenames where safe; resolve basename collisions deterministically rather than silently overwriting a different object. Inspect references in HTML, CSS, `srcset`, font preloads, favicons, JSON-LD, Open Graph fields, video posters, static articles and database Markdown/HTML, not only homepage images.

**Local preservation verification completed:** consistent export counts/timestamps, historical bytes, local restore reconciliation, source scan and media object hashes. **External publication verification:** see the final delivery record for archive checksums, Drive IDs, release assets and decryption checks. A downloaded file count alone is not evidence that every referenced asset works. Any unresolved media must remain in a named exception list and block a claim of full preservation.

Keep the historical deletion of `vek-ritual-com-ua-alternatives-3`: do not resurrect it from September, a retry queue or a static fallback. Confirm its authoritative source state and preserve its deletion/tombstone or exclusion rule. `graalenet-alternatives` is suspect content, not an authorized deletion; preserve it pending separate editorial review. Existing TLDR Summary and missing-blog-image improvements may not be present at the recovered checkpoint. They are a separate unfinished backlog, not work completed by this migration.

## 3. Ownership, access and authorization

The client or nominated owner must control the GitHub organization/repository, Railway project and billing, database, Resend organization and sender domain, Cloudflare account/zone/R2 bucket, babylovegrowth integration and restricted backup folder. Use client-owned accounts with named operator access, not a contractor's personal account. Document recovery owners and remove temporary broad permissions after acceptance.

Railway, Cloudflare and R2 credentials are not available in the preparation task. Do not create paid services, buy plans, change DNS or nameservers, send real enquiry emails, rotate active production integrations, delete the old project or route traffic merely because the code is prepared. Obtain explicit approval for service costs and the precise final DNS change set. Access authorization is not blanket permission to incur costs or mutate production.

Request secrets through the authorized secret manager or protected provider variable UI. Do not ask the user to put keys in chat, commits, screenshots, scripts or public release descriptions. Create scoped client-owned external provider credentials for the destination. Rotate externally controlled Resend, R2, database and webhook credentials at coordinated points; do not attempt to rotate or reuse platform-owned `BUILT_IN_FORGE_*`, `VITE_FRONTEND_FORGE_*` or Manus OAuth credentials.

Public browsing needs no login. With Manus OAuth removed or unconfigured, protected admin routes and write procedures must fail closed. Do not manufacture an owner session, default admin password, public admin bypass or migrated OAuth identity. A replacement admin identity provider and credential handover require their own authorized implementation and verification.

## 4. Portable runtime and Railway Dashboard settings

The target build is pinned to Node 22 and the lockfile's pnpm 10.4.1. Install reproducibly with `pnpm install --frozen-lockfile`, run `pnpm check`, mocked `pnpm test` and `pnpm build`, then start the built server with `node dist/index.js` under `NODE_ENV=production`. The production server must bind `0.0.0.0` and honor Railway's injected `PORT`, not a development port scanner or Vite development server.

Use the root file named exactly `Dockerfile`. Railway auto-detects that file at the configured source root. Dashboard build logs must confirm the detected Dockerfile. Build-time variables consumed by Vite need `ARG` declarations in the Docker build stage where they are consumed. Runtime secrets must not be embedded in build arguments or frontend bundles. [1]

**Do not create a `railway.json` or `railway.toml` recipe for this new service.** Railway's official notice says new services cannot opt into Config as Code and existing users have a hard cutoff on 1 December 2026. This handover uses Dockerfile plus Dashboard settings. Any future `.railway/railway.ts` infrastructure-as-code implementation must be grounded in the then-current official schema and tested separately. [2]

After owner approval, configure the Railway web service as follows:

1. Connect the reviewed GitHub repository and branch `migration/railway-resend-cloudflare-20261106`, or its reviewed release commit. Use source root `/` if the Dockerfile is at repository root. Verify the actual tree before setting a different directory.
2. Leave Dockerfile auto-detection enabled. Leave Dashboard build-command override unset so the Dockerfile owns dependency installation and compilation. Leave start-command override unset if the Dockerfile already runs `node dist/index.js`; otherwise set that exact production command.
3. Set runtime variables before deployment. Set `NODE_ENV=production`. Let Railway inject `PORT`; set the domain target port to the actual listening port. Do not bind to `127.0.0.1`.
4. Set the healthcheck path to `/readyz` if the prepared endpoint verifies database readiness. Use a 120-second deployment healthcheck timeout initially. If only `/healthz` exists, inspect its implementation: process-only success does not prove database availability. Require a separate database/API check before acceptance. Do not use `/` as proof that the database restored. Railway activates a new deployment after a successful configured check, but does not continuously monitor that endpoint afterward. [3]
5. Keep automatic production promotion disabled until backups, restore, mail and acceptance pass. Configure restart behavior and resource limits within the approved plan. Do not put restore or destructive schema commands in a recurring start or pre-deploy hook.
6. Generate a Railway-provided domain for isolated acceptance first. Record the actual URL and deployment ID; do not invent a hostname or publish a placeholder as live.

Add the approved MySQL service in the same Railway project and environment. Its private connection variable is `MYSQL_URL`. For a service actually named `MySQL`, configure the application variable as `DATABASE_URL=${{MySQL.MYSQL_URL}}`. Adjust only the service name if the real service is different. Private DNS is available inside that Railway project/environment, not from a laptop or this sandbox. [4]

For an external restore, explicitly approve temporary database public access/TCP Proxy and use the dashboard's `MYSQL_PUBLIC_URL` as the operator's `TARGET_DATABASE_URL`. This connection can incur network egress costs. Do not paste a private `*.railway.internal` URL into a laptop restore command. Remove temporary public access and revoke temporary restore credentials after verification; the application continues using the private URL. [4]

## 5. Required application variables

Use the prepared example/configuration files and actual server contracts as the final names. Do not store real values in this document.

```dotenv
NODE_ENV=production
DATABASE_URL=${{MySQL.MYSQL_URL}}
RESEND_API_KEY=<client-owned scoped key>
EMAIL_FROM="Willow Tree Funerals Website <website@notify.willowtreefunerals.com.au>"
EMAIL_TO=director@willowtreefunerals.com.au
BLOG_API_KEY=<new secret enabled at controlled webhook cutover>
MEDIA_PUBLIC_BASE_URL=https://media.willowtreefunerals.com.au
```

`MEDIA_LOCAL_DIR` is the offline alternative for recovered files when `MEDIA_PUBLIC_BASE_URL` is unset. It must point to a real recovered media directory available to the local runtime. Production R2 is the durable media home; a container's writable filesystem is not a durable backup.

Set `VITE_GA4_MEASUREMENT_ID=G-ZPSZ3KQRF4` at build time. Preserve Google Ads account tag `AW-16467075039` in the prepared tracking implementation, using the actual build-variable name if the migration makes it configurable. Preserve `Ads_Phone_Call_Click`, `Ads_Form_Submit` and `Ads_WhatsApp_Click` exactly, with their existing parameter semantics and relevant legacy events. Do not invent conversion labels or assert that account-level tag firing alone proves an Ads conversion was recorded. Existing conversion imports/labels must be verified in the owner's Analytics/Ads accounts.

No Meta Pixel ID has been verified. Leave `VITE_META_PIXEL_ID` unset unless the owner supplies a verified existing ID. Preserve legitimate tracking behavior without bringing back Manus analytics endpoints or proxy keys. Frontend `VITE_*` values are public and compiled at build time: changing a runtime variable alone will not update the already-built browser bundle.

## 6. Restore only into a fresh empty target

The operator commands below are implemented in this branch. Read them and verify the checked-out commit before running them. No command here is authorization to write the original database.

```bash
# Work from the reviewed destination checkout.
# Inject TARGET_DATABASE_URL securely for the NEW target only.
node scripts/restore-database.mjs --source /absolute/path/to/fresh-export --confirm-empty
node scripts/verify-database.mjs --source /absolute/path/to/fresh-export

# Rewrite a working copy, not original preserved source or original database.
node scripts/rewrite-media.mjs --map migration/media-url-map.json --source-root .

# Only after the fresh target restore has been reconciled.
# TARGET_DATABASE_URL must still identify the new Railway database.
node scripts/rewrite-media.mjs --map migration/media-url-map.json --database --confirm-target

# Upload only the recovered public media directory using approved R2 credentials.
bash scripts/upload-media-r2.sh /absolute/path/to/recovered-media

# Validate the actual isolated target URL.
node scripts/validate-migration.mjs --base-url https://ACTUAL-RAILWAY-PREVIEW-HOST --map migration/media-url-map.json --all-media
```

Before the first restore, inspect the target identity and all existing application tables. The restore must refuse a populated target; `--confirm-empty` confirms a verified empty target, not permission to truncate one. Separate source and target credentials. Never point `TARGET_DATABASE_URL` to Manus, run blanket `DROP`/`TRUNCATE`, or rerun a baseline restore over a populated destination.

Use the fresh full export rather than September final3. Review the MySQL-compatible schema for `utf8mb4`, appropriate indexes, defaults, types and preserved IDs. Preserve the original TiDB export unchanged. Strip or convert TiDB-specific options and executable version comments only in a working conversion copy when needed for MySQL compatibility. Do not blindly execute provider-specific SQL or replace unfamiliar schema options without reviewing the generated result.

After restore, compare every table's count, blog ID/slug sets, publication state, latest timestamps, content/metadata digests and representative records. Check the four static article routes and any collisions separately. Record deliberate media URL changes as transformations; unrelated content or timestamp changes are not an acceptable side effect. Verify that the deleted slug stays absent/unpublished and the suspect article is not silently removed.

A DB-write media rewrite must touch only the new target and only URLs present in the reviewed map. Preserve the original export and pre-rewrite target backup. Review a diff/report and unresolved references before accepting the rewrite. A source rewrite must operate on a working migration copy so the independent original source remains recoverable.

## 7. R2 media and stable URLs

Create the approved R2 bucket in the same Cloudflare account as the `willowtreefunerals.com.au` zone. Use its supported bucket Custom Domains flow for `media.willowtreefunerals.com.au`. That flow adds a DNS record and therefore requires DNS approval. R2 buckets are private by default. `r2.dev` is development-only and rate-limited, and a CNAME from the production media host to `r2.dev` is unsupported. [5]

The prepared application already maps original media references to `/media/FILENAME`. With `MEDIA_PUBLIC_BASE_URL` set, its server redirects those requests to the corresponding R2 object. Without that variable, `MEDIA_LOCAL_DIR` serves the recovered offline files. Confirm that the map, local filenames, R2 object keys and redirect path agree, including URL encoding, case and collision handling. No production request may depend on an expiring original Manus/CloudFront asset link.

The upload helper must use scoped R2 credentials from a secure environment. The official S3-compatible endpoint is `https://ACCOUNT_ID.r2.cloudflarestorage.com`; obtain the actual account ID from the owner. Use `rclone copy`, not `sync`, `delete` or a purge command. Configure `no_check_bucket=true` when an object-level token requires it. Non-destructive copy does not excuse key collisions, so verify the manifest before uploading. [6]

Apply `migration/r2-cors-dashboard.json` in the bucket CORS Dashboard, adding the actual Railway preview origin temporarily for acceptance. Confirm byte totals, per-object checksums, MIME types and successful GET/HEAD responses on the real media host. Test with an `Origin` request header to see CORS response headers. Verify cross-origin font loading, video playback/range requests, image `srcset` and Open Graph assets. Use immutable cache headers only for immutable versioned media keys and hashed build assets. When bytes change, publish a new key rather than replacing an indefinitely cached object. Keep private configuration, users, SQL and full backup archives out of the public media bucket.

## 8. Resend-only email without disturbing the mailbox

The former implementation used Postmark as primary with Resend/SMTP fallbacks. The destination requirement supersedes that arrangement: **Resend only**. Verify the built server no longer requires Postmark, SMTP or Manus owner-notification services. Missing Resend configuration or a rejected delivery must fail explicitly rather than display a successful enquiry receipt while silently dropping mail.

In the client-owned Resend account, add and verify `notify.willowtreefunerals.com.au`. Resend requires an owned verified sender domain and recommends subdomains to isolate sender reputation. Use the exact verification records shown in the real Resend Dashboard; do not fabricate DNS selectors, values or regions. [7]

Only after that subdomain is verified, use `EMAIL_FROM='Willow Tree Funerals Website <website@notify.willowtreefunerals.com.au>'` and `EMAIL_TO=director@willowtreefunerals.com.au`. `onboarding@resend.dev` is not the production sender. Keep enquiry visitor email in a validated Reply-To field rather than spoofing it as From.

**Preserve all existing root mailbox MX, SPF, DKIM and DMARC records absolutely.** Export current DNS before changes. Transactional-sender verification is not permission to replace the root mailbox MX, create a competing root SPF policy, overwrite existing DKIM selectors or weaken DMARC. Add only the owner-approved Resend subdomain records; stop and resolve any exact-name collision with the mailbox administrator.

Mock all preparation email tests. After owner approval, run clearly labeled controlled tests for contact, pre-arrangement, flower enquiry and every other implemented mail path. Confirm provider acceptance, real receipt at the intended mailbox, From/Reply-To, delivery errors and DNS authentication results. Store message IDs and acceptance evidence privately without unnecessary personal data. A mocked unit test is not proof of real delivery.

## 9. Babylovegrowth ingestion and the fresh-snapshot cutover

The destination remains `POST https://willowtreefunerals.com.au/api/blog/webhook`, with JSON and `Authorization: Bearer <BLOG_API_KEY>`. Preserve the existing payload contract and publication metadata. Missing key, wrong key, invalid payload or unavailable database must not report success. Review and test the destination implementation before updating babylovegrowth.

The 122-row preparation snapshot is not a permanent freeze. The old database or provider retry queue can contain later posts by the time cutover happens. Coordinate a short publishing/ingestion freeze with the owner and babylovegrowth operator before taking the final authoritative snapshot. Record its timestamp and all in-flight, failed and pending webhook deliveries. Freeze both automated and manual old write paths, not just page access. Do not destroy old credentials or state before capturing recoverable evidence.

Then take and verify the final fresh export. If the destination is still empty, restore that authoritative export. If a preparation baseline was already restored, back it up and either use a separately approved fresh empty replacement target or apply a reviewed delta reconciliation. Do not bypass the empty-target guard to overwrite it. Account for every new, updated, deleted and unpublished record after the earlier snapshot.

Once the target is ready, install a newly generated scoped `BLOG_API_KEY` and update the provider's endpoint/key together in the approved window. Never rotate the active old key early and strand deliveries. Confirm new authenticated ingestion on the destination, then revoke/disable the old write path and resume publishing. Keep the freeze short and explicit, with one authoritative writer at every stage.

Inspect the provider's actual retry/replay controls and retained failed deliveries; do not assume automatic replay or invent its retention policy. Replay approved failed payloads from the outage/freeze window in recorded order. The existing webhook uses slug-based upsert, so a duplicate can avoid an extra row but an older payload may overwrite a newer article. Compare timestamps/content before replay and quarantine stale versions. Exclude the deleted `vek-ritual-com-ua-alternatives-3` from replay. Verify delivery IDs, unique slugs and final counts after reconciliation. Synthetic test posts must not pollute the production restore or be deleted without approval.

## 10. Web DNS, certificates and Cloudflare behavior

Before changing anything, record current nameservers and export all zone records, TTLs, proxy flags, redirects, TLS and WAF/cache settings. Confirm the zone is client-owned and already in the intended Cloudflare account. Moving nameservers, if needed, is a separately approved operation with a full record-by-record mailbox-preserving plan.

Bind both `willowtreefunerals.com.au` and `www.willowtreefunerals.com.au` as Railway custom domains. Use each domain's **actual Railway-provided CNAME target and ownership TXT name/value**. Both records are required; the official guide states a missing ownership TXT can produce a 404 even when the CNAME resolves. Cloudflare supports apex CNAME flattening, but do not invent an IP or illustrative Railway target. [8]

Recommended initial architecture: Cloudflare manages DNS, while web apex/www records remain **DNS-only** and Railway presents validated custom-hostname HTTPS certificates. R2 media uses its own supported Cloudflare custom-domain/CDN integration independently. Bind both web names before enabling a path- and query-preserving HTTP 301 from `www` to `https://willowtreefunerals.com.au`. Validate each domain's certificate and routing independently, then test redirect behavior.

Railway's current domain guide warns that orange-cloud proxied domains may use a fallback `*.up.railway.app` certificate and recommends Cloudflare **Full**, not blanket **Full (strict)**. Full does not provide the same strict origin-hostname certificate validation. Do not silently weaken TLS to make proxying appear to work. Keep web records DNS-only if the necessary custom-hostname certificate cannot be demonstrated. If the owner later wants web proxying, explain this documented tradeoff and obtain a decision. Use Full (strict) only after a real matching, unexpired trusted origin certificate or another supported validated-origin configuration has been demonstrated end to end. [8] [9]

Keep API, form submissions, webhook responses and authenticated paths out of cache. Do not apply Cache Everything to website HTML or `/api/*`. Restrict long immutable caching to hashed frontend assets and immutable versioned `/media` objects. Cloudflare normally does not cache HTML/JSON or non-GET requests, but broad rules can change effective behavior; inspect the actual rules. Keep HTML, service-worker and sitemap freshness policies appropriate to content updates. [10]

WAF rules must allow authenticated babylovegrowth machine POSTs without an interactive browser challenge while retaining endpoint authentication, payload limits and abuse controls. If the web host is DNS-only, Cloudflare's web WAF is not in the request path; document the actual application-side protections instead of claiming edge coverage. Do not place Cloudflare Access in front of the public website or webhook.

Invalidate the old service-worker cache safely. Verify that returning visitors receive the new frontend and API behavior, not cached Manus shell or offline fallback. Purge only affected public paths where needed; avoid a broad cache purge masking missing-origin assets. Validate canonicals, robots, sitemap, static and database blog URLs, redirect chains and contact links after the approved change.

## 11. Acceptance gates and final change authorization

Preparation evidence must include the reviewed commit, successful type check/build/mocked tests and isolated production-mode smoke checks with Manus keys absent. Record actual results and counts rather than treating this checklist as completed work. Security tests must show protected admin writes fail closed and invalid webhooks fail without writing.

Before production traffic changes, the operator and owner must accept all of the following:

- The fresh snapshot and restricted full backup are independently recoverable; all table counts and blog identities match the authoritative freeze snapshot, with every later delivery accounted for.
- The source and four static articles are preserved; every required media reference is verified or listed as an explicitly accepted exception. No private configuration, users, plaintext full SQL or keys appear in public Git history, releases or R2.
- The actual Railway preview runs the production artifact on the correct `PORT`, database readiness passes, representative public pages and API behavior pass, and logs do not leak secrets or enquiry data.
- Resend sender verification and controlled real delivery pass after approval; all original mailbox DNS remains intact. GA4 and Ads identifiers/events are preserved and tracking is checked without fabricated IDs or labels.
- Webhook key rotation, publishing freeze, final snapshot/delta procedure, retry replay and old-ingestion shutdown have named owners and a recorded execution order.
- Both custom domains, exact dashboard DNS records, valid HTTPS certificates, canonical redirect, cache/WAF decisions and service-worker update are checked. DNS-only web hosting versus optional later proxying is explicit.
- Independent backup retention, monitoring, rollback artifact, ownership and approved recurring costs are documented.

Present the final DNS request before mutation, listing the exact zone, record type/name, existing value, dashboard-sourced replacement value, TTL/proxy state and records that will not change. Include any Resend subdomain and R2 custom-domain changes. Ask: **“Do you approve these exact DNS changes and the stated Railway/R2/Resend costs for this cutover window?”** Do not bundle nameserver replacement, mailbox edits or additional service purchases into that approval.

After approval and execution, repeat production validation on apex, www and media hosts, reconcile final database/replay evidence, confirm real mail receipt and record actual DNS/certificate state. Only then mark the move complete. Keep the old source, historical release and restricted recovery set until the owner has accepted the permanent independent operation.

## 12. Independent backups, monitoring and rollback

Configure owner-approved recurring backups after setup, not merely one manual migration tar. A proposed minimum retention policy is daily encrypted database exports for 30 days, weekly recovery sets for 12 weeks and monthly sets for 12 months, with a pre-change snapshot before schema or publishing changes. This is a proposal requiring cost/storage approval, not an already configured schedule. Store copies outside the running Railway service and maintain a second independent restricted destination. Keep source release hashes and a media manifest; preserve immutable R2 objects and a separate recovered-media copy. Railway native backups/PITR can supplement, not replace, an independently tested recovery copy. [4]

Assign an owner for alerting on HTTP readiness, blog API/database failures, Resend delivery failures, webhook errors and backup age. Railway's deployment healthcheck is not ongoing uptime monitoring. Test a complete restore into an isolated empty database and verify media/decryption recovery periodically under an approved schedule. Do not expose backup credentials or download links publicly. [3]

The old Manus origin currently returns 404, so **pointing DNS back to Manus is not a viable rollback guarantee**. For application regression after cutover, redeploy the last accepted Railway artifact against the same current target database with a schema-compatible version. Disable publishing briefly if necessary, but preserve all post-cutover writes. Do not “rollback” by restoring September or the original 122-row baseline over the current database.

If a previous Railway artifact cannot use the current schema, stop writes, capture a fresh target backup and use an approved forward fix or isolated recovery/delta reconciliation. A database recovery needs a separate incident decision that accounts for newer posts and deletions. DNS rollback is useful only to an independently verified healthy compatible destination; the documented old records are an audit/recovery reference, not evidence that the old origin works.

For R2 failure, use an independently recovered media copy or another approved durable endpoint and change the controlled media base only after verification. For email failure, keep enquiries from falsely reporting delivery and alert the owner; do not silently re-enable obsolete Postmark or Manus fallbacks. Restore providers or apply an approved operational contingency without losing the evidence needed to reconcile requests.

The final delivery record must state what is prepared, what was actually deployed, the final blog count and snapshot time, media successes/failures, test evidence, accepted exceptions, exact commit/artifact hashes, restricted backup IDs, provider resource owners, live domain/certificate status and rollback deployment ID. Leave any unverified item visibly pending.

## References

[1]: https://docs.railway.com/guides/dockerfiles "Railway Dockerfile detection and build-time variables"
[2]: https://docs.railway.com/guides/config-as-code "Railway Config as Code deprecation and December 2026 cutoff"
[3]: https://docs.railway.com/guides/healthchecks "Railway deployment healthchecks and PORT requirements"
[4]: https://docs.railway.com/guides/mysql "Railway MySQL variables, external TCP proxy and backup guidance"
[5]: https://developers.cloudflare.com/r2/buckets/public-buckets/ "Cloudflare R2 public buckets and supported production custom domains"
[6]: https://developers.cloudflare.com/r2/examples/rclone/ "Cloudflare R2 rclone S3 configuration and copy examples"
[7]: https://resend.com/docs/dashboard/domains/introduction "Resend verified owned sender domains and dedicated subdomains"
[8]: https://docs.railway.com/networking/domains/working-with-domains "Railway custom domains, mandatory ownership TXT and Cloudflare TLS caveats"
[9]: https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/ "Cloudflare Full strict trusted matching origin certificate requirements"
[10]: https://developers.cloudflare.com/cache/concepts/default-cache-behavior/ "Cloudflare default cache behavior and non-GET exclusions"
