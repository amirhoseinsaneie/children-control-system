# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
COPY . ./
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
