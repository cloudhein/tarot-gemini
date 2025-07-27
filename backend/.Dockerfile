FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev && npm install -g bun

COPY . .

EXPOSE 5674 

CMD ["bun", "run", "--hot", "src/index.ts"]
