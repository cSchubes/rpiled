/**
 * Filename:        uniformController.js
 * Author(s):       Carson Schubert (carson.schubert14@gmail.com)
 * Date Created:    June 2018
 * 
 * Provides functions to handle uniform color API requests.
 */

const { execFile } = require('child_process');
var globals = require('../globals');
const { HTTP_CODES, GAMMA } = require('../globals');
  
var gamma   = 2; // Correction factor
var max_in  = 255; // Top end of INPUT range
var max_out = 255; // Top end of OUTPUT range

/*
for(let i = 0; i <= max_in; i++) {
    let entry = Math.floor(Math.pow(i/max_in, gamma) * max_out + 0.5);
    gammaArr.push(entry);
}

console.log(gammaArr);
*/

/**** HELPERS ****/

function killOldProcess() {
  if (globals.CURR_ANIMATION_PID != -1) {
    process.kill(globals.CURR_ANIMATION_PID, 'SIGINT');
    console.log('Killed the old process: ' + globals.CURR_ANIMATION_PID);
    globals.CURR_ANIMATION_PID = -1;
  }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**** CONTROLLERS ****/

exports.setColor = async (req, res, next) => {
  killOldProcess();
  let r = GAMMA[req.body.r];
  let g = GAMMA[req.body.g];
  let b = GAMMA[req.body.b];
  console.log('Gamma corrrected: ' + r + ' ' + g + ' ' + b);
  let brightness = req.body.brightness;
  let args = [`${__dirname}/uniformColor/set_color.py`, '-b', `${brightness}`, '--color', `${r}`, `${g}`, `${b}`]
  try {
    await new Promise((resolve, reject) => {
      execFile('python3', args, (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve();
      })
    })
    res.status(HTTP_CODES.Ok).json({
      originalRGB: {
        r: req.body.r,
        g: req.body.g,
        b: req.body.b
      },
      correctedRGB: {
        r: r,
        g: g,
        b: b
      },
      message: 'Successfully changed color.'
    });
  } catch (err) {
    res.status(HTTP_CODES.InternalServerError).json({
      error: 'Unable to change color.'
    })
  }
};
