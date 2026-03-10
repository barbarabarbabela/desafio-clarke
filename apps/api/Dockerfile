FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

RUN npm install --prefix apps/api

COPY apps/api ./apps/api

RUN npm run build --prefix apps/api

EXPOSE 3000

CMD ["npm", "run", "start", "--prefix", "apps/api"]
