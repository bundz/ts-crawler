FROM node:14.16.0

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY . .

CMD ["npm", "run", "start:dev"]