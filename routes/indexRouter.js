let path = require('path');
const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.render('index')
})

indexRouter.get('/new', (req, res) => {
    res.render('new');
})

module.exports = indexRouter;