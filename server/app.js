require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");


//Added mongoose to help connect with our Mongodb database
const mongoose = require("mongoose");

//Added a a pport to run the server on
const port = process.env.PORT || 5000;

const { json, urlencoded } = express;

let app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});



//The line below connects our node server with our mongo database 
const url = process.env.MONGO_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection
connection.once('open', () => {
  console.log('Mongo DB succesfully set up')
});


app.listen(port, ()=>{
  console.log(`server is running on port ${port}`)
});

module.exports = app;
