FROM node:14.15-alpine

ENV NODE_ENV=production
WORKDIR "/app"

RUN yarn global add typescript

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE $PORT

CMD [ "yarn", "start" ]