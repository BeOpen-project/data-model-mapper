FROM node:14.17.0-alpine as builder
ARG BASE_HREF
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app

RUN npm install --legacy-peer-deps
RUN date > /app/date.txt
COPY . /app
RUN npm run build -- --prod --aot --base-href $BASE_HREF
RUN mkdir -p /app/dist/$BASE_HREF/assets/
RUN date > /app/dist/$BASE_HREF/assets/date.txt
RUN date > /app/dist/assets/date.txt

FROM nginx
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
