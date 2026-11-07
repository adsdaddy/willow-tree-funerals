# Deployment: willowtreefunerals.com.au

GitHub (this repo) → Railway (app + MySQL) → Cloudflare (DNS, proxy, www redirect).
Moved off Manus in November 2026 following the vault playbook `playbooks/manus-to-railway-migration.md`.

| What | Where |
|---|---|
| Railway project | `WEB_WillowTreeFunerals.com.au` (Ads Daddy workspace for now; moves to the client's account later) |
| Services | `web` (this repo, `Dockerfile`) and `MySQL` (Railway template), region Singapore |
| Railway domain | `web-production-a4d2ab.up.railway.app` |
| Branch Railway deploys | `railway-move` until merged, then `main` |
| DNS | Cloudflare zone `willowtreefunerals.com.au` |
| Form email | Resend, from `website@mail.adsdaddy.com` to `director@willowtreefunerals.com.au` |

## Variables (Railway `web` service)

| Name | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `8080` |
| `DATABASE_URL` | `${{MySQL.MYSQL_URL}}` |
| `RESEND_API_KEY` | Resend key limited to sending from `mail.adsdaddy.com` |
| `EMAIL_FROM` | `website@mail.adsdaddy.com` (switch to the client's own domain when it has its own Resend) |
| `FORM_RECIPIENT` | unset in production (defaults to `director@willowtreefunerals.com.au`); set to an internal address only while testing |
| `BLOG_API_KEY` | bearer key for `/api/blog/webhook` (babylovegrowth). Must match the key in babylovegrowth's integration settings |

GA4 `G-ZPSZ3KQRF4` and Google Ads `AW-16467075039` are fixed in `client/index.html`.

## What runs on start

`scripts/start.mjs`: apply migrations → load `seed/blog-posts.json` into an empty `blog_posts` table → idempotent content fixes (`scripts/fix-content.mjs`) → start the server. A database problem never stops the site from serving.

## Media

Site photos, fonts and blog images live in `client/public/media` (blog images in `media/blog`). `scripts/check-media-refs.mjs` fails CI if a reference is missing or still points at Manus.

`client/public/assets` holds the last Manus build's JS and CSS so pages cached by the old service worker still load right after the cutover. Safe to delete about a month after cutover.

## Cutover and rollback

Cutover (needs Adrian's go): apex `@` → CNAME to Railway's target, proxied; `www` → CNAME `@`, proxied, with a 301 redirect rule to the apex; SSL mode stays Full.

Rollback: restore the two apex A records `104.18.26.246` and `104.18.27.246` (DNS only) and `www` CNAME `cname.manus.space` (DNS only). Works while the domain is still attached in Manus. Zone backup: `~/.config/av/dns-backups/willowtreefunerals.com.au_2026-11-08_0002/`.
