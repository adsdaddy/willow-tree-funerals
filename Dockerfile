# Willow Tree Funerals: production image for Railway

# ---- Build stage: compile client (Vite) and server (esbuild) ----------------
FROM node:22-slim AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile
COPY . .
# Public build-time value (baked into the client bundle). GA4 and Google Ads
# IDs are fixed in client/index.html; no Meta pixel runs on this site today.
ARG VITE_META_PIXEL_ID
RUN pnpm build

# ---- Runtime stage: production dependencies + built output only -----------
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist
COPY drizzle ./drizzle
COPY scripts ./scripts
COPY seed ./seed
EXPOSE 8080
ENV PORT=8080
CMD ["node", "scripts/start.mjs"]
