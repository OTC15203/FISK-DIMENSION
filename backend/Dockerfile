FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile || yarn install --production
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "src/index.js" ]
