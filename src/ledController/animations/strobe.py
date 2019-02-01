import time
import signal
import sys
import os
import argparse
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

def strobe(strip, color, wait_ms=20, iterations=1):
    for i in range(LED_COUNT):
        strip.setPixelColor(i, color)
    
    strip.show()
    time.sleep(wait_ms/1000.0)
    
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    
    strip.show()
    time.sleep(wait_ms/1000.0)
   

if __name__ == '__main__':
    # parse args
    parser = argparse.ArgumentParser()
    parser.add_argument('-t', '--time', type=int, default=30, help='The wait time in ms for the animation.')
    parser.add_argument('-c', '--color', type=int, default=16777215, help='The color to display in base 10 hex')
    args = parser.parse_args()
    # set up signal handler
    signal.signal(signal.SIGINT, signal_handler)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    try:
        while True:
            strobe(strip, args.color, wait_ms=args.time)

    except KeyboardInterrupt:
        print('lmao')
