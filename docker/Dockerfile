FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk update && apk add ca-certificates

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=server --prod /prod/server
RUN pnpm deploy --filter=web --prod /prod/web

FROM base AS server-app
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
EXPOSE 3000

FROM nginx:stable-alpine AS web-app
COPY --from=build /prod/web/dist /usr/src/app
COPY docker/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80