// we will need this eventually to actually control the lights
var ws281x = require('rpi-ws281x-native');
var constants = require('./constants');

ws281x.init(constants.NUM_LEDS);
var pixelData = new Uint32Array(constants.NUM_LEDS);

exports.setColor = (req, res, next) => {
    console.log('Here is where we would change the color of the LEDs.');
    let newColor = parseInt(`0x${req.params.color}`);
    for (var i = 0; i < constants.NUM_LEDS; i++) {
        pixelData[i] = newColor;
    };
    ws281x.render(pixelData);
    res.status(200).json({
        data: {
            message: `Successfully changed color to: ${req.params.color}`
        }
    });
};

exports.setBrightness = (req, res, next) => {
    console.log('Here is where we would change the color of the LEDs.');
    let newBrightness = parseInt(req.params.brightness);
    res.status(200).json({
        data: {
            message: `Successfully changed brightness to: ${newBrightness}`
        }
    });
};
