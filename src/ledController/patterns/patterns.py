import time
import signal
import sys
import os
import argparse
# from rpi_ws281x import *
# import constants from directory above
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from constants import *

# strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)

# handles the kill signal gracefully
def signal_handler(sig, frame):
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    strip.show()
    sys.exit(0)


def example_pattern(example_parameter):
    for i in range(150, 200):
        strip.setPixelColor(i, 0x0000ff)
    for i in range(200, 250):
        strip.setPixelColor(i, 0xffffff)
    for i in range(250, 300):
        strip.setPixelColor(i, 0x00ff00)
    for i in range(0, 150, 10):
        for j in range(i, i+5):
            strip.setPixelColor(j, 0x00ff00)
    for i in range(5, 150, 10):
        for j in range(i, i+5): 
            strip.setPixelColor(j, 0xffffff)
    strip.show()

    
def pattern(strip, colors, brightness=150, wait_ms=0, iterations=1):
# user can input number of colors (limit <= 10), choose each color
# an array of colors tells me the number of colors I have, do I need to
# pass in the count?
# user can add brightness of the pattern (do I want usa or USA!!!!)
# future: add option to move pattern (pattern animation)

    numColors = len(colors)
    incr = LED_COUNT // numColors
    for i in numColors:
        start = i * incr
        for j in start(j, j + incr):
            strip.setPixelColor(j, colors[i])
    strip.show()
    time.sleep(wait_ms/1000.0)
    

if __name__ == '__main__':
    # parse args
    parser = argparse.ArgumentParser()
    # default colors are orange and white
    parser.add_argument('-c', '--colors', type=int, nargs='*', default=[0xcc5500, 0xffffff], help='List of colors to display in pattern')
    parser.add_argument('-b', '--brightness', type=int, default=150, help='the brightness')
    parser.add_argument('-t', '--time', type=int, default=0, help='the wait time in ms for the animation')
    args = parser.parse_args()
    # set up signal handler
    signal.signal(signal.SIGINT, signal_handler)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    try:
        if args.time == 0:
            # animation == False, don't need to keep the process running
            pattern(strip, args.colors, brightness=args.brightness)
        else:
            # animation == True, need to keep process running
            while True:
                pattern(strip, args.colors, brightness=args.brightness, wait_ms=args.time)

    except KeyboardInterrupt:
        print('lmao')
