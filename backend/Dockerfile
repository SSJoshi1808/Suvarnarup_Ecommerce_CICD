# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .

# # Run server.js directly (make sure it's inside /app after COPY)
# CMD ["node", "server.js"]

# EXPOSE 9001


# Use Google mirror to avoid Docker Hub rate limit
FROM mirror.gcr.io/library/node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Expose your API port
EXPOSE 9001

# Start your backend application
CMD ["node", "server.js"]
