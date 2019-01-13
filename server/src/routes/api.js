var express = require('express');
var router = express.Router();
var uniformController = require('../ledController/uniformController');
var animationController = require('../ledController/animationController');

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource fcukcer');
});

/* Post new color to LEDs */
router.post('/uniformColor/setColor', uniformController.setColor);

/* Post new animation to LEDs. */
router.post('/animations/strandtest', animationController.strandtest);
router.post('/animations/rainbowGrad', animationController.rainbowGrad);
router.post('/animations/rainbowStrip', animationController.rainbowStrip);
router.post('/animations/theaterChase', animationController.theaterChase);

module.exports = router;
