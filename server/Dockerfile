FROM node:8.11.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy source code
COPY . /usr/src/app
RUN npm install

EXPOSE 3000
CMD ["node", "/usr/src/app/server.js"]
