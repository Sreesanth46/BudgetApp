FROM node:alpine AS build
WORKDIR /client
COPY package*.json .
RUN npm ci
COPY . .
ARG VITE_BASE_URL
ENV VITE_BASE_URL $VITE_BASE_URL
RUN ["npm", "run", "build"]

FROM nginx:alpine
COPY --from=build /client/dist /usr/share/nginx/html