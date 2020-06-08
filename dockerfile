FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn install

COPY . /usr/src/app
RUN yarn build

ENV NODE_ENV docker

ARG mongodb_url
ENV MONGODB_URL=$mongodb_url

EXPOSE 3000

CMD [ "yarn", "run", "server" ]
