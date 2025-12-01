# # Build React app with Vite
# FROM node:18 AS build

# WORKDIR /app
# COPY package*.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

# # Serve with Nginx
# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build React app
# FROM node:18 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:1.29.1
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build React app
# FROM node:18 AS build
# WORKDIR /app
# COPY frontend/package*.json ./
# RUN npm install --legacy-peer-deps
# COPY frontend . 
# RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:1.29.1
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# # Stage 1: Build React app
# FROM node:18 AS build
# WORKDIR /app
# COPY frontend/package*.json ./
# RUN npm install --legacy-peer-deps
# COPY frontend/ .    
# RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:1.29.1
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf  
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# # Stage 1: Build React app
# FROM node:18 AS build
# WORKDIR /app
# COPY package*.json ./   
# RUN npm install --legacy-peer-deps
# COPY . .                
# RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:1.29.1
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf   
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

#Test
# Stage 1: Build Vite app



#Final
# FROM node:18 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build   

# # Stage 2: Serve with Nginx
# FROM nginx:1.29.1
# COPY --from=build /app/dist /usr/share/nginx/html   
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Stage 1: Build
# -----------------------------
# Stage 1: Build Vite frontend
# -----------------------------
# FROM node:18-alpine AS build

# WORKDIR /app

# # Accept backend URL during docker build
# ARG VITE_BACKEND_URL
# ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .
# RUN npm run build


# # -----------------------------
# # Stage 2: Serve with Nginx
# # -----------------------------
# FROM nginx:1.25-alpine

# # Copy build output
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]



#test
# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.25
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



#working
# # Stage 1: Build
# FROM mirror.gcr.io/library/node:18 AS build
# WORKDIR /app

# COPY package*.json ./
# RUN npm install --legacy-peer-deps

# COPY . .
# RUN npm run build   

# # Stage 2: Serve with Nginx
# FROM mirror.gcr.io/library/nginx:1.29.1
# COPY --from=build /app/dist /usr/share/nginx/html   

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


