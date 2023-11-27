FROM node:16-alpine
WORKDIR /app
COPY . .
RUN mkdir -p ./backend/node_modules
RUN npm install --prefix ./backend
CMD ["node", "./backend/mapper"]
