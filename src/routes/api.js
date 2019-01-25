const express = require('express');
const router = express.Router();
const animationRouter = require('./animationRouter');
const colorRouter = require('./colorRouter');

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource.');
});

/* Set up to use animation router for animation triggering and database. */
router.use('/animations', animationRouter);

/* Color router for database modification and lights trigger */
router.use('/colors', colorRouter);


module.exports = router;
