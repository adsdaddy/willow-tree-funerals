# Willow Tree Funerals migration: confirmed delivery record

**Prepared and externally stored on 6 November 2026. Production cutover has not been executed.**

The code, current database preservation, media recovery, independent Railway build and English migration instructions are delivered. There is no claim that production is already live on Railway, that Resend has sent a real enquiry, or that Cloudflare production records have changed.

## Reviewed source and successful CI

Repository: [adsdaddy/willow-tree-funerals](https://github.com/adsdaddy/willow-tree-funerals).

Branch: `migration/railway-resend-cloudflare-20261106`.

Reviewed code/artifact commit: `c7b5c16f27d9427c3b266571c7ff2670afac59ef`. Subsequent delivery-document updates on that branch do not alter the archived tested code. The prepared release points to this code commit, not an invented project state.

[GitHub CI run 42181321200](https://github.com/adsdaddy/willow-tree-funerals/actions/runs/42181321200) completed successfully. Both `test-build` and `docker-build` passed. This includes a real Docker build on GitHub, in addition to local TypeScript, 132 mocked application tests, eight migration-tool tests and production compilation. Independent local smoke validation passed 451 checks with no Manus credentials present.

## Published GitHub release

[Off-Manus migration handover release](https://github.com/adsdaddy/willow-tree-funerals/releases/tag/migration-2026-11-06-prepared).

The release contains the public handover tar, the age-encrypted full recovery tar, checksums and the two English handover documents. The public archive has 699 entries, including 439 recovered content-addressed media objects, portable source, deployment scripts and published blog content. It has no raw users JSON, original private configuration, original query-log folder, history bundle or recovery key. The private full tar has 1,769 entries and does preserve those private source/history/configuration/database components.

The plaintext full archive and recovery identity were **not** attached to public GitHub. The uploaded public and encrypted archives were independently downloaded again; their SHA-256 values match the local reference files. GitHub's remote digest and file-size metadata also match. The local age decryption test produced a plaintext tar with exactly the full-tar SHA-256 below.

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| `willow-tree-funerals-public-handover-20261106.tar.gz` | 85,970,429 | `5b5b18227096249ee47d02e8bf447fb21cda0e747a29d247482208b5a131cc3c` |
| `willow-tree-funerals-full-20261106.tar.gz.age` | 227,362,537 | `09066f8227e5573b495c5c1134974c5598faf0a18d0c476082291e9b5f05a6c7` |
| Private plaintext `willow-tree-funerals-full-20261106.tar.gz` | 227,306,849 | `eb978aafb89db0893674d88bd0e0efd8154e3f12bef2374119214499eda3be67` |

## Restricted Second Brain Drive

[Confirmed website-backup folder](https://drive.google.com/drive/folders/1MJAK__sJXJecS0xKkgVGN4PtD_ZPuTTS).

Path: `AV - Second Brain / 00_Second_Brain/A_Obsidian_Vault/Ventures/Heavenly-Marketing/departments/client-services/active/Willow-Tree-Funerals/website-backup`.

The folder permission check returned named-user organizer/fileOrganizer access, not an `anyone` permission. Uploaded files were independently read back through Drive metadata: sizes, MD5s and exact parent folder all match the originals.

| Stored artifact | Drive file ID |
|---|---|
| Restricted plaintext full archive | `1IC82PgPDkI2RCbfcZrjfHEZL9pPTlxeY` |
| Public handover archive | `17OKl5IEcvI5KKcrje3PSdEIHnsRdssci` |
| SHA-256 checksum file | `16zK3vRpsX1OGQVxZ_6gAcOxjg2FTvK0t` |
| Separately restricted age recovery identity | `1JkGVeCAbLgQn44CNmcoKXa1EFSwUvi0Z` |

Do not make the recovery identity or full plaintext archive public. Copy the identity into the owner's private recovery vault so it is not dependent on one Drive account. Use the `docs/ENCRYPTED-RECOVERY.md` instructions in the prepared branch to decrypt. The key's contents are not exposed by this delivery record.

## Current content and media

Authoritative preparation snapshot: `2026-11-06T07:17:02.392Z` UTC. It preserves 122 published `blog_posts` records, one user and two Drizzle migration records, plus four separately source-defined static articles. September's snapshot had 90 blog rows and must not be substituted. The deleted `vek-ritual-com-ua-alternatives-3` row is absent. The suspect `graalenet-alternatives` article remains preserved for separately approved editorial review.

Two empty-target local restore rehearsals succeeded on independent MariaDB 10.11.14. Every exported field matches in all three tables before media transformation and matches the expected URL-only transformation afterward, with original article timestamps retained. This is not a claim that the actual Railway MySQL service has been created or restored.

All 459 historical downloaded assets are retained, with 115 additional downloads and four local binary copies. The R2 upload set deduplicates verified content into 439 immutable public objects and maps 573 original remote URLs. Seven broad-scan references failed: four externally cited PDFs still lack archived bytes; an obsolete Open Graph JPEG is explicitly replaced by the preserved current homepage image; two dynamic/documentation references are not missing website assets. These exceptions remain explicit in `docs/MEDIA-EXCEPTIONS.md`. No universal 100% third-party byte-preservation claim is made.

## What the next operator still needs to execute

Enable authorized client-owned Railway, Resend and Cloudflare access. Approve service costs before creating billable resources. Deploy the tested Docker artifact with persistent Railway MySQL, perform a final controlled publishing freeze/snapshot or reviewed delta, restore and reconcile the actual target, upload/check R2 and configure font CORS/custom-domain, verify the Resend sender subdomain and controlled real email delivery, and coordinate the blog webhook key/replay.

Then present the exact provider-sourced DNS change set for approval, preserving all root mailbox MX/SPF/DKIM/DMARC records. Bind both apex and www with Railway CNAME plus ownership TXT, validate certificates, and initially keep web DNS-only as documented. Switch traffic only after approval and acceptance. Configure independent backups, monitoring and a schema-compatible Railway rollback artifact. The broken Manus origin is not a credible fallback.

The original project, September backups, existing production domain/mail records and paid-service resources have not been deleted or modified by this preparation. The safe source scan does not sanitize earlier public Git history; review historical exposure separately with owner authorization.
