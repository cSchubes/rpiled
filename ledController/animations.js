// actual animation logic
var ws281x = require('rpi-ws281x-native');
var constants = require('./constants');

ws281x.init(constants.NUM_LEDS);
var pixelData = new Uint32Array(constants.NUM_LEDS);
