FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
COPY ./package*.json ./
CMD ["node", "mapper"]
