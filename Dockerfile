# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# VITE_* e SENTRY_ORG/PROJECT não são segredos: qualquer valor VITE_* acaba
# public no bundle JS de qualquer forma (é assim que toda app client-side
# funciona), e org/project são só identificadores. O único valor sensível de
# verdade é o SENTRY_AUTH_TOKEN, que NUNCA entra em ARG/ENV — ele é lido via
# --mount=type=secret abaixo, então nunca fica gravado em nenhuma camada ou
# no cache da imagem.
ARG VITE_APP_API_BASE_URL
ARG VITE_SENTRY_DSN
ARG VITE_NODE_ENV=production
ARG SENTRY_ORG
ARG SENTRY_PROJECT

ENV VITE_APP_API_BASE_URL=$VITE_APP_API_BASE_URL \
	VITE_SENTRY_DSN=$VITE_SENTRY_DSN \
	VITE_NODE_ENV=$VITE_NODE_ENV \
	SENTRY_ORG=$SENTRY_ORG \
	SENTRY_PROJECT=$SENTRY_PROJECT

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
	sh -c 'SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN 2>/dev/null || true)" npm run build'

# ---- Runtime stage ----
FROM nginx:1.27-alpine AS runtime

# A tag "alpine" fica parada no que existia quando foi publicada; o apk upgrade
# puxa os patches de segurança do OS (openssl, libxml2, musl, etc.) que já
# existem no repositório do Alpine, sem esperar uma nova tag da imagem base.
RUN apk update && apk upgrade --no-cache

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
