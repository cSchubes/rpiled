FROM resin/raspberry-pi-node:8

ENV INITSYSTEM on

RUN apt-get update \
    && apt-get upgrade \
    && apt-get clean \
&& rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --production

#ADD rpi_ws281x/ ./rpi_ws281x
#WORKDIR rpi_ws281x/
#RUN scons && cd python/ && python ./setup.py build && python ./setup.py install

ADD bin/ ./bin
ADD public/ ./public
ADD routes/ ./routes
ADD views/ ./views
ADD jade-bootstrap/ ./jade-bootstrap
ADD ledController/ ./ledController
COPY app.js .

# RUN rmmod snd_bcm2835

# CMD ["node", "bin/www"]