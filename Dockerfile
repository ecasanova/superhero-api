FROM node:12-alpine as production
ARG NODE_ENV=${NODE_ENV}
ENV NODE_ENV=${NODE_ENV}
WORKDIR /api
COPY package*.json ./
RUN npm install 
COPY . .
CMD ["/bin/sh", "entrypoint.sh"]