FROM node:16-alpine AS deps
ARG GITHUB_TOKEN
ENV NPM_TOKEN=$GITHUB_TOKEN
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY .npmrc.docker .npmrc
COPY .yarnrc .yarnrc
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
	if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
	elif [ -f package-lock.json ]; then npm ci; \
	elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
	else echo "Lockfile not found." && exit 1; \
	fi

FROM node:16-alpine AS builder
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ARG SENTRY_ENVIRONMENT
ENV SENTRY_ENVIRONMENT=$SENTRY_ENVIRONMENT
# TODO add sentry dsn
ENV SENTRY_DSN=https://CUSTOM_SENTRY_DSN

ARG GITHUB_TOKEN
ENV NPM_TOKEN=$GITHUB_TOKEN
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
COPY .env.production .env.production
COPY .npmrc.docker .npmrc
COPY .yarnrc .yarnrc

RUN yarn build

FROM node:16-alpine AS runner
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ARG SENTRY_ENVIRONMENT
ENV SENTRY_ENVIRONMENT=$SENTRY_ENVIRONMENT
# TODO add sentry dsn
ENV SENTRY_DSN=https://CUSTOM_SENTRY_DSN

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]