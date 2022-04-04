FROM node:12-alpine
WORKDIR /api
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN npm run build
COPY . .
CMD ["/bin/sh", "entrypoint.sh"]