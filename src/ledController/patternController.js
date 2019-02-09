/**
 * Filename:        animationController.js
 * Author(s):       Carson Schubert (carson.schubert14@gmail.com)
 * Date Created:    June 2018
 * 
 * Provides functions to handle animation API requests.
 */

const { execFile } = require('child_process');
var globals = require('../globals');
const { HTTP_CODES, GAMMA, METEOR_ARGS, STROBE_ARGS } = require('../globals');

/*************************** HELPERS *********************************************/
function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function killOldProcess() {
  if (globals.CURR_ANIMATION_PID != -1) {
    console.log(globals.CURR_ANIMATION_PID);
    process.kill(globals.CURR_ANIMATION_PID, 'SIGINT');
    console.log('Killed the old process: ' + globals.CURR_ANIMATION_PID);
  }
}

function startNewProcess(args) {
  let child = execFile('python3', args, (err, stdout, stderr) => {
    // reset process tracking if the animation fails
    if (err) {
      console.log(err);
      globals.CURR_ANIMATION_PID = -1;
    }
  })
  globals.CURR_ANIMATION_PID = child.pid;
  return child;
}

function parseArgs(body, argList) {
  let result = [];
  for(let i = 0; i<argList.length; i++) {
    if (body[argList[i]]) {
      result.push(`--${argList[i]}`);
      result.push(body[argList[i]]);
    }
  }
  return result;
}
