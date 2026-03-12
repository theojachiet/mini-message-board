const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

// CREATE
usersRouter.get("/", usersController.getUsernames);
usersRouter.get('/clear', usersController.clearDatabase);
usersRouter.get("/create", usersController.createUsernameGet);
usersRouter.post("/create", usersController.createUsernamePost);

// // UPDATE
// usersRouter.get("/:id/update", usersController.usersUpdateGet);
// usersRouter.post("/:id/update", usersController.usersUpdatePost);

// DELETE
usersRouter.post("/:id/delete", usersController.usersDeletePost);

// // SEARCH
// usersRouter.get("/search", usersController.usersSearch);

module.exports = usersRouter;