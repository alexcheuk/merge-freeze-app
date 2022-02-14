FROM node:14 as builder

RUN apk update && apk add ca-certificates

WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
COPY . .


EXPOSE 80
