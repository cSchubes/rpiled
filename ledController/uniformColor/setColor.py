from constants import *
import time
from neopixel import *
import signal
import sys

strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)

def signal_handler(sig, frame):
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    strip.show()
    sys.exit(0)