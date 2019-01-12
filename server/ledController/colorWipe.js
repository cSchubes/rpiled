var ws281x = require('rpi-ws281x-native');
var sleep = require('sleep');

var NUM_LEDS = parseInt(process.argv[2], 10) || 300,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () { process.exit(0); });
});

let sleepTime = 30/1000;
let realSleepTime = parseInt(sleepTime * Math.pow(10, 6));

function colorWipe(color) {
    for (let i = 0; i < 300; i++) {
        pixelData[i] = color;
        ws281x.render(pixelData);
        sleep.usleep(realSleepTime);
    }
}

function main() {
    colorWipe(0xff0000);
    colorWipe(0x00ff00);
    colorWipe(0x0000ff);
}

main();