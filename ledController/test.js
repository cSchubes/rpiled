let constants = require('./globals');
const { execFile } = require('child_process');

console.log(constants.CURR_ANIMATION_PID);
let child = execFile('python', [`${__dirname}/animations/rainbow.py`], (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
});
constants.CURR_ANIMATION_PID = child.pid;
console.log(constants.CURR_ANIMATION_PID);