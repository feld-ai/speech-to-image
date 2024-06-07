# npm base container
FROM node:22-alpine3.19

COPY . . 
RUN npm install --force
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host 0.0.0.0", "--port", "5555" ]
