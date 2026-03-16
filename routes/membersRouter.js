const { Router } = require("express");
const membersRouter = Router();
const memberController = require('../controllers/membersController');

membersRouter.get("/", (req, res) => res.render('home'));
membersRouter.get("/signup", (req, res) => res.render("signup"));
membersRouter.post("/sign-up", memberController.createUser);


module.exports = membersRouter;