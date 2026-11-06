# Willow Tree Funerals: production image for Railway
FROM node:22-slim AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile
COPY . .
# Public build-time values (baked into the client bundle)
ARG VITE_APP_ID
ARG VITE_GA4_ID
ARG VITE_GOOGLE_ADS_ID
ARG VITE_CLARITY_ID
RUN pnpm build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist
COPY drizzle ./drizzle
EXPOSE 8080
CMD ["node", "dist/index.js"]
