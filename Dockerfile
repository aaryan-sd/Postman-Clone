FROM node:18 AS frontend

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY --from=frontend /app/build /usr/share/nginx/html/


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]