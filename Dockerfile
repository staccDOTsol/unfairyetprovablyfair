FROM node:16.14.0-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*",  "yarn.lock", "./"]
RUN apk add --no-cache git python3 py3-pip make g++ nginx 
COPY . .
RUN npm i -g @types/react  lessc typescript less-watch-compiler ts-node yarn preact next nodemon sirv cross-env react-scripts shx --force
RUN yarn add @types/react typescript lessc preact next nodemon sirv cross-env react-scripts  -W

RUN  PORT=8080 yarn install && yarn build && mv node_modules ../
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start"]
