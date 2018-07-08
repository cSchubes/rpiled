var ws281x = require('rpi-ws281x-native');
var sleep = require('thread-sleep');

var NUM_LEDS = parseInt(process.argv[2], 10) || 10,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});


// ---- animation-loop
var offset = 0;
/*
setInterval(function () {
  for (var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = colorwheel((offset + i) % 256);
  }

  offset = (offset + 1) % 256;
  ws281x.render(pixelData);
}, 1000 / 30);
*/

let sleepTime = 50/1000;
let color = 0xbf00ff;

while (true) {
  for (let i = 0; i < iterations; i++){
    for (let q = 0; q < 3; q++){
      for(let j = 0; j < 300; j+=3){
        pixelData[i+q] = color;
      }
      ws281x.render(strip);
      sleep(sleepTime);
      for (let j = 0; j < 300; j+=3){
        pixelData[i+q] = 0;
      }
    }
  }
}

console.log('Press <ctrl>+C to exit.');


// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function theaterChase(strip, color, wait_ms=50, iterations):
    for j in range(iterations):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, color)
            strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, strip.numPixels(), 3):
strip.setPixelColor(i+q, 0)

for (let i = 0; i < iterations; i++){
  for (let q = 0; q < 3; q++){
    for(let j = 0; j < 300; j+=3){
      strip[i+q] = color;
    }
    ws281x.render(strip);

  }
}