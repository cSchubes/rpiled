var express = require('express');
var passport = require('passport-strategy');
var router = express.Router();

/* GET home page. */
// TODO: Change to home page eventually, done in app.js
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' });
});

// Perform action upon posting to login
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;

/*//routes/auth.js
const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport”);

// POST login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});*/