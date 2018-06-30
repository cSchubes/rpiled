FROM resin/raspberry-pi-node

RUN apt-get update && apt-get upgrade

RUN apt-get update \
    && apt-get install scons python-dev python-pip swig \
    && apt-get upgrade \
    && apt-get clean \
&& rm -rf /var/lib/apt/lists/*

RUN python -m pip install --upgrade pip setuptools wheel

# RUN apt-get -y install gcc make python-dev git scons swig

#RUN git clone https://github.com/jgarff/rpi_ws281x && \
#    cd rpi_ws281x && scons && \
#    cd python && python setup.py build && \
#    python setup.py install

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

ADD rpi_ws281x/ ./rpi_ws281x
WORKDIR rpi_ws281x/
RUN scons && python python/setup.py build && python python/setup.py install
WORKDIR /usr/src/app

ADD bin/ ./bin
ADD public/ ./public
ADD routes/ ./routes
ADD views/ ./views
ADD jade-bootstrap/ ./jade-bootstrap
COPY app.js .

CMD ["node", "bin/www"]