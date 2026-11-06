# Media preservation and migration exceptions

The fresh capture preserved all 459 historical downloaded assets, added 115 new downloads and four local binary files. Its broad source scan found 576 current remote candidates: 569 were backed by bytes and seven had no bytes. This is static evidence, not a claim of live CDN availability. The prepared R2 set deduplicates verified content into 439 content-addressed public objects from 573 original remote URLs. One old `.bin` file is an HTML response from the bare `https://images.unsplash.com` hostname; it remains in full historical preservation but is deliberately not uploaded to R2 as an image.

## One obsolete website image

The old Open Graph/Twitter image in `client/index.html` referenced `hero-bg_3a4c2b1d.jpg` on the original platform CDN, which returns 403. Its exact bytes were not available in either backup. The migration HTML now uses the already-preserved current homepage image `hero-bg-opt-v2_e04c2bfa.webp`, remapped to its content-addressed `/media/` key. This is an explicit equivalent visual replacement, not a claim that the old JPEG was recovered. The original HTML and failed URL are retained in the private pre-migration source/evidence.

## Four externally cited PDFs

These external article citations returned HTTP 403 after the initial request and four retries. Their article text and links remain preserved, but their PDF bytes are not in the backup. They are third-party document citations, not missing website header images. Do not claim exact byte preservation or silently replace them with unrelated documents.

- `https://www.easternhealth.org.au/images/services/translations/when_someone_dies_in_hospital_english.pdf`
- `https://lawreform.nsw.gov.au/documents/Publications/Consultation-Papers/CP20.pdf`
- `https://www.coronerscourt.qld.gov.au/__data/assets/pdf_file/0011/779654/osc-state-coroners-guidelines-chapter-4.pdf`
- `https://www.waverley.nsw.gov.au/cemeteries/_media/documents/policies_plans/Cemetery_fees_and_charges_25-26.pdf`

The operator can request official copies or confirm a replacement source with the client. Until then these citations are a known external-link/content-audit exception. Thirty-one other PDF files and seven font files have preserved bytes.

## Two non-asset scan candidates

The source scan recorded a Facebook tracking pixel URL containing the `%VITE_META_PIXEL_ID%` placeholder. This is a dynamic tracking request, not a recoverable static image asset. Meta tracking remains conditional on a real supplied Pixel ID. The other candidate `https://example.com/original.jpg` was documentation in an unused Manus image-generation helper, now removed from the portable branch. Its 404 is not a lost website image. Both remain classified in the original capture report; neither blocks independent hosting.

## Acceptance

The portable `client` and `shared` runtime source has no original platform CDN URLs after remapping. Future third-party blog image URLs still need an approved durable ingestion/rehosting policy; this preparation captures existing media, not a future automated mirroring system. All 439 prepared R2 objects must be uploaded and hash-checked, with actual public custom-domain GETs, font CORS and range requests checked before traffic switches. Do not describe Cloudflare storage or live-domain acceptance as complete until those provider operations are performed.
