const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const filmsRouter = require('./routes/films');
const pizzaRouter = require('./routes/pizzas');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/films', filmsRouter);
app.use('/pizzas', pizzaRouter);

module.exports = app;
