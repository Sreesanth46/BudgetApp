FROM node:alpine
WORKDIR /server
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]