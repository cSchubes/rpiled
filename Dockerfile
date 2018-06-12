FROM resin/raspberry-pi-node

RUN apt-get update && apt-get upgrade

#RUN apt-get -y install gcc make python-dev git scons swig

COPY package.json /package.json

RUN npm install

COPY /bin /usr/src/app
COPY /public /usr/src/app
COPY /routes /usr/src/app
COPY /views /usr/src/app
COPY app.js /usr/src/app

CMD ["node", "start"]