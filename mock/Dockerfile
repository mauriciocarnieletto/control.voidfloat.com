FROM node:latest

RUN npm install -g json-server

WORKDIR /json-server
ENV PATH /json-server/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 80

CMD ["npm", "start"]