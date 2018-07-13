// animation handlers for the router
const { spawn } = require('child_process');
var globals = require('./globals');

exports.rainbow = (req, res, next) => {
    console.log('Starting rainbow animations.');
    res.status(200).json({
        data: {
            message: 'Successfully started rainbow animation.'
        }
    });
}

exports.strandtest = (req, res, next) => {
    console.log('Starting strand test.');
    globals.CURR_ANIMATION_PID = spawn('python', ['animations/strandtest.py']).pid
    console.log(globals.CURR_ANIMATION_PID);
    res.status(200).json({
        data: {
            message: 'Successfully started strandtest.'
        }
    });
}