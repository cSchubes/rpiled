//var uc = require('../ledController/uniformColor');
var express = require('express');
var router = express.Router();
var uniformController = require('../ledController/uniformColor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource fcukcer');
});

/* Post new color to LED */
<<<<<<< HEAD
router.post('/uniformColor/setColor/:color', uniformController.setColor);
=======

router.post('/uniformColor/setColor', uniformController.setColor);
>>>>>>> 14b85e3cfe87b5e90c9fab6251d2b2e7966af3d2

module.exports = router;