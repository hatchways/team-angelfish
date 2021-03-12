require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flightRouter = require("./routes/flight");
const cityRouter = require("./routes/city");

const userRoutes = require('./routes/users');

const trim = require('./middleware/trim');

//Added mongoose to help connect with our Mongodb database
const mongoose = require('mongoose');

const { json, urlencoded } = express;

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(trim);
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/api/users', userRoutes);
app.use("/api/flights", flightRouter);
app.use("/api/cities", cityRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

//The line below connects our node server with our mongo database
const url = process.env.MONGO_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = app;
