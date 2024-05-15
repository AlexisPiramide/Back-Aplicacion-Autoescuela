FROM node:latest

WORKDIR /app
RUN npm install nodemon --save-dev
RUN git clone https://github.com/AlexisPiramide/Back-Aplicacion-Autoescuela .

RUN npm install

CMD ["npm", "run", "dev"]
