var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource fcukcer');
});

router.get('/colors', function(req, res, next) {
    res.send('colors');
});

module.exports = router;