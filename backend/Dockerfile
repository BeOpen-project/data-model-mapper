FROM node:16-alpine
WORKDIR /app
COPY . .
COPY ./package*.json ./
RUN cd backend
RUN npm install
CMD ["node", "mapper"]
