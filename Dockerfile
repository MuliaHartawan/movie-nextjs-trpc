FROM imbios/bun-node:18-slim AS deps
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
  apt-get install -yq openssl git ca-certificates tzdata && \
  ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM deps AS builder

WORKDIR /app
COPY --chown=node:node . .

ENV NODE_ENV=production

RUN bun run build

ENV PORT=3000
EXPOSE 3000
USER node

CMD [ "bun", "run", "start" ]
