# Stage 1: Builder
FROM node:22-alpine3.19 AS builder

WORKDIR /serve

COPY . .

WORKDIR /serve/dist

RUN npm install --force
RUN npm run build

# Stage 2: Executor
FROM alpine:3.19

EXPOSE 8000

WORKDIR /serve/dist

COPY --from=builder /serve/dist /serve/dist

RUN apk --no-cache -U add python3 && \
    apk upgrade --no-cache -U -a  
# Patch OpenSSL vulnerability^

CMD [ "python3", "-m", "http.server", "8000" ]
