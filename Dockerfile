# Use Ubuntu as the base image
FROM ubuntu:latest

# Install Node.js
RUN apt-get update && \
    apt-get install -y nodejs npm

# Set the working directory
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

#Convert TS to JS
RUN tsc

# Expose the port on which your server runs
EXPOSE 1000
EXPOSE 1001
EXPOSE 1002

# Command to start the server
CMD ["npm", "start"]