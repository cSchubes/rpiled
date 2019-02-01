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

    r = 0 if r <= 10 else int(r-(r*fadeValue/256))
    g = 0 if g <= 10 else int(g-(g*fadeValue/256))
    b = 0 if b <= 10 else int(b-(b*fadeValue/256))
    
    strip.setPixelColor(index, Color(r,g,b))

def meteor(strip, color, num_meteors=5, meteor_size=10, decay=64, random=True, wait_ms=20, iterations=1):
    meteor_offset = int(LED_COUNT/num_meteors)
    
    meteors = []
    for i in range(num_meteors):
        meteors.append(0-meteor_offset*i)
    
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    strip.show()
  
    # for i in range(LED_COUNT * 2):
    while True:
        
        for j in range(LED_COUNT):
            if not random or uniform(0, 10) > 5:
                fade_to_black(j, decay)
        
        # for j in range(meteor_size):
        #     for k in range(num_meteors):
        #         if ((i-meteor_offset*k)-j) < LED_COUNT and ((i-meteor_offset*k)-j) >= 0:
        #             strip.setPixelColor((i-meteor_offset*k)-j, color)
   
        for k in range(num_meteors):
            for j in range(meteor_size):
                if (meteors[k]-j) < LED_COUNT and (meteors[k]-j) >= 0:
                    strip.setPixelColor(meteors[k]-j, color)
            if meteors[k] - meteor_size > LED_COUNT:
                meteors[k] = 0
            else:
                meteors[k] += 1
   
        strip.show()
        time.sleep(wait_ms/1000.0)

if __name__ == '__main__':
    # parse args
    parser = argparse.ArgumentParser()
    parser.add_argument('-t', '--time', type=int, default=20, help='The wait time in ms for the animation.')
    parser.add_argument('-c', '--color', type=int, default=255, help='The color to display in base 10 hex')
    parser.add_argument('-m', '--meteors', type=int, default=5, help='The number of meteors to display at once.')
    parser.add_argument('-s', '--size', type=int, default=10, help='The size of each meteor.')
    args = parser.parse_args()
    # set up signal handler
    signal.signal(signal.SIGINT, signal_handler)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    try:
        while True:
            meteor(strip, args.color, num_meteors=args.meteors, meteor_size=args.size, wait_ms=args.time)

    except KeyboardInterrupt:
        print('lmao')
