FROM node:18 AS frontend

WORKDIR /app

COPY package*.json ./

RUN npm install --fronzen-lockfile

COPY . .

RUN npm run build

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY --from=frontend /app/dist /usr/share/nginx/html/

# Copy custom Nginx configuration file (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]