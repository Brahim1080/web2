var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:8080',
};

var filmsRouter = require('./routes/films');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/films',cors(corsOptions), filmsRouter);


module.exports = app;
