# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install build tools
RUN apt-get update && apt-get install -y build-essential

# Install any needed packages specified in package.json
RUN npm install -g npm@latest && npm cache clean --force && npm install

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run the app when the container launches
CMD ["npm", "run", "dev", "--", "--host"]
