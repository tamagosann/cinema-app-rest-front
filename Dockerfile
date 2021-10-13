FROM node:14-alpine

WORKDIR /usr/src/app

RUN apk update
RUN apk add git

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install