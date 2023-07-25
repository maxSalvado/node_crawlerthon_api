# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install stable version for Google Chrome and necessary libs and fonts to make the browser work with Puppeteer
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Install Elasticsearch
RUN apt-get update && apt-get install -y openjdk-11-jre-headless
RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
RUN echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-7.x.list
RUN apt-get update && apt-get install -y elasticsearch

# Install the dependencies
RUN npm install

# Install Node.js dependencies and Jest to test the application in the container
RUN npm install
RUN npm install jest --global

# Copy the rest of the application files to the container
COPY src ./src
COPY . .

# Expose port 3030 for your Node.js application
EXPOSE 3030

# Start Elasticsearch and then run the npm dev command
CMD ["sh", "-c", "service elasticsearch start && npm run dev"]

