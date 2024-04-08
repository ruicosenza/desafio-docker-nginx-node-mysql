FROM node:18

WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.7.0

RUN apt update && \
    apt install -y wget netcat-traditional && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for


COPY package.json .
RUN npm install

COPY . .
RUN chmod +x ./start.sh
EXPOSE 3000