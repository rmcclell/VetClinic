# =============================================================================
# VetClinic — Multi-stage Dockerfile
# Builds Angular frontend + NestJS backend into a single production image
# =============================================================================

# ---------------------------------------------------------------------------
# Stage 1: Install dependencies
# ---------------------------------------------------------------------------
FROM node:24-alpine AS deps

WORKDIR /app

# Copy only the files needed for npm install (maximises layer cache)
COPY package.json package-lock.json ./

RUN npm ci

# ---------------------------------------------------------------------------
# Stage 2: Build API + Web
# ---------------------------------------------------------------------------
FROM node:24-alpine AS build

WORKDIR /app

# Bring in installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy everything else (respects .dockerignore)
COPY . .

# Generate Prisma client for linux-musl (Alpine)
RUN npx prisma generate

# Build both apps using Nx
RUN npx nx build api --configuration=production
RUN npx nx build vet-clinic --configuration=production

# ---------------------------------------------------------------------------
# Stage 3: Production runtime
# ---------------------------------------------------------------------------
FROM node:24-alpine AS production

WORKDIR /app

# Install only what we need at runtime
# - openssl: required by Prisma for TLS connections
RUN apk add --no-cache openssl

# Copy the built API (NestJS)
COPY --from=build /app/dist/api ./

# Copy package metadata and node_modules from build stage
# (Ensures root package.json with prisma.seed config and full node_modules are present)
COPY package.json package-lock.json ./
COPY --from=build /app/node_modules ./node_modules

# Copy the built Web (Angular) to a known path the API can serve
COPY --from=build /app/dist/apps/web/browser ./public

# Copy Prisma schema + migrations
COPY --from=build /app/prisma ./prisma

# Copy entrypoint
COPY docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
