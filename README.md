# Willow Tree Funerals

Portable React 19, Vite, Tailwind CSS 4, Express, tRPC 11 and Drizzle/MySQL website. The `migration/railway-resend-cloudflare-20261106` branch is prepared for Railway application hosting, Railway MySQL, Resend transactional email and Cloudflare DNS/R2 media. It must not be deployed back into Manus hosting.

Read [the complete migration handover](docs/handover/MIGRATION-HANDOVER.md), [the copy-paste task brief](docs/handover/COPY-PASTE-MANUS-PROMPT.md), and [Railway service settings](docs/RAILWAY-SERVICE-SETTINGS.md). Preparation does not mean production DNS has been switched. Use the verification report for the exact completed/pending status.

## Local development and verification

Use Node 22 and pnpm 10.4.1. `corepack enable && corepack prepare pnpm@10.4.1 --activate`, then `pnpm install --frozen-lockfile`. Copy `.env.example` to `.env` and fill independent service configuration privately. Run `pnpm dev`. Never copy the old Manus `.project-config.json`, OAuth IDs or Forge credentials into this runtime.

Run `pnpm check`, `pnpm test`, `pnpm test:migration` and `pnpm build`. All email tests mock Resend. `NODE_ENV=production node dist/index.js` starts the independent production server. `/healthz` is liveness; `/readyz` verifies DB connectivity. After deploying, run `node scripts/validate-migration.mjs --base-url https://YOUR-ACTUAL.up.railway.app --map migration/media-url-map.json --all-media`. The script performs read-only route checks plus an unauthorized webhook request, not a real email or publication.

## Data and media

Restore the fresh restricted database export only into a new empty database using `TARGET_DATABASE_URL` with `node scripts/restore-database.mjs --source /path/to/database --confirm-empty`. SQL table drops are removed and a nonempty target is refused. Preserve the export's schema and JSON rows together. Verify counts after restoring, then run `node scripts/rewrite-media.mjs --map migration/media-url-map.json --database --confirm-target` using the new target URL. The script never defaults to the Manus `DATABASE_URL`.

Source assets use `/media/FILENAME` instead of the old platform CDN. The server uses `MEDIA_PUBLIC_BASE_URL` for redirects to Cloudflare R2 or `MEDIA_LOCAL_DIR` for offline smoke testing. Download public media bytes from the prepared release, upload using `scripts/upload-media-r2.sh /path/to/media` with bucket-scoped environment credentials, and verify the custom-domain URLs. Do not put media binaries in source, `client/public` or the Docker image.

Public GitHub files contain no new private config or raw private database. The full pre-migration archive is encrypted for GitHub and stored privately in the designated Second Brain Drive folder. Do not publish its decryption key or upload database/config to the public R2 bucket. September backups and earlier Git history are retained, not automatically sanitized by this branch; their public exposure requires an owner-led separate security review.

## Access and live cutover

The public website has no required customer login. Manus OAuth and Forge services are removed from the runtime; privileged routes remain disabled/fail closed. If an admin UI is needed, add an independently secured identity provider before enabling it. Keep the original business domain, URL paths, GA4/Ads event names and existing mailbox DNS. Coordinate babylovegrowth.ai ingestion, take a final incremental snapshot and replay queued posts before switching traffic. Do not delete the old project until the owner has accepted the independently hosted website and restore procedure.
