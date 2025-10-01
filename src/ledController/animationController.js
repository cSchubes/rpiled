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

/**************************** TESTING ANIMATIONS ***********************************/
exports.strandTest = async (req, res, next) => {
  console.log('Starting strand test...');
  killOldProcess();
  let args = [`${__dirname}/animations/strandtest.py`]
  let child = startNewProcess(args);
  console.log('Started Strand Test at: ' + child.pid);
  res.status(HTTP_CODES.Ok).json({
    message: 'Triggered Strand Test.'
  });
}

/**************************** RAINBOW ANIMATIONS **********************************/
exports.rainbowGradient = async (req, res, next) => {
  console.log('Starting rainbow gradient...');
  killOldProcess();
  let time = [];
  if (req.body.time) {
    time.push('--time');
    time.push(req.body.time);
  }
  let args = [`${__dirname}/animations/rainbow_gradient.py`];
  args = args.concat(time);
  let child = startNewProcess(args);
  console.log('Started Rainbow Gradient at: ' + child.pid);
  res.status(HTTP_CODES.Ok).json({
    message: 'Triggered Rainbow Gradient.'
  });
}

exports.rainbowStrip = (req, res, next) => {
  console.log('Starting rainbow strip...')
  killOldProcess();
  let time = [];
  if (req.body.time) {
    time.push('--time');
    time.push(req.body.time);
  }
  let args = [`${__dirname}/animations/rainbow_strip.py`];
  args = args.concat(time);
  let child = startNewProcess(args);
  console.log('Started Rainbow Strip at: ' + child.pid);
  res.status(HTTP_CODES.Ok).json({
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
  let optionalArgs = [];
  if (req.body.color) {
    optionalArgs.push('--colors');
    for (let i = 0; i < req.body.color.length; i++) {
      let r = GAMMA[req.body.color[i].r];
      let g = GAMMA[req.body.color[i].g];
      let b = GAMMA[req.body.color[i].b];
      optionalArgs.push(rgb2Int(r, g, b));
    }
  }
  if (req.body.time) {
    optionalArgs.push('--time');
    optionalArgs.push(req.body.time);
  }
  let args = [`${__dirname}/animations/theater_chase.py`];
  args = args.concat(optionalArgs);
  // start process
  let child = startNewProcess(args);
  console.log('Started Theatre Chase at: ' + child.pid);
  res.status(HTTP_CODES.Ok).json({
    message: 'Triggered Theater Chase.'
  });
}

exports.meteor = (req, res, next) => {
  console.log('Starting meteor...')
  killOldProcess();
  let optionalArgs = parseArgs(req.body, METEOR_ARGS);
  let args = [`${__dirname}/animations/meteor.py`];
  args = args.concat(optionalArgs);
  console.log(args);
  let child = startNewProcess(args);
  console.log('Started Meteor at: ' + child.pid);
  res.status(HTTP_CODES.Ok).json({
    message: 'Triggered Meteor.'
  });
}

exports.strobe= (req, res, next) => {
  console.log('Starting strobe...')
  killOldProcess();
  let optionalArgs = parseArgs(req.body, STROBE_ARGS);
  let args = [`${__dirname}/animations/strobe.py`];
  args = args.concat(optionalArgs);
  console.log(args);
  let child = startNewProcess(args);
  console.log('Started Strobe at: ' + child.pid);
  res.status(HTTP_CODES.Ok).json({
    message: 'Triggered Strobe.'
  });
}
