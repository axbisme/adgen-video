# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose API port
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
