FROM node:24.0 AS builder

COPY . .

RUN npm i --force

RUN npm run build

FROM  nginx:stable-alpine

COPY --from=builder /dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]