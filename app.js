const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, "public");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');

app.use('/users', userRouter);
app.use('/', indexRouter);

app.listen(3000, (error) => {
    if (error) throw error;
    console.log('app listening on port 3000');
});

app.use((req, res) => {
    res.status(404).sendFile('./404.html', {root: __dirname});
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
