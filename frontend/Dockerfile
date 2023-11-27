FROM node:14.17.0-alpine as builder
ARG BASE_HREF
RUN mkdir -p /app
WORKDIR /app
#COPY package.json /app

RUN mkdir -p ./frontend/node_modules
RUN npm install --prefix ./frontend

COPY . /app

FROM debian
RUN bash -xc "\
pushd /frontend; \
npm run build -- --prod --aot --base-href $BASE_HREF;
popd; \
";
RUN pwd
#RUN bash "\
#pushd ./frontend; \
#npm run build -- --prod --aot --base-href $BASE_HREF; \
#popd; \
#"

#RUN pushd frontend && npm run build -- --prod --aot --base-href $BASE_HREF && popd
#RUN popd
#RUN chmod u+r+x /app/build.sh
#RUN chmod u+r+x build.sh

RUN dos2unix /app/build.sh

#FROM nginx
#EXPOSE 80
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=builder /app/dist /usr/share/nginx/html
