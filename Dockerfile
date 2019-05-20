FROM alpine
RUN apk add --update nodejs-npm && mkdir /plugin
WORKDIR /plugin
ENV PATH /plugins/node_modules/.bin:$PATH
COPY package.json /plugin/package.json
RUN npm install --silent
CMD ["npm", "start"]
