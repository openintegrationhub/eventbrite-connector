FROM node:12-alpine
LABEL NAME="stripe-connector"
LABEL MAINTAINER Sven Hoeffler "shoeffler@wice.de"
LABEL SUMMARY="This image is used to start the OIH stripe connector"

RUN apk --no-cache add \
    python \
    make \
    g++ \
    libc6-compat

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --production

COPY . /usr/src/app

RUN chown -R node:node .

USER node

ENTRYPOINT ["npm", "start"]
