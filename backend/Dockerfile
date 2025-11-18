FROM node:18 AS build

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install system dependencies for bcrypt to compile
RUN apt-get update && apt-get install -y build-essential python3

# Install dependencies fresh inside the container
RUN rm -rf node_modules
RUN npm install

# Rebuild bcrypt to ensure compatibility with the container's environment
RUN npm rebuild bcrypt --build-from-source 

# Copy the rest of the application code
COPY . .

EXPOSE 5000

# Dynamically set the environment-specific script to run
# CMD ["sh", "-c", "npm run ${NODE_ENV}"]
CMD ["npm", "run", "dev"]

