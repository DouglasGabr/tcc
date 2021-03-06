FROM node

WORKDIR /code

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]