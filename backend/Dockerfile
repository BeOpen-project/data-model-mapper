FROM node:16-alpine
WORKDIR /app
COPY ./dataModels ./dataModels
COPY ./docs ./docs
COPY ./src ./src
COPY ./backend/output ./output
COPY ./config*.js ./
COPY ./mapper.js ./
COPY ./LICENSE ./
COPY ./package*.json ./
RUN npm install
RUN date > /app/date.txt
RUN sed -i 's/localhost/host.docker.internal/g' /app/config.js
CMD ["node", "mapper"]