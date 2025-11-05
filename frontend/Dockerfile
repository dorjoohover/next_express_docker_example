FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
USER root
# RUN chown -R root:app .

RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev