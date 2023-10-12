# Use an official Node.js image as the base image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY frontend/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY frontend ./

# Build your React Native application
RUN npm run build

# Expose the port that your React Native development server runs on
EXPOSE 8081

# Start your React Native application
CMD ["npm", "start"]
