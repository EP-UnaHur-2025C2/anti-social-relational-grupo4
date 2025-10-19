FROM node:20-alpine

# instalar bash
RUN apk add --no-cache bash curl

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN sed -i '1s|^.*$|#!/usr/bin/env bash|' /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

COPY . .

CMD ["node", "src/index.js"]
