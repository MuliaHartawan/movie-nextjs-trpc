FROM imbios/bun-node:20-slim AS deps
ARG DEBIAN_FRONTEND=noninteractive

RUN corepack enable
RUN apt-get -y update && \
    apt-get install -yq openssl git ca-certificates tzdata && \
    ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=~/.pnpm-store \
    pnpm install --frozen-lockfile --prod --ignore-scripts


FROM deps AS builder

WORKDIR /app
COPY --chown=node:node . .

ENV NODE_ENV=production

RUN pnpm db:generate
RUN pnpm run build

ENV PORT=3000
EXPOSE 3000
USER node

CMD [ "pnpm", "run", "start" ]
