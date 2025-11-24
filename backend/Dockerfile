FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Run server.js directly (make sure it's inside /app after COPY)
CMD ["node", "server.js"]

EXPOSE 9001
