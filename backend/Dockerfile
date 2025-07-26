FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

FROM oven/bun:alpine AS production 

WORKDIR /app

COPY --from=builder /app /app/

EXPOSE 5674

CMD ["bun", "run", "--hot", "src/index.ts"]

