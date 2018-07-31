import time
from neopixel import *
import signal
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from constants import *

strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)

def signal_handler(sig, frame):
    for i in range(LED_COUNT):
        strip.setPixelColor(i, 0)
    strip.show()
    sys.exit(0)
    
def worldCup():
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

if __name__ == '__main__':
    # Create NeoPixel object with appropriate configuration.
    signal.signal(signal.SIGINT, signal_handler)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    try:
        worldCup()

    except KeyboardInterrupt:
        print('lmao')
