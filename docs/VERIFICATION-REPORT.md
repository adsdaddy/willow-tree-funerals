# Migration preparation verification

Prepared 6 November 2026. This report documents tested preparation, not a live Railway deployment or completed DNS move.

## Confirmed local results

- Fresh consistent snapshot: `2026-11-06T07:17:02.392Z` UTC, TiDB 8.5.3, REPEATABLE READ with the exporter query write guard. The unsupported compound READ ONLY syntax was replaced with a consistent snapshot under a strict read-only query allowlist; this is reported as exporter-enforced read-only, not a server READ ONLY flag.
- Fresh rows: `blog_posts=122`, `users=1`, `__drizzle_migrations=2`. All 122 blogs are published in this snapshot. Four static source articles remain separate. September's database had 90 blogs and is preserved for history only.
- Restored into a new, empty, independent local MariaDB 10.11.14 test database. Every exported column matches source in all three tables before transformation. Restored again into another new empty database and applied the URL-only transformation with original `updatedAt` values retained. Full-row hashes match every expected transformed value. Actual Railway MySQL restoration remains a separate required check.
- Historical asset bytes preserved: 459/459. Additional downloads: 115; original local media files: four. Seven broad-scan candidates unavailable, classified individually in `docs/MEDIA-EXCEPTIONS.md`. The obsolete Open Graph image is explicitly replaced with the preserved current homepage image; four external PDF citations remain unarchived.
- Prepared R2 objects: 439 immutable content-addressed public files after content deduplication and excluding a historical HTML non-media response. URL map: 573 original remote URLs. Media object sizes and SHA-256 hashes are included in `migration/media-objects.json`.
- Portable `client` and `shared` source contains no original platform CDN URLs. Built browser assets have no Manus debug hooks, Manus analytics/API endpoints, unresolved Vite placeholders or original platform CDN host.
- `pnpm check`: passed. `pnpm test`: 132/132 tests passed across 10 files. `pnpm test:migration`: eight tests passed. All email tests mock Resend; no real enquiry was sent.
- `pnpm build`: passed with Node 22/pnpm 10.4.1 and public GA4 configuration. Standard Dockerfile and GitHub CI are supplied. Local Docker engine execution was not available; the real GitHub CI `docker-build` job passed in run 42181321200, alongside `test-build`.
- Production-mode smoke runtime launched with an empty environment except standard OS variables, `NODE_ENV`, `PORT`, independent local DB URL, synthetic webhook key and local media path. No Manus/Forge/OAuth credentials or Resend key were present. `/healthz` and `/readyz` returned 200. Read-only page/media/API checks passed: 451 checks, zero failures. This is a local acceptance rehearsal, not proof that provider DNS, R2 CORS or Resend delivery works.
- Browser homepage and blog overview rendered with recovered images and fonts; the blog overview displayed 126 entries from 122 DB plus four static articles. This observed UI count is not a substitute for duplicate-slug and full route checks at final cutover.
- Gitleaks scan of the staged portable source: clean. Initial generic-key findings were all content-hash object filenames, not credentials; the manifest now uses the unambiguous `filename` field and the complete source scan passes without ignored files or blanket allowlists. Earlier Git history and September release are retained and need separate exposure review.

## Publication and recovery

The reviewed branch is `migration/railway-resend-cloudflare-20261106` in `adsdaddy/willow-tree-funerals`. The published release is `migration-2026-11-06-prepared`. Publication is confirmed in `docs/DELIVERY-RECORD.md`: both public and encrypted archives were independently downloaded and SHA-256 matched, Drive files were independently metadata-checked, and age recovery matched the full tar hash. The reviewed code/artifact commit is `c7b5c16f27d9427c3b266571c7ff2670afac59ef`.

The public handover tar contains portable source/docs/scripts, published blog content, the prepared media set and preservation mapping. The full recovery tar includes original source/history, fresh SQL/JSON/private rows, original protected configuration, all preserved media and the portable migration source. Only its age-encrypted version may be attached to public GitHub. The restricted Drive folder holds the full tar and separately stored recovery identity. Age decryption and plaintext SHA-256 equivalence must pass before publication is accepted. Never expose the identity, original configuration, users JSON or full plaintext tar publicly.

## Still required before production cutover

Railway project access and approved billing, actual Docker deployment, a persistent MySQL service and fresh authoritative final snapshot/restore or reviewed delta, verified R2 upload/CORS/custom-domain, verified Resend sender and controlled real mailbox receipt, final provider webhook key rotation/replay, exact Railway CNAME plus TXT domain verification, DNS/TLS cutover approval, live apex/www/media acceptance, and ongoing independent backups/monitoring. These operations have not been performed in this preparation task.

Cloudflare and Resend connectors were not enabled for this session; Cloudflare requires authorization. No Railway session/API access was available. No production DNS, nameservers, mailbox records, paid service resources or active secrets were changed. The original project and September backups remain intact. The old Manus origin was returning 404 and must not be treated as a reliable rollback endpoint.

Use `docs/handover/MIGRATION-HANDOVER.md`, `docs/handover/COPY-PASTE-MANUS-PROMPT.md`, `docs/RAILWAY-SERVICE-SETTINGS.md`, `docs/MEDIA-EXCEPTIONS.md` and `docs/ENCRYPTED-RECOVERY.md` for execution and acceptance. Test evidence JSON and logs are stored with the delivery package. No claim of universal 100% external-account or third-party-content recovery is made.
