import sys
import signal
import argparse
import time

def signal_handler(sig, frame):
    print('Exiting...')
    sys.exit(0)
    
if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--colors', type=int, nargs='*', default=[255, 16711680, 65280], help='The color(s) to display in hex')
    args = parser.parse_args()
    print(args)
    
    for c in args.colors:
        print(c)
    
    # while True:
    #     print('Working!')
    #     time.sleep(1)
