FROM node:alpine3.18 as builder

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

RUN ln -sf /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime

