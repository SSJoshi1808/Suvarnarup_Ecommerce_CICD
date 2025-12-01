# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .

# # Run server.js directly (make sure it's inside /app after COPY)
# CMD ["node", "server.js"]

# EXPOSE 9001


# Use Google mirror to avoid Docker Hub rate limit
# FROM mirror.gcr.io/library/node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .

# # Expose your API port
# EXPOSE 9000

# # Start your backend application
# CMD ["node", "server.js"]


FROM mirror.gcr.io/library/node:18 AS builder

WORKDIR /app

# Copy only package files first (better layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production --legacy-peer-deps

# Copy rest of backend source
COPY . .

# -------- Stage 2: Final Slim Image --------
FROM mirror.gcr.io/library/node:18-slim

WORKDIR /app

# Copy only required files from builder image
COPY --from=builder /app /app

# Expose backend port
EXPOSE 9001

# Start server
CMD ["node", "server.js"]
