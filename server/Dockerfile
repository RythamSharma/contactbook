FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY prisma/ ./prisma
COPY . .
RUN npx prisma migrate deploy
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]
