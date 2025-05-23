FROM node:24.0

COPY . .

RUN npm i

CMD ["npm", "run", "build"]