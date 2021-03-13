FROM node:14.16.0-alpine as ts-builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:14.16.0-alpine
WORKDIR /app
COPY package*.json .
RUN npm install --only=production
COPY --from=ts-builder /app/dist ./dist
CMD ["npm", "run", "start:prod"]