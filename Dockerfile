FROM node:14.16.0-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]