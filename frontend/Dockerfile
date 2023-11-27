FROM node:14.17.0-alpine as builder
ARG BASE_HREF
RUN mkdir -p /app
WORKDIR /app
#COPY package.json /app

RUN mkdir -p ./frontend/node_modules
RUN npm install --prefix ./frontend

COPY . /app
RUN npm run --prefix ./frontend build -- --prod --aot --base-href $BASE_HREF

FROM nginx
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
