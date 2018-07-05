var express = require('express');
var router = express.Router();

/* GET home page. */
// TODO: Change to home page eventually, done in app.js
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' });
});

module.exports = router;