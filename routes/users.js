//routes/user.js
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile. 
// unsure where this is used
router.get('/profile', function(req, res, next) {
    res.send(req.user);
});*/

module.exports = router;