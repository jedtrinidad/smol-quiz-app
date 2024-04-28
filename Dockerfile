FROM node:latest as build


COPY . .

RUN npm install -D

RUN npm run build

FROM nginx:1.26.0-alpine

COPY --from=build dist/ /usr/share/nginx/html