FROM node:24.0

COPY . .

RUN npm i

RUN npm run build