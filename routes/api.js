//var uc = require('../ledController/uniformColor');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource fcukcer');
});

/* Post new color to LED */
router.post('/uniformColor/setColor', function(req, res, next) {
    res.send('colors fucker');
    setColor(req, res, next);
});

module.exports = router;