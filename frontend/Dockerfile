FROM node:18.19.1-bullseye-slim

WORKDIR /usr/src/app

RUN npm install -g @angular/cli --legacy-peer-deps

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4200

CMD [ "npm", "start", "--", "--host", "0.0.0.0" ]

