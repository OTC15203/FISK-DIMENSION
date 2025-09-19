FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile || yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]
