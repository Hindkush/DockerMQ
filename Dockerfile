FROM node:14
WORKDIR /app
COPY  package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node","producer.js"]