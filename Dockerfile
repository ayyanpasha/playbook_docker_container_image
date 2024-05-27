# Use Ubuntu as the base image
FROM ubuntu:latest

# Install required packages and Node.js 22.x
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs build-essential

# Set the working directory
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the ports on which your server runs
EXPOSE 1000
EXPOSE 1001
EXPOSE 1002

# Start the application with PM2 using the ecosystem configuration
CMD ["npm", "start"]