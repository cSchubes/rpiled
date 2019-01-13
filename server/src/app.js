// initial setup from tutorial
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// our old setup stuff
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// load routers
var indexRouter = require('../routes/index');
var apiRouter   = require('../routes/api');

// create app
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser());

// Send routers to app
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/api', apiRouter);

// tutorial route
app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

// // other stuff from our old one
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('node_modules', express.static(path.join(__dirname + 'node_modules')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

// set up to communicate with vue
app.listen(process.env.PORT || 8081)

module.exports = app;
