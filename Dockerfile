FROM node:16 as base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./

FROM base as development
CMD [ "yarn","start:dev" ]

FROM base as test
CMD [ "yarn","test" ]

FROM base as production
RUN yarn build 
CMD ["yarn", "start" ]