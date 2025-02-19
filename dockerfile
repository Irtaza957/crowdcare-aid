FROM node:18.19.1-alpine AS builder

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

ARG PROJECT=crowdcareaid-web

RUN  yarn nx run ${PROJECT}:build --configuration=production

FROM node:18.19.1-alpine

WORKDIR /app

ARG PROJECT=crowdcareaid-web
COPY --from=builder /app/apps/${PROJECT}/.next/ ./.next
COPY --from=builder /app/apps/${PROJECT}/public/ ./public
COPY package.json ./

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "next", "start"]