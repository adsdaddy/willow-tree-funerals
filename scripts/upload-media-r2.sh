#!/usr/bin/env bash
set -euo pipefail
# Requires rclone >=1.59, a bucket already created by the owner, and public media only.
# Never supply a backup root, secure directory, database directory, or secret files.
if [[ $# -ne 1 || ! -d "$1" ]]; then
  echo 'Usage: scripts/upload-media-r2.sh /absolute/path/to/media-files' >&2; exit 2
fi
: "${R2_ACCOUNT_ID:?Missing R2_ACCOUNT_ID}"
: "${R2_ACCESS_KEY_ID:?Missing R2_ACCESS_KEY_ID}"
: "${R2_SECRET_ACCESS_KEY:?Missing R2_SECRET_ACCESS_KEY}"
: "${R2_BUCKET:?Missing R2_BUCKET}"
command -v rclone >/dev/null
export RCLONE_CONFIG_WILLOW_R2_TYPE=s3
export RCLONE_CONFIG_WILLOW_R2_PROVIDER=Cloudflare
export RCLONE_CONFIG_WILLOW_R2_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID"
export RCLONE_CONFIG_WILLOW_R2_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"
export RCLONE_CONFIG_WILLOW_R2_ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
export RCLONE_CONFIG_WILLOW_R2_REGION=auto
export RCLONE_CONFIG_WILLOW_R2_NO_CHECK_BUCKET=true
# Isolated environment remote, no global rclone config changes. Copy, never sync.
# Explicit media-only extension list keeps manifests/backups out of the public bucket.
rclone copy "$1" "willow_r2:${R2_BUCKET}" --config /dev/null \
  --include '*.png' --include '*.jpg' --include '*.jpeg' --include '*.webp' \
  --include '*.gif' --include '*.svg' --include '*.avif' --include '*.ico' \
  --include '*.woff' --include '*.woff2' --include '*.ttf' --include '*.otf' \
  --include '*.mp4' --include '*.webm' --include '*.pdf' --exclude '*' \
  --transfers 4 --checkers 4 --stats 15s --immutable \
  --header-upload 'Cache-Control: public, max-age=31536000, immutable'
# Download-based checking compares content, not multipart ETags to MD5.
rclone check "$1" "willow_r2:${R2_BUCKET}" --config /dev/null --one-way --download \
  --include '*.png' --include '*.jpg' --include '*.jpeg' --include '*.webp' \
  --include '*.gif' --include '*.svg' --include '*.avif' --include '*.ico' \
  --include '*.woff' --include '*.woff2' --include '*.ttf' --include '*.otf' \
  --include '*.mp4' --include '*.webm' --include '*.pdf' --exclude '*' \
  --checkers 4 --stats 15s
