/**
 * Filename:        animationController.js
 * Author(s):       Carson Schubert (carson.schubert14@gmail.com)
 * Date Created:    June 2018
 * 
 * Provides functions to handle animation API requests.
 */

const { execFile } = require('child_process');
var globals = require('../globals');

/*************************** HELPERS *********************************************/
function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function killOldProcess() {
  if (globals.CURR_ANIMATION_PID != -1) {
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

/**************************** TESTING ANIMATIONS ***********************************/
exports.strandTest = async (req, res, next) => {
  console.log('Starting strand test...');
  killOldProcess();
  let args = [`${__dirname}/animations/strandtest.py`]
  let child = startNewProcess(args);
  console.log('Started Strand Test at: ' + child.pid);
  res.status(globals.HTTP_CODES.Ok).json({
    message: 'Triggered Strand Test.'
  });
}

/**************************** RAINBOW ANIMATIONS **********************************/
exports.rainbowGradient = async (req, res, next) => {
  console.log('Starting rainbow gradient...');
  killOldProcess();
  let time = [];
  if (req.body.time) {
    time.push(req.body.time);
  }
  let args = [`${__dirname}/animations/rainbow_gradient.py`, '--time']
  args = args.concat(time);
  let child = startNewProcess(args);
  console.log('Started Rainbow Gradient at: ' + child.pid);
  res.status(globals.HTTP_CODES.Ok).json({
    message: 'Triggered Rainbow Gradient.'
  });
}

exports.rainbowStrip = (req, res, next) => {
  console.log('Starting rainbow strip...')
  killOldProcess();
  let time = [];
  if (req.body.time) {
    time.push(req.body.time);
  }
  let args = [`${__dirname}/animations/rainbow_strip.py`, '--time']
  args = args.concat(time);
  let child = startNewProcess(args);
  console.log('Started Rainbow Strip at: ' + child.pid);
  res.status(globals.HTTP_CODES.Ok).json({
    message: 'Triggered Rainbow Strip.'
  });
}

/**************************** CHOOSE COLOR(S) *************************************/
/**
 * Example post data for theater chase:
    body: {
      colors: [
        {
          r: 0,
          g: 0, 
          b: 255
        },
        {
          r: 255,
          g: 0, 
          b: 0
        }
      ]
    }
  * The default animation (no colors provided) will switch between red, green, and blue.
  * If you provide only one color, only that color will be used.
 */
exports.theaterChase = (req, res, next) => {
  console.log('Starting Theatre Chase...');
  killOldProcess();
  // parse RGB colors into hex colors to feed to animation script
  let colors = [];
  if (req.body.colors) {
    for (let i = 0; i < req.body.colors.length; i++) {
      let r = globals.gammaArr[req.body.colors[i].r];
      let g = globals.gammaArr[req.body.colors[i].g];
      let b = globals.gammaArr[req.body.colors[i].b];
      colors.push(rgb2Int(r, g, b));
    }
  }
  let args = [`${__dirname}/animations/theater_chase.py`, '--colors']
  args = args.concat(colors);
  // start process
  let child = startNewProcess(args);
  console.log('Started Theatre Chase at: ' + child.pid);
  res.status(globals.HTTP_CODES.Ok).json({
    message: 'Triggered Theater Chase.'
  });
}
