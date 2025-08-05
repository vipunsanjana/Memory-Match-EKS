# Build React or Vue app
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve with NGINX
FROM nginx:alpine

# Clean default NGINX files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
