// config/passport.js
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var knex = require('knex')({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/dev.sqlite3'
    }
  });
var bcrypt = require('bcrypt')
// load up the user model
var User  = require('../models/user');
var lock = false;
require('dotenv').config();

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        knex.select('id').from('users').where('id', id).then(function(row) {
            if (row.length == 0) return done(null, false);
            return done(null, row[0]);
        });

    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
		// find a user whose username is the same as the forms username
        // we are checking to see if the user trying to login already exists
        knex.select('username').from('users').where('username', username).then(function(resp) {
            console.log(resp)
            if (resp.length == 0) {
                var hashPW = null
                bcrypt.hash(password, process.env.SALT, function(err, hash) {
                    // Store hash in your password DB.
                    hashPW = hash;
                });
                knex.insert('id', {username: username}, {password: hashPW}, {type: "USER"}).into('users')
                var newUser = new User()
                newUser.username = username;
                newUser.passport = hashPW;
                return done(null, newUser);

            } else {
                return done(null, false, req.flash('signupMessage', 'Username has been taken.'));
            }
           
        });
        return null;

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with username
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with username and password from our form
        var hashPW = null
        bcrypt.hash(password, process.env.SALT, function(err, hash) {
            // Store hash in your password DB.
            hashPW = hash;
        });

        knex.select('username').from('users').where({
            username: username,
            password: 'test1'
          }).then(function(user) {
            console.log(user)
            if (user.length == 0) {
                return done(null, false, req.flash('loginMessage', 'Login Failed! Invalid Credentials or someone else may be logged in!'));
            } else {
                lock = true;
                return done(null, user[0]);
            }
          });

    }));

    // LOGOUT callback
    passport.use('local-logout',
    function() {
        lock = false;
    });

};