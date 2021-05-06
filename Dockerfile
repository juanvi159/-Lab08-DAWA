FROM node:latest

# set a directory for the app
WORKDIR /usr/src/app

# copy all the files to the container
COPY . .

# install dependencies
RUN npm install nodemon
RUN npm install express

# tell the port number the container should expose
EXPOSE 3001

# run the command
CMD ["npm", "start"]
