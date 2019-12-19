FROM node:12

ADD . .

RUN yarn

CMD [ "node", "." ]