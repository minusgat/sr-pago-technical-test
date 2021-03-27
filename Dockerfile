FROM node:14.2.0-slim

WORKDIR /usr/src/app

COPY package.json .

# Create app directory
COPY package-lock.json .

# Install production app dependencies
RUN npm install --only=production

# Bundle app source
COPY . .

CMD ["npm", "start"]
