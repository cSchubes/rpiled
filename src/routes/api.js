const express = require('express');
const router = express.Router();
const uniformController = require('../ledController/uniformController');
const animationRouter = require('./animationRouter');

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource fcukcer');
});

/* Set up to use animation router for animation triggering and database. */
router.use('/animations', animationRouter);

/* Post new color to LEDs */
router.post('/uniformColor/setColor', uniformController.setColor);

module.exports = router;
