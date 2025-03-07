FROM node:23-slim AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && npm i -g corepack@latest

WORKDIR /app
COPY pnpm-lock.yaml .npmrc /app
RUN --mount=type=secret,id=node_auth_token \
  NODE_AUTH_TOKEN=$(cat /run/secrets/node_auth_token) \
  pnpm fetch

COPY . /app
RUN --mount=type=secret,id=node_auth_token \
  NODE_AUTH_TOKEN=$(cat /run/secrets/node_auth_token) \
  pnpm install -r --offline

RUN --mount=type=secret,id=node_auth_token \
  NODE_AUTH_TOKEN=$(cat /run/secrets/node_auth_token) \
  pnpm run build

FROM europe-north1-docker.pkg.dev/nais-management-233d/personoversikt/modia-frontend:1.6

ADD proxy-config-dev.json proxy-config-dev.json
ADD proxy-config-prod.json proxy-config-prod.json
COPY --from=builder /app/build ./static

ENV STATIC_FILES_DIR=./static
ENV BASE_PATH=/
