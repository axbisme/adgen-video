# client/Dockerfile

# Build the app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV NODE_OPTIONS=--openssl-legacy-provider
COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
