const { Router } = require("express");
const membersRouter = Router();
const memberController = require('../controllers/membersController');
const passport = require("passport");

membersRouter.get("/", (req, res) => res.render('home'));
membersRouter.get("/signup", (req, res) => res.render("signup"));
membersRouter.post("/sign-up", memberController.createUser);
membersRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/"
  })
);


module.exports = membersRouter;