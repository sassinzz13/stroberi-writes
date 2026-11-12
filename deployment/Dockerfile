# syntax=docker/dockerfile:1
FROM golang:1.27.3-alpine AS go-base
RUN apk add --no-cache ca-certificates git
WORKDIR /app

FROM go-base AS backend-dev
RUN go install github.com/air-verse/air@v1.67.4
EXPOSE 8080
CMD ["air", "-c", "/etc/air.toml"]

FROM go-base AS backend-build
ENV CGO_ENABLED=0
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ ./
RUN go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api

FROM alpine:3.24 AS backend-prod
RUN apk add --no-cache ca-certificates \
    && addgroup -S app && adduser -S -G app app
WORKDIR /app
COPY --from=backend-build /out/api ./api
USER app
ENV PORT=8080 GIN_MODE=release
EXPOSE 8080
CMD ["./api"]

FROM node:26-alpine AS node-base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM node-base AS frontend-dev
EXPOSE 3000
# Refresh the Linux dependency volume on startup after lockfile changes.
CMD ["sh", "-c", "npm ci --no-audit --no-fund && exec node node_modules/next/dist/bin/next dev --hostname 0.0.0.0 --port 3000"]

FROM node-base AS frontend-build
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

FROM node-base AS frontend-prod
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000
COPY --from=frontend-build --chown=node:node /app/.next/standalone ./
COPY --from=frontend-build --chown=node:node /app/.next/static ./.next/static
COPY --from=frontend-build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
