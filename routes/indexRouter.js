let path = require('path');
const db = require('../db.js')
const { Router } = require('express');
const { getMessageById } = require('../controllers/messageController.js');
const { body, validationResult } = require("express-validator");


const indexRouter = Router();

let index = 3;

indexRouter.get('/', (req, res) => {
  res.render('index', { messages: db.messages });
})

indexRouter.get('/new', (req, res) => {
  res.render('form');
})

indexRouter.get('/:messageId', getMessageById)

indexRouter.post('/new', (req, res) => {
  const messageUser = req.body.messageUser;
  const messageText = req.body.messageText;
  db.messages.push({ id: index, text: messageText, user: messageUser, added: new Date().toLocaleDateString('fr') });
  index++;
  res.redirect('/');
})

module.exports = indexRouter;