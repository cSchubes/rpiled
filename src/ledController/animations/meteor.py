import time
import signal
import sys
import os
import argparse
from random import uniform
from rpi_ws281x import *
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from constants import *

# Create NeoPixel object with appropriate configuration.
strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)

def signal_handler(sig, frame):
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    strip.show()
    sys.exit(0)
    
def fade_to_black(index, fadeValue):
    oldColor = strip.getPixelColor(index)
    r = (oldColor & 0x00ff0000) >> 16
    g = (oldColor & 0x0000ff00) >> 8
    b = (oldColor & 0x000000ff)

    # r= (r<=10) ? 0 : (int) r-(r*fadeValue/256);
    # g= (g<=10) ? 0 : (int) g-(g*fadeValue/256);
    # b= (b<=10) ? 0 : (int) b-(b*fadeValue/256);
    
    r = 0 if r <= 10 else int(r-(r*fadeValue/256))
    g = 0 if g <= 10 else int(g-(g*fadeValue/256))
    b = 0 if b <= 10 else int(b-(b*fadeValue/256))
    
    strip.setPixelColor(index, Color(r,g,b))

def meteor(strip, color, meteor_size=10, decay=64, random=True, wait_ms=20, iterations=1):
    """Draw rainbow that uniformly distributes itself across all pixels."""
    # setAll(0,0,0);
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    strip.show()
  
    # for(int i = 0; i < NUM_LEDS+NUM_LEDS; i++) {
    for i in range(LED_COUNT * 2):
    
        # // fade brightness all LEDs one step
        # for(int j=0; j<NUM_LEDS; j++) {
        #     if( (!meteorRandomDecay) || (random(10)>5) ) {
        #         fadeToBlack(j, meteorTrailDecay );        
        #     }
        # }
        
        for j in range(LED_COUNT):
            if not random or uniform(0, 10) > 5:
                fade_to_black(j, decay)
        
        # // draw meteor
        # for(int j = 0; j < meteorSize; j++) {
        #     if( ( i-j <NUM_LEDS) && (i-j>=0) ) {
        #         setPixel(i-j, red, green, blue);
        #     } 
        # }
        
        for j in range(meteor_size):
            if (i-j) < LED_COUNT and (i-j) >= 0:
                strip.setPixelColor(i-j, color)
   
        strip.show()
        time.sleep(wait_ms/1000.0)

if __name__ == '__main__':
    # parse args
    parser = argparse.ArgumentParser()
    parser.add_argument('-t', '--time', type=int, default=20, help='The wait time in ms for the animation.')
    args = parser.parse_args()
    # set up signal handler
    signal.signal(signal.SIGINT, signal_handler)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    try:
        while True:
            meteor(strip, Color(0, 0, 255))

    except KeyboardInterrupt:
        print('lmao')
