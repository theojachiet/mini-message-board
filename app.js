const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, "public");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require('./routes/indexRouter');

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
