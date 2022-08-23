# Base image
# FROM node:latest
FROM ubuntu:18.04
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD [ "nodemon", "server.js" ]

# 建立容器
#docker build -t 專案名稱 

#docker run -p 3000:8080 -d  專案名稱

# 刪除容器
# $ docker rm $(docker ps -a -q) 
# # 或
# $ docker rm $(docker ps -aq)


# FROM alpine:3.13

# RUN apk update
# RUN apk add vim
# RUN apk add curl

