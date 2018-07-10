var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {
  /* GET home page. */
  // TODO: Change to home page eventually, done in app.js
  app.get('/signup', function(req, res, next) {
    res.render('signup', { 
      title: 'signup',
      message: req.flash('signupMessage')
    });
  });
  
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/login', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

}