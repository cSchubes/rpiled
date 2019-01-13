// animation handlers for the router
const { execFile } = require('child_process');
var globals = require('./globals');

/**** TESTING ANIMATIONS ****/

exports.strandtest = (req, res, next) => {
  console.log('Starting strand test.');
  if (globals.CURR_ANIMATION_PID != -1) {
      process.kill(globals.CURR_ANIMATION_PID, 'SIGINT');
      console.log('killed the old process');
  }
  let child = execFile('python3', [`${__dirname}/animations/strandtest.py`], (err, stdout, stderr) => {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
  })
  globals.CURR_ANIMATION_PID = child.pid;
  res.status(200).json({
      data: {
          message: 'Successfully started strandtest.'
      }
  });
}

/**** RAINBOW ANIMATIONS ****/

exports.rainbowGrad = (req, res, next) => {
  console.log('Starting rainbow gradient animation.');
  if (globals.CURR_ANIMATION_PID != -1) {
    process.kill(globals.CURR_ANIMATION_PID, 'SIGINT');
    console.log('killed the old process' + globals.CURR_ANIMATION_PID);
  }
  let child = execFile('python3', [`${__dirname}/animations/rainbow_grad.py`], (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  })
  globals.CURR_ANIMATION_PID = child.pid;
  res.status(200).json({
    data: {
      message: 'Successfully started rainbow gradient animation.'
    }
  });
}

exports.rainbowStrip = (req, res, next) => {
  console.log('Starting rainbow strip animation.')
  if (globals.CURR_ANIMATION_PID != -1) {
    process.kill(globals.CURR_ANIMATION_PID, 'SIGINT');
    console.log('killed the old process' + globals.CURR_ANIMATION_PID);
  }
  let child = execFile('python3', [`${__dirname}/animations/rainbow_strip.py`], (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  })
  globals.CURR_ANIMATION_PID = child.pid;
  res.status(200).json({
    data: {
      message: 'Successfully started rainbow strip animation.'
    }
  });
}


