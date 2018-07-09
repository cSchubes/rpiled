var ws281x = require('rpi-ws281x-native');
var sleep = require('sleep');

var NUM_LEDS = parseInt(process.argv[2], 10) || 300,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () { process.exit(0); });
});

let sleepTime = 25/1000;
let realSleepTime = parseInt(sleepTime * Math.pow(10, 6));
console.log(realSleepTime);
let color = 0xbf00ff;
let iterations = 300;

for (let i = 0; i < iterations; i++){
    for (let q = 0; q < 3; q++){
        for(let j = 0; j < 300; j+=3){
            pixelData[j+q] = color;
        }
        ws281x.render(pixelData);
        sleep.usleep(realSleepTime);
        for (let j = 0; j < 300; j+=3){
            pixelData[j+q] = 0;
        }
    }
}