FROM node:20-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:1.25
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
COPY ./conf1.conf /etc/nginx/conf.d/conf1.conf
