# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /app

#copy all files
COPY . /app

# Install dependencies
RUN npm install

# Install the PostgreSQL library
RUN npm install pg

# Expose the port the app runs on
EXPOSE 5000

# Define the command to start the app
CMD ["node", "app.js"]
