import sys
import signal

def signal_handler(sig, frame):
    print('what the fuck')
    sys.exit(0)
    
signal.signal(signal.SIGINT, signal_handler)
    
while True:
    pass         