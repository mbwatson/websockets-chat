# Base image
FROM node:18-alpine

# Create and set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install and cache app dependencies
RUN apk add git
COPY package*.json ./
RUN npm install

expose 8080

# start app
CMD ["npm", "start"]
