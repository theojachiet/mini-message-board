const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/new', (req, res) => {
    res.render('new');
} );

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
