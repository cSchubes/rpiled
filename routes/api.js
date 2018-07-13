//var uc = require('../ledController/uniformColor');
var express = require('express');
var router = express.Router();
var uniformController = require('../ledController/uniformColor');
var animations = require('../ledController/animations');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource fcukcer');
});

/* Post new color to LED */
router.post('/uniformColor/setColor', uniformController.setColor);

router.post('/uniformColor/setBrightness', uniformController.setBrightness);

router.post('/animations/strandtest', animations.strandtest);

router.post('/animations/rainbow', animations.rainbow);

module.exports = router;