// we will need this eventually to actually control the lights
var ws281x = require('rpi-ws281x-native');
var constants = require('./globals');

ws281x.init(constants.NUM_LEDS);
var pixelData = new Uint32Array(constants.NUM_LEDS);

const gammaArr = [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,
    1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,
    2,  3,  3,  3,  3,  3,  3,  3,  4,  4,  4,  4,  4,  5,  5,  5,
    5,  6,  6,  6,  6,  7,  7,  7,  7,  8,  8,  8,  9,  9,  9, 10,
   10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16,
   17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 24, 24, 25,
   25, 26, 27, 27, 28, 29, 29, 30, 31, 32, 32, 33, 34, 35, 35, 36,
   37, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50,
   51, 52, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67, 68,
   69, 70, 72, 73, 74, 75, 77, 78, 79, 81, 82, 83, 85, 86, 87, 89,
   90, 92, 93, 95, 96, 98, 99,101,102,104,105,107,109,110,112,114,
  115,117,119,120,122,124,126,127,129,131,133,135,137,138,140,142,
  144,146,148,150,152,154,156,158,160,162,164,167,169,171,173,175,
  177,180,182,184,186,189,191,193,196,198,200,203,205,208,210,213,
  215,218,220,223,225,228,231,233,236,239,241,244,247,249,252,255 ];
  
var gamma   = 2; // Correction factor
var max_in  = 255; // Top end of INPUT range
var max_out = 255; // Top end of OUTPUT range

// let gammaArr = [];

/*
for(let i = 0; i <= max_in; i++) {
    let entry = Math.floor(Math.pow(i/max_in, gamma) * max_out + 0.5);
    gammaArr.push(entry);
}

console.log(gammaArr);
*/
  
function rgb2Int(r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

exports.setColor = (req, res, next) => {
    console.log('Here is where we would change the color of the LEDs.');
    if (globals.CURR_ANIMATION_PID != -1) {
        process.kill(globals.CURR_ANIMATION_PID, 'SIGINT');
        console.log('killed the old process' + globals.CURR_ANIMATION_PID);
        globals.CURR_ANIMATION_PID = -1;
    }
    console.log(req.body)
    let r = gammaArr[req.body.r];
    let g = gammaArr[req.body.g];
    let b = gammaArr[req.body.b];
    console.log('Gamma corrrected: ' + r + ' ' + g + ' ' + b);
    let newColor = rgb2Int(req.body.r, Math.floor(req.body.g * .9), Math.floor(req.body.b * .75));
    for (var i = 0; i < constants.NUM_LEDS; i++) {
        pixelData[i] = newColor;
    };
    ws281x.render(pixelData);
    res.status(200).json({
        data: {
            originalRGB: {
                r: req.body.r,
                g: req.body.g,
                b: req.body.b
            },
            correctedRGB: {
                r: r,
                g: g,
                b: b
            },
            message: 'Successfully changed color.'
        }
    });
};

exports.setBrightness = (req, res, next) => {
    console.log('Here is where we would change the brightness of the LEDs.');
    if (globals.CURR_ANIMATION_PID != -1) {
        process.kill(globals.CURR_ANIMATION_PID, 'SIGINT');
        console.log('killed the old process' + globals.CURR_ANIMATION_PID);
        globals.CURR_ANIMATION_PID = -1;
    }
    let newBrightness = parseInt(req.body.brightness);
    console.log(newBrightness);
    ws281x.setBrightness(newBrightness);
    ws281x.render(pixelData);
    res.status(200).json({
        data: {
            message: `Successfully changed brightness to: ${newBrightness}`
        }
    });
};
