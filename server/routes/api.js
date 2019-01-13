//var uc = require('../ledController/uniformColor');
var express = require('express');
var router = express.Router();
var uniformController = require('../ledController/uniformColor');
var animations = require('../ledController/animations');

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource fcukcer');
});

/* Post new color to LED */
router.post('/uniformColor/setColor', uniformController.setColor);
// router.post('/uniformColor/setBrightness', uniformController.setBrightness);

/* Post new animation to LEDs. */
router.post('/animations/strandtest', animations.strandtest);
router.post('/animations/rainbowGrad', animations.rainbowGrad);
router.post('/animations/rainbowStrip', animations.rainbowStrip);

module.exports = router;
