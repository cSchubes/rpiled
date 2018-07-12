const { spawn } = require('child_process')

let child = spawn('python ../rpi_ws281x/python/examples/strandtest.py')
console.log(child.pid)
