//var uc = require('../ledController/uniformColor');
var express = require('express');
var router = express.Router();
var uniformController = require('../ledController/uniformColor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource fcukcer');
});

/* Post new color to LED */
router.post('/uniformColor/setColor', uniformController.setColor);

module.exports = router;