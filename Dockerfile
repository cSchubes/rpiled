FROM resin/raspberry-pi-node

RUN apt-get update && apt-get upgrade

RUN apt-get update \
    && apt-get upgrade \
    && apt-get clean \
&& rm -rf /var/lib/apt/lists/*

# RUN apt-get -y install gcc make python-dev git scons swig

#RUN git clone https://github.com/jgarff/rpi_ws281x && \
#    cd rpi_ws281x && scons && \
#    cd python && python setup.py build && \
#    python setup.py install

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

ADD bin/ ./bin
COPY public/ ./public
COPY routes/ ./routes
COPY views/ ./views
COPY jade-bootstrap/ ./jade-bootstrap
COPY app.js .

CMD ["ls"]