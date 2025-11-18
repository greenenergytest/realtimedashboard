# stage 1 : Build the React app

FROM node:16 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# RUN npm run build
# Expose port for React development server
EXPOSE 5173

# Run the React development server
# CMD ["npm", "start"]
CMD ["npm", "run", "dev", "--", "--host"]


# # stage 2: Serve the React app with nginx
# # FROM node:16
# FROM nginx:alpine 
# WORKDIR /app
# # COPY --from=build /app /app
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 5173
# CMD ["nginx", "-g", "daemon off;"]
# # CMD ["npm", "start"] #use react dev server for hot reloading

# Stage 2: Serve the React app with nginx
# FROM nginx:alpine
# # Copy the build files from the previous stage to the nginx directory
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 5173
# CMD ["nginx", "-g", "daemon off;"] 