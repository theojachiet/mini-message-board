const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, "public");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("./db/pool");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const membersRouter = require('./routes/membersRouter');

app.use('/users', userRouter);
app.use('/messages', indexRouter);
app.use('/',membersRouter);

//Authntication function
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

// Session functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});


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
