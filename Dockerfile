FROM node

WORKDIR /code

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]