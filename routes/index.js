var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'rpiled' });
});

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  //if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the login page
  // res.render('login', { title: 'login' });
}
module.exports = router;
