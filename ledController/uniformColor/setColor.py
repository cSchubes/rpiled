import argparse
import signal
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from constants import *
from neopixel import *

# Create NeoPixel object with appropriate configuration.
strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)

def signal_handler(sig, frame):
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    strip.show()
    sys.exit(0)

def set_color(color: int):
    print(color)
    for i in range(0, LED_COUNT):
        strip.setPixelColor(i, color)
    strip.show()

if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--color', type=int, required=True, nargs=3, help='the color to display in hexadecimal')
    args = parser.parse_args()
    print(args)

    try:
        set_color(Color(args.color[0], args.color[1], args.color[2]))
    except KeyboardInterrupt:
        print('lmao')
