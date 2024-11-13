FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm rebuild bcrypt --build-from-source

EXPOSE 5000
CMD ["node", "server.js"] 