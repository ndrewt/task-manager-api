FROM node:20-alpine

WORKDIR /task_manager

COPY package.json  /task_manager

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
