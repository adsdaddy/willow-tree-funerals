FROM node:22.23.4-bookworm-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile
COPY . .
# Public analytics IDs only. Never declare API keys or DATABASE_URL as build ARGs.
ARG VITE_GA4_MEASUREMENT_ID=G-ZPSZ3KQRF4
ARG VITE_META_PIXEL_ID=
ENV VITE_GA4_MEASUREMENT_ID=${VITE_GA4_MEASUREMENT_ID}
ENV VITE_META_PIXEL_ID=${VITE_META_PIXEL_ID}
RUN pnpm build && pnpm prune --prod

FROM node:22.23.4-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
