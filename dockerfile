# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY terboro/package*.json ./
RUN npm ci
COPY terboro/ ./
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]