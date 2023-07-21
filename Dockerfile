From node:20-alpine
WORKDIR /app
COPY package-lock.json
RUN npm install
COPY . .
RUN npm -i
RUN npm run build
