import time
import signal
import sys
import os
import argparse
from rpi_ws281x import *
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from constants import *

strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)

def signal_handler(sig, frame):
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    strip.show()
    sys.exit(0)

def theaterChase(strip, color, wait_ms=50, iterations=10):
    """Movie theater light style chaser animation."""
    for j in range(iterations):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, color)
            strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, 0)
                
if __name__ == '__main__':
    # parse arguments, default colors are B R G cycle
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--colors', type=int, nargs='*', default=[255, 16711680, 65280], help='The color(s) to display in hex')
    parser.add_argument('-t', '--time', type=int, default=50, help='The wait time in ms for the animation.')
    parser.add_argument('-i', '--iterations', type=int, default=0, help='The total number of full color cycles to perform. Set to 0 for infinite.')
    args = parser.parse_args()

    # Set up kill signal handling
    signal.signal(signal.SIGINT, signal_handler)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    pattern_repeats = args.iterations if args.iterations > 0 else 1000 # Use a large number for 'infinite'

    try:
        while True:
            for c in args.colors:
                theaterChase(strip, c, wait_ms=args.time, iterations=pattern_repeats)

    except KeyboardInterrupt:
        print('lmao')
